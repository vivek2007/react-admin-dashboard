import Page from 'components/Page';
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Card, CardBody ,Row,UncontrolledTooltip} from 'reactstrap';
import {  MdDelete, MdAdd, MdEdit } from 'react-icons/md';
import placeholderimg from '../../assets/img/placeholder.png';
import AppConstants from 'AppConstants';
import { connect } from 'react-redux';
import {ReactTitle} from 'react-meta-tags';
import swal from 'sweetalert';
import Workbook from 'react-xlsx-workbook';
import Loader from 'react-loader';
class AllUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      errMsg: false,
      loading: '',
      totalDataSize: 0,
      sizePerPage: 10,
      currentPage: 1,
      sortName: '',
      sortOrder: '',
      searchText: '',
      res1 : [],
      page_loader : false
    };
    this.format = this.format.bind(this);
    //this.handleSubmit=this.handleSubmit.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSizePerPageList = this.onSizePerPageList.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this); 
    this.renderShowsTotal = this.renderShowsTotal.bind(this); 

  }
  renderShowsTotal(start, to, paginationShowsTotal) {
    return (
    <span >
       Showing rows { start } to { to } of { paginationShowsTotal }
    </span>
    );
  }
  DeleteEvent = params => e => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "You want to delete this Event?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Event data has been deleted!", {
          icon: "success",
        });
        const eventdeletedata = {
          id: params
        }
        axios.post(AppConstants.API + '/events/deleteEvent/', eventdeletedata)
          .then(res => {
            if (res.data.Status === "Success") {
              this.setState({
                errMsg: res.data.msg
              });
              setTimeout(() => {
                this.setState({
                  errMsg: false,
                });
              }, 1000);
              this.updateProvidersList(this.state.currentPage, this.state.sizePerPage, this.state.sortName, this.state.sortOrder, this.state.searchText);            
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

  // dateFormat(cell,row) {
  //   if(row.dateofevent != ''){
  //     console.log("row.dateofevent",row.dateofevent)
  //     var returndate;
  //     var date =row.dateofevent;
  //     var date = new Date(date);  
  //     var hours =date.getHours();
  //     var minutes =date.getMinutes();
  //     var ampm = hours >= 12 ? 'PM' : 'AM';
  //     hours = hours % 12;
  //     hours = hours ? hours : 12; // the hour '0' should be '12'
  //     minutes = minutes < 10 ? '0'+minutes : minutes;
  //     var strTime = hours + ':' + minutes + '' + ampm;
  //     return date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear() + " " + strTime;
  //   }
  
  // }
  
  
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

  format(cell, row) {
    return <div className="ca-controls">
      <span><Link id={`${"tooltip-"}${row._id}`} style={{ 'fontSize': 12 }} to={"/editEvent/" + row._id} ><button className="btn btn-info"><MdEdit/><UncontrolledTooltip placement="top" target={`${"tooltip-"}${row._id}`}>Edit Event </UncontrolledTooltip></button></Link></span>
      <span  id={`${"tooltipdel-"}${row._id}`} onClick={this.DeleteEvent(row._id)} ><a className="bg-danger cst-icon"><MdDelete/> <UncontrolledTooltip placement="top" target={`${"tooltipdel-"}${row._id}`}>Delete Event</UncontrolledTooltip></a></span>
      </div>;
  }

  imgformat(cell, row) {
    if(row.profile_image)
    return <div className="tbl-img"><span><img src={AppConstants.API+'/public/uploads/'+ row.profile_image} alt={row.profile_image} className="img-responsive" /></span></div>;
	else
	return <div className="tbl-img"><span><img src={placeholderimg} alt={row.profile_image} className="img-responsive" /></span></div>;
  }

  handleStatus(cell, row) {
    return <div className="ca-controls">
    {(row.status == false) && 
    <span style={{'paddingTop': 0,
'paddingBottom': 0}} className="mr-1 badge badge-warning p-1 cst-inactive" title="Resend Invite">Inactive</span>
    }
    {(row.status == true) && 
    <span style={{'paddingTop': 0,
'paddingBottom': 0}} className="mr-1 badge badge-success  p-1" title="Resend Invite">Active</span>
    }
   </div>;
  } 
  // Program(cell,row){
  //   // console.log("row",row.program[0].name);
  //   return row.program[0].name
  // }

  createCustomInsertButton = (onClick) => {
    return (
      <span> &nbsp; <Link to={"/AddEvent"} className="btn btn-warning" title="Add Event"><MdAdd />Add Event</Link> &nbsp; &nbsp;
      {/* {this.state.users.length>0?
        <Workbook filename="ExportEvents.xlsx" element={<span className="btn btn-secondary editbtn" title="Export Events">Export Events</span>}>
          <Workbook.Sheet data={this.state.users} name="Sheet A">
          <Workbook.Column label="Name" value="title"/>
          <Workbook.Column label="Email" value="description"/>
          <Workbook.Column label="Start Date" value="dateofevent"/>
          <Workbook.Column label="End Date" value="endDate"/>
          <Workbook.Column label="Address1" value="address1"/>
          <Workbook.Column label="Address2" value="address2"/>
          <Workbook.Column label="State" value="state"/>
          <Workbook.Column label="City" value="city"/>
          <Workbook.Column label="Zipcode" value="zipcode"/>
          <Workbook.Column label="Event Link" value="event_link"/>
          <Workbook.Column label="Status" value="status"/>
          </Workbook.Sheet>
        </Workbook>
        :""} */}
        </span>
    );
  }
  componentDidMount() {
    this.updateProvidersList(this.state.currentPage, this.state.sizePerPage, this.state.sortName, this.state.sortOrder, this.state.searchText);
    var element = document.getElementById("navItem-Clients-0");
      element.classList.remove("active");
      var element = document.getElementById("navItem-Mentors-1");
      element.classList.remove("active");
      var element = document.getElementById("navItem-Cms-0");
      element.classList.remove("active");
      var element = document.getElementById("navItem-Programs-2");
      element.classList.remove("active");
      var element = document.getElementById("navItem-Events-1");
      element.classList.add("active");
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

    
    axios.post(AppConstants.API+'/events/getAllEvents', tablefilterdata).then(res => {
        if (res.data.Status === 'Success') {
          console.log("237",res.data.data)
          this.setState({
             users: res.data.data,
            //totalDataSize: res.data.total_records,
            currentPage: page,
            sizePerPage: sizePerPage,
            sortName: sortName,
            sortOrder: sortOrder,
            serchtext: searchText,
            defaultSearchText: searchText,
            page_loader : true
  
          });
        }         
      });
    axios.post(AppConstants.API+'/events/getAllEventsCount', tablefilterdata).then(res => {
      console.log("res.data.data",res.data.data)
      if (res.data.Status === 'Success') {
        this.setState({
          totalDataSize: res.data.data,
           serchText: searchText,
           defaultSearchText: searchText
        });
      }         
    });
    this.setState({
      paginationShowsTotal: [this.state.users.length]
    });
  }
  render() {
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

      //paginationShowsTotal: this.state.users.length,  //this.renderShowsTotal- Accept bool or function

      paginationPosition: 'bottom',  // default is bottom, top and both is all available

      onPageChange: this.onPageChange,

      onSizePerPageList: this.onSizePerPageList,

      onSortChange: this.onSortChange,

      onSearchChange: this.onSearchChange,

      insertModal: this.createCustomModal, 

      paginationShowsTotal: this.renderShowsTotal
      
      // prePage: 'Prev', // Previous page button text

      //nextPage: 'Next', // Next page button text

      //firstPage: 'First', // First page button text

      //lastPage: 'Last', // Last page button text

      // hideSizePerPage: true > You can hide the dropdown for sizePerPage

      // alwaysShowAllBtns: true // Always show next and previous button

      // withFirstAndLast: false > Hide the going to First and Last page button    

    };
    return (
      <Loader loaded={this.state.page_loader}  >
      <Page title="All Events" /*breadcrumbs={[{ name: 'Call Center', active: true }]}*/>
        <ReactTitle title="All Events"/>
        <ul className="cst-breadcrumb">
          <li><Link to={'/dashboard'}>Dashboard</Link> </li>
          <li>All Events</li>
        </ul>
        <Row>
          <Card>
            <CardBody>
              <div>
                <BootstrapTable data={this.state.users} remote = { true } search={true} pagination={true} fetchInfo={ { dataTotalSize: this.state.totalDataSize } }multiColumnSearch={true} options={options}
                  insertRow
                >
                  <TableHeaderColumn dataField='_id' isKey={true} searchable={false} dataSort={true} hidden={true}>Company ID</TableHeaderColumn>
                  <TableHeaderColumn dataField='title'  dataSort={true}>Title</TableHeaderColumn>
                  <TableHeaderColumn dataField='program' width={'18%'}  dataSort={true}>Program</TableHeaderColumn>
                  <TableHeaderColumn dataField='dateofevent'  width={'12%'}   dataSort={true}>Start Date</TableHeaderColumn>
                  <TableHeaderColumn dataField='endDate'  width={'12%'}   dataSort={true}>End Date</TableHeaderColumn>
                  <TableHeaderColumn dataField='status' width={'10%'} dataSort={true} dataFormat={this.handleStatus.bind(this)}>Status</TableHeaderColumn>
                  <TableHeaderColumn dataField='actions' width={'15%'} dataFormat={this.format.bind(this)} export={false}>Actions</TableHeaderColumn>
                </BootstrapTable>
              </div>
            </CardBody>
          </Card>
        </Row>
      </Page>
      </Loader>
    );
  }
};
const mapStateToProps = (state) => ({
  auth: state.auth
});
export  default connect(mapStateToProps, {})(AllUsers);
