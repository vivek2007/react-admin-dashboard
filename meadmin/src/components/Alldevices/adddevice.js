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
            city:"",
            city_error:false,
            area:'',
            area_error:false
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
        if(e.target.name == "city"){
            if(e.target.value != ""){
                this.setState({city_error:false})
            }else{
                this.setState({city_error:true})
            }
        }
        if(e.target.name == "area"){
            if(e.target.value != 0){
                this.setState({area_error:false})
            }else{
                this.setState({area_error:true})
            }
        }
      
        this.setState({[e.target.name]:e.target.value})
    }
    handleValidation(){
        let errors = {};
        let formIsValid = true;
        
        if (!this.state.area){
            formIsValid = false;
            errors["area"] = "Please enter area";
            ReactDOM.findDOMNode(this.refs.area).focus();
        }
        if (!this.state.city){
            formIsValid = false;
            errors["city"] = "Please enter city";
            ReactDOM.findDOMNode(this.refs.city).focus();
        }
        if (!this.state.title){
            formIsValid = false;
            errors["title"] = "Please enter title";
            ReactDOM.findDOMNode(this.refs.title).focus();
        }
        this.setState({
            errors: errors,
            title_error : true,
            city_error: true,
            area_error : true
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
                'city':this.state.city,
                'area': this.state.area
            }
            axios.post(AppConstants.API+'/Devices/addDevice',formval)
                .then(res => { 
                    // console.log(res)
                    if(res.data.Status == "Success"){
                        setTimeout((e) => {
                            this.props.history.push('/devices');
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
        var element = document.getElementById("navItem-Devices-3");
        element.classList.add("active");
    }
    render(){
        return(
            <Page title="Add Devices">
                <ul className="cst-breadcrumb">
                    <li><Link to={'/dashboard'}>Dashboard</Link></li>
                    <li><Link to={'/devices'}>Devices</Link></li>
                    <li>Add Devices</li>
                </ul>
                <ReactTitle title="Add Devices"/>
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
                                           City<span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="city"
                                            placeholder="city"                      
                                            value={this.state.city}
                                            onChange={ this.handleInputChange }   
                                            ref ="city"           
                                            />
                                            {this.state.city_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["city"]}</span>:""}
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="title" sm={2}>
                                           Area<span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                         <Input
                                            type="text"
                                            name="area"
                                            placeholder="area"                      
                                            value={this.state.area}
                                            onChange={ this.handleInputChange }   
                                            ref ="area" className="form-control"  decimalScale={0} allowNegative={false}       
                                            />
                                            {this.state.area_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["area"]}</span>:""}
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
                                            <Link to={"/devices"} className="btn btn-danger" title="Cancel">&nbsp;Cancel</Link>
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