import React, { Component } from 'react';
import AUX from '../../../hoc/Aux_';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { } from '../../../store/actions/user'


class CourseDetail extends Component {

    state = {
        course: {
            title: ''
        }
    }

    dataValidation = () => {
        try {

        } catch (e) {
            console.log(e.message)
        }
    }

    componentWillMount = async () => {
        try {
            let course = await this.props.course.courses.find(i => i.uid === this.props.match.params.uid)
            this.setState({ course })
        } catch (e) {
            console.log(e.message)
        }
    }

    render() {
        console.log(this.state.course)
        return (
            <AUX>
                <div className="page-content-wrapper">
                    <div className="container-fluid">
                        <h1>{this.state.course.code} - {this.state.course.title}</h1>
                        <div className="row">
                            <div className="col-12">
                                <div className="card m-b-20">
                                    <div className="card-body">
                                        <h5>Course Details</h5>
                                        <p>{this.state.course.description}</p>
                                        <h5>Assessments Schedule</h5>
                                        <p>No Assessements</p>
                                        <h5>Announcements</h5>
                                        <p>No Announcements</p>
                                    </div>
                                </div >
                            </div >
                        </div>
                    </div >
                </div >
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

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(CourseDetail));