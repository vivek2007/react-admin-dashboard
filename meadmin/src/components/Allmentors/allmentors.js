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
import { MdDelete,MdEmail, MdRemoveRedEye, MdQueryBuilder, MdDone,MdEdit } from 'react-icons/md';
import swal from 'sweetalert';
import Workbook from 'react-xlsx-workbook';
import placeholderimg from '../../assets/img/placeholder.png';
import { FaFileExport } from "react-icons/fa";
import Loader from 'react-loader';

class AllMentors extends React.Component{
    constructor(){
        super();
        this.state = {
            mentors: [],
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
        axios.post(AppConstants.API+'/mentor/getAllMentorInfo', tablefilterdata).then(res => {
            if (res.data.Status === 'Success') {
                console.log("res.data.data",res.data.data)
                    this.setState({
                        mentors: res.data.data,
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
        axios.post(AppConstants.API+'/mentor/getAllMentorCount', tablefilterdata).then(res => {
            if (res.data.Status === 'Success') {
                this.setState({
                    totalDataSize: res.data.data,
                    serchText: searchText,
                    defaultSearchText: searchText
                });
            }         
        });
        this.setState({
            paginationShowsTotal: [this.state.mentors.length]
        });
    }
    componentDidMount(){
        this.updateProvidersList(this.state.currentPage, this.state.sizePerPage, this.state.sortName, this.state.sortOrder, this.state.searchText);

        var element = document.getElementById("navItem-Clients-0");
      element.classList.remove("active");
      var element = document.getElementById("navItem-Mentors-1");
      element.classList.add("active");
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
      // var element = document.getElementById("navItem-Client Habits-0");
      // element.classList.remove("active");
      var element = document.getElementById("navItem-Habits-3");
      element.classList.remove("active");
      var element = document.getElementById("navItem-Help-1");
      element.classList.remove("active");
      var element = document.getElementById("navItem-Help Sugesstions-0");
      element.classList.remove("active");
      
    }
    DeleteMentor=(del_id)=>e=>{
        e.preventDefault();
        swal({
            title: "Are you sure?",
            text: "You want to delete this mentor?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
            swal("Mentor has been deleted!", {
            icon: "success",
            });
            const mentor_data = {
                id:del_id
            }
            axios.post(AppConstants.API+'/mentor/deleteMentor',mentor_data)
            .then(res => {   
                // console.log(res);   
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
    handleActions(cell,row){
        return <div className="ca-controls">
            <span><Link  id={`${"tooltip-"}${row._id}`} style={{ 'fontSize': 12 }} to={"/editmentor/" + row._id} ><button className="btn btn-info"><MdEdit/><UncontrolledTooltip placement="top" target={`${"tooltip-"}${row._id}`}>Edit Mentor </UncontrolledTooltip></button></Link></span>
            <Link id={`${"tooltipview-"}${row._id}`} style={{ 'fontSize': 12 }} to={"/viewMentor/" + row._id} ><button className="btn btn-success"><MdRemoveRedEye />
            <UncontrolledTooltip placement="top" target={`${"tooltipview-"}${row._id}`}>View Mentor </UncontrolledTooltip>
            </button></Link>
            <span id={`${"tooltipdel-"}${row._id}`} onClick={ this.DeleteMentor(row._id) } className="text-muted"  className="bg-danger cst-icon"><MdDelete />
            <UncontrolledTooltip placement="top" target={`${"tooltipdel-"}${row._id}`}>Delete Mentor</UncontrolledTooltip>
            </span>
        </div>
    }
    handlestatus(cell,row){
        return(
            <Link style={{'paddingTop': 0,
            'paddingBottom': 0}}  to={"/viewMentor/" + row._id}>
              {row.status == false ? <span className="mr-1 badge badge-warning p-1 cst-inactive">Inactive</span> : <span className="mr-1 badge badge-success  p-1">Active</span>}
            </Link>
          )
    }
   
  handleApproval(cell,row){
    return(
    <div>
    {row.approval == false ? <Link className="stat-btn-cst" style={{'paddingTop': 0,'paddingBottom': 0}}  to={"/viewMentor/" + row._id}><span className="mr-1 badge badge-warning p-1"><MdQueryBuilder  />Pending</span> </Link> :<span className="mr-1 badge badge-success  p-1"><MdDone />Approved</span>}
    </div>
    //   <Link className="stat-btn-cst" style={{'paddingTop': 0,
    //   'paddingBottom': 0}}  to={"/viewMentor/" + row._id}>
    //     {row.approval == false ? <span className="mr-1 badge badge-warning p-1"><MdQueryBuilder  />Pending</span> : <span className="mr-1 badge badge-success  p-1"><MdDone />Approved</span>}
    //   </Link>
    )
  }
  desc(cell, row){

    let selectedValue = []
            // cell.map((prgs,i)=>{
                row.programData.forEach(option => {
                    console.log(option)
                    // if(prgs == option._id){
                    //   if(prgs == option._id){
                        var item ={}
                        item["name"] = option.title
                        item["prg_id"] = option._id
                        selectedValue.push(item)
                    //   } 
                    // }
                 })
    //   })
      return(
        <span >{selectedValue.map((prg,i)=><span className="mr-1 badge badge-dark adjest-badge">{prg.name}<br/></span>)}</span>
      )
    //   if(row.programData){
        // return(
            // row.programData.map((res,i,arr)=>{
            //     console.log("resresresresres",res.title)
    
            //     return(
            //      res.title
            //     )
            //   }) 
        // )
       
    //   }
  }
    getImage(cell, row){
        if(row.profile_image)
        return <div className="table-list-pf-img-title">
            {row.name}
                {/* <div className="lt-pf-img">
                    <img src={row.profile_image} alt={row.profile_image} className="img-responsive"/>
                </div>
                <div className="pf-title mt-3">{row.name}</div> */}
            </div>
        else 
        return <div className="table-list-pf-img-title">
            {row.name}
                {/* <div className="lt-pf-img">
                <img src={placeholderimg} alt="No Trantrum Image" className="img-responsive"/>
                </div>
                <div className="pf-title mt-3">{row.name}</div> */}
            </div>
    }
  
    createCustomInsertButton=(onClick)=>{
        return(
        // <span> &nbsp; <Link to={"/addmentor"} className="btn btn-warning" title="Add Mentor"><MdAdd />Add Mentor</Link></span>
        <span>
            <Link to={"/addmentor"} className="btn btn-warning" title="Add Mentor">Add Mentor</Link> &nbsp;
            {/* {this.state.mentors.length>0?
                <Workbook filename="ExportMentors.xlsx" element={<span className="btn btn-secondary editbtn" title="Export Mentors">Export Mentors<FaFileExport className="ml-2"/></span>}>
                <Workbook.Sheet data={this.state.mentors} name="Sheet A">
                <Workbook.Column label="Name" width={10} value="name"/>
                <Workbook.Column label="Program" width={10} value="program"/>
                <Workbook.Column label="Email"  value="email"/>
                <Workbook.Column label="Phone Number"  value="mobile_phone"/>
                <Workbook.Column label="Street" value="street"/>
                <Workbook.Column label="City" value="city"/>
                <Workbook.Column label="State" value="state"/>
                <Workbook.Column label="Zipcode" value="zipcode"/>
                <Workbook.Column label="Status" value="status"/>
                <Workbook.Column label="Gender" value="gender"/>
                <Workbook.Column label="Home Phone" value="home_phone"/>
                <Workbook.Column label="Employer addrress" value="employer_address"/>
                <Workbook.Column label="Work phone" value="work_phone"/>
                <Workbook.Column label="Occupation" value="occupation"/>
                </Workbook.Sheet>
                </Workbook>
            :""} */}
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
            <Page title="All Mentors">
                <ReactTitle title="All Mentors"/>
                <ul className="cst-breadcrumb">
                <li><Link to={'/dashboard'}>Dashboard</Link> </li>
                <li>All Mentors</li>
                </ul>
                <Row>
                    <Card>
                        <CardBody>
                             <div>
                                <BootstrapTable data={this.state.mentors} remote = { true } search={true} pagination={true} fetchInfo={ { dataTotalSize: this.state.totalDataSize } }multiColumnSearch={true} options={options}
                                 insertRow
                                >
                                    <TableHeaderColumn dataField='_id' isKey={true} searchable={false} dataSort={true} hidden={true}>Company ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField='name' dataFormat={this.getImage.bind(this)}   dataSort={true}>Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField='programData'  dataFormat={this.desc.bind(this)} width={'20%'} dataSort={true}>Program</TableHeaderColumn>
                                    <TableHeaderColumn dataField='email'  dataSort={true}>Email</TableHeaderColumn>
                                    <TableHeaderColumn dataField='status' width={'10%'} dataFormat={this.handlestatus.bind(this)}  dataSort={true}>Status</TableHeaderColumn>
                                    <TableHeaderColumn dataField='actions' width={'20%'} dataFormat={this.handleActions.bind(this)} export={false}>Actions</TableHeaderColumn>
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
export default connect(mapStateToProps, {})(AllMentors);