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
import { FiUser, FiArrowRight } from "react-icons/fi";

class viewAdmin extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        _id: this.props.auth.user._id,
        recommend_app:"",
        number_of_times:"",
        knowledge_understanding:"",
        intentions_motivations :"",
        further_help:"",
        healing_trauma:"",
        part_you_enjoy:"",
        improve_this_app:"",
        addt_comments:"",
        name:"",
        profile_image:"",
        user_type:"",
        child_id:"",
        parent_id:"",
        mentor_id:""
        
      }
    }
    componentDidMount() {

        const that = this;
        fetch(AppConstants.API + '/feedback/getAppFeedbackData/' + this.props.match.params.id)
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
            "name":data.data[0].name,
            "recommend_app":data.data[0].recommend_app,
            "number_of_times":data.data[0].number_of_times,
            "knowledge_understanding":data.data[0].knowledge_understanding,
            "intentions_motivations ":data.data[0].intentions_motivations,
            "further_help":data.data[0].further_help,
            "healing_trauma":data.data[0].healing_trauma,
            "part_you_enjoy":data.data[0].part_you_enjoy,
            "improve_this_app":data.data[0].improve_this_app,
            "addt_comments":data.data[0].addt_comments,
            "profile_image":data.data[0].profile_image,
            "user_type":data.data[0].user_type,
            "child_id":data.data[0].child_id,
            "parent_id":data.data[0].parent_id,
            "mentor_id":data.data[0].mentor_id
          });
        } else {
          console.log('invalid data')
        }
      });
      if(!this.props.auth.user.user_type){
        var element = document.getElementById("navItem-App Feedback-0");
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
            <Page title="View App Feedback">
            <ul className="cst-breadcrumb">
                <li><Link to={'/dashboard'}>Home</Link></li>
                <li><Link to={'/appFeedback'}>All App Feedbacks</Link></li>
                <li>View App Feedback</li>
            </ul>
            <ReactTitle title="View App Feedback"/>
              <Row>
          <Col xl={12} lg={12} md={12}>
            <Card className="pt-0">
              <CardBody>
              
                <div className="pf-info-cs d-flex">
                      <figure><img src={image} className="shadow" /></figure>
                      <h2 className="cst-pfname">
                        {this.state.name ? this.state.name : 'N/A'}<span>{this.state.user_type ? this.state.user_type : 'N/A'}</span>
                        <a href="#">View Detail <FiArrowRight /></a>
                      </h2>
                  </div>
                  <Col sm={12} className="qa-list px-0">

                  <div className="form-group ">
                  <h5 htmlFor="exampleEmail" className="col-16 col-form-label">1. Would you recommend this app to others?</h5>
               
                  <p className="col-auto col-form-label">{this.state.recommend_app ? this.state.recommend_app : 'N/A'} </p>
               
                  <h5 htmlFor="exampleEmail" className="col-16 col-form-label">2. After music club graduation, how many times do you think you will use this app in the next 12 months?  </h5>
               
                  <p className="col-auto col-form-label">{this.state.number_of_times ? this.state.number_of_times : 'N/A'}</p>
              
                  <h5 htmlFor="exampleEmail" className="col-16 col-form-label">3. This app is likely to increase knowledge/understanding of trauma and how to manage it.  </h5>
                
                  <p className="col-auto col-form-label">{this.state.knowledge_understanding ? this.state.knowledge_understanding : 'N/A'}</p>
               
                  <h5 htmlFor="exampleEmail" className="col-16 col-form-label">4. This app is likely to increase intentions/motivations to heal trauma.</h5>
                 
                  <p className="col-auto col-form-label">{this.state.intentions_motivations ? this.state.intentions_motivations : 'N/A'} </p>
                 
                  <h5 htmlFor="exampleEmail" className="col-16 col-form-label"> 5. Use of this app is likely to encourage further help seeking for managing and healing trauma?  </h5>
                 
                  <p className="col-auto col-form-label">{this.state.further_help ? this.state.further_help : 'N/A'}</p>


                  <h5 htmlFor="exampleEmail" className="col-16 col-form-label"> 6. Use of this app is likely to increase the likelihood of healing trauma.?  </h5>
                 
                 <p className="col-auto col-form-label">{this.state.healing_trauma ? this.state.healing_trauma : 'N/A'}</p>

                  <h5 htmlFor="exampleEmail" className="col-16 col-form-label">7. What part of this event did you enjoy and why?</h5>
                 
                  <p className="col-auto col-form-label">{this.state.part_you_enjoy ? this.state.part_you_enjoy : 'N/A'}</p>
               
                  <h5 htmlFor="exampleEmail" className="col-16 col-form-label">8. How could we improve this event? </h5>
                  
                  <p className="col-auto col-form-label">{this.state.improve_this_app ? this.state.improve_this_app : 'N/A'}</p>
               
                  <h5 htmlFor="exampleEmail" className="col-16 col-form-label">9. Additional comments:</h5>
                
                  <p className="col-auto col-form-label">{this.state.addt_comments ? this.state.addt_comments : 'N/A'}</p>

                </div>

                  </Col>
         
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