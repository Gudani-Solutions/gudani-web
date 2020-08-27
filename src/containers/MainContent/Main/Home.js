import React, { Component } from 'react';
import AUX from '../../../hoc/Aux_';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { } from '../../../store/actions/user'


class Home extends Component {

    state = {
        
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

                        
                    </div>
                </div >
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
    return bindActionCreators({  }, dispatch)
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Home));