import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { ApolloLink, Observable  } from 'apollo-link';
import { ApolloProvider } from 'react-apollo'
import { SecureStore } from 'expo'
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from 'apollo-link-context'
import { SubscriptionClient } from 'subscriptions-transport-ws';

import { resolvers} from "./resolvers";
import { typeDefs} from "./schema";
import { defaults} from "./defaults";


const cache = new InMemoryCache();

const stateLink = withClientState({
  typeDefs,
  cache,
  defaults,
  resolvers
});

const request = async (operation) => {
  const token = await SecureStore.getItemAsync('token');
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  });
};

const erorrLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle;
    Promise.resolve(operation)
      .then(oper => request(oper))
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));

    return () => {
      if (handle) handle.unsubscribe();
    };
  })
);

// Create an http link:
const httpLink = new HttpLink({
  uri: 'http://192.168.56.1:4000/',
  credentials: 'include'
});

// Create a WebSocket link:
export const wsClient = new SubscriptionClient(`ws://192.168.56.1:4000/graphql`, {
  reconnect: true,
  async connectionParams(){
    const authToken = await SecureStore.getItemAsync('token');
    return {authToken}
  },
});
const wsLink = new WebSocketLink(wsClient);

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const splitlink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink,
)

const client = new ApolloClient({
  link: ApolloLink.from([
    erorrLink,
    requestLink,
    stateLink,
    splitlink
  ]),
  cache,
});

client.onResetStore(stateLink.writeDefaults);

export default client