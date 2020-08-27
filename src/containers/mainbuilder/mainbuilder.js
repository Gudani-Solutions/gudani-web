import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Route, Switch } from 'react-router-dom';

import Login from '../MainContent/Auth/Login';
import Register from '../MainContent/Auth/Register';

import Home from '../MainContent/Main/Home.js';

import firebase from 'firebase'

class mainbuilder extends Component {

    state = {
        isAuthenticated: false
    }

    componentWillMount = async () => {
        // console.log(this.props.user)
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
                    <Route path="/" component={Home} />
                </Switch>
                :
                <Switch>
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
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