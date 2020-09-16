import React from 'react';
import Page from 'components/Page';
import axios from 'axios';
import AppConstants from 'AppConstants';
import {ReactTitle} from 'react-meta-tags';
import  { Link } from 'react-router-dom';
import {
    Row,
    Col,
    Card,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
  } from 'reactstrap';
import Loading from 'assets/img/loader.gif';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import Switch from "react-switch";

class AddLanguage extends React.Component{
    constructor(){
        super();
        this.state={
            title : "",
            status : true,
            loading : "",
            errors : {},
            title_error : false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(e){
        if(e.target.name == "title"){
            if(e.target.value != ""){
                this.setState({title_error:false})
            }
        }
        // if(e.target.name == "status"){
        //     if(e.target.value != ""){
        //         this.setState({status_error:false})
        //     }
        // }
        this.setState({[e.target.name]:e.target.value})
    }
    handleStatusChange(checked){
        this.setState({status : checked})
    }
    handleValidation(){
        let errors = {};
        let formIsValid = true;
        // console.log(this.state.name)
        // if (!this.state.status){
        //     formIsValid = false;
        //     errors["status"] = "Please select status";
        //     ReactDOM.findDOMNode(this.refs.status).focus();
        // }
        if (!this.state.title){
            formIsValid = false;
            errors["title"] = "Please enter title";
            ReactDOM.findDOMNode(this.refs.title).focus();
        }
        this.setState({
            errors: errors,
            title_error : true,
            // status_error : true
        });
        return formIsValid;
    }
    handleSubmit(e){
        e.preventDefault();
        let formval={}
        if(this.handleValidation()){
            this.setState({loading:1});
            formval = {
                'name': this.state.title,
                'status': this.state.status,
            }
            axios.post(AppConstants.API+'/language/addLanguage',formval)
                .then(res => { 
                    // console.log(res)
                    if(res.data.Status == "Success"){
                        setTimeout((e) => {
                            this.props.history.push('/languages');
                        }, 2000);
                        setTimeout(() => {
                          this.setState({
                            loading:'',
                            errMsg:  (<div className="alert alert-success fade show mt-3">{res.data.msg}</div>),
                          });
                        }, 1000);
                    }
                    else{
                        setTimeout(() => {
                          this.setState({
                            loading:'',
                            errMsg:  (<div className="alert alert-danger fade show mt-3">{res.data.msg}</div>),
                          });
                        }, 1000);
                    }
            })
        }
        // console.log(this.state.title,this.state.status)
    }
    componentDidMount(){
        var element = document.getElementById("navItem-Languages-1");
        element.classList.add("active");
    }
    render(){
        return(
            <Page title="Add Language">
                <ul className="cst-breadcrumb">
                    <li><Link to={'/dashboard'}>Dashboard</Link></li>
                    <li><Link to={'/languages'}>All Languages</Link></li>
                    <li>Add Language</li>
                </ul>
                <ReactTitle title="Add Language"/>
                <Row>
                    <Col xl={12} lg={12} md={12}>
                        <Card>
                            <CardBody>
                                <Form name="addchild" onSubmit= { this.handleSubmit }>
                                    <FormGroup row>
                                        <Label for="title" sm={2}>
                                        Language Name<span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="title"
                                            placeholder="Language Name"                      
                                            value={this.state.title}
                                            onChange={ this.handleInputChange }   
                                            ref ="title"           
                                            />
                                            {this.state.title_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["title"]}</span>:""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="status" sm={2}>
                                           Status
                                        </Label>
                                        <Col sm={10}>
                                        <Switch onChange={this.handleStatusChange.bind(this)} checked={this.state.status} 
                                         uncheckedIcon={
                                            <div
                                                style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                height: "100%",
                                                fontSize: 15,
                                                width:"150px",
                                                color: "#000",
                                                fontWeight: "bold",
                                                paddingRight: 2
                                                }}
                                            >
                                                Inactive
                                            </div>
                                            }
                                            checkedIcon={
                                            <div
                                                style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                height: "100%",
                                                fontSize: 15,
                                                width:"180px",
                                                fontWeight: "bold",
                                                color: "#000",
                                                paddingRight: 2
                                                }}
                                            >
                                                Active
                                            </div>
                                            }
                                            onColor = "#45b649"
                                            offColor = "#ffd700"
                                            className="react-switch"
                                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                            height={20}
                                            width={48}
                                            handleDiameter={30}
                                        />
                                            {/* {this.state.status_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["status"]}</span>: ""} */}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup check row>
                                        <Col sm={{ size: 10, offset: 2 }}>
                                            <Button className="btn btn-primary" onClick={ this.handleSubmit }>Save    <div style={this.state.loading ? {} : { display: 'none' }} className="image-fill w-25 loader-div">               <div class="clearfix">
  <div class="spinner-border spinner-border-sm" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div></div></Button>&nbsp;
                                            <Link to={"/languages"} className="btn btn-danger" title="Cancel">&nbsp;Cancel</Link>
                                        </Col>
                                    </FormGroup>
                                    {this.state.errMsg}
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Page>
        )
    }
}
AddLanguage.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});
export  default connect(mapStateToProps, {})(AddLanguage);