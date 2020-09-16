import React from 'react';
import {
  Row,
  Col,
  CardHeader,
  CardBody,
  Label,
  Card, CardImg, CardTitle, CardText, UncontrolledCollapse, Button, TabContent, TabPane, Nav, NavItem, NavLink
} from 'reactstrap';
import Page from 'components/Page';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppConstants from 'AppConstants';
// import placeholderimg from '../assets/img/placeholder.png';
import { ReactTitle } from 'react-meta-tags';
import moment from "moment";
import Switch from "react-switch";
import Child1 from 'assets/img/users/300_13.jpg';
import parent1 from 'assets/img/users/100_8.jpg';

import ParentIcon from 'assets/img/parents.png';
import ChildInfoIcon from 'assets/img/info.png';
import feeljornlIcon from 'assets/img/fe-jrnls.png';
import tmMeterIcon from 'assets/img/tm-meter.png';
import tmQuestionIcon from 'assets/img/tm-question.png';

//mport SimpleSlider from "components/Children/ThermometerQuestionSlider";
//import "slick-carousel/slick/slick.css";
//import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { MdInfoOutline, MdEmail, MdPhone, MdLanguage, MdAccountBalance, MdPerson } from 'react-icons/md';
import { Line, Pie, Doughnut, Bar, Radar, Polar } from 'react-chartjs-2';
import { Accordion } from "components/Accordion";
import { randomNum } from 'utils/demos';
import classnames from 'classnames';
import ViewPastTodos from './viewChildPastTodos';

import placeholderimg from '../../assets/img/placeholder.png';
import swal from 'sweetalert';
import ViewChildTodos from './viewChildTodos';


// import  Thermometerdt from './thermometerDT';
import FDdatatables from '../FeelingJournal/fJDataTables';
import Loader from 'react-loader';
import Thermometerdt from './thermometerDT';

// const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September', 'October', 'November', 'December' ];
// const genLineData = (moreData = {}) => {
//   return {
//     labels: MONTHS,
//     datasets: [
//       {
//         label: 'My First dataset',
//       fill: false,
//       lineTension: 0.1,
//       backgroundColor: 'rgba(75,192,192,0.4)',
//       borderColor: 'rgba(75,192,192,1)',
//       borderCapStyle: 'butt',
//       borderDash: [],
//       borderDashOffset: 0.0,
//       borderJoinStyle: 'miter',
//       pointBorderColor: 'rgba(75,192,192,1)',
//       pointBackgroundColor: '#fff',
//       pointBorderWidth: 1,
//       pointHoverRadius: 5,
//       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
//       pointHoverBorderColor: 'rgba(220,220,220,1)',
//       pointHoverBorderWidth: 2,
//       pointRadius: 1,
//       pointHitRadius: 10,
//       data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//         //...moreData,
//       },
//     ],
//   };
// };
var getthermques = [];
class ViewChild extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      name: "",
      email: "",
      address: "",
      phone: "",
      date_of_birth: "",
      graduation_year: "",
      gaurdian_phone: "",
      gaurdian_name: "",
      gaurdian_address: "",
      gauradianflang: "",
      gender: "",
      program: "",
      firstlanguage: "",
      organization: "",
      role_id: "",
      role_type: "",
      grade: "",
      school: "",
      status: true,
      approval: false,
      activeTab: '1',
      getquestions: [],
      parent_data: [],
      feelingJournals: [],
      pastProgram: [],
      hide: true,
      rowDisplay: 10,
      profile_img: '',
      page_loader: false,
      admin_res: false

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleResponse = this.handleResponse.bind(this);


  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  handleResponse(checked) {
    // console.log("this.props.auth.user.user_type130",this.props.auth.user.id)
    swal({
      title: "Are you sure",
      text: "you want to respond for this student?",
      icon: "warning",
      buttons: ["Go back", "Confirm"],
      dangerMode: false,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("Student has been approved!", {
            icon: "success",
          });
          const data = {
            child_id: this.props.match.params.id,
            id: this.props.auth.user._id,
            adminResponse: checked
          }

          axios.post(AppConstants.API + '/thermometerReading/mailsAfterAdminResponse', data).then(res => {
            if (res.data.Status == "Success") {
              this.setState({ admin_res: checked });
            }
          })
        }
      })
  }
  // viewMoreClick(i){
  //   // console.log("this.state.feelingJournals.length",this.state.feelingJournals.length)

  //   // let carLength = sizeof(this.state.feelingJournals) / sizeof(int) ;
  //   let carLength = this.state.feelingJournals[0].length ;

  //   this.setState({rowDisplay:carLength});
  //   // this.setState({
  //   //   hide:false
  //   // })
  // }
  componentDidMount() {
    console.log("admin_res", this.state.admin_res)
    console.log("this.props.match.params.id", this.props.match.params.id)
    fetch(AppConstants.API + '/child/getChildSingleReading/' + this.props.match.params.id)
      .then(function (res) {
        if (res.status == 200) {
          return res.json();
        }

      })
      .then(function (data) {
        console.log("data178", data.data.thermometerData)
        if (data.Status == "Success") {
          if (data.data.thermometerData != undefined) {
            that.setState({
              admin_res: data.data.thermometerData.adminResponse
            })
          }

        }
      })
    fetch(AppConstants.API + '/child/getChildPreviousProgram/' + this.props.match.params.id)
      .then(function (res) {
        if (res.status == 200) {
          return res.json();
        }

      })
      .then(function (data) {
        console.log("data178", data.data[0].pastProgram)
        if (data.Status == "Success") {

          that.setState({
            pastProgram: data.data[0].pastProgram
          })
        }
      })

    const that = this;
    fetch(AppConstants.API + '/child/getChildData/' + this.props.match.params.id)
      .then(function (res) {
        //console.log(res);
        if (res.status == 200) {
          return res.json();
        }
      })
      .then(function (data) {
        if (data.Status == "Success") {
          that.setState({
            name: data.data.name,
            email: data.data.email,
            address: data.data.address,
            phone: data.data.phone,
            date_of_birth: data.data.date_of_birth,
            profile_img: data.data.profile_image,
            // graduation_year: data.data.graduation_year,
            // gaurdian_phone: data.data.parent_phone,
            // gaurdian_name: data.data.parent_name,
            // gaurdian_address:data.data.parent_address,
            // gauradianflang : data.data.parent_flang,
            // gender: data.data.gender,
            program: data.data.program,
            firstlanguage: data.data.firstlanguage,
            organization: data.data.organization,
            grade: data.data.grade,
            school: data.data.school,
            status: data.data.status,
            // parent_email : data.data.parent_email,
            approval: data.data.approval,
            parent_data: data.data.ParentData,
            page_loader: true,
          });
        } else {
        }
      })
    fetch(AppConstants.API + '/thermometerQues/getAllThermoQuestions')
      .then(function (res) {
        //console.log(" res", res)
        if (res.status == 200) {
          return res.json();
        }
      })
      .then(function (data) {
        if (data.Status == "Success") {
          //console.log(" data.data", data)
          var thermometerQues = data.data.map((res, i) => {
            //console.log('131',res.quedate, res.quetime)
            getthermques.push(res)

          })
          that.setState({
            getquestions: getthermques
          });
        } else {
          //console.log('invalid data')
        }
      });
    // fetch(AppConstants.API + '/child/getChildFeelingJournals/' + this.props.match.params.id).then(function (res) {
    //   //console.log(res);
    //   if (res.status == 200) {
    //     return res.json();
    //   }
    // })
    // .then(function (data) {
    //    console.log("data179",data.data.feelingJournalsData[0].length);
    //   console.log("Object.keys(this.state.feelingJournals).length",Object.keys(data.data.feelingJournalsData).length)
    //   that.setState({
    //     feelingJournals :data.data.feelingJournalsData
    //   })
    // })


    var element = document.getElementById("navItem-Clients-0");
    element.classList.add("active");
    var element = document.getElementById("navItem-Help-1");
    element.classList.remove("active");
    var element = document.getElementById("navItem-Mentors-1");
    element.classList.remove("active");
  
  }
  handleChange(checked) {
    swal({
      title: "Are you sure",
      text: "you want to approve this student?",
      icon: "warning",
      buttons: ["Go back", "Confirm"],
      dangerMode: false,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("Student has been approved!", {
            icon: "success",
          });
          const data = {
            id: this.props.match.params.id,
            approve: checked
          }

          axios.post(AppConstants.API + '/child/admiApprovalStudent', data).then(res => {
            if (res.data.Status == "Success") {
              this.setState({ approval: checked });
            }
          })
        }
      })
    // const data = {
    //   id : this.props.match.params.id,
    //   approve : checked
    // }

    // axios.post(AppConstants.API+'/child/admiApprovalStudent',data).then(res => {
    //   if(res.data.Status=="Success"){
    //     this.setState({ approval:checked });
    //   }
    // })
  }
  handleStatusChange(checked) {
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
          const data = {
            id: this.props.match.params.id,
            status: checked
          }
          axios.post(AppConstants.API + '/child/updateChildStatus/' + this.props.match.params.id, data).then(res => {
            if (res.data.Status == "Success") {
              this.setState({ status: checked });
            }
          })
        }
      })

  }
  render() {
   // console.log("admin_res", this.state.admin_res)
   // console.log("this.props.auth.user.user_type338", this.props.auth.user._id)

    let image;
    if (this.state.profile_img != '' && this.state.profile_img != null && this.state.profile_img != undefined && this.state.profile_img != 'undefined') {
      image = this.state.profile_img
    } else {
      image = placeholderimg;
    }

    let parent_status
    if (this.state.status == true) {
      parent_status = <p className="mr-2 badge badge-success  p-2">active</p>

    } else {
      parent_status = <p className="mr-1 badge badge-warning p-2 cst-inactive">Inactive</p>
    }
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    let feelingJournalsData;
    if (this.state.feelingJournals != '') {
      feelingJournalsData = this.state.feelingJournals.map((res, i) => {
        return (
          <Row>
            <Col xl={12} lg={12} md={12}>
              <Card className="pt-0 feel-jrn-blk">
                <CardHeader><Label for="examplePassword" className="m-0"><strong><img src={feeljornlIcon} />Feeling Journals</strong>  <Link href="#" class="btn btn-outline-primary" to={"/viewFeelingJournal/" + this.props.match.params.id} > View All Journals </Link></Label></CardHeader>
                <CardBody>
                  {/* {this.state.hide == true ? */}
                  <Row>
                    <Col xs="6" sm="4" md="4" className="lft-blk pl-0">
                      <Nav vertical>
                        {res.slice(0, this.state.rowDisplay).map((result, i) => {
                          return (<NavItem>
                            <NavLink
                              className={classnames({ active: this.state.activeTab === i })}
                              onClick={() => {
                                this.toggle(i);
                              }}
                            >
                              {moment(result.created_date).format("LLL")}
                            </NavLink>
                          </NavItem>)
                        })}
                      </Nav>
                    </Col>
                    <Col xs="6" sm="8" md="8" className="rt-blk">
                      <TabContent activeTab={this.state.activeTab}>
                        {res.slice(0, this.state.rowDisplay).map((result, i) => {
                          return (
                            <TabPane tabId={i}>
                              <h5>From my point of view, here is what happened today?</h5>
                              <p>{result.happennd_today}</p>
                              <h5>The situation affected (i.e. myself, parents, friends, parole officer)</h5>
                              <p>{result.situation_affected}</p>
                              <h5> This situation made me feel (i.e. angry, frustrated, left out, confused)</h5>
                              <p>{result.situation_made_me_feel}</p>
                              <h5> Do you have any other feeling</h5>
                              <p>{result.any_other_feeling}</p>
                            </TabPane>
                          )
                        })}
                      </TabContent>
                    </Col>
                  </Row>
                  {/* // :''} */}

                </CardBody>
              </Card>
            </Col>
          </Row>
        )
      })
    } else {
      feelingJournalsData = <Row> <Col xl={12} lg={12} md={12}>
        <Card className="pt-0 feel-jrn-blk">
          <CardHeader><Label for="examplePassword" className="m-0"><strong><img src={feeljornlIcon} />Feeling Journals</strong>
            {/* <a href="#" class="btn btn-outline-primary" >View All Journals</a> */}
          </Label></CardHeader>
          <CardBody>
            <Row >
              {'No Feeling Journal'}
            </Row>
          </CardBody>
        </Card>
      </Col>
      </Row>
    }
    var dob = moment(this.state.date_of_birth).format('MM-DD-YYYY');
    var grad_date = moment(this.state.graduation_year).format('MM-DD-YYYY');
    return (
      <Loader loaded={this.state.page_loader}  >
        <Page title="View Client">
          <ul className="cst-breadcrumb">
            <li><Link to={'/dashboard'}>Home</Link></li>
            <li><Link to={'/allChildren'}>All Clients</Link></li>
            <li>View Client</li>

          </ul>
          <ReactTitle title="View Client" />
          <Row>
            <Col xl={12} lg={12} md={12} className="profile-info">
              <Card className="p-0 mb-4">


                <CardBody>
                  <Row>
                    <Col md={2}>
                      <figure className="view-profile-img"><CardImg src={image} /></figure>
                    </Col>
                    <Col md={5}>
                      <div className="row form-group">
                        <label htmlFor="exampleEmail" className="col-4 col-form-label"> Name</label>
                        <label className="col-7 col-form-label">{this.state.name ? this.state.name : 'N/A'} </label>
                      </div>
                      <div className="row form-group">
                        <label htmlFor="exampleEmail" className="col-4 col-form-label">Email</label>
                        <label className="col-7 col-form-label">{this.state.email ? this.state.email : 'N/A'} </label>
                      </div>
                      <div className="row form-group">
                        <label htmlFor="exampleEmail" className="col-4 col-form-label">Phone Number</label>
                        <label className="col-7 col-form-label">{this.state.phone ? this.state.phone : 'N/A'}</label>
                      </div>
                      <div className="row form-group">
                        <label htmlFor="exampleEmail" className="col-4 col-form-label">Address</label>
                        <label className="col-7 col-form-label">{this.state.address ? this.state.address : 'N/A'}</label>
                      </div>
                      <div className="row form-group">
                        <label htmlFor="exampleEmail" className="col-4 col-form-label"> Date of Birth</label>
                        <label className="col-7 col-form-label">{this.state.date_of_birth ? dob : 'N/A'} </label>
                      </div>

                      <div className="row form-group">

                        <label htmlFor="exampleEmail" className="col-4 col-form-label">Status</label>
                        {this.props.auth.user.user_type != 'admin' ?
                          <label className="col-7 col-form-label">
                            <Switch onChange={this.handleStatusChange} checked={this.state.status}
                              uncheckedIcon={
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100%",
                                    fontSize: 15,
                                    width: "150px",
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
                                    width: "180px",
                                    fontWeight: "bold",
                                    color: "#000",
                                    paddingRight: 2
                                  }}
                                >
                                  Active
                              </div>
                              }
                              onColor="#45b649"
                              offColor="#ffd700"
                              className="react-switch"
                              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                              height={20}
                              width={48}
                              handleDiameter={30}
                            // width	= {120}
                            />
                          </label>
                          : <p className='col-6'>{parent_status}</p>}

                        <div className="row form-group">
                          <label htmlFor="exampleEmail" className="col-4 col-form-label">Current Program</label>
                          <label className="col-7 col-form-label"><strong>{this.state.program ? this.state.program : 'N/A'}</strong> </label>
                        </div>
                      </div>
                    </Col>

                  </Row>

                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl={12} lg={12} md={12}>
              <Card className="pt-0 therma-ques">

                <CardBody className="p-0">
                  <Thermometerdt data={this.props.match.params.id} />
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* <Nav tabs className="w-100 cst-tabs justify-content-center mt-4">
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                PRESENT HABITS LIST
                  </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                PAST HABITS LIST
                  </NavLink>
            </NavItem>
          </Nav> */}
          {/* <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1"> */}
              <ViewChildTodos data={this.props.match.params.id} />
            {/* </TabPane>
            <TabPane tabId="2">
              <ViewPastTodos data={this.props.match.params.id} />
            </TabPane>
          </TabContent> */}


        </Page>
      </Loader>
    )
  }
}
ViewChild.propTypes = {
  auth: PropTypes.object.isRequired,
  // profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,

};
const mapStateToProps = (state) => ({
  auth: state.auth,
  // profile: state.profile,
  errors: state.errors,

});

export default connect(mapStateToProps, {})(ViewChild);