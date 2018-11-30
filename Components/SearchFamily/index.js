import React from 'react'
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TouchableOpacity
} from 'react-native'

import styleUtil from "../../common/styleUtil";
import { SearchBar } from 'react-native-elements'
import Nav from '../Nav'
import UserListConainer from '../UsersList'

export default class SearchFamily extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			username: '',
			searching:false
		}
	}

	handleInput=(val)=>{
		this.setState({ 
			username: val.trim(),
			searching:false
		 })
	}

	renderSearchBar = () => {
		return (
			<View style={{ flex: 1 }}>
				<SearchBar
					lightTheme
					containerStyle={{
						backgroundColor: 'transparent',
						borderBottomWidth: 0
					}}
					inputStyle={{
						backgroundColor: '#fff'
					}}
					onSubmitEditing={this.search}
					icon={{ type: 'font-awesome', name: 'search' }}
					onChangeText={this.handleInput}
					placeholder='用户名'
				/>
			</View>
		)
	};

	search = () => {
		let val = this.state.username;
		if (!val) {
			return
		}
		this.setState({searching:true})
	}

	renderSearchButton = () => {
		let username = this.state.username.trim()
		return (
			<TouchableOpacity
				activeOpacity={username.length > 0 ? 0.5 : 1}
				onPress={this.search}
			>
				<Text style={[
					styles.sendText,
					{ color: username.length > 0 ? '#0084ff' : styleUtil.disabledColor }
				]}>搜索</Text>
			</TouchableOpacity>
		)
	}

	render() {
		const {username,searching} = this.state
		const who = this.props.navigation.getParam('who', {});
		return (
			<View style={styleUtil.container}>
				<View style={{
					flexDirection: 'row',
					alignItems: 'center',
					borderBottomWidth: 1,
					borderBottomColor: '#ccc'
				}}>
					{this.renderSearchBar()}
					{this.renderSearchButton()}
				</View>
				{searching &&
					<UserListConainer
						username={username}
						who={who}
					/>
				}
			</View>
		)
	}
}



const styles = StyleSheet.create({
	sendText: {
		fontWeight: '600',
		fontSize: 17,
		backgroundColor: 'transparent',
		marginLeft: 5,
		marginRight: 10,
	},
})


SearchFamily.navigationOptions = ({ navigation }) => ({
	header: (
		<Nav
			title="添加亲人"
			navigation={navigation}
			leftIcon={{
				type: 'ionicon',
				name: 'md-arrow-back',
				size: 26,
			}}
			hasLeftIcon={true}
			hasLogoutText={false}
		/>
	),
})