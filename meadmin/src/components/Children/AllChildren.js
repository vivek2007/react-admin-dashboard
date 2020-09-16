import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AppConstants from 'AppConstants';
import {ReactTitle} from 'react-meta-tags';
import Page from 'components/Page';
import { Card, CardBody, Row, UncontrolledTooltip} from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { MdRemoveRedEye, MdAdd, MdEdit, MdDelete, MdQueryBuilder, MdDone, MdCheckCircle, MdNotificationsActive } from 'react-icons/md';
import { WiThermometer } from "react-icons/wi";
import { FaFileExport, FaThermometerThreeQuarters } from "react-icons/fa";
import swal from 'sweetalert';
import { connect } from 'react-redux';
import Workbook from 'react-xlsx-workbook';
import placeholderimg from '../../assets/img/placeholder.png';
import Loader from 'react-loader';
import { AiOutlineUserAdd } from "react-icons/ai";
class AllChildren extends React.Component{
    constructor(){
        super();
        this.state={
            children : [],
            loading: '',
            totalDataSize: 0,
            sizePerPage: 10,
            currentPage: 1,
            sortName: '',
            sortOrder: '',
            searchText: '',
            res1 : [],
            page_loader : false
        }
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
    componentDidMount(){
      this.updateProvidersList(this.state.currentPage, this.state.sizePerPage, this.state.sortName, this.state.sortOrder, this.state.searchText);

      var element = document.getElementById("navItem-Clients-0");
      element.classList.add("active");
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
      // var element = document.getElementById("navItem-Client Habits-0");
      // element.classList.remove("active");
      var element = document.getElementById("navItem-Habits-3");
      element.classList.remove("active");
      var element = document.getElementById("navItem-Help-1");
      element.classList.remove("active");
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
    
  getImage(cell, row){
    if(row.profile_image)
    
    return <div className="table-list-pf-img-title">
            {/* <WiThermometer className="urgent-notify"/> */}
            <div className="lt-pf-img">
                  <img src={row.profile_image} alt={row.profile_image} className="img-responsive"/>
            </div>
            <div className="pf-title mt-3">{row.name}{row.lastname}</div>
          </div>
    else 
    return <div className="table-list-pf-img-title">
      {/* <WiThermometer className="urgent-notify"/> */}
            <div className="lt-pf-img">
              <img src={placeholderimg} alt="No Trantrum Image" className="img-responsive"/>
            </div>
            <div className="pf-title mt-3">{row.name}{row.lastname}</div>
          </div>
  }
    DeleteChild = (child_id) => e => {
      e.preventDefault();
      swal({
        title: "Are you sure?",
        text: "You want to delete this Client?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            swal("Student has been deleted!", {
            icon: "success",
            });
            const child_data = {
              id:child_id
            }
            axios.post(AppConstants.API+'/child/deleteChild',child_data)
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
                   <Link id={`${"toolstipvt2-"}${row._id}`} style={{ 'fontSize': 12 }} to={"/assignMentor/" + row._id}><button className="btn btn-success"><AiOutlineUserAdd  />
                  <UncontrolledTooltip placement="top" target={`${"toolstipvt2-"}${row._id}`}>Assign Mentor</UncontrolledTooltip>&nbsp;</button></Link>
                  <Link id={`${"toolstipvt-"}${row._id}`} style={{ 'fontSize': 12 }} to={"/assignHabits/" + row._id}><button className="btn btn-gr"><MdCheckCircle  />
                  
                  <UncontrolledTooltip placement="top" target={`${"toolstipvt-"}${row._id}`}>Assign Habits</UncontrolledTooltip>&nbsp;</button></Link>
                  <span>
                    <Link id={`${"tooltip-"}${row._id}`} style={{ 'fontSize': 12 }} to={"/editchild/" + row._id} ><button className="btn btn-info"><MdEdit/>
                  <UncontrolledTooltip placement="top" target={`${"tooltip-"}${row._id}`}>Edit Client</UncontrolledTooltip>&nbsp;</button></Link></span>
                
                  <Link id={`${"tooltipvt-"}${row._id}`} style={{ 'fontSize': 12 }} to={"/viewChild/" + row._id}><button className="btn btn-success"><MdRemoveRedEye />
                  
                  <UncontrolledTooltip placement="top" target={`${"tooltipvt-"}${row._id}`}>View Client </UncontrolledTooltip>&nbsp;</button></Link>
                  <span id={`${"tooltipdel-"}${row._id}`} onClick={ this.DeleteChild(row._id) } className="text-muted" className="bg-danger cst-icon"><MdDelete/><UncontrolledTooltip placement="top" target={`${"tooltipdel-"}${row._id}`}>Delete Client </UncontrolledTooltip></span>
              </div>;
    }
    
    // changeApproval(val,e){
    //   console.log(e,val[1])
    //   const data = {
    //     id : val[0],
    //     approve : val[1]
    //   }
    //   swal({
    //     title: "Are you sure?",
    //     text: "You want to change approval of this child?",
    //     icon: "warning",
    //     buttons: true,
    //     dangerMode: true,
    //   }).then((Approve) => {
    //     if(Approve){
    //       axios.post(AppConstants.API+'/child/admiApprovalStudent',data).then(res => {
    //         if(res.data.Status=="Success"){
    //           swal("Child approval has been changed!", {
    //             icon: "success",
    //           }); 
    //           this.updateProvidersList(this.state.currentPage, this.state.sizePerPage, this.state.sortName, this.state.sortOrder, this.state.searchText);
    //         }
    //       })
    //     }
    //   })
    // }
    desc(cell,row){
      return(
        <span >{row.habits.map((prg,i)=><span className="mr-1 badge badge-dark adjest-badge">{prg}<br/></span>)}</span>
      )
    }
    handleReading(cell,row){
     // console.log("cell204",cell,row)
      if(cell!= ''){
        var last = cell[cell.length - 1]
        //console.log("last206",last.reading)
        if(last.reading==1){
          return(
            <span className='mark1 emoji'>
                {/* {last.reading} */}
            </span>
          
          )
        } if(last.reading==2){
          return(
            <span className='mark2 emoji'>
                {/* {last.reading} */}
            </span>
          
          )
        } if(last.reading==3){
          return(
            <span className='mark3 emoji'>
                {/* {last.reading} */}
            </span>
          
          )
        } if(last.reading==4){
          return(
            <span className='mark4 emoji'>
                {/* {last.reading} */}
            </span>
          
          )
        } if(last.reading==5){
          return(
            <span className='mark5 emoji'>
                {/* {last.reading} */}
            </span>
          
          )
        } if(last.reading==6){
          return(
            <span className='mark6 emoji'>
                {/* {last.reading} */}
            </span>
          
          )
        } if(last.reading==7){
          return(
            <span className='mark7 emoji'>
                {/* {last.reading} */}
            </span>
          
          )
        } if(last.reading==8){
          return(
            <span className='mark8 emoji'>
                {/* {last.reading} */}
            </span>
          
          )
        } if(last.reading==9){
          return(
            <span className='mark9 emoji'>
                {/* {last.reading} */}
            </span>
          
          )
        } if(last.reading==10){
          return(
            <span className='mark10 emoji'>
                {/* {last.reading} */}
            </span>
          
          )
        }
      }
     

    }
   
    handleApproval(cell,row){
      return(
        <div>
        {row.approval == false ? <Link className="stat-btn-cst" style={{'paddingTop': 0,'paddingBottom': 0}}  to={"/viewChild/" + row._id}><span className="mr-1 badge badge-warning p-1"><MdQueryBuilder  />Pending</span> </Link> :<span className="mr-1 badge badge-success  p-1"><MdDone />Approved</span>}
        </div>
       
         /* {row.approval == false ? <span className="mr-1 badge badge-warning p-1"><MdQueryBuilder  />Pending</span> : <span className="mr-1 badge badge-success  p-1"><MdDone />Approved</span>} */
      )
    }
    statusChange(cell, row) {
      return(
        <Link style={{'paddingTop': 0,
        'paddingBottom': 0}}  to={"/viewChild/" + row._id}>
          {row.status == false ? <span className="mr-1 badge badge-warning p-1 cst-inactive">Inactive</span> : <span className="mr-1 badge badge-success  p-1">Active</span>}
        </Link>
      )
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
      axios.post(AppConstants.API+'/child/getAllChild', tablefilterdata).then(res => {
          if (res.data.Status === 'Success') {
            console.log("320",res.data.data)
            this.setState({
              children: res.data.data,
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
      axios.post(AppConstants.API+'/child/getAllChildsCount', tablefilterdata).then(res => {
        if (res.data.Status === 'Success') {
          this.setState({
            totalDataSize: res.data.data,
              serchText: searchText,
              defaultSearchText: searchText
          });
        }         
      });
      this.setState({
        paginationShowsTotal: [this.state.children.length]
      });
    }
    createCustomInsertButton = (onClick) => {
        return (
           <span> &nbsp; <Link to={"/addChild"} className="btn btn-warning" title="Add Client"><MdAdd />Add Client</Link>&nbsp;&nbsp;
{/*         
         {this.state.children.length >0?
            <Workbook filename="ExportClients.xlsx" element={<span className="btn btn-secondary editbtn" title="Export Clients"> Export Clients <FaFileExport className="ml-1"/></span>}>
              <Workbook.Sheet data={this.state.children} name="Sheet A">
              <Workbook.Column label="Student/Alumni" value="user_type"/>
              <Workbook.Column label="Name" value="name"/>
              <Workbook.Column label="Email" value="email"/>
              <Workbook.Column label="gender" value="gender"/>
              <Workbook.Column label="Organization" value="organization"/>
              <Workbook.Column label="Date of birth" value="birthdate"/>
              <Workbook.Column label="Graduation Date" value="graduateyear"/>
              <Workbook.Column label="School" value="school"/>
              <Workbook.Column label="Grade" value="grade"/>
              <Workbook.Column label="Phone Number" value="phone"/>
              <Workbook.Column label="Address1" value="address1"/>
              <Workbook.Column label="Address2" value="address2"/>
              <Workbook.Column label="State" value="state"/>
              <Workbook.Column label="City" value="city"/>
              <Workbook.Column label="Zipcode" value="zipcode"/>
              <Workbook.Column label="Status" value="status"/>
              </Workbook.Sheet>
            </Workbook>
            :""} */}
            </span>
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
      
            //paginationShowsTotal: this.state.users.length,  //this.renderShowsTotal- Accept bool or function
      
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
            <Page title="All Clients">
            <ReactTitle title="All Clients"/>
            <ul className="cst-breadcrumb">
              <li><Link to={'/dashboard'}>Dashboard</Link> </li>
              <li>All Clients</li>
            </ul>
            <Row>
                <Card>
                    <CardBody>
                        <div>
                        <BootstrapTable data={this.state.children} remote = { true } search={true} pagination={true} fetchInfo={ { dataTotalSize: this.state.totalDataSize } }multiColumnSearch={true} options={options}
                        insertRow
                        >
                                <TableHeaderColumn dataField='_id' isKey={true} searchable={false} dataSort={true} hidden={true}>Child ID</TableHeaderColumn>
                                <TableHeaderColumn dataField='name'width={'20%'} dataFormat={this.getImage.bind(this)} dataSort={true}>Name</TableHeaderColumn>
                                <TableHeaderColumn dataField='program' width={'15%'} dataSort={true}>Program</TableHeaderColumn>
                                <TableHeaderColumn dataField='habits' width={'15%'}   dataFormat={this.desc.bind(this)} dataSort={true}>Habits</TableHeaderColumn>
                                <TableHeaderColumn dataField='ThermometerData' width={'10%'} dataFormat={this.handleReading.bind(this)} dataSort={true}>Reading</TableHeaderColumn>
                               
                                {/* <TableHeaderColumn dataField='approval' width={'12%'} dataSort={true} dataFormat={this.handleApproval.bind(this)}>Approval</TableHeaderColumn> */}
                                <TableHeaderColumn dataField='status' width={'10%'} dataSort={true} dataFormat={this.statusChange.bind(this)}>Status</TableHeaderColumn>
                                <TableHeaderColumn dataField='actions'  dataFormat={this.format.bind(this)} export={false}>Actions</TableHeaderColumn>
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

// export  default connect(mapStateToProps, {})(Sidebar);
export default connect(mapStateToProps, {})(AllChildren);