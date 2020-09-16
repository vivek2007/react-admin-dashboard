import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AppConstants from 'AppConstants';
import {ReactTitle} from 'react-meta-tags';
import Page from 'components/Page';
import { Card, CardBody, Row, UncontrolledTooltip} from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { MdRemoveRedEye, MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import Workbook from 'react-xlsx-workbook';
class ThermoQues extends React.Component{
    constructor(){
        super();
        this.state={
            questions : []
        } 
    }
    componentDidMount(){
        fetch(AppConstants.API+"/thermometerQues/getAllThermoQuestions").then(res => {
            if(res.status == 200){
                return res.json()
            }
        }).then(data=>{
            if(data.Status == "Success"){
                this.setState({questions:data.data})
            }
        })
        var element = document.getElementById("navItem-Students-0");
        element.classList.remove("active");
        var element = document.getElementById("navItem-Parents-1");
        element.classList.remove("active");
        var element = document.getElementById("navItem-Mentors-2");
        element.classList.remove("active");
        var element = document.getElementById("navItem-Cms-0");
        element.classList.remove("active");
        var element = document.getElementById("navItem-Programs-3");
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
        var element = document.getElementById("navItem-Languages-1");
        element.classList.remove("active");
        var element = document.getElementById("navItem-Thermometer Questions-0");
        element.classList.add("active");
        var element = document.getElementById("navItem-Feeling Journals-0");
        element.classList.remove("active");
        var element = document.getElementById("navItem-Parent TO-DOS-1");
        element.classList.remove("active");
        var element = document.getElementById("navItem-Student TO-DOS-0");
        element.classList.remove("active");
        var element = document.getElementById("navItem-Mentor TO-DOS-2");
        element.classList.remove("active");
        var element = document.getElementById("navItem-Help Sugesstions-0");
        element.classList.remove("active");
        var element = document.getElementById("navItem-Help-1");
        element.classList.remove("active");
        var element = document.getElementById("navItem-App Feedback-0");
        element.classList.remove("active");
        var element = document.getElementById("navItem-Event Feedback-1");
        element.classList.remove("active");
    }
    createCustomInsertButton = (onClick) => {
        return (
            <span>
                <Link to={"/addthermoques"} className="btn btn-warning" title="Add Question"><MdAdd />
                    Add Question
                </Link>&nbsp;&nbsp;
                {this.state.questions.length>0?
                    <Workbook filename="ExportQuestions.xlsx" element={<span className="btn btn-secondary editbtn" title="Export Questions">Export Questions</span>}>
                        <Workbook.Sheet data={this.state.questions} name="Sheet A">
                        <Workbook.Column label="City" value="city"/>
                        <Workbook.Column label="Zipcode" value="zipcode"/>
                        <Workbook.Column label="Status" value="status"/>
                        </Workbook.Sheet>
                    </Workbook>
                :""}
            </span>
        );
    }
    handleStatus(cell,row){
        return(
            <span>
              {row.status == false ? <span className="mr-1 badge badge-warning p-1 cst-inactive">Inactive</span> : <span className="mr-1 badge badge-success  p-1">Active</span>}
            </span>
          )
    }
    deleteQuestion=(del_id)=>e=>{
        const that = this;
        e.preventDefault();
        swal({
            title: "Are you sure?",
            text: "You want to delete this question?",
            icon: "warning",
            buttons: true,
            dangerMode: true,   
        })
        .then((willDelete) => {
          if (willDelete) {
            swal("Question has been deleted!", {
            icon: "success",
            });
           
            axios.post(AppConstants.API+'/thermometerQues/deleteThermoQues/'+del_id)
            .then(res => {  
                console.log(res) 
                if(res.data.Status == "Success"){                           
                    this.setState({
                    errMsg: res.data.msg
                    });
                    setTimeout(() => {
                    this.setState({
                        errMsg: false,
                    });
                    }, 1000);
                    fetch(AppConstants.API+'/thermometerQues/getAllThermoQuestions').then(res=>{
                        if(res.status == "200"){
                            return res.json();
                        }
                        })
                        .then(function(data) {
                        if(data.Status == "Success"){
                            that.setState({questions:data.data})
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
        return <div className="ca-controls">
                    <Link id={`${"tooltip-"}${row._id}`} style={{ 'fontSize': 12 }} to={"/editQuestion/" + row._id} >
                        <button className="btn btn-info"><MdEdit/>
                        <UncontrolledTooltip placement="top" target={`${"tooltip-"}${row._id}`}>Edit Question </UncontrolledTooltip>&nbsp;</button>
                    </Link>
                    <span id={`${"tooltipdel-"}${row._id}`} onClick={ this.deleteQuestion(row._id) } className="text-muted" className="bg-danger cst-icon"><MdDelete/><UncontrolledTooltip placement="top" target={`${"tooltipdel-"}${row._id}`}>Delete Question </UncontrolledTooltip></span>
              </div>;
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
            paginationShowsTotal : this.state.questions.length,
      
            paginationPosition: 'bottom',  // default is bottom, top and both is all available
      
            onPageChange: this.onPageChange,
      
            onSizePerPageList: this.onSizePerPageList,
      
            onSortChange: this.onSortChange,
      
            onSearchChange: this.onSearchChange,
      
            insertModal: this.createCustomModal, 
                  
          };
        return(
            <Page title="Thermometer Questions">
            <ReactTitle title="Thermometer Questions"/>
            <ul className="cst-breadcrumb">
              <li><Link to={'/dashboard'}>Dashboard</Link> </li>
              <li>Thermometer Questions</li>
            </ul>
            <Row>
                <Card>
                    <CardBody>
                        <div>
                        <BootstrapTable data={this.state.questions}
                        search={ true } pagination={ true } multiColumnSearch={ true } options={ options }
                        insertRow
                        >
                            <TableHeaderColumn dataField='_id' isKey={true} searchable={false} dataSort={true} hidden={true}>Child ID</TableHeaderColumn>
                            <TableHeaderColumn dataField='ques'  dataSort={true}>Question</TableHeaderColumn>
                            <TableHeaderColumn dataField='status' width={'20%'} dataSort={true} dataFormat={this.handleStatus.bind(this)}>Status</TableHeaderColumn>
                            <TableHeaderColumn dataField='actions' width={'20%'} dataFormat={this.handleActions.bind(this)} export={false}>Actions</TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    </CardBody>
                </Card>
            </Row>
            </Page>
        )
    }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, {})(ThermoQues);