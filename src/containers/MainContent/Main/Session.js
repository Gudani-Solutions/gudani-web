import React, { Component } from 'react';
import AUX from '../../../hoc/Aux_';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../store/actions/course';
import AssessmentForm from '../../../components/AssessmentForm';
import $ from 'jquery';
import { useHistory } from "react-router-dom";
import recordrtc, { invokeSaveAsDialog, MediaStreamRecorder } from 'recordrtc'
import RecordRTC from 'recordrtc';
import { storage } from '../../../config/firebase'
import uuid from 'uuid'
import firebase from 'firebase'
import { ProgressBar } from 'react-bootstrap';

class Session extends Component {

    state = {
        recorder: {},
        isEditMode: false,
        assessment: {
            title: '',
            startDate: '',
            startTime: '',
            duration: '',
            type: '',
            instructions: '',
        },
        assessements: [],
        percentUploaded: 0,
        sessionState: 'active'
    }

    componentWillMount = async () => {
        try {
            let assessment = await this.props.assessement.assessments.find(c => c.uid === this.props.location.state.uid)
            if (assessment) {
                this.setState({ assessment })
            }
            this.init()
        } catch (e) {
            console.log(e.message)
        }
    }

    init = async () => {
        try {
            var video = document.querySelector("#video");
            if (navigator.mediaDevices.getUserMedia) {
                let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                video.srcObject = stream;
                video.play()
                this.recorder = new RecordRTC(stream, {
                    type: 'video',
                    mimeType: 'video/mp4',
                    recorderType: MediaStreamRecorder,
                });
                this.recorder.startRecording();
            }

        } catch (e) {
            console.log(e.message)
        }

    }

    getRecording = async () => {
        try {
            let recorder = this.recorder
            let upload = this.upload
            this.recorder.stopRecording(function (blobURL) {
                let blob = recorder.getBlob()
                invokeSaveAsDialog(blob, 'video.webm');
                upload(blob)
            });

        } catch (e) {
            console.log(e.message)
        }
    }

    stopVideo = async () => {
        try {

            var video = document.querySelector("#video");
            var stream = video.srcObject;
            var tracks = stream.getTracks();

            for (var i = 0; i < tracks.length; i++) {
                var track = tracks[i];
                track.stop();
            }
        } catch (e) {
            console.log(e.message)
        }
    }

    exit = async () => {
        try {
            if (this.state.sessionState === 'active') {
                this.getRecording()
                this.stopVideo()
            } else {
                window.history.back()
            }
        } catch (e) {
            console.log(e.message)
        }
    }

    upload = async (file) => {
        try {

            console.log("blob", file)

            const uid = firebase.auth().currentUser.uid
            const ext = 'webm'
            const filename = `${uuid.v4()}.${ext}`
            var ref = storage().ref(`${uid}/${this.state.assessment.title}/sessions/${filename}`)

            this.setState({ uploadTask: ref.put(file) }, () => {
                this.state.uploadTask.on(
                    'state_changed',
                    snap => {
                        const percentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
                        // console.log('progress', percentUploaded);
                        this.setState({ percentUploaded: percentUploaded, sessionState: 'processing' });
                    },
                    err => {
                        console.error(err);
                        this.setState({
                            errors: this.state.errors.concat(err),
                            uploadState: 'error',
                            uploadTask: null
                        });
                    },
                    () => {
                        this.state.uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
                            this.setState({ uploadState: 'done', sessionState: 'inactive', job: { ...this.state.job, url: downloadUrl } })
                        })
                            .catch(err => {
                                console.error(err);
                                this.setState({
                                    errors: this.state.errors.concat(err),
                                    uploadState: 'error',
                                    uploadTask: null
                                })
                            })
                    }
                )
            })

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
                                        {this.state.sessionState === 'active' ?
                                            <button onClick={() => this.exit()} style={{ width: '100%' }}
                                                className="btn btn-danger waves-effect waves-light">
                                                <h2 style={{ color: 'white' }}>
                                                    Stop Assessment
                                                </h2>
                                            </button>
                                            :
                                            this.state.sessionState === 'processing' ?
                                                <button onClick={() => this.exit()} style={{ width: '100%' }}
                                                    className="btn btn-warning waves-effect waves-light">
                                                    <h2 style={{ color: 'white' }}>
                                                        Processing
                                                </h2>
                                                </button>
                                                :
                                                <button onClick={() => this.exit()} style={{ width: '100%' }}
                                                    className="btn btn-success waves-effect waves-light">
                                                    <h2 style={{ color: 'white' }}>
                                                        Exit Assessement
                                                </h2>
                                                </button>}

                                        {
                                            this.state.sessionState === 'active' ?
                                                <video className="mb-1" id="video" width={"100%"} style={{}} height={700} id="video" controls="controls" crossOrigin="anonymous" />
                                                :
                                                <div className="m-3">
                                                    <h4 className="mt-0 header-title text-center">{this.state.percentUploaded + '%'}</h4>
                                                    <ProgressBar variant={this.state.percentUploaded === 100 ? 'success' : 'warning'} active now={this.state.percentUploaded} style={{ height: '5px' }} />
                                                </div>
                                        }

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
        course: state.course,
        assessement: state.assessement
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch)
}

export default withRouter(connect(mapStatetoProps, actions)(Session));