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
import "react-datepicker/dist/react-datepicker.css";
import ReactDOM from 'react-dom';
import Switch from "react-switch";
class EditParent extends React.Component{
    constructor(){
        super();
        this.state = {
            name :'',
            email :'',
            phone :'',
            flanguage :'',
            loading:'',
            errors:{},
            status:'',
            address2 : "",
            address1 : "",
            city : '',
            zipcode : '',
            state : '',
            name_error :false,
            email_error :false,
            phone_error : false,
            flanguage_error : false,
            status_error : false,
            address_error2 : false,
            address_error1 : false,
            zipcode_error : false,
            city_error : false,
            state_error : false,
            languages : []
            
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(checked) {
        // console.log(checked)
        this.setState({ status : checked });
    }
    handleInputChange(e){
        if(e.target.name == "name"){
            if(e.target.value != ""){
                this.setState({nameError:false})
            }
        }
        if(e.target.name == "email"){
            if(e.target.value != ""){
                this.setState({email_error:false})
            }
        }
        if(e.target.name == "zipcode"){
            if(e.target.value != ""){
                this.setState({zipcode_error:false})
            }
        }
        if(e.target.name == "city"){
            if(e.target.value != ""){
                this.setState({city_error:false})
            }
        }
        if(e.target.name == "state"){
            if(e.target.value != ""){
                this.setState({state_error:false})
            }
        }
        if(e.target.name == "address2"){
            if(e.target.value != ""){
                this.setState({address_error2:false})
            }
        }
        if(e.target.name == "address1"){
            if(e.target.value != ""){
                this.setState({address_error1:false})
            }
        }
        if(e.target.name == "flanguage"){
            if(e.target.value != ""){
                this.setState({flanguage_error:false})
            }
        }
        if(e.target.name == "status"){
            if(e.target.value != ""){
                this.setState({status_error:false})
            }
        }
        
        this.setState({
            [e.target.name]: e.target.value.trimLeft(/(^\s+|\s+$)/g, '')
        });
    }
        
    handleValidation(){
        let errors = {};
        let formIsValid = true;
        this.setState({
            errors:errors
        });
        // console.log(this.state.name,this.state.phone,this.state.address,this.state.first_language)
        if (!this.state.flanguage){
            formIsValid = false;
            errors["flanguage"] = "Please enter first language";
            ReactDOM.findDOMNode(this.refs.flanguage).focus();
        }
        if (!this.state.zipcode){
            formIsValid = false;
            errors["zipcode"] = "Please enter zipcode";
            ReactDOM.findDOMNode(this.refs.zipcode).focus();
        }
        if (!this.state.city){
            formIsValid = false;
            errors["city"] = "Please enter city";
            ReactDOM.findDOMNode(this.refs.city).focus();
        }
        if (!this.state.state){
            formIsValid = false;
            errors["state"] = "Please enter state";
            ReactDOM.findDOMNode(this.refs.state).focus();
        }
        if (!this.state.address2){
            formIsValid = false;
            errors["address2"] = "Please enter address";
            ReactDOM.findDOMNode(this.refs.address2).focus();
        }
        if (!this.state.address1){
            formIsValid = false;
            errors["address1"] = "Please enter address";
            ReactDOM.findDOMNode(this.refs.address1).focus();
        }
        if (!this.state.phone){
            formIsValid = false;
            errors["phone"] = "Please enter phone number";
            ReactDOM.findDOMNode(this.refs.guardianphone).focus();
        }
        // else if(this.state.phone.length < 10){
        //     formIsValid = false;
        //     errors["phone"] = "Please enter valid phone number";
        //     ReactDOM.findDOMNode(this.refs.guardianphone).focus();
        // }
        if (!this.state.name){
            formIsValid = false;
            errors["name"] = "Please enter name";
            ReactDOM.findDOMNode(this.refs.guardian).focus();
        }
        this.setState({
            errors: errors,
            name_error:true,
            email_error :true,
            gender_error : true,
            address_error2 : true,
            address_error1 : true,
            flanguage_error : true,
            status_error : true,
            city_error : true,
            state_error : true,
            zipcode_error : true
        });
        return formIsValid;
    }
    handleSubmit(e){
        if(this.handleValidation()){
            e.preventDefault();
            this.setState({loading:1});
            let formval={};
            formval={
                'parent_name': this.state.name,
                'email': this.state.email,
                'address': this.state.address,
                'phone': this.state.phone,
                'first_language' : this.state.flanguage,
                'status' : this.state.status,
                'address2' : this.state.address2,
                'address1' : this.state.address1,
                'city' : this.state.city,
                'zipcode' : this.state.zipcode,
                'state' : this.state.state,
            }
            axios.post(AppConstants.API+'/parent/updateParent/'+this.props.match.params.id,formval)
            .then(res => {   
            // console.log("res63", res);   
            if(res.data.Status == "Success"){
            setTimeout((e) => {
                this.props.history.push('/Allparents');
            }, 2000);
            setTimeout(() => {
                this.setState({
                loading:'',
                errMsg:  (<div className="alert alert-success fade show mt-3">{res.data.msg}</div>)
                });
            }, 1000);
            }
            else{
                setTimeout(() => {
                    this.setState({
                        loading:'',
                        errMsg: (<div className="alert alert-danger fade show mt-3">{res.data.msg}</div>)
                    });
                }, 1000);
            }
        });
        }
    }
    componentDidMount(){
        // console.log("this.props.match.params.id",this.props.match.params.id);
        fetch(AppConstants.API+'/parent/getParentData/' + this.props.match.params.id).then(res=>{
            if(res.status == 200){
                return res.json();
            }
            }).then(data=>{
                // console.log("data",data.data)
                this.setState({
                    name:data.data[0].parent_name,
                    phone: data.data[0].phone,
                    address: data.data[0].address,
                    flanguage: data.data[0].first_language,
                    email:data.data[0].email,
                    status:data.data[0].status,
                    address2 : data.data[0].address2,
                    address1 : data.data[0].address1,
                    city : data.data[0].city,
                    zipcode : data.data[0].zipcode,
                    state : data.data[0].state
                })
        });
        fetch(AppConstants.API+'/language/getActivelanguges').then(res=>{
            if(res.status == 200){
                return res.json();
            }
        }).then(result=>{
            this.setState({languages:result.data})
        })
        var element = document.getElementById("navItem-Parents-1");
        element.classList.add("active");
    }
    render(){
        return(
            <Page title="Edit Parent" /*breadcrumbs={[{ name: 'Call Center', active: true }]}*/>
                <ul className="cst-breadcrumb">
                    <li><Link to={'/dashboard'}>Dashboard</Link></li>
                    <li><Link to={'/Allparents'}>All Parents</Link></li>
                    <li>Edit Parent</li>
                </ul>
                <ReactTitle title="Edit Parent"/>
                <Row>
                    <Col xl={12} lg={12} md={12}>
                        <Card>
                            <CardBody>
                                <Form name="addchild" onSubmit= { this.handleSubmit }>
                                <FormGroup row>
                                        <Label for="guardian" sm={2}>
                                             Name  <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="name"
                                            placeholder=" Name"                      
                                            value={this.state.name}
                                            onChange={ this.handleInputChange }   
                                            onKeyUp={this.handleKeyUp}    
                                            ref ="guardian"           
                                            />
                                             {this.state.name_error == true  ? <span className="error" style={{color: 'red'}}>{this.state.errors["name"]}</span> : ""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="guardianemail" sm={2}>
                                             Email {this.state.years < 18 ? <span>*</span> : ""}
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="email"
                                            placeholder="Email"                      
                                            value={this.state.email}
                                            onChange={ this.handleInputChange }   
                                            onKeyUp={this.handleKeyUp}    
                                            ref ="email"       
                                            readOnly    
                                            />
                                             {this.state.email_error == true  ? <span className="error" style={{color: 'red'}}>{this.state.errors["email"]}</span> : ""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="guardianphone" sm={2}>
                                            Phone number   <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <NumberFormat
                                            format="(###) ###-####"
                                            mask=""
                                            name="phone"
                                            placeholder="Phone number"  
                                            onChange = {this.handleInputChange} 
                                            value={this.state.phone}
                                            className="form-control"
                                            onKeyUp={this.handleKeyUp}
                                            ref ="guardianphone"
                                            />
                                            {this.state.phone_error == true  ? <span className="error" style={{color: 'red'}}>{this.state.errors["phone"]}</span> : ""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="address1" sm={2}>
                                            Address1  <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="address1"
                                            placeholder="Address1"                      
                                            value={this.state.address1}
                                            onChange={ this.handleInputChange }   
                                            ref ="address1"           
                                            />
                                            {this.state.address_error1 == true  ? <span className="error" style={{color: 'red'}}>{this.state.errors["address1"]}</span> : ""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="address2" sm={2}>
                                            Address2  <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="address2"
                                            placeholder="Address2"                      
                                            value={this.state.address2}
                                            onChange={ this.handleInputChange }   
                                            ref ="address2"           
                                            />
                                            {this.state.address_error2 == true  ? <span className="error" style={{color: 'red'}}>{this.state.errors["address2"]}</span> : ""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="state" sm={2}>
                                           State <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="select"
                                            name="state"
                                            value={this.state.state}
                                            onChange={ this.handleInputChange }  
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
                                            {this.state.state_error == true  ? <span className="error" style={{color: 'red'}}>{this.state.errors["state"]}</span> : ""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="city" sm={2}>
                                        City  <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="city"
                                            placeholder="City"                      
                                            value={this.state.city}
                                            onChange={ this.handleInputChange }   
                                            ref ="city"           
                                            />
                                            {this.state.city_error == true  ? <span className="error" style={{color: 'red'}}>{this.state.errors["city"]}</span> : ""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="zipcode" sm={2}>
                                        Zipcode  <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                        <NumberFormat
                                            format="######"
                                            mask=""
                                            type="text"
                                            name="zipcode"
                                            placeholder="Zipcode"                      
                                            value={this.state.zipcode}
                                            onChange={ this.handleInputChange }   
                                            ref ="zipcode" 
                                            className="form-control"          
                                            />
                                            {this.state.zipcode_error == true  ? <span className="error" style={{color: 'red'}}>{this.state.errors["zipcode"]}</span> : ""}
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
                                            {this.state.languages.map((lang)=>{
                                                return(<option value={lang.name}>{lang.name}</option>)
                                            })}
                                        </Input>
                                        {this.state.flanguage_error == true  ? <span className="error" style={{color: 'red'}}>{this.state.errors["flanguage"]}</span> : ""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="status" sm={2}>
                                            Status<span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                        <Switch onChange={this.handleChange} checked={this.state.status}
                                            onColor = "#45b649"
                                            offColor = "#ffd700"
                                            width	= {120}
                                            ref ="status" 
                                        />
                                        {this.state.status_error == true  ? <span className="error" style={{color: 'red'}}>{this.state.errors["status"]}</span> : ""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup check row>
                                        <Col sm={{ size: 10, offset: 2 }}>
                                            <Button className="btn btn-primary" onClick={ this.handleSubmit }title="Update">Update    <div style={this.state.loading ? {} : { display: 'none' }} className="image-fill w-25 loader-div">               <div class="clearfix">
  <div class="spinner-border spinner-border-sm" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div></div></Button>&nbsp;
                                            <Link to={"/Allparents"} className="btn btn-danger" title="Cancel">&nbsp;Cancel</Link>
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

export default EditParent;