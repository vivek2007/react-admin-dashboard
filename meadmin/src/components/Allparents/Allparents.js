import Page from 'components/Page';
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Card, CardBody ,Row, UncontrolledTooltip} from 'reactstrap';
import { MdDelete,MdEmail, MdRemoveRedEye, MdQueryBuilder, MdDone } from 'react-icons/md';
import placeholderimg from '../../assets/img/placeholder.png';
import AppConstants from 'AppConstants';
import { connect } from 'react-redux';
import {ReactTitle} from 'react-meta-tags';
import swal from 'sweetalert';
import Loading from 'assets/img/loader.gif';
import Workbook from 'react-xlsx-workbook';
import Loader from 'react-loader';
import { FaFileExport } from "react-icons/fa";

let call = '';
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


  onSizePerPageList(sizePerPage) {
    let page = 1;
    this.updateProvidersList(page, sizePerPage, this.state.sortName, this.state.sortOrder, this.state.searchText);
  }
  onPageChange(page, sizePerPage) {
    console.log(page,"page");
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
  DeleteParent = (del_id) => e =>{
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "You want to delete this parent?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Parent has been deleted!", {
          icon: "success",
          });
          const parent_data = {
            id:del_id
          }
          axios.post(AppConstants.API+'/parent/deleteParent',parent_data)
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
              this.updateProvidersList(this.state.currentPage, this.state.sizePerPage, this.state.sortName, this.state.sortOrder, this.state.searchText);
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
  format(cell, row) {
    return <div className="ca-controls">
      <span>
        
      {/* <Link style={{ 'fontSize': 12 }} to={"/addParentChild/" + row._id} title="Add Child"><button className="btn btn-info"><MdAdd/>&nbsp;Add Child</button></Link> */}
      </span>
      {/* <span><Link id={`${"tooltip-"}${row._id}`} style={{ 'fontSize': 12 }} to={"/editParent/" + row._id} ><button className="btn btn-info"><MdEdit/>
      <UncontrolledTooltip placement="top"target={`${"tooltip-"}${row._id}`}>Edit Parent </UncontrolledTooltip>
      </button></Link></span> */}
      <span>
      <Link id={`${"tooltipview-"}${row._id}`} style={{ 'fontSize': 12 }} to={"/viewParent/" + row._id} ><button className="btn btn-success"><MdRemoveRedEye />
      <UncontrolledTooltip placement="top"target={`${"tooltipview-"}${row._id}`}>View Parent </UncontrolledTooltip>
      </button></Link> </span>
      <span id={`${"tooltipdel-"}${row._id}`} onClick={ this.DeleteParent(row._id) } className="text-muted"  className="bg-danger cst-icon"><MdDelete />
      <UncontrolledTooltip placement="top" target={`${"tooltipdel-"}${row._id}`}>Delete Parent</UncontrolledTooltip>
      </span>

    </div>;
  }
  // handleApproval(cell,row){
  //   return(
  //     <Link className="stat-btn-cst" style={{'paddingTop': 0,
  //     'paddingBottom': 0}}  to={"/viewParent/" + row._id}>
  //       {row.approval == false ? <span className="mr-1 badge badge-warning p-1"><MdQueryBuilder  />Pending</span> : <span className="mr-1 badge badge-success  p-1"><MdDone />Approved</span>}
  //     </Link>
  //   )
  // }
  statusChange(cell, row) {
    return(
      <Link style={{'paddingTop': 0,
      'paddingBottom': 0}}  to={"/viewParent/" + row._id}>
        {row.status == false ? <span className="mr-1 badge badge-warning p-1 cst-inactive">Inactive</span> : <span className="mr-1 badge badge-success  p-1">Active</span>}
      </Link>
    )
  }
  getImage(cell, row){
    if(row.profile_image)
    
    return <div className="table-list-pf-img-title">
            <div className="lt-pf-img">
                  <img src={row.profile_image} alt={row.profile_image} className="img-responsive"/>
            </div>
            <div className="pf-title mt-3">{row.parent_name}</div>
          </div>
    else 
    return <div className="table-list-pf-img-title">
            <div className="lt-pf-img">
              <img src={placeholderimg} alt="No Trantrum Image" className="img-responsive"/>
            </div>
            <div className="pf-title mt-3">{row.parent_name}</div>
          </div>
  }
  getStudent(cell, row){    
    return(
      <div className="std-name-prgm">
          {cell.map((data,i)=>{
          return (<p><span><Link  to={"/viewChild/" + data.child_id} >{data.child_name} </Link></span><em className="mr-1 badge badge-dark">{data.child_prg}</em></p>)
      })}
      </div> 
    )
    //  return <div className="std-name-prgm">
    //     <p><span><Link  to={"/viewChild/" + cell.child_id} >{cell.child_name} </Link></span>-{cell.child_prg}</p>
    //    </div>
  }
  componentDidMount() {
    this.updateProvidersList(this.state.currentPage, this.state.sizePerPage, this.state.sortName, this.state.sortOrder, this.state.searchText);
    var element = document.getElementById("navItem-Clients-0");
    element.classList.remove("active");
    var element = document.getElementById("navItem-Parents-1");
    element.classList.add("active");
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
    axios.post(AppConstants.API+'/parent/getAllAdminParents', tablefilterdata).then(res => {
        if (res.data.Status === 'Success') {
          // res.data.data.map((callcenter,index)=>{
          //   call.push(callcenter._id)
          // })
          //mytrip.field_names.map((mytrips,index)=>{
            console.log(res.data.data)
          this.setState({
            users: res.data.data,
            //totalDataSize: res.data.total_records,
            currentPage: page,
            sizePerPage: sizePerPage,
            sortName: sortName,
            sortOrder: sortOrder,
            serchtext: searchText,
            defaultSearchText: searchText,
            page_loader : true,
  
          });
        }         
      });
    axios.post(AppConstants.API+'/parent/getAllAdminParentsCount', tablefilterdata).then(res => {
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
  createCustomInsertButton = (onClick) => {
    return (
      <span>{this.state.users.length>0?
        <Workbook filename="ExportParents.xlsx" element={<span className="btn btn-secondary editbtn" title="Export Parents">Export Parents<FaFileExport className="ml-1"/></span>}>
          <Workbook.Sheet data={this.state.users} name="Sheet A">
          <Workbook.Column label="Name" value="parent_name"/>
          <Workbook.Column label="Email" value="email"/>
          <Workbook.Column label="Phone Number" value="phone"/>
          <Workbook.Column label="First Language" value="phone"/>
          <Workbook.Column label="Address1" value="address1"/>
          <Workbook.Column label="Address2" value="address2"/>
          <Workbook.Column label="State" value="state"/>
          <Workbook.Column label="City" value="city"/>
          <Workbook.Column label="Zipcode" value="zipcode"/>
          <Workbook.Column label="Status" value="status"/>
          </Workbook.Sheet>
        </Workbook>
        :""}</span>
    );
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
      <Page title="All Parents" /*breadcrumbs={[{ name: 'Call Center', active: true }]}*/>
        <ReactTitle title="All Parents"/>
        <ul className="cst-breadcrumb">
          <li><Link to={'/dashboard'}>Dashboard</Link> </li>
          <li>All Parents</li>
        </ul>
        <Row>
          <Card>
            <CardBody>
              <div>
                <BootstrapTable data={this.state.users} remote = { true } search={true} pagination={true} fetchInfo={ { dataTotalSize: this.state.totalDataSize } }multiColumnSearch={true} options={options}
                insertRow
                >
                  <TableHeaderColumn dataField='_id' isKey={true} searchable={false} dataSort={true} hidden={true}>Company ID</TableHeaderColumn>
                  <TableHeaderColumn dataField='parent_name' dataFormat={this.getImage.bind(this)} dataSort={true}>Parent</TableHeaderColumn>
                  <TableHeaderColumn  dataFormat={this.getStudent.bind(this)} dataField="child_data" dataSort={true}>Student</TableHeaderColumn>
                  <TableHeaderColumn dataField='email'  dataSort={true}>Email</TableHeaderColumn>
                  {/* <TableHeaderColumn dataField='phone' dataSort={true}>Phone Number</TableHeaderColumn> */}
                  {/* <TableHeaderColumn dataField='image' dataFormat={this.imgformat.bind(this)} dataSort={true}>Profile Image</TableHeaderColumn> */}
                  {/* <TableHeaderColumn dataField='approval' width={'12%'} dataSort={true} dataFormat={this.handleApproval.bind(this)}>Approval</TableHeaderColumn> */}
                  <TableHeaderColumn dataField='status' width={'12%'} dataSort={true} dataFormat={this.statusChange.bind(this)}>Status</TableHeaderColumn>
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
