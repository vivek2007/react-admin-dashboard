import React from 'react';
import { Link } from 'react-router-dom';
import AppConstants from 'AppConstants';
import {ReactTitle} from 'react-meta-tags';
import Page from 'components/Page';
import { Card, CardBody, Row, UncontrolledTooltip } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { MdAdd, MdEdit } from 'react-icons/md';
import { connect } from 'react-redux';
import Workbook from 'react-xlsx-workbook';
class Language extends React.Component{
    constructor(){
        super();
        this.state = {
            languages : [],
            switched : false,
            tooltipOpen: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
          tooltipOpen: !this.state.tooltipOpen
        });
      }

    componentDidMount(){
        fetch(AppConstants.API+'/language/getAllLanguages').then(res=>{
            if(res.status == 200){
                return res.json();
            }
        }).then(result=>{
            if(result.data.length>0){
                this.setState({languages:result.data})
            }
        })
        var element = document.getElementById("navItem-Students-0");
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
        element.classList.add("active");
        var element = document.getElementById("navItem-Thermometer Questions-0");
        element.classList.remove("active");
        var element = document.getElementById("navItem-Feeling Journals-0");
        element.classList.remove("active");
        var element = document.getElementById("navItem-Parent TO-DOS-1");
        element.classList.remove("active");
        var element = document.getElementById("navItem-Student TO-DOS-0");
        element.classList.remove("active");
        var element = document.getElementById("navItem-Mentor TO-DOS-2");
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
    
    handleActions(cell, row){
        var rid = row._id;
        return (
        <div className="ca-controls text-center">
            <span><Link id={`${"tooltip-"}${rid}`}  style={{ 'fontSize': 12 }} to={"/editLanguage/" + row._id} ><button className="btn btn-info"><MdEdit/></button></Link></span>
            <UncontrolledTooltip placement="top" target={`${"tooltip-"}${rid}`}>Edit Language </UncontrolledTooltip>
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
    handleStatus(cell, row){
        return (<div className="ca-controls">
        {(row.status == false) && 
        <span style={{'paddingTop': 0,
          'paddingBottom': 0}} className="mr-1 badge badge-warning p-1 cst-inactive" title="Resend Invite">Inactive</span>
        }
        {(row.status == true) && 
        <span style={{'paddingTop': 0,
          'paddingBottom': 0}} className="mr-1 badge badge-success  p-1" title="Resend Invite">Active</span>
        }
        </div>);  
    }
    createCustomInsertButton = (onClick) => {
        return (
          <span><Link to={"/addLanguage"} className="btn btn-warning" title="Add Language"><MdAdd />Add Language</Link>&nbsp; &nbsp;{this.state.languages.length>0?
            <Workbook filename="ExportLanguages.xlsx" element={<span className="btn btn-secondary editbtn" title="Export Languages">Export Languages</span>}>
                <Workbook.Sheet data={this.state.languages} name="Sheet A">
                <Workbook.Column label="Name" value="name"/>
                <Workbook.Column label="Status" value="status"/>
                </Workbook.Sheet>
            </Workbook>
        :""}
          </span>
        );
    }
    render(){
        console.log(this.state.languages.length)
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
      
            paginationShowsTotal: this.state.languages.length,  //this.renderShowsTotal- Accept bool or function
      
            paginationPosition: 'bottom',  // default is bottom, top and both is all available
      
            onPageChange: this.onPageChange,
      
            onSizePerPageList: this.onSizePerPageList,
      
            onSortChange: this.onSortChange,
      
            onSearchChange: this.onSearchChange,
      
            insertModal: this.createCustomModal, 
      
            // paginationShowsTotal: this.renderShowsTotal
        }
        return(
            <Page title="All Languages">
                <ReactTitle title="All Languages"/>
                <ul className="cst-breadcrumb">
                <li><Link to={'/dashboard'}>Dashboard</Link> </li>
                <li>All Languages</li>
                </ul>
                <Row>
                    <Card>
                        <CardBody>
                            <div>
                            <BootstrapTable data={this.state.languages}
                            search={ true } pagination={ true } multiColumnSearch={ true } options={ options }
                            // remote = { true } search={true} pagination={true} fetchInfo={ { dataTotalSize: this.state.totalDataSize } }multiColumnSearch={true} options={options}
                            insertRow
                            >
                                    <TableHeaderColumn dataField='_id' isKey={true} searchable={false} dataSort={true} hidden={true}>Language ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField='name'  dataSort={true} width={'60%'}>Language Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField='status' width={'20%'} dataSort={true} dataFormat={this.handleStatus.bind(this)}>Status</TableHeaderColumn>
                                    <TableHeaderColumn dataField='actions' width={'20%'} dataFormat={this.handleActions.bind(this)} export={false}>Actions</TableHeaderColumn>
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
export default connect(mapStateToProps, {})(Language);