import React, { Component } from 'react';
import AUX from '../../../hoc/Aux_';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../store/actions/course';
import AssessmentForm from '../../../components/AssessmentForm';

class CourseDetail extends Component {

    state = {
        course: {
            uid: '',
            title: '',
            students: [],
            department: '',
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

    dataValidation = () => {
        try {

        } catch (e) {
            console.log(e.message)
        }
    }

    handleChangesStudent = (e) => {
        this.setState({ student: e.target.value });
        if (e.target.value === '')
            this.setState({ student_err: 'Required Field' });
        else
            this.setState({ student_err: '' });
    }

    handleChangeDepartment = (e) => {
        this.setState({ course: { ...this.state.course, department: e.target.value } });
        if (e.target.value === '')
            this.setState({ department_err: 'Required Field' });
        else
            this.setState({ department_err: '' });
    }

    handleChangeTitle = (e) => {
        this.setState({ course: { ...this.state.course, title: e.target.value } });
        if (e.target.value === '')
            this.setState({ title_err: 'Required Field' });
        else
            this.setState({ title_err: '' });
    }

    handleChangeCode = (e) => {
        this.setState({ course: { ...this.state.course, code: e.target.value } });
        if (e.target.value === '')
            this.setState({ code_err: 'Required Field' });
        else
            this.setState({ code_err: '' });
    }

    handleChangeDescription = (e) => {
        this.setState({ course: { ...this.state.course, description: e.target.value } });
        if (e.target.value === '')
            this.setState({ description_err: 'Required Field' });
        else
            this.setState({ description_err: '' });
    }


    componentWillMount = async () => {
        try {
            let course = await this.props.course.courses.find(c => c.uid === this.props.location.state.uid)
            this.setState({ course })
        } catch (e) {
            console.log(e.message)
        }
    }

    addStudent = async (e) => {
        try {
            e.preventDefault()
            if (this.state.student === '')
                this.setState({ student_err: 'Required Field' });
            if (this.state.student) {
                await this.props.addStudent(this.state.student, this.state.course.uid)
                this.setState({ student: '' })
            }

        } catch (e) {
            console.log(e.message)
        }
    }

    editCourse = async (e) => {
        try {
            e.preventDefault()
            if (this.state.course.department === '')
                this.setState({ department_err: 'Required Field' });
            if (this.state.course.title === '')
                this.setState({ title_err: 'Required Field' });
            if (this.state.course.code === '')
                this.setState({ code_err: 'Required Field' });
            if (this.state.course.description === '')
                this.setState({ description_err: 'Required Field' });

            if (this.state.course.department && this.state.course.title && this.state.course.code && this.state.course.description) {
                if (this.state.isEditMode) {
                    await this.props.editCourse(this.state.course)
                    let course = await this.props.course.courses.find(i => i.uid === this.state.course.uid)
                    this.setState({ isEditMode: false, course })
                } else {
                }
            }
        } catch (e) {
            console.log(e.message)
        }
    }

    render() {
        let assessments = this.props.assessement.assessments.filter(c => c.courseUid === this.state.course.uid)
        return (
            <AUX>
                <div className="page-content-wrapper">
                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-12">
                                <div className="card m-b-20">
                                    <div className="card-body">

                                        <div className="row">
                                            <div className="col-sm-5 text-left">
                                                <h3>{this.state.course.code} - {this.state.course.title}</h3>
                                            </div>
                                            <div className="col-sm-7 text-right">
                                                {
                                                    this.props.user.role === 'Assessor' ?
                                                        <>
                                                            <button data-toggle="modal" data-target="#assessmentModal" style={{ width: '20%', backgroundColor: '#089BD1', marginLeft: 5, marginRight: 5 }} className="btn btn-primary waves-effect waves-light"
                                                                onClick={() => {

                                                                }}
                                                            >Add Assessment</button>
                                                            <button data-toggle="modal" data-target="#studentModal" style={{ width: '20%', backgroundColor: '#089BD1', marginLeft: 5, marginRight: 5 }} className="btn btn-primary waves-effect waves-light"
                                                                onClick={() => {

                                                                }}
                                                            >Add Student</button>
                                                            <button data-toggle="modal" data-target="#courseModal" style={{ width: '20%', backgroundColor: '#089BD1', marginLeft: 5, marginRight: 5 }} className="btn btn-primary waves-effect waves-light"
                                                                onClick={() => {

                                                                }}>Edit Course</button>
                                                        </>
                                                        : null
                                                }
                                                <button style={{ width: '20%', backgroundColor: '#089BD1', marginLeft: 5, marginRight: 5 }} className="btn btn-primary waves-effect waves-light"
                                                    onClick={() => {
                                                        this.props.history.push('/courses')
                                                    }}
                                                >Back</button>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-sm-8 text-left">
                                                <h5>Course Details</h5>
                                                <p>{this.state.course.description}</p>
                                                <h5>Assessments Schedule</h5>
                                                <p>No Assessements</p>
                                                <h5>Announcements</h5>
                                                <div style={{ padding: 10, justifyContent: 'start' }} className="row">
                                                    {
                                                        assessments.map(item => (
                                                            <div style={{ backgroundColor: '#23B7ED', borderRadius: 10, margin: 5 }} className="col-md-6 col-lg-3 text-center">
                                                                <Link to={{
                                                                    pathname: "/assessmentdetail",
                                                                    state: {
                                                                        uid: item.uid
                                                                    }
                                                                }} className="text-dark">
                                                                    <h2 style={{ color: 'white' }}>
                                                                        {item.title}
                                                                    </h2>
                                                                    <h4 style={{ color: 'white' }}>{item.assessmentDate} </h4>
                                                                </Link>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                <p>No Announcements</p>
                                                <h5>Students</h5>
                                                {
                                                    this.state.course.students.map(item => (
                                                        <span>{item}, </span>
                                                    ))
                                                }
                                            </div>
                                            {/* <div className="col-sm-4 text-center">

                                            </div> */}
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
                        <AssessmentForm currentCourse={this.state.course} />
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

export default withRouter(connect(mapStatetoProps, actions)(CourseDetail));
