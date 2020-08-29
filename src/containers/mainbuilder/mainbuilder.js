import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Route, Switch } from 'react-router-dom';

// Auth Pages
import Login from '../MainContent/Auth/Login';
import Register from '../MainContent/Auth/Register';
import PasswordReset from '../MainContent/Auth/PasswordReset';

// User Pages
import Profile from '../MainContent/User/Profile';

// Main Pages
import Home from '../MainContent/Main/Home.js';
import Courses from '../MainContent/Main/Courses.js';
import CourseDetail from '../MainContent/Main/CourseDetail.js';
import Assessments from '../MainContent/Main/Assessments.js';

import DataManagement from '../MainContent/Main/DataManagement.js';

import { database } from '../../config/firebase'
import firebase from 'firebase'

class mainbuilder extends Component {

    state = {
        isAuthenticated: false,
        course: {}
    }

    componentWillMount = async () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ isAuthenticated: true })
            } else {
                this.setState({ isAuthenticated: false })
            }
        })
    }

    render() {
        return (
            this.state.isAuthenticated ?
                <Switch>

                    <Route path="/profile" component={Profile} />
                    <Route path="/home" component={Home} />

                    {
                        this.props.user.role === 'Admin' ?
                            <Route path="/data" component={DataManagement} /> : null
                    }
                    {
                        this.props.user.role === 'Assessor' ?
                            <>
                                <Route exact path="/coursedetail/:uid" render={props => <CourseDetail {...props.match.params} />} />
                                <Route path="/courses" component={Courses} />
                                <Route path="/assessments" component={Assessments} />
                            </>
                            : null
                    }

                    <Route path="/" component={Home} />

                </Switch>
                :
                <Switch>
                    <Route path="/reset" component={PasswordReset} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/" component={Login} />
                </Switch>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch)
}

const mapStatetoProps = state => {
    return {
        user: state.user
    };
}

export default connect(mapStatetoProps, mapDispatchToProps)(mainbuilder);