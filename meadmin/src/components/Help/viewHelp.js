import React from 'react';
import Page from 'components/Page';
import AppConstants from 'AppConstants';
import {ReactTitle} from 'react-meta-tags';
import  { Link } from 'react-router-dom';
import {
    Row,
    Card,
    CardHeader,
    CardBody,
    Label
  } from 'reactstrap';
  import {
    MdInfoOutline, MdHelp
  } from 'react-icons/md';
import "react-datepicker/dist/react-datepicker.css";
import Child1 from 'assets/img/users/300_13.jpg';
import Loader from 'react-loader';

import axios from 'axios';
class ViewHelp extends React.Component{
    constructor(){
        super()
        this.state = {
            question: "",
            child_name : "",
            child_user_type : "",
            parent_usertype:"",
            created_date:"",
            mentor_name:"",
            mentor_type : "",
            page_loader : false,
        }
    }
    
    
    componentDidMount(){
        // console.log(this.props.match.params.id,this.props.match.params.type)
        var element = document.getElementById("navItem-Help-1");
        element.classList.add("active");
        var that = this;
        var formval = {};
        formval = {
            'id': this.props.match.params.id
        }
        axios.post(AppConstants.API+'/helpQues/getUserHelpQuestions', formval).then(res => {
          //  console.log(res.data)
            if(res.data.Status=="Success"){
                console.log(res.data.data[0].question)
                
                that.setState({
                    question:res.data.data[0].question,
                    child_name: res.data.data[0].child_name,
                    parent_name: res.data.data[0].parent_name,
                    child_user_type: res.data.data[0].childuser_type,
                    parent_usertype :res.data.data[0].parent_usertype,
                    mentor_name : res.data.data[0].mentor_name,
                    mentor_type : res.data.data[0].mentor_type,
                    created_date: res.data.data[0].helpdate,
                    page_loader : true,
                })
            }
          })
    // var element = document.getElementById("navItem-Help-10");
    // element.classList.add("active");
    }
    render(){
      
        return(<Loader loaded={this.state.page_loader}  >
            <Page title="View Help">
                 
                <ul className="cst-breadcrumb">
                    <li><Link to={'/dashboard'}>Dashboard</Link></li>
                    <li><Link to={'/helpQuestions'}>Help</Link></li>
                    <li>View Help</li>
                </ul>
                <ReactTitle title="View Help"/>
                <Row>
                    {/* <Col xl={12} lg={12} md={12}> */}
                    <Card className="mb-4 w-100 p-0">
                        <CardHeader> 
                            <Label for="examplePassword" sm={12} className="px-0">
                                <strong><MdHelp fontSize="24" className="mr-2" />View Help</strong>
                            </Label>
                        </CardHeader>
                        <CardBody className="row">
                            <div className="col-6">
                                <ul className="view-detail co1-sm-12">
                                    <li>
                                        <label className="col-6">Question</label>
                                        <p className="col-4">{this.state.question ? this.state.question : 'N/A'} </p>
                                    </li>
                                    <li>
                                        <label className="col-6">User Name</label>
                                        <p className="col-4">{this.state.child_name ? this.state.child_name : this.state.parent_name} {this.state.mentor_name ? this.state.mentor_name : ""}</p>
                                    </li>
                                    <li>
                                        <label className="col-6">User Type</label>
                                        <p className="col-4">{this.state.child_user_type ? 'Client' : ''}{this.state.mentor_type ? this.state.mentor_type : ""} </p>
                                    </li>
                                    <li>
                                        <label className="col-6">Created Date</label>
                                        <p className="col-4">{this.state.created_date ? this.state.created_date : 'N/A'} </p>
                                    </li>
                                </ul>
                            </div>
                        </CardBody>
                    </Card>
                </Row>
               
            </Page> </Loader>
        )
    }
}
export default ViewHelp;