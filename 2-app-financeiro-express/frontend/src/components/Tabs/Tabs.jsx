import { Component } from 'react';

class Tabs extends Component {
    render() {
        return <section>{this.props.children}</section>;
    }
}

export default Tabs;
