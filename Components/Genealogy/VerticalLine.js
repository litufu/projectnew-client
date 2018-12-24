import React, {
    Component
} from 'react';

import { Svg } from 'expo';
const {
    Line
} = Svg;


export default class VerticalLine extends Component{

    render() {
        const height=this.props.height
        const width=this.props.width
        return <Svg
            height={height}
            width={width}
        >
            <Line
                x1={width/2}
                y1='0'
                x2={width/2}
                y2={height}
                stroke="green"
                strokeWidth="3"
                strokeLinecap="round"
            />
        </Svg>;
    }
}
