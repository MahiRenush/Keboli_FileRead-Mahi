import React, {Component} from 'react';

export class Login extends Component{
    state={
        uname: "keboli",
        pwd: "keboli",
        authenticated: false
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        if(e.target[0].value == this.state.uname && e.target[1].value == this.state.pwd)
            this.setState({authenticated: true} , ()=>{this.props.getAuth(this.state.authenticated)})
        console.log(this.state)
    }
    render(){
        return(
            <div className="container">
                <div id="login-row" className="row justify-content-center">
                    <div id="login-column" className="col-md-6">
                        <div id="login-box" className="col-md-12">
                            <form id="login-form" className="form" onSubmit={this.handleSubmit}>
                                <h3 className="text-center text-success">Login</h3>
                                <div className="form-group">
                                    <label htmlFor="username" className="text-info">Username:</label>
                                    <input type="text" name="username" id="username" className="form-control"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password" className="text-info">Password:</label><br></br>
                                    <input type="password" name="password" id="password" className="form-control"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="remember-me" className="text-info"><span>Remember me</span> <span><input id="remember-me" name="remember-me" type="checkbox"/></span></label><br></br>
                                    <input type="submit" name="Sign-in" className="btn btn-info btn-md"></input>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}