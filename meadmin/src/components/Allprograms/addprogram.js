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
import NumberFormat from 'react-number-format';

class AddProgram extends React.Component{
    constructor(){
        super();
        this.state={
            title : "",
            status : true,
            loading : "",
            errors : {},
            title_error : false,
            status_error : false,
            description:"",
            description_error:false,
            duration:'',
            duration_error:false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(e){
        if(e.target.name == "title"){
            if(e.target.value != ""){
                this.setState({title_error:false})
            }else{
                this.setState({title_error:true})
            }
        }
        if(e.target.name == "description"){
            if(e.target.value != ""){
                this.setState({description_error:false})
            }else{
                this.setState({description_error:true})
            }
        }
        if(e.target.name == "duration"){
            if(e.target.value != 0){
                this.setState({duration_error:false})
            }else{
                this.setState({duration_error:true})
            }
        }
      
        this.setState({[e.target.name]:e.target.value})
    }
    handleValidation(){
        let errors = {};
        let formIsValid = true;
        
        if (!this.state.duration){
            formIsValid = false;
            errors["duration"] = "Please enter duration";
            ReactDOM.findDOMNode(this.refs.duration).focus();
        }
        if (!this.state.description){
            formIsValid = false;
            errors["description"] = "Please enter description";
            ReactDOM.findDOMNode(this.refs.description).focus();
        }
        if (!this.state.title){
            formIsValid = false;
            errors["title"] = "Please enter title";
            ReactDOM.findDOMNode(this.refs.title).focus();
        }
        this.setState({
            errors: errors,
            title_error : true,
            description_error: true,
            duration_error : true
        });
        return formIsValid;
    }
    handleStatusChange(checked){
        this.setState({status : checked})
    }
    handleSubmit(e){
        e.preventDefault();
        let formval={}
        if(this.handleValidation()){
            this.setState({loading:1});
            formval = {
                'title': this.state.title,
                'status': this.state.status,
                'description':this.state.description,
                'duration': this.state.duration
            }
            axios.post(AppConstants.API+'/programs/addPrograms',formval)
                .then(res => { 
                    // console.log(res)
                    if(res.data.Status == "Success"){
                        setTimeout((e) => {
                            this.props.history.push('/programs');
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
        var element = document.getElementById("navItem-Programs-2");
        element.classList.add("active");
    }
    render(){
        return(
            <Page title="Add Programs">
                <ul className="cst-breadcrumb">
                    <li><Link to={'/dashboard'}>Dashboard</Link></li>
                    <li><Link to={'/programs'}>Programs</Link></li>
                    <li>Add Programs</li>
                </ul>
                <ReactTitle title="Add Programs"/>
                <Row>
                    <Col xl={12} lg={12} md={12}>
                        <Card>
                            <CardBody>
                                <Form name="addchild" onSubmit= { this.handleSubmit }>
                                    <FormGroup row>
                                        <Label for="title" sm={2}>
                                           Title<span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="title"
                                            placeholder="Title"                      
                                            value={this.state.title}
                                            onChange={ this.handleInputChange }   
                                            ref ="title"           
                                            />
                                            {this.state.title_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["title"]}</span>:""}
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="title" sm={2}>
                                           Description<span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="textarea"
                                            name="description"
                                            placeholder="Description"                      
                                            value={this.state.description}
                                            onChange={ this.handleInputChange }   
                                            ref ="description"           
                                            />
                                            {this.state.description_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["description"]}</span>:""}
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="title" sm={2}>
                                           Duration(Days)<span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <NumberFormat
                                            type="text"
                                            name="duration"
                                            placeholder="Duration"                      
                                            value={this.state.duration}
                                            onChange={ this.handleInputChange }   
                                            ref ="duration" className="form-control"  decimalScale={0} allowNegative={false}       
                                            />
                                            {this.state.duration_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["duration"]}</span>:""}
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
                                            
                                        </Col>
                                    </FormGroup>
                                    <FormGroup check row>
                                        <Col sm={{ size: 10, offset: 2 }}>
                                            <Button className="btn btn-primary" onClick={ this.handleSubmit }>Save    <div style={this.state.loading ? {} : { display: 'none' }} className="image-fill w-25 loader-div">               <div class="clearfix">
  <div class="spinner-border spinner-border-sm" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div></div></Button>&nbsp;
                                            <Link to={"/programs"} className="btn btn-danger" title="Cancel">&nbsp;Cancel</Link>
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
AddProgram.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});
export  default connect(mapStateToProps, {})(AddProgram);