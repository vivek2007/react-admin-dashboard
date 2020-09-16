import React from 'react';
import  { Link } from 'react-router-dom';
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
class ChangepasswordPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      _id:this.props.auth.user._id,
      fields: {},
      errors: {},
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

    if(!fields["oldpassword"]){
      formIsValid = false;
      errors["oldpassword"] = "Please enter current password";
    }
    if(!fields["newpassword"]){
      formIsValid = false;
      errors["newpassword"] = "Please enter new password";
    }
    if(!fields["renewpassword"]){
      formIsValid = false;
      errors["renewpassword"] = "Please re enter new password";
    }
    else if(fields["newpassword"] != fields["renewpassword"]){
      formIsValid = false;
      errors["renewpassword"] = "New password does not match";
    }
    /* if(fields["newpassword"] != fields["renewpassword"]){
      formIsValid = false;
      errors["renewpassword"] = "New password does not match";
    }  */
    
    

    this.setState({errors: errors});
    return formIsValid;
  }

  handleSubmit = event => {
    event.preventDefault();
    if(this.handleValidation()){
      const changepwd = {
        id:this.props.auth.user._id,
        oldpassword: this.state.fields['oldpassword'],
        newpassword: this.state.fields['newpassword']
      }
      axios.post(AppConstants.API+'/child/changeChildPassword/',changepwd) 
        .then(res => {   
          console.log(res);   
        if(res.data.Status == "Success"){
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
    const {user} = this.props.auth;
    const { open } = this.state;
    console.log(user);
  return (
    <Page title="Change Password" breadcrumbs={[{ name: 'change password', active: true }]}>
      <Row>
        <Col xl={12} lg={12} md={12}>
          <Card>
            <CardBody>
              <Form name="changeadminpassword" onSubmit= {this.handleSubmit.bind(this)}>
                <FormGroup row>
                  <Label for="examplePassword" sm={2}>
                  </Label>
                  <Col sm={10}>                    
                  <span className="error" style={{color: 'red'}}>{this.state.errMsg}</span>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="examplePassword" sm={2}>
                    Current Password
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="password"
                      name="oldpassword"
                      placeholder="current password"
                      onChange={this.handleChange.bind(this, "oldpassword")}
                      value={this.state.fields["oldpassword"]}
                    />
                    <span className="error" style={{color: 'red'}}>{this.state.errors["oldpassword"]}</span>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="examplePassword" sm={2}>
                    New Password
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="password"
                      name="newpassword"
                      placeholder="new password"
                      onChange={this.handleChange.bind(this, "newpassword")}
                      value={this.state.fields["newpassword"]}
                    />
                    <span className="error" style={{color: 'red'}}>{this.state.errors["newpassword"]}</span>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="examplePassword" sm={2}>
                    Re-enter New Password
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="password"
                      name="renewpassword"
                      placeholder="re-enter new password"
                      onChange={this.handleChange.bind(this, "renewpassword")}
                      value={this.state.fields["renewpassword"]}
                    />
                    <span className="error" style={{color: 'red'}}>{this.state.errors["renewpassword"]}</span>
                  </Col>
                </FormGroup>          
                <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button class="btn btn-primary" onClick={this.handleSubmit}>Submit</Button>
                    &nbsp;
                    <Link to={"/viewadminprofile"} class="btn btn-danger" title="Cancel">{/* <MdAdd /> */}&nbsp;Cancel</Link>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
     
    </Page>
  );
};
}

ChangepasswordPage.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

//export default ChangepasswordPage;
export  default connect(mapStateToProps, {})(ChangepasswordPage);
