import React from 'react';
import { Link } from 'react-router-dom';
import AppConstants from 'AppConstants';
import {ReactTitle} from 'react-meta-tags';
import Page from 'components/Page';
import { Card, CardBody, Row,UncontrolledTooltip} from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import axios from 'axios';
import Workbook from 'react-xlsx-workbook';
import Loader from 'react-loader';
let data1 = [];
class AllTodos extends React.Component{
    constructor(){
        super();
        this.state = {
            todos : [],
            switched : false,
            user_type:[],
            page_loader : false
        }
    }
    componentDidMount(){
        // console.log(AppConstants.API+'/todos/getAllTodos')
        data1 = [];
        fetch(AppConstants.API+'/todos/getAllParentTodos').then(res=>{
            if(res.status == 200){
                return res.json();
            }
        }).then(result=>{
            if(result.data.length>0){
                this.setState({todos:result.data})
                {result.data.map((todos, i) => {
                this.setState({
                    user_type:todos.user_type,
                    page_loader : true
                })

                    // console.log(todos,todos.program)
                    // var reso = []
                    // todos.resources.map((item,i)=>{
                    //     reso.push(item.name)
                    // })
                    //     var obj={};
                    //     obj['title'] = todos.title;
                    //     obj['description'] = todos.description;
                    //     obj['status'] = todos.status;
                    //     obj['resources'] = reso;
                    //     data1.push(obj);
                      }
                    )
                }
                // console.log(data1)
            }
        })
        var element = document.getElementById("navItem-Clients-0");
      element.classList.remove("active");
      var element = document.getElementById("navItem-Mentors-1");
      element.classList.remove("active");
      var element = document.getElementById("navItem-Cms-0");
      element.classList.remove("active");
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
      var element = document.getElementById("navItem-Client Habits-0");
      element.classList.remove("active");
      var element = document.getElementById("navItem-Mentor Habits-2");
      element.classList.add("active");
      var element = document.getElementById("navItem-Help-1");
      element.classList.remove("active");
    }

    DeleteTodo=(del_id)=>e=>{
        const that = this;
        e.preventDefault();
        swal({
            title: "Are you sure?",
            text: "You want to delete this Habit?",
            icon: "warning",
            buttons: true,
            dangerMode: true,   
        })
        .then((willDelete) => {
          if (willDelete) {
            swal("Todo has been deleted!", {
            icon: "success",
            });
            const todo_id = {
              id:del_id
            }
            axios.post(AppConstants.API+'/todos/deleteParentTodo',todo_id)
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
                    fetch(AppConstants.API+'/todos/getAllParentTodos').then(res=>{
                        if(res.status == "200"){
                            return res.json();
                        }
                        })
                        .then(function(data) {
                        if(data.Status == "Success"){
                            that.setState({todos:data.data})
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
    handleActions(cell, row){
        return (
        <div className="ca-controls">
            <span><Link id={`${"tooltip-"}${row._id}`} style={{ 'fontSize': 12 }} to={"/editStudentTodo/" + row._id+"/parent"} ><button className="btn btn-info"><MdEdit/>
            <UncontrolledTooltip placement="top" target={`${"tooltip-"}${row._id}`}>Edit Habit </UncontrolledTooltip>
            </button></Link></span>
            <span id={`${"tooltipdel-"}${row._id}`} onClick={ this.DeleteTodo(row._id) } className="text-muted"  className="bg-danger cst-icon"><MdDelete />
            <UncontrolledTooltip placement="top" target={`${"tooltipdel-"}${row._id}`}>Delete Habit</UncontrolledTooltip>
            </span>
        </div>
        );
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
          <span> &nbsp; <Link to={"/addStudentTodo/" + 'parent'} className="btn btn-warning" title="Add Habit"><MdAdd />Add Habit</Link>&nbsp;&nbsp;{this.state.todos.length>0?
            <Workbook filename="ExportParentHabits.xlsx" element={<span className="btn btn-secondary editbtn" title="Export Parent Habits">Export Parent Habits</span>}>
              <Workbook.Sheet data={this.state.todos} name="Sheet A">
              <Workbook.Column label="Title" value="title"/>
              <Workbook.Column label="Description" value="description"/>
              <Workbook.Column label="Programs" value="program"/>
              <Workbook.Column label="Status" value="status"/>
              </Workbook.Sheet>
            </Workbook>
            :""}</span>
        );
    }
    render(){
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
            paginationShowsTotal : this.state.todos.length,
      
            paginationPosition: 'bottom',  // default is bottom, top and both is all available
      
            onPageChange: this.onPageChange,
      
            onSizePerPageList: this.onSizePerPageList,
      
            onSortChange: this.onSortChange,
      
            onSearchChange: this.onSearchChange,
      
            insertModal: this.createCustomModal, 
      
        }
        return(
            <Loader loaded={this.state.page_loader}  >
            <Page title="All Parent Habits">
                <ReactTitle title="All Parent Habits"/>
                <ul className="cst-breadcrumb">
                <li><Link to={'/dashboard'}>Dashboard</Link> </li>
                <li>All Parent Habits</li>
                </ul>
                <Row>
                    <Card>
                        <CardBody>
                            <div>
                            <BootstrapTable data={this.state.todos}
                            search={ true } pagination={ true } multiColumnSearch={ true } options={ options }
                            // remote = { true } search={true} pagination={true} fetchInfo={ { dataTotalSize: this.state.totalDataSize } }multiColumnSearch={true} options={options}
                            insertRow
                            >
                                    <TableHeaderColumn dataField='_id' isKey={true} searchable={false} dataSort={true} hidden={true}>Todo ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField='title'  dataSort={true} >Title</TableHeaderColumn>
                                    <TableHeaderColumn dataField='description'  dataSort={true}>Description</TableHeaderColumn>
                                    <TableHeaderColumn dataField='status' width={'15%'} dataSort={true} dataFormat={this.handleStatus.bind(this)}>Status</TableHeaderColumn>
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
export default connect(mapStateToProps, {})(AllTodos);