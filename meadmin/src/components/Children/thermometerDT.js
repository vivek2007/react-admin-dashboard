import React from 'react';
import {
  Row,
  CardBody,
  CardHeader,
  Card, 
  Col,
  Label,
  FormGroup,
} from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Page from 'components/Page';
import AppConstants from 'AppConstants';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import moment from "moment";
import placeholderimg from '../../assets/img/placeholder.png';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import tmMeterIcon from 'assets/img/tm-meter.png';
import { Line, Pie, Doughnut, Bar, Radar, Polar } from 'react-chartjs-2';
import tmQuestionIcon from 'assets/img/tm-question.png';
import { FiUser, FiArrowRight } from "react-icons/fi";

const today = new Date();

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September', 'October', 'November', 'December' ];
var Type = 'ThisWeek';
const genLineData = (moreData = {}) => {
  return {
    labels: MONTHS,
    datasets: [
      {
        label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        //...moreData,
      },
    ],
  };
};

// var products = [];
// class BSTable extends React.Component {
//   render() {
//     if (this.props.data) {
//         return(
//             <React.Fragment >
//                 {this.props.data.map((result,id)=>{
//                 return (
//                     <div className="expend-block pb-0" isKey={ true }>
//                       <h3>{result.question}</h3>
//                       <p className="mb-0"  dataField='fieldA'>{result.answer}</p> 
//                     </div>
//                 )})}
//             </React.Fragment>)
//     } else {
//       return (<p>?</p>);
//     }
//   }
// }


var products = [];
class BSTable extends React.Component {
  render() {
    if (this.props.data) {
        return(
            <React.Fragment >
              {this.props.data.length >1 ?
                 this.props.data.map((result,id)=>{
                  return (
                      <div className="expend-block pb-0" isKey={ true }>
                        <h3>{result.question}</h3>
                        <p  dataField='fieldA'>{result.answer}</p> 
                      </div>
                  )}):<div className="mb-0" className="expend-block" isKey={ true }>
                        <h3>{"N/A"}</h3>
                  </div>
              }               
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
        thermometerAns:[],
        profile_image:'',
        name:'',
        totalDataSize: 0,
        sizePerPage: 10,
        currentPage: 1,
        sortName: '',
        sortOrder: '',
        searchText: '',
        start_date : null,
        end_date : null,
        type : '', 
        type_error : '',
        placeholderSD : 'MM-DD-yyyy',
      placeholderTD : 'MM-DD-yyyy',
        type_error2 : '',
      genLineDT : {},

    }
    this.onPageChange = this.onPageChange.bind(this);
    this.onSizePerPageList = this.onSizePerPageList.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this); 
    this.renderShowsTotal = this.renderShowsTotal.bind(this); 
    this.handleChange = this.handleChange.bind(this); 
    this.handleEndDateChange = this.handleEndDateChange.bind(this);   
    this.handleInputChange = this.handleInputChange.bind(this); 

  }

  renderShowsTotal(start, to, paginationShowsTotal) {
    return (
    <span >
       Showing rows { start } to { to } of { paginationShowsTotal }
    </span>
    );
  }
  
  isExpandableRow(row) {
    if (row._id) return true;
    else return false;
  }
  expandComponent(row) {
    return (
      <BSTable data={ row.expand } />
    );
  }


  handleInputChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    });
     
      Type = e.target.value;
  
    this.getSDate(Type);
    if(Type == "Custom" && this.state.start_date !=null && this.state.end_date!=null) {
         this.getDPReport(Type,this.state.start_date,this.state.end_date);
         this.updateProvidersList(this.state.currentPage, this.state.sizePerPage, this.state.sortName, this.state.sortOrder, this.state.searchText,Type,this.state.start_date,this.state.end_date);
        //this.getMASReport(Type,this.state.start_date,this.state.end_date);
    }
    else if(Type == "ThisWeek" || Type == "Monthly" ||  Type == "Yearly") {
       this.getDPReport(Type,this.state.start_date,this.state.end_date);
       this.updateProvidersList(this.state.currentPage, this.state.sizePerPage, this.state.sortName, this.state.sortOrder, this.state.searchText,Type,this.state.start_date,this.state.end_date);
      //this.getMASReport(Type,this.state.start_date,this.state.end_date);
    }
     
  }
  getSDate(type) {
    let errors = {};
    let formIsValid = true;
  
        
    if(type == "Custom" && this.state.start_date == null && this.state.end_date == null){
        formIsValid = false;
        this.state.type_error = "Please select start date";
        this.state.type_error2="Please select end date";
        this.state.placeholderSD = "MM-DD-yyyy";
        this.state.placeholderTD = "MM-DD-yyyy";
        return false;
    } else {
      this.state.type_error='';
      this.state.type_error2='';
      this.state.start_date=null;
      this.state.end_date=null;
    }
  };

  handleChange(date) {
    this.setState({
      start_date: date
      //end_date :date
    });
    if(date && date!=null && this.state.end_date != null){
       this.getDPReport("Custom",date,this.state.end_date);
       this.updateProvidersList(this.state.currentPage, this.state.sizePerPage, this.state.sortName, this.state.sortOrder, this.state.searchText,"Custom",date,this.state.end_date);
      //this.getMASReport("Custom",date,this.state.end_date);
      this.state.type_error='';
      this.state.type_error2='';
    }
    if(date && date==null)
    this.state.type_error = "Please select start date";
    else if(date && date!=null) {
    this.state.type_error = "";
    this.state.type = "Custom";
    }
  }

  handleEndDateChange(date1) {
    this.setState({
      //start_date: date,
      end_date :date1
      
    });
    if(date1 && date1!=null && this.state.start_date != null){
       this.getDPReport("Custom",this.state.start_date,date1);
       this.updateProvidersList(this.state.currentPage, this.state.sizePerPage, this.state.sortName, this.state.sortOrder, this.state.searchText,"Custom",this.state.start_date,date1);
      //this.getMASReport("Custom",this.state.start_date,date1);
      this.state.type_error='';
      this.state.type_error2='';
    }
    
    if(date1 && date1==null)
    this.state.type_error2="Please select end date";
    else if(date1 && date1!=null){
    this.state.type_error2 = "";
    this.state.type = "Custom";
    }
  
    if(new Date(date1).toISOString() >= new Date(this.state.start_date).toISOString()) {
       this.getDPReport("Custom",this.state.start_date,date1);
       this.updateProvidersList(this.state.currentPage, this.state.sizePerPage, this.state.sortName, this.state.sortOrder, this.state.searchText,"Custom",this.state.start_date,date1);
      //this.getMASReport("Custom",this.state.start_date,date1);
    } else {
      this.state.type_error2="To date should be greater than From date";
    }
  
    
  }
  getDPReport(Type,custom_date,end_date){
    console.log("type",Type,"custom",custom_date,"end_date",end_date);
    var UserID =this.props.data;
    fetch(AppConstants.API+'/child/getUsersReportView/'+ UserID +'/'+Type+'/'+custom_date+'/'+end_date).then(response => response.json())
    .then(data => { 
     if(data.status == "success")
      {
        var genLineDTv={
          labels: data.all_dates,
          datasets: [
            {
              label: 'Reading',
              backgroundColor: '#fd671a',
              borderColor: '#fd671a',
              borderWidth: 1,
              data: data.daily_goals_percentage_values  ,
              // data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              fill:false
            },
          ],
        };
        var sd = data.all_dates[0];
        var ed = data.all_dates[data.all_dates.length-1];
        this.setState({ genLineDT:genLineDTv ,all_dates: data.all_dates,placeholderSD:sd,placeholderTD:ed});
      } 
      });
  }
  handleDate(cell,row){
    return(
      <div> <FiUser className="cs-lef" />  {moment(row.created_date).format("LLL")}</div> 
    )
 }
  componentDidMount(){
    this.updateProvidersList(this.state.currentPage, this.state.sizePerPage, this.state.sortName, this.state.sortOrder, this.state.searchText);


    const that = this;
    // fetch(AppConstants.API + '/thermometerReading/getThermoReading/' + this.props.data).then(function (res) {
    //     //console.log(res);
    //     if (res.status == 200) {
    //       return res.json();
    //     }
    //   })
    //   .then(function (data) {
       
    //     that.setState({
    //       thermometerAns :data.data,
      
    //     })
    //     if(data.data.length>0){
    //         that.addProducts(data.data.length);
    //       }
    //   }
    this.getDPReport("ThisWeek",null,null); 
    
  }
  onSizePerPageList(sizePerPage) {
    console.log("onSizePerPageList",sizePerPage,"Type",Type);
    let page = 1;
     this.updateProvidersList(page, sizePerPage, this.state.sortName, this.state.sortOrder, this.state.searchText,Type,this.state.custom_date,this.state.end_date);
  }
  onPageChange(page, sizePerPage) {
    console.log("onPageChange",page,sizePerPage,"Type",Type)
     this.updateProvidersList(page, sizePerPage, this.state.sortName, this.state.sortOrder, this.state.defaultSearchText,Type,this.state.custom_date,this.state.end_date);
  }
  onSortChange(sortName, sortOrder) { 
    console.log("onSortChange",sortName,sortOrder,"Type",Type)
      let page = 1;
       this.updateProvidersList(page, this.state.sizePerPage, sortName, sortOrder, this.state.searchText,Type,this.state.custom_date,this.state.end_date);
  }
  onSearchChange(searchText, colInfos, multiColumnSearch) {
    console.log("onSearchChange",searchText,"Type",Type)
    if(searchText && searchText !== "") {
    searchText = searchText;
    }else  {  
    searchText = '';
    }
      let page = 1;
       this.updateProvidersList(page, this.state.sizePerPage, this.state.sortName, this.state.sortOrder, searchText,Type,this.state.custom_date,this.state.end_date);
  }
  addProducts(quantity) {
     products = [];
     var subArray = [];
    const startId = products.length;
    this.state.thermometerAns.map((result,i)=>{
        var data1 = {};
        data1["_id"] = result._id
        data1["created_date"] = result.created_date
        data1["expand"] = result.thermometerData;
        products.push(data1)

    })

    this.setState({products:products})
  }
  updateProvidersList(page, sizePerPage, sortName, sortOrder, searchText,Type,custom_date,end_date){
    if(searchText && searchText !== "") {
      searchText = searchText;
    }else if(this.state.searchText && this.state.searchText !== "") {
      searchText = this.state.searchText;
    }else {
      searchText = '';
    }
    var addType =  (Type == 'undefined') ? 'ThisWeek' : Type;

    console.log("type323",Type,"custom323",custom_date,end_date);
    let tablefilterdata = {
      page: page,
      sizeperpage: sizePerPage,
      sortname: sortName,
      sortorder: sortOrder,
      serchtext: searchText,
      defaultSearchText: searchText,
      Type:addType,
      custom_date:custom_date,
      end_date:end_date

    };
    console.log("tablefilterdata",tablefilterdata)
      axios.post(AppConstants.API+'/thermometerReading/getThermoReading/' + this.props.data, tablefilterdata).then(res => {
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
        console.log("res.data.data353",res.data.data)  
        if(res.data.data.length>0){
            this.addProducts(res.data.data.length);
        }     
      });
    axios.post(AppConstants.API+'/thermometerReading/getThermoReadingCount/' + this.props.data, tablefilterdata).then(res => {
      if (res.data.Status === 'Success') {
        console.log("ressssss183",res.data.data)
        this.setState({
          totalDataSize: res.data.data,
            serchText: searchText,
            defaultSearchText: searchText
        });
      }         
    });
    console.log("this.state.thermometerAns.length368",this.state.thermometerAns.length)
    this.setState({
      paginationShowsTotal: [this.state.thermometerAns.length]
    });
  }
  render() {
    //   console.log("products",this.state.products)
    let image;
    if (this.state.profile_image == '' || this.state.profile_image == undefined) {
        image = placeholderimg;
    }
    else {
        image =  this.state.profile_image
    }
    const optionsTwo = {
      annotation: {
            annotations: [{
                drawTime: 'afterDatasetsDraw',
                borderColor: 'red',
                borderDash: [2, 2],
                borderWidth: 1,
                mode: 'vertical',
                type: 'line',
                value: 10,
                scaleID: 'x-axis-0'
          }]
      },
      scales: {
        yAxes: [{         
          ticks: {         
            beginAtZero: true,        
          }         
        }]         
      },
      maintainAspectRation: false
  };
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

    paginationPosition: 'bottom',  // default is bottom, top and both is all available

    onPageChange: this.onPageChange,

    onSizePerPageList: this.onSizePerPageList,

    onSortChange: this.onSortChange,

    onSearchChange: this.onSearchChange,

    insertModal: this.createCustomModal, 

    paginationShowsTotal: this.renderShowsTotal

    };
        return (
          <React.Fragment>
                  <Row>
                  <Col xl={12} lg={12} md={12}>
                    
                        <CardHeader className="d-flex justify-content-between">
                        <Label for="examplePassword" className="m-0"><strong><img src={tmMeterIcon} />Thermometer Stats & Questions</strong></Label>
                      </CardHeader>
                        <CardBody>
                          <div className="d-flex justify-content-center m-auto pt-3 sort-control">
                              <div className="col-3 mb-0 position-relative">
                                <select className="form-control" name="type" onChange={ this.handleInputChange } value={this.state.type}>
                                  <option value="ThisWeek">Weekly</option>
                                  <option value="Monthly">Monthly</option>
                                  <option value="Yearly">Yearly</option>
                                  <option value="Custom">Custom</option> 
                                </select>
                              </div>
                                <div className="col-3 position-relative dp-icn">
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
                                minDate={new Date().setFullYear(new Date().getFullYear() - 5)}   
                                  maxDate={new Date()}
                                  onKeyDown={(e) =>e.preventDefault()}
                                className="form-control" />
                              <span className="error d-block" style={{color: 'red'}}>{this.state.type_error}</span>
                            </div>
                            <div className="col-3 position-relative dp-icn">
                            <DatePicker
                                name="end_date"
                                className="form-control"
                                //placeholderText="MM-DD-YYYY"
                                placeholderText={this.state.placeholderTD}                    
                                selected={this.state.end_date}
                                selectsEnd
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                //startDate={this.state.startDate}
                                dateFormat={"MM-dd-yyyy"}
                                endDate={this.state.endDate}
                                onChange={this.handleEndDateChange}
                                autoComplete = "off"
                                onKeyDown={(e) =>e.preventDefault()}
                                minDate={new Date().setFullYear(new Date().getFullYear() - 5)}   
                                maxDate={new Date()}
                                className="form-control" />
                              <span className="error d-block" style={{color: 'red'}}>{this.state.type_error2}</span>
                            </div>
                          </div>
                          <div className="col-11 m-auto pt-4"><Line data={this.state.genLineDT}  options={optionsTwo} /></div>
                        </CardBody>
                  
                        </Col>
                   
                    <Col xl={12} lg={12} md={12}>
                    
                        {/* <CardHeader><Label for="examplePassword" className="m-0"><strong><img src={tmQuestionIcon} />Thermometer Questions</strong></Label></CardHeader> */}
                            {/* <CardBody>
                                <div>
                                <BootstrapTable className="toogle-data-tables" data={products} 
                                fetchInfo={ { dataTotalSize: this.state.totalDataSize } }
                                remote = { true }
                                // search={ true }
                                 pagination={ true } multiColumnSearch={ true }
                                options={ options }
                                expandableRow={ this.isExpandableRow }
                                expandComponent={ this.expandComponent }
                                expandColumnOptions={ { expandColumnVisible: true } }>
                                    <TableHeaderColumn dataField='_id' isKey={true} searchable={false} dataSort={true} hidden={true}>ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField='created_date' dataFormat={this.handleDate.bind(this)}>Date</TableHeaderColumn>
                                </BootstrapTable>
                                </div>
                            </CardBody> */}
                      
                        </Col>
                    </Row>
               </React.Fragment>
              )
    }
}
