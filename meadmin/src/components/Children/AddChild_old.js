import React from 'react';
import Page from 'components/Page';
import axios from 'axios';
import AppConstants from 'AppConstants';
import {ReactTitle} from 'react-meta-tags';
import  { Link } from 'react-router-dom';
import {
    Row,
    Col,
    Card,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
  } from 'reactstrap';
import Loading from 'assets/img/loader.gif';
import NumberFormat from 'react-number-format';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactDOM from 'react-dom';
import moment from "moment";
import { connect } from 'react-redux';
class AddChild extends React.Component{
    constructor(){
        super();
        this.state = {
            name : "",
            organization : "",
            school : "",
            email : "",
            address : "",
            dob : "",
            phone : "",
            graduatedate : "",
            guardianaddress : "",
            guardianphone : "",
            guardian : "",
            flanguage : "",
            guardianflang : "",
            status : "",
            guardianemail : "",
            errors : {},
            usertype : "",
            to_be_mentor : "",
            years : "",
            errMsg : "",
            loading:"",
            read : false,
            gender: '',
            programs : [],
            program : '',
            nameError : false,
            organization_error : false,
            school_error : false,
            email_error : false,
            address_error : false,
            dob_error : false,
            phone_error : false,
            graduatedate_error : false,
            guardianaddress_error : false,
            guardianphone_error : false,
            guardian_error : false,
            flanguage_error : false,
            guardianflang_error : false,
            status_error : false,
            guardianemail_error :false,
            usertype_error : false,
            to_be_mentor_error : false,
            gender_error : false,
            program_error : false,
            grade_error : false,
            email_error1 : false,
            guardianemail_error1 :false,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.inputChangedHandlerContact = this.inputChangedHandlerContact.bind(this);
        this.handleStartdateChange = this.handleStartdateChange.bind(this);
        this.handleDateofbirth = this.handleDateofbirth.bind(this);
    }
    handleDateofbirth(bday){
        if(bday != ""){
            this.setState({dob_error:false})
        }
        var years = moment().diff(bday, 'years');
        this.setState({dob:bday,years:years})
    }
    handleStartdateChange(date){
        if(date != ""){
            this.setState({graduatedate_error:false})
        }
        this.setState({graduatedate:date})
    }
    inputChangedHandlerContact=(values)=>{
        console.log(values.value.length)
        if(values.value != ""){
            this.setState({phone_error:false})
        }
        this.setState({
            phone: values.value,
        });
    }
    
    handleInputChange(e){
        console.log(e.target.name)
        if(e.target.name == "name"){
            if(e.target.value != ""){
                this.setState({nameError:false})
            }
        }
        if(e.target.name == "organization"){
            if(e.target.value != ""){
                this.setState({organization_error:false})
            }
        }
        if(e.target.name == "school"){
            if(e.target.value != ""){
                this.setState({school_error:false})
            }
        }
        if(e.target.name == "email"){
            if(e.target.value != ""){
                this.setState({email_error:false})
            }
        }
        if(e.target.name == "address"){
            if(e.target.value != ""){
                this.setState({address_error:false})
            }
        }
        if(e.target.name == "grade"){
            if(e.target.value != ""){
                this.setState({grade_error:false})
            }
        }
        if(e.target.name == "guardianaddress"){
            if(e.target.value != ""){
                this.setState({guardianaddress_error:false})
            }
        }
        if(e.target.name == "guardianphone"){
            if(e.target.value != ""){
                this.setState({guardianphone_error:false})
            }
        }
        if(e.target.name == "guardian"){
            if(e.target.value != ""){
                this.setState({guardian_error:false})
            }
        }
        if(e.target.name == "flanguage"){
            if(e.target.value != ""){
                this.setState({flanguage_error:false})
            }
        }
        if(e.target.name == "guardianflang"){
            if(e.target.value != ""){
                this.setState({guardianflang_error:false})
            }
        }
        if(e.target.name == "status"){
            if(e.target.value != ""){
                this.setState({status_error:false})
            }
        }
        if(this.state.years < 18){
            if(e.target.name == "guardianemail"){
                if(e.target.value != ""){
                    this.setState({guardianemail_error:false})
                }
            }
        }
        if(e.target.name == "usertype"){
            if(e.target.value != ""){
                this.setState({usertype_error:false})
            }
        }
        if(e.target.name == "to_be_mentor"){
            if(e.target.value != ""){
                this.setState({to_be_mentor_error:false})
            }
        }
        if(e.target.name == "gender"){
            if(e.target.value != ""){
                this.setState({gender_error:false})
            }
        }
        if(e.target.name == "program"){
            if(e.target.value != ""){
                this.setState({program_error:false})
            }
        }
        this.setState({
            [e.target.name]: e.target.value.trimLeft(/(^\s+|\s+$)/g, '')
        });
    }
    
    handlechildmail(e){
        let errors = {};
        let formIsValid = true;
        if(e.target.value){
            if(e.target.value == this.state.guardianemail){
                formIsValid = false;
                errors["email"] = "Child and parent mail should not be match";
                this.setState({email_error1 : true})
            }
        }
        this.setState({errors1: errors});
        return formIsValid;
    }

    handleparentmail(e){
        // console.log("guardianemail",e.target.name,e.target.value)
        if(e.target.value){
            fetch(AppConstants.API+'/child/getParent_info/'+e.target.value)
            .then(res => {
            //    console.log(res) 
               if(res.status == 200){
                   return res.json()
               }
            }).then(result=>{
                // console.log(result)
                    if(result.Status == "Success"){
                        if(result.data[0]){
                            this.setState({
                                read : true,
                                guardian : result.data[0].parent_name,
                                guardianphone : result.data[0].phone,
                                guardianflang : result.data[0].first_language,
                                guardianaddress : result.data[0].address
                            })
                        }
                        else{
                            this.setState({
                                read : false,
                                guardian : "",
                                guardianphone : "",
                                guardianflang : "",
                                guardianaddress : "" 
                            })
                        }
                    }
                   
            })
            let errors = {};
            let formIsValid = true;
            if(e.target.value == this.state.email){
                formIsValid = false;
                errors["guardianemail"] = "Parent and child mail should not be match" ;
                this.setState({guardianemail_error1 : true})
            }
            this.setState({errors1: errors});
            return formIsValid;
        }
    }
    handleValidation(){
        let errors = {};
        let formIsValid = true;
        // console.log(this.state.name)
        if (!this.state.status){
            formIsValid = false;
            errors["status"] = "Please select status";
            ReactDOM.findDOMNode(this.refs.status).focus();
        }
        if (!this.state.guardianflang){
            formIsValid = false;
            errors["guardianflang"] = "Please select parent first language";
            ReactDOM.findDOMNode(this.refs.guardianflang).focus();
        }
        if(this.state.usertype == "Alumni"){
            if (!this.state.to_be_mentor){
                formIsValid = false;
                errors["to_be_mentor"] = "Please choose one";
                ReactDOM.findDOMNode(this.refs.to_be_mentor).focus();
            }
        }
        if (!this.state.guardianaddress){
            formIsValid = false;
            errors["guardianaddress"] = "Please enter parent address";
            ReactDOM.findDOMNode(this.refs.guardianaddress).focus();
        }
        if (!this.state.guardianphone){
            formIsValid = false;
            errors["guardianphone"] = "Please enter parent phone number";
            ReactDOM.findDOMNode(this.refs.guardianphone).focus();
        }
        if(this.state.years < 18){
            if(!this.state.guardianemail){
                formIsValid = false;
                errors["guardianemail"] = "Please enter parent email";
                ReactDOM.findDOMNode(this.refs.guardianemail).focus();
            }
            if(this.state.guardianemail !== ""){
                let lastAtPos = this.state.guardianemail.lastIndexOf('@');
                let lastDotPos = this.state.guardianemail.lastIndexOf('.');
          
                if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.guardianemail.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.guardianemail.length - lastDotPos) > 2)) {
                  formIsValid = false;
                  errors["guardianemail"] = "Please enter valid email";
                  ReactDOM.findDOMNode(this.refs.guardianemail).focus();
                }
            }
        }
        if (!this.state.guardian){
            formIsValid = false;
            errors["guardian"] = "Please enter parent name";
            ReactDOM.findDOMNode(this.refs.guardian).focus();
        }
        if (!this.state.program){
            formIsValid = false;
            errors["program"] = "Please select program";
            ReactDOM.findDOMNode(this.refs.program).focus();
        }
        if (!this.state.flanguage){
            formIsValid = false;
            errors["flanguage"] = "Please select first language";
            ReactDOM.findDOMNode(this.refs.flanguage).focus();
        }
        if (!this.state.phone){
            formIsValid = false;
            errors["phone"] = "Please enter phone";
            ReactDOM.findDOMNode(this.refs.phone).focus();
        }
        else if(this.state.phone.length!=10){
            formIsValid = false;
            errors["phone"] = "Please enter 10 digits phone number";
            ReactDOM.findDOMNode(this.refs.phone).focus();
        }
        if (!this.state.address){
            formIsValid = false;
            errors["address"] = "Please enter address";
            ReactDOM.findDOMNode(this.refs.address).focus();
        }
        if (!this.state.email){
            formIsValid = false;
            errors["email"] = "Please enter email";
            ReactDOM.findDOMNode(this.refs.email).focus();
        }
        if(this.state.email !== ""){
            let lastAtPos = this.state.email.lastIndexOf('@');
            let lastDotPos = this.state.email.lastIndexOf('.');
      
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
              formIsValid = false;
              errors["email"] = "Please enter valid email";
              ReactDOM.findDOMNode(this.refs.email).focus();
            }
        }
        if (!this.state.grade){
            formIsValid = false;
            errors["grade"] = "Please enter grade of child";
            ReactDOM.findDOMNode(this.refs.grade).focus();
        }
        if (!this.state.school){
            formIsValid = false;
            errors["school"] = "Please enter school";
            ReactDOM.findDOMNode(this.refs.school).focus();
        }
        if (!this.state.dob){
            formIsValid = false;
            errors["dob"] = "Please enter date of birth";
            // ReactDOM.findDOMNode(this.refs.dob).focus();
        }
        if (!this.state.graduatedate){
            formIsValid = false;
            errors["graduatedate"] = "Please enter graduated date or year";
            // ReactDOM.findDOMNode(this.refs.graduatedate).focus();
        }
        if (!this.state.organization){
            formIsValid = false;
            errors["organization"] = "Please enter organization";
            ReactDOM.findDOMNode(this.refs.organization).focus();
        }
        if (!this.state.gender){
            formIsValid = false;
            errors["gender"] = "Please select your gender";
            ReactDOM.findDOMNode(this.refs.gender).focus();
        }
        if (!this.state.name){
            formIsValid = false;
            errors["name"] = "Please enter name";
            ReactDOM.findDOMNode(this.refs.name).focus();
        }
        if (!this.state.usertype){
            formIsValid = false;
            errors["usertype"] = "Please select user type";
            ReactDOM.findDOMNode(this.refs.usertype).focus();
        }
        this.setState({
            errors: errors,
            nameError:true,
            organization_error:true,
            email_error :true,
            gender_error : true,
            address_error : true,
            usertype_error : true,
            graduatedate_error : true,
            graduation_year : true,
            guardian_error : true,
            guardianaddress_error : true,
            guardianemail_error : true,
            guardianflang_error : true,
            guardianphone_error : true,
            school_error : true,
            dob_error : true,
            phone_error : true,
            flanguage_error : true,
            status_error : true,
            to_be_mentor_error : true,
            program_error : true,
            grade_error : true
        });
        return formIsValid;
    }
    handleSubmit(e){
        e.preventDefault();
        let formval={} 
        if(this.handleValidation()){
            this.setState({loading:1});
            // console.log("handleValidation")
            formval={
                'name': this.state.name,
                'email': this.state.email,
                'address': this.state.address,
                'phone': this.state.phone,
                'date_of_birth': this.state.dob,
                'graduation_year': this.state.graduatedate,
                'guardian_phone': this.state.guardianphone,
                'guardian_name': this.state.guardian,
                'guardian_address':this.state.guardianaddress,
                'guardianflang' : this.state.guardianflang,
                'gender': this.state.gender,
                'firstlanguage': this.state.flanguage,
                'organization' : this.state.organization,
                'grade':this.state.grade,
                'school':this.state.school,
                'status' : this.state.status,
                'guardianemail' : this.state.guardianemail,
                'usertype': this.state.usertype,
                'to_be_mentor': this.state.to_be_mentor,
                'program':this.state.program
            }
            axios.post(AppConstants.API+'/child/addAdminChild',formval)
            .then(res => {   
            //   console.log(res);   
             if(res.data.status == "success"){
              setTimeout((e) => {
                  this.props.history.push('/allChildren');
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
    componentDidMount(){
        var element = document.getElementById("navItem-Children-0");
        element.classList.add("active");
        fetch(AppConstants.API+'/programs/getAllactiveprograms').then(res=>{
            // console.log(res)
            if(res.status == 200){
                return res.json();
            }
        }).then(result=>{
            // console.log(result)
            this.setState({programs:result.data})
        })
    }
    render(){
        return(
            <Page title="Add Child" /*breadcrumbs={[{ name: 'Call Center', active: true }]}*/>
                <ul className="cst-breadcrumb">
                    <li><Link to={'/dashboard'}>Dashboard</Link></li>
                    <li><Link to={'/allChildren'}>All Children</Link></li>
                    <li>Add Child</li>
                </ul>
                <ReactTitle title="Add Child"/>
                <Row>
                    <Col xl={12} lg={12} md={12}>
                        <Card>
                            <CardBody>
                                <Form name="addchild" onSubmit= { this.handleSubmit }>
                                    <FormGroup row>
                                        <Label for="usertype" sm={2}>
                                           Please select type<span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="select"
                                            name="usertype"
                                            placeholder="Name"                      
                                            value={this.state.usertype}
                                            onChange={ this.handleInputChange }   
                                            ref ="usertype"           
                                            >
                                                <option value="">Select</option>
                                                <option value="Alumni">Alumni </option>
                                                <option value="Student">Student</option>
                                            </Input>
                                            {this.state.usertype_error == true  ? <span className="error" style={{color: 'red'}}>{this.state.errors["usertype"]}</span> : ""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="name" sm={2}>
                                            Name <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="name"
                                            placeholder="Name"                      
                                            value={this.state.name}
                                            onChange={ this.handleInputChange }  
                                            autoComplete="nope" 
                                            ref ="name"           
                                            />
                                            {this.state.nameError == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["name"]}</span>:""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="gender" sm={2}>
                                            Gender <span>*</span>
                                        </Label>
                                        <Col lg={10} >
                                            <div className="d-flex justify-content-left">
                                                <FormGroup check className="mr-3">
                                                <Label check>
                                                    <Input type="radio"  name="gender" value="female" 
                                                        checked={this.state.gender=='female' } ref ="gender"  
                                                        onChange={ this.handleInputChange }/>Female
                                                </Label>
                                                </FormGroup>
                                                <FormGroup check>
                                                    <Label check>
                                                        <Input type="radio"  name="gender" value="male" ref ="gender" 
                                                            checked={this.state.gender=='male'}
                                                            onChange={ this.handleInputChange }/>Male
                                                   </Label>
                                                </FormGroup>
                                                {this.state.gender_error == true  ? <span className="error" style={{color: 'red'}}>{this.state.errors["gender"]}</span> : ""}
                                           </div>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="organization" sm={2}>
                                            Organization <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="organization"
                                            placeholder="Organization"                      
                                            value={this.state.organization}
                                            onChange={ this.handleInputChange }   
                                            ref ="organization"           
                                            />
                                            {this.state.organization_error == true  ? <span className="error" style={{color: 'red'}}>{this.state.errors["organization"]}</span>:""}
                                        </Col>
                                    </FormGroup>
                                    {/* Proposed graduation month/year */}
                                    <FormGroup row>
                                        <Label for="graduatedate" sm={2}>
                                        Graduation month/year<span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                        <DatePicker
                                            name="graduatedate"
                                            className="form-control"
                                            placeholderText="MM/DD/YYYY"
                                            selected={this.state.graduatedate}
                                            selectsStart
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            onChange={this.handleStartdateChange}
                                            autoComplete = "off"
                                            minDate={new Date().setFullYear(new Date().getFullYear() - 20)}
                                            maxDate={new Date()}
                                        />
                                        <i className="fa fa-calendar" aria-hidden="true"></i>
                                        {this.state.graduatedate_error == true  ? <span className="error" style={{color: 'red'}}>{this.state.errors["graduatedate"]}</span>:""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="dob" sm={2}>
                                            Date of Birth <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                        <DatePicker
                                            name="dob"
                                            className="form-control"
                                            placeholderText="MM/DD/YYYY"
                                            selected={this.state.dob}
                                            selectsStart
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            onChange={this.handleDateofbirth}
                                            autoComplete = "off"
                                            // minDate={new Date().setFullYear(new Date().getFullYear() - 5)}
                                            maxDate={new Date()}
                                        />
                                        <i className ="fa fa-calendar" aria-hidden="true"></i>
                                        {this.state.dob_error == true  ? <span className="error" style={{color: 'red'}}>{this.state.errors["dob"]}</span> : ""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="school" sm={2}>
                                            School <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="school"
                                            placeholder="School"                      
                                            value={this.state.school}
                                            onChange={ this.handleInputChange }   
                                            ref ="school"           
                                            />
                                            {this.state.school_error == true  ? <span className="error" style={{color: 'red'}}>{this.state.errors["school"]}</span> : ""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="grade" sm={2}>
                                            Grade <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="grade"
                                            placeholder="Grade"                      
                                            value={this.state.grade}
                                            onChange={ this.handleInputChange }   
                                            ref ="grade"           
                                            />
                                           { this.state.grade_error == true  ? <span className="error" style={{color: 'red'}}>{this.state.errors["grade"]}</span>:""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                            Email  <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="email"
                                            placeholder="Email"                      
                                            value={this.state.email}
                                            onChange={ this.handleInputChange }   
                                            ref ="email"
                                            onBlur = {this.handlechildmail.bind(this)}           
                                            />
                                            {this.state.email_error == true  ? <span className="error" style={{color: 'red'}}>{this.state.errors["email"]}</span> : ""}
                                            {this.state.email_error1 == true ? <span className="error" style={{color: 'red'}}>{this.state.errors1["email"]}</span>:""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="address" sm={2}>
                                            Address  <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="address"
                                            placeholder="Address"                      
                                            value={this.state.address}
                                            onChange={ this.handleInputChange }   
                                            ref ="address"           
                                            />
                                            {this.state.address_error == true  ? <span className="error" style={{color: 'red'}}>{this.state.errors["address"]}</span> : ""}
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
                                       { this.state.phone_error == true  ? <span className="error" style={{color: 'red'}}>{this.state.errors["phone"]}</span> : ""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="flanguage" sm={2}>
                                            First Language  <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                        <Input
                                        type="select"
                                        name="flanguage"
                                        placeholder="First Language"
                                        value={this.state.flanguage}
                                        onChange={ this.handleInputChange }  
                                        ref ="flanguage"                  
                                        > 
                                            <option value="">Select Language</option>
                                            <option value="Arabic">Arabic</option>
                                            <option value="Somali">Somali</option>
                                            <option value="Berber">Berber</option>
                                            <option value="Hausa">Hausa</option>
                                            <option value="Amharic">Amharic</option>
                                            <option value="Oromo">Oromo</option>
                                            <option value="Malagasy">Malagasy</option>
                                            <option value="Afrikaans">Afrikaans</option>
                                            <option value="English">English</option>
                                            <option value="French">French</option>
                                            <option value="German">German</option>
                                            <option value="Portuguese">Portuguese</option>
                                            <option value="Italian">Italian</option>
                                            <option value="Spanish">Spanish</option>
                                            <option value="Swahili">Swahili</option>
                                            <option value="Yoruba">Yoruba</option>
                                            <option value="Igbo">Igbo</option>
                                            <option value="Fula">Fula</option>
                                            <option value="Shona">Shona</option>
                                            <option value="Songhay">Songhay</option>
                                            <option value="Fula">Fula</option>
                                            <option value="Nubian">Nubian</option>
                                            <option value="Maasai">Maasai</option>
                                        </Input>
                                        {this.state.flanguage_error == true  ? <span className="error" style={{color: 'red'}}>{this.state.errors["flanguage"]}</span> : ""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
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
                                                return(<option value={program.title}>{program.title}</option>)
                                            })}
                                            </Input>
                                            {this.state.program_error == true  ? <span className="error" style={{color: 'red'}}>{this.state.errors["program"]}</span> : ""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="guardian" sm={2}>
                                            Parent/Caregiver Name  <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="guardian"
                                            placeholder="Parent/Caregiver Name"
                                            readOnly = {this.state.read}                 
                                            value={this.state.guardian}
                                            onChange={ this.handleInputChange }   
                                            ref ="guardian"           
                                            />
                                            {this.state.guardian_error == true  ? <span className="error" style={{color: 'red'}}>{this.state.errors["guardian"]}</span> : ""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="guardianemail" sm={2}>
                                            Parent/Caregiver Email {this.state.years < 18 ? <span>*</span> : ""}
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="guardianemail"
                                            placeholder="Parent/Caregiver Email"                      
                                            value={this.state.guardianemail}
                                            onChange={ this.handleInputChange }   
                                            onBlur = {this.handleparentmail.bind(this)}    
                                            ref ="guardianemail"           
                                            />
                                            {this.state.guardianemail_error == true ?<span className="error" style={{color: 'red'}}>{this.state.errors["guardianemail"]}</span>:""}
                                            {this.state.guardianemail_error1 == true ?<span className="error" style={{color: 'red'}}>{this.state.errors1["guardianemail"]}</span>:""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="guardianphone" sm={2}>
                                            Parent/Caregiver phone number   <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <NumberFormat
                                            format="(###) ###-####"
                                            mask=""
                                            name="guardianphone"
                                            readOnly = {this.state.read} 
                                            placeholder="Parent/Caregiver phone number"  
                                            onChange = {this.handleInputChange} 
                                            value={this.state.guardianphone}
                                            className="form-control"
                                            ref ="guardianphone"
                                            autoComplete="nope"
                                            />
                                            {this.state.guardianphone_error == true  ? <span className="error" style={{color: 'red'}}>{this.state.errors["guardianphone"]}</span> : ""}
                                        </Col>
                                    </FormGroup>
                                    
                                    <FormGroup row>
                                        <Label for="guardianaddress" sm={2}>
                                            Parent/Caregiver Address  <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="guardianaddress"
                                            placeholder="Parent/Caregiver Address"
                                            readOnly = {this.state.read}                       
                                            value={this.state.guardianaddress}
                                            onChange={ this.handleInputChange }   
                                            ref ="guardianaddress"           
                                            />
                                            {this.state.guardianaddress_error == true  ? <span className="error" style={{color: 'red'}}>{this.state.errors["guardianaddress"]}</span> : ""}
                                        </Col>
                                    </FormGroup>
                                   
                                    <FormGroup row>
                                        <Label for="guardianflang" sm={2}>
                                            Parent/Caregiver First Language <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                        <Input
                                        type="select"
                                        name="guardianflang"
                                        placeholder="First Language"
                                        value={this.state.guardianflang}
                                        onChange={ this.handleInputChange }  
                                        readOnly = {this.state.read} 
                                        ref ="guardianflang"                  
                                        >
                                            <option value="">Select Language</option>
                                            <option value="Arabic">Arabic</option>
                                            <option value="Somali">Somali</option>
                                            <option value="Berber">Berber</option>
                                            <option value="Hausa">Hausa</option>
                                            <option value="Amharic">Amharic</option>
                                            <option value="Oromo">Oromo</option>
                                            <option value="Malagasy">Malagasy</option>
                                            <option value="Afrikaans">Afrikaans</option>
                                            <option value="English">English</option>
                                            <option value="French">French</option>
                                            <option value="German">German</option>
                                            <option value="Portuguese">Portuguese</option>
                                            <option value="Italian">Italian</option>
                                            <option value="Spanish">Spanish</option>
                                            <option value="Swahili">Swahili</option>
                                            <option value="Yoruba">Yoruba</option>
                                            <option value="Igbo">Igbo</option>
                                            <option value="Fula">Fula</option>
                                            <option value="Shona">Shona</option>
                                            <option value="Songhay">Songhay</option>
                                            <option value="Fula">Fula</option>
                                            <option value="Nubian">Nubian</option>
                                            <option value="Maasai">Maasai</option>
                                        </Input>
                                       { this.state.guardianflang_error == true  ? <span className="error" style={{color: 'red'}}>{this.state.errors["guardianflang"]}</span> : ""}
                                        </Col>
                                    </FormGroup>
                                    {this.state.usertype =="Alumni" ?
                                    <span>
                                    <FormGroup>
                                    <label>Are you interested in being a peer mentor? (only question for)  </label>
                                    <div>
                                        <input type="radio"  name="to_be_mentor" value="Yes" 
                                            checked={this.state.to_be_mentor=='Yes' } ref ="to_be_mentor"  
                                            onChange={ this.handleInputChange }/>
                                        <label for="radio5">Yes</label>&nbsp;&nbsp;
                                        <input type="radio"  name="to_be_mentor" value="No" ref ="to_be_mentor" 
                                            checked={this.state.to_be_mentor=='No'}
                                            onChange={ this.handleInputChange }/>
                                        <label for="radio6">No</label><br/>
                                        {this.state.to_be_mentor_error == true  ? <span className="error" style={{color: 'red'}}>{this.state.errors["to_be_mentor"]}</span> : ""}
                                    </div>
                                    </FormGroup></span>
                                         : ""}
                                    <FormGroup row>
                                        <Label for="status" sm={2}>
                                            Status<span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                        <Input
                                        type="select"
                                        name="status"
                                        placeholder="First Language"
                                        value={this.state.status}
                                        onChange={ this.handleInputChange }  
                                        ref ="status"                  
                                        >
                                            <option value="">Select Status</option>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">In Active</option>
                                        </Input>
                                        {this.state.status_error == true  ? <span className="error" style={{color: 'red'}}>{this.state.errors["status"]}</span> : ""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup check row>
                                        <Col sm={{ size: 10, offset: 2 }}>
                                            <Button className="btn btn-primary" onClick={ this.handleSubmit }>Save    <div style={this.state.loading ? {} : { display: 'none' }} className="image-fill w-25 loader-div">               <div class="clearfix">
  <div class="spinner-border spinner-border-sm" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div></div></Button>&nbsp;
                                            <Link to={"/allChildren"} className="btn btn-danger" title="Cancel">&nbsp;Cancel</Link>
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
export default connect(mapStateToProps, {})(AddChild);