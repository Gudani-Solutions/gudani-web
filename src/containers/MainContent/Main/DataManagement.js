import React, { Component } from 'react';
import AUX from '../../../hoc/Aux_';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../store/actions/dataManagement';
import Select from 'react-select';
import { functions } from '../../../config/firebase'

class DataManagement extends Component {

    state = {
        uid: '',
        errorMessage: '',
        selectedCourse: {},
        courseOptions: [],
        courseIsSelected: false,
        selectionError: false,
        departmentsData: [],
        department: '',
        department_err: '',
        title: '',
        title_err: '',
        code: '',
        code_err: '',
        description: '',
        description_err: '',
        isEditMode: false,
        photo: ''
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

    handleChangeDepartment = (e) => {
        this.setState({ department: e.target.value });
        if (e.target.value === '')
            this.setState({ department_err: 'Required Field' });
        else
            this.setState({ department_err: '' });
    }

    handleChangeTitle = (e) => {
        this.setState({ title: e.target.value });
        if (e.target.value === '')
            this.setState({ title_err: 'Required Field' });
        else
            this.setState({ title_err: '' });
    }

    handleChangeCode = (e) => {
        this.setState({ code: e.target.value });
        if (e.target.value === '')
            this.setState({ code_err: 'Required Field' });
        else
            this.setState({ code_err: '' });
    }

    handleChangeDescription = (e) => {
        this.setState({ description: e.target.value });
        if (e.target.value === '')
            this.setState({ description_err: 'Required Field' });
        else
            this.setState({ description_err: '' });
    }

    searchCourse = async (selectedCourse) => {
        try {
            this.setState({ selectedCourse: selectedCourse, courseIsSelected: true, selectionError: false })
        } catch (e) {
            console.log(e.message)
        }
    }

    deleteCourseData = async (item) => {
        try {
            this.props.deleteCourseData(item.uid)
        } catch (e) {
            console.log(e.message)
        }
    }

    addCourseData = async (e) => {
        try {
            e.preventDefault()
            if (this.state.department === '')
                this.setState({ department_err: 'Required Field' });
            if (this.state.title === '')
                this.setState({ title_err: 'Required Field' });
            if (this.state.code === '')
                this.setState({ code_err: 'Required Field' });
            if (this.state.description === '')
                this.setState({ description_err: 'Required Field' });

            if (this.state.department && this.state.title && this.state.code && this.state.description) {
                if (this.state.isEditMode) {
                    this.props.editCourseData(this.state)
                    this.setState({ isEditMode: false })
                } else {
                    this.props.createCourseData(this.state)
                }
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
                                                <h4 className="mt-0 header-title">Course Data</h4>
                                            </div>
                                            <div className="col-sm-6 text-right">
                                                <button data-toggle="modal" data-target="#courseModal" style={{ width: '25%', backgroundColor: '#089BD1' }} className="btn btn-primary waves-effect waves-light"
                                                    onClick={() => {
                                                        this.setState({ department: '', title: '', code: '', description: '' })
                                                    }}
                                                >Add Course Data</button>

                                            </div>
                                        </div>

                                        <div style={{ padding: 10, justifyContent: 'center' }} className="row">
                                            <table id="datatable" className="table table-striped dt-responsive nowrap table-vertical" width="100%" cellspacing="0">
                                                <thead>
                                                    <tr>
                                                        <th>Image</th>
                                                        <th>Course Details</th>
                                                        <th>Department</th>
                                                        <th>Number of Students</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.props.dataManagement.courseData.map(item => (
                                                            <tr>
                                                                <td className="product-list-img">
                                                                    {/* <img src="assets/images/products/1.jpg" className="img-fluid" alt="tbl" /> */}
                                                                </td>
                                                                <td>
                                                                    <h6 className="mt-0 m-b-5">{item.code}</h6>
                                                                    <p className="m-0 font-14">{item.title}</p>
                                                                </td>
                                                                <td>{item.department}</td>
                                                                <td>0</td>
                                                                <td>
                                                                    <Link to="#" data-toggle="modal" data-target="#courseModal" onClick={() => {
                                                                        this.setState({
                                                                            isEditMode: true,
                                                                            ...item
                                                                        })
                                                                    }} className="m-r-15 text-muted"> <i className="mdi mdi-pencil font-18"></i></Link>
                                                                    <Link onClick={() => this.deleteCourseData(item)} to="#" className="text-muted" ><i className="mdi mdi-close font-18"></i></Link>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>

                                        <div id="courseModal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                            <div style={{ margin: 'auto', paddingTop: 30, paddingBottom: 30, width: '80%' }} className="modal-dialog modal-lg">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title mt-0" id="myModalLabel">Create Course Data</h5>
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
                                                                            <input style={{ borderColor: this.state.department_err ? 'red' : null }} type="text" className="form-control" value={this.state.department} onChange={this.handleChangeDepartment} placeholder="Enter course department" />
                                                                            <span style={{ color: 'red' }} id="err">{this.state.department_err}</span>
                                                                        </div>

                                                                        <div className="form-group">
                                                                            <label>Course Title</label>
                                                                            <input style={{ borderColor: this.state.title_err ? 'red' : null }} type="text" className="form-control" value={this.state.title} onChange={this.handleChangeTitle} placeholder="Enter course title" />
                                                                            <span style={{ color: 'red' }} id="err">{this.state.title_err}</span>
                                                                        </div>

                                                                        <div className="form-group">
                                                                            <label>Course Code</label>
                                                                            <input style={{ borderColor: this.state.code_err ? 'red' : null }} type="text" className="form-control" value={this.state.code} onChange={this.handleChangeCode} placeholder="Enter course code" />
                                                                            <span style={{ color: 'red' }} id="err">{this.state.code_err}</span>
                                                                        </div>

                                                                        <div className="form-group">
                                                                            <label>Course Description</label>
                                                                            <textarea rows="4" style={{ borderColor: this.state.description_err ? 'red' : null }} type="text" className="form-control" value={this.state.description} onChange={this.handleChangeDescription} placeholder="Enter course description" />
                                                                            <span style={{ color: 'red' }} id="err">{this.state.description_err}</span>
                                                                        </div>

                                                                        <div className="col-sm-12 text-center">
                                                                            <button data-toggle={this.state.department && this.state.title && this.state.code && this.state.description ? "modal" : ""} data-target={this.state.department && this.state.title && this.state.code && this.state.description ? "#courseModal" : ""} style={{ width: '100%' }} onClick={(e) => this.addCourseData(e)} type="primary" color='primary' className="btn btn-success waves-effect waves-light" block>{this.state.isEditMode ? 'Update Course' : 'Add Course'}</button>
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
        dataManagement: state.dataManagement
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch)
}

export default withRouter(connect(mapStatetoProps, actions)(DataManagement));