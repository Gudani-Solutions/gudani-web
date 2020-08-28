import React, { Component } from 'react';
import AUX from '../../../hoc/Aux_';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { } from '../../../store/actions/user'

class Assessments extends Component {

    state = {
        assessment: {
            title: '',
            description: '',
            duration: '',
        },
        errorMessage: '',
    }

    dataValidation = () => {
        try {

        } catch (e) {
            console.log(e.message)
        }
    }

    componentWillMount = async () => {
        try {

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
                                                <h4 className="mt-0 header-title">Assessments</h4>
                                            </div>
                                            <div className="col-sm-6 text-right">
                                                <button data-toggle="modal" data-target="#courseModal" style={{ width: '25%', backgroundColor: '#089BD1' }} className="btn btn-primary waves-effect waves-light"
                                                    onClick={() => {

                                                    }}
                                                >Add Assessment</button>

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
                                                                <div className="row">
                                                                    <div className="col-sm-12">
                                                                        <div className="form-group">
                                                                            <label for="metatitle">Course</label>
                                                                            <input onChange={(event) => this.setState({ course: { ...this.state.assessment, title: event.target.value } })} placeholder="Enter course code" value={this.state.assessment.course} id="metatitle" name="productname" type="text" className="form-control" />
                                                                        </div>

                                                                        <div className="form-group">
                                                                            <label for="metatitle">Description</label>
                                                                            <input onChange={(event) => this.setState({ course: { ...this.state.assessment, description: event.target.value } })} placeholder="Enter course code" value={this.state.assessment.description} id="metatitle" name="productname" type="text" className="form-control" />
                                                                        </div>


                                                                        <div className="col-sm-12 text-center">
                                                                            <button style={{ width: '100%' }} onClick={(e) => this.searchCourse(e)} type="primary" color='primary' className="btn btn-success waves-effect waves-light" block>Submit</button>
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

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Assessments));