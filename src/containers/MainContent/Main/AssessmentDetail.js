import React, { Component } from 'react';
import AUX from '../../../hoc/Aux_';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../store/actions/course';
import AssessmentForm from '../../../components/AssessmentForm';

class AssessmentDetail extends Component {

    state = {
        course: {
            uid: '',
            title: '',
            students: [],
            department: '',
            title: '',
            code: '',
            description: '',
            photo: ''
        },
        student: '',
        student_err: '',
        department_err: '',
        title_err: '',
        code_err: '',
        description_err: '',
        isEditMode: false,
        assessment: {
            title: '',
            startDate: '',
            startTime: '',
            duration: '',
            type: '',
            instructions: '',
        },
        assessements: []
    }

    componentWillMount = async () => {
        try {
            let assessment = this.props.location.state.assessment
            this.setState({ assessment })
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
                                            <div className="col-sm-7 text-left">
                                                <h5>{this.state.assessment.title}</h5>
                                            </div>
                                            <div className="col-sm-5 text-right">
                                                <button data-toggle="modal" data-target="#assessmentModal" style={{ width: '25%', backgroundColor: '#089BD1', marginLeft: 5, marginRight: 5 }} className="btn btn-primary waves-effect waves-light"
                                                    onClick={() => {
                                                        this.setState({ isEditMode: true })
                                                    }}
                                                >Edit Assessment</button>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-sm-8 text-left">
                                                <h5>Scheduled</h5>
                                                <p>{this.state.assessment.assessmentDate} - {this.state.assessment.assessmentTime}</p>
                                                <h5>Duration</h5>
                                                <p>{this.state.assessment.duration} Hrs</p>
                                                <h5>Type</h5>
                                                <p>{this.state.assessment.type}</p>
                                                <h5>Instructions Details</h5>
                                                <p>{this.state.assessment.instructions}</p>
                                                <h5>Announcements</h5>
                                                <p>No Announcements</p>

                                            </div>

                                        </div>
                                    </div>
                                </div >
                            </div >
                        </div>



                        <div id="studentModal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                            <div style={{ margin: 'auto', paddingTop: 30, paddingBottom: 30, width: '80%' }} className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title mt-0" id="myModalLabel">Add Student</h5>
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
                                                            <label>Student ID</label>
                                                            <input style={{ borderColor: this.state.student_err ? 'red' : null }} type="text" className="form-control" value={this.state.student} onChange={this.handleChangesStudent} placeholder="Enter student ID" />
                                                            <span style={{ color: 'red' }} id="err">{this.state.student_err}</span>
                                                        </div>
                                                        <div className="col-sm-12 text-center">
                                                            <button data-toggle={this.state.student ? "modal" : ""} data-target={this.state.student ? "#studentModal" : ""} style={{ width: '100%' }} onClick={(e) => this.addStudent(e)} type="primary" color='primary' className="btn btn-success waves-effect waves-light" block>Add Student</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div id="courseModal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                            <div style={{ margin: 'auto', paddingTop: 30, paddingBottom: 30, width: '80%' }} className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title mt-0" id="myModalLabel">Edit Course</h5>
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
                                                            <label>Department</label>
                                                            <input style={{ borderColor: this.state.department_err ? 'red' : null }} type="text" className="form-control" value={this.state.course.department} onChange={this.handleChangeDepartment} placeholder="Enter course department" />
                                                            <span style={{ color: 'red' }} id="err">{this.state.department_err}</span>
                                                        </div>

                                                        <div className="form-group">
                                                            <label>Course Title</label>
                                                            <input style={{ borderColor: this.state.title_err ? 'red' : null }} type="text" className="form-control" value={this.state.course.title} onChange={this.handleChangeTitle} placeholder="Enter course title" />
                                                            <span style={{ color: 'red' }} id="err">{this.state.title_err}</span>
                                                        </div>

                                                        <div className="form-group">
                                                            <label>Course Code</label>
                                                            <input style={{ borderColor: this.state.code_err ? 'red' : null }} type="text" className="form-control" value={this.state.course.code} onChange={this.handleChangeCode} placeholder="Enter course code" />
                                                            <span style={{ color: 'red' }} id="err">{this.state.code_err}</span>
                                                        </div>

                                                        <div className="form-group">
                                                            <label>Course Description</label>
                                                            <textarea rows="4" style={{ borderColor: this.state.description_err ? 'red' : null }} type="text" className="form-control" value={this.state.course.description} onChange={this.handleChangeDescription} placeholder="Enter course description" />
                                                            <span style={{ color: 'red' }} id="err">{this.state.description_err}</span>
                                                        </div>

                                                        <div className="col-sm-12 text-center">
                                                            <button data-toggle={this.state.course.department && this.state.course.title && this.state.course.code && this.state.course.description ? "modal" : ""} data-target={this.state.course.department && this.state.course.title && this.state.course.code && this.state.course.description ? "#courseModal" : ""} style={{ width: '100%' }} onClick={(e) => this.editCourse(e)} type="primary" color='primary' className="btn btn-success waves-effect waves-light" block>Update Course</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <AssessmentForm currentAssessment={this.state.assessment} isEditMode={true} />
                    </div >
                </div >
            </AUX >
        );
    }
}

const mapStatetoProps = state => {
    return {
        user: state.user,
        course: state.course,
        assessement: state.assessement
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch)
}

export default withRouter(connect(mapStatetoProps, actions)(AssessmentDetail));