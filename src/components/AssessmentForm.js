import React, { Component } from 'react';
import * as actions from '../store/actions/assessment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AssessmentForm extends Component {
    state = {
        isEditMode: false,
        assessment: {
            title: '',
            assessmentDate: '',
            assessmentTime: '',
            duration: '',
            type: '',
            instructions: '',
        },
        title_err: '',
        assessmentDate_err: '',
        assessmentTime_err: '',
        duration_err: '',
        type_err: '',
        instructions_err: '',
    }

    componentWillMount = async () => {
        try {
            if (this.props.isEditMode) {
                this.setState({ assessment: this.props.currentAssessment })
            }

        } catch (e) {
            console.log(e.message)
        }
    }

    handleChangeTitle = (e) => {
        this.setState({ assessment: { ...this.state.assessment, title: e.target.value } });
        if (e.target.value === '')
            this.setState({ title_err: 'Required Field' });
        else
            this.setState({ title_err: '' });
    }

    handleChangeDate = (e) => {
        this.setState({ assessment: { ...this.state.assessment, assessmentDate: e.target.value } });
        if (e.target.value === '')
            this.setState({ assessmentDate_err: 'Required Field' });
        else
            this.setState({ assessmentDate_err: '' });
    }

    handleChangeTime = (e) => {
        this.setState({ assessment: { ...this.state.assessment, assessmentTime: e.target.value } });
        if (e.target.value === '')
            this.setState({ assessmentTime_err: 'Required Field' });
        else
            this.setState({ assessmentTime_err: '' });
    }

    handleChangeDuration = (e) => {
        this.setState({ assessment: { ...this.state.assessment, duration: e.target.value } });
        if (e.target.value === '')
            this.setState({ duration_err: 'Required Field' });
        else
            this.setState({ duration_err: '' });
    }

    handleChangeType = (e) => {
        this.setState({ assessment: { ...this.state.assessment, type: e.target.value } });
        if (e.target.value === '')
            this.setState({ type_err: 'Required Field' });
        else
            this.setState({ type_err: '' });
    }

    handleChangeInstructions = (e) => {
        this.setState({ assessment: { ...this.state.assessment, instructions: e.target.value } });
        if (e.target.value === '')
            this.setState({ instructions_err: 'Required Field' });
        else
            this.setState({ instructions_err: '' });
    }

    updateAssessment = async (e) => {
        try {
            e.preventDefault()
            if (this.state.assessment.title === '')
                this.setState({ title_err: 'Required Field' });
            if (this.state.assessment.assessmentDate === '')
                this.setState({ assessmentDate_err: 'Required Field' });
            if (this.state.assessment.assessmentTime === '')
                this.setState({ assessmentTime_err: 'Required Field' });
            if (this.state.assessment.duration === '')
                this.setState({ duration: 'Required Field' });
            if (this.state.assessment.type === '')
                this.setState({ type_err: 'Required Field' });
            if (this.state.assessment.instructions === '')
                this.setState({ instructions_err: 'Required Field' });

            if (this.state.assessment.title && this.state.assessment.assessmentDate && this.state.assessment.assessmentTime &&
                this.state.assessment.duration && this.state.assessment.type && this.state.assessment.instructions) {
                if (this.props.isEditMode) {
                    await this.props.editAssessment(this.state.assessment)
                } else {
                    await this.props.createAssessment(this.state.assessment, this.props.currentCourse.uid)
                }
            }
        } catch (e) {
            console.log(e.message)
        }
    }

    deleteAssessment = async (e) => {
        try {
            this.props.deleteAssessment(this.state.assessment.uid, this.state.assessment.courseUid)
            e.preventDefault()
            this.props.history.push({
                pathname: '/coursedetail',
                state: { uid: this.state.assessment.courseUid },
            })
        } catch (e) {
            console.log(e.message)
        }
    }

    render() {
        return (

            <div id="assessmentModal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div style={{ margin: 'auto', paddingTop: 30, paddingBottom: 30, width: '80%' }} className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title mt-0" id="myModalLabel">Create Assessment</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                        </div>
                        <div className="modal-body">
                            {
                                this.state.errorMessage ?
                                    <p style={{ color: 'red' }} className="text-muted m-b-30 font-14 alert-danger">{this.state.errorMessage}</p> : null
                            }

                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input style={{ borderColor: this.state.title_err ? 'red' : null }} type="text" className="form-control" value={this.state.assessment.title} onChange={this.handleChangeTitle} placeholder="Enter assessment title" />
                                        <span style={{ color: 'red' }} id="err">{this.state.title_err}</span>
                                    </div>

                                    <div className="form-group">
                                        <label>Assessment Date</label>
                                        <input style={{ borderColor: this.state.title_err ? 'red' : null }} type="text" className="form-control" value={this.state.assessment.assessmentDate} onChange={this.handleChangeDate} placeholder="mm/dd/yyyy" />
                                        <span style={{ color: 'red' }} id="err">{this.state.title_err}</span>
                                    </div>

                                    <div className="form-group">
                                        <label>Assessment Time</label>
                                        <input style={{ borderColor: this.state.assessmentTime_err ? 'red' : null }} type="text" className="form-control" value={this.state.assessment.assessmentTime} onChange={this.handleChangeTime} placeholder="hh/mm" />
                                        <span style={{ color: 'red' }} id="err">{this.state.assessmentTime_err}</span>
                                    </div>

                                    <div className="form-group">
                                        <label>Assessment Duration</label>
                                        <input style={{ borderColor: this.state.duration_err ? 'red' : null }} type="text" className="form-control" value={this.state.assessment.duration} onChange={this.handleChangeDuration} placeholder="Enter assessment duration" />
                                        <span style={{ color: 'red' }} id="err">{this.state.duration_err}</span>
                                    </div>

                                    <div className="form-group">
                                        <label>Assessment Type</label>
                                        <input style={{ borderColor: this.state.type_err ? 'red' : null }} type="text" className="form-control" value={this.state.assessment.type} onChange={this.handleChangeType} placeholder="Enter assessment type" />
                                        <span style={{ color: 'red' }} id="err">{this.state.type_err}</span>
                                    </div>

                                    <div className="form-group">
                                        <label>Assessment Instructions</label>
                                        <textarea rows="4" style={{ borderColor: this.state.instructions_err ? 'red' : null }} type="text" className="form-control" value={this.state.assessment.instructions} onChange={this.handleChangeInstructions} placeholder="Enter assessment instructions" />
                                        <span style={{ color: 'red' }} id="err">{this.state.instructions_err}</span>
                                    </div>

                                    {
                                        this.props.isEditMode ?
                                            <>
                                                <div className="col-sm-12 text-center">
                                                    <button data-toggle={this.state.assessment.title && this.state.assessment.assessmentDate && this.state.assessment.assessmentTime &&
                                                        this.state.assessment.duration && this.state.assessment.type && this.state.assessment.instructions ? "modal" : ""}
                                                        data-target={this.state.assessment.title && this.state.assessment.assessmentDate && this.state.assessment.assessmentTime &&
                                                            this.state.assessment.duration && this.state.assessment.type && this.state.assessment.instructions ?
                                                            "#assessmentModal" : ""} style={{ width: '100%' }} onClick={(e) => this.updateAssessment(e)} type="primary"
                                                        color='primary' className="btn btn-success waves-effect waves-light" block>Edit Assessment</button>
                                                </div>
                                                <div style={{ marginTop: 10 }} className="col-sm-12 text-center">
                                                    <button style={{ width: '100%' }} onClick={(e) => this.deleteAssessment(e)} type="danger"
                                                        data-toggle={this.state.assessment.title && this.state.assessment.assessmentDate && this.state.assessment.assessmentTime &&
                                                            this.state.assessment.duration && this.state.assessment.type && this.state.assessment.instructions ? "modal" : ""}
                                                        data-target={this.state.assessment.title && this.state.assessment.assessmentDate && this.state.assessment.assessmentTime &&
                                                            this.state.assessment.duration && this.state.assessment.type && this.state.assessment.instructions ?
                                                            "#assessmentModal" : ""}
                                                        color='primary' className="btn btn-danger waves-effect waves-light" block>Delete</button>
                                                </div>
                                            </>
                                            :
                                            <div className="col-sm-12 text-center">
                                                <button data-toggle={this.state.assessment.title && this.state.assessment.assessmentDate && this.state.assessment.assessmentTime &&
                                                    this.state.assessment.duration && this.state.assessment.type && this.state.assessment.instructions ? "modal" : ""}
                                                    data-target={this.state.assessment.title && this.state.assessment.assessmentDate && this.state.assessment.assessmentTime &&
                                                        this.state.assessment.duration && this.state.assessment.type && this.state.assessment.instructions ?
                                                        "#assessmentModal" : ""} style={{ width: '100%' }} onClick={(e) => this.updateAssessment(e)} type="primary"
                                                    color='primary' className="btn btn-success waves-effect waves-light" block>Create Assessment</button>
                                            </div>
                                    }
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        );
    }
}

const mapStatetoProps = state => {
    return {
        user: state.user,
        course: state.course
    };
}


export default withRouter(connect(mapStatetoProps, actions)(AssessmentForm))