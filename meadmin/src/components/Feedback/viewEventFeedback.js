import React from 'react';
import {
  Row,
  Col,
  CardBody,
  FormGroup,
  Card
} from 'reactstrap';
import Page from 'components/Page';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppConstants from 'AppConstants';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import placeholderimg from '../../assets/img/placeholder.png';
import {ReactTitle} from 'react-meta-tags';

class viewAdmin extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        _id: this.props.auth.user._id,
        attended_events:"",
        meet_your_expectations:"",
        result_of_event:"",
        feelings_about_yourself:"",
        rate_this_experience:"",    
        healing_trauma:"",
        part_you_enjoy:"",
        improve_this_app:"",
        addt_comments:"",
        name:"",
        profile_image:"",
        user_type:"",
        event:"",
        child_id:"",
        parent_id:"",
        mentor_id:""
      }
    }
    componentDidMount() {

        const that = this;
        fetch(AppConstants.API + '/feedback/getEventFeedbackData/' + this.props.match.params.id)
      .then(function (res) {
        console.log(" res", res)
        if (res.status == 200) {
          return res.json();
        }
      })
      .then(function (data) {
        if (data.Status == "Success") {
            console.log(" data.data", data.data)
          that.setState({
            // created_date: data.data[0].created_date,
            // happennd_today: data.data[0].happennd_today,
            // situation_affected: data.data[0].situation_affected,
            // situation_made_me_feel: data.data[0].situation_made_me_feel,
            "name":data.data[0].name,
            "attended_events":data.data[0].attended_events,
            "meet_your_expectations":data.data[0].meet_your_expectations,
            "result_of_event":data.data[0].result_of_event,
            "feelings_about_yourself":data.data[0].feelings_about_yourself,
            "rate_this_experience":data.data[0].rate_this_experience,    
            "healing_trauma":data.data[0].healing_trauma,
            "part_you_enjoy":data.data[0].part_you_enjoy,
            "improve_this_app":data.data[0].improve_this_app,
            "addt_comments":data.data[0].addt_comments,
            "profile_image":data.data[0].profile_image,
            "user_type":data.data[0].user_type,
            "event":data.data[0].title,
            "child_id":data.data[0].child_id,
            "parent_id":data.data[0].parent_id,
            "mentor_id":data.data[0].mentor_id
          });
        } else {
          console.log('invalid data')
        }
      });
      if(!this.props.auth.user.user_type){
        var element = document.getElementById("navItem-Event Feedback-1");
        element.classList.add("active");
      }
    }
    render() {
      let image;
      if (this.state.profile_image == '' || this.state.profile_image == undefined) {
          image = placeholderimg;
      }
      else {
          image =  this.state.profile_image
      }
      let userName;
      if(this.state.name!='' && this.state.user_type == "student"){
      userName =   <Link  href="#"   to = {"/viewChild/" + this.state.child_id} > <h2 className="cst-pfname">{this.state.name}</h2> </Link> 
      }else if(this.state.name != '' && this.state.user_type == "parent"){
        userName =   <Link  href="#"   to = {"/viewParent/" + this.state.parent_id} > <h2 className="cst-pfname">{this.state.name}</h2> </Link> 
      }else if(this.state.name != '' && this.state.user_type == "mentor"){
        userName =   <Link  href="#"   to = {"/viewMentor/" + this.state.mentor_id} > <h2 className="cst-pfname">{this.state.name}</h2> </Link>
      }
        return (
            <Page title="View Event Feedback">
            <ul className="cst-breadcrumb">
                <li><Link to={'/dashboard'}>Home</Link></li>
                <li><Link to={'/eventFeedback'}>All Event Feedbacks</Link></li>
                <li>View Event Feedback</li>
            </ul>
            <ReactTitle title="View Event Feedback"/>
              <Row>
          <Col xl={12} lg={12} md={12}>
            <Card>
              <CardBody>
                <FormGroup row>
                  <Col className="col-1 ml-3 feedback">
                      <figure className="view-profile-img" ><img src={image} /></figure>
                  </Col>
                  <Col sm={8} className="profile-info ml-5">
                  {userName}
                  {/* <h2 className="cst-pfname">{this.state.name ? this.state.name : 'N/A'}</h2> */}
                  {/* <h4 className="cst-pfname">{this.state.user_type ? this.state.user_type : 'N/A'}</h4> */}
                  <div className="row form-group">
                  <label htmlFor="exampleEmail" className="col-16 col-form-label">User type </label>
                  </div>
                  <div >
                  <label className="col-auto col-form-label">{this.state.user_type ? this.state.user_type : 'N/A'}</label>
                </div> 
                <div className="row form-group">
                  <label htmlFor="exampleEmail" className="col-16 col-form-label">Event </label>
                  </div>
                  <div >
                  <label className="col-auto col-form-label">{this.state.event ? this.state.event : 'N/A'}</label>
                </div>
                  
                  {/* <div className="row form-group">
                  <label htmlFor="exampleEmail" className="col-16 col-form-label"> How many Music Club events have you attended?</label>
                  </div>
                  <div >
                  <label className="col-auto col-form-label">{this.state.attended_events ? this.state.attended_events : 'N/A'} </label>
                  </div>
                  <div className="row form-group">
                  <label htmlFor="exampleEmail" className="col-16 col-form-label">How well did this event meet your expectations? </label>
                  </div>
                  <div >
                  <label className="col-auto col-form-label">{this.state.meet_your_expectations ? this.state.meet_your_expectations : 'N/A'}</label>
                </div>
                  <div className="row form-group">
                  <label htmlFor="exampleEmail" className="col-16 col-form-label">As a result of attending this event, do you feel less stressed or anxious? </label>
                  </div>
                  <div >
                  <label className="col-auto col-form-label">{this.state.result_of_event ? this.state.result_of_event : 'N/A'}</label>
                </div>
                <div className="row form-group">
                  <label htmlFor="exampleEmail" className="col-16 col-form-label">Has attending this event positively influenced your feelings about yourself?</label>
                  </div>
                  <div >
                  <label className="col-auto col-form-label">{this.state.feelings_about_yourself ? this.state.feelings_about_yourself : 'N/A'} </label>
                  </div>
                  <div className="row form-group">
                  <label htmlFor="exampleEmail" className="col-16 col-form-label"> How would you rate this experience? </label>
                  </div>
                  <div >
                  <label className="col-auto col-form-label">{this.state.rate_this_experience ? this.state.rate_this_experience : 'N/A'}</label>
                </div>
                  <div className="row form-group">
                  <label htmlFor="exampleEmail" className="col-16 col-form-label">What part of this event did you enjoy and why?</label>
                  </div>
                  <div >
                  <label className="col-auto col-form-label">{this.state.part_you_enjoy ? this.state.part_you_enjoy : 'N/A'}</label>
                </div>
                <div className="row form-group">
                  <label htmlFor="exampleEmail" className="col-16 col-form-label"> How could we improve this event? </label>
                  </div>
                  <div >
                  <label className="col-auto col-form-label">{this.state.improve_this_app ? this.state.improve_this_app : 'N/A'}</label>
                </div> */}
                  <div className="row form-group">
                  <label htmlFor="exampleEmail" className="col-16 col-form-label"> Feedback Given</label>
                  </div>
                  <div >
                  <label className="col-auto col-form-label">{this.state.addt_comments ? this.state.addt_comments : 'N/A'}</label>
                </div>

                  </Col>
                  
                </FormGroup>
              </CardBody>

            </Card>
          </Col>

        </Row>

              </Page>
              )
    }
}
viewAdmin.propTypes = {
    auth: PropTypes.object.isRequired,
    //profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  
  };
  const mapStateToProps = (state) => ({
    auth: state.auth,
    //profile: state.profile,
    errors: state.errors,
  
  });
  
  export default connect(mapStateToProps, {})(viewAdmin);