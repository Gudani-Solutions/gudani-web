import React, { Component } from 'react';
import AUX from '../../../hoc/Aux_';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { } from '../../../store/actions/user'
import * as actions from '../../../store/actions/user';
import Select from 'react-select';

class Profile extends Component {

    state = {
        isEditMode: false,
        user: {
            uid: '',
            firstname: '',
            lastname: '',
            phonenumber: '',
            email: '',
            role: '',
            institution: '',
            institutionID: '',
            department: ''
        }
    }

    dataValidation = () => {
        try {

        } catch (e) {
            console.log(e.message)
        }
    }

    componentDidMount = async () => {
        try {
            this.setState({ user: this.props.user })
        } catch (e) {
            console.log(e.message)
        }
    }

    render() {
        const departmentsOptions = [
            { value: 'School of Economics', label: 'School of Economics' },
            { value: 'Electrical Engineering', label: 'Electrical Engineering' },
            { value: 'Educational Development Unit', label: 'Educational Development Unit' },
            { value: 'Mathematics', label: 'Mathematics' },
            { value: 'Physics', label: 'Physics' },
            { value: 'Philosophy', label: 'Philosophy' },
            { value: 'Politics Studies', label: 'Politics Studies' },
            { value: 'Private Law', label: 'Private Law' },
        ];
        return (
            <AUX>
                <div className="page-content-wrapper">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card m-b-20">
                                    <div className="card-body">

                                        <div className="row">
                                            <div className="col-sm-6">
                                                <h4 className="mt-0 header-title">Profile Information</h4>
                                                <p className="text-muted m-b-30 font-14">Please ensure your profile details are up to date and accurate.</p>
                                            </div>
                                            <div className="col-sm-6 text-right">
                                                {
                                                    this.state.isEditMode ?
                                                        <>
                                                            <button style={{ width: '25%', marginRight: 20 }} className="btn btn-success  waves-effect waves-light"
                                                                onClick={async () => {
                                                                    if (await this.props.editUser(this.state.user)) {
                                                                        this.setState({ isEditMode: false })
                                                                    } else {
                                                                        this.setState({ isEditMode: false })
                                                                    }
                                                                }}
                                                            >Save Changes</button>
                                                            <button style={{ width: '25%', }} className="btn btn-secondary waves-effect waves-light"
                                                                onClick={() => {
                                                                    this.setState({ isEditMode: false })
                                                                }}
                                                            >Cancel</button>
                                                        </>
                                                        :
                                                        <button style={{ width: '25%', backgroundColor: '#089BD1' }} className="btn btn-primary waves-effect waves-light"
                                                            onClick={() => {
                                                                this.setState({ isEditMode: true })
                                                            }}
                                                        >Edit Profile</button>
                                                }

                                            </div>
                                        </div>

                                        <form>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label for="firstname">Firstname</label>
                                                        {
                                                            this.state.isEditMode ?
                                                                <input className="form-control" onChange={(event) => this.setState({ user: { ...this.state.user, firstname: event.target.value } })} value={this.state.user.firstname} type="text" placeholder="Firstname" />
                                                                :
                                                                <p className="font-13 text-muted">{this.state.user.firstname}</p>
                                                        }
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="email">Email</label>
                                                        {
                                                            this.state.isEditMode ?
                                                                <input className="form-control" onChange={(event) => this.setState({ user: { ...this.state.user, email: event.target.value } })} value={this.state.user.email} type="text" placeholder="Email" />
                                                                :
                                                                <p className="font-13 text-muted">{this.state.user.email}</p>
                                                        }
                                                    </div>

                                                    <div className="form-group">
                                                        <label for="role">Role</label>
                                                        {
                                                            this.state.isEditMode ?

                                                                <select onChange={(event) => this.setState({ user: { ...this.state.user, role: event.target.value } })} value={this.state.user.role} className="form-control select2">
                                                                    <option>Select</option>
                                                                    <option value="Assessor">Assessor</option>
                                                                    <option value="Student">Student</option>
                                                                </select>
                                                                :
                                                                <p className="font-13 text-muted">{this.state.user.role}</p>
                                                        }
                                                    </div>

                                                    <div className="form-group">
                                                        <label for="role">Department</label>
                                                        {
                                                            this.state.isEditMode ?

                                                                <Select
                                                                    placeholder='Search'
                                                                    value={{ value: this.state.user.department, label: this.state.user.department }}
                                                                    onChange={(selectedOption) => this.setState({ user: { ...this.state.user, department: selectedOption.value } })}
                                                                    options={departmentsOptions}
                                                                />
                                                                :
                                                                <p className="font-13 text-muted">{this.state.user.department}</p>
                                                        }
                                                    </div>

                                                </div>

                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label for="email">Lastname</label>
                                                        {
                                                            this.state.isEditMode ?
                                                                <input className="form-control" onChange={(event) => this.setState({ user: { ...this.state.user, lastname: event.target.value } })} value={this.state.user.lastname} type="text" placeholder="Lastname" />
                                                                :
                                                                <p className="font-13 text-muted">{this.state.user.lastname}</p>
                                                        }
                                                    </div>

                                                    <div className="form-group">
                                                        <label for="firstname">Phone Number</label>
                                                        {
                                                            this.state.isEditMode ?
                                                                <input className="form-control" onChange={(event) => this.setState({ user: { ...this.state.user, phonenumber: event.target.value } })} value={this.state.user.phonenumber} type="text" placeholder="Phone Numbers" />
                                                                :
                                                                <p className="font-13 text-muted">{this.state.user.phonenumber}</p>
                                                        }
                                                    </div>

                                                    <div className="form-group">
                                                        <label for="email">Instituitional ID</label>
                                                        {
                                                            this.state.isEditMode ?
                                                                <input className="form-control" onChange={(event) => this.setState({ user: { ...this.state.user, institutionID: event.target.value } })} value={this.state.user.institutionID} type="text" placeholder="Instituitional ID" />
                                                                :
                                                                <p className="font-13 text-muted">{this.state.user.institutionID}</p>
                                                        }
                                                    </div>

                                                    <div className="form-group">

                                                        <label className="control-label">Instituition</label>

                                                        {
                                                            this.state.isEditMode ?
                                                                <select onChange={(event) => this.setState({ user: { ...this.state.user, institution: event.target.value } })} value={this.state.user.institution} className="form-control select2">
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

                                                                :
                                                                <p className="font-13 text-muted">{this.state.user.institution}</p>
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </AUX >
        );
    }
}

const mapStatetoProps = state => {
    return {
        user: state.user,
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch)
}

export default withRouter(connect(mapStatetoProps, actions)(Profile));