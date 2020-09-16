import Page from 'components/Page';
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { BootstrapTable, TableHeaderColumn, InsertButton } from 'react-bootstrap-table';
//import { AddCompany, DataFormat } from 'components/NewUsers';
import { Card, Button, CardBody, CardHeader, Col, Row, Table, Modal,
  ModalBody,
  ModalFooter,
  ModalHeader } from 'reactstrap';
import {
    MdCreate,
    MdDelete,
    MdRemoveRedEye,MdAdd
  } from 'react-icons/md';
class NewUsers extends React.Component {
  constructor(props) {
    super(props);
    const company_id = '';
    this.state = {
      modal: false,
      modal_backdrop: false,
      modal_nested_parent: false,
      modal_nested: false,
      backdrop: true,
      company: {},
      users: [],
      company_id: '',
      errMsg:false
  };
  this.handleChange = this.handleChange.bind(this);
  this.deleteCompany = this.deleteCompany.bind(this);
  this.format = this.format.bind(this);
}
deleteCompany = param => () => {
  if(window.confirm("Are you sure want to delete this company?"))
  {
    axios.get('http://localhost:3200/company/delete_company/'+param)
    .then(res => {
      if (res.data.status == 'success') {
        axios.get('http://localhost:3200/company/get_companies')
        .then(res => {
          if (res.data.status == 'success') {
              this.setState({
                users: res.data.data
              });
          }
        })
      }
    })
  }
}
editCompany = param => () => {
  console.log("Edited Company: "+param);
  //this.company_id = param;
  this.setState({
    modal: !this.state.modal,
    company_id: param
  });
}
handleChange(data) {
    this.setState({
        modal: data.modal
    });
    if(data.formsubmitted)
    {
      axios.get('http://localhost:3200/company/get_companies')
      .then(res => {
          if (res.data.status == 'success') {
              this.setState({
                users: res.data.data
              });
          }
        })
    }
}

toggle = modalType => () => {
  if (!modalType) {   
      return this.setState({
        modal: !this.state.modal,
        company_id: ''
      });
  }
  this.setState({
      [`modal_${modalType}`]: !this.state[`modal_${modalType}`],
      company_id: ''
  });
}; 

DeleteUser = params => e => {  
  e.preventDefault();
  if(window.confirm("Are you sure you want to delete this Parent?"))
  {
    //console.log('the item to delete is: ', params);
    const userdeletedata = {
      id:params
    }
    axios.post('/api/user/deleteuser',userdeletedata)
      .then(res => {   
        console.log(res);   
       if(res.data.status == "Success"){                           
        this.setState({
          errMsg: res.data.msg
        });
        setTimeout(() => {
          this.setState({
            errMsg: false,
          });
        }, 1000);
        fetch('http://localhost:3300/api/getAllParents').then(response => response.json())
          .then(data => {
        // console.log(data);
          if(data.Status == "Success")
          {
            this.setState({ users: data.data });
          }
          else
          {
            this.setState({ users: "" });
          }    
        });          
      }
      else{
        this.setState({
          errMsg: res.data.msg
        });
      }
    });
  }
};

format(cell, row){
  //return <div className="ca-controls"><span className="text-muted" onClick={this.editCompany(row._id)}><MdCreate /></span><a href="#" className="text-muted"><MdRemoveRedEye /></a><span className="text-muted" onClick={this.deleteCompany(row._id)}><MdDelete /></span></div>;

  return <div className="ca-controls"><Link to={"/editUser/"+row._id} class="text-muted" title="Edit User"><MdCreate /></Link>
                            <span onClick={ this.DeleteUser(row._id) } class="text-muted" title="Delete User"><MdDelete /></span><a href="#" className="text-muted"><MdRemoveRedEye /></a></div>;
}

	handleInsertButtonClick = (onClick) => {
    // Custom your onClick event here,
    // it's not necessary to implement this function if you have no any process before onClick
    console.log('This is my custom function for InserButton click event');
    //onClick();
    this.toggle();
  }
  createCustomInsertButton = (onClick) => {
    return (
      /* <InsertButton
        btnText='New'
        btnContextual='btn-warning'
        className='my-custom-class'
        btnGlyphicon='glyphicon-edit'
        onClick={ this.toggle() }/> */

        <span> &nbsp; <Link to={"/addUser"} class="btn btn-warning" title="Add Parent"><MdAdd />Add</Link></span>
    );
  }
  componentDidMount() {
    /* axios.get('http://localhost:3200/company/get_companies')
    .then(res => {
        if (res.data.status == 'success') {
            console.log(res.data);
            this.setState({
              products: res.data.data
            });
        }
    }) */
    fetch('http://localhost:3300/api/getAllParents').then(response => response.json())
      .then(data => {
     // console.log(data);
      if(data.Status == "Success")
      {
        this.setState({ users: data.data });
      }
      else
      {
        this.setState({ users: "" });
      }    
    }); 
  }
   render() {
     

    const options = {

      exportCSVText: 'Export CSV',
    
      insertText: "New",
    
      deleteText: 'Delete',
    
      saveText: 'Save',
    
      closeText: 'Close',
      insertBtn: this.createCustomInsertButton,
      page: 1,  // which page you want to show as default

      sizePerPageList: [ {

        text: '5', value: 5

      }, {

        text: '10', value: 10

      }, {

        text: '20', value: 20

      },
      {

        text: '50', value: 50

      }
    ], // you can change the dropdown list for size per page

      sizePerPage: 10,  // which size per page you want to locate as default

      pageStartIndex: 1, // where to start counting the pages

      paginationSize: 3,  // the pagination bar size.

     // prePage: 'Prev', // Previous page button text

      //nextPage: 'Next', // Next page button text

      //firstPage: 'First', // First page button text

      //lastPage: 'Last', // Last page button text

      paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function

      paginationPosition: 'bottom',  // default is bottom, top and both is all available

      // hideSizePerPage: true > You can hide the dropdown for sizePerPage

      // alwaysShowAllBtns: true // Always show next and previous button

      // withFirstAndLast: false > Hide the going to First and Last page button
      insertModal: this.createCustomModal
    
    };
    return (
      <Page title="Parents" breadcrumbs={[{ name: 'Parents', active: true }]}>
				  <row>
            <Card>
              <CardBody>
                <div>

                <span className="error" style={{color: 'red'}}>{this.state.errMsg}</span>  

                <BootstrapTable data={ this.state.users } search={ true } pagination={ true } multiColumnSearch={ true } options={ options }

                insertRow

                exportCSV>
                  <TableHeaderColumn dataField='_id' isKey={ true } searchable={ false } dataSort={ true } hidden={true}>Company ID</TableHeaderColumn>
                  <TableHeaderColumn dataField='firstname' dataSort={ true }>First Name</TableHeaderColumn>
                  <TableHeaderColumn dataField='lastname' dataSort={ true }>Last Name</TableHeaderColumn>
                  <TableHeaderColumn dataField='email' dataSort={ true }>Email</TableHeaderColumn>
                  <TableHeaderColumn dataField='phone' dataSort={ true }>Phone Number</TableHeaderColumn><TableHeaderColumn dataField='actions' dataFormat={this.format.bind(this)} export={ false }>Actions</TableHeaderColumn>
                </BootstrapTable>
                <Modal isOpen={this.state.modal} toggle={this.toggle()} className={this.props.className}>
                  
                      {/* <AddCompany handlerFromParant={this.handleChange} company_id={this.state.company_id}/> */}
                
              </Modal>
              </div>
              </CardBody>
            </Card>
		      </row>
		    </Page>
    );
  }
};

export default NewUsers;
