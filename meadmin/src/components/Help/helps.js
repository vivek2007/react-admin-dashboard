import React from 'react';
import { Link } from 'react-router-dom';
import AppConstants from 'AppConstants';
import {ReactTitle} from 'react-meta-tags';
import Page from 'components/Page';
import { Card, CardBody, Row,UncontrolledTooltip} from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { MdRemoveRedEye } from 'react-icons/md';
import { connect } from 'react-redux';
import axios from 'axios';
import Workbook from 'react-xlsx-workbook';
import Loader from 'react-loader';
let data1 = [];
class HelpQuestions extends React.Component{
    constructor(){
        super();
        this.state = {
            helps : [],
            totalDataSize: 0,
            sizePerPage: 10,
            currentPage: 1,
            sortName: '',
            sortOrder: '',
            searchText: '',
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
    componentDidMount(){
        data1 = [];
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
      var element = document.getElementById("navItem-Help-1");
      element.classList.add("active");
    }
    
    handleActions(cell, row){
        return (
        <div className="ca-controls">
            <Link id={`${"tooltipview-"}${row._id}`} style={{ 'fontSize': 12 }} to={"/viewhelp/" + row._id}>
                <button className="btn btn-success">
                    <MdRemoveRedEye />
                    <UncontrolledTooltip placement="top"target={`${"tooltipview-"}${row._id}`}>
                        View Help 
                    </UncontrolledTooltip>
                </button>
            </Link>
        </div>
        );
    }
    toggleSwitch = (e) => {
        this.setState(prevState => {
          return {
            switched: !prevState.switched
          };
        });
      };
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
    handleStatus(cell, row){
        return (<div className="ca-controls">
        {(row.status == false) && 
        <span style={{'paddingTop': 0,
          'paddingBottom': 0}} className="mr-1 badge badge-warning p-1" title="Resend Invite">Inactive</span>
        }
        {(row.status == true) && 
        <span style={{'paddingTop': 0,
          'paddingBottom': 0}} className="mr-1 badge badge-success  p-1" title="Resend Invite">Active</span>
        }
        </div>);  
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
        axios.post(AppConstants.API+'/helpQues/getAllHelps', tablefilterdata).then(res => {
            if (res.data.Status === 'Success') {
                // if(res.data.data.length>0){
                //     {res.data.data.map((help, i) => {
                //         var obj={};
                //         obj['_id'] = help._id;
                //         obj['question'] = help.question;
                //         obj['helpdate'] = help.helpdate;
                //         if(help.child_id){
                //             obj['user_id'] = help.child_id;
                //         }else if(help.parent_id){
                //             obj['user_id'] = help.parent_id;
                //         }else{
                //             obj['user_id'] = help.mentor_id;
                //         }
                //         if(help.child_name){
                //             obj['name'] = help.child_name; 
                //         }else if(help.parent_name){
                //             obj['name'] = help.parent_name; 
                //         }
                //         else{
                //             obj['name'] = help.mentor_name; 
                //         }
                //         if(help.childuser_type){
                //             obj['user_type'] = help.childuser_type;
                //         }else if(help.parent_usertype){
                //             obj['user_type'] = help.parent_usertype;
                //         }
                //         else{
                //             obj['user_type'] = help.mentor_type; 
                //         }
                //         data1.push(obj);
                //         })
                //     }
                //     this.setState({helps:data1})
                // }
              this.setState({
                helps: res.data.data,
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
        axios.post(AppConstants.API+'/helpQues/getAllhelpCount', tablefilterdata).then(res => {
          if (res.data.Status === 'Success') {
            this.setState({
              totalDataSize: res.data.data,
               serchText: searchText,
               defaultSearchText: searchText
            });
          }         
        });
        this.setState({
          paginationShowsTotal: [this.state.helps.length]
        });
    }
    handleDescription (cell, row){
      console.log("row",row.user_type)
      if(row.user_type){
        return   <span> { row.user_type=='Student'  ?'Client': ''}</span>
      }
        //  <div dangerouslySetInnerHTML={{__html: row.description}} />;
    }
    createCustomInsertButton = (onClick) => {
        return (
            <span>
              {/* {this.state.helps.length>0?
                <Workbook filename="ExportHelp.xlsx" element={<span className="btn btn-secondary editbtn" title="Export Help">Export Help</span>}>
                <Workbook.Sheet data={this.state.helps} name="Sheet A">
                <Workbook.Column label="Question" value="question"/>
                <Workbook.Column label="Name" value="name"/>
                <Workbook.Column label="User Type" value="user_type"/>
                <Workbook.Column label="Created Date" value="helpdate"/>
                </Workbook.Sheet>
                </Workbook>
                :""} */}
            </span>
        );
    }
    render(){
        console.log(this.state.hepls)
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
            // paginationShowsTotal : this.state.helps.length,

            paginationPosition: 'bottom',  // default is bottom, top and both is all available
      
            onPageChange: this.onPageChange,
      
            onSizePerPageList: this.onSizePerPageList,
      
            onSortChange: this.onSortChange,
      
            onSearchChange: this.onSearchChange,
      
            insertModal: this.createCustomModal, 
      
        }
      
        return(
          <Loader loaded={this.state.page_loader} > 
            <Page title="Help">
                <ReactTitle title="Help"/>
                <ul className="cst-breadcrumb">
                <li><Link to={'/dashboard'}>Dashboard</Link> </li>
                <li>Help</li>
                </ul>
                <Row>
                    <Card>
                        <CardBody>
                            <div>
                            {/* <BootstrapTable data={this.state.helps}
                            // search={ true } pagination={ true } multiColumnSearch={ true } options={ options }
                            remote = { true } search={true} pagination={true} fetchInfo={ { dataTotalSize: this.state.totalDataSize } }multiColumnSearch={true} options={options}
                            insertRow
                            > */}
                            <BootstrapTable data={this.state.helps} remote = { true } search={true} pagination={true} fetchInfo={ { dataTotalSize: this.state.totalDataSize } }multiColumnSearch={true} options={options}
                            insertRow
                            >
                                    <TableHeaderColumn dataField='_id' isKey={true} searchable={false} dataSort={true} hidden={true}>Help ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField='question' dataSort={true} width={'30%'}>Question</TableHeaderColumn>
                                    <TableHeaderColumn dataField='user_type' dataSort={true} dataFormat={this.handleDescription.bind(this)} width={'10%'}>User Type</TableHeaderColumn>
                                    <TableHeaderColumn dataField='name' dataFormat={this.handleName.bind(this)} dataSort={true} width={'15%'}>Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField='helpdate' dataSort={true} width={'13%'}>Created Date</TableHeaderColumn>
                                    <TableHeaderColumn dataField='actions' width={'10%'} dataFormat={this.handleActions.bind(this)} export={false}>Actions</TableHeaderColumn>
                                </BootstrapTable>
                            </div>
                        </CardBody>
                    </Card>
                </Row>
            </Page></Loader>
        )
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps, {})(HelpQuestions);