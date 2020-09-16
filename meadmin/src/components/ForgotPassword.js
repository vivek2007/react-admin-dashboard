import logo200Image from 'assets/img/logo/ME-logo.jpg';
import React from 'react';
import  { Redirect,Link } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Card, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import AppConstants from 'AppConstants';
import {ReactTitle} from 'react-meta-tags';
import Loading from 'assets/img/loader.gif';


class ForgotPassword extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fields: {},
      errors: {},
      invalidUser:'',
      errMsg:'',
      loading: '',
    }
  }
  
  handleChange(field, e){    		
    let fields = this.state.fields;
    fields[field] = e.target.value;        
    this.setState({fields});
  }

  /** Validations */
  handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Email
    if(!fields["email"]){
      formIsValid = false;
      errors["email"] = "Please enter email";
    }
    if(typeof fields["email"] !== "undefined"){
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Please enter valid email";
      }
    }  
    

    this.setState({errors: errors});
    return formIsValid;
  }
  handleSubmit = event => {
    //console.log("Find URL: "+ process.env.REACT_APP_API_URL+'/users/login');
    //console.log("Find URL: "+ AppConstants.API+'/users/login');  
    event.preventDefault();
    if(this.handleValidation()){
      this.setState({loading:1});
      const adminforgotpwd = {
        email: this.state.fields['email'],
        admintype: 'admin'
      }
      console.log(adminforgotpwd);
      //axios.post('/users/forgotpasswordadmin',adminforgotpwd)
      axios.post(AppConstants.API+'/users/forgotpasswordadmin',adminforgotpwd) 
        .then(res => {   
         if(res.data.status == "success"){      
          this.setState({
            errMsg: (<div style={{color: 'green'}}>{res.data.msg}</div>),loading:''  
            
          });
          setTimeout(() => {
            this.setState({
              errMsg:''
            });
          }, 500);
        }
        else{
          this.setState({
            loading:'',errMsg: (<div className="danger">{res.data.msg}</div>)
          });
          setTimeout(() => {
            this.setState({
              errMsg:''
            });
          }, 1000);
        } 
      });      
    }
  };
  
  
  render() {
    const {
      showLogo,
      onLogoClick,
    } = this.props;
    
    return (
      <Row  className="login-bg"
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
         <ReactTitle title="ME:: ForgotPassword"/>
        <Col md={6} lg={4}>
          <Card body>
       
            <Form name="loginform" onSubmit= {this.handleSubmit.bind(this)}>
              {showLogo && (
                <div className="text-center pb-4">
                  <img
                    src={logo200Image}
                    className="rounded"
                    style={{ width: 150,  cursor: 'pointer' }}
                    alt="logo"
                    onClick={onLogoClick}
                  />
                   <br></br><br></br>   <h6 align = "center">Forgot your password?</h6>
                </div>
                
              )}
         
              <span className="error" >{this.state.errMsg}</span>
              <br/>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="text"                 
                  placeholder="Email"
                  onChange={this.handleChange.bind(this, "email")}
                  name="email"
                  value={this.state.fields["email"]}
                />
                <span className="error" style={{color: 'red'}}>{this.state.errors["email"]}</span>
              </FormGroup>                       
              <Button
                size="lg"
                className="cst-login-btn border-0 mt-4 btn btn-secondary btn-lg btn-block"
                block
                onClick={this.handleSubmit}>
                   <div style={this.state.loading ? {} : { display: 'none' }} className="image-fill w-25 loader-div">               <div class="clearfix">
  <div class="spinner-border spinner-border-sm" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div></div>
              Submit
              </Button>
              <br></br>
              <div className="text-center pt-1">
                {/* <h6>or</h6> */}
                <h6> 
                <Link to={'/'}>Back To Login</Link>            
                    {/* <a href="/admin/">
                    Back To Login
                    </a>            */}
                </h6>
              </div>             
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}
ForgotPassword.defaultProps = {
  showLogo: true
};
ForgotPassword.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});
export  default connect(mapStateToProps, {})(ForgotPassword);
