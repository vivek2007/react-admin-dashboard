import React from 'react';
import { Link } from 'react-router-dom';
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
import Page from 'components/Page';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from 'actions/authentication';
import AppConstants from 'AppConstants';
import {ReactTitle} from 'react-meta-tags';


class ViewadminProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id:'',
      username:'',
      email:'',
      profile_img:'',
      address:'',
      phonenumber:'',
      gender:'',
      errMsg:''
    }
  }

  
  componentDidMount() {
		if(this.props.auth.isAuthenticated)
		{
			//console.log("Hiii ", this.props.auth.user);
			this.props.getProfile(this.props.auth.user._id)
		}
		else
		{
			this.props.history.push(AppConstants.STAGADMIN+"/");
		}
  }

  componentWillReceiveProps(nextProps) {		 
   // console.log("Hiii",nextProps.errors);
  //  console.log(nextProps)
		if(nextProps.auth.isAuthenticated) {       
        this.setState({
            id:nextProps.auth.user._id,
            username:nextProps.auth.user.username,
            email:nextProps.auth.user.email,
            profile_img:nextProps.auth.user.profile_img || '/static/media/no-profile-pic.jpg',
            address:nextProps.auth.user.address,
            phonenumber:nextProps.auth.user.phonenumber,
            gender:nextProps.auth.user.gender,
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
          profile_img:data.data.profile_img || '/static/media/100_4.978e51b5.jpg',
          address:data.data.address,
          phonenumber:data.data.phonenumber,
          gender:data.data.gender,
        });
      }else
      {
        console.log('invalid data')
      }
    });
  } */
  
 
  
  render() {
    const {user} = this.props.auth;
    //console.log(user);    
  return (
    <Page title="View Profile">
     <ReactTitle title="View Profile"/>
    <Link to={AppConstants.STAGADMIN+'/dashboard'}>
      Home
    </Link>
    &nbsp; | &nbsp;&nbsp;
    <Link to={AppConstants.STAGADMIN+'/viewadminprofile'}>
    View Profile
    </Link>
      <Row>
        <Col xl={12} lg={12} md={12}>
          <Card>
            <CardBody>
              <Form name="viewadminprofile">
                <FormGroup row>
                  <Label for="examplePassword" sm={2}>
                  </Label>
                  <Col sm={10}>                    
                  <span className="error" style={{color: 'red'}}>{this.state.errMsg}</span>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="examplePassword" sm={2}>
                    Name
                  </Label>
                  <Col sm={10}>
                  {this.state.username ? this.state.username : 'N/A'}                    
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="examplePassword" sm={2}>
                    Email
                  </Label>
                  <Col sm={10}>
                  {this.state.email}                   
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="examplePassword" sm={2}>
                    Phone Number
                  </Label>
                  <Col sm={10}>
                  {this.state.phonenumber ? this.state.phonenumber : 'N/A'}                   
                  </Col>
                </FormGroup>
                
                <FormGroup row>
                  <Label for="examplePassword" sm={2}>
                    Address
                  </Label>
                  <Col sm={10}>
                  {this.state.address ? this.state.address : 'N/A'}                   
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="examplePassword" sm={2}>
                    City
                  </Label>
                  <Col sm={10}>
                  {this.state.city ? this.state.city : 'N/A'}                   
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="examplePassword" sm={2}>
                   State
                  </Label>
                  <Col sm={10}>
                  {this.state.state ? this.state.state : 'N/A'}                   
                  </Col>
                </FormGroup>
                
                <FormGroup row>
                  <Label for="examplePassword" sm={2}>
                    Zip Code
                  </Label>
                  <Col sm={10}>
                  {this.state.zipcode ? this.state.zipcode : 'N/A'}                   
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="examplePassword" sm={2}>
                    Profile Image
                  </Label>
                  <Col sm={10}>
                  <img src={this.state.profile_img} style={{width: 100, height: 100}} /><br /><br />
                                    
                  </Col>
                </FormGroup>
               
               {/*  <FormGroup row>
                  <Label for="examplePassword" sm={2}>
                    Gender
                  </Label>
                  <Col sm={10}>
                  
                  {this.state.gender ? this.state.gender : 'N/A' }
                  </Col>
                </FormGroup> */}
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
     
    </Page>
  );
};
}

ViewadminProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

//export default ChangepasswordPage;
export  default connect(mapStateToProps, {getProfile})(ViewadminProfile);
