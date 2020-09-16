import React from 'react';
import AppConstants from 'AppConstants';
import {ReactTitle} from 'react-meta-tags';
import Page from 'components/Page';
import { Card, CardBody, Row,UncontrolledTooltip} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {  MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import swal from 'sweetalert';
import axios from 'axios';
import Loader from 'react-loader';

class Cms extends React.Component{
    constructor(){
        super();
        this.state = {
            cms: [],
            page_loader : false
        }
    }
    componentDidMount(){
        fetch(AppConstants.API+'/cms/getAllCms').then(res => {
            if (res.status == 200) {
                return res.json()
            }
        }).then(result=>{
            if(result.Status == "Success"){
                this.setState({cms:result.data, page_loader : true})
            }   
        })
        var element = document.getElementById("navItem-Clients-0");
        element.classList.remove("active");
        var element = document.getElementById("navItem-Mentors-1");
        element.classList.remove("active");
        var element = document.getElementById("navItem-Cms-0");
        element.classList.add("active");
        var element = document.getElementById("navItem-Programs-2");
        element.classList.remove("active");
        var element = document.getElementById("navItem-Events-1");
        element.classList.remove("active");
        if(!this.props.auth.user.user_type){
          element = document.getElementById("navItem-Admins-0");
          element.classList.remove("active");
        }
        var element = document.getElementById("navItem-dashboard-0");
        element.classList.remove("active");
        var element = document.getElementById("navItem-Resources-0");
        element.classList.remove("active");
         // var element = document.getElementById("navItem-Client Habits-0");
      // element.classList.remove("active");
      var element = document.getElementById("navItem-Habits-3");
      element.classList.remove("active");
        var element = document.getElementById("navItem-Help-1");
        element.classList.remove("active");
        var element = document.getElementById("navItem-Help Sugesstions-0");
        element.classList.remove("active");
        var element = document.getElementById("navItem-Help-1");
        element.classList.remove("active");
    }
    showDis(cell, row){
        return <div dangerouslySetInnerHTML={{__html: row.description}} />;
    }
    DeleteCms=(del_id)=>e=>{
        const that = this;
        e.preventDefault();
        swal({
            title: "Are you sure?",
            text: "You want to delete this cms?",
            icon: "warning",
            buttons: true,
            dangerMode: true,   
        })
        .then((willDelete) => {
          if (willDelete) {
            swal("Cms has been deleted!", {
            icon: "success",
            });
            const cms_id = {
              id:del_id
            }
            axios.post(AppConstants.API+'/cms/deleteCms',cms_id)
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
                    fetch(AppConstants.API+'/cms/getAllCms').then(res=>{
                        if(res.status == "200"){
                            return res.json();
                        }
                        })
                        .then(function(data) {
                        if(data.Status == "Success"){
                            that.setState({cms:data.data})
                        }
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
    handleActions(cell,row){
        return  <div className="ca-controls">
                    <span><Link id={`${"tooltip-"}${row._id}`} style={{ 'fontSize': 12 }} to={"/editCms/" + row._id} ><button className="btn btn-info"><MdEdit/><UncontrolledTooltip placement="top" target={`${"tooltip-"}${row._id}`}>Edit Cms </UncontrolledTooltip></button></Link></span>
                    <span id={`${"tooltipdel-"}${row._id}`} onClick={ this.DeleteCms(row._id) } className="text-muted"  className="bg-danger cst-icon"><MdDelete />
                    <UncontrolledTooltip  placement="top" target={`${"tooltipdel-"}${row._id}`}>Delete Cms</UncontrolledTooltip>
                    </span>

                </div>
    }
    handlestatus(cell,row){
        return <div className="ca-controls">
                    {(row.status == 'Inactive') && 
                        <span style={{'paddingTop': 0,'paddingBottom': 0}} className="mr-1 badge badge-warning p-1" title="Resend Invite">
                        </span>
                    }
                    {(row.status == 'Active') && 
                        <span style={{'paddingTop': 0,'paddingBottom': 0}} className="mr-1 badge badge-success  p-1" title="Resend Invite">Active
                        </span>
                    }
             </div>;
    }
    createCustomInsertButton=(onClick)=>{
        return(<span> &nbsp; <Link to={"/AddCms"} className="btn btn-warning" title="Add CMS"><MdAdd />Add CMS</Link></span>)
    }
    render(){
        const options = {

            exportCSVText: 'Export CSV',
          
            insertText: "New",
          
            deleteText: 'Delete',
          
            saveText: 'Save',
          
            closeText: 'Close',
            insertBtn: this.createCustomInsertButton,
            page: 1,  // which page you want to show as default
        
            sizePerPageList: [ {
        
              text: '5', value: 5
        
            }, {
        
              text: '10', value: 10
        
            }, {
        
              text: '20', value: 20
        
            },
            {
        
              text: '50', value: 50
        
            }
          ], // you can change the dropdown list for size per page
        
            sizePerPage: 10,  // which size per page you want to locate as default
        
            pageStartIndex: 1, // where to start counting the pages
        
            paginationSize: 3,  // the pagination bar size.
        
             paginationShowsTotal: this.state.cms.length,  // Accept bool or function
        
            paginationPosition: 'bottom',  // default is bottom, top and both is all available
        
            insertModal: this.createCustomModal
          
          };
        return(
          <Loader loaded={this.state.page_loader}  >

            <Page title="All CMS">
                <ReactTitle title="All CMS"/>
                <ul className="cst-breadcrumb">
                <li><Link to={'/dashboard'}>Dashboard</Link> </li>
                <li>All CMS</li>
                </ul>
                <Row>
                    <Card>
                        <CardBody>
                             <div>
                                <BootstrapTable data={this.state.cms} search={ true } pagination={ true } multiColumnSearch={ true } options={ options }
                                // insertRow
                                >
                                    <TableHeaderColumn dataField='_id' isKey={true} searchable={false} dataSort={true} hidden={true}>Company ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField='title' width={'25%'}  dataSort={true}>Title</TableHeaderColumn>
                                    <TableHeaderColumn dataField='description' dataFormat={this.showDis.bind(this)}   dataSort={true}>Description</TableHeaderColumn>
                                    <TableHeaderColumn dataField='actions' width={'15%'} dataFormat={this.handleActions.bind(this)} export={false}>Actions</TableHeaderColumn>
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
export default connect(mapStateToProps, {})(Cms);