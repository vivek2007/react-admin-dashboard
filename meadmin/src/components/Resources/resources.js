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
import Loader from 'react-loader';
var data1 = [];
var prg1 = [];
class Resource extends React.Component{
    constructor(){
        super();
        this.state={
            loading: '',
            totalDataSize: 0,
            sizePerPage: 10,
            currentPage: 1,
            sortName: '',
            sortOrder: '',
            searchText: '',
            res1 : [],
            resources : [],
            switched : false,
            tooltipOpen: false,
            programs : [],
            page_loader : false,
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
    statusChange(cell, row) {
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
    componentDidMount(){
      data1 =[];
        this.updateResourcesList(this.state.currentPage, this.state.sizePerPage, this.state.sortName, this.state.sortOrder, this.state.searchText);
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
      element.classList.add("active");
      // var element = document.getElementById("navItem-Client Habits-0");
      // element.classList.remove("active");
      var element = document.getElementById("navItem-Habits-3");
      element.classList.remove("active");
      var element = document.getElementById("navItem-Help-1");
      element.classList.remove("active");
        prg1 = [];
        fetch(AppConstants.API+'/programs/getAllactiveprograms').then(res=>{
            if(res.status == 200){
                return res.json();
            }
          }).then(result=>{
            result.data.map((res,i)=>{
              var prg = {}
              prg["name"] = res.title
              prg["prg_id"] = res._id
              prg1.push(prg)
            })
            this.setState({programs:prg1})
        })
    }
     createCustomInsertButton = (onClick) => {
        return (
          <span>
            <Link to={"/addResource"} className="btn btn-warning" title="Add Resource"><MdAdd />Add Resource</Link>&nbsp;&nbsp;
            {/* {this.state.resources.length>0?
            <Workbook filename="ExportResources.xlsx" element={<span className="btn btn-secondary editbtn" title="Export Resources">Export Resources</span>}>
              <Workbook.Sheet data={this.state.resources} name="Sheet A">
              <Workbook.Column label="Title" value="title"/>
              <Workbook.Column label="Description" value="description"/>
              <Workbook.Column label="Link" value="link"/>
              <Workbook.Column label="Status" value="status"/>
              </Workbook.Sheet>
            </Workbook>
            :""} */}
            </span>
        );
    }
    onSizePerPageList(sizePerPage) {
      let page = 1;
      this.updateResourcesList(page, sizePerPage, this.state.sortName, this.state.sortOrder, this.state.searchText);
    }
    onPageChange(page, sizePerPage) {
      this.updateResourcesList(page, sizePerPage, this.state.sortName, this.state.sortOrder, this.state.defaultSearchText);
    }
    onSortChange(sortName, sortOrder) {  
        let page = 1;
        this.updateResourcesList(page, this.state.sizePerPage, sortName, sortOrder, this.state.searchText);
    }
    onSearchChange(searchText, colInfos, multiColumnSearch) {
      if(searchText && searchText !== "") {
      searchText = searchText;
      }else  {  
      searchText = '';
      }
        let page = 1;
        this.updateResourcesList(page, this.state.sizePerPage, this.state.sortName, this.state.sortOrder, searchText);
    }
    DeleteResource = (res_id) => e => {
      e.preventDefault();
      swal({
        title: "Are you sure?",
        text: "You want to delete this Resource?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            swal("Resource has been deleted!", {
            icon: "success",
            });
            axios.post(AppConstants.API+'/resource/deleteResource/'+res_id)
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
                this.updateResourcesList(this.state.currentPage, this.state.sizePerPage, this.state.sortName, this.state.sortOrder, this.state.searchText);
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
        var rid = row._id;
        return (
        <div className="ca-controls text-center">
            <span><Link id={`${"tooltip-"}${rid}`}  style={{ 'fontSize': 12 }} to={"/editResource/" + row._id} title="Edit Resources"><button className="btn btn-info"><MdEdit/></button></Link></span>
            <UncontrolledTooltip placement="top" target={`${"tooltip-"}${rid}`}>Edit Resource </UncontrolledTooltip>
            {/* /viewResource/:id */}
            <Link id={`${"tooltipview-"}${row._id}`} style={{ 'fontSize': 12 }} to={"/viewResource/" + row._id} ><button className="btn btn-success"><MdRemoveRedEye />
            <UncontrolledTooltip placement="top" target={`${"tooltipview-"}${row._id}`}>View Resource</UncontrolledTooltip>
            </button></Link>
            <span id={`${"tooltipdel-"}${row._id}`} onClick={ this.DeleteResource(row._id) } className="text-muted" className="bg-danger cst-icon"><MdDelete/><UncontrolledTooltip placement="top" target={`${"tooltipdel-"}${row._id}`}>Delete Resource </UncontrolledTooltip></span>
        </div>
        );
    }
    updateResourcesList(page, sizePerPage, sortName, sortOrder, searchText){
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
      axios.post(AppConstants.API+'/resource/getAllResourceData', tablefilterdata).then(res => {
        console.log("res.data.Status",res.data.data);
          if (res.data.Status === 'Success') {
            if(res.data.data.length>0){
              {res.data.data.map((resource, i) => {
                  var obj={};
                  obj['_id'] = resource._id;
                  obj['title'] = resource.title;
                  obj['description'] = resource.description;
                  obj['programs'] = resource.programs;
                  obj['status'] = resource.status;
                  data1.push(obj);
                  })
              }
              console.log(data1)
              this.setState({resources:data1})
          }
            this.setState({
              resources: res.data.data,
              currentPage: page,
              sizePerPage: sizePerPage,
              sortName: sortName,
              sortOrder: sortOrder,
              serchtext: searchText,
              defaultSearchText: searchText
    
            });
          }         
        });
      axios.post(AppConstants.API+'/resource/getAllResourceCount', tablefilterdata).then(res => {
        if (res.data.Status === 'Success') {
          this.setState({
            totalDataSize: res.data.data,
              serchText: searchText,
              defaultSearchText: searchText,
              page_loader : true
          });
        }else{
          this.setState({
            page_loader : true
          })
        }         
      });
      this.setState({
        paginationShowsTotal: [this.state.resources.length]
      });
    }
    handlePrograms(cell,row){
      // console.log(cell,row)
      let selectedValue = []
            cell.map((prgs,i)=>{
                this.state.programs.forEach(option => {
                    if(prgs == option.prg_id){
                      if(prgs == option.prg_id){
                        var item ={}
                        item["name"] = option.name
                        item["prg_id"] = option.prg_id
                        selectedValue.push(item)
                      } 
                    }
                 })
      })
      return(
        <span >{selectedValue.map((prg,i)=><span className="mr-1 badge badge-dark adjest-badge">{prg.name}<br/></span>)}</span>
      )
    }

    // handleDescription (cell, row){
    //   console.log("row",row.user_type)
    //   if(row.user_type){
    //     return <div>
    //        { row.user_type.map((res,i,arr)=>{
    //           return(
    //           <span> {res=='student'  ?'Client':<span>{res}</span>} {i != (arr.length-1) ? ',' : ''}</span>
    //           )
    //         }) }
          
    //      </div>
    //   }
    //     //  <div dangerouslySetInnerHTML={{__html: row.description}} />;
    // }
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
            <Page title="All Resources">
                <ReactTitle title="All Resources"/>
                <ul className="cst-breadcrumb">
                <li><Link to={'/dashboard'}>Dashboard</Link> </li>
                <li>All Resources</li>
                </ul>
                <Row>
                    <Card>
                        <CardBody>
                            <div>
                            {/* <BootstrapTable data={this.state.resources}
                            search={ true } pagination={ true } multiColumnSearch={ true } options={ options }
                            insertRow
                            > */}
                            <BootstrapTable data={this.state.resources} remote = { true } search={true} pagination={true} fetchInfo={ { dataTotalSize: this.state.totalDataSize } }multiColumnSearch={true} options={options}
                            insertRow
                            >
                              <TableHeaderColumn dataField='_id' isKey={true} searchable={false} dataSort={true} hidden={true}>Resource ID</TableHeaderColumn>
                              <TableHeaderColumn dataField='title'  dataSort={true} width={'30%'}>Title</TableHeaderColumn>
                              {/* <TableHeaderColumn dataField='user_type' dataFormat={this.handleDescription.bind(this)} dataSort={true} width={'30%'}>User Type</TableHeaderColumn> */}
                              <TableHeaderColumn dataField='programs'  dataSort={true} width={'20%'}dataFormat={this.handlePrograms.bind(this)}>Programs</TableHeaderColumn>
                              <TableHeaderColumn dataField='status' width={'20%'} dataFormat={this.statusChange.bind(this)} dataSort={true} >Status</TableHeaderColumn>
                              <TableHeaderColumn dataField='actions' width={'25%'} dataFormat={this.handleActions.bind(this)} export={false}>Actions</TableHeaderColumn>
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
export default connect(mapStateToProps, {})(Resource);