import React, { Component } from 'react';
import AUX from '../../../hoc/Aux_';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions from '../../../store/actions/user';

class Register extends Component {

    state = {
        firstname: '',
        firstname_err: '',
        lastname: '',
        lastname_err: '',
        email: '',
        email_err: '',
        role: '',
        role_err: '',
        institution: '',
        institution_err: '',
        institutionID: '',
        institutionID_err: '',
        pwd: '',
        pwd_err: '',
        pwd1: '',
        pwd1err: ''
    }

    componentDidMount() {
        // if (this.props.loginpage === false) {
        //     this.props.UpdateLogin();
        // }
        // window.onpopstate = (e) => {
        //     this.props.UpdateLoginAgain();
        // }
    }

    handleChangeFirstName = (e) => {
        this.setState({ firstname: e.target.value });
        if (e.target.value === '')
            this.setState({ firstname_err: 'Required Field' });
        else
            this.setState({ firstname_err: '' });
    }

    handleChangeLastName = (e) => {
        this.setState({ lastname: e.target.value });
        if (e.target.value === '')
            this.setState({ lastname_err: 'Required Field' });
        else
            this.setState({ lastname_err: '' });
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

    handleChangeRole = (e) => {
        this.setState({ role: e.target.value });
        if (e.target.value === '')
            this.setState({ role_err: 'Required Field' });
        else
            this.setState({ role_err: '' });
    }

    handleChangeInstitution = (e) => {
        this.setState({ institution: e.target.value });
        if (e.target.value === '')
            this.setState({ institution_err: 'Required Field' });
        else
            this.setState({ institution_err: '' });
    }

    handleChangeInstitutionalID = (e) => {
        this.setState({ institutionID: e.target.value });
        if (e.target.value === '')
            this.setState({ institutionID_err: 'Required Field' });
        else
            this.setState({ institutionID_err: '' });
    }

    handleChangePwd = (e) => {
        this.setState({ pwd: e.target.value });
        if (e.target.value === '')
            this.setState({ pwd_err: 'Required Field' });
        else if (e.target.value.length < 8)
            this.setState({ pwd_err: 'Password must have 8 or more characters' });
        else
            this.setState({ pwd_err: '' });
    }

    handleChangePwd1 = (e) => {
        this.setState({ pwd1: e.target.value });
        if (e.target.value === '')
            this.setState({ pwd1_err: 'Required Field' });
        else if (e.target.value != this.state.pwd)
            this.setState({ pwd1_err: 'Both should be the same.' });
        else
            this.setState({ pwd1_err: '' });
    }

    handleSubmit = (e) => {
        try {
            e.preventDefault()

            if (this.state.firstname === '')
                this.setState({ firstname_err: 'Required Field' });
            if (this.state.lastname === '')
                this.setState({ lastname_err: 'Required Field' });
            if (this.state.email === '')
                this.setState({ email_err: 'Required Field' });
            if (this.state.role === '')
                this.setState({ role_err: 'Required Field' });
            if (this.state.institution === '')
                this.setState({ institution_err: 'Required Field' });
            if (this.state.institutionID === '')
                this.setState({ institutionID_err: 'Required Field' });
            if (this.state.pwd === '')
                this.setState({ pwd_err: 'Required Field' });
            if (this.state.pwd1 === '')
                this.setState({ pwd1_err: 'Required Field' });

            this.props.register(this.state)
        } catch (e) {
            console.log(e.message)
        }
    }

    render() {
        return (
            <AUX>
                <div className="accountbg"></div>
                <div style={{ width: 650 }} className="wrapper-page">


                    <div className="card">
                        <div className="card-body">

                            <h3 className="text-center m-0">
                                <Link to="/" onClick={() => this.props.UpdateLoginAgain()} className="logo logo-admin"><img src="assets/images/logo.png" height="60" alt="logo" /></Link>
                            </h3>

                            <div className="p-12">
                                <h4 className="font-18 m-b-5 text-center">Registration</h4>
                                <p className="text-muted text-center">Please complete all details to get started.</p>

                                <form className="form-horizontal m-t-30" action="index.html">

                                    <div className="form-group">
                                        <label>Firstname</label>
                                        <input style={{ borderColor: this.state.firstname_err ? 'red' : null }} type="text" className="form-control" value={this.state.firstname} onChange={this.handleChangeFirstName} placeholder="Enter firstname" />
                                        <span style={{ color: 'red' }} id="err">{this.state.firstname_err}</span>
                                    </div>

                                    <div className="form-group">
                                        <label>Lastname</label>
                                        <input style={{ borderColor: this.state.lastname_err ? 'red' : null }} type="text" className="form-control" value={this.state.lastname} onChange={this.handleChangeLastName} placeholder="Enter lastname" />
                                        <span style={{ color: 'red' }} id="err">{this.state.lastname_err}</span>
                                    </div>

                                    <div className="form-group">
                                        <label>E-Mail</label>
                                        <div>
                                            <input style={{ borderColor: this.state.email_err ? 'red' : null }} type="text" value={this.state.email} onChange={this.handleChangeEmail} className="form-control" placeholder="Enter a valid e-mail" />
                                            <span style={{ color: 'red' }} id="err">{this.state.email_err}</span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label for="instId">Institution</label>
                                        <select style={{ borderColor: this.state.institution_err ? 'red' : null }} value={this.state.institution} onChange={this.handleChangeInstitution} className="form-control">
                                            <option>Select</option>
                                            <option>University of Cape Town</option>
                                            <option>Stellenbosch University</option>
                                            <option>University of Pretoria</option>
                                            <option>University of the Witwatersrand</option>
                                            <option>University of Kwazulu Natal</option>
                                            <option>University of the Western Cape</option>
                                            <option>Rhodes University</option>
                                            <option>The University of South Africa</option>
                                            <option>University of Johannesburg</option>
                                            <option>North West University</option>
                                            <option>University of the Free State</option>
                                            <option>Nelson Mandela Metropolitan University</option>
                                            <option>Cape Peninsula University of Technology</option>
                                            <option>Durban University of Technology</option>
                                            <option>University of Zululand</option>
                                            <option>Monash University</option>
                                            <option>Vaal University of Technology</option>
                                            <option>Central University of Technology</option>
                                            <option>Walter Sisulu University</option>
                                            <option>University of Limpopo</option>
                                            <option>Tshwane University of Technology</option>
                                            <option>University of Fort Hare</option>
                                        </select>
                                        <span style={{ color: 'red' }} id="err">{this.state.institution_err}</span>
                                    </div>

                                    <div className="form-group">
                                        <label for="instId">Role</label>
                                        <select style={{ borderColor: this.state.role_err ? 'red' : null }} value={this.state.role} onChange={this.handleChangeRole} className="form-control">
                                            <option>Select</option>
                                            <option>Assessor</option>
                                            <option>Student</option>
                                        </select>
                                        <span style={{ color: 'red' }} id="err">{this.state.role_err}</span>
                                    </div>

                                    <div className="form-group">
                                        <label>Institutional ID</label>
                                        <input style={{ borderColor: this.state.institutionID_err ? 'red' : null }} type="text" className="form-control" value={this.state.institutionID} onChange={this.handleChangeInstitutionalID} placeholder="Enter Staff/Student ID" />
                                        <span style={{ color: 'red' }} id="err">{this.state.institutionID_err}</span>
                                    </div>

                                    <div className="form-group">
                                        <label>Password</label>
                                        <div>
                                            <input style={{ borderColor: this.state.pwd_err ? 'red' : null }} type="password" value={this.state.pwd} onChange={this.handleChangePwd} className="form-control" placeholder="Password" />
                                            <span style={{ color: 'red' }} id="err">{this.state.pwd_err}</span>
                                        </div>
                                        <div className="m-t-10">
                                            <input style={{ borderColor: this.state.pwd1err ? 'red' : null }} type="password" className="form-control" value={this.state.pwd1} onChange={this.handleChangePwd1} placeholder="Password Re Type" />
                                            <span style={{ color: 'red' }} id="err">{this.state.pwd1_err}</span>
                                        </div>
                                    </div>

                                    <div className="form-group row m-t-20">
                                        <div className="col-12 text-center">
                                            <button onClick={this.handleSubmit} style={{ backgroundColor: '#089BD1', width: '100%' }} className="btn btn-primary w-md waves-effect waves-light" type="submit">Register</button>
                                        </div>
                                    </div>

                                    <div className="form-group m-t-10 mb-0 row">
                                        <div className="col-12 text-center m-t-20">
                                            <p className="font-14 text-muted mb-0">By registering you agree to the Gudani <Link to="#">Terms of Use</Link></p>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>

                    <div className="m-t-40 text-center">
                        <p className="text-white">Already have an account ? <Link to="login" className="font-500 font-14 text-white font-secondary"> Login </Link> </p>
                        <p className="text-white">© {new Date().getFullYear()} Gudani</p>
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

export default connect(mapStatetoProps, actions)(Register);