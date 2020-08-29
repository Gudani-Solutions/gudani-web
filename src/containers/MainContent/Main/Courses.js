import React, { Component } from 'react';
import AUX from '../../../hoc/Aux_';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../store/actions/course';
import Select from 'react-select';
import { functions } from '../../../config/firebase'

class Courses extends Component {

    state = {
        errorMessage: '',
        selectedCourse: {},
        courseOptions: [],
        courseIsSelected: false,
        selectionError: false,
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
            this.setState({ selectedCourse: selectedCourse, courseIsSelected: true, selectionError: false })
        } catch (e) {
            console.log(e.message)
        }
    }

    addCourse = async (e) => {
        try {
            e.preventDefault()
            if (this.state.courseIsSelected) {
                this.props.createCourse(this.state.selectedCourse)
            } else {
                this.setState({ selectionError: true })
            }

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

                                        <div style={{ padding: 10, justifyContent: 'start' }} className="row">
                                            {
                                                this.props.course.courses.map(item => (
                                                    <div style={{ backgroundColor: '#23B7ED', borderRadius: 10, margin: 5 }} className="col-md-6 col-lg-3 text-center">
                                                        <Link to={"/coursedetail/" + item.uid} className="text-dark">
                                                            <h2 style={{ color: 'white' }}>
                                                                {item.code}
                                                            </h2>
                                                            <h4 style={{ color: 'white' }}>{item.title} </h4>
                                                        </Link>
                                                    </div>
                                                ))
                                            }
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
                                                                            <label style={{ color: this.state.selectionError ? 'red' : null }} for="metatitle">{this.state.selectionError ? 'Please select a course' : 'Find Course'}</label>
                                                                            <Select
                                                                                value={this.state.selectedCourse}
                                                                                onChange={this.searchCourse}
                                                                                options={this.state.courseOptions}
                                                                            />
                                                                        </div>
                                                                        <div className="col-sm-12 text-center">
                                                                            <button data-toggle={this.state.courseIsSelected ? "modal" : ""} data-target={this.state.courseIsSelected ? "#courseModal" : ""} style={{ width: '100%' }} onClick={(e) => this.addCourse(e)} type="primary" color='primary' className="btn btn-success waves-effect waves-light" block>Add Course</button>
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
        course: state.course
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch)
}

export default withRouter(connect(mapStatetoProps, actions)(Courses));