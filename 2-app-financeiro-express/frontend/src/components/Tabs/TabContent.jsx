import { Component } from 'react';

class TabContent extends Component {
    render() {
        return (
            <div
                className={`tab-pane fade ${
                    this.props.active ? 'show active' : ''
                }`}
                id={`${this.props.target}`}
                role="tabpanel"
                aria-labelledby={`${this.props.target}`}
                tabIndex="0"
            >
                {this.props.children}
            </div>
        );
    }
}

export default TabContent;
