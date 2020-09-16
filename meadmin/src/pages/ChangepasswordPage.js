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
  //FormText,
  //FormFeedback,
} from 'reactstrap';
// import {
//   MdCreate,
//   MdDelete,
//   MdRemoveRedEye,
//   MdLaunch,
//   MdAdd,
// } from 'react-icons/md';

import Page from 'components/Page';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppConstants from 'AppConstants';
import {ReactTitle} from 'react-meta-tags';
import Loading from 'assets/img/loader.gif';


class ChangepasswordPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      _id:this.props.auth.user._id,
      fields: {},
      errors: {},
      errMsg:'',
      loading:''
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
      errors["renewpassword"] = "New password's are doesn't match.";
    }
    /* if(fields["newpassword"] != fields["renewpassword"]){
      formIsValid = false;
      errors["renewpassword"] = "New password does not match";
    }  */
    
    

    this.setState({errors: errors});
    return formIsValid;
  }

  // handleSubmit = event => {
  //   event.preventDefault();
  //   if(this.handleValidation()){
  //     const changepwd = {
  //       id:this.props.auth.user._id,
  //       oldpassword: this.state.fields['oldpassword'],
  //       newpassword: this.state.fields['newpassword']
  //     }
  //     axios.post(AppConstants.API+'/user/changeAdminPassword/',changepwd) 
  //       .then(res => {   
  //         console.log(res);   
  //       if(res.data.status == "Success"){
	// 	  setTimeout((e) => {
  //             this.props.history.push('/dashboard');
  //         }, 2000);
  //         this.setState({
  //           errMsg: (<div className="alert alert-success fade show mt-3">{res.data.msg}</div>)
  //         });
  //       }
  //       else{
  //         this.setState({
  //           errMsg: (<div className="alert alert-danger fade show mt-3">{res.data.msg}</div>)
  //         });
  //       }
  //     });
  //   }
    
  // };  
  handleSubmit = event => {
    event.preventDefault();
    if(this.handleValidation()){
      this.setState({loading:1});
      const changepwd = {
        id:this.props.auth.user._id,
        oldpassword: this.state.fields['oldpassword'],
        newpassword: this.state.fields['newpassword']
      }
      axios.post(AppConstants.API+'/users/changeAdminPassword/',changepwd) 
        .then(res => {   
           
        if(res.data.status == "Success"){
       
		  setTimeout((e) => {
              this.props.history.push('/dashboard');
          }, 2000);
          this.setState({
            
            errMsg: (<div className="alert alert-success fade show mt-3">{res.data.msg}</div>),loading:''
          });
          setTimeout(() => {
            this.setState({
              errMsg: ''
            });
          }, 2000);
        }
        else{
          this.setState({
            errMsg: (<div className="alert alert-danger fade show mt-3">{res.data.msg}</div>),loading:''
          });
          setTimeout(() => {
            this.setState({
              errMsg: ''
            });
          }, 2000);
        }
      });
    }
    
  };  
  
  
  
  render() {
    const {user} = this.props.auth;
    const { open } = this.state;
  return (
    <Page>
         <ReactTitle title="Change Password"/>

      <Row>
      
        <Col xl={6} lg={8} md={12} className="m-auto">
          <Card className="p-0 mb-5">
            <CardHeader className="cst-head-col">Change Password</CardHeader>
            <CardBody className="mx-4 my-2">
                
              <Form name="changeadminpassword" onSubmit= {this.handleSubmit.bind(this)}>
               
                  {/* <span className="error" style={{color: 'red'}}>{this.state.errMsg}</span> */}
             
            

                <FormGroup row>
                  <Label for="examplepassword">
                    Current Password <span className="error">*</span>
                  </Label>
              
                    <Input
                      type="password"
                      name="oldpassword"
                      placeholder="Current password"
                      onChange={this.handleChange.bind(this, "oldpassword")}
                      value={this.state.fields["oldpassword"]}
                    />
                    <span className="error" style={{color: 'red'}}>{this.state.errors["oldpassword"]}</span>
            
                </FormGroup>
                <FormGroup row>
                  <Label for="examplepassword">
                    New Password <span className="error">*</span>
                  </Label>
            
                    <Input
                      type="password"
                      name="newpassword"
                      placeholder="New password"
                      onChange={this.handleChange.bind(this, "newpassword")}
                      value={this.state.fields["newpassword"]}
                    />
                    <span className="error" style={{color: 'red'}}>{this.state.errors["newpassword"]}</span>
          
                </FormGroup>
                <FormGroup row>
                  <Label for="examplepassword" >
                    Re-enter New Password<span className="error">*</span>
                  </Label>
            
                    <Input
                      type="password"
                      name="renewpassword"
                      placeholder="Re-enter new password"
                      onChange={this.handleChange.bind(this, "renewpassword")}
                      value={this.state.fields["renewpassword"]}
                    />
                    <span className="error" style={{color: 'red'}}>{this.state.errors["renewpassword"]}</span>
             
                </FormGroup>          
                <FormGroup className="pt-3">
                  <Col className="d-flex justify-content-center " >
                  <Button className="btn btn-primary" onClick={this.handleSubmit}>Change Password
                    <div style={this.state.loading ? {} : { display: 'none' }} className="image-fill w-25 loader-div">               <div class="clearfix">
  <div class="spinner-border spinner-border-sm" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div></div></Button>
                    <Link to={"/dashboard"} className="btn btn-danger" title="Cancel">{/* <MdAdd /> */}&nbsp;Cancel</Link>
                    &nbsp;
                   
                   
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
