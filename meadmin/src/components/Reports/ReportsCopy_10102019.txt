import Page from 'components/Page';
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { BootstrapTable, TableHeaderColumn, InsertButton } from 'react-bootstrap-table';
import {
  Card, Button, CardBody, CardHeader, Col, Row, Table, Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Badge
} from 'reactstrap';
import {
  MdCreate,
  MdDelete,
  MdRemoveRedEye, MdAdd, MdEdit
} from 'react-icons/md';
import placeholderimg from '../../assets/img/placeholder.png';
import AppConstants from 'AppConstants';
import { connect } from 'react-redux';
import {ReactTitle} from 'react-meta-tags';
import swal from 'sweetalert';
import Workbook from 'react-xlsx-workbook';
import Loading from '../../assets/img/loader.gif';
var moment = require('moment');
let data1 = [];
const data2 = [];
var loading_val='';
let ques = [];
let anws = [];
let fques = [];
let new_ans = [];
class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      errMsg: false,
      loading: '',
     feedbackques:[],
     all_ans:[]
    };
    this.format = this.format.bind(this);
    this.handleFileClick  = this.handleFileClick.bind(this);
  }

  handleFileClick(e){
    e.preventDefault();
    loading_val = 1;
    this.setState({loading:1});
  }


  componentDidUpdate() { 

    if(this.state.loading == 1) {
      fetch(AppConstants.API+'/getAllRidersTripsInfo').then(response => response.json())
      .then(res => {
        if(res.Status == "Success")
        {
          setTimeout(() => {
            loading_val="";
            this.setState({loading:''});            
          }, 1000);
        }
      });
    }

    
  }



  DeleteCallcenter = params => e => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "You want to delete this Call Center?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Call Center data has been deleted!", {
          icon: "success",
        });
        const callcenterdeletedata = {
          id: params
        }
        axios.post(AppConstants.API + '/callcenter/deleteCallcenter/', callcenterdeletedata)
          .then(res => {
            if (res.data.status == "Success") {
              this.setState({
                errMsg: res.data.msg
              });
              setTimeout(() => {
                this.setState({
                  errMsg: false,
                });
              }, 1000);
              fetch(AppConstants.API + '/getAllcallcenters').then(response => response.json())
                .then(data => {
                  if (data.Status == "Success") {
                    this.setState({ users: data.data });
                  }
                  else {
                    this.setState({ users: [] });
                  }
                });
            }
            else {
              this.setState({
                errMsg: res.data.msg
              });
            }
          });
        } 
        // else {
        //   swal("Call Center data is safe!");
        // }
      });
    
  };

  format(cell, row) {
    return <div className="ca-controls"><span><Link style={{ 'fontSize': 12 }} to={"/editCallcenter/" + row._id} title="Edit Call Center"><button className="btn btn-info"><MdEdit/>&nbsp;Edit</button></Link></span>
   
    <Link style={{ 'fontSize': 12 }} to={"/viewCallcenter/" + row._id} title="View Call Center"><button className="btn btn-success"><MdRemoveRedEye />&nbsp;View</button></Link>
    <span onClick={this.DeleteCallcenter(row._id)} title="Delete Call Center"><a className="bg-danger cst-icon"><MdDelete/></a></span></div>;
  }

  imgformat(cell, row) {
    if(row.profile_image)
    return <div className="tbl-img"><span><img src={AppConstants.API+'/public/uploads/'+ row.profile_image} alt={row.profile_image} className="img-responsive" /></span></div>;
	else
	return <div className="tbl-img"><span><img src={placeholderimg} alt={row.profile_image} className="img-responsive" /></span></div>;
  }

  statusChange(cell, row) {
    return <div className="ca-controls">
    {(row.status == 'Inactive') && 
    <span style={{'padding-top': 0,
'padding-bottom': 0}} className="mr-1 badge badge-warning p-1" title="Resend Invite">Inactive</span>
    }
    {(row.status == 'Active') && 
    <span style={{'padding-top': 0,
'padding-bottom': 0}} className="mr-1 badge badge-success  p-1" title="Resend Invite">Active</span>
    }
   </div>;
  }

  

  createCustomInsertButton = (onClick) => {
    return (
      <span> &nbsp; <Link to={"/addCallcenter"} className="btn btn-warning" title="Call Center"><MdAdd />Add</Link></span>
    );
  }
  componentDidMount() {
    fetch(AppConstants.API+'/feedback/getAllActiveQuestions').then(response => response.json())
    .then(data => {
      if(data.status== "success"){
        this.setState({feedback:data.data})
        {data.data.map((ques1,index)=>{    
          ques.push(ques1.question);
          this.setState({feedbackques:ques})
          })
        }
      }else {
        this.setState({feedback:[]})
      }
    });

    fetch(AppConstants.API+'/getAllRidersTripsInfo').then(response => response.json())
    .then(data => {
    if(data.Status == "Success")
    {
     
    if(data.data && data.data.length > 0) {
      {data.data.map((riders, i) => {     
        var obj={};
      
          
        //if(riders.trip_option == 'one-way' || riders.trip_option == 'round-trip'){
            
            // if(riders.otherInsuranceType && riders.otherInsuranceType != null && riders.otherInsuranceType != '' ){
            //   var insuranceName = riders.otherInsuranceType;
            // }
            // else if(riders.health_insurance && riders.health_insurance == "No"){
            //   var insuranceName = riders.health_insurance;
            // }
            // else {
            //   var insuranceName = riders.insurance_category_type;            
            // }
            var trip_purpose;
            if(riders.trip_purposes != '' && riders.trip_purpose_other != ''){
              trip_purpose = riders.trip_purposes;
            }
            else if(riders.trip_purpose != '' && riders.trip_purpose_other == ''){
              trip_purpose = riders.trip_purpose_other;
            }
            obj['from'] = riders.leaving_from;
            obj['to'] = riders.going_to;
            //obj['mode'] = riders.provider_type;
            if(riders.providertypes_info && riders.providertypes_info.length > 1){
            obj['mode'] = riders.providertypes_info[1].provider_type;
            obj['modes'] = riders.providertypes_info[1].provider_type;
            }
            else{
              obj['mode'] = riders.provider_type;
              obj['modes'] = riders.provider_type;
            }
            //obj['trip_type'] = riders.trip_option;
            //obj['trip_type'] = riders.trip_option;
            obj['trip_type'] = "Onward";
            obj['trip_purposes'] = trip_purpose;
            
            obj['type_of_appointment'] = riders.type_of_appointment;
            //obj['trip_purposes'] = riders.trip_purposes;
            obj['provider_name'] = riders.name;
            obj['date_time'] = riders.date_time;
            
            obj['eligible_for_ada_paratransit'] = riders.eligible_for_ada_paratransit;
            //obj['convert_created_date'] = riders.convert_created_date;
            obj['convert_created_date'] = moment(riders.convert_created_date).format('MM-DD-YYYY hh:mm a');;
          ///////
            // obj['permanent_or_temporary_disability'] = riders.permanent_or_temporary_disability;
            // obj['medicaid_tncare'] = riders.medicaid_tncare;
            obj['trip_visually_impaired'] = riders.blind_visual_impaired;
            //obj['trip_payment_option'] = riders.tripPaymentTypeName;
            obj['require_a_wheelchair'] = riders.require_a_wheelchair;
            obj['motorized_wheelchair'] = riders.motorized_wheelchair;
            //obj['require_a_wheelchair_lift'] = riders.require_a_wheelchair_lift;
            obj['folding_wheelchair'] = riders.folding_wheelchair;
            obj['space_for_stretcher'] = riders.space_for_stretcher;
            obj['bariatric_stretch_transport'] = riders.bariatric_stretch_transport;
            obj['space_for_car_seat'] = riders.space_for_car_seat;
            obj['travel_with_companion'] = riders.travel_with_companion;
            obj['service_animal'] = riders.service_animal;
            obj['require_assistance_from_the_driver_exit'] = riders.require_assistance_from_the_driver_exit;
            obj['door_through_door_assistance'] = riders.door_through_door_assistance;
            //obj['insuranceName'] = insuranceName;
            /*obj['insurance_category_type'] = riders.insurance_category_type;
            obj['otherInsuranceType'] = riders.otherInsuranceType;*/
            obj['require_assistance_from_door'] = riders.require_assistance_from_door;
            //obj['require_assistance_enter_exit_vehicle'] = riders.require_assistance_enter_exit_vehicle;
            //obj['require_assistance_to_door'] = riders.require_assistance_to_door;
            //obj['require_assistance_through_door'] = riders.require_assistance_through_door;
            //this.setState({all_ans:ans})
            obj['rider_name'] = riders.rider_name;
            obj['rider_contactnumber'] = riders.rider_contactnumber;
            obj['rider_email'] = riders.rider_email;
            obj['rider_gender'] = riders.rider_gender;
            obj['year_of_birth'] = riders.year_of_birth;
            obj['address'] = riders.address;
            obj['type_of_appointment'] = riders.type_of_appointment;
    
            
            if(riders.referralpartnersinfo && riders.referralpartnersinfo.length > 0){
            obj['referral_partner'] = riders.referralpartnersinfo[0].referral_partner;
            }
            else {
              obj['referral_partner'] ="";
            }

            
            // obj['rider_permanent_or_temporary_disability'] = riders.rider_permanent_or_temporary_disability;
            // obj['rider_eligible_for_ada_paratransit'] = riders.rider_eligible_for_ada_paratransit;
            // obj['rider_medicaid_tncare'] = riders.rider_medicaid_tncare;
            obj['rider_visual_impaired'] = riders.rider_visual_impaired;
            //obj['rider_insurance_optin'] = ;
            obj['rider_require_a_wheelchair'] = riders.rider_require_a_wheelchair;
            obj['rider_motorized_wheelchair'] = riders.rider_motorized_wheelchair;
            //obj['rider_require_a_wheelchair_lift'] = riders.rider_require_a_wheelchair_lift;
            obj['rider_folding_wheelchair'] = riders.rider_folding_wheelchair;
            obj['rider_space_for_stretcher'] = riders.rider_space_for_stretcher;
            obj['rider_bariatric_stretch_transport'] = riders.rider_bariatric_stretch_transport;
            obj['rider_space_for_car_seat'] = riders.rider_space_for_car_seat;
            obj['rider_travel_with_companion'] = riders.rider_travel_with_companion;
            obj['rider_service_animal'] = riders.rider_service_animal;
            /*obj['rider_require_assistance_from_the_driver_exit'] = riders.rider_require_assistance_from_the_driver_exit;
            obj['rider_door_through_door_assistance'] = riders.rider_door_through_door_assistance;*/
            obj['rider_require_assistance_from_door'] = riders.rider_require_assistance_from_door;
            // obj['rider_require_assistance_enter_exit_vehicle'] = riders.rider_require_assistance_enter_exit_vehicle;
            // obj['rider_require_assistance_to_door'] = riders.rider_require_assistance_to_door;
            // obj['rider_require_assistance_through_door'] = riders.rider_require_assistance_through_door;
            obj['trip_created_by'] = riders.trip_created_by[0];
            obj['rider_created_by'] = riders.rider_created_by;

            
          
           fetch(AppConstants.API+'/feedback/getAnswer/'+ riders._id).then(response => response.json())
          .then(data => {
            if(data.status== "success"){
              data.data.map((ans,i)=>{
                var j = -1;
                 for(var k=0; k<=this.state.feedbackques.length; k++){
                  j++;
                  obj[k] = ans.answers[j];
                }
              });   
               
              
            }})
            data1.push(obj);
        //}
        if(riders.trip_option == 'round-trip')
        { var obj1={};
        // if(riders.otherInsuranceType && riders.otherInsuranceType != null && riders.otherInsuranceType != '' ){
        //   var insuranceName = riders.otherInsuranceType;
        // }
        // else if((riders.health_insurance && riders.health_insurance == "No")){
        //   var insuranceName = riders.health_insurance;
        // }
        // else {
        //   var insuranceName = riders.insurance_category_type;
        // }
        obj1['from'] = riders.going_to;
        obj1['to'] = riders.leaving_from ;
        if(riders.providertypes_info && riders.providertypes_info.length > 0){
        obj1['mode'] = riders.providertypes_info[0].provider_type; 
        obj1['modes'] = riders.providertypes_info[0].provider_type;
        }
        obj1['trip_type'] = "Return";

        obj['type_of_appointment'] = riders.type_of_appointment;
        //obj['trip_purposes'] = riders.trip_purposes;
        //obj1['provider_name'] = riders.name;
        obj1['provider_name'] = riders.toway_providername;  
        //obj1['date_time'] = riders.date_time;
        obj1['date_time'] = moment(riders.end_date).format('MM-DD-YYYY')+" "+ riders.end_time;
        obj1['trip_visually_impaired'] = riders.blind_visual_impaired;
        //obj1['trip_payment_option'] = riders.tripPaymentTypeName;
        // obj1['permanent_or_temporary_disability'] = riders.permanent_or_temporary_disability;
        // obj1['medicaid_tncare'] = riders.medicaid_tncare;
        // obj1['eligible_for_ada_paratransit'] = riders.eligible_for_ada_paratransit;
        obj1['require_a_wheelchair'] = riders.require_a_wheelchair;
        obj1['motorized_wheelchair'] = riders.motorized_wheelchair;
        //obj1['require_a_wheelchair_lift'] = riders.require_a_wheelchair_lift;
        obj1['folding_wheelchair'] = riders.folding_wheelchair;
        obj1['space_for_stretcher'] = riders.space_for_stretcher;
        obj1['bariatric_stretch_transport'] = riders.bariatric_stretch_transport;
        obj1['space_for_car_seat'] = riders.space_for_car_seat;
        obj1['travel_with_companion'] = riders.travel_with_companion;
        obj1['service_animal'] = riders.service_animal;
        obj1['require_assistance_from_the_driver_exit'] = riders.require_assistance_from_the_driver_exit;
        obj1['door_through_door_assistance'] = riders.door_through_door_assistance;
        //obj1['convert_created_date'] = riders.convert_created_date;
        obj1['convert_created_date'] = moment(riders.convert_created_date).format('MM-DD-YYYY hh:mm a');;
        obj1['require_assistance_from_door'] = riders.require_assistance_from_door;
        // obj1['require_assistance_enter_exit_vehicle'] = riders.require_assistance_enter_exit_vehicle;
        // obj1['require_assistance_to_door'] = riders.require_assistance_to_door;
        // obj1['require_assistance_through_door'] = riders.require_assistance_through_door;
        //obj1['insuranceName'] = insuranceName;
        /*obj['insurance_category_type'] = riders.insurance_category_type;
        obj['otherInsuranceType'] = riders.otherInsuranceType;*/
        // }
        obj1['rider_name'] = riders.rider_name;
        obj1['rider_contactnumber'] = riders.rider_contactnumber;
        obj1['rider_email'] = riders.rider_email;
        obj1['rider_gender'] = riders.rider_gender;
        obj1['year_of_birth'] = riders.year_of_birth;
        obj1['address'] = riders.address;
        obj1['type_of_appointment'] = riders.type_of_appointment;
        // if(riders.trippurposesinfo && riders.trippurposesinfo.length > 0){
        //   obj1['trip_purposes'] = riders.trippurposesinfo[0].trip_purpose;
        //   }
        //   else {
        //     obj1['trip_purposes'] ="";
        //   }
        
      
        if(riders.referralpartnersinfo && riders.referralpartnersinfo.length > 0){
          obj1['referral_partner'] = riders.referralpartnersinfo[0].referral_partner;
          }
          else {
            obj1['referral_partner'] ="";
          }
        // obj1['rider_permanent_or_temporary_disability'] = riders.rider_permanent_or_temporary_disability;
        // obj1['rider_eligible_for_ada_paratransit'] = riders.rider_eligible_for_ada_paratransit;
        // obj1['rider_medicaid_tncare'] = riders.rider_medicaid_tncare;
        obj1['rider_visual_impaired'] = riders.rider_visual_impaired;
        obj1['rider_require_a_wheelchair'] = riders.rider_require_a_wheelchair;
        obj1['rider_motorized_wheelchair'] = riders.rider_motorized_wheelchair;
        //obj1['rider_require_a_wheelchair_lift'] = riders.rider_require_a_wheelchair_lift;
        obj1['rider_folding_wheelchair'] = riders.rider_folding_wheelchair;
        obj1['rider_space_for_stretcher'] = riders.rider_space_for_stretcher;
        obj1['rider_bariatric_stretch_transport'] = riders.rider_bariatric_stretch_transport;
        obj1['rider_space_for_car_seat'] = riders.rider_space_for_car_seat;
        obj1['rider_travel_with_companion'] = riders.rider_travel_with_companion;
        obj1['rider_service_animal'] = riders.rider_service_animal;
        
        /*obj1['rider_require_assistance_from_the_driver_exit'] = riders.rider_require_assistance_from_the_driver_exit;
        obj1['rider_door_through_door_assistance'] = riders.rider_door_through_door_assistance;*/
        obj1['rider_require_assistance_from_door'] = riders.rider_require_assistance_from_door;
        //obj1['rider_require_assistance_enter_exit_vehicle'] = riders.rider_require_assistance_enter_exit_vehicle;
        // obj1['rider_require_assistance_to_door'] = riders.rider_require_assistance_to_door;
        // obj1['rider_require_assistance_through_door'] = riders.rider_require_assistance_through_door;
        obj1['trip_created_by'] = riders.trip_created_by[0];
        obj1['rider_created_by'] = riders.rider_created_by;
        
        data1.push(obj1); 
        fetch(AppConstants.API+'/feedback/getAnswer/'+ riders._id).then(response => response.json())
        .then(data => {
            if(data.status== "success"){
           data.data.map((ans,i)=>{
            var j = -1;
            for(var k=0; k<=this.state.feedbackques.length; k++){
             j++;
             obj1[k] = ans.answers[j];
            }
     
          })
         
        }
          //data1.push(obj);
      })
          }})
   
    }
    ////
  }
    }
    else
    {
      //this.setState({ all_riders_trips: [] });
    }    
  });


  var element = document.getElementById("navItem-dashboard-0");
	element.classList.remove("active");
	if(this.props.auth.user.user_type!='agent'){
		var element = document.getElementById("navItem-Riders-2");
		element.classList.remove("active");
		//var element = document.getElementById("navItem-Agency-2");
		//element.classList.remove("active");
    var element = document.getElementById("navItem-Call Center / Agency-0");
		element.classList.remove("active");
		var element = document.getElementById("navItem-Trip Purposes-0");
		element.classList.remove("active");
		var element = document.getElementById("navItem-Referral Partners-1");
		element.classList.remove("active");
		var element = document.getElementById("navItem-Provider Types-2");
		element.classList.remove("active");
		var element = document.getElementById("navItem-Funding Sources-3");
		element.classList.remove("active");
		//var element = document.getElementById("navItem-Plan a trip-4");
		//element.classList.remove("active");
    var element = document.getElementById("navItem-Contact Us-5");
    element.classList.remove("active");
    var element = document.getElementById("navItem-Saved Trips-3");
    element.classList.remove("active");
    var element = document.getElementById("navItem-Feedback Questions-6");
    element.classList.remove("active");
	}
	//var element = document.getElementById("navItem-Reports-4");
	//element.classList.remove("active");
	if(this.props.auth.user.user_type!='callcenter' && this.props.auth.user.user_type!='report'){
    var element = document.getElementById("navItem-Reports-4");
		element.classList.add("active");
		var element = document.getElementById("navItem-Providers-1");
		element.classList.remove("active");
	}
    
  }
  render() {

    
    return (
      <Page title="All Reports" /*breadcrumbs={[{ name: 'Call Center', active: true }]}*/>
       <ReactTitle title="All Reports"/>
       <ul className="cst-breadcrumb">
        <li><Link to={'/dashboard'}>Home</Link> </li>
        <li> Reports </li>
      </ul>

        <Row>
        <Col md={4}>
          <Card className="p-0">
            <CardHeader>Trips Report</CardHeader>
            <CardBody>
            <span className="glyphicon glyphicon-download"></span>
                <Workbook filename="Riders_Report.xlsx" name="fileDownload" element={<button className="btn btn-info btn-loader"  onClick = {this.handleFileClick}><i className="fa fa-download" aria-hidden="true"></i>  Download Report  <span  style={this.state.loading ? {} : { display: 'none' }} className="image-fill w-5 loader-div "><img src={Loading} alt="No Image" /></span></button>}>
                  <Workbook.Sheet data={data1} name="Sheet A">
                    <Workbook.Column label="From" value="from"/>
                    <Workbook.Column label="To" value="to"/>
                     <Workbook.Column label="Mode" value="mode"/> 
                    <Workbook.Column label="Trip Type" value="trip_type"/>
                    <Workbook.Column label="Type Of Appointment" value="type_of_appointment"/> 
                    <Workbook.Column label="Trip Purpose" value="trip_purposes"/>
                    <Workbook.Column label="Provider Name" value="provider_name"/>
                    <Workbook.Column label="Date & Time" value="date_time"/>
                   
                    <Workbook.Column label="Trip Created By" value="trip_created_by"/>
                    {/* <Workbook.Column label="Do you have a permanent/temporary disability?" value="permanent_or_temporary_disability"/>
                    <Workbook.Column label="Are you eligible for ADA paratransit?" value="eligible_for_ada_paratransit"/>
                    <Workbook.Column label="Do you have Medicaid/TennCare?" value="medicaid_tncare"/> */}
                    <Workbook.Column label="Are you blind or visually impaired?" value="trip_visually_impaired"/>
                    {/* <Workbook.Column label="How will you be paying for this ride?" value="trip_payment_option"/> */}
                  
                    <Workbook.Column label="Do you require a wheelchair?" value="require_a_wheelchair"/>
                    <Workbook.Column label="Do you use a motorized wheelchair (or require wheelchair lift)" value="motorized_wheelchair"/>
                    {/* <Workbook.Column label="Do you require a wheelchair lift?" value="require_a_wheelchair_lift"/> */}
                     <Workbook.Column label="Do you use a folding wheelchair?" value="folding_wheelchair"/> 
                    <Workbook.Column label="Do you need a vehicle that has space for a stretcher?" value="space_for_stretcher"/>
                    <Workbook.Column label="Do you need bariatric stretcher?" value="bariatric_stretch_transport"/> 
                    <Workbook.Column label="Do you need space for a car seat?" value="space_for_car_seat"/>
                    <Workbook.Column label="Do you need to travel with a companion?" value="travel_with_companion"/>
                    <Workbook.Column label="Do you travel with a service animal?" value="service_animal"/> 
                    {/* <Workbook.Column label="Do you require assistance from the driver to exit a vehicle?" value="require_assistance_from_the_driver_exit"/>
                    <Workbook.Column label=" Do you need door to door assistance?" value="door_through_door_assistance"/> */}
                    <Workbook.Column label="Do you need assistance?" value="require_assistance_from_door"/>
                    <Workbook.Column label="Saved Trip Timestamp" value="convert_created_date"/>

                    {/* <Workbook.Column label="Do you need driver assistance from door?" value="require_assistance_from_door"/>
                    <Workbook.Column label="Do you need driver assistance to enter or exit vehicle?" value="require_assistance_enter_exit_vehicle"/>
                    <Workbook.Column label="Do you need driver assistance to door?" value="require_assistance_to_door"/>
                    <Workbook.Column label="Do you need driver assistance through door?" value="require_assistance_through_door"/> */}
                    {/* <Workbook.Column label="Do you have insurance?" value="insuranceName"/> */}
                     <Workbook.Column label="Full Name" value="rider_name"/>
                    <Workbook.Column label="Phone Number" value="rider_contactnumber"/>
                     <Workbook.Column label="Email" value="rider_email"/> 
                    <Workbook.Column label="Gender" value="rider_gender"/>
                    <Workbook.Column label="Date of Birth" value="year_of_birth"/>
                    <Workbook.Column label="Complete Address" value="address"/>
                    <Workbook.Column label="Rider Created By" value="rider_created_by"/>
                    <Workbook.Column label="How did you hear about us?" value="referral_partner"/>
                    {/* <Workbook.Column label="Do you have a permanent/temporary disability?" value="rider_permanent_or_temporary_disability"/>
                     <Workbook.Column label="Are you eligible for ADA paratransit?" value="rider_eligible_for_ada_paratransit"/> 
                    <Workbook.Column label="Do you have Medicaid/TennCare?" value="rider_medicaid_tncare"/> */}
                    <Workbook.Column label="Are you blind or visually impaired?" value="rider_visual_impaired"/>
                    {/* <Workbook.Column label="Do you have insurance?" value="rider_insurance_name"/> */}
                    <Workbook.Column label="Do you require a wheelchair?" value="rider_require_a_wheelchair"/>
                    <Workbook.Column label="Do you use a motorized wheelchair (or require wheelchair lift)" value="rider_motorized_wheelchair"/>
                    {/* <Workbook.Column label="Do you require a wheelchair lift?" value="rider_require_a_wheelchair_lift"/> */}
                    <Workbook.Column label="Do you use a folding wheelchair" value="rider_folding_wheelchair"/>
                     <Workbook.Column label="Do you need a vehicle that has space for a stretcher?" value="rider_space_for_stretcher"/>
                     <Workbook.Column label="Do you need bariatric stretcher?" value="rider_bariatric_stretch_transport"/>  
                    <Workbook.Column label="Do you need space for a car seat?" value="rider_space_for_car_seat"/>
                   
                    <Workbook.Column label="Do you need to travel with a companion?" value="rider_travel_with_companion"/>
                    <Workbook.Column label="Do you travel with a service animal?" value="rider_service_animal"/>
                    {/*<Workbook.Column label="Do you require assistance from the driver to exit a vehicle?" value="rider_require_assistance_from_the_driver_exit"/>
                    <Workbook.Column label="Do you need door to door assistance?" value="rider_door_through_door_assistance"/>*/}
                    <Workbook.Column label="Do you need assistance?" value="rider_require_assistance_from_door"/>
                    {/* <Workbook.Column label="Do you need driver assistance to enter or exit vehicle?" value="rider_require_assistance_enter_exit_vehicle"/>
                    <Workbook.Column label="Do you need driver assistance to door?" value="rider_require_assistance_to_door"/>
                    <Workbook.Column label="Do you need driver assistance through door?" value="rider_require_assistance_through_door"/> */}

                    {/* <Workbook.Column label={ques} value="rider_require_assistance_through_door"/> */}
                   {  
                        this.state.feedbackques.map((ques,j)=>{
                          //new_ans=ans[j];
                         return(<Workbook.Column label={ques} value={j}/>)
                        })
                    } 
                
                  </Workbook.Sheet>
                  {/* <Workbook.Sheet data={data2} name="Another sheet">
                    <Workbook.Column label="Double aaa" value={row => row.aaa * 2}/>
                    <Workbook.Column label="Cubed ccc " value={row => Math.pow(row.ccc, 3)}/>
                  </Workbook.Sheet> */}
                </Workbook>
              
            </CardBody>
          </Card>
        </Col>

        {/* <Col md={4}>
          <Card>
            <CardHeader>Rider Trips</CardHeader>
            <CardBody>
              <Button color="secondary" className="mr-1"><i className="fa fa-download" aria-hidden="true"></i> Download Trips
               <Badge color="secondary"></Badge>
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <CardHeader>Providers</CardHeader>
            <CardBody>
              <Button color="primary" className="mr-1"><i className="fa fa-download" aria-hidden="true"></i> 
               Download Providers 
              </Button>
            </CardBody>
          </Card>
        </Col> */}
      </Row>


       {/* <div className="row text-center" style={{marginTop: '100px'}}>
          <Workbook filename="example.xlsx" name="fileDownload" element={<button className="btn btn-lg btn-primary" onClick = {this.handleFileClick}>Try me!</button>}>
            <Workbook.Sheet data={data1} name="Sheet A">
              <Workbook.Column label="Foo" value="foo"/>
              <Workbook.Column label="Bar" value="bar"/>
              <Workbook.Column label="Baz" value="baz"/>
            </Workbook.Sheet>
            <Workbook.Sheet data={data2} name="Another sheet">
              <Workbook.Column label="Double aaa" value={row => row.aaa * 2}/>
              <Workbook.Column label="Cubed ccc " value={row => Math.pow(row.ccc, 3)}/>
            </Workbook.Sheet>
          </Workbook>
        </div> */}


      </Page>
    );
  }
};
const mapStateToProps = (state) => ({
  auth: state.auth
});
export  default connect(mapStateToProps, {})(Reports);
