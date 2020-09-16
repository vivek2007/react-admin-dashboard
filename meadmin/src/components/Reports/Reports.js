import Page from 'components/Page';
import React from 'react';
import { Link } from 'react-router-dom';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {
  Card, CardBody, CardHeader, Col, Row,  
} from 'reactstrap';
import placeholderimg from '../../assets/img/placeholder.png';
import AppConstants from 'AppConstants';
import { connect } from 'react-redux';
import {ReactTitle} from 'react-meta-tags';
import Loading from 'assets/img/loader.gif';

class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      errMsg: false,
      loading: '',
     feedbackques:[],
     all_ans:[],
     isButtonDisabled: true,
     dataErr:true,
     dataReport:true,
     isDisabled:true,
     reportloading:''
    };
    this.handleClick  = this.handleClick.bind(this);
    this.handleReportClick  = this.handleReportClick.bind(this);
    
  }

  handleClick(e){
    this.setState({loading:true})
     var sheet = AppConstants.API + '/public/uploads/reports/Trips Report.xlsx';
     window.open(sheet, '_self');
     setTimeout(() => {
      this.setState({ loading: false});
        }, 2000);
  }
  handleReportClick(event){
    this.setState({reportloading:true})
    var sheet = AppConstants.API + '/public/uploads/reports/Riders Report.xlsx';
    window.open(sheet, '_self');
    setTimeout(() => {
      this.setState({ reportloading: false});
        }, 2000);
  }
 
  
  componentDidMount() {
      fetch(AppConstants.API+'/getAllReportsData').then(response => response.json())
    .then(data => {
      if(data.status == "success"){
          this.setState({ isButtonDisabled: false ,dataErr:false})
      }
    });
    
    fetch(AppConstants.API+'/getAllRiderReports').then(response => response.json())
    .then(data => {
        if(data.status == "success"){
         this.setState({ isDisabled: false ,dataReport:false})
        }
    });


  var element;
  element = document.getElementById("navItem-dashboard-0");
	element.classList.remove("active");
	if(this.props.auth.user.user_type!='agent'){
		element = document.getElementById("navItem-Riders-2");
		  element.classList.remove("active");
    element = document.getElementById("navItem-Call Center / Agency-0");
		  element.classList.remove("active");
		element = document.getElementById("navItem-Trip Purposes-0");
		  element.classList.remove("active");
		element = document.getElementById("navItem-Referral Partners-1");
		  element.classList.remove("active");
		element = document.getElementById("navItem-Provider Types-2");
		  element.classList.remove("active");
		element = document.getElementById("navItem-Funding Sources-3");
		  element.classList.remove("active");
    element = document.getElementById("navItem-Contact Us-5");
      element.classList.remove("active");
    element = document.getElementById("navItem-Saved Trips-3");
      element.classList.remove("active");
    element = document.getElementById("navItem-Feedback Questions-6");
      element.classList.remove("active");
	}
	if(this.props.auth.user.user_type!='callcenter' && this.props.auth.user.user_type!='report'){
    var element = document.getElementById("navItem-Reports-4");
		element.classList.add("active");
		var element = document.getElementById("navItem-Providers-1");
		element.classList.remove("active");
	}
    
  }
  render() {
    return (
      <Page title="All Reports" /*breadcrumbs={[{ name: 'Call Center', active: true }]}*/>
       <ReactTitle title="All Reports"/>
       <ul className="cst-breadcrumb">
        <li><Link to={'/dashboard'}>Home</Link> </li>
        <li> Reports </li>
      </ul>

      <Row>
        <Col md={4}>
          <Card className="p-0">
            <CardHeader>Trips Report</CardHeader>
            <CardBody>
             <button className={this.state.dataErr ? "btn btn-default":  "btn btn-info"} onClick={this.handleClick} disabled={this.state.isButtonDisabled}> Download Report <div style={this.state.loading ? {} : { display: 'none' }} className="image-fill w-25 loader-div">               <div class="clearfix">
  <div class="spinner-border spinner-border-sm" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div></div></button>
             <br/>
             {this.state.dataErr ? <span className="error">Please wait while loading data...</span>:null}
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-0">
            <CardHeader>Riders Report</CardHeader>
            <CardBody>
            <button className={this.state.dataReport ? "btn btn-default":  "btn btn-info"} onClick={this.handleReportClick} disabled={this.state.isDisabled}> Download Report <div style={this.state.reportloading ? {} : { display: 'none' }} className="image-fill w-25 loader-div">               <div class="clearfix">
  <div class="spinner-border spinner-border-sm" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div></div></button><br/>
            {this.state.dataReport ? <span className="error">Please wait while loading data...</span>:null}
            </CardBody>
          </Card>
        </Col>
      </Row>
      </Page>
    );
  }
};
const mapStateToProps = (state) => ({
  auth: state.auth
});
export  default connect(mapStateToProps, {})(Reports);