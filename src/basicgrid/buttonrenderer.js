import React, {Component} from "react";

export default class ButtonRenderer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialState: 0
        }
        this.invokeParentMethod = this.invokeParentMethod.bind(this);
    }

    invokeParentMethod() {
        this.props.context.componentParent.onRemoveSelected();
        // this.props.context.componentParent.methodFromParent(`Row: ${this.props.node.rowIndex}, Col: ${this.props.colDef.headerName}`)
    }

    render() {
        return (
            <span><button style={{height: 20, lineHeight: 0.5}} onClick={this.invokeParentMethod} className="btn btn-danger btn-sm"> Delete</button></span>
        );
    }
};