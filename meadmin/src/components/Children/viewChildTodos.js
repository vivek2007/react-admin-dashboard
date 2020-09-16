import React from 'react';
import { Link } from 'react-router-dom';
import AppConstants from 'AppConstants';
import {ReactTitle} from 'react-meta-tags';
import Page from 'components/Page';
import { Card, CardBody, Row,CardHeader,Label} from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import axios from 'axios';
import Workbook from 'react-xlsx-workbook';
import moment from "moment";
import ParentIcon from 'assets/img/parents.png';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class ViewChildTodos extends React.Component{
    constructor(){
        super();
        this.state = {
            child_todos : [],
            child_todos_data : [],
            totalDataSize: 0,
            sizePerPage: 10,
            currentPage: 1,
            sortName: '',
            sortOrder: '',
            children:[],
            searchText: '',
            start_date : null,
        }
        this.onPageChange = this.onPageChange.bind(this);
        this.onSizePerPageList = this.onSizePerPageList.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this); 
        this.renderShowsTotal = this.renderShowsTotal.bind(this); 
        this.handleChange = this.handleChange.bind(this); 

        
    }
    componentDidMount(){
        this.updateProvidersList(this.state.currentPage, this.state.sizePerPage, this.state.sortName, this.state.sortOrder, this.state.searchText);
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
        axios.post(AppConstants.API+'/child/getChildTodosStatus/'+ this.props.data, tablefilterdata).then(res => {
            var child_data = [];
            if (res.data.Status === 'Success') {
                // console.log(res.data,"sortname",sortName,"sortorder",sortOrder)
                // if(res.data.data[0]){
                //     child_data = res.data.data[0].todos_data
                // }
console.log("res.data.data",res.data.data)
              this.setState({
                children: res.data.data,
                currentPage: page,
                sizePerPage: sizePerPage,
                sortName: sortName,
                sortOrder: sortOrder,
                serchtext: searchText,
                defaultSearchText: searchText
      
              });
            }         
          });
        axios.post(AppConstants.API+'/child/getChildTodosStatusCount/'+this.props.data, tablefilterdata).then(res => {
          if (res.data.Status === 'Success') {
            this.setState({
              totalDataSize: res.data.data,
                serchText: searchText,
                defaultSearchText: searchText
            });
          }         
        });
      }
  
    handleStatus(cell, row){
        // console.log("celllllllllllllll166",cell)
        if(cell!=0){
            return (<span className="mr-1 badge badge-success  p-1">Complete</span>)
        }else{
            return (<span  className="mr-1 badge badge-warning p-1">Pending</span>)
        }
    }
    handleResource(cell,row){
      // console.log(row.resourcesData)
      let selectedValue = []
      // cell.map((prgs,i)=>{
          row.resourcesData.forEach(option => {
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
    }
    handleChange(date) {
        this.setState({
          start_date: date
          //end_date :date
        });
    }
    // createCustomInsertButton = (onClick) => {
    //     return (
    //       <span> &nbsp; <Link to={"/addprogram"} className="btn btn-warning" title="Add Program"><MdAdd />Add Program</Link>&nbsp;&nbsp;{this.state.programs.length>0?
    //         <Workbook filename="ExportProgram.xlsx" element={<span className="btn btn-secondary editbtn" title="Export Program">Export Program</span>}>
    //           <Workbook.Sheet data={this.state.programs} name="Sheet A">
    //           <Workbook.Column label="Title" value="title"/>
    //           <Workbook.Column label="Status" value="status"/>
    //           </Workbook.Sheet>
    //         </Workbook>
    //         :""}</span>
    //     );
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
      
            paginationShowsTotal: this.renderShowsTotal,  //this.renderShowsTotal- Accept bool or function

            // paginationShowsTotal : this.state.child_todos.length,
      
            paginationPosition: 'bottom',  // default is bottom, top and both is all available
      
            onPageChange: this.onPageChange,
      
            onSizePerPageList: this.onSizePerPageList,
      
            onSortChange: this.onSortChange,
      
            onSearchChange: this.onSearchChange,
      
            insertModal: this.createCustomModal, 
      
        }
        return(
                <Row className="mx-0">
                    <Card className="pt-0">
                        <CardHeader className="d-flex justify-content-between">
                            <Label for="examplePassword" className="m-0"><strong><img src={ParentIcon} /> Habits list</strong></Label>
                        </CardHeader>
                        <CardBody>
                            <div>
                            {/* <BootstrapTable data={this.state.child_todos_data}
                            search={ true } pagination={ true } multiColumnSearch={ true } options={ options }
                            // remote = { true } search={true} pagination={true} fetchInfo={ { dataTotalSize: this.state.totalDataSize } }multiColumnSearch={true} options={options}
                            // insertRow
                            > */}
                              {/* <DatePicker
                                name="start_date"
                                className="form-control"
                                //placeholderText="MM-DD-YYYY"
                                placeholderText={this.state.placeholderSD}
                                //placeholderText="02/09/2019"
                                selected={this.state.start_date}
                                selectsStart
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                onChange={this.handleChange}
                                autoComplete = "off"
                                dateFormat={"MM-dd-yyyy"}
                                // minDate={new Date().setFullYear(new Date().getFullYear() - 5)}   
                                //   maxDate={new Date()}   
                                  onKeyDown={(e) =>e.preventDefault()}
                                className="form-control" /> */}
                                 <BootstrapTable data={this.state.children} remote = { true } 
                                 search={true} 
                                 pagination={true} fetchInfo={ { dataTotalSize: this.state.totalDataSize } }
                                 multiColumnSearch={true} 
                                 options={options}
                                //  insertRow
                                >
                                    <TableHeaderColumn dataField='todo_id' isKey={true} searchable={false} dataSort={true} hidden={true}>ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField='title'  dataSort={true} width={'15%'}>Title</TableHeaderColumn>
                                    <TableHeaderColumn dataField='program'  dataSort={true} width={'15%'}>Program</TableHeaderColumn>
                                    {/* <TableHeaderColumn dataField='resources_name' dataFormat={this.handleResource.bind(this)} dataSort={true} width={'20%'}>Resources</TableHeaderColumn> */}
                                    <TableHeaderColumn dataField='startDate'  dataSort={true} width={'15%'} >Start Date</TableHeaderColumn>
                                    <TableHeaderColumn dataField='endDate'  dataSort={true} width={'15%'} >End Date</TableHeaderColumn>
                                    <TableHeaderColumn dataField='resourcesData' dataFormat={this.handleResource.bind(this)}   dataSort={true} width={'10%'} >Resources</TableHeaderColumn>
                                    <TableHeaderColumn dataField='pendingData' width={'10%'} dataSort={true} dataFormat={this.handleStatus.bind(this)}>Status</TableHeaderColumn>
                                    {/* <TableHeaderColumn dataField='actions' width={'20%'} dataFormat={this.handleActions.bind(this)} export={false}>Actions</TableHeaderColumn> */}
                            </BootstrapTable>
                            </div>
                        </CardBody>
                    </Card>
                </Row>
        )
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps, {})(ViewChildTodos);