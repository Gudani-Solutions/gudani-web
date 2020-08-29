import React, { Component } from 'react';
import AUX from '../../../hoc/Aux_';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { } from '../../../store/actions/user'
import Select from 'react-select';
import { functions } from '../../../config/firebase'

class Courses extends Component {

    state = {
        errorMessage: '',
        selectedCourse: {
        },
        courseOptions: [],
        courseIsSelected: false
    }

    dataValidation = () => {
        try {

        } catch (e) {
            console.log(e.message)
        }
    }

    componentWillMount = async () => {
        try {
            await functions()
                .httpsCallable('getCoursesByDept')({
                    university: this.props.user.institution,
                    department: this.props.user.department
                })
                .then(response => {
                    let data = []
                    let courses = response.data.data

                    if (courses) {
                        courses.forEach(item => {
                            data.push({ value: item.code, label: item.code + " - " + item.title, ...item })
                        })
                        this.setState({ courseOptions: data })
                    }
                });
        } catch (e) {
            console.log(e.message)
        }
    }

    searchCourse = async (selectedCourse) => {
        try {
            this.setState({ selectedCourse: selectedCourse })
        } catch (e) {
            console.log(e.message)
        }
    }

    addCourse = async (e) => {
        try {
            e.preventDefault()
            // 
        } catch (e) {
            console.log(e.message)
        }
    }

    render() {
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
                                                <h4 className="mt-0 header-title">Courses</h4>
                                            </div>
                                            <div className="col-sm-6 text-right">
                                                <button data-toggle="modal" data-target="#courseModal" style={{ width: '25%', backgroundColor: '#089BD1' }} className="btn btn-primary waves-effect waves-light"
                                                    onClick={() => {

                                                    }}
                                                >Add Course</button>

                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-12 text-center">

                                            </div>
                                        </div>



                                        <div id="courseModal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                            <div style={{ margin: 'auto', paddingTop: 30, paddingBottom: 30, width: '80%' }} className="modal-dialog modal-lg">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title mt-0" id="myModalLabel">Create Course</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                    </div>
                                                    <div className="modal-body">
                                                        {
                                                            this.state.errorMessage ?
                                                                <p style={{ color: 'red' }} className="text-muted m-b-30 font-14 alert-danger">{this.state.errorMessage}</p> : null
                                                        }

                                                        <div className="card-body">
                                                            <form>
                                                                <div className="row">
                                                                    <div className="col-sm-12">
                                                                        <div className="form-group">
                                                                            <label for="metatitle">Find Course</label>
                                                                            <Select
                                                                                value={this.state.selectedCourse}
                                                                                onChange={this.searchCourse}
                                                                                options={this.state.courseOptions}
                                                                            />
                                                                        </div>
                                                                        <div className="col-sm-12 text-center">
                                                                            <button data-toggle="modal" data-target="#courseModal" style={{ width: '100%' }} onClick={(e) => this.addCourse(e)} type="primary" color='primary' className="btn btn-success waves-effect waves-light" block>Add Course</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div>
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

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Courses));