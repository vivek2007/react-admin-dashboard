import React from 'react';
import Page from 'components/Page';
import AppConstants from 'AppConstants';
import {ReactTitle} from 'react-meta-tags';
import  { Link } from 'react-router-dom';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Badge,
    Label,
    CardImg,
    CardTitle,
    CardText
  } from 'reactstrap';
  import {
    MdInfoOutline, MdEmail, MdPhone, MdLanguage, MdAccountBalance, MdPerson
  } from 'react-icons/md';

import Switch from "react-switch";
import "react-datepicker/dist/react-datepicker.css";
import Child1 from 'assets/img/users/300_13.jpg';
import axios from 'axios';
import placeholderimg from '../../assets/img/placeholder.png';
import ParentIcon from 'assets/img/parents.png';
import ViewParentTodos from './viewParentTodos'
import { connect } from 'react-redux';
import swal from 'sweetalert';


class ViewParent extends React.Component{
    constructor(){
        super()
        this.state = {
            name:'',
            email:'',
            phone:'',
            address:'',
            first_language:'',
            status:'',
            child_name: '',
            organization: '',
            graduation_year: '',
            date_of_birth: '',
            grade: '',
            school: '',
            child_email: '',
            child_address: '',
            child_phone: '',
            child_firstlanguage: '',
            to_be_mentor: '',
            child_status: '',
            user_type: '',
            users: [],
            status : true,
            approval: false,
            profile_image:'',
            view_logo: '',
            old_img: '',
            profile_img:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }
    handleChange(checked) {
        const data = {
          id : this.props.match.params.id,
          approve : checked
        }
        axios.post(AppConstants.API+'/parent/admiApprovalParent',data).then(res => {
          if(res.data.Status=="Success"){
            this.setState({ approval:checked });
          }
        })
      }
      handleStatusChange(checked) {
          console.log("checked",checked)
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
                    id : this.props.match.params.id,
                    status : checked
                }
                axios.post(AppConstants.API+'/parent/updateParentStatus/'+this.props.match.params.id,data).then(res => {
                    if(res.data.Status=="Success"){
                        this.setState({ status:checked });
                    }
                })
            }})
       
      }
    componentDidMount(){
    //console.log("this.props.auth.user.user_type",this.props.auth.user.user_type)
        var that = this;
        fetch(AppConstants.API + '/parent/getParentChildData/' + this.props.match.params.id)
        .then(function (res) {
          if (res.status == 200) {
            return res.json();
          }
        })
        .then(function (data) {
            console.log("data.data[0].first_language",)
            that.setState({
                name:data.data[0].parent_name,
                phone: data.data[0].phone,
                address: data.data[0].address,
                first_language: data.data[0].first_language,
                email:data.data[0].email,
                status:data.data[0].status,
                users:data.data,
                approval:data.data[0].approval,
                profile_img: data.data[0].profile_image,
                view_logo: data.data[0].profile_image,
                old_img: data.data[0].profile_image,
                // child_name:data.data[0].child_name ,
                // organization:data.data[0].organization,
                // graduation_year:data.data[0].graduation_year,
                // date_of_birth:data.data[0].date_of_birth,
                // grade:data.data[0].grade,
                // school:data.data[0].school,
                // child_email:data.data[0].child_email,
                // child_address:data.data[0].child_address,
                // child_phone:data.data[0].child_phone,
                // child_firstlanguage:data.data[0].child_firstlanguage,
                // to_be_mentor:data.data[0].to_be_mentor,
                // child_status:data.data[0].child_status,
                // user_type:data.data[0].user_type,
            })
         
    })
    this.state.users.map((res,i)=>{
        res.ChildData.map((result,index)=>{
            if(result.profile_image != ''){
                this.setState({
                    profile_image:result.profile_image
                })
            //    image = result.profile_image
            }else{
                // image = placeholderimg; 
                this.setState({
                    profile_image:placeholderimg
                })
            }
        })
    })
    var element = document.getElementById("navItem-Parents-1");
    element.classList.add("active");
    var element = document.getElementById("navItem-Clients-0");
    element.classList.remove("active");
    var element = document.getElementById("navItem-App Feedback-0");
    element.classList.remove("active");
    var element = document.getElementById("navItem-Event Feedback-1");
    element.classList.remove("active");
    var element = document.getElementById("navItem-Help-1");
    element.classList.remove("active");
    
    }
    render(){
        console.log("status",this.state.status)
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
        // let image;
        // if(this.state.profile_image != ''){
        //    image = this.state.profile_image
        // }else{
        //     image = placeholderimg; 
        // }
        
        return(
            <Page title="View Parent">
                <ul className="cst-breadcrumb">
                    <li><Link to={'/dashboard'}>Dashboard</Link></li>
                    <li><Link to={'/Allparents'}>All Parents</Link></li>
                    <li>View Parent</li>
                    {/* {this.state.approval == false ?<li style={{float: 'right'}}>
                      <Switch onChange={this.handleChange} checked={this.state.approval}  onColor = "#45b649"
                      offColor = "#ffd700"
                      // width	= {120}
                      />
                    </li>:<li style={{float: 'right'}}> <span className="mr-2 badge badge-success  p-2">Approved</span></li>} */}
                    
                </ul>
                <ReactTitle title="View Parent"/>
                <Row>
                    <Col xl={12} lg={12} md={12}>
                    {/* <Col xl={12} lg={12} md={12}> */}
                        <Card className="mb-4 w-100 p-0">
                        <CardHeader> 
                            <Label for="examplePassword" sm={12} className="px-0">
                                <strong><MdInfoOutline fontSize="24" className="mr-2" />Parent Info</strong>
                            </Label>
                            <ul>
                                
                         {/* {this.state.approval == false ?<li style={{float: 'right'}}>
                      <Switch onChange={this.handleChange} checked={this.state.approval}  onColor = "#45b649"
                      offColor = "#ffd700"
                      // width	= {120}
                      />
                    </li>:<li style={{float: 'right'}}> <span className="mr-2 badge badge-success  p-2">Approved</span></li>} */}

                         </ul>
                        </CardHeader>
                            <CardBody className="row">
                            <Col className="col-2">
                                <figure className="view-profile-img" ><img src={image} /></figure>
                            </Col>
                                <div className="col-6">
                                    <ul className="view-detail co1-sm-12">
                                        <li>
                                            <label className="col-6">Name</label>
                                            <p className="col-4">{this.state.name ? this.state.name : 'N/A'} </p>
                                        </li>
                                        <li>
                                            <label className="col-6">Phone Number</label>
                                            <p className="col-4">{this.state.phone ? this.state.phone : 'N/A'} </p>
                                        </li>
                                        <li>
                                            <label className="col-6">Address</label>
                                            <p className="col-4">{this.state.address ? this.state.address : 'N/A'} </p>
                                        </li>
                                        {/* <li>
                                            <label className="col-6">First Language</label>
                                            <p className="col-4">{this.state.first_language ? this.state.first_language : 'N/A'} </p>
                                        </li> */}
                                        <li>
                                            <label className="col-6">Email</label>
                                            <p className="col-6">{this.state.email ? this.state.email : 'N/A'} </p>
                                        </li>
                                        
                                        <li >
                                                 <label className="col-6">Status</label>
                                                 {this.props.auth.user.user_type != 'admin' ?
                                                  <p className="col-6">
                                                  <Switch onChange={this.handleStatusChange} checked={this.state.status}   uncheckedIcon={
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
                                                  // width	= {120}
                                                  />
                                              </p>
                                                 
                                                 :<p className = 'col-6'>{parent_status}</p>}
                                                
                                        </li>
                                    </ul>
                                    </div>
                            </CardBody>
                        </Card>
                    {/* </Col> */}
                    {/* <div className="col-12 pl-0">
                        <Card >
                            <CardHeader> 
                                <Label for="examplePassword" className="m-0"><strong>
                                    <MdInfoOutline  fontSize="24" className="mr-2"  />Child Info</strong>
                                </Label>
                            </CardHeader> */}
                          
                            {/* <CardBody>
                                <div>
                                    <span className="error" style={{color: 'red'}}>{this.state.errMsg}</span>  
                                    <BootstrapTable data={ this.state.users } search={ true } pagination={ true } multiColumnSearch={ true } options={ options }
                                    >
                                    <TableHeaderColumn dataField='_id' isKey={ true } searchable={ false } dataSort={ true } hidden={true}>Company ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField='child_name' dataSort={ true }> Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField='child_email'  width={'28%'}  dataSort={ true }>Email</TableHeaderColumn>
                                    <TableHeaderColumn dataField='child_phone' dataSort={ true }>Phone Number</TableHeaderColumn>
                                    <TableHeaderColumn dataField='actions' width={'20%'} dataFormat={this.format.bind(this)} export={ false }>Actions</TableHeaderColumn>
                                    </BootstrapTable>
                                </div>
                            </CardBody> */}
                        {/* </Card>
                    </div> */}
                    </Col>
                    </Row>
                    <ViewParentTodos data={this.props.match.params.id}/>
                    {this.state.users.map((res,i)=>{
                    return(<Row>
                        <Col xl={12} lg={12} md={12}>
                              <Card className="pt-0 mt-5">
                                <CardHeader className="d-flex justify-content-between">
                                <Label for="examplePassword" className="m-0"><strong><img src={ParentIcon} />Students Info</strong></Label>
                              </CardHeader>
                                <CardBody className="row m-0">

                        { res.ChildData.map((result,i)=>{
                        return (
                                <Col md={6} sm={6} xs={12} className="mb-3 prnt-childs-list">
                                    {/* <Badge color="success" className="mr-1"> Student-{i+1}</Badge> */}
                                    <Card className="flex-row pt-0 ">
                                   {result.profile_image ? <CardImg className="card-img-left ml-3 mt-3" src={result.profile_image} style={{ width: 'auto', height: 110 }} />:<CardImg className="card-img-left" src={placeholderimg} style={{ width: 'auto', height: 110 }} />} 
                                    <CardBody className="p-3">
                                   {result.name ?
                                    <Link  href="#"   to = {"/viewChild/" + result._id} > <CardTitle className=""> {result.name} </CardTitle> </Link>
                                     : 'N/A'}
                                    <CardText>
                                        <p><MdEmail fontSize="24" className="mr-2" /> {result.email ? result.email : 'N/A'}</p>
                                        <p><MdPhone fontSize="24" className="mr-2" /> {result.phone ? result.phone : 'N/A'}</p>
                                        {/* <p><MdLanguage fontSize="24" className="mr-2" /> {result.firstlanguage ? result.firstlanguage : 'N/A'}</p> */}
                                        {/* <p>{result.school ? result.school : 'N/A'}</p> */}
                                        <p><MdAccountBalance fontSize="24" className="mr-2" /> {result.organization ? result.organization : 'N/A'}</p><p><MdPerson fontSize="24" className="mr-2" /> {result.user_type ? result.user_type : 'N/A'} </p>
                                       
                                    </CardText>
                                    </CardBody>
                                    </Card>
                                </Col>
                            
                            // <Col lg="6" md="12" sm="12" xs="12">
                            //     <Card>
                            //         {<CardHeader> 
                            //             <Label for="examplePassword" className="m-0"><strong>
                            //                 <MdInfoOutline  fontSize="24" className="mr-2"  />Children Info</strong>
                            //             </Label>
                            //             </CardHeader> }
                            //         <CardBody>
                            //             <div>
                            //                 <ul className="view-detail co1-sm-12">
                            //                     <li>
                            //                         <label className="col-6">Name</label>
                            //                         <p className="col-4">{result.name ? result.name : 'N/A'} </p>
                            //                     </li>
                            //                     <li>
                            //                         <label className="col-6">Email</label>
                            //                         <p className="col-6">{result.email ? result.email : 'N/A'} </p>
                            //                     </li>
                            //                     <li>
                            //                         <label className="col-6">Phone Number</label>
                            //                         <p className="col-6">{result.phone ? result.phone : 'N/A'} </p>
                            //                     </li>
                            //                     <li>
                            //                         <label className="col-6">First Language</label>
                            //                         <p className="col-4">{result.firstlanguage ? result.firstlanguage : 'N/A'} </p>
                            //                     </li>
                            //                     <li>
                            //                         <label className="col-6">School</label>
                            //                         <p className="col-4">{result.school ? result.school : 'N/A'} </p>
                            //                     </li>
                            //                     <li>
                            //                         <label className="col-6">Organization</label>
                            //                         <p className="col-4">{result.organization ? result.organization : 'N/A'} </p>
                            //                     </li>
                            //                     {/* <li>
                            //                         <label className="col-6">Date Of Birth</label>
                            //                         <p className="col-4">{result.date_of_birth ? result.date_of_birth : 'N/A'} </p>
                            //                     </li> */}
                            //                     <li>
                            //                         <label className="col-6">User Type</label>
                            //                         <p className="col-4">{result.user_type ? result.user_type : 'N/A'} </p>
                            //                     </li>
                            //                 </ul>
                            //             </div>
                            //         </CardBody>
                            //     </Card>
                            //     </Col>
                    )
                    
                    })}

                            </CardBody>
                              </Card>
                              </Col>

                        </Row> )
                })}
             
            </Page>
        )
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth
  });
export  default connect(mapStateToProps, {})(ViewParent);
// export default ViewParent;