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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import Switch from "react-switch";
import { Multiselect } from 'multiselect-react-dropdown';
import NumberFormat from 'react-number-format';
var prg1 = []
class AddTodo extends React.Component{
    constructor(){
        super();
        this.state={
            title : "",
            description : "",
            user_type:"",
            status : true,
            loading : "",
            errors : {},
            title_error : false,
            status_error : false,
            description_error : false,
            resources : [],
            res_error : false,
            seletedresources : [],
            period : "",
            period_error : false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onRemove = this.onRemove.bind(this);
        
    }
    onSelect(selectedList, selectedItem) {
        this.setState({
          seletedresources: selectedList
        });
        if(selectedList){
            this.setState({res_error:false})
        }
    }
    onRemove(selectedList, removedItem) {
        this.setState({seletedresources: selectedList})
        if(selectedList == ""){
          this.setState({res_error:true,seletedresources: selectedList})
        }
    }
    handleInputChange(e){
        if(e.target.name == "title"){
            if(e.target.value != ""){
                this.setState({title_error:false})
            }else{
                this.setState({title_error:true})
            }
        }
        if(e.target.name == "description"){
            if(e.target.value != ""){
              this.setState({description_error:false})
            }else{
              this.setState({description_error:true})
            }
        }
        if(e.target.name == "period"){
            if(e.target.value != ""){
              this.setState({period_error:false})
            }else{
              this.setState({period_error:true})
            }
        }
        if(e.target.name == "user_type"){
            fetch(AppConstants.API+'/resource/getUserbasedResources/'+e.target.value).then(res=>{
                if(res.status == 200){
                    return res.json();
                }
              }).then(result=>{
                    console.log(result)
                    var resources1 = []
                    result.data.map((resource,index)=>{
                        var item ={}
                        item["name"] = resource.title
                        item["id"] = resource._id
                        resources1.push(item)
                    })
                    console.log(resources1)
                    this.setState({resources:resources1})
            })
            if(e.target.value != ""){
              this.setState({user_type_error:false})
            }else{
              this.setState({user_type_error:true})
            }
        }

        this.setState({[e.target.name]:e.target.value})
    }
    handleValidation(){
        let errors = {};
        let formIsValid = true;
        // if(!this.state.document){
        //     formIsValid = false;
        //     errors["document"] = "Please upload document";
        //     ReactDOM.findDOMNode(this.refs.document).focus();
        // }
        if(this.state.seletedresources.length==0){
            formIsValid = false;
            errors["resource_error"] = "Please select program";
            ReactDOM.findDOMNode(this.refs.resource).focus();
        }
        if(!this.state.period){
            formIsValid = false;
            errors["period"] = "Please enter period to complete todo";
            ReactDOM.findDOMNode(this.refs.period).focus();
        }
        if(!this.state.description){
            formIsValid = false;
            errors["description"] = "Please enter description";
            ReactDOM.findDOMNode(this.refs.description).focus();
        }
        if (!this.state.title){
            formIsValid = false;
            errors["title"] = "Please enter title";
            ReactDOM.findDOMNode(this.refs.title).focus();
        }
        if (!this.state.user_type){
            formIsValid = false;
            errors["user_type"] = "Please select user type";
            ReactDOM.findDOMNode(this.refs.user_type).focus();
        }
        
        this.setState({
            errors: errors,
            title_error : true,
            description_error:true,
            user_type_error:true,
            res_error : true,
            period_error :true
            // status_error : true
        });
        return formIsValid;
    }
    handleStatusChange(checked){
        this.setState({status : checked})
    }
    handleSubmit(e){
        e.preventDefault();
        // if(this.handleValidation()){
            this.setState({loading:1});
            let formData = new FormData();
            let formval = {};
            formval = {
                'user_type': this.state.user_type,
                'title': this.state.title,
                'description': this.state.description,
                'resources': JSON.stringify(this.state.seletedresources),
                'period':this.state.period,
                'status': this.state.status,
            }
            // formData.append('user_type', this.state.user_type);    
            // // formData.append('document', this.state.document);    
            // formData.append('title', this.state.title);
            // formData.append('description', this.state.description);
            // formData.append('resources', JSON.stringify(this.state.seletedresources));
            // formData.append('status', this.state.status);
            axios.post(AppConstants.API+'/todos/addTodo',formval)
                .then(res => { 
                    // console.log(res)
                    if(res.data.Status == "Success"){
                        setTimeout((e) => {
                            this.props.history.push('/allTodos');
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
            })
        // }
    }
    componentDidMount(){
        prg1 = [];
        // var element = document.getElementById("navItem-Programs-3");
        // element.classList.add("active");
        fetch(AppConstants.API+'/programs/getAllactiveprograms').then(res=>{
            console.log("resss",res.status);
            if(res.status == 200){
                return res.json();
            }
          }).then(result=>{
            console.log("result.data",result.data);
            result.data.map((res,i)=>{
              var prg = {}
              prg["name"] = res.title
              prg1.push(prg)
            })
            this.setState({programs:prg1})
          })
    }
    render(){
        console.log(this.state.seletedresources)
        var resource_links = [];
        this.state.seletedresources.map((item,index)=>{
            resource_links.push(item)
        })
        return(
            <Page title="Add Student Todo">
                <ul className="cst-breadcrumb">
                    <li><Link to={'/dashboard'}>Dashboard</Link></li>
                    <li><Link to={'/allTodos'}>Todos</Link></li>
                    <li>Add Student Todo</li>
                </ul>
                <ReactTitle title="Add Student Todo"/>
                <Row>
                    <Col xl={12} lg={12} md={12}>
                        <Card>
                            <CardBody>
                                <Form name="addchild" onSubmit= { this.handleSubmit }>
                                    {/* <FormGroup row>
                                        <Label for="title" sm={2}>
                                            User Type<span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="select"
                                            name="user_type"
                                            placeholder="UserType"
                                            value={this.state.user_type}
                                            onChange={ this.handleInputChange }  
                                            // onKeyUp={this.handleKeyUp} 
                                            ref ="user_type"                  
                                            >
                                                <option value="">Select User Type</option>
                                                <option value="student">Student</option>
                                                <option value="mentor">Mentor</option>
                                                <option value="parent">Parent</option>

                                            </Input>
                                            {this.state.user_type_error == true ? <span className="error">{this.state.errors["user_type"]}</span>:""}
                                        </Col>
                                    </FormGroup> */}
                                    <FormGroup row>
                                        <Label for="title" sm={2}>
                                        Title<span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="title"
                                            placeholder="Title"                      
                                            value={this.state.title}
                                            onChange={ this.handleInputChange }   
                                            ref ="title"           
                                            />
                                            {this.state.title_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["title"]}</span>:""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="description" sm={2}>
                                            Description<span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="textarea"
                                            name="description"
                                            placeholder="Description"                      
                                            value={this.state.description}
                                            onChange={ this.handleInputChange }   
                                            ref ="description"           
                                            />
                                            {this.state.description_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["description"]}</span>:""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="period" sm={2}>
                                            Period <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                        <NumberFormat
                                            // format="(###) ###-####" mask=""
                                            name="period"
                                            placeholder='Period'
                                            onChange={this.handleInputChange}
                                            value={this.state.period} class="form-control" ref ="period"/>   
                                            {this.state.period_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["period"]}</span>:""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="resource" sm={2}>
                                            Resources  <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                        <div>
                                            <Multiselect
                                            options={this.state.resources} // Options to display in the dropdown
                                            selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                            onSelect={this.onSelect} // Function will trigger on select event
                                            onRemove={this.onRemove} // Function will trigger on remove event
                                            displayValue="name" // Property name to display in the dropdown options
                                            placeholder="Resource"
                                            ref="resource"
                                            />
                                            {resource_links.map((link,i)=>{
                                                return(<span><Link to={'/viewResource/'+link.id}>{link.name}</Link>,&nbsp;&nbsp;</span>)
                                            })}
                                            </div>
                                            {this.state.res_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["resource_error"]}</span> :''}
                                        </Col>
                                    </FormGroup>
                                    
                                    <FormGroup row>
                                        <Label for="status" sm={2}>
                                        Status<span>*</span>
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
                                            <Button className="btn btn-primary" onClick={ this.handleSubmit }>Save    <div style={this.state.loading ? {} : { display: 'none' }} className="image-fill w-25 loader-div">               <div class="clearfix">
  <div class="spinner-border spinner-border-sm" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div></div></Button>&nbsp;
                                            <Link to={"/allTodos"} className="btn btn-danger" title="Cancel">&nbsp;Cancel</Link>
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
AddTodo.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});
export  default connect(mapStateToProps, {})(AddTodo);