import React from 'react';
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
  FormFeedback, TabContent, TabPane, Nav, NavItem, NavLink, CardTitle, CardText,Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import Page from 'components/Page';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import AppConstants from 'AppConstants';
import classnames from 'classnames';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { BootstrapTable, TableHeaderColumn, InsertButton,UncontrolledTooltip } from 'react-bootstrap-table';
//import { Container,  Col, Form, FormGroup, Label, Input,  Button, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import {
  MdCreate,
  MdDelete,
  MdRemoveRedEye, MdAdd
} from 'react-icons/md';
import placeholderimg from '../assets/img/placeholder.png';
import {ReactTitle} from 'react-meta-tags';
import Rating from 'react-rating';

var modes_arr=[];
let ques=[];
class ViewRiderProfile extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      _id: this.props.auth.user._id,
      activeTab: '1',    
      firstname: '',
      lastname: '',
      fullname: '',
      phone: '',
      email: '',
      profile_img: '',
      prev_logo: '',
      view_logo: '',
      old_img: '',
      address: '',
      errMsg: '',
      state: '',
      zipcode: '',
      city: '',
      status: '',
	    year_of_birth:'',
	    authorized_user_name:'',
      authorized_contact_number:'',
	    referral_partner_other:'',
      referral_partners:'',
      referral_partner:[],  
      SavedTrips: true,
      SavedComments: false,
      accommodate_folding_wheelchair:'',
      // permanent_or_temporary_disability:'',
      // eligible_for_ada_paratransit:'',
      medicaid_tncare:'',
      require_a_wheelchair:'',
      motorized_wheelchair:'',
      //require_a_wheelchair_lift:'',
      space_for_stretcher_name:'',
      space_for_car_seat:'',
      travel_with_companion:'',
      service_animal:'',
      bariatric_stretch_transport:'',
      //require_assistance_from_the_driver_exit:'',
      //door_through_door_assistance:'',
      savedTripes: [],
      feedback:'',
      takencount:[],
      nottakencount:[],
      modal: false,
      modal_show:false,
      modal_show1:false,
      takenshow:true,
      nottakenshow:false,
      call_id:'',
      provider_id:'',
      rider_id:'',
      rider_ride_status:'',
      rider_response:'',
      riderfb:false,
      rider_feedback_for_provider:'',
      comment:'',
      errors: {},
      errMsg:false,
      save_trip_id:'',
      default_options:'',
      //rider_ride_status_hide:false,
      rider_ride_status_hide:false, 
      all:[],
      comment_hide:true,
      comment_trip:false,
      yourself:'',
      appropriate:'',
      expected:'',
      satisfied:'',
      recommend:'',
      provide_any_comment:'',
      provider_type:[],
      modeother:false,
      modes:'',
      mode_other:'',
      about_MEce:'',
      about_MEce_hide:false,
      feedback_status_re:'',
      comment_re:'',
      about_MEce_re:'',
      about_MEce_hide:false,
      rider_ride_status_re:'',
      yourself_re:'',
      appropriate_re:'',
      expected_re:'',
      satisfied_re:'',
      recommend_re:'',
      provide_any_comment_re:'',
      modes_re:'',
      mode_other_re:'',
      rider_response_re:'',
      rating:'',
      trip_option:'',
      to_mode:'',
      to_mode_other:'',

      ride_cost:'',
      affordable:'',
      affordable_re:'',
      return_ride_cost:'',
      onward_mode:'',
      return_mode:'',
      blind_visual_impaired:'',
      require_assistance_from_door:'',
      other_assistance:'',
      // require_assistance_enter_exit_vehicle:'',
      // require_assistance_to_door:'',
      // require_assistance_through_door:'',
      insurance : '',
      question_hide:false,
      sec_ques : '',

      riderTrips: [],
      totalRiderTrips: 0,
      sizePerPage: 10,
      currentPage: 1,
      sortName: '',
      sortOrder: '',
      searchText: '',
      ques:[],
			active:false,
			active1:false,
			active3:false,
			questions:[],
      answers:[],
      values:[],
      names:[],
      feedback:[],
      ratingque:'',
      active4:false,
      responeData : 'allTrips',
      all:'active',nottaken:'inactive',taken:'inactive',noresponse:'inactive',
      medDivHide: 0,
			tnDivHide: 0
      
      
      
    }
    this.inputChangedHandlerContact = this.inputChangedHandlerContact.bind(this);
    this.format = this.format.bind(this);
    this.SavedTrips = this.SavedTrips.bind(this);
    this.SavedComments = this.SavedComments.bind(this);
    this.Signout = this.Signout.bind(this);
    this.riderFeedbackShow = this.riderFeedbackShow.bind(this);
    this.riderFeedback = this.riderFeedback.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeFeedback = this.handleChangeFeedback.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle1 = this.toggle1.bind(this);
    this.toggle3 = this.toggle3.bind(this);

    //this.handleChangeAbout = this.handleChangeAbout.bind(this);
    this.riderFeedbackShow1 = this.riderFeedbackShow1.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this); 

    this.onPageChange = this.onPageChange.bind(this);
    this.onSizePerPageList = this.onSizePerPageList.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderShowsTotal = this.renderShowsTotal.bind(this); 
    this.handleQuestionChange=this.handleQuestionChange.bind(this);

  }
  renderShowsTotal(start, to, paginationShowsTotal) {
    return (
    <p >
       Showing rows { start } to { to } of { paginationShowsTotal }
    </p>
    );
  }
  
  handleRatingChange(name,rating) {
    this.setState({rating: rating,ratingque:name});
    }
  handleQuestionChange = idx => e => {
  
    if(e.target.id=="5d2dd5d6baa20306f8fb5812"){
      this.setState({active2:false})
    }
    if(e.target.id=="5d2dd694baa20306f8fb5813"){
      this.setState({active3:false})
    }
    const {name,value}=e.target;
    const values = [...this.state.values];
      values[idx]=e.target.value
    const  names = [...this.state.names]
      names[idx]=e.target.name
    if(e.target.value==="No Response"){
      this.setState({active:false,values:[values[0],values[2]],names:[names[0],names[2]]})
    }
    if(e.target.value!=="No Response"){
      this.setState({values,names})
    }
      if(e.target.value==="Yes"){
      this.setState({active:true})
    }
    // if(e.target.value==="Not Taken"){
    //   this.setState({active1:false})
    // }
    // else if(e.target.value==="Taken"){
    //   this.setState({active1:true})
    // }
     this.setState({[e.target.name]:e.target.value})
    };
  // handleChangeAbout(e){
  //   //alert(e.target.value);
  //   if(e.target.value=='yes'){

  //     this.setState({
  //       [e.target.name]: e.target.value,about_MEce_hide:true
  //     });
  //   }else{
  //     this.setState({
  //       [e.target.name]: e.target.value,about_MEce_hide:false
  //     });

  //   }
    

  // }

  Signout(e) {
    e.preventDefault();    
    this.props.history.push('/riderlogin');
  }


  onSizePerPageList(sizePerPage) {
    let page = 1;
    this.getRiderTrips(page, sizePerPage, this.state.sortName, this.state.sortOrder, this.state.searchText, this.state.responeData);
  }
  onPageChange(page, sizePerPage) {
    this.getRiderTrips(page, sizePerPage, this.state.sortName, this.state.sortOrder, this.state.searchText, this.state.responeData);
  }
  onSortChange(sortName, sortOrder) {   
     let page = 1;   
     let sizePerPage = 10;
     this.getRiderTrips(page, sizePerPage, sortName, sortOrder, this.state.searchText, this.state.responeData);
  }
  onSearchChange(searchText, colInfos, multiColumnSearch) { 
    let sizePerPage = 10;     
     let page = 1;
     this.getRiderTrips(page, sizePerPage, this.state.sortName, this.state.sortOrder, searchText, this.state.responeData);
  }

  handleChangeType(e){
    if(e.target.value=='Other'){
       this.setState({modeother: true});
     }else{
       this.setState({modeother: false});
     }
     this.setState({
          [e.target.name]: e.target.value
      });
   }
  handleChangeInput(e){


     
  if(e.target.value == "yes")
  this.setState({default_options : ""});
  else
  this.setState({default_options :1});
    if(e.target.value=='yes'){
      this.setState({rider_ride_status_hide: true});
    }else{
      this.setState({rider_ride_status_hide: false});
    }
   this.setState({
         [e.target.name]: e.target.value
     });
  }


  handleInputChange(e) {
    if(e.target.id === 'all'){
      this.setState({all:'active',nottaken:'inactive',taken:'inactive',noresponse:'inactive'})
    }else if(e.target.id === 'taken' ){
      this.setState({all:'inactive',nottaken:'inactive',taken:'active',noresponse:'inactive'})
    }else if(e.target.id === 'nottaken' ){
      this.setState({all:'inactive',nottaken:'active',taken:'inactive',noresponse:'inactive'})
    }else if(e.target.id === 'noresponse' ){
      this.setState({all:'inactive',nottaken:'inactive',taken:'inactive',noresponse:'active'})
    }
    let riderTabelFileterData = {
      page: 1,
      sizeperpage: 10,
      sortname: '',
      sortorder: '',
      serchtext: this.state.searchText,
      defaultSearchText: '',
      id: this.props.match.params.id,
      responeData :  e.target.id    
    };
    this.setState({ page: riderTabelFileterData.page, sizePerPage: riderTabelFileterData.sizeperpage, sortName: riderTabelFileterData.sortname, sortOrder: riderTabelFileterData.sortorder, searchText: riderTabelFileterData.serchtext, responeData: riderTabelFileterData.responeData });
    this.getRiderSavedTrips(riderTabelFileterData,riderTabelFileterData.page,riderTabelFileterData.sizeperpage,riderTabelFileterData.sortname,riderTabelFileterData.sortorder,riderTabelFileterData.serchtext);

    this.setState({
          [e.target.name]: e.target.value
    }); 
  }
  
  getRiderSavedTrips(riderTabelFileterData) {
    axios.post(AppConstants.API+'/getRiderSavedTrips', riderTabelFileterData)
        .then(res => {
          if(res.data.Status === "Success") {
            this.setState({
              riderTrips: res.data.data,
              currentPage: riderTabelFileterData.page,
              sizePerPage: riderTabelFileterData.sizePerPage,
              sortName: riderTabelFileterData.sortName,
              sortOrder: riderTabelFileterData.sortOrder,
              serchtext: riderTabelFileterData.searchText,
              defaultSearchText: riderTabelFileterData.searchText
            });
          }
        });
        axios.post(AppConstants.API+'/getRiderSavedTripsCount', riderTabelFileterData).then(res => {
          if (res.data.Status === 'Success') {
            this.setState({
              totalRiderTrips: res.data.data,
              serchText: riderTabelFileterData.searchText,
              defaultSearchText: riderTabelFileterData.searchText
            });
          }         
       });
  }

  SavedTrips() {
    this.setState({ SavedTrips: true, SavedComments: false });
  }
  SavedComments() {
    this.setState({ SavedComments: true, SavedTrips: false });
  }
  inputChangedHandlerContact = (values) => {
    this.setState({
      phone: values.value,
    });
  }
  DeleteRider = params => e => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this Rider?")) {
      const riderdeletedata = {
        id: params
      }
      axios.post(AppConstants.API + '/rider/deleteRider', riderdeletedata)
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
            fetch(AppConstants.API + '/getAllriders').then(response => response.json())
              .then(data => {
                if (data.status == "Success") {
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
  };

  handleChange (e){
  if(e.target.name =='comment' && this.state.rider_response == "noresponse") {
    this.setState({default_options :1});
  }

  if(e.target.value=='nottaken'){
    this.setState({question_hide:false});
  }else if(e.target.value=='taken'){
    this.setState({question_hide:true});
  }
    //alert(e.target.value);
    // if(e.target.value=='taken'){
    //   this.setState({riderfb: true,comment_hide:false,comment_trip:true});
    // }else if((e.target.value=='nottaken' || e.target.value=='noresponse')){
    //   this.setState({riderfb: false,comment_trip:false,comment_hide:true});
    // }
    this.setState({
         [e.target.name]: e.target.value
     }); 
  }  
  handleChangeFeedback(e){
    this.setState({
          [e.target.name]: e.target.value
      });    
  }
  handleSubmit = event => {
    event.preventDefault();
    // var modes;
    // var to_mode;   
    
    if(this.state.Comment){
      let values = this.state.values;
      values[2] = this.state.Comment;
    }
  
     if(this.state.rating){
     let names =  this.state.names;
     names[13] = this.state.ratingque;
     let values = this.state.values;
     values[13] = this.state.rating;
     }
   
     if(this.handleValidation()){
    const feedbackdetails = {
      questions:this.state.names,
      answers:this.state.values,
      login_id:this.state.call_id,
      provider_id:this.state.provider_id,
      rider_id:this.state.rider_id,
      save_trip_id:this.state.save_trip_id,
      }
        axios.post(AppConstants.API+'/feedback/addAnswer',feedbackdetails)
        .then(res => {   
         if(res.data.status == "success"){
          setTimeout((e) => {
           //Router.push('/dashboard');
        window.location.reload();
            this.setState({
             modal: !this.state.modal
            });
          }, 2000); 
  
          this.setState({
          errMsg: "Rider feedback submitted successfully"
          });
  
          setTimeout(() => {
          this.setState({
            errMsg: false,
          });
          }, 1000);
  
        }
        else{
          this.setState({
          errMsg: res.data.msg
          });
        }
        });
        
        
       }
       
     } 
     handleValidation(){
      let errors = {};
      let formIsValid = true;
      if(this.state.modal){
      
      if(this.state.names.length==0){
        if(this.state.names[2]==undefined){
        formIsValid = false;
        errors["comment1"] = "Please add comment";
      }
      }
      if(!this.state.values[0]){
        formIsValid = false;
        this.setState({active2:true})
      }
      if(this.state.values[0]=="Yes"){
        if(this.state.names[1]==undefined){ 
        this.setState({active3:true})
        formIsValid = false;
        errors["question2"] = "Please select an option";
        }
        if(this.state.names[2]==undefined){
        formIsValid = false;
        errors["comment1"] = "Please add comment";
        }
      }
      
      if(this.state.values[0]=="No Response"){
        if(this.state.names.length>=3){
          if(this.state.names[2]==undefined){
          formIsValid = false;
          errors["comment1"] = "Please add comment";
          }
        }
        else{
          if(this.state.names[1]==undefined){
          formIsValid = false;
          errors["comment1"] = "Please add comment";
          }
        }
        }
      }
      if(this.state.modal_show1){
        if(this.state.values[0]=="Yes"){
          if(this.state.values[1]==undefined || this.state.names[1]==undefined){ 
          
          this.setState({active4:true})
          formIsValid = false;
          errors["question4"] = "Please select an option";
          }
        }
        }
       this.setState({errors: errors});
      return formIsValid;
      }

      riderFeedback (event,pro_id,riderid,save_id,category,trip_option) {
        fetch(AppConstants.API+'/feedback/getAllActiveQuestions').then(response => response.json())
        .then(data => {
          if(data.status== "success"){
          this.setState({feedback:data.data})
          }
          else{
          this.setState({feedback:[]})
          }
        }); 
        
        fetch(AppConstants.API+'/getallSavedTripDetails/'+save_id).then(response => response.json())
        .then(data => {
          if(data.data.providertypes_info && data.data.providertypes_info.length > 1){
          var onward_mode   = data.data.providertypes_info[1]._id;
          }else{
            var onward_mode    = data.data.providertypes_info[0]._id;
          }
          if(data.data.providertypes_info && data.data.providertypes_info.length > 0){
          var return_mode  = data.data.providertypes_info[0]._id; 
          }    
          if(modes_arr.indexOf( onward_mode[0] ) !== -1){
          onward_mode = onward_mode[0];
          }else{
          onward_mode ="other"
          }
          if(modes_arr.indexOf( return_mode[0] ) !== -1){
          return_mode=return_mode[0]
          }else{
          return_mode ="other"
          }
          this.setState({
          onward_mode:onward_mode,
          return_mode:return_mode      
          });
        })
          this.setState({
            modal: !this.state.modal,provider_id:pro_id,rider_id:riderid,save_trip_id:save_id,modes:category,trip_option :trip_option
            });
          event.preventDefault();
        };
        
        riderFeedbackShow1 (event,pro_id,riderid,saved_id,category,trip_option){
        // var modes;
        // var to_mode;
        event.preventDefault();
        fetch(AppConstants.API+'/feedback/getAnswer/'+saved_id).then(response => response.json())
        .then(data => {
          if(data.status == "success") {
            this.setState({
            //questions:data.data[0].questions,
            answers:data.data[0].answers,
            checked:data.data[0].answers[0],
            Comment:data.data[0].answers[2]
            })     
          }     
        })
        
        fetch(AppConstants.API+'/getallSavedTripDetails/'+saved_id).then(response => response.json())
        .then(data => {  
          if(data.data.providertypes_info && data.data.providertypes_info.length > 1){
          var onward_mode   = data.data.providertypes_info[1]._id;
          }else{
            var onward_mode    = data.data.providertypes_info[0]._id;
          }
        
          if(data.data.providertypes_info && data.data.providertypes_info.length > 0){
          var return_mode  = data.data.providertypes_info[0]._id; 
          }   
        
          if(modes_arr.indexOf( onward_mode[0] ) !== -1){
          onward_mode = onward_mode[0];
          }else{
          onward_mode ="other"
          }
             
          if(modes_arr.indexOf( return_mode[0] ) !== -1){
          return_mode=return_mode[0]
          }else{
          return_mode ="other"
          }
         
          this.setState({
          onward_mode:onward_mode,
          return_mode:return_mode      
          });
        })
        
        this.setState({
          modal_show1: !this.state.modal_show1,provider_id:pro_id,rider_id:riderid,save_trip_id:saved_id,modes:category,
          trip_option:trip_option
          });
          event.preventDefault();
        };
        
        
        riderFeedbackShow (event,saved_id,trip_option){
        // var modes;
        // var to_mode;
        fetch(AppConstants.API+'/feedback/getAllActiveQuestions').then(response => response.json())
        .then(data => {
          if(data.status== "success"){
          this.setState({feedback:data.data})
          }
          else{
          this.setState({feedback:[]})
          }
        }); 
        fetch(AppConstants.API+'/feedback/getAnswer/'+saved_id).then(response => response.json())
        .then(data => {
          if(data.status == "success")
          {
            this.setState({
            questions:data.data[0].questions,
            answers:data.data[0].answers,
            rating:data.data[0].rating
            })
          }
        })
        
        this.setState({
          modal_show: !this.state.modal_show,trip_option:trip_option
          });
          event.preventDefault();
        };
         toggle2() {
          this.setState({
          modal: !this.state.modal,default_options :1,values:[],errors:'',active:false,active2:false
          });
        }
        toggle1() {
          this.setState({
          modal_show: !this.state.modal_show,rating:""
          });
        }
        toggle3() {
        this.setState({
          modal_show1: !this.state.modal_show1,rider_ride_status_hide:'', comment : '', rider_response : '', errors : ''
        });
        }
  format(cell, row) {
  
    if(row.feedback_status=='taken'){
			var fd= <a   onClick={(e) =>{this.riderFeedbackShow(e, row._id,row.trip_option)}}  className="fd-taken"></a>
		  } else if(row.feedback_status =='nottaken' && row.rider_status == "noresponse"){
			this.state.default_options = 1;
			var fd= <a onClick={(e) =>{this.riderFeedbackShow1(e,row.provider_id,row.rider_id,row._id,row.category,row.trip_option)}} className="fb-n0-respons"></a>        
		  } else if(row.feedback_status =='nottaken' && row.rider_status == ""){
			this.state.default_options = "";
		   
			var fd= <a onClick={(e) =>{this.riderFeedback(e, row.provider_id,row.rider_id,row._id,row.category,row.trip_option)}}   className="fd-nt-taken"></a>
				 
		  }
		  else{ 
			this.state.default_options = "";
			var fd= <a onClick={(e) =>{this.riderFeedback(e, row.provider_id,row.rider_id,row._id,row.category)}}   className="fd-nt-taken"></a>
		  }
   
    return <div className="ca-controls">{fd}<Link style={{ 'fontSize': 12 }}  to={"/ViewSavedTrips/" + row._id} title="View Rider"><button className="btn btn-success">View</button></Link></div>;
  }

  createCustomInsertButton = (onClick) => {
    return (
      <span> </span>
    );
  }

  GetFormattedDate(viewDate) {
    

    var  date= new Date(viewDate);  

    var contime = (date.getMonth()+1) + "-" + date.getDate() + "-" + date.getFullYear();

    return contime;

  }

  componentDidMount() {
    const that = this; 
    fetch(AppConstants.API+'/feedback/getAllActiveQuestions').then(response => response.json())
    .then(data => {
      if(data.status== "success"){
        this.setState({feedback:data.data})
        {data.data.map((ques1,index)=>{            
          ques.push(ques1.question)
          this.setState({ques:ques})
          })
        }
      }else {
        this.setState({feedback:[]})
      }
    }); 
    var element = document.getElementById("navItem-Call Center / Agency-0");
    element.classList.add("active")
    fetch(AppConstants.API+'/rider/viewRider/'+this.props.match.params.id).then(response => response.json())
       .then(data => {
      
       if(data.Status == "Success")
       {
          var vDate = '';
          if(data.data.year_of_birth && data.data.year_of_birth!="" && data.data.year_of_birth!="Invalid date" && data.data.year_of_birth!="undefined"){
            var vDate = this.GetFormattedDate(data.data.year_of_birth);
          } 
          var referral_partners;
          if(data.data.referral_partners && data.data.referral_partners != '' && data.data.referral_partner_other == ""){
            referral_partners = data.data.referral_partners;
          }
          else if(data.data.referral_partners && data.data.referral_partners != '' && data.data.referral_partner_other != ""){
            referral_partners = data.data.referral_partner_other;
          }
          /*if(data.data.health_insurance && data.data.health_insurance == "Yes" && data.data.insurance_category_type_name
				&& data.data.insurance_category_type_name
				!= ''){
					var insurance_category_type = data.data.insurance_category_type_name
					;
				}
				else if(data.data.health_insurance && data.data.health_insurance == "Yes" && data.data.otherInsuranceType && data.data.otherInsuranceType != ''){
					var insurance_category_type = data.data.otherInsuranceType;
				}
				else if(data.data.health_insurance && data.data.health_insurance == "No"){
					var insurance_category_type = data.data.otherInsuranceType;
        }*/
        
        if(data.data.medicare_insurance_val != "Yes" && data.data.medicare_amerigroup_val != "Yes" &&data.data.medicare_uhc_val != "Yes"){
				
          that.setState({
            medDivHide : 1
          })
  
        }
        if(data.data.tncare_insurance_val != "Yes" && data.data.tncare_bluecare_val != "Yes" &&data.data.tncare_tncareselect_val != "Yes" && data.data.tncare_choices_val != "Yes" && data.data.tncare_amerigroup_val != "Yes" && data.data.tncare_uhc_val != "Yes"){
          that.setState({
            tnDivHide : 1
          })				
        }

          this.setState({
            firstname: data.data.firstname,
            lastname: data.data.lastname,
            fullname: data.data.fullname,
            phone: data.data.contactnumber,
            email: data.data.email,
            profile_image: data.data.profile_image,
            view_logo: data.data.profile_image,
            old_img: data.data.profile_image,
            address: data.data.address,
            gender: data.data.gender,
            country: data.data.country,
            state: data.data.state,
            city: data.data.city,
            year_of_birth: data.data.year_of_birth,
            //year_of_birth: vDate,
            zipcode: data.data.zipcode,
            authorized_user_name: data.data.authorized_user_name,
            authorized_contact_number: data.data.authorized_contact_number,
            referral_partners: referral_partners,
            referral_partner: data.data.referral_partner,
            referral_partner_other: data.data.referral_partner_other,
            accommodate_folding_wheelchair: data.data.accommodate_folding_wheelchair,
            // permanent_or_temporary_disability: data.data.permanent_or_temporary_disability,
            // eligible_for_ada_paratransit: data.data.eligible_for_ada_paratransit,
            medicaid_tncare: data.data.medicaid_tncare,
            require_a_wheelchair: data.data.require_a_wheelchair,
            //folding_wheelchair: data.data.folding_wheelchair,
            motorized_wheelchair: data.data.motorized_wheelchair,
            //require_a_wheelchair_lift: data.data.require_a_wheelchair_lift,
            space_for_stretcher: data.data.space_for_stretcher,
            bariatric_stretch_transport:data.data.bariatric_stretch_transport,
            blind_visual_impaired:data.data.blind_visual_impaired,
            space_for_car_seat: data.data.space_for_car_seat,
            travel_with_companion: data.data.travel_with_companion,
            service_animal: data.data.service_animal,
            //require_assistance_from_the_driver_exit: data.data.require_assistance_from_the_driver_exit,
            assistance_getting_front_door: data.data.assistance_getting_front_door,
            //door_through_door_assistance: data.data.door_through_door_assistance,

            require_assistance_from_door:data.data.require_assistance_from_door,
           
            other_assistance:data.data.other_assistance,

            /*health_insurance : data.data.health_insurance,
            insurance_category_type : insurance_category_type,*/
            sec_ques : data.data.security_question,

            // health_insurance : data.data.health_insurance,
            // medicalInsuranceName: data.data.tripPaymentTypeName,
            // privateInsTxtVal: data.data.privateInsTxtField
            
            health_insurance : data.data.health_insurance,
            medicare_insurance_val: data.data.medicare_insurance_val,
            medicare_amerigroup_val: data.data.medicare_amerigroup_val,
            medicare_uhc_val: data.data.medicare_uhc_val,
            medicare_other_val: data.data.medicare_other_val,
            medicare_other_text: data.data.medicare_other_text,
            tncare_insurance_val: data.data.tncare_insurance_val,
            tncare_bluecare_val: data.data.tncare_bluecare_val,
            tncare_tncareselect_val: data.data.tncare_tncareselect_val,
            tncare_choices_val: data.data.tncare_choices_val,
            tncare_amerigroup_val: data.data.tncare_amerigroup_val,
            tncare_uhc_val: data.data.tncare_uhc_val,
            private_insurance_val: data.data.private_insurance_val,
            privateInsTxtVal: data.data.privateInsTxtVal,            
            
          });
       }

       

      
     });
     fetch(AppConstants.API+'/getAllActiveTypesCateorys').then(response => response.json())
     .then(data => {

     if(data.Status == "Success")
     {
      data.data.map((all_modes, i) => {     
        modes_arr.push(all_modes._id);               
      })

   this.setState({ provider_type: data.data});
     }
     else
     {
       this.setState({ provider_type: [] });
     }    
   });
   this.getRiderTrips(this.state.currentPage, this.state.sizePerPage, this.state.sortName, this.state.sortOrder, this.state.searchText, this.state.responeData);
//   fetch(AppConstants.API+'/getRiderTripsCount/'+this.props.match.params.id).then(response => response.json())
//   .then(res => {   
//   if(res.message == "success"){                           
//     this.setState({
//       takencount : res.taken,
//       nottakencount : res.nottaken,
//       noresponsecount: res.noresponse
    
//     });
//     setTimeout(() => {
//       this.setState({
//         errMsg: false,
//       });
//     }, 1000);
            
//   }
//   else{
//     this.setState({
//       errMsg: res.msg
//     });
//   }
// }); 
fetch(AppConstants.API+'/getRiderTripsTakenCount/'+this.props.match.params.id).then(response => response.json())
.then(res => {   
  if(res.message == "success"){                           
    this.setState({
      takencount : res.taken,
    });
    setTimeout(() => {
      this.setState({
        errMsg: false,
      });
    }, 1000);
  }
  else{
    this.setState({
      errMsg: res.msg
    });
  }
});
fetch(AppConstants.API+'/getRiderTripsNotTakenCount/'+this.props.match.params.id).then(response => response.json())
.then(res => {   
  if(res.message == "success"){                           
    this.setState({
      nottakencount : res.nottaken,
    });
    setTimeout(() => {
      this.setState({
        errMsg: false,
      });
    }, 1000);
  }
  else{
    this.setState({
      errMsg: res.msg
    });
  }
});
fetch(AppConstants.API+'/getRiderTripsNoResponseCount/'+this.props.match.params.id).then(response => response.json())
.then(res => {   
  if(res.message == "success"){                           
    this.setState({
      noresponsecount: res.noresponse
    });
    setTimeout(() => {
      this.setState({
        errMsg: false,
      });
    }, 1000);
  }
  else{
    this.setState({
      errMsg: res.msg
    });
  }
});
  }

  getRiderTrips(page, sizePerPage, sortName, sortOrder, searchText, responeData){
    this.setState({ call_id:localStorage.getItem('_id'), sizePerPage: sizePerPage,
  sortName: sortName, sortOrder: sortOrder, searchText: searchText, responeData: responeData });
    let riderTabelFileterData = {
      page: page,
      sizeperpage: sizePerPage,
      sortname: sortName,
      sortorder: sortOrder,
      serchtext: searchText,
      defaultSearchText: searchText,
      id: this.props.match.params.id,
      responeData: this.state.responeData
  
    };
    this.getRiderSavedTrips(riderTabelFileterData);

  }



  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    let image;
    if (this.state.profile_image == '' || this.state.profile_image == undefined || this.state.profile_image == "undefined") {
      image = placeholderimg;
    }
    else {
      image = AppConstants.API + '/public/uploads/' + this.state.profile_image
    }
    

    
    /*let health_insurance;
		let health_insurance_name;
		if(this.state.health_insurance == 'Yes'){
			var health_insurance_name_yes = <div className="options d-flex ml-auto other-cata">{this.state.insurance_category_type}</div>
		}else if(this.state.health_insurance == 'No'){
			health_insurance_name = 'No';
			health_insurance = 'no';
			var health_insurance_name_yes = <div className="options d-flex ml-auto"><Label className={health_insurance}> {health_insurance_name}</Label> </div>
		}else if(this.state.health_insurance == 'dont_know'){
			health_insurance_name = "Don't know";
			health_insurance = 'no';
			var health_insurance_name_yes = <div className = "options d-flex ml-auto">  <Label className={health_insurance}> {health_insurance_name} </Label></div>
		}*/
    // let medical_insurance;
    // let medical_insurance_name;
    // let health_insurance_name;
    // let health_insurance;
    // let medical_insurance_name_yes;
    // if(this.state.health_insurance == 'Yes' || this.state.medicalInsuranceName != ''){
    //   if(this.state.medicalInsuranceName && this.state.medicalInsuranceName != '' && this.state.medicalInsuranceName != null && this.state.medicalInsuranceName != "Self Pay"){
    //     medical_insurance = <span className="d-flex">Do you have insurance?</span>
    //     medical_insurance_name = this.state.medicalInsuranceName.map((medicalInsuranceName, j) =>
    //     <div className="ml-4 insValYes">
    //     <p className="pb-0 mb-0"> 
    //       <span  id={j}>
    //       {`${medicalInsuranceName}`}{this.state.medicalInsuranceName.length-1!=j ? ' ' : ''}
    //       </span>
  
    //       {medicalInsuranceName == "Private Insurance" && 
    //         <div>
    //           {this.state.medicalInsuranceName != ''  && this.state.medicalInsuranceName != null?
    //           <div>																	
    //             {medical_insurance_name} 
    //             {this.state.privateInsTxtVal != '' && this.state.privateInsTxtVal != null? 
    //             <div className = "private-block">
    //               {this.state.privateInsTxtVal}
    //             </div>
    //             :''}																	
    //           </div>
    //           :''}
    //         </div>					
    //       }
  
    //     </p> 
    //     </div>
    //   );
    //   }
      
    //   else{
    //     health_insurance_name = 'No';
    //     health_insurance = 'no';
    //     medical_insurance = <span className="d-flex">Do you have insurance?</span>
    //     medical_insurance_name_yes = <div className="options d-flex ml-auto"><FormGroup><Label className={health_insurance}>{health_insurance_name}</Label></FormGroup> </div>
    //   }
    // }else if(this.state.health_insurance == 'No'){
    //   health_insurance_name = 'No';
    //   health_insurance = 'no';
    //   medical_insurance = <span className="d-flex">Do you have insurance?</span>
    //   medical_insurance_name_yes = <div className="options d-flex ml-auto"><FormGroup><Label className={health_insurance}>{health_insurance_name}</Label></FormGroup> </div>
    // }else if(this.state.health_insurance == 'dont_know'){
    //   health_insurance_name = "Don't know";
    //   health_insurance = 'no';
    //   medical_insurance = <span className="d-flex">Do you have insurance?</span>
    //    medical_insurance_name_yes = <div className="options d-flex ml-auto"><FormGroup><Label className={health_insurance}>{health_insurance_name}</Label></FormGroup> </div>
    // }


    let insuranceSubFields
    let insuranceNo
    let insuranceNoField  
    if(this.state.health_insurance == "Yes"){  
      insuranceSubFields =
  
      <div className="row">
      
      {this.state.medDivHide == 0 ?
        <div className="col-md-4">
      
    
      <div className="plantrip w-100 user-profile-info">
      <div className="plantrip__header">
        <div className="options ml-auto">
        
        
      {this.state.medicare_insurance_val == "Yes" ?
        <div className="form-check plantrip-elg"><label className="form-check-label">
        <span className="plantrip-check">Medicare</span></label>
        </div>
      :null}
      {this.state.medicare_amerigroup_val == "Yes" ?
        <div className="form-check plantrip-elg"><label className="form-check-label">
        <span className="plantrip-check">Amerigroup</span></label>
        </div>
      :null}
      {this.state.medicare_uhc_val == "Yes" ?
        <div className="form-check plantrip-elg"><label className="form-check-label">
        <span className="plantrip-check">UHC</span></label>
        </div>
      :null}
      {this.state.medicare_other_val == "Yes" ?
        <div className="form-check plantrip-elg"><label className="form-check-label">
        <span className="plantrip-check">Other</span></label>
        </div>
      :null}
      {this.state.medicare_other_text != ''? 
        <div className="plantrip__body">
          <div className="options plantrip__body--option ml-auto">			
          <label className="radio m-0"><span className='ins-desc'>{this.state.medicare_other_text}</span></label>
          </div>												
        </div>
      :null}
      </div> 
      </div>      
      </div>      
        </div>
      :null}
                      
    
    {this.state.tnDivHide == 0 ?
    <div className="col-md-4">
    <div className="plantrip w-100 user-profile-info">
      <div className="plantrip__header">
        <div className="options ml-auto">
       
        {this.state.tncare_insurance_val == "Yes" ?
        <div className="form-check plantrip-elg"><label className="form-check-label">
        <span className="plantrip-check">TN Care</span></label>
        </div>
      :null}
      {this.state.tncare_bluecare_val == "Yes" ?
        <div className="form-check plantrip-elg"><label className="form-check-label">
        <span className="plantrip-check">Blue Care</span></label>
        </div>
      :null}
      {this.state.tncare_tncareselect_val == "Yes" ?
        <div className="form-check plantrip-elg"><label className="form-check-label">
        <span className="plantrip-check">TNCare Select</span></label>
        </div>
      :null}
      {this.state.tncare_choices_val == "Yes" ?
        <div className="form-check plantrip-elg"><label className="form-check-label">
        <span className="plantrip-check">Choices</span></label>
        </div>
      :null}
      {this.state.tncare_amerigroup_val == "Yes" ?
        <div className="form-check plantrip-elg"><label className="form-check-label">
        <span className="plantrip-check">Amerigroup</span></label>
        </div>
      :null}
      {this.state.tncare_uhc_val == "Yes" ?
        <div className="form-check plantrip-elg"><label className="form-check-label">
        <span className="plantrip-check">UHC</span></label>
        </div>
      :null}
      </div>
      </div>
      
      </div>									
    </div>
    :null}
  
    {this.state.private_insurance_val == "Yes" ?	
    <div className="col-md-4">
    <div className="plantrip w-100 user-profile-info">
      <div className="plantrip__header">
        <div className="options ml-auto">
          <div className="form-check plantrip-elg"><label className="form-check-label">				
         <span className="plantrip-check">Private Insurance</span></label>
          </div>
        </div>
      </div>
      {this.state.privateInsTxtVal != ''? 
        <div className="plantrip__body">
        <div className="options plantrip__body--option ml-auto">
        
        <label className="radio m-0 w-auto"><span>{this.state.privateInsTxtVal}</span></label>
        </div>												
        </div>
       :null} 
      </div>	
                      
    </div>
    
    :''}
    </div>  
     
    }else if(this.state.health_insurance == "No"){	
      insuranceNo= "No";
      insuranceNoField = 'no';
    
    }else if(this.state.health_insurance == 'dont_know'){
      insuranceNo = "Don't know";
      insuranceNoField = "no";
    }





    
    // let payment_option;
    // let payment_option_name;
    // if(this.state.payment_options_arry != ''){
		// 	payment_option= this.state.payment_options_arry;
		// 	payment_option_name= this.state.payment_options_arry;
    // }	
		
		let eligible_for_ada_paratransit;
		let eligible_for_ada_paratransit_name;
		if(this.state.eligible_for_ada_paratransit == 'Yes'){
			eligible_for_ada_paratransit_name = 'Yes';
			eligible_for_ada_paratransit = 'yes';
		}else if(this.state.eligible_for_ada_paratransit == 'No'){
			eligible_for_ada_paratransit_name = 'No';
			eligible_for_ada_paratransit = 'no';
		}else if(this.state.eligible_for_ada_paratransit == 'dont_know'){
			eligible_for_ada_paratransit_name = "Don't know";
			eligible_for_ada_paratransit = 'no';
		}
		
		let medicaid_tncare;
		let medicaid_tncare_name;
		if(this.state.medicaid_tncare == 'Yes'){
			medicaid_tncare_name = 'Yes';
			medicaid_tncare = 'yes';
		}else if(this.state.medicaid_tncare == 'No'){
			medicaid_tncare_name = 'No';
			medicaid_tncare = 'no';
		}else if(this.state.medicaid_tncare=='dont_know'){
			medicaid_tncare_name = "Don't know";
			medicaid_tncare = 'no';
		}
		
		let require_a_wheelchair;
		let require_a_wheelchair_name;
		if(this.state.require_a_wheelchair == 'Yes'){
			require_a_wheelchair_name = 'Yes';
			require_a_wheelchair = 'yes';
		}else if(this.state.require_a_wheelchair == 'No'){
			require_a_wheelchair_name = 'No';
			require_a_wheelchair = 'no';
		}else if(this.state.require_a_wheelchair == 'dont_know'){
			require_a_wheelchair_name = "Don't know";
			require_a_wheelchair = 'no';
		}
		let motorized_wheelchair;
		let motorized_wheelchair_name;
		if(this.state.motorized_wheelchair == 'Yes'){
			motorized_wheelchair_name = 'Yes';
			motorized_wheelchair = 'yes';
		}else if(this.state.motorized_wheelchair == 'No'){
			motorized_wheelchair_name = 'No';
			motorized_wheelchair = 'no';
		}else if(this.state.motorized_wheelchair == 'dont_know'){
			motorized_wheelchair_name = "Don't know";
			motorized_wheelchair = 'no';
		}


		// let folding_wheelchair;
		// let folding_wheelchair_name;
		// if(this.state.folding_wheelchair == 'Yes'){
		// 	folding_wheelchair_name = 'Yes';
		// 	folding_wheelchair = 'yes';
		// }else if(this.state.folding_wheelchair == 'No'){
		// 	folding_wheelchair_name = 'No';
		// 	folding_wheelchair = 'no';
		// }else if(this.state.folding_wheelchair == 'dont_know'){
		// 	folding_wheelchair_name = "Don't know";
		// 	folding_wheelchair = 'no';
		// }

		let accommodate_folding_wheelchair;
    let accommodate_folding_wheelchair_name;
    if(this.state.accommodate_folding_wheelchair == 'Yes'){
      accommodate_folding_wheelchair_name = 'Yes';
      accommodate_folding_wheelchair = 'yes';
    }else if(this.state.accommodate_folding_wheelchair == 'No'){
      accommodate_folding_wheelchair_name = 'No';
      accommodate_folding_wheelchair = 'no';
    }else if(this.state.accommodate_folding_wheelchair=='dont_know'){
      accommodate_folding_wheelchair_name = 'Don `t know';
      accommodate_folding_wheelchair = 'no';
    }

		// let require_a_wheelchair_lift;
		// let require_a_wheelchair_lift_name;
		// if(this.state.require_a_wheelchair_lift == 'Yes'){
		// 	require_a_wheelchair_lift_name = 'Yes';
		// 	require_a_wheelchair_lift = 'yes';
		// }else if(this.state.require_a_wheelchair_lift == 'No'){
		// 	require_a_wheelchair_lift_name = 'No';
		// 	require_a_wheelchair_lift = 'no';
		// }else if(this.state.require_a_wheelchair_lift == 'dont_know'){
		// 	require_a_wheelchair_lift_name = "Don't know";
		// 	require_a_wheelchair_lift = 'no';
		// }
		let space_for_stretcher;
		let space_for_stretcher_name;
		if(this.state.space_for_stretcher == 'Yes'){
			space_for_stretcher_name = 'Yes';
			space_for_stretcher = 'yes';
		}else if(this.state.space_for_stretcher == 'No'){
			space_for_stretcher_name = 'No';
			space_for_stretcher = 'no';
		}else if(this.state.space_for_stretcher == 'dont_know'){
			space_for_stretcher_name = "Don't know";
			space_for_stretcher = 'no';
    }
    let bariatric_stretch_transport;
    let bariatric_stretch_transport_name;
    if(this.state.bariatric_stretch_transport == 'Yes'){
      bariatric_stretch_transport_name = 'Yes';
      bariatric_stretch_transport = 'yes';
    }else if(this.state.bariatric_stretch_transport == 'No'){
      bariatric_stretch_transport_name = 'No';
      bariatric_stretch_transport = 'no';
    }else if(this.state.bariatric_stretch_transport == 'dont_know'){
      bariatric_stretch_transport_name = "Don't know";
      bariatric_stretch_transport = 'no';
    }
   
    
    let blind_visual_impaired;
    let blind_visual_impaired_name;
    if(this.state.blind_visual_impaired == 'Yes'){
      blind_visual_impaired_name = 'Yes';
      blind_visual_impaired = 'yes';
    }else if(this.state.blind_visual_impaired == 'No'){
      blind_visual_impaired_name = 'No';
      blind_visual_impaired = 'no';
    }else if(this.state.blind_visual_impaired == 'dont_know'){
      blind_visual_impaired_name = "Don't know";
      blind_visual_impaired = 'no';
    }

		let space_for_car_seat;
		let space_for_car_seat_name;
		if(this.state.space_for_car_seat == 'Yes'){
			space_for_car_seat_name = 'Yes';
			space_for_car_seat = 'yes';
		}else if(this.state.space_for_car_seat == 'No'){
			space_for_car_seat_name = 'No';
			space_for_car_seat='no';
		}else if(this.state.space_for_car_seat == 'dont_know'){
			space_for_car_seat_name = "Don't know";
			space_for_car_seat = 'no';
		}
		let travel_with_companion;
		let travel_with_companion_name;
		if(this.state.travel_with_companion == 'Yes'){
			travel_with_companion_name = 'Yes';
			travel_with_companion = 'yes';
		}else if(this.state.travel_with_companion == 'No'){
			travel_with_companion_name = 'No';
			travel_with_companion = 'no';
		}else if(this.state.travel_with_companion == 'dont_know'){
			travel_with_companion_name = "Don't know";
			travel_with_companion = 'no';
		}
		let service_animal;
		let service_animal_name;
		if(this.state.service_animal == 'Yes'){
			service_animal_name = 'Yes';
			service_animal='yes';
		}else if(this.state.service_animal == 'No'){
			service_animal_name = 'No';
			service_animal='no';
		}else if(this.state.service_animal=='dont_know'){
			service_animal_name = "Don't know";
			service_animal = 'no';
    }
    let require_assistance_from_door;
		let require_assistance_from_door_name;
		if(this.state.require_assistance_from_door == 'Yes'){
			require_assistance_from_door_name = 'Yes';
			require_assistance_from_door = 'yes';
		}else if(this.state.require_assistance_from_door == 'No'){
			require_assistance_from_door_name = 'No';
			require_assistance_from_door = 'no';
		}else if(this.state.require_assistance_from_door == 'dont_know'){
			require_assistance_from_door_name = "Don't know";
			require_assistance_from_door = 'no';
		}
		// let require_assistance_enter_exit_vehicle;
		// let require_assistance_enter_exit_vehicle_name;
		// if(this.state.require_assistance_enter_exit_vehicle == 'Yes'){
		// 	require_assistance_enter_exit_vehicle_name = 'Yes';
		// 	require_assistance_enter_exit_vehicle = 'yes';
		// }else if(this.state.require_assistance_enter_exit_vehicle == 'No'){
		// 	require_assistance_enter_exit_vehicle_name = 'No';
		// 	require_assistance_enter_exit_vehicle = 'no';
		// }else if(this.state.require_assistance_enter_exit_vehicle == 'dont_know'){
		// 	require_assistance_enter_exit_vehicle_name = "Don't know";
		// 	require_assistance_enter_exit_vehicle = 'no';
		// }
		// let require_assistance_to_door;
		// let require_assistance_to_door_name;
		// if(this.state.require_assistance_to_door == 'Yes'){
		// 	require_assistance_to_door_name = 'Yes';
		// 	require_assistance_to_door = 'yes';
		// }else if(this.state.require_assistance_to_door == 'No'){
		// 	require_assistance_to_door_name = 'No';
		// 	require_assistance_to_door = 'no';
		// }else if(this.state.require_assistance_to_door == 'dont_know'){
		// 	require_assistance_to_door_name = "Don't know";
		// 	require_assistance_to_door = 'no';
		// }
		// let require_assistance_through_door;
		// let require_assistance_through_door_name;
		// if(this.state.require_assistance_through_door == 'Yes'){
		// 	require_assistance_through_door_name = 'Yes';
		// 	require_assistance_through_door = 'yes';
		// }else if(this.state.require_assistance_through_door == 'No'){
		// 	require_assistance_through_door_name = 'No';
		// 	require_assistance_through_door = 'no';
		// }else if(this.state.require_assistance_through_door == 'dont_know'){
		// 	require_assistance_through_door_name = "Don't know";
		// 	require_assistance_through_door = 'no';
		// }
		/*let require_assistance_from_the_driver_exit;
		let require_assistance_from_the_driver_exit_name;
		if(this.state.require_assistance_from_the_driver_exit == 'Yes'){
			require_assistance_from_the_driver_exit_name = 'Yes';
			require_assistance_from_the_driver_exit = 'yes';
		}else if(this.state.require_assistance_from_the_driver_exit == 'No'){
			require_assistance_from_the_driver_exit_name = 'No';
			require_assistance_from_the_driver_exit = 'no';
		}else if(this.state.require_assistance_from_the_driver_exit == 'dont_know'){
			require_assistance_from_the_driver_exit_name = "Don't know";
			require_assistance_from_the_driver_exit = 'no';
		}*/ 
		/*let door_through_door_assistance;
		let door_through_door_assistance_name;
		if(this.state.door_through_door_assistance == 'Yes'){
			door_through_door_assistance_name = 'Yes';
			door_through_door_assistance = 'yes';
		}else if(this.state.door_through_door_assistance == 'No'){
			door_through_door_assistance_name = 'No';
			door_through_door_assistance = 'no';
		}else if(this.state.door_through_door_assistance == 'dont_know'){
			door_through_door_assistance_name = "Don't know";
			door_through_door_assistance = 'no';
    }*/

    // let permanent_or_temporary_disability;
		// let permanent_or_temporary_disability_name;
		// if(this.state.permanent_or_temporary_disability == 'Yes'){
		// 	permanent_or_temporary_disability_name = 'Yes';
		// 	permanent_or_temporary_disability = 'yes';
		// }else if(this.state.permanent_or_temporary_disability == 'No'){
		// 	permanent_or_temporary_disability_name = 'No';
		// 	permanent_or_temporary_disability = 'no';
		// }else if(this.state.permanent_or_temporary_disability == 'dont_know'){
		// 	permanent_or_temporary_disability_name = "Don't know";
		// 	permanent_or_temporary_disability = 'no';
		// }

    // let ada;
		// if(this.state.permanent_or_temporary_disability == 'Yes'){
		// 	ada=<li className = "sub">
		// 		<ul>
		// 			<li className="d-flex ">
		// 			<span className="d-flex">
		// 				Are you eligible for ADA paratransit? 
					
					   
		// 			</span>
		// 			<div className = "options d-flex ml-auto">
					
		// 			<Label className = {eligible_for_ada_paratransit}>
		// 				{eligible_for_ada_paratransit_name}
		// 			</Label>
					
		// 			</div>
		// 		</li>
		// 			</ul>
		// 		</li>
                                                
		// }
		let motorized;
		if(this.state.require_a_wheelchair == 'Yes'){
		motorized=<ul>
			  <li className = "d-flex ">
				<span className = "d-flex">
        Do you use a motorized wheelchair (or require wheelchair lift)?
				   
				</span>
				<div className = "options d-flex ml-auto">
				
					<Label className = {motorized_wheelchair}>
						{motorized_wheelchair_name}
					</Label>
				
				</div>
			  </li>
			{/* <li className = "d-flex ">
				<span className = "d-flex">
					Do you require a wheelchair lift?
					
				</span>
				<div className = "options d-flex ml-auto">
				
					<Label className = {require_a_wheelchair_lift}>
						{require_a_wheelchair_lift_name}
					</Label>
					
				</div>
			</li> */}
			<li className = "d-flex ">
				<span className = "d-flex">
				Do you use a folding wheelchair
					
				</span>
				<div className = "options d-flex ml-auto">
				
					<Label className = {accommodate_folding_wheelchair}>
						{accommodate_folding_wheelchair_name}
					</Label>
        
				</div>
			</li>
				</ul>
    }        
    const { user } = this.props.auth;
    const { rider } = this.props.auth.rider;
    const { phone } = this.state;

    

    const options = {
 
      page: this.state.currentPage,  // which page you want to show as default
    
      sizePerPageList: [ 5, 10, 20, 50], // you can change the dropdown list for size per page
    
      sizePerPage: this.state.sizePerPage,  // which size per page you want to locate as default
    
      pageStartIndex: 1, // where to start counting the pages
    
      paginationSize: 3,  // the pagination bar size.
    
      //paginationShowsTotal: this.state.riderTrips.length,  //this.renderShowsTotal- Accept bool or function

      paginationShowsTotal: this.renderShowsTotal, 
    
      paginationPosition: 'bottom',  // default is bottom, top and both is all available
    
      prePage: 'Previous', // Previous page button text
    
      nextPage: 'Next', // Next page button text
    
      firstPage: 'First', // First page button text
      
      lastPage: 'Last', // Last page button text
    
      onPageChange: this.onPageChange,
    
      onSizePerPageList: this.onSizePerPageList,
    
      onSortChange: this.onSortChange,
    
      onSearchChange: this.onSearchChange,
    
      insertModal: this.createCustomModal,
    };


    let rider_response;
    if(this.state.rider_response_re=='yes'){
      rider_response='Yes';
    }else{
      rider_response='No';
    }
    
    let rider_ride_status;
    let comment_lables;
    if(this.state.rider_ride_status_re=='taken'){
      comment_lables='Trip feedback';
      rider_ride_status='Taken';
    }else{
      comment_lables='Comment';
      rider_ride_status='NotTaken';
    }
    
    let yourself;
    if(this.state.yourself_re=='self'){
      yourself='Self';
    }else{
      yourself='Someone else';
    }
    
    let appropriate;
    if(this.state.appropriate_re=='yes'){
      appropriate='Yes';
    }else if(this.state.appropriate_re=='no'){
      appropriate='No';
    }
    else{
      appropriate='Not Sure';
    }
    let affordable;
    if(this.state.affordable_re=='yes'){
      affordable='Yes';
    }else if(this.state.affordable_re=='no'){
      affordable='No';
    }
    else{
      affordable='Not Sure';
    }
    let expected;
    if(this.state.expected_re=='yes'){
      expected='Yes';
    }else if(this.state.expected_re=='no'){
      expected='No';
    }
    else{
      expected='Not Sure';
    }
    
    let satisfied;
    if(this.state.satisfied_re=='yes'){
      satisfied='Yes';
    }else if(this.state.satisfied_re=='no'){
      satisfied='No';
    }
    else{
      satisfied='Not Sure';
    }
    
    let recommend;
    if(this.state.recommend_re=='yes'){
      recommend='Yes';
    }else if(this.state.recommend_re=='no'){
      recommend='No';
    }
    else{
      recommend='Not Sure';
    }
    let about_MEce;
    let provide_any_comment;
    if(this.state.provide_any_comment_re=='yes'){
      provide_any_comment='Yes';
      about_MEce=<div className="col-12 pb-2">Comment about MEce.
                <div className="d-flex options col-auto p-0 pt-1">
                    <FormGroup check>
                    <Label check>
                    {this.state.about_MEce_re}
                    </Label>
                    </FormGroup>
                </div>
                </div>
    
    }else if(this.state.provide_any_comment_re=='no'){
      provide_any_comment='No';
      about_MEce="";
    }
    else{
      provide_any_comment='Not Sure';
      about_MEce="";
    }
    
    return (


      
      <Page  title="Rider User Profile" >
      
     
        <ul className="cst-breadcrumb">
        <li><Link to={'/dashboard'}>Home</Link></li>
        <li><Link to={'/allriders'}>All Riders </Link></li>
        <li> Rider User Profile </li>
        </ul>

        
 
      


        <Modal isOpen={this.state.modal_show1} toggle={this.toggle3} className={this.props.className} >
    <ModalHeader toggle={this.toggle3} className="justify-content-center">Rider Feedback</ModalHeader>
    <ModalBody className="feedback-form" >
      <span  style={{color: 'green'}}>{this.state.errMsg}</span>
        <div className="row m-0 item-block mb-2">
        <h3>Trip Feedback</h3>         
          {this.state.feedback &&
          this.state.feedback.map((mytrip,idx)=>{
            var question_name=mytrip.question          
            if(mytrip.question_type =="radio" && mytrip.question==this.state.ques[0]){
               
              //if(mytrip.question=="Did the rider  responded to the call?"){
               
                return <div className="col-12 pb-4">{mytrip.question}
                <div className="options d-flex flex-wrap ml-auto">
                  {
                        mytrip.field_names.map((mytrips,index)=>{
                          if(mytrips=="No Response"){
                            return  <FormGroup check className="mr-2"> <Label className="form-check-label">
                                    <input
                                      type="radio"   
                                      className="form-check-input"
                                     // defaultChecked={mytrip}
                                      onChange={this.handleQuestionChange(idx)} 
                                      name={question_name}
                                      value={mytrips}
                                      defaultChecked={mytrips}
                                      id={mytrip._id}
                                      //checked={this.state.checked}
                                      /> 
                                     
                                      {mytrips}
                                     </Label>
                                     </FormGroup>
                               
                          }
                          else{
                            return <FormGroup check className="mr-2"> <Label className="form-check-label">
                            <input
                              type="radio"   
                              //defaultChecked={mytrip}
                              className="form-check-input"
                              onChange={this.handleQuestionChange(idx)} 
                              name={question_name}
                              value={mytrips} id={mytrip._id}/> 
                             
                              {mytrips}
                            </Label>
                            </FormGroup>
                          }
                         
                        })
                  }
                  </div>
                </div>
            //}
           
          }
          if(mytrip.question_type =="textarea"  ){
            if(mytrip._id=="5d2dd747baa20306f8fb5814"){
            return <div className="col-12">  <FormGroup className="mt-2 ">   {mytrip.question}
             
              <Input type="textarea" name={question_name}  value={this.state.Comment} onChange={this.handleQuestionChange(idx)}  />   
         
              </FormGroup>
              </div>
            }
          }   
              if(this.state.active){
                if((mytrip.question_type =="radio" && this.state.trip_option == "round-trip")  && (  mytrip._id =="5d2dd873baa20306f8fb5817"  ||  mytrip._id ==  "5d2dd8cfbaa20306f8fb5818")){
                  return <div  className="col-12  pb-4">{mytrip.question} 
                  <div className = "options d-flex flex-wrap ml-auto">
              {
                mytrip.field_names.map((mytrips,index)=>{
                  return  <FormGroup check className="mr-2"> <Label className="form-check-label">
                            <input
                             className="form-check-input"
                              type="radio"   
                              value={mytrips}
                              onChange={this.handleQuestionChange(idx)} 
                              name={question_name} id={mytrip._id}/> 
                             {mytrips}
                               </Label>
                              </FormGroup>
                })
              }
               </div></div>
                }
                if((mytrip.question_type =="radio" && this.state.trip_option == "one-way")  &&   mytrip._id =="5d2dd873baa20306f8fb5817" ){
                  return <div  className="col-12  pb-4">{mytrip.question} 
                  <div className="options d-flex flex-wrap ml-auto">
              {
                mytrip.field_names.map((mytrips,index)=>{
                  return  <FormGroup check className="mr-2"> <Label className="form-check-label">
                            <input
                             className="form-check-input"
                              type="radio"   
                              value={mytrips}
                              onChange={this.handleQuestionChange(idx)} 
                              name={question_name} id={mytrip._id}/> 
                             {mytrips}
                               </Label>
                              </FormGroup>
                })
              }
               </div></div>
                }
                if(mytrip._id !== "5d2dd873baa20306f8fb5817" && mytrip._id !== "55d2dd8cfbaa20306f8fb5818" && mytrip.question_type =="radio"){
                  if(mytrip.question_type =="radio" && mytrip._id==="5d2dd694baa20306f8fb5813" ){
                    return <div  className="col-12  pb-4">{mytrip.question} 
                    <div className="options d-flex flex-wrap ml-auto">
                  {
                    mytrip.field_names.map((mytrips,index)=>{
                    return  <FormGroup check className="mr-2"> <Label className="form-check-label">
                          <input
                          className="form-check-input"
                          type="radio"   
                          value={mytrips}
                          id={mytrip._id}
                          onChange={this.handleQuestionChange(idx)} 
                          name={question_name}
                          /> 
                          {mytrips}
                            </Label>
                          </FormGroup>
                    })
                  }
                    </div>
                    {this.state.active4 ?
                    <span className="error" style={{color: 'red'}}>{this.state.errors["question4"]}</span>:""}
                    </div>
                    }
                  return <div  className="col-12  pb-4">{mytrip.question} 
                  <div className="options d-flex flex-wrap ml-auto">
              {
                mytrip.field_names.map((mytrips,index)=>{
                  return  <FormGroup check className="mr-2"> <Label className="form-check-label">
                            <input
                             className="form-check-input"
                              type="radio"   
                              value={mytrips}
                              onChange={this.handleQuestionChange(idx)} 
                              name={question_name} id={mytrip._id}/> 
                             {mytrips}
                               </Label>
                              </FormGroup>
                })
              }
               </div></div>
                }
                if(mytrip.question_type =="textarea"  ){
                  if(mytrip._id=="5d2dd747baa20306f8fb5814"){
                  return <div className="col-12">  <FormGroup className="mt-2 ">   {mytrip.question}
                    <Input type="textarea" name={question_name}  value={this.state.Comment} onChange={this.handleQuestionChange(idx)}  />
                    </FormGroup></div>
                }
                else {
                  return <div className="col-12">  <FormGroup className="mt-2 ">   {mytrip.question}
                  <Input type="textarea"  name={question_name} onChange={this.handleQuestionChange(idx)}  />
                  </FormGroup></div>
                }
              }
              
              if(mytrip.question_type =="text"){
                if( this.state.trip_option == "round-trip"  && (  mytrip._id ==  "5d2dd914baa20306f8fb5819"  ||  mytrip._id ==  "5d2dd934baa20306f8fb581a")) {
                  return <div className="col-12 pb-12">{mytrip.question} <FormGroup className="col-12 mt-2  form-group px-0"> 
                  <Input type="text" name={question_name} onChange={this.handleQuestionChange(idx)} />
                  </FormGroup></div>
                }
                if(this.state.trip_option == "one-way" &&  mytrip._id ==  "5d2dd914baa20306f8fb5819") {
                  return <div className="col-12 pb-12">{mytrip.question} <FormGroup className="col-12 mt-2  form-group px-0"> 
                  <Input type="text" name={question_name} onChange={this.handleQuestionChange(idx)} />
                  </FormGroup></div>
                }
  
                if( mytrip._id !=  "5d2dd914baa20306f8fb5819" &&  mytrip._id !=  "5d2dd934baa20306f8fb581a") {
                  return <div className="col-12 pb-12">{mytrip.question} <FormGroup className="col-12 mt-2  form-group px-0"> 
                  <Input type="text" name={question_name} onChange={this.handleQuestionChange(idx)} />
                  </FormGroup></div>
                }
              }        
            if(mytrip.question_type =="rating"){
              return <span  className="rateapp p-3 pb-0"> {mytrip.question} 
               <Rating stop={10} className="d-flex justify-content-around mt-3 mb-2"  name="rating" value={this.state.rating} initialRating={this.state.rating}
               onChange={ this.handleRatingChange.bind(this,mytrip.question) } 
                 />
               <div className="d-flex justify-content-between mx-2">
               <em>Not Likely</em>
               <em>Extremely Likely</em>
               </div>
           </span>
              }     
          }
      })
    }      
  </div>             
    <span className="error" style={{color: 'red'}}>{this.state.errors["about_MEce"]}</span>
    </ModalBody>
    <ModalFooter className="justify-content-center border-0">
      <Button className="btn-reg" onClick={this.handleSubmit}>Save Feedback</Button>{' '}
    </ModalFooter>
  </Modal>


<Modal isOpen={this.state.modal} toggle={this.toggle2} className={this.props.className} >  
          <ModalHeader toggle={this.toggle2} className="justify-content-center">Rider Feedback</ModalHeader>
          <ModalBody className="feedback-form" >
          <span  style={{color: 'green'}}>{this.state.errMsg}</span>
           <div className="row m-0 item-block mb-2"> 
           <h3>Trip Feedback</h3>
           
           {this.state.feedback &&
            this.state.feedback.map((mytrip,idx)=>{
              var question_name=mytrip.question
              if(mytrip.question_type == "radio" && mytrip.question == this.state.ques[0]){
                return <div className="col-12  pb-4"> {mytrip.question}
                 <div className="options d-flex flex-wrap ml-auto">
                { 
                      mytrip.field_names.map((mytrips,index)=>{
                        return <FormGroup check className="mr-2"> <Label className="form-check-label "> <input className="form-check-input" name={question_name} onChange={this.handleQuestionChange(idx)} value={mytrips} type="radio" id={mytrip._id}/> 
                        <div className="options d-flex flex-wrap ml-auto">  {mytrips}</div>
                        </Label> </FormGroup>
                      })
                }
                 </div>
                {this.state.active2 ?
              <span className="error" style={{color: 'red'}}>Please select an option</span>:""}
               </div>
               
              }
              if(this.state.active){
                  if((mytrip.question_type =="radio" && this.state.trip_option == "round-trip")  && (  mytrip._id =="5d2dd873baa20306f8fb5817"  ||  mytrip._id ==  "5d2dd8cfbaa20306f8fb5818")){
                    return <div  className="col-12  pb-4">{mytrip.question} 
                    <div className="options d-flex flex-wrap ml-auto">
                {
                  mytrip.field_names.map((mytrips,index)=>{
                    return  <FormGroup check className="mr-2"> <Label className="form-check-label">
                              <input
                                className="form-check-input"
                                type="radio"   
                                value={mytrips}
                                onChange={this.handleQuestionChange(idx)} 
                                name={question_name}
                                id={mytrip._id}/> 
                                {mytrips}
                                </Label>
                                </FormGroup>
                  })
                }
                </div>
                </div>
                  }
                  if((mytrip.question_type =="radio" && this.state.trip_option == "one-way")  &&   mytrip._id =="5d2dd873baa20306f8fb5817" ){
                    return <div  className="col-12  pb-4">{mytrip.question} 
                    <div className="options d-flex flex-wrap ml-auto">
                {
                  mytrip.field_names.map((mytrips,index)=>{
                    return  <FormGroup check className="mr-2"> <Label className="form-check-label">
                              <input
                              className="form-check-input"
                                type="radio"   
                                value={mytrips}
                                onChange={this.handleQuestionChange(idx)} 
                                id={mytrip._id}
                                name={question_name}/> 
                              {mytrips}
                                </Label>
                                </FormGroup>
                            
                    
                  })
                }
                </div></div>
                  }
                  if(mytrip._id !== "5d2dd873baa20306f8fb5817" && mytrip._id !== "5d2dd8cfbaa20306f8fb5818" && mytrip.question_type =="radio"){

                    if(mytrip.question_type =="radio" && mytrip._id==="5d2dd694baa20306f8fb5813" ){
                      return <div  className="col-12  pb-4">{mytrip.question} 
                      <div className="options d-flex flex-wrap ml-auto">
                  {
                    mytrip.field_names.map((mytrips,index)=>{
                      return  <FormGroup check className="mr-2"> <Label className="form-check-label">
                                <input
                                  className="form-check-input"
                                  type="radio"   
                                  value={mytrips}
                                  id={mytrip._id}
                                  onChange={this.handleQuestionChange(idx)} 
                                  name={question_name}
                                  /> 
                                  {mytrips}
                                    </Label>
                                  </FormGroup>
                    })
                  }
                    </div>
                    {this.state.active3 ?
                      <span className="error" style={{color: 'red'}}>{this.state.errors["question2"]}</span>:""}
                      </div>
                    }

                    return <div  className="col-12  pb-4">{mytrip.question} 
                    <div className="options d-flex flex-wrap ml-auto">
                {
                  mytrip.field_names.map((mytrips,index)=>{
                    return  <FormGroup check className="mr-2"> 
                              <Label className="form-check-label">
                                <input
                                className="form-check-input"
                                  type="radio"   
                                  value={mytrips}
                                  onChange={this.handleQuestionChange(idx)} 
                                  name={question_name}
                                  id={mytrip._id}/> 
                                  {mytrips}  
                                </Label>
                              </FormGroup>
                  })
                }
                </div></div>
                  }
            
                  if(mytrip.question_type =="textarea" && mytrip._id=="5d2dd747baa20306f8fb5814"){
                    return <div className="col-12">     <FormGroup className=" mt-2 ">   {mytrip.question} 
                      <Input type="textarea"  name={question_name} onChange={this.handleQuestionChange(idx)}  />
                      <span className="error" style={{color: 'red'}}>{this.state.errors["comment1"]}</span> 
                      </FormGroup> 
                    </div>
                  }  
                  if(mytrip.question_type =="textarea" && mytrip._id!=="5d2dd747baa20306f8fb5814"){
                    return <div className="col-12"> <FormGroup className=" mt-2 ">  {mytrip.question} 
                      <Input type="textarea"  name={question_name} onChange={this.handleQuestionChange(idx)}  />
                      </FormGroup> 
                    </div>
                  }

                  if(mytrip.question_type =="text"){
                    if( this.state.trip_option == "round-trip"  && (  mytrip._id ==  "5d2dd914baa20306f8fb5819"  ||  mytrip._id ==  "5d2dd934baa20306f8fb581a")) {
                      return <div className="col-12 pb-12">{mytrip.question} <FormGroup className="col-12 mt-2  form-group px-0"> 
                      <Input type="text" name={question_name} onChange={this.handleQuestionChange(idx)} />
                      </FormGroup></div>
                    }
                    if(this.state.trip_option == "one-way" &&  mytrip._id ==  "5d2dd914baa20306f8fb5819") {
                      return <div className="col-12 pb-12">{mytrip.question} <FormGroup className="col-12 mt-2  form-group px-0"> 
                      <Input type="text" name={question_name} onChange={this.handleQuestionChange(idx)} />
                      </FormGroup></div>
                    }
      
                    if( mytrip._id !=  "5d2dd914baa20306f8fb5819" &&  mytrip._id !=  "5d2dd934baa20306f8fb581a") {
                      return <div className="col-12 pb-12">{mytrip.question} <FormGroup className="col-12 mt-2  form-group px-0"> 
                      <Input type="text" name={question_name} onChange={this.handleQuestionChange(idx)} />
                      </FormGroup></div>
                    }
                  } 
                    if(mytrip.question_type =="rating"){
                      return <span  className="rateapp p-3"> {mytrip.question}
                              <Rating stop={10}  className="d-flex justify-content-around" name="rating" value={this.state.rating} initialRating={this.state.rating} onChange={ this.handleRatingChange.bind(this,mytrip.question) } 
                                />
                              <div className="d-flex justify-content-between mx-2">
                                <em>Not Likely</em>
                                <em>Extremely Likely</em>
                              </div>
                              </span>
                      }
        
                }
                if(mytrip.question_type =="textarea" && mytrip._id=="5d2dd747baa20306f8fb5814"){
                  return <div className="col-12">       <FormGroup className=" mt-2 ">  {mytrip.question} 
                    <Input type="textarea"  name={question_name} onChange={this.handleQuestionChange(idx)}  />
                    <span className="error" style={{color: 'red'}}>{this.state.errors["comment1"]}</span> 
                    </FormGroup> 
                  </div>
                }
            })
          }
          
          </div>

            <span className="error" style={{color: 'red'}}>{this.state.errors["about_MEce"]}</span>
          </ModalBody>
          <ModalFooter className="justify-content-center border-0">
            <Button className="btn-reg" onClick={this.handleSubmit}>Save Feedback</Button>{' '}
          </ModalFooter>
        </Modal>
   


	

        <Modal isOpen={this.state.modal_show} toggle={this.toggle1} className={this.props.className} >
          <ModalHeader toggle={this.toggle1} className="justify-content-center">Rider Feedback</ModalHeader>
          <ModalBody className="feedback-form" >
          <div className="row m-0 item-block mb-2">
           <h3>Trip Feedback</h3>         
       
       { this.state.feedback.map((mytrip,idx)=>{
        if( this.state.trip_option == "round-trip"  && (  mytrip._id ==  "5d2dd914baa20306f8fb5819"  ||  mytrip._id ==  "5d2dd934baa20306f8fb581a" ||  mytrip._id =="5d2dd873baa20306f8fb5817"  ||  mytrip._id ==  "5d2dd8cfbaa20306f8fb5818")) {
              return <div className="col-12 pb-6"><br/>{mytrip.question}
                    <span>
              {this.state.answers.map((answer,index)=>{
                if(idx==index){
              if(answer==null){
                return <div className="d-flex options p-0 pt-1">
                  <FormGroup check className="p-0">
                <Label check>                  
                </Label>
                </FormGroup></div>
                }else{
                  return <div className="d-flex options p-0 pt-1">
                  <FormGroup check className="p-0">
                <Label check>
                <div>{answer}</div>
                  
                </Label>
                </FormGroup></div>
                }
                }
                else{
                  
                }
              })}
              </span>
              </div>
              }

              if(this.state.trip_option == "one-way" &&  (mytrip._id ==  "5d2dd914baa20306f8fb5819" || mytrip._id ==  "5d2dd873baa20306f8fb5817")) {
                  return <div className="col-12 pb-6"><br/>{mytrip.question}
                    <span>
                      {this.state.answers.map((answer,index)=>{
                        if(idx==index){
                          if(answer==null){
                             return <div className="d-flex options p-0 pt-1">
                                    <FormGroup check className="p-0">
                                      <Label check>
                                      </Label>
                                    </FormGroup>
                                  </div>
                          }else{
                            return <div className="d-flex options p-0 pt-1">
                                      <FormGroup check className="p-0">
                                        <Label check>
                                        <div>{answer}</div>
                                        </Label>
                                      </FormGroup>
                                  </div>
                          }
                        }
                        else{
                        
                        }
                      })}
                  </span>
                </div>
              }


          if( mytrip._id !=  "5d2dd8cfbaa20306f8fb5818" &&  mytrip._id !=  "5d2dd873baa20306f8fb5817" &&  mytrip._id !=  "5d2dd914baa20306f8fb5819" &&  mytrip._id !=  "5d2dd934baa20306f8fb581a") {
              return <div className="col-12 pb-6"><br/>{mytrip.question}
              <span>
                  {this.state.answers.map((answer,index)=>{
                      if(idx==index){
                        if(answer==null){
                          return <div className="d-flex options p-0 pt-1">
                                <FormGroup check className="p-0">
                                <Label check>                                  
                                </Label>
                                </FormGroup>
                              </div>
                        }else{
                          return <div className="d-flex options p-0 pt-1">
                            <FormGroup check className="p-0">
                            <Label check>
                            <div>{answer}</div>                              
                            </Label>
                            </FormGroup></div>
                        }
                      }
                      else{
                      
                      }
                    })
                  }
                </span>
                </div>
              }
            }       
              )}
              </div>
          </ModalBody>
         
        </Modal>


       <ReactTitle title="Rider User Profile"/>

       
        <Row>
          <Col xl={12} lg={12} md={12}>
            <Card>
              <CardBody>
                <FormGroup row>
                  <Col className="col-3 ml-3">
                      <figure className="view-profile-img" ><img src={image} /></figure>
                  </Col>
                  <Col sm={8} className="profile-info">


                  <h2 className="cst-pfname">{this.state.fullname ? this.state.fullname : 'N/A'} </h2>

                  <div className="row form-group">
                    <label htmlFor="exampleEmail" className="col-3 col-form-label">Gender</label>
                    <label className="col-auto col-form-label">{this.state.gender ? this.state.gender : 'N/A'} </label>
                  </div>

                  <div className="row form-group">
                    <label htmlFor="exampleEmail" className="col-3 col-form-label">Date of Birth</label>
                    <label className="col-auto col-form-label">{this.state.year_of_birth ? this.state.year_of_birth : 'N/A'} </label>
                  </div>

                  <div className="row form-group">
                    <label htmlFor="exampleEmail" className="col-3 col-form-label">Email</label>
                    <label className="col-auto col-form-label">{this.state.email ? this.state.email : 'N/A'} </label>
                  </div>

                  <div className="row form-group">
                    <label htmlFor="exampleEmail" className="col-3 col-form-label">Phone Number</label>
                    <label className="col-auto col-form-label">{this.state.phone ? this.state.phone : 'N/A'}</label>
                  </div>


                  <div className="row form-group">
                    <label htmlFor="exampleEmail" className="col-3 col-form-label">Address</label>
                    <label className="col-auto col-form-label">{this.state.address ? this.state.address : 'N/A'}</label>
                  </div>

                  <div className="row form-group">
                    <label htmlFor="exampleEmail" className="col-3 col-form-label">City</label>
                    <label className="col-auto col-form-label">{this.state.city ? this.state.city : 'N/A'}  </label>
                  </div>

                  
                  <div className="row form-group">
                    <label htmlFor="exampleEmail" className="col-3 col-form-label">State</label>
                    <label className="col-auto col-form-label">{this.state.state ? this.state.state : 'N/A'} </label>
                  </div>
      
                  <div className="row form-group">
                    <label htmlFor="exampleEmail" className="col-3 col-form-label">Zip Code</label>
                    <label className="col-auto col-form-label">{this.state.zipcode ? this.state.zipcode : 'N/A'} </label>
                  </div>
                  <div className="row form-group mt-3 mb-1">
                  <h5>Authorized User</h5>
                  </div>
				  
				  <div className="row form-group">
                  <label htmlFor="exampleEmail" className="col-3 col-form-label">Name</label>
                  <label className="col-auto col-form-label">{this.state.authorized_user_name ? this.state.authorized_user_name : 'N/A'} </label>
          </div>
				  
				  {/* <div className="row form-group">
                  <label for="exampleEmail" className="col-3 col-form-label">Details View</label>
                  <label className="col-auto col-form-label">{this.state.sec_ques ? this.state.sec_ques : 'N/A'} </label>
          </div> */}

          <div className="row form-group">
            <label htmlFor="exampleEmail" className="col-3 col-form-label">Contact Number</label>
            <label className="col-auto col-form-label">{this.state.authorized_contact_number ? this.state.authorized_contact_number : 'N/A'} </label>
          </div>

          <div className="row form-group">
                  <label htmlFor="exampleEmail" className="col-3 col-form-label">Details View</label>
                  <label className="col-auto col-form-label">{this.state.sec_ques ? this.state.sec_ques : 'N/A'} </label>
          </div>

				  <div className="row form-group">
                  <label htmlFor="exampleEmail" className="col-3 col-form-label">Referral Partner</label>
                  {/*<label className="col-auto col-form-label">{this.state.referral_partners} </label>*/}
                  <label className="col-auto col-form-label">{this.state.referral_partners ? this.state.referral_partners : 'N/A'} </label>
                  </div>
                

                  </Col>
                  {/*<Col sm={3}>
						Address : {this.state.address ? this.state.address : 'N/A'} {<br />}
						State : {this.state.state ? this.state.state : 'N/A'}  {<br />}
						City : {this.state.city ? this.state.city : 'N/A'} {<br />}
						Zipcode : {this.state.zipcode ? this.state.zipcode : 'N/A'}    {<br />} 
						Authorized User : {this.state.authorized_user_name ? this.state.authorized_user_name : 'N/A'}    {<br />}
						Referral Partners  : {this.state.referral_partners ? this.state.referral_partners : 'N/A'}                
                  </Col>*/}
                </FormGroup>
              </CardBody>

            </Card>
          </Col>
        </Row>
<Row>
<Col className="col-12">
<Nav tabs className="w-100 cst-tabs justify-content-center mt-4">
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })} 
              onClick={() => { this.toggle('1'); }}
            >
             Saved Trips
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Eligibilities
            </NavLink>
          </NavItem>
        </Nav>
<TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
              <Card>
                <div className="px-4 py-2">
                <div className="dt-tabel-header-items d-flex">
                <ul className="d-flex" >
                    <li><div name="feedback" id="all" onClick={ this.handleInputChange } className={"fb-all"+" "+this.state.all}>All</div></li>
                    <li><div name="feedback" id="taken" onClick={ this.handleInputChange } className={'fb-taken'+" "+this.state.taken}>Feedback Taken<span>{this.state.takencount}</span></div></li>
                    <li><div name="feedback" id="nottaken" onClick={ this.handleInputChange } className={"fb-nt-taken"+" "+this.state.nottaken}>Feedback Not Taken<span>{this.state.nottakencount }</span></div></li>
                    <li><div name="feedback" id="noresponse" onClick={ this.handleInputChange } className={"fb-n0-respons"+" "+this.state.noresponse}>Rider No Response<span>{this.state.noresponsecount }</span></div></li>                            
                  </ul>
                </div>  
             
                 
                  <BootstrapTable data={this.state.riderTrips} remote = { true } search={true} pagination={true} fetchInfo={ { dataTotalSize: this.state.totalRiderTrips } } multiColumnSearch={true} options={options}
                    
                  >
                    <TableHeaderColumn dataField='_id' isKey={true} searchable={false} dataSort={true} hidden={true}>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='leaving_from' dataSort={true}>From</TableHeaderColumn>
                    <TableHeaderColumn dataField='going_to' dataSort={true}>To</TableHeaderColumn>
                    {/* <TableHeaderColumn dataField='start_date' dataSort={true}>Date</TableHeaderColumn> */}
                    <TableHeaderColumn dataField='date_time' width={'14%'} dataSort={true}>Date & Time</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' width={'17%'}  dataSort={true}>Provider Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='trip_option' width={'13%'}  dataSort={true}>Trip Option</TableHeaderColumn>

                    <TableHeaderColumn dataField='actions' width={'18%'} dataFormat={this.format.bind(this)} export={false}>Actions</TableHeaderColumn>
                  </BootstrapTable>

                </div>
              </Card>
          </TabPane>
          <TabPane tabId="2"  >
            <Card>
               <div className="px-4 py-2">
               <span className="error" style={{ color: 'red' }}>{this.state.errMsg}</span>
                  <div className="eligibilities-block w-100">
                      <h3> Insurance </h3>
                              <Card>
                                <CardBody>
                                        <ul>
                                    <li className="plantrip-block plantrip-block-view pb-0">
                                    <div className="d-flex">
                                      <span className="d-flex">
                                          Do you have insurance?
                                      </span>
                                      {/* {this.state.health_insurance == "No" || this.state.health_insurance == ""

                                      } */}
                                      <div className="options d-flex ml-auto">
                                        <FormGroup>		 
                                        <Label className={insuranceNoField}>
                                          {insuranceNo}
                                        </Label>
                                        </FormGroup>
                                      </div>                
                                              </div>
                          
                                              <div className="my-3">{insuranceSubFields}</div>
                                    </li>               
                                  </ul>
                                </CardBody>
                              </Card>
                            <br/>
                                   <h3>Eligibilities</h3>
                                   
                                            <ul className="px-3 pb-3">

                                            <li className="d-flex">
                                              <span className="d-flex">
                                              Are you blind or visually impaired?
                                              </span>
                                              <div className="options d-flex ml-auto">
                                                  
                                                <Label className={blind_visual_impaired}>
                                                  {blind_visual_impaired_name}
                                                </Label>
                                                
                                                </div>
                                            </li>
                                            {/* {(this.state.medicalInsuranceName != ''  && this.state.medicalInsuranceName != null) || this.state.health_insurance != ''?
                                                  <li className="d-flex">
                                                    {medical_insurance}
                                                   
                                                      {medical_insurance_name_yes} */}
                                                                            
                                                  
                                                    {/* <div className="options  ml-auto">
                                                      {this.state.medicalInsuranceName != ''  && this.state.medicalInsuranceName != null?
                                                        <div>																	
                                                          {medical_insurance_name}											
                                                        </div>
                                                      :''}									
                                                    </div>				  */}
                                                  {/* </li>
                                                  :''}
                                                  {medical_insurance_name} */}
                                                                            
                                            {/*<li className="d-flex">
											                                	<span className="d-flex">
                                                        Do you have insurance?
                                                        </span>
                                                    <div className="options d-flex ml-auto">
                                                      {health_insurance_name_yes}
                                                    </div>
                                                </li>*/}
                                                {/* <li className="d-flex">
											                                	<span className="d-flex">
                                                        Do you have a permanent/temporary disability?
                                                        </span>
	
                                                    <div className="options d-flex ml-auto">
                                                    <Label className={permanent_or_temporary_disability}>
                                                      {permanent_or_temporary_disability_name}
                                                    </Label>
                                                    </div>
                                                </li>

                                                {ada} */}
                                                {/*<li className="d-flex">
                                                    <span className="d-flex">
                                                       Do you have Medicaid/TennCare?
                                                        
                                                    </span>
                                                    <div className="options d-flex ml-auto">
                                                       
                                                    <Label className={medicaid_tncare}>
                                                      {medicaid_tncare_name}
                                                    </Label>
                                                   
                                                    </div>

                                                </li>*/}
                                                <li className="d-flex">
                                                    <span className="d-flex">
                                                        Do you require a wheelchair?
                                                        
                                                    </span>
                                                    <div className="options d-flex ml-auto">
                                                      
																											<Label className={require_a_wheelchair}>
																												{require_a_wheelchair_name}
																											</Label>
																											
                                                    </div>
                                                </li>
                                                <li className="sub" style={ motorized ? { display:'block'} : {display : 'none'} }>
                                                {motorized}
                                                </li>
																										<li className="d-flex">
                                                    <span className="d-flex">
                                                       Do you need a vehicle that has space for a stretcher?
                                                    </span>
                                                    <div className="options d-flex ml-auto">
                                                        
                                                        <Label className={space_for_stretcher}>
                                                          {space_for_stretcher_name}
                                                        </Label>
                                                       
                                                                                </div>
                                                                            </li>
                                                                            <li className="d-flex">
                                                                              <span className="d-flex">
                                                                              Do you need bariatric stretcher?
                                                                              </span>
                                                                              <div className="options d-flex ml-auto">
                                                                              
                                                                                  <Label className={bariatric_stretch_transport}>
                                                                                    {bariatric_stretch_transport_name}
                                                                                  </Label>
                                                                              
                                                                              </div>
                                                                            </li>
                                                    
                                                      <li className="d-flex">
                                                          <span className="d-flex">
                                                            Do you need space for a car seat?
                                                          </span>
                                                          <div className="options d-flex ml-auto">
                                                             
                                                        <Label className={space_for_car_seat}>
                                                          {space_for_car_seat_name}
                                                        </Label>
                                                        
                                                                                </div>
                                                                            </li>
                                                    <li className="d-flex">
                                                      <span className="d-flex">
                                                        Do you need to travel with a companion?
                                                      </span>
                                                      <div className="options d-flex ml-auto">
                                                          
                                                        <Label className={travel_with_companion}>
                                                          {travel_with_companion_name}
                                                        </Label>
                                                        
                                                                                </div>
                                                                            </li>
                                                    <li className="d-flex">
                                                      <span className="d-flex">
                                                        Do you travel with a service animal?
                                                      </span>
                                                      <div className="options d-flex ml-auto">
                                                          
                                                        <Label className={service_animal}>
                                                          {service_animal_name}
                                                        </Label>
                                                       
                                                                                </div>
                                                                            </li>
                                                                            

                                                                            
                                                                            <li className="d-flex">
                                                      <span className="d-flex">
                                                      Do you need assistance?

                                                      </span>
                                                      <div className="options d-flex ml-auto">
                                                         
                                                        <Label className={require_assistance_from_door}>
                                                          {require_assistance_from_door_name}
                                                        </Label>
                                                        
                                                                                </div>
                                                                            </li>
                                                            {this.state.other_assistance}
                                                      {/* <li className="d-flex">
                                                      <span className="d-flex">
                                                      Do you need driver assistance to enter or exit vehicle?

                                                      </span>
                                                      <div className="options d-flex ml-auto">
                                                         
                                                        <Label className={require_assistance_enter_exit_vehicle}>
                                                          {require_assistance_enter_exit_vehicle_name}
                                                        </Label>
                                                        
                                                       </div>
                                                     </li>
                                                   <li className="d-flex">
                                                      <span className="d-flex">
                                                      Do you need driver assistance to door?

                                                      </span>
                                                      <div className="options d-flex ml-auto">
                                                         
                                                        <Label className={require_assistance_to_door}>
                                                          {require_assistance_to_door_name}
                                                        </Label>
                                                        
                                                       </div>
                                                     </li>
                                                      <li className="d-flex">
                                                      <span className="d-flex">
                                                      Do you need driver assistance through door?

                                                      </span>
                                                      <div className="options d-flex ml-auto">
                                                         
                                                        <Label className={require_assistance_through_door}>
                                                          {require_assistance_through_door_name}
                                                        </Label>
                                                        
                                                     </div>
                                                     </li>                      */}
                                                    {/*<li className="d-flex">
                                                      <span className="d-flex">
                                                        Do you require assistance from the driver to exit a vehicle?
                                                      </span>
                                                      <div className="options d-flex ml-auto">
                                                         
                                                        <Label className={require_assistance_from_the_driver_exit}>
                                                          {require_assistance_from_the_driver_exit_name}
                                                        </Label>
                                                        
                                                                                </div>
                                                                            </li>
                                                    <li className="d-flex">
                                                      <span className="d-flex">
                                                      Do you need door to door assistance?
                                                      
                                                          </span>
                                                          <div className="options d-flex ml-auto">
                                                              
                                                        <Label className={door_through_door_assistance}>
                                                          {door_through_door_assistance_name}
                                                        </Label>
                                                        
                                                    </div>
                                                </li>*/}
                                                </ul>
                                             
                 </div>
                
                </div>
            </Card>
          </TabPane>
        </TabContent>
</Col>
</Row>

















        {/* {this.state.SavedTrips ?
          <Row>
            <Card>
              <CardBody>
                
                <div className="d-block text-center">
				<span className="mr-3"><Button className="btn btn-warning" title="Saved Trips" onClick={this.SavedTrips}>Saved Trips</Button></span>
                <span> <Button className="btn btn-warning" title="Saved Comments" onClick={this.SavedComments}> Eligibilities</Button></span>
                
                </div>

                <div>
                  <span className="error" style={{ color: 'red' }}>{this.state.errMsg}</span>
                  <BootstrapTable data={this.state.users} search={true} pagination={true} multiColumnSearch={true} options={options}
                    insertRow
                  >
                    <TableHeaderColumn dataField='_id' isKey={true} searchable={false} dataSort={true} hidden={true}>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='leaving_from' dataSort={true}>From</TableHeaderColumn>
                    <TableHeaderColumn dataField='going_to' dataSort={true}>To</TableHeaderColumn>
                    <TableHeaderColumn dataField='date_time' dataSort={true}>Date & Time</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataSort={true}>Provider Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='actions' width={'10%'} dataFormat={this.format.bind(this)} export={false}>Actions</TableHeaderColumn>
                  </BootstrapTable>
                </div>
              </CardBody>
            </Card>
          </Row>
          : null
        }
		{this.state.SavedComments ?
          <Row>
            <Card>
              <CardBody>

              <div className="d-block text-center">
				<span className="mr-3"><Button className="btn btn-warning" title="Saved Trips" onClick={this.SavedTrips}>Saved Trips</Button></span>
                <span> <Button className="btn btn-warning" title="Registered Users" onClick={this.SavedComments}> Eligibilities</Button></span>
                </div>
               <div>

                  <span className="error" style={{ color: 'red' }}>{this.state.errMsg}</span>
                  <div className="eligibilities-block w-100">
                  <Card>
                                        <CardBody>
                                            <ul>
                                                <li className="d-flex">
											                                	<span className="d-flex">
                                                        Do you have a permanent/temporary disability?
                                                        </span>
                                                    <div className="options d-flex ml-auto">
                                                          {permanent_or_temporary_disability_name}
                                                    </div>
                                                    
                                                        

                                                </li>
                                                {ada}
                                                <li className="d-flex">
                                                    <span className="d-flex">
                                                       Do you have Medicaid/TennCare?
                                                        
                                                    </span>
                                                    <div className="options d-flex ml-auto">
                                                       
                                                    <Label className={medicaid_tncare}>
                                                      {medicaid_tncare_name}
                                                    </Label>
                                                   
                                                    </div>
                                                    
                                                        

                                                </li>
                                                <li className="d-flex">
                                                    <span className="d-flex">
                                                        Do you require a wheelchair?
                                                        
                                                    </span>
                                                    <div className="options d-flex ml-auto">
                                                      
																											<Label className={require_a_wheelchair}>
																												{require_a_wheelchair_name}
																											</Label>
																											
                                                    </div>
                                                    
                                                        

                                                </li>
                                                
                                                <li className="sub">
                                                {motorized}
                                                </li>
																										<li className="d-flex">
                                                    <span className="d-flex">
                                                       Do you need a vehicle that has space for a stretcher?
                                                    </span>
                                                    <div className="options d-flex ml-auto">
                                                        
                                                        <Label className={space_for_stretcher}>
                                                          {space_for_stretcher_name}
                                                        </Label>
                                                       
                                                                                </div>
                                                                            </li>
                                                    
                                                    
                                                      <li className="d-flex">
                                                          <span className="d-flex">
                                                            Do you need space for a car seat?
                                                          </span>
                                                          <div className="options d-flex ml-auto">
                                                             
                                                        <Label className={space_for_car_seat}>
                                                          {space_for_car_seat_name}
                                                        </Label>
                                                        
                                                                                </div>
                                                                            </li>
                                                    <li className="d-flex">
                                                      <span className="d-flex">
                                                        Do you need to travel with a companion?
                                                      </span>
                                                      <div className="options d-flex ml-auto">
                                                          
                                                        <Label className={travel_with_companion}>
                                                          {travel_with_companion_name}
                                                        </Label>
                                                        
                                                                                </div>
                                                                            </li>
                                                    <li className="d-flex">
                                                      <span className="d-flex">
                                                        Do you travel with a service animal?
                                                      </span>
                                                      <div className="options d-flex ml-auto">
                                                          
                                                        <Label className={service_animal}>
                                                          {service_animal_name}
                                                        </Label>
                                                       
                                                                                </div>
                                                                            </li>
                                                    <li className="d-flex">
                                                      <span className="d-flex">
                                                        Do you require assistance from the driver to exit a vehicle?
                                                      </span>
                                                      <div className="options d-flex ml-auto">
                                                         
                                                        <Label className={require_assistance_from_the_driver_exit}>
                                                          {require_assistance_from_the_driver_exit_name}
                                                        </Label>
                                                        
                                                                                </div>
                                                                            </li>
                                                    <li className="d-flex">
                                                      <span className="d-flex">
                                                      Do you need door to door assistance?
                                                      
                                                          </span>
                                                          <div className="options d-flex ml-auto">
                                                              
                                                        <Label className={door_through_door_assistance}>
                                                          {door_through_door_assistance_name}
                                                        </Label>
                                                        
                                                    </div>
                                                </li>
                                                </ul>
                                                </CardBody>
                             </Card>
                 </div>
                
                
                </div>
              </CardBody>
            </Card>
          </Row>
          : null
        } */}
      </Page>
    );
  };
}

ViewRiderProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,

};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors,

});

//export default ChangepasswordPage;
export default connect(mapStateToProps, {})(ViewRiderProfile);
