import React from 'react';
import  { Link } from 'react-router-dom';
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
import Page from 'components/Page';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppConstants from 'AppConstants';
import CKEditor from "react-ckeditor-component";
import Loading from 'assets/img/loader.gif';

class EditCms extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      _id:this.props.auth.user._id,
      id:this.props.match.params.id,
      title:'',
      description:'',
     // page_title:'',
      url:'',
      content: '',
      errors: {},
      errMsg: false,
      title_error : false,
      description_error : false,
      options : [
        { value: 'student', text: 'Client',isChecked: false },
        { value: 'mentor', text: 'Mentor',isChecked: false },
      ],
    }
    //this.handleSubmit = this.handleSubmit.bind(this);  
    this.handleInputChange = this.handleInputChange.bind(this);    
    this.updateContent = this.updateContent.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleUsertpe = this.handleUsertpe.bind(this);
  }

  handleInputChange(e) {
    if (e.target.name == "title") {
      if (e.target.value != "") {
        this.setState({
          title_error: false
        })
      }
    }
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  updateContent(newContent) {
    this.setState({
        content: newContent
    })
  }

  onChange(evt){
    var newContent = evt.editor.getData();
    this.setState({
      content: newContent
    })
    if (newContent) {
      this.setState({description_error:false})
    }
  }
  onBlur(evt){
    // console.log("onBlur event called with event info: ", evt);
  }

  afterPaste(evt){
    // console.log("afterPaste event called with event info: ", evt);
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

   handleSubmit = event => {
    event.preventDefault();
    var user_tye = []
    this.state.options.map((option,i)=>{
        if(option.isChecked == true){
            user_tye.push(option.value)
        }
    })
    //alert('form submitted');    
    if(this.handleValidation()){
      this.setState({loading:1});
      const addTCinfo = {
        id:this.state.id,
        title: this.state.title,
        description:  this.state.content,
        userType:JSON.stringify(user_tye)
      }
      axios.post(AppConstants.API+'/cms/updateCms',addTCinfo)
        .then(res => {   
          if(res.data.Status == "Success"){
            this.setState({loading:''});
            setTimeout((e) => {
                this.props.history.push('/cms');
            }, 2000);

            this.setState({
              errMsg: (<div className="alert alert-success fade show mt-3">{res.data.msg}</div>)
            });
            setTimeout(() => {
              this.setState({
                errMsg: false,
              });
            }, 1000);
          }
          else{
            this.setState({loading:''});
            this.setState({
              errMsg: (<div className="alert alert-danger fade show mt-3">{res.data.msg}</div>)
            });
          }
      });
    } 
  };  

    
  componentDidMount() {
    var element = document.getElementById("navItem-Cms-0");
    element.classList.add("active");
    const that = this; 
    fetch(AppConstants.API+'/cms/getCms/'+this.props.match.params.id)
    .then(function(res) {
      if(res.status == "200"){
        return res.json();
      }
    })
    .then(function(data) {
      if(data.status == "success"){
       let options = that.state.options
      data.data.user_type.map((user,index)=>{
          that.state.options.forEach(option => {
              console.log(option.value,"option.value",user)
              if (option.value === user)
                option.isChecked =  true
            })
        })
        that.setState({
          title: data.data.title,
          content: data.data.description,        
          options:options
        }); 
      }
      else
      {
        console.log('invalid data')
      }
    }); 
}
  handleUsertpe(event){
    let options = this.state.options
    options.forEach(option => {
      if (option.value === event.target.value)
        option.isChecked =  event.target.checked
    })
    console.log("options",options)
    this.setState({options: options});
  }
  render() {
    const {user} = this.props.auth;
    const checkboxItems = this.state.options.map(planet => {
      return (<Label className="mx-3"><Input type="checkbox" name="usertype" onChange={this.handleUsertpe} value={planet.value} checked={planet.isChecked} ref="usertype" class="form-control"></Input><span>{planet.text}</span></Label>);
  });
  return (
    <Page className="cms-edit" title="Edit CMS" /* breadcrumbs={[{ name: 'Add Ask Assistance', active: true }]} */>
       <ul className="cst-breadcrumb">
          <li><Link to={'/dashboard'}>Home</Link> </li>
          <li>  <Link to={'/cms'}>  CMS </Link> </li>
          <li> Edit CMS</li>
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
                    }} 
                    config={ {
                      toolbar: [
                        { name: 'document', groups: [ 'mode', 'document', 'doctools' ], items: [ 'Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates' ] },
                        { name: 'clipboard', groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
                        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker' ], items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
                        { name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
                     
                        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
                        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ], items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
                        { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
                 
                        { name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
                        { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
                        { name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
                        { name: 'others', items: [ '-' ] },
                        { name: 'about', items: [ 'About' ] }
                      ]
                      
                    
                  } }
                    />
                    {this.state.description_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["description"]}</span>:""}
                  </Col>
                </FormGroup>
                   {this.state.title == "Privacy Policy" ? <FormGroup row>
                  <Label for="title" sm={2}>
                      User type
                  </Label>
                  <Col sm={10}>
                  <div className="ml-2">{checkboxItems}</div>
                  </Col>
                </FormGroup>:''
                }
                
                <FormGroup check row>
                  <Col   sm={{ size: 10, offset: 2 }}>
                    <Button className="btn btn-primary" onClick={ this.handleSubmit }>Update
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
  );
};
}

EditCms.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

//export default ChangepasswordPage;
export  default connect(mapStateToProps, {})(EditCms);