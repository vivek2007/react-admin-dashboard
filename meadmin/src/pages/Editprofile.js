import React from 'react';
import { Link } from 'react-router-dom';
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
  // FormText
} from 'reactstrap';
import Page from 'components/Page';
// import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile,updateProfile } from 'actions/authentication';
import NumberFormat from 'react-number-format';
import AppConstants from 'AppConstants';
import Loading from 'assets/img/loader.gif';
import {ReactTitle} from 'react-meta-tags';
import ReactDOM from 'react-dom';


class Editprofile extends React.Component {
  constructor(props){
    super(props);
   // console.log(this.props);
    this.state = {
      id:'',
      username:'',
      email:'',
      profile_img:null,
      view_img:'',
      prev_img:'',
      address:'',
      phonenumber:'',
      gender:'',     
      errors: {},
      errMsg:'',
      loading: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);  
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputFileChange=this.handleInputFileChange.bind(this);
    this.onChangeNumberkey=this.onChangeNumberkey.bind(this);
  }
  onChangeNumberkey(e){
		const zip = this.state
		const re = /^[0-9\b]+$/;
		if (e.target.value === '' || re.test(e.target.value)) {
      zip[e.target.name] = e.target.value;
		this.setState({zip})
		}
	}
  handleInputChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    });
  }
  handleInputFileChange(e) {
    // console.log("aaaaaaaaaaaf",e.target.value)
    this.setState({
    [e.target.name]: e.target.files[0]
    });
  }
  /** Validations */
  handleValidation(){
    let errors = {};
    let formIsValid = true;
   
    
    if(!this.state.profile_img && this.state.prev_img===''){
      //  console.log("Hii df ",this.state.profile_img.type);
      formIsValid = false;
      errors["profile_img"] = "Please upload valid image";
    }
    if(this.state.profile_img && this.state.profile_img.name && !this.state.profile_img.name.match(/.(jpg|jpeg|png)$/i)){
      formIsValid = false;
      errors["profile_img"] = "Please select valid image (Ex: jpg | jpeg | png )";
    }
    /* 
    this.state.prev_img==''else if(this.state.prev_img =='' && (this.state.profile_img.type !='image/jpeg' || this.state.profile_img.type !='image/png')){
      formIsValid = false;
      errors["profile_img"] = "Please upload valid image";
    } */

   // console.log(this.state.phonenumber.length);
    
    if(!this.state.gender){
      formIsValid = false;
      errors["gender"] = "Please enter gender";
    }
    
    if(!this.state.zipcode){
      formIsValid=false;
      errors["zipcode"]="Please enter Zip Code";
      ReactDOM.findDOMNode(this.refs.zipcode).focus();
    }
    else if(this.state.zipcode.length!==5){
      formIsValid=false;
      errors["zipcode"]="Please enter 5 digit Zip Code";
      ReactDOM.findDOMNode(this.refs.zipcode).focus();
    }
    if(!this.state.city){
      formIsValid =false;
      errors["city"]="Please enter city";
      ReactDOM.findDOMNode(this.refs.city).focus();

    }
    if(!this.state.state){
      formIsValid = false;
      errors["state"]="please select state";
      ReactDOM.findDOMNode(this.refs.state).focus();
    }
    if(!this.state.phonenumber){
      formIsValid = false;
      errors["phonenumber"] = "Please enter phone number";
      ReactDOM.findDOMNode(this.refs.phonenumber).focus();
    }else if(this.state.phonenumber.length !==14){
      formIsValid = false;
      errors["phonenumber"] = "Please enter 10 digits phone number";    
      ReactDOM.findDOMNode(this.refs.phonenumber).focus(); 
    }
    if(!this.state.address){
      formIsValid = false;
      errors["address"] = "Please enter address";
      ReactDOM.findDOMNode(this.refs.address).focus();
    }
    
    if(!this.state.username){
      formIsValid = false;
      errors["username"] = "Please enter name";
      ReactDOM.findDOMNode(this.refs.username).focus();
    }
    
    
    
    this.setState({errors: errors});
    return formIsValid;
  }

  componentDidMount() {
		if(this.props.auth.isAuthenticated)
		{
		  // console.log(this.props.auth.user._id);
			this.props.getProfile(this.props.auth.user._id)
		}
		else
		{
			this.props.history.push(AppConstants.STAGADMIN+"/");
		}
  }
  
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.auth);   

		if(nextProps.auth.isAuthenticated) {        
        this.setState({
            id:nextProps.auth.user._id,
            username:nextProps.auth.user.username,
            email:nextProps.auth.user.email,
            profile_img:nextProps.auth.user.profile_img,
            prev_img:nextProps.auth.user.profile_img,
            address:nextProps.auth.user.address,
            phonenumber:nextProps.auth.user.phonenumber,
            gender:nextProps.auth.user.gender,
            view_img:nextProps.auth.user.profile_img || '/static/media/no-profile-pic.jpg',
            state:nextProps.auth.user.state,
            city:nextProps.auth.user.city,
            zipcode:nextProps.auth.user.zipcode,
            
          });
        }        
      if (nextProps.errors)
      {
        this.setState({ errors: nextProps.errors });
      }
    }
    
    handleSubmit = event => {
      event.preventDefault();
      //alert('form submitted');    
       if(this.handleValidation()){
        this.setState({loading:1});  
        /* const updateadminprofile = {
          id:this.props.auth.user._id,
          username: this.state.username,
          address: this.state.address,
          phonenumber: this.state.phonenumber,
          gender: this.state.gender
        } */
       
        let formData = new FormData();
            formData.append('id', this.state.id);
            formData.append('username', this.state.username);
            formData.append('address', this.state.address);
            formData.append('phonenumber', this.state.phonenumber);
            formData.append('gender', this.state.gender);
            formData.append('profile_img', this.state.profile_img);
            formData.append('prev_img', this.state.prev_img);
            formData.append('state',this.state.state);
            formData.append('city',this.state.city);
            formData.append('zipcode',this.state.zipcode);
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        };
       // console.log(formData)
       this.props.updateProfile(formData,config,this.props.history);
            
        //console.log(formData);
        /* axios.post(AppConstants.API+'/users/updateAdminprofile',formData)
          .then(res => {   
            console.log(res);   
           if(res.data.Status == "Success"){          
              setTimeout((e) => {           
                this.props.history.push('/viewadminprofile');
              }, 3000);           
            this.setState({
              errMsg: res.data.msg
            });
          }
          else{
            this.setState({
              errMsg: res.data.msg
            });
          }
        }); */
      } 
    };

  /* componentDidMount() {
    const that = this; 
    fetch(AppConstants.API+'/users/profile/'+this.props.auth.user._id)
    .then(function(res) {
      //console.log(res.status);
      if(res.status == 200){
        return res.json();
      }
    })
    .then(function(data) {
      //console.log(data);
      if(data.Status == "Success"){
        that.setState({
          username:data.data.username,
          email:data.data.email,
          profile_img:data.data.profile_img,
          address:data.data.address,
          phonenumber:data.data.phonenumber,
          gender:data.data.gender,
          view_img: data.data.profile_img || '/static/media/100_4.978e51b5.jpg',
          prev_img: data.data.profile_img
        });
      }else
      {
        console.log('invalid data');
        this.setState({
          errMsg: data.Status
        });
      }
    });
  } */
  
  
  render() {
   
    // const {user} = this.props.auth;
    //console.log(user);
  return (
    <Page title="Edit Profile">
     <ReactTitle title="Edit Profile"/>
    <Link to={AppConstants.STAGADMIN+'/dashboard'}>
      Home
    </Link>
    &nbsp; | &nbsp;&nbsp;
    <Link to={AppConstants.STAGADMIN+'/editadminprofile'}>
    Edit Profile
    </Link>
    <Form name="changeadminpassword" className="form-block"  onSubmit= { this.handleSubmit }>
      <Row>
        <Col xl={12} lg={12} md={12}>
          <Card>
            <CardBody>
            <Row>
            <Col xl={6} lg={6} md={6}>

                <FormGroup>
                  <Label for="examplePassword">
                    Name <span className="error" style={{color: 'red'}}>*</span>
                  </Label>
                  
                    <Input
                      type="text"
                      name="username"
                      placeholder="name"                      
                      value={this.state.username}
                      onChange={ this.handleInputChange } 
                      ref ="username"                 
                    />
                    <span className="error" style={{color: 'red'}}>{this.state.errors["username"]}</span>
                  
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword" >
                    Email
                  </Label>
                 
                    <Input
                      type="text"
                      name="email"
                      value={this.state.email}
                      readOnly  
                      ref ="email"               
                    />                    
                 
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">
                  Phone Number <span className="error" style={{color: 'red'}}>*</span>
                  </Label>
                 

                  <NumberFormat
                    format="(###) ###-####" mask=""
                    name="phonenumber"
                    placeholder='phone Number'
                    onChange={this.handleInputChange}
                    value={this.state.phonenumber} className="form-control"  ref ="phonenumber"/>
                    <span className="error" style={{color: 'red'}}>{this.state.errors["phonenumber"]}</span>
                 
                </FormGroup> 
                
                <FormGroup>
                  <Label for="examplePassword">
                    Address <span className="error" style={{color: 'red'}}>*</span>
                  </Label>
                 
                    <Input
                      type="text"
                      name="address"
                      placeholder="address"                     
                      value={this.state.address}
                      onChange={ this.handleInputChange }
                      ref ="address"                      
                    />
                    <span className="error" style={{color: 'red'}}>{this.state.errors["address"]}</span>
                 
                </FormGroup>
                <FormGroup>
                <Label for="examplePassword">City <span className="error" style={{color: 'red'}}>*</span></Label>
                  <Input
                      type="text"
                      name="city"
                      placeholder="City"
                      onChange={ this.handleInputChange }      
                      value={this.state.city}  
                      ref ="city"           
                    />
                    <span className="error" style={{color: 'red'}}>{this.state.errors["city"]}</span>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleState" >
                  State <span style={{color: 'red'}}>*</span>
                  </Label>
                 
                  <Input
                  type="select"
                  name="state"
                  placeholder="State"
                  value={this.state.state}
                  ref="state"
                  onChange={ this.handleInputChange }
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
                  <span className="error" style={{color: 'red'}}>{this.state.errors["state"]}</span>
                
                </FormGroup>
                
                <FormGroup>
                  <Label for="examplePassword">Zip Code <span className="error" style={{color: 'red'}}>*</span></Label>
                  <Input
                      type="text"
                      name="zipcode"
                      placeholder="Zip code"
                      value={this.state.zipcode}
                      onChange={ this.handleInputChange }
                      onChange={this.onChangeNumberkey}  
                      ref ="zipcode"               
                    />  
                    <span className="error" style={{color: 'red'}}>{this.state.errors["zipcode"]}</span>
                </FormGroup>

                <FormGroup>
                  <Label for="exampleFile" style={{display: 'block'}}>
                    Profile Image <span className="error" style={{color: 'red'}}>*</span>
                  </Label>
                  <img src={this.state.view_img} style={{width: 100, height: 100}} alt="pic"/><br /><br />

                    <div className = "file-field input-field fileupload">
                    <div className = "filebtn">
                        <span><i className="fa fa-upload" aria-hidden="true"></i></span>
                        <input type = "file" name="profile_img" onChange={ this.handleInputFileChange} />
                    </div>
                                                            
                    <div className = "file-path-wrapper">
                        <input className = "file-path validate" type = "text"
                            placeholder = " Please upload image." />
                    </div>
                </div> 
                    <span className="error" style={{color: 'red'}}>{this.state.errors["profile_img"]}</span>
                
                </FormGroup>
                
                {/* <FormGroup row>
                  <Label for="examplePassword" sm={2}>
                    Gender <span className="error" style={{color: 'red'}}>*</span>
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
                </FormGroup>  */}
                
                </Col>
      </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
      <Col md={12} className="form-btn">
      <Button className="btn btn-primary addbtn" title="Update Profile">Update
                    <div style={this.state.loading ? {} : { display: 'none' }} className="image-fill w-25 loader-login-div "><img src={Loading} alt="No Image" className="can-click " /></div></Button>&nbsp;&nbsp;
                    <Link to={AppConstants.STAGADMIN+"/viewadminprofile"} className="btn btn-primary redbtn" title="Cancel">Cancel</Link>
                  </Col>
               
      </Row>
      {this.state.errMsg}
      </Form>
     
    </Page>
  );
};
}

Editprofile.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

//export default ChangepasswordPage;
export  default connect(mapStateToProps, {getProfile,updateProfile})(Editprofile);
