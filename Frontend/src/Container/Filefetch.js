import React,{ Component } from "react";
import axios from 'axios'

class Filefetch extends Component{
    state={
        input:{
            filename: null,
            searchstring: null
        },
        output:[],showAlert: false
    }
    showAlert= false;
    NOFILE= "No such file is found in the database of backend";
    componentDidMount(){
        
    }
    handleClick=()=>{
        axios({method: 'POST', url: 'http://localhost:8080', crossDomain: true, mode: 'no-cors',data:  this.state.input})
        .then(res => {
            if(res.data == "NOFILE"){
                this.setState({
                    showAlert: true
                })
            }
            else{
                this.setState({
                    output:[...this.state.output, res.data],
                    showAlert: false
                }, ()=>console.log(this.state.output));
                ;
            }
        })
        .catch((error) => {
            this.setState({
                showAlert: true
            });
            console.log(error);
            throw error;
        });
    }
    onsearched=(e)=>{
        this.setState({
            input:{...this.state.input,
                [e.target.name]: e.target.value}
        }, console.log(this.state))
    }
    render(){
        return(
            <React.Fragment>
                <div className="navbar navbar-expand-md navbar-dark bg-dark"><h3 className="display-5 navbar-brand">Fetching particular File data</h3></div>
                <div className="row"><br></br><br></br></div>
                <div className="container">
                    <div className="row justify-content-center" >
                        
                        <div className="col-md-5">
                            {/* <label htmlFor="filename">Name of the file</label>&nbsp; */}
                            <input name="filename" className="text-type" placeholder="Name of the file" onChange={this.onsearched}/>
                        </div>
                        <div className="col-md-5">
                            {/* <label htmlFor="searchstring" >The string to be searched</label>&nbsp; */}
                            <input name="searchstring" className="text-type" placeholder="The string to be searched" onChange={this.onsearched}/>
                        </div>
                        <div className="col-md-2">
                            <button id="submit" className="btn btn-md btn-primary" onClick={this.handleClick}>Search</button>
                        </div>
                    </div>
                </div><br></br>
                {this.state.showAlert ? <div className="container alert alert-danger">{this.NOFILE}</div>:
                 <table className="container table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">File Name</th>
                        <th scope="col">Search String</th>
                        <th scope="col">Size</th>
                        <th scope="col">No. of Occurences</th>
                        <th scope="col">Format</th>
                        </tr>
                    </thead>
                    {this.state.output.map(value=> (
                    <tbody>
                        <tr>
                            <th scope="row">{value.filename} </th>
                            <td>{value.searchstring} </td>
                            <td>{value.sizeinkb} </td>
                            <td>{value.occurrence} </td>
                            <td>{value.format} </td>
                        </tr>
                    </tbody>))}
                </table>}
            </React.Fragment>
        )
    }
}

export default Filefetch