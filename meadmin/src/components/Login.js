import logo200Image from 'assets/img/logo/logo.png';
import React from 'react';
import  { Redirect,Link } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Card, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authentication';
import PropTypes from 'prop-types';
import {ReactTitle} from 'react-meta-tags';
// import Loading from 'assets/img/loader.gif';


class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fields: {},
      errors: {},
      invalidUser:'',
      loading: ''
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
   
    if(typeof fields["email"] !== "undefined"){
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Please enter valid email";
      }
    }
    if(!fields["email"]){
      formIsValid = false;
      errors["email"] = "Please enter email";
    }
    //Password
    if(!fields["password"]){
      formIsValid = false;
      errors["password"] = "Please enter password";
    }
    this.setState({errors: errors});
    return formIsValid;
  }
	handleSubmitEnter = event => {
		if(event.key == 'Enter'){
			event.preventDefault();
			if(this.handleValidation()){
			  const user = {
				email: this.state.fields['email'],
				password: this.state.fields['password']
			  }
			  this.props.loginUser(user);
			}
		}
    
	};
  handleSubmit = event => {
    event.preventDefault();
    if(this.handleValidation()){
      this.setState({loading:1,invalidUser:''});
      const user = {
        email: this.state.fields['email'],
        password: this.state.fields['password']
      }
      this.props.loginUser(user);
    }
  };
  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.setState({loading:''});
        this.props.history.push('/dashboard');
    }
  };
  componentWillReceiveProps(nextProps) {
   if(nextProps.auth.isAuthenticated) {
    this.setState({loading:''});
        this.props.history.push('/dashboard')
    }
     //if(nextProps.errors.msg == "Invalid email or password. Please try again") {
      setTimeout(() => {
        console.log("1")
        this.setState({
          loading:'',
          invalidUser: nextProps.errors.msg
        });
      }, 2000);
    //}
  }
  render() {
    const {
      showLogo,
      onLogoClick,
    } = this.props;
    
    return (
     
    
      <Row 
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
         <ReactTitle title="Mobile Expert:: Login"/>
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
                </div>
              )}
              <span className="error" style={{color: 'red'}}>{this.state.invalidUser}</span>
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
              <FormGroup>
                <Label for="exampleEmail">Password</Label>
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.handleChange.bind(this, "password")} 
                  value={this.state.fields["password"]} onKeyPress={this.handleSubmitEnter}
                />
                <span className="error" style={{color: 'red'}}>{this.state.errors["password"]}</span>
              </FormGroup>
              <Button
                size="lg"
                className="cst-login-btn border-0 mt-4 btn btn-secondary btn-lg btn-block"
                block
                onClick={this.handleSubmit}>
                Login  <div  style={this.state.loading ? {} : { display: 'none' }} className="image-fill w-25 loader-div ">
                  {/*                <div class="clearfix">
  <div class="spinner-border spinner-border-sm" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div> */}
                  <div class="clearfix">
  <div class="spinner-border spinner-border-sm" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>
                  </div>
              </Button>
              <br></br>
              <div className="text-center pt-1">
                <h6>  
                <Link to={'/forgotpassword'}>Forgot Password?</Link>         
                    {/*<a href="/forgotpassword">*/}
                      
                    {/*</a>*/}
                </h6>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}
Login.defaultProps = {
  showLogo: true
};
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});
export  default connect(mapStateToProps, { loginUser })(Login);
