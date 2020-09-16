import React from 'react';
import {
  Row,
  CardBody,
  Card, 
  Col,
  FormGroup,
} from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Page from 'components/Page';
import AppConstants from 'AppConstants';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import moment from "moment";
import placeholderimg from '../../assets/img/placeholder.png';
import { MdDoneAll, MdQuestionAnswer} from 'react-icons/md';
import { FiUser, FiArrowRight } from "react-icons/fi";
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

var products = [];
class BSTable extends React.Component {
  render() {
    if (this.props.data) {
        return(
            <React.Fragment>
                {this.props.data.map((result,id)=>{
                return (
                    <div className="expend-block" isKey={ true }>
                        <h3>From my point of view, here is what happened today</h3>
                        <p  dataField='fieldA'>{result.fieldA}</p> 
                        <h3>The situation affected (i.e. myself, parents, friends, parole officer)</h3>
                        <p  dataField='fieldB'>{result.fieldB}</p> 
                        <h3>This situation made me feel (i.e. angry, frustrated, left out, confused)</h3>
                        <p  dataField='fieldC'>{result.fieldC}</p> 
                        <h3>Do you have any other feeling?</h3>
                        <p  dataField='fieldD'>{result.fieldD}</p> 
                    </div>
                    )})}
            </React.Fragment>)
    } else {
      return (<p>?</p>);
    }
  }
}

export default class ExpandRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        feelingJournals:[],
        profile_image:'',
        name:'',
        totalDataSize: 0,
        sizePerPage: 10,
        currentPage: 1,
        sortName: '',
        sortOrder: '',
        searchText: '',
        start_date:new Date()
    }
    this.onPageChange = this.onPageChange.bind(this);
    this.onSizePerPageList = this.onSizePerPageList.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this); 
    this.renderShowsTotal = this.renderShowsTotal.bind(this); 
    this.handleChange = this.handleChange.bind(this); 
    
  }

  renderShowsTotal(start, to, paginationShowsTotal) {
    console.log("start",start,"to",to,"paginationShowsTotal",paginationShowsTotal)
    return (
    <span >
       Showing rows { start } to { to } of { paginationShowsTotal }
    </span>
    );
}
  
  isExpandableRow(row) {
    if (row.feelingJournal_id) return true;
    else return false;
  }
  expandComponent(row) {
    return (
      <BSTable data={ row.expand } />
    );
  }
  onSizePerPageList(sizePerPage) {
    let page = 1;
     this.updateProvidersList(page, sizePerPage, this.state.sortName, this.state.sortOrder, this.state.searchText,this.state.start_date);
  }
  onPageChange(page, sizePerPage) {
     this.updateProvidersList(page, sizePerPage, this.state.sortName, this.state.sortOrder, this.state.defaultSearchText,this.state.start_date);
  }
  onSortChange(sortName, sortOrder) { 
      let page = 1;
       this.updateProvidersList(page, this.state.sizePerPage, sortName, sortOrder, this.state.searchText,this.state.start_date);
  }
  onSearchChange(searchText, colInfos, multiColumnSearch) {
    if(searchText && searchText !== "") {
    searchText = searchText;
    }else  {  
    searchText = '';
    }
      let page = 1;
       this.updateProvidersList(page, this.state.sizePerPage, this.state.sortName, this.state.sortOrder, searchText,this.state.start_date);
  }
  
  handleDate(cell,row){
    return(
       <div> <FiUser className="cs-lef" /> {moment(row.created_date).format("LLL") } </div>
    )
 }
 handleChange(date) {
  let page = 1;
  this.updateProvidersList(page, this.state.sizePerPage, this.state.sortName, this.state.sortOrder, this.state.searchText,date);
  this.setState({
    start_date: date
    //end_date :date
  });
  

}
  componentDidMount(){
    this.updateProvidersList(this.state.currentPage, this.state.sizePerPage, this.state.sortName, this.state.sortOrder, this.state.searchText,this.state.start_date);
    const that = this;
    // fetch(AppConstants.API + '/child/getChildFeelingJournals/' + this.props.data).then(function (res) {
    //     //console.log(res);
    //     if (res.status == 200) {
    //       return res.json();
    //     }
    //   })
    //   .then(function (data) {
    //       console.log("data.data",data.data)
    //     that.setState({
    //       profile_image:data.data.profile_image,
    //     })
    //     if(data.data.feelingJournalsData.length>0){
    //         that.addProducts(data.data.feelingJournalsData.length);
    //       }
    //   })
  }

  addProducts(quantity) {
    products = [];
    const startId = products.length;
    if(this.state.thermometerAns.length !='') {
      this.state.thermometerAns.map((res,i)=>{
        res.feelingJournalsData.map((item,i)=>{
          // result.map((item,index)=>{
            var data1 = {}
              data1["feelingJournal_id"]=res._id
              data1["created_date"]=item.created_date
              data1["expand"]=[
                  {
                      fieldA:item.happennd_today,
                      fieldB: item.situation_affected,
                      fieldC:item.situation_made_me_feel ,
                      fieldD: item.any_other_feeling
                  }
              ]
              products.push(data1)
          // })
        })
      })
    }
    this.setState({products:products})
  }

  updateProvidersList(page, sizePerPage, sortName, sortOrder, searchText,date){
    if(searchText && searchText !== "") {
      searchText = searchText;
    }else if(this.state.searchText && this.state.searchText !== "") {
      searchText = this.state.searchText;
    }else {
      searchText = '';
    }
    console.log("date",date)
    let tablefilterdata = {
      page: page,
      sizeperpage: sizePerPage,
      sortname: sortName,
      sortorder: sortOrder,
      serchtext: searchText,
      defaultSearchText: searchText,
      date:date
    };
    axios.post(AppConstants.API+ '/child/getChildFeelingJournals/' + this.props.data, tablefilterdata).then(res => {
      console.log("res.data.data202",res.data.data)
        if (res.data.Status === 'Success') {
          this.setState({
            thermometerAns: res.data.data,
            currentPage: page,
            sizePerPage: sizePerPage,
            sortName: sortName,
            sortOrder: sortOrder,
            serchtext: searchText,
            defaultSearchText: searchText
  
          });
        }    
        if(res.data.data.length!=undefined){
            this.addProducts(res.data.data.length);
            // this.setState({
            //   paginationShowsTotal: [res.data.data.length]
            // });
        }     
      });
    axios.post(AppConstants.API+'/child/getChildFeelingJournalsCount/' + this.props.data, tablefilterdata).then(res => {
      if (res.data.Status === 'Success') {
        this.setState({
          totalDataSize: res.data.data,
            serchText: searchText,
            defaultSearchText: searchText
        });
      }         
    });
    // this.setState({
    //   paginationShowsTotal: [this.state.thermometerAns.length]
    // });
  }
  render() {
    let image;
    if (this.state.profile_image == '' || this.state.profile_image == undefined) {
        image = placeholderimg;
    }
    else {
        image =  this.state.profile_image
    }
    const options = {
    //   expandRowBgColor: 'rgb(242, 255, 163)',
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

    // paginationShowsTotal: this.renderShowsTotal,  //this.renderShowsTotal- Accept bool or function

    paginationPosition: 'bottom',  // default is bottom, top and both is all available

    onPageChange: this.onPageChange,

    onSizePerPageList: this.onSizePerPageList,

    onSortChange: this.onSortChange,

    onSearchChange: this.onSearchChange,

    insertModal: this.createCustomModal, 

    paginationShowsTotal: this.renderShowsTotal

    };
        return (
            
                    <Row>
                      <Col xl={12} lg={12} md={12}>
                        <Card className="pt-0">
                            <CardBody>
                                <div className="row">
                                  <div className="card-body float-right">
                                  <DatePicker
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
                                  className="form-control" />
                                </div>
                                  </div>
                              
                                  
                                <div>
                                {/* <BootstrapTable data={this.state.children} remote = { true } 
                                 search={true} 
                                 pagination={true} fetchInfo={ { dataTotalSize: this.state.totalDataSize } }
                                 multiColumnSearch={true} 
                                 options={options}
                                //  insertRow
                                >  */}
                                <BootstrapTable className="toogle-data-tables" data={products} 
                                pagination={ true } multiColumnSearch={ true } remote = { true } 
                                options={ options }
                                expandableRow={ this.isExpandableRow }
                                expandComponent={ this.expandComponent }
                                fetchInfo={ { dataTotalSize: this.state.totalDataSize } }
                                expandColumnOptions={ { expandColumnVisible: true } }>
                                    <TableHeaderColumn dataField='feelingJournal_id' isKey={true} searchable={false} dataSort={true} hidden={true}>ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField='created_date' dataFormat={this.handleDate.bind(this)}><MdQuestionAnswer className="th-lef-icn" />&nbsp; &nbsp; Feeling Journals</TableHeaderColumn>
                                </BootstrapTable>
                                </div>
                            </CardBody>
                        </Card>
                        </Col>
                    </Row>
             
              )
    }
}
