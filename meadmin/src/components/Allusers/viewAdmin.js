import React from 'react';
import {
  Row,
  Col,
  CardBody,
  FormGroup,  CardHeader, Label,
  Card
} from 'reactstrap';
import Page from 'components/Page';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppConstants from 'AppConstants';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import placeholderimg from '../../assets/img/placeholder.png';
import {ReactTitle} from 'react-meta-tags';
import { MdInfoOutline} from 'react-icons/md';

class viewAdmin extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        _id: this.props.auth.user._id,
        firstname: '',
        lastname: '',
        fullname: '',
        phone: '',
        email: '',
        profile_img: '',
        prev_logo: '',
        view_logo: '',
        modal_show1:false,
        old_img: '',
        address: '',
        errMsg: '',
        state: '',
        zipcode: '',
        city: '',
        status: '',
      }
    }
    componentDidMount() {
        const that = this;
        fetch(AppConstants.API + '/admin/editAdmin/' + this.props.match.params.id)
      .then(function (res) {
        if (res.status == 200) {
          return res.json();
        }
      })
      .then(function (data) {
        if (data.Status == "Success") {
          that.setState({
            firstname: data.data.firstname,
            lastname: data.data.lastname,
            fullname: data.data.fullname,
            phone: data.data.phone,
            email: data.data.email,
            profile_image: data.data.profile_image,
            view_logo: data.data.profile_image,
            old_img: data.data.profile_image,
            address: data.data.address1,
            gender: data.data.gender,
            country: data.data.country,
            state: data.data.state,
            city: data.data.city,
            zipcode: data.data.zipcode
          });
        } else {
          console.log('invalid data')
        }
      });
      if(!this.props.auth.user.user_type){
        var element = document.getElementById("navItem-Admins-0");
        element.classList.add("active");
      }
    }
    render() {
        let image;
        if (this.state.profile_image == '' || this.state.profile_image == undefined) {
            image = placeholderimg;
        }
        else if (this.state.prev_logo == '') {
            image =   this.state.profile_image
        }
        return (
            <Page title="View Admin">
            <ul className="cst-breadcrumb">
                <li><Link to={'/dashboard'}>Home</Link></li>
                <li><Link to={'/allusers'}>All Admins</Link></li>
                <li>View Admin</li>
            </ul>
            <ReactTitle title="View Admin"/>
              <Row>
          <Col xl={12} lg={12} md={12}>
            <Card className="pt-0">
            <CardHeader> 
              <Label for="examplePassword" sm={12} className="px-0"><strong><MdInfoOutline fontSize="24" className="mr-2" />Admin Info</strong>
              </Label>
              </CardHeader>
              <CardBody>
                <FormGroup row>
                  <Col className="col-2 ml-3">
                      <figure className="view-profile-img" ><img src={image} /></figure>
                  </Col>
                  <Col sm={8} className="profile-info">

                  <h2 className="cst-pfname mb-0">{this.state.fullname ? this.state.fullname : 'N/A'}</h2>


                  <div className="row form-group">
                  <label htmlFor="exampleEmail" className="col-3 col-form-label">Email</label>
                  <label className="col-auto col-form-label">{this.state.email ? this.state.email : 'N/A'} </label>
                  </div>

                  <div className="row form-group">
                  <label htmlFor="exampleEmail" className="col-3 col-form-label">Phone Number</label>
                  <label className="col-auto col-form-label">{this.state.phone ? this.state.phone : 'N/A'}</label>
                  </div>

                

                  <div className="row form-group">
                  <label htmlFor="exampleEmail" className="col-3 col-form-label">Address</label>
                  <label className="col-auto col-form-label">{this.state.address ? this.state.address : 'N/A'}</label>
                  </div>

                  <div className="row form-group">
                  <label htmlFor="exampleEmail" className="col-3 col-form-label">City</label>
                  <label className="col-auto col-form-label">{this.state.city ? this.state.city : 'N/A'}  </label>
                  </div>
                  <div className="row form-group">
                  <label htmlFor="exampleEmail" className="col-3 col-form-label">State</label>
                  <label className="col-auto col-form-label">{this.state.state ? this.state.state : 'N/A'} </label>
                  </div>
                  
                  <div className="row form-group">
                  <label htmlFor="exampleEmail" className="col-3 col-form-label">Zip Code</label>
                  <label className="col-auto col-form-label">{this.state.zipcode ? this.state.zipcode : 'N/A'} </label>
                  </div>

                  </Col>
                  
                </FormGroup>
              </CardBody>

            </Card>
          </Col>

        </Row>

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