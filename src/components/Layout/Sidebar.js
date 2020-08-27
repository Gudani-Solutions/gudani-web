import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import $ from 'jquery';

class sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Tab: 'index', SubTab: '', MoreTab: '', dashboard_menu: false, email_menu: false, ui_menu: false,
            form_menu: false, chart_menu: false, table_menu: false, icon_menu: false, map_menu: false,
            auth_menu: false, extra_menu: false, eco_menu: false, emt_menu: false
        };
    }

    setActiveTab = (tab, subtab, moretab, toggleTab, e) => {
        this.setState({ Tab: tab, SubTab: subtab, MoreTab: moretab });
    }

    componentDidMount() {
        var now_route = "";
        var pageUrl = window.location.pathname.split(/[?#]/)[0];
        now_route = pageUrl.substr(1).replace(/_/g, " ");
        $('#now_routing').empty();
        if (now_route == "") { now_route = "Dashboard1" } else { }
        $('#now_routing').append(now_route);

        $('.toggle-search').on('click', function () {
            var targetId = $(this).data('target');
            var $searchBar;
            if (targetId) {
                $searchBar = $(targetId);
                $searchBar.toggleClass('open');
            }
        });

        $('.button-menu-mobile').on('click', function (event) {
            event.preventDefault();
            $("body").toggleClass("enlarged");
        });

        $('li.has_sub li').on('click', function (event) {
            $("body").toggleClass("enlarged");
        });
    }
    componentDidUpdate() {
        var now_route = "";
        var pageUrl = window.location.pathname.split(/[?#]/)[0];
        now_route = pageUrl.substr(1).replace("_", " ");
        $('#now_routing').empty();
        if (now_route == "") { now_route = "Dashboard1" } else { }
        $('#now_routing').append(now_route);
    }

    render() {
        return (
            <div className="left side-menu">

                <div className="topbar-left">
                    <div className="">
                        <Link to="/" className="logo"><img style={{}} src="slogan.png" height="36" alt="logo" /></Link>
                    </div>
                </div>

                <div className="sidebar-inner slimscrollleft" >
                    <PerfectScrollbar>
                        <div id="sidebar-menu">
                            <ul>
                                <li>
                                    <Link to="home" className={this.state.Tab === 'home_menu' ? 'waves-effect active-menu' : 'waves-effect'} onClick={this.setActiveTab.bind(this, 'home_menu', '', '')}><i className="mdi mdi-home"></i><span>Home</span></Link>
                                </li>
                                <li>
                                    <Link to="annoucements" className={this.state.Tab === 'annoucements' ? 'waves-effect active-menu' : 'waves-effect'} onClick={this.setActiveTab.bind(this, 'annoucements', '', '')}><i className="mdi mdi-flag"></i><span>Courses</span></Link>
                                </li>
                                <li>
                                    <Link to="incidences" className={this.state.Tab === 'incidences' ? 'waves-effect active-menu' : 'waves-effect'} onClick={this.setActiveTab.bind(this, 'incidences', '', '')}><i className="mdi mdi-bell"></i><span>Assessments</span></Link>
                                </li>
                            </ul>
                        </div>
                        <div className="clearfix"></div>
                    </PerfectScrollbar>
                </div>

            </div>
        );
    }
}

export default withRouter(sidebar);