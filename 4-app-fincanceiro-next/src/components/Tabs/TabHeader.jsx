import { Component } from 'react';
import { connect } from 'react-redux';

class TabHeader extends Component {
    render() {
        return this.props.tabs.tabsVisible.includes(this.props.target) ? (
            <li
                className="nav-item "
                role="presentation"
                onClick={() => this.props.showTab(this.props.target)}
            >
                <a
                    className={`nav-link text-dark ${
                        this.props.active ? 'active ' : ''
                    }`}
                    data-bs-toggle="tab"
                    data-bs-target={`#${this.props.target}`}
                    type="button"
                    role="tab"
                    aria-controls={`${this.props.target}`}
                    aria-selected="false"
                    href={`${this.props.link}`}
                >
                    <i
                        className={`${this.props.icon}`}
                        data-id={`${this.props.label}`}
                    ></i>{' '}
                    {this.props.label}
                </a>
            </li>
        ) : (
            false
        );
    }
}

let mapStateToProps = (state) => {
    return {
        tabs: state.tabs,
    };
};

export default connect(mapStateToProps)(TabHeader);
