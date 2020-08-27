import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import mainbuilder from './containers/mainbuilder/mainbuilder';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AUX from './hoc/Aux_';
import * as actions from './store/actions/index'
import { database } from './config/firebase'
import firebase from 'firebase'

class App extends Component {

  state = {
    isAuthenticated: false
  }

  componentWillMount = async () => {
    try {

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ isAuthenticated: true })
        } else {
          this.setState({ isAuthenticated: false })
        }
      })


    } catch (e) {
      console.log(e.message)
    }
  }

  render() {
    let layout = null;

    layout = (
      <Layout isAuthenticated={this.state.isAuthenticated} user={this.props.user} header={this.props.header} sidebar={this.props.sidebar} footer={this.props.footer} loginpage={this.props.loginpage}>
        <Switch>
          <Route path="/" component={mainbuilder} />
        </Switch>
      </Layout>);
    return (
      <AUX>
        {layout}
      </AUX>
    );
  }
}

const mapStatetoProps = state => {
  return {
    header: state.ui.header,
    sidebar: state.ui.sidebar,
    footer: state.ui.footer,
    loginpage: state.ui.loginpage,
    user: state.user
  };
}

export default withRouter(connect(mapStatetoProps, actions)(App));
