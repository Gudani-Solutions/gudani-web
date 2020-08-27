import React, { Component } from 'react';
import AUX from '../../../hoc/Aux_';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/user';

class Login extends Component {

    state = {
        email: '',
        email_err: '',
        pwd: '',
        pwd_err: '',
        userMessage: 'Sign in to continue to Gudani',
        loginError: false
    }

    componentDidMount() {
        if (this.props.loginpage === false) {
            this.props.UpdateLogin();
        }
        window.onpopstate = (e) => {
            this.props.UpdateLoginAgain();
        }
    }

    handleChangeEmail = (e) => {
        this.setState({ email: e.target.value });
        var EmailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (e.target.value == '')
            this.setState({ email_err: 'Required Field' });
        else if (EmailReg.test(e.target.value))
            this.setState({ email_err: '' });
        else
            this.setState({ email_err: 'Enter Valid Email' });
    }

    handleChangePwd = (e) => {
        this.setState({ pwd: e.target.value });
        if (e.target.value === '')
            this.setState({ pwd_err: 'Required Field' });
        else
            this.setState({ pwd_err: '' });
    }


    handleSubmit = async (e) => {
        try {
            e.preventDefault()

            if (this.state.email === '')
                this.setState({ email_err: 'Required Field' });
            if (this.state.pwd === '')
                this.setState({ pwd_err: 'Required Field' });

            if (await this.props.login(this.state)) {
                this.setState({ userMessage: 'Sign in to continue to Gudani', loginError: false });
            } else {
                this.setState({ userMessage: 'Login failed. Please try again', loginError: true });
            }
        } catch (e) {
            console.log(e.message)
        }
    }

    render() {
        return (
            <AUX>
                <div className="accountbg"></div>
                <div className="wrapper-page">

                    <div style={{ marginTop: '25%' }} className="card">
                        <div className="card-body">

                            <h3 className="text-center m-0">
                                <Link to="/" onClick={() => this.props.UpdateLoginAgain()} className="logo logo-admin"><img src="assets/images/logo.png" height="60" alt="logo" /></Link>
                            </h3>

                            <div className="p-3">
                                <h4 className="font-18 m-b-5 text-center">Welcome Back !</h4>
                                <p style={{ color: this.state.loginError ? 'red' : 'gray' }} className=" text-center">{this.state.userMessage}</p>

                                <form className="form-horizontal m-t-30" action="/">

                                    <div className="form-group">
                                        <label>E-Mail</label>
                                        <div>
                                            <input style={{ borderColor: this.state.email_err ? 'red' : null }} type="text" value={this.state.email} onChange={this.handleChangeEmail} className="form-control" placeholder="Enter a valid e-mail" />
                                            <span style={{ color: 'red' }} id="err">{this.state.email_err}</span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Password</label>
                                        <div>
                                            <input style={{ borderColor: this.state.pwd_err ? 'red' : null }} type="password" value={this.state.pwd} onChange={this.handleChangePwd} className="form-control" placeholder="Password" />
                                            <span style={{ color: 'red' }} id="err">{this.state.pwd_err}</span>
                                        </div>
                                    </div>

                                    <div className="form-group row m-t-20">
                                        <div className="col-12 text-center">
                                            <button onClick={this.handleSubmit} style={{ backgroundColor: '#089BD1', width: '100%' }} className="btn btn-primary w-md waves-effect waves-light" type="submit">Log In</button>
                                        </div>
                                    </div>

                                    <div className="form-group m-t-10 mb-0 row">
                                        <div className="col-12 text-center m-t-20">
                                            <Link to="pages_recoverpw" className="text-muted"><i className="mdi mdi-lock"></i> Forgot your password?</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="m-t-40 text-center">
                        <p className="text-white">Don't have an account ? <Link to="register" className="font-500 font-14 text-white font-secondary"> Signup Now </Link> </p>
                        <p className="text-white">©  {new Date().getFullYear()} Gudani</p>
                    </div>
                </div>
            </AUX>
        );
    }
}

const mapStatetoProps = state => {
    return {
        loginpage: state.ui.loginpage,
    };
}

export default connect(mapStatetoProps, actions)(Login);
