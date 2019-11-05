import React, {Component} from 'react';
import "./customTooltip.css";

export default class CustomTooltip extends Component {
    getReactContainerClasses() {
        return ['custom-tooltip'];
    }

    render() {
        const data = this.props.api.getDisplayedRowAtIndex(this.props.rowIndex).data;
        return (
            <div className="custom-tooltip" style={{backgroundColor: this.props.color || 'white'}}>
                <p><span>{data.firstname +  "   "  + data.lastname}</span></p>
                <p><span>Email: </span> {data.email}</p>
                <p><span>Skillset: </span> {data.skillset}</p>
            </div>
        );
    }
}