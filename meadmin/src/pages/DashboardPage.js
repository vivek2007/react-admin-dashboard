import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col} from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";

import Page from 'components/Page';
import AppConstants from 'AppConstants';
import { NumberWidget, IconWidget } from 'components/Widget';
import {ReactTitle} from 'react-meta-tags';
import Loader from 'react-loader';

class DashboardPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      child_count : 0,
      admin_count : 0,
      parent_count : 0,
      mentor_count : 0,
      page_loader : true,
    };
  }
  componentDidMount() {
    
  
  var element = document.getElementById("navItem-Stores-0");
  element.classList.remove("active");
  var element = document.getElementById("navItem-Services-2");
  element.classList.remove("active");
  
  var element = document.getElementById("navItem-Brands-1");
  element.classList.remove("active");

  var element = document.getElementById("navItem-Devices-3");
  element.classList.remove("active");

  var element = document.getElementById("navItem-dashboard-0");
  element.classList.add("active");
  
  // var element = document.getElementById("navItem-Mentor Habits-1");
  // element.classList.remove("active");
 
  }
  render() {
    return ( 
      <Loader loaded={this.state.page_loader}  >
      <Page
        className="DashboardPage"
        title="Dashboard"
        /*breadcrumbs={[{ name: 'Dashboard', active: true }]}*/>
        <ul className="cst-breadcrumb">
          {/* <li>Home</li>
          <li>Dashboard</li> */}
        </ul>
        <ReactTitle title="Dashboard"/>
        <Row>
       
        </Row>
      </Page>
      </Loader>    
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth
});
export  default connect(mapStateToProps, {})(DashboardPage);
//export default DashboardPage;