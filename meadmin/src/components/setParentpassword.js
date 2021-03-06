import logo200Image from 'assets/img/logo/ME-logo.jpg';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Card, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import AppConstants from 'AppConstants';


class SetparentPassword extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fields: {},
      errors: {},
      invalidUser:'',
      errMsg:''
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
    if(!fields["password"]){
      formIsValid = false;
      errors["password"] = "Please enter password";
    }
    if(!fields["cnfpassword"]){
      formIsValid = false;
      errors["cnfpassword"] = "Please enter confirm password";
    }
    else if(fields["password"] != fields["cnfpassword"]){
      formIsValid = false;
      errors["cnfpassword"] = "Confirm password does not match";
    }
    

    this.setState({errors: errors});
    return formIsValid;
  }
  handleSubmit = event => {
    //console.log(process.env.REACT_APP_API_URL+'/users/login');
    event.preventDefault();
    if(this.handleValidation()){
      const setadminpwd = {
        id:this.props.match.params.id,
        password: this.state.fields['password']
      }      
      //axios.post('/users/setadminpassword',setadminpwd)
      axios.post(AppConstants.API+'/parent/parent_set_password/'+this.props.match.params.id,setadminpwd) 
        .then(res => {   
          console.log(res);   
         if(res.data.Status == "Success"){
          setTimeout(function()
          {
            window.location.href = '/';
          }, 2000);              
          this.setState({
            errMsg: res.data.msg
          });
        }
        else{
          this.setState({
            errMsg: res.data.msg
          });
        } 
      });   
    }
  };


  
  
  render() {
    //console.log("test", this.props.match.params.id);
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
        <Col md={6} lg={4}>
          <Card body>
         
            <Form name="setpwdform" onSubmit= {this.handleSubmit.bind(this)}>
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
              <span className="error" style={{color: 'red'}}>{this.state.errMsg}</span>
              <FormGroup>
                <Label for="password">Password *</Label>
                <Input
                  type="password"                 
                  placeholder="Password"
                  onChange={this.handleChange.bind(this, "password")}
                  name="password"
                  value={this.state.fields["password"]}
                />
                <span className="error" style={{color: 'red'}}>{this.state.errors["password"]}</span>
              </FormGroup> 
              <FormGroup>
                <Label for="Confirm Password">Confirm Password *</Label>
                <Input
                  type="password"                 
                  placeholder="Confirm Password"
                  onChange={this.handleChange.bind(this, "cnfpassword")}
                  name="cnfpassword"
                  value={this.state.fields["cnfpassword"]}
                />
                <span className="error" style={{color: 'red'}}>{this.state.errors["cnfpassword"]}</span>
              </FormGroup>                      
              <Button
                size="lg"
                className="cst-login-btn border-0 mt-4 btn btn-secondary btn-lg btn-block btn btn-secondary btn-lg btn-block"
                block
                onClick={this.handleSubmit}>
                Submit
              </Button>                         
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}
SetparentPassword.defaultProps = {
  showLogo: true
};
SetparentPassword.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});
export  default connect(mapStateToProps, {})(SetparentPassword);
