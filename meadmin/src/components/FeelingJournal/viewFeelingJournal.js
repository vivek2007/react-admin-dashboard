import React from 'react';
import {
  Row,
  Col,
  CardHeader,
  Label,
  CardBody,
  FormGroup,
  Card, TabContent, TabPane, Nav, NavItem, NavLink
} from 'reactstrap';
import feeljornlIcon from 'assets/img/fe-jrnls.png';
import Page from 'components/Page';
import PropTypes from 'prop-types';
import moment from "moment";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppConstants from 'AppConstants';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import placeholderimg from '../../assets/img/placeholder.png';
import {ReactTitle} from 'react-meta-tags';
import classnames from 'classnames';
import FDdatatables from './fJDataTables';
import { FiUser, FiArrowRight } from "react-icons/fi";

class viewAdmin extends React.Component {
  
    constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);
      this.state = {
        _id: this.props.auth.user._id,
        profile_image:'',
        name:'',
        program:'',
        // happennd_today:'',
        // situation_affected:'',
        // situation_made_me_feel:'',
        // name:'',
        // any_other_feeling:'',
        feelingJournals:[]
      }
    }
    
    toggle(tab) {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab
        });
      }
    }
    componentDidMount() {

      

        const that = this;
        fetch(AppConstants.API + '/child/getChildProfileFeelingJournals/' + this.props.match.params.id).then(function (res) {
          //console.log(res);
          if (res.status == 200) {
            return res.json();
          }
        })
        .then(function (data) {
            console.log("data.data63",data.data)
          that.setState({
            profile_image:data.data[0].profile_image,
            name:data.data[0].name,
            program:data.data[0].program
          })
        })
      //   fetch(AppConstants.API + '/feelingjournal/getFeelingJournalChild/' + this.props.match.params.id)
      // .then(function (res) {
      //   console.log(" res", res)
      //   if (res.status == 200) {
      //     return res.json();
      //   }
      // })
      // .then(function (data) {
      //   if (data.Status == "Success") {
      //       console.log(" data.data", data.data)
      //     that.setState({
      //     //   created_date: data.data[0].created_date,
      //       happennd_today: data.data[0].happennd_today,
      //       situation_affected: data.data[0].situation_affected,
      //       situation_made_me_feel: data.data[0].situation_made_me_feel,
      //       any_other_feeling:data.data[0].any_other_feeling,
      //      name:data.data[0].childname
      //     });
      //   } else {
      //     console.log('invalid data')
      //   }
      // });
      if(!this.props.auth.user.user_type){
        var element = document.getElementById("navItem-Feeling Journals-0");
        element.classList.add("active");
        var element = document.getElementById("navItem-Clients-0");
        element.classList.remove("active");
      }
    }
    render() {
      let image;
      if (this.state.profile_image == '' || this.state.profile_image == undefined) {
          image = placeholderimg;
      }
      else {
          image =  this.state.profile_image
      }
        return (
            <Page title="View Feeling Journal">
            <ul className="cst-breadcrumb">
                <li><Link to={'/dashboard'}>Home</Link></li>
                <li><Link to={'/allFeelingJournals'}>All Feeling Journals</Link></li>
                <li>View Feeling Journals</li>
            </ul>
            <ReactTitle title="View Feeling Journal"/>
            <Card className="pt-0 spl-card">
                            <CardBody  className="pb-0">
              <div className="pf-info-cs d-flex">
                <figure><img src={image} className="shadow" /></figure>
                <h2 className="cst-pfname">{this.state.name ? this.state.name : 'N/A'}  <span>{this.state.program ? this.state.program : 'N/A'}</span>
                <Link  href="#"   to = {"/viewChild/" + this.props.match.params.id} >View Student Detail <FiArrowRight /> </Link>
                </h2>
              </div>
              
                            </CardBody>
                        </Card>
            <FDdatatables data={this.props.match.params.id}/>
              </Page>
              )
    }
}
viewAdmin.propTypes = {
    auth: PropTypes.object.isRequired,
    //profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  
  };
  const mapStateToProps = (state) => ({
    auth: state.auth,
    //profile: state.profile,
    errors: state.errors,
  
  });
  
  export default connect(mapStateToProps, {})(viewAdmin);