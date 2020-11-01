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
        isEditMode: false,
        assessment: {
            uid: '',
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
            let assessment = await this.props.assessement.assessments.find(c => c.uid === this.props.location.state.uid)
            if (assessment.uid) {
                this.setState({ assessment })
            }
            console.log(this.state.assessment)
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
                                                <button data-toggle="modal" data-target="#assessmentModal" style={{ width: '20%', backgroundColor: '#089BD1', marginLeft: 5, marginRight: 5 }} className="btn btn-primary waves-effect waves-light"
                                                    onClick={() => {
                                                        this.setState({ isEditMode: true })
                                                    }}
                                                >Edit</button>
                                                <button data-toggle="modal" data-target="#courseModal" style={{ width: '20%', backgroundColor: '#089BD1', marginLeft: 5, marginRight: 5 }} className="btn btn-primary waves-effect waves-light"
                                                    onClick={() => {
                                                        this.props.history.push({
                                                            pathname: '/coursedetail',
                                                            state: { uid: this.state.assessment.courseUid },
                                                        })
                                                    }}
                                                >Back</button>
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
                                        <Link style={{ width: '100%' }} to={{
                                            pathname: "/session",
                                            state: {
                                                uid: this.props.location.state.uid
                                            }
                                        }} className="btn btn-success waves-effect waves-light">
                                            <h2 style={{ color: 'white' }}>
                                                Start Assessement
                                                </h2>
                                        </Link>
                                    </div>
                                </div >
                            </div >
                        </div>

                        {
                            this.state.assessment.uid ? <AssessmentForm currentAssessment={this.state.assessment} isEditMode={true} /> : null
                        }

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