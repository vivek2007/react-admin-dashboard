import React from 'react';
import { Link } from 'react-router-dom';
import AppConstants from 'AppConstants';
import {ReactTitle} from 'react-meta-tags';
import Page from 'components/Page';
import { Card, CardBody, Row,UncontrolledTooltip} from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { MdAdd, MdEdit, MdDelete ,} from 'react-icons/md';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import axios from 'axios';
import Workbook from 'react-xlsx-workbook';
import Loader from 'react-loader';
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";

class Program extends React.Component{
    constructor(){
        super();
        this.state = {
            programs : [],
            switched : false,
            page_loader : false,
            mentor:''
        }
    }
    componentDidMount(){
        fetch(AppConstants.API+'/mentor/getProgramMentors/'+ this.props.match.params.id).then(res=>{
            if(res.status == 200){
                return res.json();
            }
        }).then(result=>{
            if(result.data.length>0){
                this.setState({
                    programs:result.data,
                    page_loader : true
                })
            }
        })

        fetch(AppConstants.API+'/child/getUserProfile/'+ this.props.match.params.id).then(res=>{
            if(res.status == 200){
                return res.json();
            }
        }).then(result=>{
            console.log("result",result.data.mentor);
            // if(result.data.length>0){
                this.setState({
                    mentor:result.data.mentor,
                    // page_loader : true
                })
            // }
        })
    //     var element = document.getElementById("navItem-Clients-0");
    //   element.classList.remove("active");
    //   var element = document.getElementById("navItem-Mentors-1");
    //   element.classList.remove("active");
    //   var element = document.getElementById("navItem-Cms-0");
    //   element.classList.remove("active");
    //   var element = document.getElementById("navItem-Programs-2");
    //   element.classList.add("active");
    //   var element = document.getElementById("navItem-Events-1");
    //   element.classList.remove("active");
    //   if(!this.props.auth.user.user_type){
    //     element = document.getElementById("navItem-Admins-0");
    //     element.classList.remove("active");
    //   }
    //   var element = document.getElementById("navItem-dashboard-0");
    //   element.classList.remove("active");
    //   var element = document.getElementById("navItem-Resources-0");
    //   element.classList.remove("active");
    //   // var element = document.getElementById("navItem-Client Habits-0");
    //   // element.classList.remove("active");
    //   var element = document.getElementById("navItem-Habits-3");
    //   element.classList.remove("active");
    //   var element = document.getElementById("navItem-Help-1");
    //   element.classList.remove("active");
    //   var element = document.getElementById("navItem-Help Sugesstions-0");
    //   element.classList.remove("active");
    }
    DeleteProgram=(del_id)=>e=>{
        const that = this;
        e.preventDefault();
console.log("del_id",del_id,"this.props.match.params.id",this.props.match.params.id)
        swal({
            title: "Are you sure?",
            text: "You want to assign this mentor if you assigned previously assigned mentor is unassigned  if any?",
            icon: "warning",
            buttons: true,
            dangerMode: true,   
        })
        .then((willDelete) => {
          if (willDelete) {
            swal("Mentor has been assigned!", {
            icon: "success",
            });
            const prg_id = {
              mentor_id:del_id,
              id:this.props.match.params.id
            }
            axios.post(AppConstants.API+'/child/updateChild',prg_id)
            .then(res => {   
                if(res.data.Status == "Success"){                           
                    this.setState({
                    errMsg: res.data.msg
                    });
                    setTimeout(() => {
                    this.setState({
                        errMsg: false,
                    });
                    }, 1000);
                    fetch(AppConstants.API+'/child/getUserProfile/'+ this.props.match.params.id).then(res=>{
                        if(res.status == 200){
                            return res.json();
                        }
                    }).then(result=>{
                        console.log("result",result.data.mentor);
                        // if(result.data.length>0){
                            this.setState({
                                mentor:result.data.mentor,
                                // page_loader : true
                            })
                        // }
                    })
                }
                else{
                    this.setState({
                    errMsg: res.data.msg
                    });
                }
            });  
          }
        });
    }
    handleActions(cell, row){
        return (
        <div className="ca-controls">
            {/* <span><Link id={`${"tooltip-"}${row._id}`} style={{ 'fontSize': 12 }} to={"/editprogram/" + row._id} ><button className="btn btn-info"><MdEdit/>
            <UncontrolledTooltip placement="top" target={`${"tooltip-"}${row._id}`}>Edit Program </UncontrolledTooltip>
            </button></Link></span> */}
        
        {this.state.mentor == row._id?
            <span  id={`${"tooltipvt-"}${row._id}`} style={{ 'fontSize': 12 }} to={"/viewChild/" + row._id} className="btn bg-danger  text-white"><AiOutlineUserDelete /> 
            <UncontrolledTooltip placement="top" target={`${"tooltipvt-"}${row._id}`}>Unassign Mentor </UncontrolledTooltip>
            </span>
            :<span id={`${"tooltipvta-"}${row._id}`} style={{ 'fontSize': 12 }} to={"/viewChild/" + row._id} onClick={ this.DeleteProgram(row._id) } className="text-muted "  className="btn btn-success"><AiOutlineUserAdd /><UncontrolledTooltip placement="top" target={`${"tooltipvta-"}${row._id}`}>Assign Mentor </UncontrolledTooltip></span>}
            
        </div>
        );
    }
    desc(cell,row){
        // row.programData.map((res,index)=>{
        //     console.log("149",res.title)

        // })
        return(
          <span >{row.programData.map((prg,i)=><span className="mr-1 ">{prg.title}<br/></span>)}</span>
        )
      }
    toggleSwitch = (e) => {
        this.setState(prevState => {
          return {
            switched: !prevState.switched
          };
        });
      };
    handleStatus(cell, row){
        return (<div className="ca-controls">
        {(row.status == false) && 
        <span style={{'paddingTop': 0,
          'paddingBottom': 0}} className="mr-1 badge badge-warning p-1 cst-inactive" title="Resend Invite">Inactive</span>
        }
        {(row.status == true) && 
        <span style={{'paddingTop': 0,
          'paddingBottom': 0}} className="mr-1 badge badge-success  p-1" title="Resend Invite">Active</span>
        }
        </div>);  
    }
    createCustomInsertButton = (onClick) => {
        return (
          <span> &nbsp; <Link to={"/addprogram"} className="btn btn-warning" title="Add Program"><MdAdd />Add Program</Link>&nbsp;&nbsp;
          {/* {this.state.programs.length>0?
            <Workbook filename="ExportProgram.xlsx" element={<span className="btn btn-secondary editbtn" title="Export Program">Export Program</span>}>
              <Workbook.Sheet data={this.state.programs} name="Sheet A">
              <Workbook.Column label="Title" value="title"/>
              <Workbook.Column label="Status" value="status"/>
              </Workbook.Sheet>
            </Workbook>
            :""} */}
            </span>
        );
    }
    render(){
        console.log("mentor",this.state.mentor)

        const options = {

            insertText: "New",
      
            deleteText: 'Delete',
      
            saveText: 'Save',
      
            closeText: 'Close',
      
            insertBtn: this.createCustomInsertButton,
          
            page: this.state.currentPage,  // which page you want to show as default
      
            sizePerPageList: [ 5, 10, 20, 50], // you can change the dropdown list for size per page
      
            sizePerPage: this.state.sizePerPage,  // which size per page you want to locate as default
      
            pageStartIndex: 1, // where to start counting the pages
      
            paginationSize: 3,  // the pagination bar size.
      
            // paginationShowsTotal: this.this.renderShowsTotal,  //this.renderShowsTotal- Accept bool or function
            paginationShowsTotal : this.state.programs.length,
      
            paginationPosition: 'bottom',  // default is bottom, top and both is all available
      
            onPageChange: this.onPageChange,
      
            onSizePerPageList: this.onSizePerPageList,
      
            onSortChange: this.onSortChange,
      
            onSearchChange: this.onSearchChange,
      
            insertModal: this.createCustomModal, 
      
        }
        return(
            <Loader loaded={this.state.page_loader}  >
            <Page title="Assign Mentor" /*breadcrumbs={[{ name: 'Call Center', active: true }]}*/>
                <ul className="cst-breadcrumb">
                    <li><Link to={'/dashboard'}>Dashboard</Link></li>
                    <li><Link to={'/allChildren'}>All Clients</Link></li>
                    <li>Assign Mentor</li>
                </ul>
                <ReactTitle title="Assign Mentor"/>
                <Row>
                    <Card>
                        <CardBody>
                            <div>
                            <BootstrapTable data={this.state.programs}
                            search={ true } pagination={ true } multiColumnSearch={ true } options={ options }
                            // remote = { true } search={true} pagination={true} fetchInfo={ { dataTotalSize: this.state.totalDataSize } }multiColumnSearch={true} options={options}
                            // insertRow
                            >
                                    <TableHeaderColumn dataField='_id' isKey={true} searchable={false} dataSort={true} hidden={true}>Program ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField='name'  dataSort={true} >Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField='programData'  dataFormat={this.desc.bind(this)} dataSort={true} >Program</TableHeaderColumn>
                                    <TableHeaderColumn dataField='status' width={'20%'} dataSort={true} dataFormat={this.handleStatus.bind(this)}>Status</TableHeaderColumn>
                                    <TableHeaderColumn dataField='actions' width={'10%'} dataFormat={this.handleActions.bind(this)} export={false}>Actions</TableHeaderColumn>
                                </BootstrapTable>
                            </div>
                        </CardBody>
                    </Card>
                </Row>
            </Page>
            </Loader>
        )
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps, {})(Program);