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
class ViewParentTodos extends React.Component{
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
            searchText: '',
        }
        this.onPageChange = this.onPageChange.bind(this);
        this.onSizePerPageList = this.onSizePerPageList.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this); 
        this.renderShowsTotal = this.renderShowsTotal.bind(this); 
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
        axios.post(AppConstants.API+'/parent/getParentTodosStatus/'+ this.props.data, tablefilterdata).then(res => {
            console.log(res.data.data[0])
            var child_data = [];
            if (res.data.Status === 'Success') {
                console.log("res.data.data",res.data)
                // if(res.data.data[0]){
                //     child_data = res.data.data[0].todos_data
                // }
              this.setState({
                parents: res.data.data,
                currentPage: page,
                sizePerPage: sizePerPage,
                sortName: sortName,
                sortOrder: sortOrder,
                serchtext: searchText,
                defaultSearchText: searchText
      
              });
            }         
          });
        axios.post(AppConstants.API+'/parent/getParentTodosStatusCount/'+this.props.data, tablefilterdata).then(res => {
          if (res.data.Status === 'Success') {
            this.setState({
              totalDataSize: res.data.data,
                serchText: searchText,
                defaultSearchText: searchText
            });
          }         
        });
      }
    handleDueDate(cell,row){
        var today = moment(new Date).format('MM-DD-YYYY');
        var dueDate = moment(cell).add(row.period, 'd').format('MM-DD-YYYY')
        if(dueDate<today){
            // console.log("duebbbbbbbbbbb",dueDate)
            return(
                <span className="overdue-todo">
                    {dueDate}
                </span>
            )
        }
        else{
            return(
                <span>
                    {dueDate}
                </span>
            )  
        }
    }
    handleResource(cell,row){
        var arr = []
        cell.map((item,index)=>{
            row.resources_id.map((item1,i)=>{
                  var data1 = {}
                if(i==index){
                    // console.log(item,item1)
                    data1["name"]=item
                    data1["id"] =item1
                    arr.push(data1)
                 }
                
            })
            
        })
       return(
        <span>
            {arr.map((data,i)=>{
            return (<Link to={'/viewResource/'+data.id} target="_blank">{data.name}, </Link>)
        })}
        </span> 
       )
    }
    handleCompletedDate(cell,row){
        if(cell.length!=0){
            // console.log(moment(cell[0]).format('MM-DD-YYYY'))
            return (moment(cell[0]).format('MM-DD-YYYY'))
        }
        else{
            return(<span>N/A</span>)
        }
    }
    handleStatus(cell, row){
        if(cell!=0){
            return (<span className="mr-1 badge badge-success  p-1">Complete</span>)
        }else{
            return (<span  className="mr-1 badge badge-warning p-1">Pending</span>)
        }
    }
    handleProgram(cell, row){
        console.log(row,cell)
        return(cell)
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
                        <Label for="examplePassword" className="m-0"><strong><img src={ParentIcon} />TO-DO LISTS</strong></Label>
                    </CardHeader>
                    <CardBody>
                        <div>
                            <BootstrapTable data={this.state.parents} remote = { true } 
                                pagination={true} fetchInfo={ { dataTotalSize: this.state.totalDataSize } }
                                 search={true}
                                 multiColumnSearch={true} 
                                 options={options} 
                            >
                                <TableHeaderColumn dataField='todo_id' isKey={true} searchable={false} dataSort={true} hidden={true}>ID</TableHeaderColumn>
                                <TableHeaderColumn dataField='title'  dataSort={true} width={'20%'}>Title</TableHeaderColumn>
                                <TableHeaderColumn dataField='child_name'  dataSort={true} width={'20%'}>Child</TableHeaderColumn>
                                <TableHeaderColumn dataField='program' dataFormat={this.handleProgram.bind(this)} dataSort={true} width={'20%'}>Program</TableHeaderColumn>
                                {/* <TableHeaderColumn dataField='resources_name' dataFormat={this.handleResource.bind(this)} dataSort={true} width={'20%'}>Resources</TableHeaderColumn> */}
                                <TableHeaderColumn dataField='dueDate'  dataSort={true} width={'20%'} dataFormat={this.handleDueDate.bind(this)}>Due Date</TableHeaderColumn>
                                {/* <TableHeaderColumn dataField='completed_date'  dataSort={true} width={'20%'} dataFormat={this.handleCompletedDate.bind(this)}>Completed Date</TableHeaderColumn> */}
                                <TableHeaderColumn dataField='pendingData'  dataSort={true} width={'20%'} dataFormat={this.handleStatus.bind(this)}>Status</TableHeaderColumn>
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
export default connect(mapStateToProps, {})(ViewParentTodos);