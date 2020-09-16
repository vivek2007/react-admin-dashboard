import React from 'react';
import { Row, Col, CardBody, Card, CardHeader,Label, CardImg} from 'reactstrap';
import Page from 'components/Page';
import { Link } from 'react-router-dom';
import {ReactTitle} from 'react-meta-tags';
import AppConstants from 'AppConstants';
import Switch from "react-switch";
import axios from 'axios';
import placeholderimg from '../../assets/img/placeholder.png';
import {
  MdInfoOutline, MdQuestionAnswer, MdLibraryBooks
} from 'react-icons/md';
import swal from 'sweetalert';
import ViewMentorTodo from './viewMentorTodos'
import { connect } from 'react-redux';

class ViewMentor extends React.Component{
    constructor(){
        super();
        this.state = {
          first_name:"",
            firstname : "",
            middlename : "",
            lastname : "",
            full_name:"",
            gender : "",
            street : "",
            address1:"",
            address2:"",
            city : "",
            state : "",
            employer_name:"",
            zipcode : "",
            homephone : "",
            mobilephone : "",
            nameaddressofemployer : "",
            workphone : "",
            occupation : "",
            emailaddress : "",
            grade_preference :"",
            strengths :"",
            reason_behind_mentor :"",
            statement_behind_mentor :"",
            intial_statement :"",
            convicted_misdemeanor :"",
            current_indictment :"",
            explaination1 :"",
            explaination2 :"",
            educational_background :"",
            available_days :[],
            best_time_for_voluntee :[],
            referal_addresses:[],
            signature:"",
            are_you_student:'',
            currently_enrolled:"",
            currently_employed:"",
            //Optional Information:
            social_security_number :"",
            date_of_birth :"",
            prefer_particular_grade_level :"",    
            prefer_particular_gender: "",
            prefer_quiet: "",
            prefer_outgoing_child: "",
            prefer_specific_racial: "",
            prefer_specific_racial_text:"",
            foreign_language:"",
            foreign_language_other:"",
            hobbies: "",
            like_to_be_mentee: "",
            clubs_or_groups: "",
            favorite_subject : "",
            least_favorite_subject : "",
            enjoyed_activities :[],
            qualities_like_in_mentee :"",
            role_model :"",
            recommend_book :"",
            grade_preference:"",
            status : true,
            profile_img:'',
            approval : false,
            program:[],
            signature:''
        }
        this.handleStatus = this.handleStatus.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(checked) {
      swal({
        title: "Are you sure",
        text: "you want to approve this mentor?",
        icon: "warning",
        buttons: ["Go back", "Confirm"],
        dangerMode: false,
        })
        .then((willDelete) => {
          if (willDelete) {
          swal("Mentor has been approved!", {
          icon: "success",
          });
          const data = {
            id : this.props.match.params.id,
            approve : checked
          }
          axios.post(AppConstants.API+'/mentor/adminApprovalMentor/',data).then(res => {
            if(res.data.Status=="Success"){
              this.setState({ approval:checked });
            }
          })
        }})
    }
    // handleChange(checked) {
    //     const data = {
    //       id : this.props.match.params.id,
    //       approve : checked
    //     }
    //     axios.post(AppConstants.API+'/mentor/adminApprovalMentor/',data).then(res => {
    //       if(res.data.Status=="Success"){
    //         this.setState({ approval:checked });
    //       }
    //     })
    //   }
    handleStatus(checked){
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
            status : checked
          }
          axios.post(AppConstants.API+'/mentor/updateMentorStatus/'+this.props.match.params.id,data).then(res => {
            if(res.data.Status=="Success"){
              this.setState({ status : checked });
            }
          })
        }})
    }
    componentDidMount(){
        var that = this;
        fetch(AppConstants.API + '/mentor/getMentorData/' + this.props.match.params.id)
        .then(function (res) {
          if (res.status == 200) {
            return res.json();
          }
        })
        .then(function (data) {
          console.log("data.data[0].program",data.data[0].program)
            that.setState({
              first_name: data.data[0].first_name,
                middlename: data.data[0].middle_name,
                lastname: data.data[0].last_name, 
                full_name:data.data[0].full_name,
                gender: data.data[0].gender, 
                street: data.data[0].street, 
                address1:data.data[0].address1,
                address2:data.data[0].address2,
                city: data.data[0].city, 
                state: data.data[0].state, 
                zipcode: data.data[0].zipcode, 
                employer_name:data.data[0].employer_name,
                homephone: data.data[0].home_phone, 
                mobilephone: data.data[0].mobile_phone, 
                nameaddressofemployer: data.data[0].employer_address,
                workphone: data.data[0].work_phone,
                occupation: data.data[0].occupation,
                emailaddress: data.data[0].email,
                status : data.data[0].status,
                approval : data.data[0].approval,
                profile_img: data.data[0].profile_image,
                grade_preference :data.data[0].grade_preference,
                strengths : data.data[0].strengths,
                reason_behind_mentor : data.data[0].reason_behind_mentor,
                statement_behind_mentor : data.data[0].statement_behind_mentor,
                intial_statement : data.data[0].intial_statement,
                convicted_misdemeanor : data.data[0].convicted_misdemeanor,
                current_indictment : data.data[0].current_indictment,
                explaination : data.data[0].explaination,
                educational_background : data.data[0].educational_background,
                available_days : data.data[0].available_days,
                best_time_for_voluntee : data.data[0].best_time_for_voluntee,
                are_you_student: data.data[0].are_you_student,
                currently_enrolled:data.data[0].currently_enrolled,
                currently_employed:data.data[0].currently_employed,
                referal_addresses:data.data[0].referal_addresses,
                signature: data.data[0].signature,
          
                //Optional Information:
                social_security_number : data.data[0].social_security_number,
                date_of_birth : data.data[0].date_of_birth,
                prefer_particular_grade_level : data.data[0].prefer_particular_grade_level,    
                prefer_particular_gender: data.data[0].prefer_particular_gender,
                prefer_quiet: data.data[0].prefer_quiet,
                prefer_outgoing_child: data.data[0].prefer_outgoing_child,
                prefer_specific_racial: data.data[0].prefer_specific_racial,
                prefer_specific_racial_text:data.data[0].prefer_specific_racial_text,
                foreign_language:data.data[0].foreign_language,
                foreign_language_other:data.data[0].foreign_language_other,
                hobbies: data.data[0].hobbies,
                like_to_be_mentee: data.data[0].like_to_be_mentee,
                clubs_or_groups: data.data[0].clubs_or_groups,
                favorite_subject : data.data[0].favorite_subject,
                least_favorite_subject : data.data[0].least_favorite_subject,
                enjoyed_activities : data.data[0].enjoyed_activities,
                qualities_like_in_mentee : data.data[0].qualities_like_in_mentee,
                role_model : data.data[0].role_model,
                recommend_book : data.data[0].recommend_book,
                grade_preference: data.data[0].grade_preference,
                program:data.data[0].program
                // view_logo: data.data[0].profile_image,
                // old_img: data.data[0].profile_image,
            })
         
    })
    var element = document.getElementById("navItem-Mentors-1");
    element.classList.add("active");
    }
    render(){
      let image;
        if (this.state.profile_img == '' || this.state.profile_img == undefined || this.state.profile_img == "undefined" || this.state.profile_img == null) {
            image = placeholderimg;
        }
        else {
            image =   this.state.profile_img
        }

        let parent_status
        if(this.state.status == true){
            parent_status =  <p className="mr-2 badge badge-success  p-2">active</p>
           
        }else{
            parent_status =   <p className="mr-1 badge badge-warning p-2 cst-inactive">Inactive</p>
        }
        return(
            <Page title="View Mentor">
                <ul className="cst-breadcrumb">
                    <li><Link to={'/dashboard'}>Home</Link></li>
                    <li><Link to={'/allmentors'}>All Mentors</Link></li>
                    <li>View Mentor</li>
                    
                </ul>
                <ReactTitle title="View Mentor"/>
                <Row>
                    <Col xl={12} lg={12} md={12} className="profile-info">
                        <Card className="p-0 mb-4">
                            <CardHeader> 
                            <Label for="examplePassword" sm={12} className="px-0"><strong><MdInfoOutline fontSize="24" className="mr-2" />Mentor Information</strong>
                            </Label>
                            </CardHeader>
                            <CardBody>
                           <Row>
                           <Col md={2}>
                              {/* <CardImg className="card-img-left" src={image} style={{ width: '100%', height: 'auto' }} /> */}
                              <figure className="view-profile-img" ><img src={image} /></figure>
                          </Col>
                          <Col  sm={10}>
                            <div className="row form-group mb-0">
                            <label htmlFor="exampleEmail" className="col-4 col-form-label">Name</label>
                            <label className="col-auto col-form-label">{this.state.first_name ? this.state.first_name : 'N/A'} </label>
                            </div>

                            {/* <div className="row form-group mb-0">
                            <label htmlFor="exampleEmail" className="col-4 col-form-label">Middle Name</label>
                            <label className="col-auto col-form-label">{this.state.middlename ? this.state.middlename : 'N/A'} </label>
                            </div> */}

                            {/* <div className="row form-group mb-0">
                            <label htmlFor="exampleEmail" className="col-4 col-form-label">Last Name</label>
                            <label className="col-auto col-form-label">{this.state.lastname ? this.state.lastname : 'N/A'} </label>
                            </div> */}

                            <div className="row form-group mb-0">
                            <label htmlFor="exampleEmail" className="col-4 col-form-label"> Gender</label>
                            <label className="col-auto col-form-label">{this.state.gender ? this.state.gender : 'N/A'} </label>
                            </div>

                            <div className="row form-group mb-0">
                            <label htmlFor="exampleEmail" className="col-4 col-form-label"> Address 1</label>
                            <label className="col-7 col-form-label">
                                <p className="m-0 d-block">{this.state.address1 ? this.state.address1 : 'N/A'},</p>
                                
                            </label>
                            </div>
                            <div className="row form-group mb-0">
                            <label htmlFor="exampleEmail" className="col-4 col-form-label"> Address 2</label>
                            <label className="col-7 col-form-label">
                                <p className="m-0 d-block">{this.state.address2 ? this.state.address2 : 'N/A'},</p>
                                <p className="m-0 d-block">{this.state.city ? this.state.city : 'N/A'},</p>
                                <p className="m-0 d-block">{this.state.state ? this.state.state : 'N/A'},{this.state.zipcode ? this.state.zipcode : 'N/A'}</p>
                               
                            </label>
                            </div>

                            {/* <div className="row form-group mb-0">
                            <label htmlFor="exampleEmail" className="col-4 col-form-label"> Home Phone</label>
                            <label className="col-auto col-form-label">{this.state.homephone ? this.state.homephone : 'N/A'} </label>
                            </div> */}

                            <div className="row form-group mb-0">
                            <label htmlFor="exampleEmail" className="col-4 col-form-label">  Phone</label>
                            <label className="col-auto col-form-label">{this.state.mobilephone ? this.state.mobilephone : 'N/A'} </label>
                            </div>
                            <div className="row form-group mb-0">
                            <label htmlFor="exampleEmail" className="col-4 col-form-label"> Program</label>
                            <label className="col-auto col-form-label"><strong>
                              {console.log("this.state.program312",this.state.program)}
                              { this.state.program.map((res,i,arr)=>{
                                    return(
                                    <div> {res.name} {i != (arr.length-1) ? ',' : ''}</div>
                                    )
                                  }) }
                                                  
                              {/* {this.state.program ? this.state.program : 'N/A'} */}
                              </strong> </label>
                            </div>

                            <div className="row form-group mb-0">
                            <label htmlFor="exampleEmail" className="col-4 col-form-label"> E-mail</label>
                            <label className="col-auto col-form-label">{this.state.emailaddress ? this.state.emailaddress : 'N/A'} </label>
                            </div>

                            <div className="row form-group ">
                            <label htmlFor="exampleEmail" className="col-4 col-form-label">Status </label>
                            {this.props.auth.user.user_type != 'admin' ?
                            <label className="col-auto col-form-label">
                                <Switch onChange={this.handleStatus} checked={this.state.status} 
                                uncheckedIcon={
                                  <div
                                      style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      height: "100%",
                                      fontSize: 15,
                                      width:"150px",
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
                                      width:"180px",
                                      fontWeight: "bold",
                                      color: "#000",
                                      paddingRight: 2
                                      }}
                                  >
                                      Active
                                  </div>
                                  }
                                  onColor = "#45b649"
                                  offColor = "#ffd700"
                                  className="react-switch"
                                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                  height={20}
                                  width={48}
                                  handleDiameter={30}
                                />
                            </label>
                            :<p className = 'col-6'>{parent_status}</p>}
                            </div>
                           
                            </Col>

                           </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <ViewMentorTodo data={this.props.match.params.id}/>
            </Page>
        )
    }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});
export  default connect(mapStateToProps, {})(ViewMentor);
// export default ViewMentor;
