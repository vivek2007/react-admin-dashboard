import Page from 'components/Page';
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {
  Card, CardBody, CardHeader, Col, Row, Table, Modal  
} from 'reactstrap';
import {  
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
var loading_val='';
let ques = [];
class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      errMsg: false,
      loading: '',
     feedbackques:[],
     all_ans:[],
     isButtonDisabled: true,
     dataErr:true
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
    data1=[];
    setTimeout(() => {
      this.setState({ isButtonDisabled: false ,dataErr:false})
    }, 25000);
    
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
      
            if(riders.trip_purposes != '' &&  riders.trip_purpose_other == ''){
              var trip_purpose = riders.trip_purposes;
            }
            else if(riders.trip_purpose_other != ''){
              var trip_purpose = riders.trip_purpose_other;
            }
            if(riders.payment_options_arry != null){
              var trip_payment_option = (riders.payment_options_arry).join();
            }
            if(riders.payment_options_arry != null){
              var trip_payment_option = (riders.payment_options_arry).join();
            }
            else if(riders.payment_options_arry != null && (riders.payment_options_arry).length == 0){
              var trip_payment_option = riders.nonmedical_self_pay;
            }
            if(riders.riders_payment_options_arry != null && riders.rider_health_insurance == "Yes"){
              var rider_insurance_name = (riders.riders_payment_options_arry).join();
            }
            else if(riders.riders_payment_options_arry != null && riders.rider_health_insurance == "No"){
              var rider_insurance_name = riders.rider_health_insurance;
            }
            
            //var tripPaymentTypeName = (riders.tripPaymentTypeName).join();
            // if(riders.rider_health_insurance == "Yes"){
            //   var rider_insurance_name = (riders.rider_tripPaymentType).join();
            // }
            // else if(riders.rider_health_insurance == "No"){
            //   var rider_insurance_name = riders.rider_health_insurance;
            // }
            obj['from'] = riders.leaving_from;
            obj['to'] = riders.going_to;
            if(riders.providertypes_info && riders.providertypes_info.length > 1){
            obj['mode'] = riders.providertypes_info[1].provider_type;
            obj['modes'] = riders.providertypes_info[1].provider_type;
            }
            else{
              obj['mode'] = riders.provider_type;
              obj['modes'] = riders.provider_type;
            }
            obj['trip_type'] = "Onward";            
            obj['type_of_appointment'] = riders.type_of_appointment;
            obj['trip_purposes'] = trip_purpose;
            obj['provider_name'] = riders.name;
            obj['date_time'] = riders.date_time;            
            obj['eligible_for_ada_paratransit'] = riders.eligible_for_ada_paratransit;
            obj['convert_created_date'] = moment(riders.convert_created_date).format('MM-DD-YYYY hh:mm a');          
            obj['trip_visually_impaired'] = riders.blind_visual_impaired;
            obj['trip_payment_option'] = trip_payment_option;
            obj['require_a_wheelchair'] = riders.require_a_wheelchair;
            obj['motorized_wheelchair'] = riders.motorized_wheelchair;
            obj['folding_wheelchair'] = riders.folding_wheelchair;
            obj['space_for_stretcher'] = riders.space_for_stretcher;
            obj['bariatric_stretch_transport'] = riders.bariatric_stretch_transport;
            obj['space_for_car_seat'] = riders.space_for_car_seat;
            obj['travel_with_companion'] = riders.travel_with_companion;
            obj['service_animal'] = riders.service_animal;
            obj['require_assistance_from_the_driver_exit'] = riders.require_assistance_from_the_driver_exit;
            obj['door_through_door_assistance'] = riders.door_through_door_assistance;           
            obj['require_assistance_from_door'] = riders.require_assistance_from_door;           
            obj['rider_name'] = riders.rider_name;
            obj['rider_contactnumber'] = riders.rider_contactnumber;
            obj['rider_email'] = riders.rider_email;
            obj['rider_gender'] = riders.rider_gender;
            obj['year_of_birth'] = riders.year_of_birth;
            obj['address'] = riders.address;            
            if(riders.referralpartnersinfo && riders.referralpartnersinfo.length > 0){
            obj['referral_partner'] = riders.referralpartnersinfo[0].referral_partner;
            }
            else {
              obj['referral_partner'] ="";
            }        
            obj['rider_visual_impaired'] = riders.rider_visual_impaired;
            obj['rider_insurance_name'] = rider_insurance_name;
            obj['rider_require_a_wheelchair'] = riders.rider_require_a_wheelchair;
            obj['rider_motorized_wheelchair'] = riders.rider_motorized_wheelchair;
            obj['rider_folding_wheelchair'] = riders.rider_folding_wheelchair;
            obj['rider_space_for_stretcher'] = riders.rider_space_for_stretcher;
            obj['rider_bariatric_stretch_transport'] = riders.rider_bariatric_stretch_transport;
            obj['rider_space_for_car_seat'] = riders.rider_space_for_car_seat;
            obj['rider_travel_with_companion'] = riders.rider_travel_with_companion;
            obj['rider_service_animal'] = riders.rider_service_animal;           
            obj['rider_require_assistance_from_door'] = riders.rider_require_assistance_from_door;           
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
        
        if(riders.trip_option == 'round-trip')
        { var obj1={};
       
        if(riders.trip_purposes != '' &&  riders.trip_purpose_other == ''){
          var trip_purpose = riders.trip_purposes;
        }
        else if(riders.trip_purpose_other == ''){
          var trip_purpose = riders.trip_purpose_other;
        }
        //var tripPaymentTypeName = (riders.tripPaymentTypeName).join();

        // if(riders.rider_health_insurance == "Yes"){
        //   var rider_insurance_name = (riders.rider_tripPaymentType).join();
        // }
        // else if(riders.rider_health_insurance == "No"){
        //   var rider_insurance_name = riders.rider_health_insurance;
        // }
        if(riders.payment_options_arry != null && (riders.payment_options_arry).length > 0){
          var trip_payment_option = (riders.payment_options_arry).join();
        }
        else if(riders.payment_options_arry != null && (riders.payment_options_arry).length == 0){
          var trip_payment_option = riders.nonmedical_self_pay;
        }
        if(riders.riders_payment_options_arry != null && riders.rider_health_insurance == "Yes"){
          var rider_insurance_name = (riders.riders_payment_options_arry).join();
        }
        else if(riders.riders_payment_options_arry != null && riders.rider_health_insurance == "No"){
          var rider_insurance_name = riders.rider_health_insurance;
        }

        
        obj1['from'] = riders.going_to;
        obj1['to'] = riders.leaving_from ;
        if(riders.providertypes_info && riders.providertypes_info.length > 0){
        obj1['mode'] = riders.providertypes_info[0].provider_type; 
        obj1['modes'] = riders.providertypes_info[0].provider_type;
        }
        obj1['trip_type'] = "Return";
        obj1['type_of_appointment'] = riders.type_of_appointment;
        obj1['trip_purposes'] = trip_purpose;
        obj1['provider_name'] = riders.toway_providername;  
        obj1['date_time'] = moment(riders.end_date).format('MM-DD-YYYY')+" "+ riders.end_time;
        obj1['trip_visually_impaired'] = riders.blind_visual_impaired;
        obj1['trip_payment_option'] = trip_payment_option;
        obj1['require_a_wheelchair'] = riders.require_a_wheelchair;
        obj1['motorized_wheelchair'] = riders.motorized_wheelchair;
        obj1['folding_wheelchair'] = riders.folding_wheelchair;
        obj1['space_for_stretcher'] = riders.space_for_stretcher;
        obj1['bariatric_stretch_transport'] = riders.bariatric_stretch_transport;
        obj1['space_for_car_seat'] = riders.space_for_car_seat;
        obj1['travel_with_companion'] = riders.travel_with_companion;
        obj1['service_animal'] = riders.service_animal;
        obj1['require_assistance_from_the_driver_exit'] = riders.require_assistance_from_the_driver_exit;
        obj1['door_through_door_assistance'] = riders.door_through_door_assistance;
        obj1['convert_created_date'] = moment(riders.convert_created_date).format('MM-DD-YYYY hh:mm a');;
        obj1['require_assistance_from_door'] = riders.require_assistance_from_door;        
        obj1['rider_name'] = riders.rider_name;
        obj1['rider_contactnumber'] = riders.rider_contactnumber;
        obj1['rider_email'] = riders.rider_email;
        obj1['rider_gender'] = riders.rider_gender;
        obj1['year_of_birth'] = riders.year_of_birth;
        obj1['address'] = riders.address;
       
      

        
        if(riders.referralpartnersinfo && riders.referralpartnersinfo.length > 0){
          obj1['referral_partner'] = riders.referralpartnersinfo[0].referral_partner;
        }
        else {
          obj1['referral_partner'] ="";
        }        
        obj1['rider_visual_impaired'] = riders.rider_visual_impaired;
        obj1['rider_insurance_name'] = rider_insurance_name;
        obj1['rider_require_a_wheelchair'] = riders.rider_require_a_wheelchair;
        obj1['rider_motorized_wheelchair'] = riders.rider_motorized_wheelchair;
        obj1['rider_folding_wheelchair'] = riders.rider_folding_wheelchair;
        obj1['rider_space_for_stretcher'] = riders.rider_space_for_stretcher;
        obj1['rider_bariatric_stretch_transport'] = riders.rider_bariatric_stretch_transport;
        obj1['rider_space_for_car_seat'] = riders.rider_space_for_car_seat;
        obj1['rider_travel_with_companion'] = riders.rider_travel_with_companion;
        obj1['rider_service_animal'] = riders.rider_service_animal;      
        obj1['rider_require_assistance_from_door'] = riders.rider_require_assistance_from_door;     
        obj1['trip_created_by'] = riders.trip_created_by[0];
        obj1['rider_created_by'] = riders.rider_created_by;
        
        data1.push(obj1); 
        fetch(AppConstants.API+'/feedback/getAnswer/'+ riders._id).then(response => response.json())
        .then(data => {
            if(data.status== "success"){
           data.data.map((ans,i)=>{
            
            var j = -1;
            for(var k=0; k<=this.state.feedbackques.length; k++){
              console.log("j",j,"k",k)
             j++;
             obj1[k] = ans.answers[j];
            }
     
          })
         
        }
      })
          }})

         
   
    }
  }
 // this.setState({ isButtonDisabled: false ,dataErr:false})
    }
    else
    {
    }    
  });


  var element;
  element = document.getElementById("navItem-dashboard-0");
	element.classList.remove("active");
	if(this.props.auth.user.user_type!='agent'){
		element = document.getElementById("navItem-Riders-2");
		  element.classList.remove("active");
    element = document.getElementById("navItem-Call Center / Agency-0");
		  element.classList.remove("active");
		element = document.getElementById("navItem-Trip Purposes-0");
		  element.classList.remove("active");
		element = document.getElementById("navItem-Referral Partners-1");
		  element.classList.remove("active");
		element = document.getElementById("navItem-Provider Types-2");
		  element.classList.remove("active");
		element = document.getElementById("navItem-Funding Sources-3");
		  element.classList.remove("active");
    element = document.getElementById("navItem-Contact Us-5");
      element.classList.remove("active");
    element = document.getElementById("navItem-Saved Trips-3");
      element.classList.remove("active");
    element = document.getElementById("navItem-Feedback Questions-6");
      element.classList.remove("active");
	}
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
                <Workbook filename="Riders_Report.xlsx" name="fileDownload" element={<button className={this.state.dataErr ? "btn btn-default btn-loader" : "btn btn-info btn-loader"}  onClick = {this.handleFileClick} disabled={this.state.isButtonDisabled}><i className="fa fa-download" aria-hidden="true"></i>  Download Report  <span  style={this.state.loading ? {} : { display: 'none' }} className="image-fill w-5 loader-div "><img src={Loading} alt="No Image" /></span></button>}>
                  <Workbook.Sheet data={data1} name="Sheet A">
                    <Workbook.Column label="From" value="from"/>
                    <Workbook.Column label="To" value="to"/>
                     <Workbook.Column label="Provider Type" value="mode"/> 
                    <Workbook.Column label="Trip Type" value="trip_type"/>
                    <Workbook.Column label="Type Of Appointment" value="type_of_appointment"/> 
                    <Workbook.Column label="Trip Purpose" value="trip_purposes"/>
                    <Workbook.Column label="Provider Name" value="provider_name"/>
                    <Workbook.Column label="Date & Time" value="date_time"/>                   
                    <Workbook.Column label="Trip Created By" value="trip_created_by"/> 
                    <Workbook.Column label="How will you be paying for this ride?" value="trip_payment_option"/>         
                    <Workbook.Column label="Are you blind or visually impaired?" value="trip_visually_impaired"/>         
                    <Workbook.Column label="Do you require a wheelchair?" value="require_a_wheelchair"/>
                    <Workbook.Column label="Do you use a motorized wheelchair (or require wheelchair lift)" value="motorized_wheelchair"/>
                     <Workbook.Column label="Do you use a folding wheelchair?" value="folding_wheelchair"/> 
                    <Workbook.Column label="Do you need a vehicle that has space for a stretcher?" value="space_for_stretcher"/>
                    <Workbook.Column label="Do you need bariatric stretcher?" value="bariatric_stretch_transport"/> 
                    <Workbook.Column label="Do you need space for a car seat?" value="space_for_car_seat"/>
                    <Workbook.Column label="Do you need to travel with a companion?" value="travel_with_companion"/>
                    <Workbook.Column label="Do you travel with a service animal?" value="service_animal"/>                
                    <Workbook.Column label="Do you need assistance?" value="require_assistance_from_door"/>
                    <Workbook.Column label="Saved Trip Timestamp" value="convert_created_date"/>
                     <Workbook.Column label="Full Name" value="rider_name"/>
                    <Workbook.Column label="Phone Number" value="rider_contactnumber"/>
                     <Workbook.Column label="Email" value="rider_email"/> 
                    <Workbook.Column label="Gender" value="rider_gender"/>
                    <Workbook.Column label="Date of Birth" value="year_of_birth"/>
                    <Workbook.Column label="Complete Address" value="address"/>
                    <Workbook.Column label="Rider Created By" value="rider_created_by"/>
                    <Workbook.Column label="How did you hear about us?" value="referral_partner"/>
                    <Workbook.Column label="Do you have insurance?" value="rider_insurance_name"/>                   
                    <Workbook.Column label="Are you blind or visually impaired?" value="rider_visual_impaired"/>        
                    <Workbook.Column label="Do you require a wheelchair?" value="rider_require_a_wheelchair"/>
                    <Workbook.Column label="Do you use a motorized wheelchair (or require wheelchair lift)" value="rider_motorized_wheelchair"/>
                    <Workbook.Column label="Do you use a folding wheelchair" value="rider_folding_wheelchair"/>
                    <Workbook.Column label="Do you need a vehicle that has space for a stretcher?" value="rider_space_for_stretcher"/>
                    <Workbook.Column label="Do you need bariatric stretcher?" value="rider_bariatric_stretch_transport"/> 
                    <Workbook.Column label="Do you need space for a car seat?" value="rider_space_for_car_seat"/>         
                    <Workbook.Column label="Do you need to travel with a companion?" value="rider_travel_with_companion"/>
                    <Workbook.Column label="Do you travel with a service animal?" value="rider_service_animal"/>          
                    <Workbook.Column label="Do you need assistance?" value="rider_require_assistance_from_door"/>      

                   {  
                        this.state.feedbackques.map((ques,j)=>{
                         return(<Workbook.Column label={ques} value={j}/>)
                        })
                    } 
                
                  </Workbook.Sheet>
                  
                </Workbook>
                {this.state.dataErr ? <span className="error">Please wait while loading data...</span>:null}
            </CardBody>
            
          </Card>
        </Col>
      </Row>


     


      </Page>
    );
  }
};
const mapStateToProps = (state) => ({
  auth: state.auth
});
export  default connect(mapStateToProps, {})(Reports);