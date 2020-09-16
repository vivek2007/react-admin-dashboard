import React from 'react';
import AppConstants from 'AppConstants';
import {ReactTitle} from 'react-meta-tags';
import Page from 'components/Page';
import { Card, CardBody, Row, UncontrolledTooltip} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { MdDelete,MdEmail, MdRemoveRedEye, MdAdd, MdEdit } from 'react-icons/md';
import swal from 'sweetalert';
import Workbook from 'react-xlsx-workbook';
class AllEventFeedback extends React.Component{
    constructor(){
        super();
        this.state = {
            EventFeedbacks: [],
            totalDataSize: 0,
            sizePerPage: 10,
            currentPage: 1,
            sortName: '',
            sortOrder: '',
            searchText: '',
        }
        this.onPageChange = this.onPageChange.bind(this);
        this.onSizePerPageList = this.onSizePerPageList.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this); 
        this.renderShowsTotal = this.renderShowsTotal.bind(this);
    }
    renderShowsTotal(start, to, paginationShowsTotal){
        return (
            <span>
               Showing rows { start } to { to } of { paginationShowsTotal }
            </span>
            );
    }
    onSizePerPageList(sizePerPage) {
        let page = 1;
        this.updateProvidersList(page, sizePerPage, this.state.sortName, this.state.sortOrder, this.state.searchText);
    }
    onPageChange(page, sizePerPage) {
        this.updateProvidersList(page, sizePerPage, this.state.sortName, this.state.sortOrder, this.state.defaultSearchText);
    }
    onSortChange(sortName, sortOrder) {  
        let page = 1;
        this.updateProvidersList(page, this.state.sizePerPage, sortName, sortOrder, this.state.searchText);
    }
    onSearchChange(searchText, colInfos, multiColumnSearch) {
        if(searchText && searchText !== "") {
        searchText = searchText;
        }else  {  
        searchText = '';
        }
        let page = 1;
        this.updateProvidersList(page, this.state.sizePerPage, this.state.sortName, this.state.sortOrder, searchText);
    }
    updateProvidersList(page, sizePerPage, sortName, sortOrder, searchText){
        if(searchText && searchText !== "") {
            searchText = searchText;
        }else if(this.state.searchText && this.state.searchText !== "") {
            searchText = this.state.searchText;
        }else {
            searchText = '';
        }
        let tablefilterdata = {
            page: page,
            sizeperpage: sizePerPage,
            sortname: sortName,
            sortorder: sortOrder,
            serchtext: searchText,
            defaultSearchText: searchText

        };  
       
        axios.post(AppConstants.API+'/feedback/getAllEventsFeedInfo', tablefilterdata).then(res => {
            if (res.data.Status === 'Success') {
                console.log("res.data.data",res.data.data)
                    this.setState({
                        EventFeedbacks: res.data.data,
                        //totalDataSize: res.data.total_records,
                        currentPage: page,
                        sizePerPage: sizePerPage,
                        sortName: sortName,
                        sortOrder: sortOrder,
                        serchtext: searchText,
                        defaultSearchText: searchText
                    });
            }         
        });
        axios.post(AppConstants.API+'/feedback/getAllEventsFeedInfoCount', tablefilterdata).then(res => {
            if (res.data.Status === 'Success') {
                this.setState({
                    totalDataSize: res.data.data,
                    serchText: searchText,
                    defaultSearchText: searchText
                });
            }         
        });
        this.setState({
            paginationShowsTotal: [this.state.EventFeedbacks.length]
        });
    }
    componentDidMount(){
        this.updateProvidersList(this.state.currentPage, this.state.sizePerPage, this.state.sortName, this.state.sortOrder, this.state.searchText);
        var element = document.getElementById("navItem-Clients-0");
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
        element.classList.remove("active");
        var element = document.getElementById("navItem-Feeling Journals-0");
        element.classList.remove("active");
        var element = document.getElementById("navItem-Parent Habits-1");
        element.classList.remove("active");
        var element = document.getElementById("navItem-Client Habits-0");
        element.classList.remove("active");
        var element = document.getElementById("navItem-Mentor Habits-2");
        element.classList.remove("active");
        var element = document.getElementById("navItem-Help Sugesstions-0");
        element.classList.remove("active");
        var element = document.getElementById("navItem-Help-1");
        element.classList.remove("active");
        var element = document.getElementById("navItem-App Feedback-0");
        element.classList.remove("active");
        var element = document.getElementById("navItem-Event Feedback-1");
        element.classList.add("active");
    }
    handleName(cell,row){
        if(row.user_type == 'parent' || row.user_type == 'Parent'){
            return(
                <Link style={{'paddingTop': 0,
                'paddingBottom': 0}}  to={"/viewParent/" + row.parent_id}>
                  {row.name}
                </Link>
              )
        }else if(row.user_type == 'mentor' || row.user_type == 'Mentor'){
            return(
                <Link style={{'paddingTop': 0,
                'paddingBottom': 0}}  to={"/viewMentor/" + row.mentor_id}>
                  {row.name}
                </Link>
              )
        }else{
            return(
                <Link style={{'paddingTop': 0,
                'paddingBottom': 0}}  to={"/viewChild/" + row.child_id}>
                  {row.name}
                </Link>
              ) 
        }
       
    }
    handleActions(cell,row){
        return <div className="ca-controls">
         
            <Link id={`${"tooltipview-"}${row._id}`} style={{ 'fontSize': 12 }} to={"/viewEventFeedback/" + row._id} ><button className="btn btn-success"><MdRemoveRedEye />
            <UncontrolledTooltip placement="top" target={`${"tooltipview-"}${row._id}`}>View Event Feedback </UncontrolledTooltip>
            </button></Link>
           
        </div>
    }
    
    createCustomInsertButton=(onClick)=>{
        return(
        // <span> &nbsp; <Link to={"/addmentor"} className="btn btn-warning" title="Add Mentor"><MdAdd />Add Mentor</Link></span>
        <span>
            {this.state.EventFeedbacks.length>0?
                <Workbook filename="ExportEventFeedbacks.xlsx" element={<span className="btn btn-secondary editbtn" title="Export EventFeedbacks">Export EventFeedbacks</span>}>
                <Workbook.Sheet data={this.state.EventFeedbacks} name="Sheet A">
                {/* <Workbook.Column label="Name" width={10} value="name"/> */}
                <Workbook.Column label="Name" width={10} value="name"/>
                <Workbook.Column label="User Type" width={10} value="user_type"/>
                <Workbook.Column label="Event" width={10} value="title"/>
                {/* <Workbook.Column label="How many Music Club events have you attended?"  value="attended_events"/>
                <Workbook.Column label="How well did this event meet your expectations?"  value="meet_your_expectations"/>
                <Workbook.Column label="As a result of attending this event, do you feel less stressed or anxious?"  value="result_of_event"/>
                <Workbook.Column label="Has attending this event positively influenced your feelings about yourself?"  value="feelings_about_yourself"/>
                <Workbook.Column label="How would you rate this experience? (Mark “X” above all that apply)"  value="rate_this_experience"/>
                <Workbook.Column label="What part of this event did you enjoy and why?"  value="part_you_enjoy"/>
                <Workbook.Column label="How could we improve this event? "  value="improve_this_app"/> */}
                <Workbook.Column label="Additional comments"  value="addt_comments"/>
                </Workbook.Sheet>
                </Workbook>
            :""}
        </span>
        )
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

            paginationPosition: 'bottom',  // default is bottom, top and both is all available
      
            onPageChange: this.onPageChange,
      
            onSizePerPageList: this.onSizePerPageList,
      
            onSortChange: this.onSortChange,
      
            onSearchChange: this.onSearchChange,
      
            insertModal: this.createCustomModal, 
      
            paginationShowsTotal: this.renderShowsTotal
            
        };
        return(
            <Page title="All EventFeedbacks">
                <ReactTitle title="All EventFeedbacks"/>
                <ul className="cst-breadcrumb">
                <li><Link to={'/dashboard'}>Dashboard</Link> </li>
                <li>All EventFeedbacks</li>
                </ul>
                <Row>
                    <Card>
                        <CardBody>
                             <div>
                                <BootstrapTable data={this.state.EventFeedbacks} remote = { true } search={true} pagination={true} fetchInfo={ { dataTotalSize: this.state.totalDataSize } }multiColumnSearch={true} options={options}
                                 insertRow
                                >
                                    <TableHeaderColumn dataField='_id' isKey={true} searchable={false} dataSort={true} hidden={true}>Company ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField='name' dataFormat={this.handleName.bind(this)} dataSort={true}>Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField='user_type'  dataSort={true}>User Type</TableHeaderColumn>
                                    <TableHeaderColumn dataField='title'  dataSort={true}>Event</TableHeaderColumn>
                                        <TableHeaderColumn dataField="created_date"  dataSort={true}>Created 
                                        date</TableHeaderColumn>
                                    <TableHeaderColumn dataField='actions' width={'15%'} dataFormat={this.handleActions.bind(this)} export={false}>Actions</TableHeaderColumn>
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
export default connect(mapStateToProps, {})(AllEventFeedback);