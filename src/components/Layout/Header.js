import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';

class header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            dropdownOpen1: false,
            dropdownOpenprofile: false,
            dropdownOpenbadge: false,
            now_route: ""
        };

        this.toggle = this.toggle.bind(this);
        this.toggle1 = this.toggle1.bind(this);
        this.toggleprofile = this.toggleprofile.bind(this);
        this.togglebadge = this.togglebadge.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
    toggle1() {
        this.setState(prevState => ({
            dropdownOpen1: !prevState.dropdownOpen1
        }));
    }
    toggleprofile() {
        this.setState(prevState => ({
            dropdownOpenprofile: !prevState.dropdownOpenprofile
        }));
    }
    togglebadge() {
        this.setState(prevState => ({
            dropdownOpenbadge: !prevState.dropdownOpenbadge
        }));
    }

    togglescreen(e) {
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }
    componentDidMount() {
        this.setState({ now_route: this.props.location.pathname })
    }

    render() {
        return (
            <div className="topbar">
                <nav className="navbar-custom">
                    <div className="search-wrap" id="search-wrap">
                        <div className="search-bar">
                            <input className="search-input" type="search" placeholder="Search" />
                            <a href="#" className="close-search toggle-search" data-target="#search-wrap">
                                <i className="mdi mdi-close-circle"></i>
                            </a>
                        </div>
                    </div>

                    <ul className="list-inline float-right mb-0">
                        <li className="list-inline-item dropdown notification-list">
                            <Dropdown isOpen={this.state.dropdownOpenprofile} toggle={this.toggleprofile}>
                                <DropdownToggle className="nav-link dropdown-toggle droptest arrow-none waves-effect nav-user" tag="a">
                                    <img src="assets/images/avatar.png" alt="user" className="rounded-circle" />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem><i className="mdi mdi-account-circle m-r-5"></i> Profile</DropdownItem>
                                    <DropdownItem><i className="mdi mdi-power text-danger"></i> Logout</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </li>
                    </ul>

                    <div className="clearfix"></div>
                </nav>
            </div>

        );
    }
}

export default withRouter(header);