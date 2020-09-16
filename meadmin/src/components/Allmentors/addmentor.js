import React from 'react';
import AppConstants from 'AppConstants';
import {ReactTitle} from 'react-meta-tags';
import axios from 'axios';
import Page from 'components/Page';
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
    InputGroup,
    InputGroupAddon,
    InputGroupText
  } from 'reactstrap';
  import  { Link } from 'react-router-dom';
  import ReactDOM from 'react-dom';
  import NumberFormat from 'react-number-format';
  import DatePicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.css";
  import moment from "moment";
  import {MdDateRange} from 'react-icons/md';
  import Switch from "react-switch";
  import Loading from 'assets/img/loader.gif';
  import { connect } from 'react-redux';
  import { Multiselect } from 'multiselect-react-dropdown';
    
class AddMentor extends React.Component{
    constructor() {
        super()
        this.state = {
            firstname : "",
            lastname : "",
            gender : "",
            program : "",
            city : "",
            state : "",
            zipcode : "",
            phone : "",
            email : "",
            status : true,
            errors : {},
            errMsg : "",  seletedresources : [],
            programs:[],
            dob : "",
            loading:"",
            resources : [],


        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.inputChangedHandlerContact = this.inputChangedHandlerContact.bind(this);
        this.onChangeNumberkey = this.onChangeNumberkey.bind(this);
        this.handleDateofbirth = this.handleDateofbirth.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    openDatepicker1 = () => this._calendar1.setOpen(true);
    onSelect(selectedList, selectedItem) {
        //console.log("selectedList",selectedList);
        this.setState({
          seletedresources: selectedList,selectedValue:selectedList
        });
        if(selectedList){
            this.setState({res_error:false})
        }
    }
    onRemove(selectedList, removedItem) {
        this.setState({seletedresources: selectedList,selectedValue:selectedList})
        if(selectedList == ""){
          this.setState({res_error:true,seletedresources: selectedList})
        }
    }
    handleDateofbirth(bday){

        console.log(moment.utc(bday));
        if(bday != ""){
            this.setState({dob_error:false})
        }
        //var years = moment().diff(bday, 'years');
        this.setState({dob:bday})
    }

    onChangeNumberkey(e){
		const states = this.state
        const re = /^[0-9\b]+$/;
		if (e.target.value === '' || re.test(e.target.value)) {
		states[e.target.name] = e.target.value;
		this.setState({states})
		}
    }
    
    handleStatusChange(checked){
        this.setState({status : checked})
    }
    

    componentDidMount(){
        let prg1 = []
      
        fetch(AppConstants.API+'/programs/getAllactiveprograms').then(res=>{
            if(res.status == 200){
                return res.json();
            }
        }).then(result=>{
            var resources1 = []
            {result.data.map(program=>{
                var prg = {}
                prg['name']=program.title
                prg["id"] = program._id
                resources1.push(prg)
            })}
            this.setState({resources:resources1})
        })       
    }

    inputChangedHandlerContact=(values)=>{
        if(values.value != ""){
            this.setState({phone_error:false})
        }
        this.setState({
            phone: values.value,
        });
    }

    handleValidation(){
        let errors = {};
        let formIsValid = true;

        // if (!this.state.program){
        //     formIsValid = false;
        //     errors["program"] = "Please select program";
        //     ReactDOM.findDOMNode(this.refs.program).focus();
        // }      

        if(!this.state.zipcode){
            formIsValid = false;
            errors["zipcode"] = "Please enter zipcode";
            ReactDOM.findDOMNode(this.refs.zipcode).focus();
          }else if(this.state.zipcode.length !== 5){
            formIsValid = false;
            errors["zipcode"] = "Please enter 5 digits zipcode";
            ReactDOM.findDOMNode(this.refs.zipcode).focus();
          }
        
          if(!this.state.state){
            formIsValid = false;
            errors["state"] = "Please enter state";
            ReactDOM.findDOMNode(this.refs.state).focus();
          }
          if(!this.state.city){
            formIsValid = false;
            errors["city"] = "Please enter city";
            ReactDOM.findDOMNode(this.refs.city).focus();
          }
          if(!this.state.address){
            formIsValid = false;
            errors["address"] = "Please enter address";
            ReactDOM.findDOMNode(this.refs.address).focus();
          }
      
          if(!this.state.phone){
            formIsValid = false;
            errors["phone"] = "Please enter phone number";
            ReactDOM.findDOMNode(this.refs.phone).focus();
          }else if(this.state.phone.length !== 10){
            formIsValid = false;
            errors["phone"] = "Please enter 10 digits phone number";
            ReactDOM.findDOMNode(this.refs.phone).focus();
          }

          if (!this.state.dob){
            formIsValid = false;
            errors["dob"] = "Please enter date of birth";
        }

        if (!this.state.gender){
            formIsValid = false;
            errors["gender"] = "Please select your gender";
            ReactDOM.findDOMNode(this.refs.gender).focus();
        }
        
          if(this.state.email !== ""){
            let lastAtPos = this.state.email.lastIndexOf('@');
            let lastDotPos = this.state.email.lastIndexOf('.');
      
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
              formIsValid = false;
              errors["email"] = "Email is not valid";
              ReactDOM.findDOMNode(this.refs.email).focus();
            }
          }
          if(!this.state.email){
            formIsValid = false;
            errors["email"] = "Please enter email";
            ReactDOM.findDOMNode(this.refs.email).focus();
          }
            if(!this.state.lastname){
            formIsValid = false;
            errors["lastname"] = "Please enter last name";
            ReactDOM.findDOMNode(this.refs.lastname).focus();
          }
          if(!this.state.firstname){
            formIsValid = false;
            errors["firstname"] = "Please enter first name";
            ReactDOM.findDOMNode(this.refs.firstname).focus();
          }
        this.setState({errors: errors});
        return formIsValid;
    }


    handleInputChange(e){
        //console.log(e, e.target, e.target.name, e.target.value);
        this.setState({[e.target.name]:e.target.value});
    }
    
    handleSubmit(e){
        // console.log(this.state.to_be_mentor)
        e.preventDefault();
        let formval={} 
      
        if(this.handleValidation()){
            this.setState({loading:1});
            var reso = []
            this.state.seletedresources.map((res)=>{
                reso.push(res.id)
            })
            // console.log("handleValidation")
            formval={
                'first_name' : this.state.firstname,
                'last_name' : this.state.lastname,
                'email' : this.state.email,
                'gender': this.state.gender,
                'date_of_birth': this.state.dob,       
                'phone': this.state.phone,
                'address': this.state.address,
                'program' : JSON.stringify(reso),
                'city' : this.state.city,
                'state' : this.state.state,
                'zipcode' : this.state.zipcode,
                'status' : this.state.status,
                'created_by': this.props.auth.user._id
            }
            axios.post(AppConstants.API+'/mentor/mentorRegisteration',formval)
            .then(res => {   
            //   console.log(res);   
             if(res.data.status == "Success"){
              setTimeout((e) => {
                  this.props.history.push('/allmentors');
              }, 2000);
              setTimeout(() => {
                this.setState({
                  loading:'',
                  errMsg:  (<div className="alert alert-success fade show mt-3">{res.data.msg}</div>),
                });
              }, 1000);
            }
            else{
              setTimeout(() => {
                this.setState({
                  loading:'',
                  errMsg:  (<div className="alert alert-danger fade show mt-3">{res.data.msg}</div>),
                });
              }, 1000);
            }
          });
        } 
    }
    
    render(){
        return(
            <Page title="Add Mentor">
                <ReactTitle title="Add Mentor"/>
                <ul className="cst-breadcrumb">
                    <li><Link to={'/dashboard'}>Home</Link></li>
                    <li><Link to={'/allmentors'}>All Mentors</Link></li>
                    <li>Add Mentor</li>
                </ul>
                <Row>
                <Col xl={12} lg={12} md={12}>
                        <Card>
                            <CardBody>
                                <Form name="addchild" onSubmit= { this.handleSubmit }>
                                    <FormGroup row>
                                        <Label for="name" sm={2}>
                                            First Name <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="firstname"
                                            placeholder="First Name"                      
                                            value={this.state.firstname}
                                            onChange={ this.handleInputChange }  
                                            autoComplete="nope" 
                                            ref ="firstname"           
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["firstname"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="name" sm={2}>
                                            Last Name <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="lastname"
                                            placeholder="Last Name"                      
                                            value={this.state.lastname}
                                            onChange={ this.handleInputChange }  
                                            autoComplete="nope" 
                                            ref ="lastname"           
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["lastname"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="name" sm={2}>
                                        Email <span>*</span>
                                        </Label>
                                        <Col sm={10} >
                                        <Input
                                            type="text"
                                            name="email"
                                            placeholder="Email"                      
                                            value={this.state.email}
                                            onChange={ this.handleInputChange }  
                                            autoComplete="nope" 
                                            ref ="email"           
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["email"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="name" sm={2}>
                                            Gender <span>*</span>
                                        </Label>
                                        <Col lg={10} >
                                            <div className="d-flex justify-content-left">
                                                <FormGroup check className="mr-3">
                                                <Label check>
                                                <Input type="radio"  name="gender" value="male" ref ="gender" 
                                                checked={this.state.gender=='male'}
                                                onChange={ this.handleInputChange }/> Male</Label>
                                                </FormGroup>
                                                <FormGroup check>
                                                <Label check>
                                                <Input type="radio"  name="gender" value="female" 
                                                checked={this.state.gender=='female' } ref ="gender"  
                                                onChange={ this.handleInputChange }/> Female</Label>
                                                </FormGroup>
                                            </div>
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["gender"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="dob" sm={2}>
                                            Date of Birth <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                        <div className="cst-date-picker">
                                        <DatePicker
                                            name="dob"
                                            className="form-control"
                                            placeholderText="MM-DD-YYYY"
                                            selected={this.state.dob}
                                            selectsStart
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            dateFormat="MM-dd-yyyy"
                                            onChange={this.handleDateofbirth}
                                            autoComplete = "off"
                                            onKeyDown={(e) =>e.preventDefault()}
                                             ref={(c) => this._calendar1 = c}
                                        />
                                         <MdDateRange className="cale-icon" onClick={this.openDatepicker1.bind(this)}/> 
                                         </div>     
                                        <span className="error" style={{color: 'red'}}>{this.state.errors["dob"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="phone" sm={2}>
                                            Phone  <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                        <NumberFormat
                                        format="(###) ###-####"
                                        mask=""
                                        name="phone"
                                        placeholder="Phone Number"
                                        onValueChange={this.inputChangedHandlerContact}
                                        value={this.state.phone} className="form-control"
                                        autoComplete="nope"
                                        // autoComplete="off"
                                        ref ="phone"
                                        />
                                       <span className="error" style={{color: 'red'}}>{this.state.errors["phone"]}</span>
                                        </Col>
                                    </FormGroup>    

                                    <FormGroup row>
                                        <Label for="name" sm={2}>
                                        Address <span>*</span>
                                        </Label>
                                        <Col sm={10} >
                                        <Input
                                            type="text"
                                            name="address"
                                            placeholder="Address"                      
                                            value={this.state.address}
                                            onChange={ this.handleInputChange }  
                                            autoComplete="nope" 
                                            ref ="address"           
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["address"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="name" sm={2}>
                                        City <span>*</span>
                                        </Label>
                                        <Col sm={10} >
                                        <Input
                                            type="text"
                                            name="city"
                                            placeholder="City"                      
                                            value={this.state.city}
                                            onChange={ this.handleInputChange }  
                                            autoComplete="nope" 
                                            ref ="city"           
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["city"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="exampleState" sm={2}>
                                            State <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="select"
                                            name="state"
                                            placeholder="State"
                                            value={this.state.state}
                                            onChange={ this.handleInputChange }  
                                            // onKeyUp={this.handleKeyUp} 
                                            ref ="state"                  
                                            >
                                            <option value="">Select State</option>
                                            <option value="Alabama">Alabama</option>
                                            <option value="Alaska">Alaska</option>
                                            <option value="Arizona">Arizona</option>
                                            <option value="Arkansas">Arkansas</option>
                                            <option value="California">California</option>
                                            <option value="Colorado">Colorado</option>
                                            <option value="Connecticut">Connecticut</option>
                                            <option value="Delaware">Delaware</option>
                                            <option value="District Of Columbia">District Of Columbia</option>
                                            <option value="Florida">Florida</option>
                                            <option value="Georgia">Georgia</option>
                                            <option value="Hawaii">Hawaii</option>
                                            <option value="Idaho">Idaho</option>
                                            <option value="Illinois">Illinois</option>
                                            <option value="Indiana">Indiana</option>
                                            <option value="Iowa">Iowa</option>
                                            <option value="Kansas">Kansas</option>
                                            <option value="Kentucky">Kentucky</option>
                                            <option value="Louisiana">Louisiana</option>
                                            <option value="Maine">Maine</option>
                                            <option value="Maryland">Maryland</option>
                                            <option value="Massachusetts">Massachusetts</option>
                                            <option value="Michigan">Michigan</option>
                                            <option value="Minnesota">Minnesota</option>
                                            <option value="Mississippi">Mississippi</option>
                                            <option value="Missouri">Missouri</option>
                                            <option value="Montana">Montana</option>
                                            <option value="Nebraska">Nebraska</option>
                                            <option value="Nevada">Nevada</option>
                                            <option value="New Hampshire">New Hampshire</option>
                                            <option value="New Jersey">New Jersey</option>
                                            <option value="New Mexico">New Mexico</option>
                                            <option value="New York">New York</option>
                                            <option value="North Carolina">North Carolina</option>
                                            <option value="North Dakota">North Dakota</option>
                                            <option value="Ohio">Ohio</option>
                                            <option value="Oklahoma">Oklahoma</option>
                                            <option value="Oregon">Oregon</option>
                                            <option value="Pennsylvania">Pennsylvania</option>
                                            <option value="Rhode Island">Rhode Island</option>
                                            <option value="South Carolina">South Carolina</option>
                                            <option value="South Dakota">South Dakota</option>
                                            <option value="Tennessee">Tennessee</option>
                                            <option value="Texas">Texas</option>
                                            <option value="Utah">Utah</option>
                                            <option value="Vermont">Vermont</option>
                                            <option value="Virginia">Virginia</option>
                                            <option value="Washington">Washington</option>
                                            <option value="West Virginia">West Virginia</option>
                                            <option value="Wisconsin">Wisconsin</option>
                                            <option value="Wyoming">Wyoming</option>
                                            </Input>
                                            <span className="error" >{this.state.errors["state"]}</span>
                                        </Col>
                                    </FormGroup>


                                    <FormGroup row>
                                        <Label for="name" sm={2}>
                                        Zipcode <span>*</span>
                                        </Label>
                                        <Col sm={10} >
                                        <Input
                                            type="text"
                                            name="zipcode"
                                            placeholder="Zipcode"                      
                                            value={this.state.zipcode}
                                            onChange={ this.handleInputChange }  onChange={this.onChangeNumberkey}
                                            autoComplete="nope" 
                                            ref ="zipcode"   
                                            maxLength={5}            
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["zipcode"]}</span>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="resource" sm={2}>
                                        Program  <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                        <div>
                                            <Multiselect
                                            options={this.state.resources} // Options to display in the dropdown
                                            selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                            onSelect={this.onSelect} // Function will trigger on select event
                                            onRemove={this.onRemove} // Function will trigger on remove event
                                            displayValue="name" // Property name to display in the dropdown options
                                            placeholder="Program"
                                            ref="resource"
                                            />
                                            </div>
                                            {this.state.res_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["resource_error"]}</span> :''}
                                        </Col>
                                    </FormGroup>

                                    {/* <FormGroup row>
                                        <Label for="program" sm={2}>
                                            Program  <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="select"
                                            name="program"
                                            value={this.state.program}
                                            onChange={ this.handleInputChange }   
                                            ref ="program"           
                                            >
                                            <option value="">Select Program</option>
                                            {this.state.programs.map(program=>{
                                                return(<option value={program.prg_id}>{program.title}</option>)
                                            })}
                                            </Input>
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["program"]}</span>
                                        </Col>
                                    </FormGroup> */}

                                    <FormGroup row>
                                    <Label for="status" sm={2}>
                                        Status
                                    </Label>
                                    <Col sm={10}>
                                        <Switch onChange={this.handleStatusChange.bind(this)} checked={this.state.status} 
                                        uncheckedIcon={
                                        <div
                                            style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: "100%",
                                            fontSize: 15,
                                            width:"150px",
                                            color: "#000",
                                            fontWeight: "bold",
                                            paddingRight: 2
                                            }}
                                        >
                                            Inactive
                                        </div>
                                        }
                                        checkedIcon={
                                        <div
                                            style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: "100%",
                                            fontSize: 15,
                                            width:"180px",
                                            fontWeight: "bold",
                                            color: "#000",
                                            paddingRight: 2
                                            }}
                                        >
                                            Active
                                        </div>
                                        }
                                        onColor = "#45b649"
                                        offColor = "#ffd700"
                                        className="react-switch"
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={20}
                                        width={48}
                                        handleDiameter={30}
                                        />
                                    </Col>
                                </FormGroup>
                                    

                                    <FormGroup check row>
                                        <Col sm={{ size: 10, offset: 2 }}>
                                            <Button className="btn btn-primary" onClick={ this.handleSubmit }>Save <div style={this.state.loading ? {} : { display: 'none' }} className="image-fill w-25 loader-div">               <div class="clearfix">
  <div class="spinner-border spinner-border-sm" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div></div></Button>&nbsp;
                                            <Link to={"/allmentors"} className="btn btn-danger" title="Cancel">&nbsp;Cancel</Link>
                                        </Col>
                                    </FormGroup>
                                    {this.state.errMsg}
                                </Form>
                            </CardBody>
                        </Card>

                        
                    </Col>
                </Row>
            </Page>
        )
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
  });
export default connect(mapStateToProps, {})(AddMentor);