import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Route, Switch } from 'react-router-dom';

// Auth Pages
import Login from '../MainContent/Auth/Login';
import Register from '../MainContent/Auth/Register';

// User Pages
import Profile from '../MainContent/User/Profile';

// Main Pages
import Home from '../MainContent/Main/Home.js';
import Courses from '../MainContent/Main/Courses.js';
import Assessments from '../MainContent/Main/Assessments.js';

import { database } from '../../config/firebase'
import firebase from 'firebase'

class mainbuilder extends Component {

    state = {
        isAuthenticated: false
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
                    <Route path="/courses" component={Courses} />
                    <Route path="/assessments" component={Assessments} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/home" component={Home} />
                    <Route path="/" component={Home} />
                </Switch>
                :
                <Switch>
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