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
import Loader from 'react-loader';
class FeelingJournals extends React.Component{
    constructor(){
        super();
        this.state = {
            feelingjournal: [],
            totalDataSize: 0,
            sizePerPage: 10,
            currentPage: 1,
            sortName: '',
            sortOrder: '',
            searchText: '',
            page_loader : false
        }
        this.onPageChange = this.onPageChange.bind(this);
        this.onSizePerPageList = this.onSizePerPageList.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this); 
        this.renderShowsTotal = this.renderShowsTotal.bind(this);
    }
    renderShowsTotal(start, to, paginationShowsTotal){
        return (
            <span >
               Showing rows { start } to { to } of { paginationShowsTotal }
            </span>
            );
    }
    statusChange(cell, row) {
        return(
          <Link style={{'paddingTop': 0,
          'paddingBottom': 0}}  to={"/viewChild/" + row._id}>
            {row.status == false ? <span className="mr-1 badge badge-warning p-1 cst-inactive">Inactive</span> : <span className="mr-1 badge badge-success  p-1">Active</span>}
          </Link>
        )
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
    handleActions(cell,row){
        return <div className="ca-controls">
            <Link id={`${"tooltipview-"}${row._id}`} style={{ 'fontSize': 12 }} to={"/viewFeelingJournal/" + row._id} ><button className="btn btn-success"><MdRemoveRedEye />
            <UncontrolledTooltip placement="top" target={`${"tooltipview-"}${row._id}`}>View Feeling Journals </UncontrolledTooltip>
            </button></Link>
        </div>
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
       
        axios.post(AppConstants.API+'/feelingjournal/getAllJournalInfo', tablefilterdata).then(res => {
            if (res.data.Status === 'Success') {
                    this.setState({
                        feelingjournal: res.data.data,
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
        axios.post(AppConstants.API+'/feelingjournal/getAllJournalInfoCount', tablefilterdata).then(res => {
            if (res.data.Status === 'Success') {
                this.setState({
                    totalDataSize: res.data.data,
                    serchText: searchText,
                    defaultSearchText: searchText,
                    page_loader : true
                });
            }         
        });
        this.setState({
            paginationShowsTotal: [this.state.feelingjournal.length]
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
        element.classList.add("active");
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
        element.classList.remove("active");
    }
  
    
    handleApproval(cell,row){
        return(
          <Link style={{'paddingTop': 0,
          'paddingBottom': 0}}  to={"/viewChild/" + row._id}>
           { row.name}
          </Link>
        )
      }
    createCustomInsertButton=(onClick)=>{
        return(
        // <span> &nbsp; <Link to={"/addmentor"} className="btn btn-warning" title="Add Mentor"><MdAdd />Add Mentor</Link></span>
        <span>
           { console.log("this.state.feelingjournal",this.state.feelingjournal)}
            {this.state.feelingjournal.length>0?
           
                <Workbook filename="FeelingJournals.xlsx" element={<span className="btn btn-secondary editbtn" title="Export Feeling Journals">Export Feeling Journals</span>}>
                <Workbook.Sheet data={this.state.feelingjournal} name="Sheet A">
                <Workbook.Column label="Name" width={10} value="childname"/>
                <Workbook.Column label="From my point of view, here is what happened today" value="happennd_today"/>
                <Workbook.Column label="The situation affected (i.e. myself, parents, friends, parole officer)"  value="situation_affected"/>
                <Workbook.Column label="This situation made me feel (i.e. angry, frustrated, left out, confused)"  value="situation_made_me_feel"/>
                <Workbook.Column label="Created Date"  value="created_date"/>
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
            <Loader loaded={this.state.page_loader}  >
            <Page title="All Feeling Journals">
                <ReactTitle title="All Feeling Journals"/>
                <ul className="cst-breadcrumb">
                <li><Link to={'/dashboard'}>Dashboard</Link> </li>
                <li>All Feeling Journals</li>
                </ul>
                <Row>
                    <Card>
                        <CardBody>
                             <div>
                                <BootstrapTable data={this.state.feelingjournal} remote = { true } search={true} pagination={true} fetchInfo={ { dataTotalSize: this.state.totalDataSize } }multiColumnSearch={true} options={options}
                                 insertRow
                                >
                                <TableHeaderColumn dataField='_id' isKey={true} searchable={false} dataSort={true} hidden={true}>Company ID</TableHeaderColumn>
                                <TableHeaderColumn dataField='name' dataFormat={this.handleApproval.bind(this)} dataSort={true}>Name</TableHeaderColumn>
                                <TableHeaderColumn dataField='user_type' width={'15%'}  dataSort={true}>UserType</TableHeaderColumn>
                                <TableHeaderColumn dataField='email' width={'30%'}  dataSort={true}>Email</TableHeaderColumn>
                                <TableHeaderColumn dataField='status' width={'10%'} dataSort={true} dataFormat={this.statusChange.bind(this)}>Status</TableHeaderColumn>
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
export default connect(mapStateToProps, {})(FeelingJournals);