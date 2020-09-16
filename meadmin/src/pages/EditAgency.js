import React from 'react';
import  { Redirect,Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback,
} from 'reactstrap';

import {
  MdCreate,
  MdDelete,
  MdRemoveRedEye,
  MdLaunch,
  MdAdd,
} from 'react-icons/md';
import Page from 'components/Page';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppConstants from 'AppConstants';
import placeholderimg from '../assets/img/placeholder.png';
import {ReactTitle} from 'react-meta-tags'
import ReactDOM from 'react-dom';

class Editagency extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      _id:this.props.auth.user._id,
      id:this.props.match.params.id,
      firstname:'',
      lastname:'',
      email:'',
      profile_img:'',
      address1:'',
      //address2:'',
      phone:'',
      //gender:'',
      //country:'',
      state:'',
      city:'',
      zipcode:'', 
      status:'', 
	  profile_image:null,
      prev_logo: '',
      view_logo: '',
      old_img:'',
      errors: {},
      //errMsg:'',
      errMsg:false,
      role_id:'',
      reg_type:'',
      user_type:'',
      users: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
	this.handleprofile_image = this.handleprofile_image.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onChangeNumberkey = this.onChangeNumberkey.bind(this);
    this.inputChangedHandlerContact = this.inputChangedHandlerContact.bind(this); 
    this.handleKeyUp = this.handleKeyUp.bind(this);  
 
  }
  inputChangedHandlerContact = (values) => {
    this.setState({
      phone: values.value,
    });
  }
  onChangeNumberkey(e){
		const states = this.state
		const re = /^[0-9\b]+$/;
		if (e.target.value === '' || re.test(e.target.value)) {
		states[e.target.name] = e.target.value;
		this.setState({states})
		}
	}
  handleInputChange(e) {
    this.setState({
        [e.target.name]: e.target.value.trimLeft(/(^\s+|\s+$)/g, '')
    });
  }
  
  handleprofile_image(e) {
       this.setState({
			[e.target.name]:e.target.files[0],
			old_img:'',
			prev_logo:URL.createObjectURL(e.target.files[0])
			
		});
	}
  
  /** Validations */
  handleValidation(){
    let errors = {};
    let formIsValid = true;
    if(this.state.profile_image == ''){
      formIsValid = false;
      errors["profile_image"] = "Please choose profile image";
      ReactDOM.findDOMNode(this.refs.profile_image).focus();
    }
     
    if(!this.state.phone){
      formIsValid = false;
      errors["phone"] = "Please enter contact number";
      ReactDOM.findDOMNode(this.refs.phone).focus();
    }else if(this.state.phone.length!=10){
      formIsValid = false;
      errors["phone"] = "Please enter 10 digits contact number";
      ReactDOM.findDOMNode(this.refs.phone).focus();
    }
     
  
    if(!this.state.zipcode){
      formIsValid = false;
      errors["zipcode"] = "Please enter zipcode";
      ReactDOM.findDOMNode(this.refs.zipcode).focus();
      }else if(this.state.zipcode.length!=5){
      formIsValid = false;
      errors["zipcode"] = "Please enter 5 digits zipcode";
      ReactDOM.findDOMNode(this.refs.zipcode).focus();
    }
    if(!this.state.city){
      formIsValid = false;
      errors["city"] = "Please enter city";
      ReactDOM.findDOMNode(this.refs.city).focus();
    }

    if(!this.state.state){
      formIsValid = false;
      errors["state"] = "Please enter state";
      ReactDOM.findDOMNode(this.refs.state).focus();
    }

    if(!this.state.address1){
      formIsValid = false;
      errors["address1"] = "Please enter address";
      ReactDOM.findDOMNode(this.refs.address1).focus();
    }
    if(this.state.email !== ""){
      let lastAtPos = this.state.email.lastIndexOf('@');
      let lastDotPos = this.state.email.lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
        ReactDOM.findDOMNode(this.refs.email).focus();
      }
    }
    if(!this.state.email){
      formIsValid = false;
      errors["email"] = "Please enter email";
      ReactDOM.findDOMNode(this.refs.email).focus();
    }
    if(!this.state.lastname){
      formIsValid = false;
      errors["lastname"] = "Please enter last name";
      ReactDOM.findDOMNode(this.refs.lastname).focus();
    } 
    if(!this.state.firstname){
      formIsValid = false;
      errors["firstname"] = "Please enter first name";
      ReactDOM.findDOMNode(this.refs.firstname).focus();
    }
	
    this.setState({errors: errors});
    return formIsValid;
  }
  handleKeyUp(e) {
     let errors = {};
    let formIsValid = true;
    if(!this.state.firstname){
      formIsValid = false;
      errors["firstname"] = "Please enter first name";
    }

    if(!this.state.lastname){
        formIsValid = false;
        errors["lastname"] = "Please enter last name";
    }

    if(!this.state.email){
        formIsValid = false;
        errors["email"] = "Please enter email";
    }
    if(this.state.email !== ""){
        let lastAtPos = this.state.email.lastIndexOf('@');
        let lastDotPos = this.state.email.lastIndexOf('.');
  
        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
          formIsValid = false;
          errors["email"] = "Email is not valid";
        }
    }

    if(!this.state.address1){
        formIsValid = false;
        errors["address1"] = "Please enter address";
    }
	if(!this.state.phone){
		formIsValid = false;
		errors["phone"] = "Please enter contact number";
	}else if(this.state.phone.length!=10){
		formIsValid = false;
		errors["phone"] = "Please enter 10 digits contact number";
	}
    if(!this.state.state){
        formIsValid = false;
        errors["state"] = "Please enter state";
    }

    if(!this.state.city){
        formIsValid = false;
        errors["city"] = "Please enter city";
    }
	if(!this.state.zipcode){
        formIsValid = false;
        errors["zipcode"] = "Please enter zipcode";
    }else if(this.state.zipcode.length!=5){
		formIsValid = false;
		errors["zipcode"] = "Please enter 5 digits zipcode";
	}
	
	if(this.state.profile_image == undefined && this.state.prev_logo==''){
      formIsValid = false;
      errors["profile_image"] = "Please choose profile image";
    }
	
    this.setState({errors: errors});
    return formIsValid;
  }
  handleSubmit = event => {
    event.preventDefault();
    //alert('form submitted');   
    var str =this.state.phone; 
    if(str!=''){
		var res = str.substr(0, 3);
		var res1 = str.substr(3, 3);
		var res2 = str.substr(6, 4);
		var contactnumber="("+res+")"+" "+res1+"-"+res2;
	}else{
		var contactnumber="";
	}
    if(this.handleValidation()){
		{/*const updateAgencyInfo = {
        _id:this.props.auth.user._id,
        user_id:this.props.match.params.id,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        address1: this.state.address1,
        //address2: this.state.address2,
        phone: contactnumber,
        //country: this.state.country,
        state: this.state.state,
        city: this.state.city,
        zipcode: this.state.zipcode,
        //gender: this.state.gender,
        status: this.state.status,
        role_id:'3',
        reg_type:'normal',
        user_type:'agent'
    }
		console.log(updateAgencyInfo);*/}
		let formData = new FormData();
        formData.append('profile_image',this.state.profile_image);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
		formData.append('id',this.props.auth.user._id);
		formData.append('user_id',this.props.match.params.id);
		formData.append('firstname', this.state.firstname);
		formData.append('lastname', this.state.lastname);
		formData.append('email', this.state.email);
		formData.append('address1', this.state.address1);
		formData.append('address2', this.state.address2);
		formData.append('phone', contactnumber);
		formData.append('country', this.state.country);
		formData.append('state', this.state.state);
		formData.append('city', this.state.city);
		formData.append('zipcode', this.state.zipcode);
		formData.append('gender', this.state.gender);
		formData.append('status', this.state.status);
		formData.append('prev_logo', this.state.prev_logo);
		formData.append('old_img', this.state.old_img);
		formData.append('view_logo', this.state.view_logo);
		formData.append('role_id', '3');
		formData.append('reg_type', 'normal');
		formData.append('user_type', 'agent');
		formData.append('base_url', AppConstants.Base_Url);

		console.log(formData);  
		
      axios.post(AppConstants.API+'/agency/updateAgency/',formData)
        .then(res => {   
          console.log(res);   
         if(res.data.status == "success"){
          setTimeout((e) => {
              this.props.history.push('/allAgencies');
          }, 2000); 
		 this.setState({
				errMsg: (<div className="alert alert-success fade show mt-3">{res.data.msg}</div>)
			  });
          setTimeout(() => {
            this.setState({
              errMsg: false,
            });
          }, 1000);

        }
        else{
          this.setState({
            errMsg: (<div className="alert alert-danger fade show mt-3">{res.data.msg}</div>)
          });
        }
      });
    } 
  };  

  componentDidMount() {
	var element = document.getElementById("navItem-Agency-2");
	element.classList.add("active");
    console.log(this.props.match.params.id);
    const that = this; 
     fetch(AppConstants.API+'/agency/editAgency/'+this.props.match.params.id)
    .then(function(res) {
      //console.log(res.status);
      if(res.status == "200"){
        return res.json();
      }
    })
    .then(function(data) {
      console.log(data);
      if(data.Status == "Success"){
         that.setState({
        firstname: data.data.firstname,
        lastname: data.data.lastname,
        email: data.data.email,
        address1: data.data.address1,
        //address2: data.data.address2,
        phone: data.data.phone,
		//country: data.data.country,
        state: data.data.state,
        city: data.data.city,
        zipcode: data.data.zipcode,
        //gender: data.data.gender,
        status: data.data.status,
		profile_image:data.data.profile_image,
		view_logo:data.data.profile_image,
		old_img:data.data.profile_image,

        }); 
      }else
      {
        console.log('invalid data')
      }
    }); 
    //var element = document.getElementById("navItem-Agency-2");
	//element.classList.add("active");
  }
  
  
  render() {
	let image;
	//console.log(this.state.profile_image);
	if (this.state.profile_image == '' || this.state.profile_image == undefined) {
      image = placeholderimg;
    }else if(this.state.prev_logo == '')
	{
		image =AppConstants.API+'/public/uploads/'+this.state.profile_image
	}else{
		image =this.state.prev_logo
	}
	
    const {user} = this.props.auth;
    const { phone } = this.state;
  return (
    <Page title="Edit Agency" /*breadcrumbs={[{ name: 'Agency', active: true }]}*/>
    <ul className="cst-breadcrumb">
      <li><Link to={'/dashboard'}>Home</Link> </li>
      <li> <Link to={'/allagencies'}> Agencies </Link> </li>
      <li> Edit Agency </li>
    </ul>
    <ReactTitle title="Edit Agency"/>
      <Row>
        <Col xl={12} lg={12} md={12}>
          <Card>
            <CardBody>
              <Form name="changeadminpassword" onSubmit= { this.handleSubmit }>
                <FormGroup row>
                  <Label for="firstname" sm={2}>
                    First Name <span>*</span>
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="firstname"
                      placeholder="First Name"                      
                      value={this.state.firstname}
                      onChange={ this.handleInputChange } 
                      onKeyUp={this.handleKeyUp} 
                      ref ="firstname"                
                    />
                    <span className="error" style={{color: 'red'}}>{this.state.errors["firstname"]}</span>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="lastname" sm={2}>
                    Last Name <span>*</span>
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="lastname"
                      placeholder="Last Name"                      
                      value={this.state.lastname}
                      onChange={ this.handleInputChange }  
                      onKeyUp={this.handleKeyUp}  
                      ref ="lastname"              
                    />
                    <span className="error" style={{color: 'red'}}>{this.state.errors["lastname"]}</span>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="examplePassword" sm={2}>
                    Email <span>*</span>
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="email"
                      placeholder="email"
                      value={this.state.email}
                      onChange={ this.handleInputChange } 
                      onKeyUp={this.handleKeyUp}
                      ref ="email"
                      /* readOnly */                 
                    />
                    <span className="error" style={{color: 'red'}}>{this.state.errors["email"]}</span>                    
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="examplePassword" sm={2}>
                    Address <span>*</span>
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="address1"
                      placeholder="address"                     
                      value={this.state.address1}
                      onChange={ this.handleInputChange }    
                      onKeyUp={this.handleKeyUp}   
                      ref ="address1"               
                    />
                    <span className="error" style={{color: 'red'}}>{this.state.errors["address1"]}</span>
                  </Col>
                </FormGroup>

                <Input
                      type="hidden"
                      name="role_id"
                      value="3"
                />
                <Input
                      type="hidden"
                      name="reg_type"
                      value="normal"
                />
				<Input
                      type="hidden"
                      name="user_type"
                      value="agent"
                />
                

               { /* <FormGroup row>
                  <Label for="examplePassword" sm={2}>
                    Address2
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="address2"
                      placeholder="address2"                     
                      value={this.state.address2}
                      onChange={ this.handleInputChange }                      
                    />
                    <span className="error" style={{color: 'red'}}>{this.state.errors["address2"]}</span>
                  </Col>
                </FormGroup>

               
                <FormGroup row>
                  <Label for="examplePassword" sm={2}>
                    Gender
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="gender"
                      placeholder="gender"
                      value={this.state.gender}
                      onChange={ this.handleInputChange }                     
                    />
                    <span className="error" style={{color: 'red'}}>{this.state.errors["gender"]}</span>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleCountry" sm={2}>
                    Country
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="country"
                      placeholder="country"
                      value={this.state.country}
                      onChange={ this.handleInputChange }                     
                    />
                    <span className="error" style={{color: 'red'}}>{this.state.errors["country"]}</span>
                  </Col>
                </FormGroup> */ }

                <FormGroup row>
                  <Label for="exampleState" sm={2}>
                    State <span>*</span>
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="state"
                      placeholder="state"
                      value={this.state.state}
                      onChange={ this.handleInputChange } 
                      onKeyUp={this.handleKeyUp}  
                      ref ="state"                  
                    />
                    
                    <span className="error" style={{color: 'red'}}>{this.state.errors["state"]}</span>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleCity" sm={2}>
                    City <span>*</span>
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="city"
                      placeholder="city"
                      value={this.state.city}
                      onChange={ this.handleInputChange }   
                      onKeyUp={this.handleKeyUp}     
                      ref ="city"             
                    />
                    <span className="error" style={{color: 'red'}}>{this.state.errors["city"]}</span>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleZipcode" sm={2}>
                    Zipcode <span>*</span>
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="zipcode"
                      placeholder="zipcode"
                      value={this.state.zipcode}
                      maxLength={5}
                      onChange={ this.handleInputChange }  onChange={this.onChangeNumberkey}      
                      onKeyUp={this.handleKeyUp} 
                      ref ="zipcode"            
                    />
                    <span className="error" style={{color: 'red'}}>{this.state.errors["zipcode"]}</span>
                  </Col>
                </FormGroup>
				<FormGroup row>
                  <Label for="examplePassword" sm={2}>
                  Contact Number <span>*</span>
                  </Label>
                  <Col sm={10}>
                    <NumberFormat
					  format="(###) ###-####"
					  mask=""
					  name="contactnumber"
					  placeholder="Contact Number"
					  onValueChange={this.inputChangedHandlerContact}
            value={phone} class="form-control"
            onKeyUp={this.handleKeyUp}
            ref ="phone"
					/>
                    <span className="error" style={{color: 'red'}}>{this.state.errors["phone"]}</span>
                  </Col>
                </FormGroup> 
				<FormGroup row>
                  <Label for="exampleSelect" sm={2}>
                    Status
                  </Label>
                  <Col sm={10}>
                  <Input type="select" name="status" value={this.state.status} onChange={ this.handleInputChange } onKeyUp={this.handleKeyUp} ref ="status"
>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>                   
                  </Input>
                  </Col>
                </FormGroup>
				
				<FormGroup row>
                  <Label for="Profile Image" sm={2}>
                    Profile Image
                  </Label>
                  <Col sm={10}>
                   <Input type="hidden" name="old_img" value={this.state.old_img} onChange={ this.handleInputChange } />
                   <img src={image} style={{width: 100, height: 100}} />
                    <Input
                      type="file"
                      name="profile_image"                  
                      onChange={ this.handleprofile_image}                        
                    />
                    <span className="error" style={{color: 'red'}}>{this.state.errors["profile_image"]}</span>
                  </Col>
                </FormGroup>
                <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button class="btn btn-primary" onClick={ this.handleSubmit }>Update</Button>
                    &nbsp;
                    <Link to={"/allagencies"} class="btn btn-danger" title="Cancel">{/* <MdAdd /> */}&nbsp;Cancel</Link>
                  </Col>
                </FormGroup>
				{this.state.errMsg}
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
     
    </Page>
  );
};
}

Editagency.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

//export default ChangepasswordPage;
export  default connect(mapStateToProps, {})(Editagency);
