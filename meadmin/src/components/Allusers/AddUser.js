import React from 'react';
import  { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
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

import {
  MdFileUpload,
} from 'react-icons/md';

import Page from 'components/Page';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppConstants from 'AppConstants';
import placeholderimg from '../../assets/img/placeholder.png';
import {ReactTitle} from 'react-meta-tags';
import ReactDOM from 'react-dom';
import Loading from 'assets/img/loader.gif';
import Switch from "react-switch";
import swal from 'sweetalert';

class AddUser extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      _id:this.props.auth.user._id,
      firstname:'',
      lastname:'',
      email:'',
      profile_img:'',
      address1:'',
      address2:'',
      phone:'',
      gender:'',
      country:'',
      state:'',
      city:'',
      zipcode:'',
      status: true,
	    profile_image:'',
      errors: {},
      //errMsg:'',
      errMsg:false,
      firstname_error:false,
      lastname_error:false,
      email_error:false,
      address1_error:false,
      address2_error:false,
      phone_error:false,
      gender_error:false,
      country_error:false,
      state_error:false,
      city_error:false,
      zipcode_error:false,
      status_error:false,
      role_id:'',
      reg_type:'',
      user_type:'',
      prev_logo:'',
      loading: ''
      
    }
    this.handleSubmit = this.handleSubmit.bind(this); 
	  this.handleprofile_image = this.handleprofile_image.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onChangeNumberkey = this.onChangeNumberkey.bind(this);
    this.inputChangedHandlerContact = this.inputChangedHandlerContact.bind(this);    
  }
  inputChangedHandlerContact = (values) => {
   
      if(values.value == ''){
        this.setState({phone_error:true});
      }else{
        this.setState({phone_error:false})
      }
    
    this.setState({
      phone: values.value,
    });
  }
  onChangeNumberkey(e){
		const states = this.state
    const re = /^[0-9\b]+$/;
      if(e.target.value == ''){
        this.setState({zipcode_error:true});
      }else{
        this.setState({zipcode_error:false})
      }
    
		if (e.target.value === '' || re.test(e.target.value)) {
		states[e.target.name] = e.target.value;
		this.setState({states})
		}
	}
  handleInputChange(e) {
    if(e.target.name == 'firstname'){
      if(e.target.value == ''){
        this.setState({firstname_error:true});
      }else{
        this.setState({firstname_error:false})
      }
    }
    if(e.target.name == 'lastname'){
      if(e.target.value == ''){
        this.setState({lastname_error:true});
      }else{
        this.setState({lastname_error:false})
      }
    }
    
    if(e.target.name == 'email'){
      if(e.target.value == ''){
        this.setState({email_error:true});
      }else{
        this.setState({email_error:false})
      }
    }
   
    if(e.target.name == 'address1'){
      if(e.target.value == ''){
        this.setState({address1_error:true});
      }else{
        this.setState({address1_error:false})
      }
    }
    if(e.target.name == 'address2'){
      if(e.target.value == ''){
        this.setState({address2_error:true});
      }else{
        this.setState({address2_error:false})
      }
    }

    if(e.target.name == 'gender'){
      if(e.target.value == ''){
        this.setState({gender_error:true});
      }else{
        this.setState({gender_error:false})
      }
    }
    if(e.target.name == 'city'){
      if(e.target.value == ''){
        this.setState({city_error:true});
      }else{
        this.setState({city_error:false})
      }
    }
    if(e.target.name == 'state'){
      if(e.target.value == ''){
        this.setState({state_error:true});
      }else{
        this.setState({state_error:false})
      }
    }
    if(e.target.name == 'country'){
      if(e.target.value == ''){
        this.setState({country_error:true});
      }else{
        this.setState({country_error:false})
      }
    }
   
    this.setState({
        [e.target.name]: e.target.value.trimLeft(/(^\s+|\s+$)/g, '')
    });
  }
  
  // handleprofile_image(e) {
  //      this.setState({
	// 		[e.target.name]:e.target.files[0],
	// 		prev_logo:URL.createObjectURL(e.target.files[0])
			
	// 	});
  // }

  handleprofile_image(e) {
    /*if (!e.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)){
        alert("Please select value image (Ex: jpg|jpeg|png|gif)");  
        return false;      
    }*/    
    this.setState({
       [e.target.name]: e.target.files[0],
       prev_logo:URL.createObjectURL(e.target.files[0])      
    });
  }
  
  handleStatusChange(checked){
    swal({
      title: "Are you sure",
      text: "you want to change the status?",
      icon: "warning",
      buttons: ["Go back", "Confirm"],
      dangerMode: false,
      })
      .then((willDelete) => {
        if (willDelete) {
        swal("Status has been changed!", {
        icon: "success",
        });
      this.setState({status : checked})
        }})
  }
  /** Validations */
  handleValidation(){
    let errors = {};
    let formIsValid = true;

    
    if (this.state.profile_image && !this.state.profile_image.name.match(/.(jpg|jpeg|png|gif)$/i)){
      formIsValid = false;
      errors["profile_image"] = "Upload only images (JPEG, JPG, PNG)";
    }
	  if(this.state.profile_image === ''){
      formIsValid = false;
      errors["profile_image"] = "Please choose profile image";
      ReactDOM.findDOMNode(this.refs.profile_image).focus();
    }
    
    if(!this.state.zipcode){
      formIsValid = false;
      errors["zipcode"] = "Please enter zipcode";
      ReactDOM.findDOMNode(this.refs.zipcode).focus();
    }else if(this.state.zipcode.length !== 5){
      formIsValid = false;
      errors["zipcode"] = "Please enter 5 digits zipcode";
      ReactDOM.findDOMNode(this.refs.zipcode).focus();
    }
  
    if(!this.state.state){
      formIsValid = false;
      errors["state"] = "Please enter state";
      ReactDOM.findDOMNode(this.refs.state).focus();
    }
    if(!this.state.city){
      formIsValid = false;
      errors["city"] = "Please enter city";
      ReactDOM.findDOMNode(this.refs.city).focus();
    }
    if(!this.state.address1){
      formIsValid = false;
      errors["address1"] = "Please enter address";
      ReactDOM.findDOMNode(this.refs.address1).focus();
    }

    if(!this.state.phone){
      formIsValid = false;
      errors["phone"] = "Please enter phone number";
      ReactDOM.findDOMNode(this.refs.phone).focus();
    }else if(this.state.phone.length !== 10){
      formIsValid = false;
      errors["phone"] = "Please enter 10 digits phone number";
      ReactDOM.findDOMNode(this.refs.phone).focus();
    }
  
    if(this.state.email !== ""){
      let lastAtPos = this.state.email.lastIndexOf('@');
      let lastDotPos = this.state.email.lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
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
    this.setState({errors: errors,
      firstname_error:true,
      lastname_error:true,
      email_error:true,
      address1_error:true,
      address2_error:true,
      phone_error:true,
      gender_error:true,
      country_error:true,
      state_error:true,
      city_error:true,
      zipcode_error:true,
    
    });
    return formIsValid;
  }
  
  handleSubmit = event => {
    event.preventDefault();
    var str = this.state.phone; 
    if(str !== ''){
      var phoneNumber = this.state.phone; 
      var res = str.substr(0, 3);
      var res1 = str.substr(3, 3);
      var res2 = str.substr(6, 4);
      var contactnumber="("+res+")"+" "+res1+"-"+res2;
    }else{
      var phoneNumber = "";
      var contactnumber="";
    }  
    if(this.handleValidation()){
      this.setState({loading:1});
      console.log("this.state.profile_image",this.state.profile_image)
		let formData = new FormData();
    //     formData.append('profile_image',this.state.profile_image);
    //     const config = {
    //         headers: {
    //             'content-type': 'multipart/form-data'
    //         }
    //     };
		formData.append('id',this.props.auth.user._id);
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
    formData.append('profile_image', this.state.profile_image);
		formData.append('gender', this.state.gender);
		formData.append('status', this.state.status);
		formData.append('role_id', '2');
		formData.append('reg_type', 'normal');
		formData.append('user_type', 'admin');
    formData.append('base_url', AppConstants.Base_Url);
    formData.append('phoneNumber', phoneNumber);
    console.log("AppConstants.API",AppConstants.API)
      axios.post(AppConstants.API+'/users/addUser',formData)
        .then(res => {   
          console.log("data",res.data)
         if(res.data.status === "success"){
          setTimeout((e) => {
              // this.props.history.push('/allcallcenters');
              this.props.history.push('/allusers');
          }, 2000);
           this.setState({
            loading:'',
            errMsg: (<div className="alert alert-success fade show mt-3">{res.data.msg}</div>)
          });
          setTimeout(() => {
            this.setState({
              loading:'',
              errMsg:  (<div className="alert alert-success fade show mt-3">{res.data.msg}</div>),
            });
          }, 1000);
        }
        else{
          this.setState({
            errMsg: (<div className="alert alert-danger fade show mt-3">{res.data.msg}</div>)
          });
          setTimeout((e) => {
            // this.props.history.push('/allcallcenters');
            this.setState({
              loading:'',
              errMsg: ''
            });
        }, 2000);
         
        }
      });
    } 
  };  
  componentDidMount() {
  var element = document.getElementById("navItem-Admins-0");
	element.classList.add("active");
    const that = this; 
  }
  render() {
	  
	 let image;
	if(this.state.profile_image == '')
	{
		image = placeholderimg;
	}else{
		image = this.state.prev_logo;
	} 
    const { phone } = this.state;
  return (
    <Page title="Add Admin" /*breadcrumbs={[{ name: 'Call Center', active: true }]}*/>
     
      <ul className="cst-breadcrumb">
        <li><Link to={'/dashboard'}>Home</Link></li>
        <li><Link to={'/allusers'}>All Admins</Link></li>
        <li>Add Admin</li>
      </ul>
     <ReactTitle title="Add User"/>
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
                      // onKeyUp={this.handleKeyUp}    
                      ref ="firstname"           
                    />
                    {this.state.firstname_error == true ?<span className="error" >{this.state.errors["firstname"]}</span> :''}
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
                      // onKeyUp={this.handleKeyUp}    
                      ref ="lastname"             
                    />
                   {this.state.lastname_error == true ?<span className="error" >{this.state.errors["lastname"]}</span>:''}
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
                      placeholder="Email"
                      value={this.state.email}
                      onChange={ this.handleInputChange } 
                      // onKeyUp={this.handleKeyUp}
                      ref ="email"
                      /* readOnly */                 
                    />
                    {this.state.email_error == true ? <span className="error" >{this.state.errors["email"]}</span> :''}                 
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="examplePassword" sm={2}>
                  Phone Number <span>*</span>
                  </Label>
                  <Col sm={10}>
                  <NumberFormat
                    format="(###) ###-####"
                    mask=""
                    name="phone"
                    placeholder="Phone Number"
                    onValueChange={this.inputChangedHandlerContact}
                    value={phone} className="form-control"
                    // onKeyUp={this.handleKeyUp}
                    ref ="phone"
					        />
                    {this.state.phone_error == true ?<span className="error" >{this.state.errors["phone"]}</span>:''}
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
                      placeholder="Address"                     
                      value={this.state.address1}
                      onChange={ this.handleInputChange }
                      // onKeyUp={this.handleKeyUp} 
                      ref ="address1"                     
                    />
                    {this.state.address1_error == true ?<span className="error" >{this.state.errors["address1"]}</span>:''}
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

                
                <FormGroup row>
                  <Label for="exampleCity" sm={2}>
                    City <span>*</span>
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={this.state.city}
                      onChange={ this.handleInputChange }  
                      // onKeyUp={this.handleKeyUp}
                      ref ="city"                   
                    />
                    {this.state.city_error == true ? <span className="error" >{this.state.errors["city"]}</span>:''}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleState" sm={2}>
                    State <span>*</span>
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="select"
                      name="state"
                      placeholder="State"
                      value={this.state.state}
                      onChange={ this.handleInputChange }  
                      // onKeyUp={this.handleKeyUp} 
                      ref ="state"                  
                    >
                     <option value="">Select State</option>
                    <option value="Alabama">Alabama</option>
                    <option value="Alaska">Alaska</option>
                    <option value="Arizona">Arizona</option>
                    <option value="Arkansas">Arkansas</option>
                    <option value="California">California</option>
                    <option value="Colorado">Colorado</option>
                    <option value="Connecticut">Connecticut</option>
                    <option value="Delaware">Delaware</option>
                    <option value="District Of Columbia">District Of Columbia</option>
                    <option value="Florida">Florida</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Hawaii">Hawaii</option>
                    <option value="Idaho">Idaho</option>
                    <option value="Illinois">Illinois</option>
                    <option value="Indiana">Indiana</option>
                    <option value="Iowa">Iowa</option>
                    <option value="Kansas">Kansas</option>
                    <option value="Kentucky">Kentucky</option>
                    <option value="Louisiana">Louisiana</option>
                    <option value="Maine">Maine</option>
                    <option value="Maryland">Maryland</option>
                    <option value="Massachusetts">Massachusetts</option>
                    <option value="Michigan">Michigan</option>
                    <option value="Minnesota">Minnesota</option>
                    <option value="Mississippi">Mississippi</option>
                    <option value="Missouri">Missouri</option>
                    <option value="Montana">Montana</option>
                    <option value="Nebraska">Nebraska</option>
                    <option value="Nevada">Nevada</option>
                    <option value="New Hampshire">New Hampshire</option>
                    <option value="New Jersey">New Jersey</option>
                    <option value="New Mexico">New Mexico</option>
                    <option value="New York">New York</option>
                    <option value="North Carolina">North Carolina</option>
                    <option value="North Dakota">North Dakota</option>
                    <option value="Ohio">Ohio</option>
                    <option value="Oklahoma">Oklahoma</option>
                    <option value="Oregon">Oregon</option>
                    <option value="Pennsylvania">Pennsylvania</option>
                    <option value="Rhode Island">Rhode Island</option>
                    <option value="South Carolina">South Carolina</option>
                    <option value="South Dakota">South Dakota</option>
                    <option value="Tennessee">Tennessee</option>
                    <option value="Texas">Texas</option>
                    <option value="Utah">Utah</option>
                    <option value="Vermont">Vermont</option>
                    <option value="Virginia">Virginia</option>
                    <option value="Washington">Washington</option>
                    <option value="West Virginia">West Virginia</option>
                    <option value="Wisconsin">Wisconsin</option>
                    <option value="Wyoming">Wyoming</option>
                    </Input>
                    {this.state.state_error == true ?<span className="error" >{this.state.errors["state"]}</span>:''}
                  </Col>
                </FormGroup>


                <FormGroup row>
                  <Label for="exampleZipcode" sm={2}>
                    Zip Code <span>*</span>
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="zipcode"
                      placeholder="Zip Code"
                      maxLength={5}
                      value={this.state.zipcode}
                      onChange={ this.handleInputChange } onChange={this.onChangeNumberkey} onKeyUp={this.handleKeyUp}   
                      ref ="zipcode"                 
                    />
                    {this.state.zipcode_error == true ?<span className="error" >{this.state.errors["zipcode"]}</span>:''}
                  </Col>
                </FormGroup>
              
				      <FormGroup row>
                  <Label for="exampleSelect" sm={2}>
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
				
				      <FormGroup row>
                  <Label for="Profile Image" sm={2}>
                    Profile Image <span>*</span>
                  </Label>
                  <Col sm={10}>
                   {/* <img src={image} style={{width: 100, height: 100}} />
                    <Input
                      type="file"
                      name="profile_image"                  
                      onChange={ this.handleprofile_image }   
                      onKeyUp={this.handleKeyUp}  
                      ref ="profile_image"                   
                    /> */}
                     <div className="cst-upload">
                   <img src={image} style={{width: 100, height: 100}} /> 
               
                    <div className="file-upload">
                  <Label for="upload" className="file-upload__label"><MdFileUpload/>&nbsp;upload Your Image</Label>
                  <Input  type="file"
                      name="profile_image"                  
                      onChange={ this.handleprofile_image } 
                      // onKeyUp={this.handleKeyUp} 
                      ref ="profile_image"  id="upload" className="file-upload__input"   />
                  </div>
                  </div>
                    <span className="error w-100 d-block" style={{color: 'red'}}>{this.state.errors["profile_image"]}</span>
                  </Col>
                </FormGroup>
                <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button className="btn btn-primary" onClick={ this.handleSubmit }>Save    <div style={this.state.loading ? {} : { display: 'none' }} className="image-fill w-25 loader-div">               <div class="clearfix">
  <div class="spinner-border spinner-border-sm" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div></div></Button>&nbsp;
                    <Link to={"/allusers"} className="btn btn-danger" title="Cancel">{/* <MdAdd /> */}&nbsp;Cancel</Link>
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

AddUser.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});
export  default connect(mapStateToProps, {})(AddUser);
