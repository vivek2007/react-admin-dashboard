import React from 'react';
import AppConstants from 'AppConstants';
import axios from 'axios';
import Page from 'components/Page';
import {
    Row,
    Col,
    Card,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
  } from 'reactstrap';
import { Link } from 'react-router-dom';
import CKEditor from "react-ckeditor-component";
import Loading from 'assets/img/loader.gif';
import {ReactTitle} from 'react-meta-tags';

class AddCms extends React.Component{
    constructor(){
        super();
        this.state = {
            errors:{},
            title :'',
            description:'',
            title_error : false,
            description_error : false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleInputChange(e){
      // console.log(e.target.name)
      if(e.target.name == "title"){
        if(e.target.value != ""){
            this.setState({title_error:false})
        }
      }
      this.setState({[e.target.name]:e.target.value});
    }
    onChange(evt){
      // console.log(evt)
      var newContent = evt.editor.getData();
      this.setState({
        content: newContent
      })
      if (newContent) {
        this.setState({description_error:false})
      }
    }
    onBlur(evt){
      console.log("onBlur event called with event info: ", evt);
    }
    afterPaste(evt){
      console.log("afterPaste event called with event info: ", evt);
    }
    handleValidation(){
      let errors = {};
      let formIsValid = true;
      if(!this.state.title) {
          formIsValid = false;
          errors["title"] = "Please enter title";
      }
      if(!this.state.content){
          formIsValid = false;
          errors["description"] = "Please enter description";
      }
      this.setState({
        errors: errors,
        title_error : true,
        description_error:true
      });
      return formIsValid;
    }
    handleSubmit(e){
      // console.log("this.state.title",this.state.title,"this.state.content",this.state.content)
      e.preventDefault();
      let formval={} 
      if(this.handleValidation()){
        this.setState({loading:1});
        // console.log("handleValidation")
        formval = {
            title : this.state.title,
            description:this.state.content
        }
        axios.post(AppConstants.API+'/cms/addCms',formval)
        .then(res => {   
          // console.log("ressss",res);   
          if(res.data.status == "success"){
            setTimeout((e) => {
                this.props.history.push('/cms');
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
      var element = document.getElementById("navItem-Cms-0");
      element.classList.add("active");
    }
    render(){
        return(
            <Page className="cms-edit" title="Add CMS" /* breadcrumbs={[{ name: 'Add Ask Assistance', active: true }]} */>
            <ReactTitle title="Add CMS"/>
            <ul className="cst-breadcrumb">
               <li><Link to={'/dashboard'}>Home</Link> </li>
               <li>  <Link to={'/cms'}>  CMS </Link> </li>
               <li> Add CMS</li>
             </ul>
           <Row>
             <Col xl={12} lg={12} md={12}>
               <Card>
                 <CardBody>
                   <Form name="changeadminpassword" onSubmit= { this.handleSubmit }>
                     <FormGroup row>
                       <Label for="title" sm={2}>
                       Title <span style={{color: 'red'}}> * </span>
                       </Label>
                       <Col sm={10}>
                         <Input
                           type="text"
                           name="title"
                           placeholder="Title"                      
                           value={this.state.title}
                           onChange={ this.handleInputChange }                  
                         />
                         {this.state.title_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["title"]}</span> : ""}
                       </Col>
                     </FormGroup>
                     <FormGroup row>
                       <Label for="description" sm={2}>
                       Description <span style={{color: 'red'}}> * </span>
                       </Label>
                       <Col sm={10}>
                          <CKEditor activeClass="editor12" content={this.state.content} events={{
                          "blur": this.onBlur,
                          "afterPaste": this.afterPaste,
                          "change": this.onChange
                          }}/>
                          {this.state.description_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["description"]}</span>:""}
                       </Col>
                     </FormGroup>
                     <FormGroup check row>
                       <Col   sm={{ size: 10, offset: 2 }}>
                         <Button className="btn btn-primary" onClick={ this.handleSubmit }>Save
                             <div disabled={!this.state.zipcode} style={this.state.loading ? {} : { display: 'none' }} className="image-fill w-25 loader-div ">               <div class="clearfix">
  <div class="spinner-border spinner-border-sm" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div></div>
                         </Button>&nbsp;
                         <Link to={"/cms"} className="btn btn-danger" title="Cancel">&nbsp;Cancel</Link>
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
export default AddCms;
