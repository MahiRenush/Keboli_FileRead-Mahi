import React, { Component } from 'react'
import { Login } from '../LoginComponent/LoginContainer';
import Filefetch from './Filefetch';

class MainComponent extends Component{
    state={
        authenticated : false
    }
    getAuth=(authVal)=>{
        this.setState({
            authenticated :authVal
        })
    }
    render(){
        return(
            <React.Fragment>
                {!this.state.authenticated && <Login getAuth={this.getAuth}/>}
                {this.state.authenticated && <Filefetch/>}
            </React.Fragment>
        )
    }
}
export default MainComponent