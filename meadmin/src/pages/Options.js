import React from 'react';
import  { Redirect,Link } from 'react-router-dom';
import YearPicker from "react-year-picker";

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback,
} from 'reactstrap';

import {
  MdCreate,
  MdDelete,
  MdRemoveRedEye,
  MdLaunch,
  MdAdd,
} from 'react-icons/md';

import Page from 'components/Page';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppConstants from 'AppConstants';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

class Options extends React.Component {
  constructor(props){
    super(props);
    this.state = {
		_id:this.props.auth.user._id,
		year_of_birth:'',
		permanent_or_temporary_disability:'',
		eligible_for_ada_paratransit:'',
		medicaid_tncare:'',
		require_a_wheelchair:'',
		folding_wheelchair:'',
		motorized_wheelchair:'',
		require_a_wheelchair_lift:'',
		space_for_stretcher:'',
		space_for_car_seat:'',
		travel_with_companion:'',
		service_animal:'',
		require_assistance_from_the_driver_exit:'',
		assistance_getting_front_door:'',
		door_through_door_assistance:'',
		key: 1,  
		errors: {},
		errMsg:false
		
    }
    this.handleSubmit = this.handleSubmit.bind(this);  
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStatDate = this.handleStatDate.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(key) {
    alert(`selected ${key}`);
    
    if(key=='0'){
		this.props.history.push('/findmytrips');  
	}else if(key=='1'){
	
		this.props.history.push('/options');  
	}
    this.setState({ key });
  }
   handleStatDate(date) {
		 this.setState({
		  year_of_birth: date
		});
  } 
  handleInputChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    });
  }
  
  /** Validations */
  handleValidation(){
    let errors = {};
    let formIsValid = true;
    
    alert(this.state.year_of_birth);
    if(!this.state.year_of_birth){
        formIsValid = false;
        errors["year_of_birth"] = "Please choose year of birth";
    }
    
    this.setState({errors: errors});
    return formIsValid;
  }
  handleSubmit = event => {
    event.preventDefault();
    //alert(this.state.timeSeconds);
    if(this.handleValidation()){
      const addprovider = {
        id:this.props.auth.user._id,
        year_of_birth:this.state.year_of_birth,
        permanent_or_temporary_disability:this.state.permanent_or_temporary_disability,
        eligible_for_ada_paratransit:this.state.eligible_for_ada_paratransit,
		medicaid_tncare:this.state.medicaid_tncare,
		require_a_wheelchair:this.state.require_a_wheelchair,
		folding_wheelchair:this.state.folding_wheelchair,
		motorized_wheelchair:this.state.motorized_wheelchair,
		require_a_wheelchair_lift:this.state.require_a_wheelchair_lift,
		space_for_stretcher:this.state.space_for_stretcher,
		space_for_car_seat:this.state.space_for_car_seat,
		travel_with_companion:this.state.travel_with_companion,
		service_animal:this.state.service_animal,
		require_assistance_from_the_driver_exit:this.state.require_assistance_from_the_driver_exit,
		assistance_getting_front_door:this.state.assistance_getting_front_door, 
		door_through_door_assistance:this.state.door_through_door_assistance	    
    }
     console.log(addprovider);    
      /*axios.post(AppConstants.API+'/provider/addProvider',addprovider)
        .then(res => {   
          console.log(res);   
         if(res.data.status == "success"){
          setTimeout((e) => {
              this.props.history.push('/allProviders');
          }, 2000);
          this.setState({
            errMsg: res.data.msg
          });
          setTimeout(() => {
            this.setState({
              errMsg: false,
            });
          }, 1000);
        }
        else{
          this.setState({
            errMsg: res.data.msg
          });
        }
      });*/
    } 
  };  
componentDidMount() {
    const that = this; 
}
  render() {
  return (
    
      
   
     <Page title="Available  Options">
      <Row>
        <Col xl={12} lg={12} md={12}>
          <Card>
            <CardBody>
              <Form name="options" onSubmit= { this.handleSubmit }>
                <FormGroup row>
                  <Label for="errorstatus" sm={2}>
                  </Label>
                  <Col sm={10}>                    
                  <span className="error" style={{color: 'red'}}>{this.state.errMsg}</span>
                  </Col>
                </FormGroup>
               {this.state.showOptions? 
                <FormGroup row>
                  <Label for="Year of Birth?" sm={2}>
                    Year of Birth?
                  </Label>
                  <Col sm={10}>
                    <YearPicker name="year_of_birth"  onChange={this.handleStatDate} />
                    <span className="error" style={{color: 'red'}}>{this.state.errors["year_of_birth"]}</span>                 
                  </Col>
                </FormGroup>
                :null
				}
                {this.state.showOptions?
                <FormGroup row>
                  <Label for=" Do you have a permanent or temporary disability?" sm={6}>
                    Do you have a permanent or temporary disability?
				   </Label>
                  <Col sm={1}>
                     <Input
                      type="radio"
                      name="permanent_or_temporary_disability"                   
                      value="Yes" checked={ this.state.permanent_or_temporary_disability =='Yes'}
                    onChange={ this.handleInputChange }              
                    />Yes 
                    </Col>   
                    <Col sm={1}>
                    <Input
                      type="radio"
                      name="permanent_or_temporary_disability"                   
                      value="No" checked={ this.state.permanent_or_temporary_disability =='No'}
                     onChange={ this.handleInputChange }                     
                    />No
                    </Col>   
                     <Col sm={2}>
                    <Input
                      type="radio"
                      name="permanent_or_temporary_disability"                   
                      value="Not_sure" checked={ this.state.permanent_or_temporary_disability =='Not_sure'}
                     onChange={ this.handleInputChange }                     
                    />Not Sure
                    <span className="error" style={{color: 'red'}}>{this.state.errors["permanent_or_temporary_disability"]}</span>
                  </Col>
                </FormGroup>
                :null
				}
                {this.state.showOptions?
                <FormGroup row>
                  <Label for="Are you eligible for ADA paratransit?" sm={6}>
                    Are you eligible for ADA paratransit?
                  </Label>
                  <Col sm={1}>
                     <Input
                      type="radio"
                      name="eligible_for_ada_paratransit"                   
                      value="Yes" checked={ this.state.eligible_for_ada_paratransit =='Yes'}
                    onChange={ this.handleInputChange }              
                    />Yes 
                    </Col>   
                    <Col sm={1}>
                    <Input
                      type="radio"
                      name="eligible_for_ada_paratransit"                   
                      value="No" checked={ this.state.eligible_for_ada_paratransit =='No'}
                     onChange={ this.handleInputChange }                     
                    />No
                    </Col>   
                     <Col sm={2}>
                    <Input
                      type="radio"
                      name="eligible_for_ada_paratransit"                   
                      value="Not_sure" checked={ this.state.eligible_for_ada_paratransit =='Not_sure'}
                     onChange={ this.handleInputChange }                     
                    />Not Sure
                    <span className="error" style={{color: 'red'}}>{this.state.errors["eligible_for_ada_paratransit"]}</span>
                  </Col>
                </FormGroup>
                :null
				}
                {this.state.showOptions?
                <FormGroup row>
                  <Label for="Do you have Medicaid/TNCare?" sm={6}>
                    Do you have Medicaid/TNCare?
                  </Label>
                 <Col sm={1}>
                     <Input
                      type="radio"
                      name="medicaid_tncare"                   
                      value="Yes" checked={ this.state.medicaid_tncare =='Yes'}
                    onChange={ this.handleInputChange }              
                    />Yes 
                    </Col>   
                    <Col sm={1}>
                    <Input
                      type="radio"
                      name="medicaid_tncare"                   
                      value="No" checked={ this.state.medicaid_tncare =='No'}
                     onChange={ this.handleInputChange }                     
                    />No
                    </Col>   
                     <Col sm={2}>
                    <Input
                      type="radio"
                      name="medicaid_tncare"                   
                      value="Not_sure" checked={ this.state.medicaid_tncare =='Not_sure'}
                     onChange={ this.handleInputChange }                     
                    />Not Sure
                    <span className="error" style={{color: 'red'}}>{this.state.errors["medicaid_tncare"]}</span>
                  </Col>
                </FormGroup>
                :null
				}
                {this.state.showOptions?
                <FormGroup row>
                  <Label for="Do you require a wheelchair?" sm={6}>
                  Do you require a wheelchair?
                  </Label>
                  <Col sm={1}>
                     <Input
                      type="radio"
                      name="require_a_wheelchair"                   
                      value="Yes" checked={ this.state.require_a_wheelchair =='Yes'}
                    onChange={ this.handleInputChange }              
                    />Yes 
                    </Col>   
                    <Col sm={1}>
                    <Input
                      type="radio"
                      name="require_a_wheelchair"                   
                      value="No" checked={ this.state.require_a_wheelchair =='No'}
                     onChange={ this.handleInputChange }                     
                    />No
                    </Col>   
                     <Col sm={2}>
                   <Input
                      type="radio"
                      name="require_a_wheelchair"                   
                      value="Not_sure" checked={ this.state.require_a_wheelchair =='Not_sure'}
                     onChange={ this.handleInputChange }                     
                    />Not Sure
                    <span className="error" style={{color: 'red'}}>{this.state.errors["require_a_wheelchair"]}</span>
                  </Col>
                </FormGroup>
                :null
				}
                {this.state.showOptions?
                <FormGroup row>
                  <Label for="Do you use a folding wheelchair?" sm={6}>
                    Do you use a folding wheelchair?
                  </Label>
                 <Col sm={1}>
                     <Input
                      type="radio"
                      name="folding_wheelchair"                   
                      value="Yes" checked={ this.state.folding_wheelchair =='Yes'}
                    onChange={ this.handleInputChange }              
                    />Yes 
                    </Col>   
                    <Col sm={1}>
                    <Input
                      type="radio"
                      name="folding_wheelchair"                   
                      value="No" checked={ this.state.folding_wheelchair =='No'}
                     onChange={ this.handleInputChange }                     
                    />No
                    </Col>   
                     <Col sm={2}>
                    <Input
                      type="radio"
                      name="folding_wheelchair"                   
                      value="Not_sure" checked={ this.state.folding_wheelchair =='Not_sure'}
                     onChange={ this.handleInputChange }                     
                    />Not Sure
                    <span className="error" style={{color: 'red'}}>{this.state.errors["folding_wheelchair"]}</span>
                  </Col>
                </FormGroup>
                :null
				}
                {this.state.showOptions?
                <FormGroup row>
                  <Label for="Do you use a motorized wheelchair?" sm={6}>
                  Do you use a motorized wheelchair?
                  </Label>
                  <Col sm={1}>
                     <Input
                      type="radio"
                      name="motorized_wheelchair"                   
                      value="Yes" checked={ this.state.motorized_wheelchair =='Yes'}
                    onChange={ this.handleInputChange }              
                    />Yes 
                    </Col>   
                    <Col sm={1}>
                    <Input
                      type="radio"
                      name="motorized_wheelchair"                   
                      value="No" checked={ this.state.motorized_wheelchair =='No'}
                     onChange={ this.handleInputChange }                     
                    />No
                    </Col>   
                     <Col sm={2}>
                    <Input
                      type="radio"
                      name="motorized_wheelchair"                   
                      value="Not_sure" checked={ this.state.motorized_wheelchair =='Not_sure'}
                     onChange={ this.handleInputChange }                     
                    />Not Sure
                    <span className="error" style={{color: 'red'}}>{this.state.errors["motorized_wheelchair"]}</span>
                  </Col>
                </FormGroup>
                :null
				}
                {this.state.showOptions?
                <FormGroup row>
                  <Label for="Do you require a wheelchair lift?" sm={6}>
                     Do you require a wheelchair lift?
                  </Label>
                 <Col sm={1}>
                     <Input
                      type="radio"
                      name="require_a_wheelchair_lift"                   
                      value="Yes" checked={ this.state.require_a_wheelchair_lift =='Yes'}
                    onChange={ this.handleInputChange }              
                    />Yes 
                    </Col>   
                    <Col sm={1}>
                    <Input
                      type="radio"
                      name="require_a_wheelchair_lift"                   
                      value="No" checked={ this.state.require_a_wheelchair_lift =='No'}
                     onChange={ this.handleInputChange }                     
                    />No
                    </Col>   
                     <Col sm={2}>
                    <Input
                      type="radio"
                      name="require_a_wheelchair_lift"                   
                      value="Not_sure" checked={ this.state.require_a_wheelchair_lift =='Not_sure'}
                     onChange={ this.handleInputChange }                     
                    />Not Sure
                    <span className="error" style={{color: 'red'}}>{this.state.errors["require_a_wheelchair_lift"]}</span>
                  </Col>
                </FormGroup>
                :null
				}
                {this.state.showOptions?
                <FormGroup row>
                  <Label for="Do you need a vehicle that has space for a stretcher?" sm={6}>
                  Do you need a vehicle that has space for a stretcher?
                  </Label>
                  <Col sm={1}>
                     <Input
                      type="radio"
                      name="space_for_stretcher"                   
                      value="Yes" checked={ this.state.space_for_stretcher =='Yes'}
                    onChange={ this.handleInputChange }              
                    />Yes 
                    </Col>   
                    <Col sm={1}>
                    <Input
                      type="radio"
                      name="space_for_stretcher"                   
                      value="No" checked={ this.state.space_for_stretcher =='No'}
                     onChange={ this.handleInputChange }                     
                    />No
                    </Col>   
                     <Col sm={2}>
                    <Input
                      type="radio"
                      name="space_for_stretcher"                   
                      value="Not_sure" checked={ this.state.space_for_stretcher =='Not_sure'}
                     onChange={ this.handleInputChange }                     
                    />Not Sure
                    <span className="error" style={{color: 'red'}}>{this.state.errors["space_for_stretcher"]}</span>
                  </Col>
                </FormGroup>
                :null
				}
                {this.state.showOptions?
                <FormGroup row>
                  <Label for="Do you need space for a car seat?" sm={6}>
                  Do you need space for a car seat?
                  </Label>
                  <Col sm={1}>
                     <Input
                      type="radio"
                      name="space_for_car_seat"                   
                      value="Yes" checked={ this.state.space_for_car_seat =='Yes'}
                    onChange={ this.handleInputChange }              
                    />Yes 
                    </Col>   
                    <Col sm={1}>
                    <Input
                      type="radio"
                      name="space_for_car_seat"                   
                      value="No" checked={ this.state.space_for_car_seat =='No'}
                     onChange={ this.handleInputChange }                     
                    />No
                    </Col>   
                     <Col sm={2}>
                    <Input
                      type="radio"
                      name="space_for_car_seat"                   
                      value="Not_sure" checked={ this.state.space_for_car_seat =='Not_sure'}
                     onChange={ this.handleInputChange }                     
                    />Not Sure
                    <span className="error" style={{color: 'red'}}>{this.state.errors["space_for_car_seat"]}</span>
                  </Col>
                </FormGroup>
                :null
				}
                {this.state.showOptions?
                 <FormGroup row>
                  <Label for="Do you need to travel with a companion?" sm={6}>
                  Do you need to travel with a companion?
                  </Label>
                  <Col sm={1}>
                     <Input
                      type="radio"
                      name="travel_with_companion"                   
                      value="Yes" checked={ this.state.travel_with_companion =='Yes'}
                    onChange={ this.handleInputChange }              
                    />Yes 
                    </Col>   
                    <Col sm={1}>
                    <Input
                      type="radio"
                      name="travel_with_companion"                   
                      value="No" checked={ this.state.travel_with_companion =='No'}
                     onChange={ this.handleInputChange }                     
                    />No
                    </Col>   
                     <Col sm={2}>
                    <Input
                      type="radio"
                      name="travel_with_companion"                   
                      value="Not_sure" checked={ this.state.travel_with_companion =='Not_sure'}
                     onChange={ this.handleInputChange }                     
                    />Not Sure
                    <span className="error" style={{color: 'red'}}>{this.state.errors["travel_with_companion"]}</span>
                  </Col>
                </FormGroup>
                :null
				}
                {this.state.showOptions?
                <FormGroup row>
                  <Label for="Do you travel with a service animal?" sm={6}>
                  Do you travel with a service animal?
                  </Label>
                  <Col sm={1}>
                     <Input
                      type="radio"
                      name="service_animal"                   
                      value="Yes" checked={ this.state.service_animal =='Yes'}
                    onChange={ this.handleInputChange }              
                    />Yes 
                    </Col>   
                    <Col sm={1}>
                    <Input
                      type="radio"
                      name="service_animal"                   
                      value="No" checked={ this.state.service_animal =='No'}
                     onChange={ this.handleInputChange }                     
                    />No
                    </Col>   
                     <Col sm={2}>
                    <Input
                      type="radio"
                      name="service_animal"                   
                      value="Not_sure" checked={ this.state.service_animal =='Not_sure'}
                     onChange={ this.handleInputChange }                     
                    />Not Sure
                    <span className="error" style={{color: 'red'}}>{this.state.errors["service_animal"]}</span>
                  </Col>
                </FormGroup>
                :null
				}
                {this.state.showOptions?
                 <FormGroup row>
                  <Label for="Do you require assistance from the driver to exit a vehicle?" sm={6}>
                  Do you require assistance from the driver to exit a vehicle?
                  </Label>
                 <Col sm={1}>
                     <Input
                      type="radio"
                      name="require_assistance_from_the_driver_exit"                   
                      value="Yes" checked={ this.state.require_assistance_from_the_driver_exit =='Yes'}
                    onChange={ this.handleInputChange }              
                    />Yes 
                    </Col>   
                    <Col sm={1}>
                    <Input
                      type="radio"
                      name="require_assistance_from_the_driver_exit"                   
                      value="No" checked={ this.state.require_assistance_from_the_driver_exit =='No'}
                     onChange={ this.handleInputChange }                     
                    />No
                    </Col>   
                     <Col sm={2}>
                    <Input
                      type="radio"
                      name="require_assistance_from_the_driver_exit"                   
                      value="Not_sure" checked={ this.state.require_assistance_from_the_driver_exit =='Not_sure'}
                     onChange={ this.handleInputChange }                     
                    />Not Sure
                    <span className="error" style={{color: 'red'}}>{this.state.errors["require_assistance_from_the_driver_exit"]}</span>
                  </Col>
                </FormGroup>
                :null
				}
                {this.state.showOptions?
                 <FormGroup row>
                  <Label for="Do you need assistance getting to the front door?" sm={6}>
                  Do you need assistance getting to the front door?
                  </Label>
                  <Col sm={1}>
                     <Input
                      type="radio"
                      name="assistance_getting_front_door"                   
                      value="Yes" checked={ this.state.assistance_getting_front_door =='Yes'}
                    onChange={ this.handleInputChange }              
                    />Yes 
                    </Col>   
                    <Col sm={1}>
                    <Input
                      type="radio"
                      name="assistance_getting_front_door"                   
                      value="No" checked={ this.state.assistance_getting_front_door =='No'}
                     onChange={ this.handleInputChange }                     
                    />No
                    </Col>   
                     <Col sm={2}>
                    <Input
                      type="radio"
                      name="assistance_getting_front_door"                   
                      value="Not_sure" checked={ this.state.assistance_getting_front_door =='Not_sure'}
                     onChange={ this.handleInputChange }                     
                    />Not Sure
                    <span className="error" style={{color: 'red'}}>{this.state.errors["assistance_getting_front_door"]}</span>
                  </Col>
                </FormGroup>
                :null
				}
                {this.state.showOptions?
                <FormGroup row>
                  <Label for="Do you need door through door assistance?" sm={6}>
					Do you need door through door assistance?
                  </Label>
                  <Col sm={1}>
                     <Input
                      type="radio"
                      name="door_through_door_assistance"                   
                      value="Yes" checked={ this.state.door_through_door_assistance =='Yes'}
                    onChange={ this.handleInputChange }              
                    />Yes 
                    </Col>   
                    <Col sm={1}>
                    <Input
                      type="radio"
                      name="door_through_door_assistance"                   
                      value="No" checked={ this.state.door_through_door_assistance =='No'}
                     onChange={ this.handleInputChange }                     
                    />No
                    </Col>   
                     <Col sm={2}>
                    <Input
                      type="radio"
                      name="door_through_door_assistance"                   
                      value="Not_sure" checked={ this.state.door_through_door_assistance =='Not_sure'}
                     onChange={ this.handleInputChange }                     
                    />Not Sure
                    <span className="error" style={{color: 'red'}}>{this.state.errors["door_through_door_assistance"]}</span>
                  </Col>
                </FormGroup>
                :null
				}
               {this.state.showOptions?
                <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button class="btn btn-primary" onClick={ this.handleSubmit }>Save</Button>&nbsp;
                    <Link to={"/admin/allproviders"} class="btn btn-danger" title="Cancel">{/* <MdAdd /> */}&nbsp;Cancel</Link>
                  </Col>
                </FormGroup>
                :null
				}
              </Form>
            </CardBody>
          </Card>
        </Col>
        </Row>
    </Page>
    
  
  );
};
}

Options.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

//export default ChangepasswordPage;
export  default connect(mapStateToProps, {})(Options);
