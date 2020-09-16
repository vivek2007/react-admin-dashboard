import React from 'react';
import Page from 'components/Page';
import axios from 'axios';
import AppConstants from 'AppConstants';
import {ReactTitle} from 'react-meta-tags';
import  { Link } from 'react-router-dom';
import {
    Row,
    Col,Alert,
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
import Switch from "react-switch";
import ReactDOM from 'react-dom';
import { Multiselect } from 'multiselect-react-dropdown';
import CKEditor from "react-ckeditor-component";
var prg1 = []
class EditResource extends React.Component{
    constructor(){
        super();
        this.state={
            title : "",
            description : "",
            document : "",
            status : true,
            loading : "",
            errors : {},
            programs:[],
            seletedprogram : [{}],
            title_error : false,
            description_error : false,
            status_error : false,
            prog_error:false,
            audio : "",
            video : "",
            thumbnail : "",
            media : "",
            content : '',
            prev_thumbnail : "",
            file_type:'',
            audiolink : '',
            options : [
                { value: 'Student', text: 'Client',isChecked: false },
                // { value: 'parent', text: 'Parent',isChecked: false },
                { value: 'Mentor', text: 'Mentor',isChecked: false },
              ],
            usertype_error : false,
            thumbnali_error : false,
            video_error : false,
            audio_error : false,
            old_audio : "",
            old_document : ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleFileChange1 = this.handleFileChange1.bind(this);
        this.handleThumbnail = this.handleThumbnail.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleUsertpe = this.handleUsertpe.bind(this);
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
    handleThumbnail(e){
        this.setState({thumbnail:e.target.files[0],thumbnail_error:false})
    }
    handleStatusChange(checked){
        this.setState({status : checked})
    }
    onSelect(selectedList, selectedItem) {
        this.setState({
          selectedValue: selectedList
        });
        if(selectedList){
            this.setState({prog_error:false})
        }
    }
    onRemove(selectedList, removedItem) {
        console.log("selectedList",selectedList)
        if(selectedList == ""){
          this.setState({prog_error:true})
        }
    }
    handleFileChange(e){
        this.setState({document:e.target.files[0],document_error:false})
    }
    handleFileChange1(e){
        this.setState({audio:e.target.files[0],audio_error:false})
    }
    
    handleInputChange(e){
        if(e.target.name == 'file_type' && e.target.value == 'audio'){
            this.setState({ video : "",document : "",old_document:''})
        }
        if(e.target.name == 'file_type' && e.target.value == 'video'){
            this.setState({ audio : "",document : "", audiolink : "",old_document:"",old_audio:""})
        }
        if(e.target.name == 'file_type' && e.target.value == 'document'){
            this.setState({ audio : "",video : "", audiolink : "",old_audio:""})
        }
        if(e.target.name == "title"){
            if(e.target.value != ""){
                this.setState({title_error:false})
            }
        }
        
        // if(e.target.name == "video"){
        //     if(e.target.value != ""){
        //         this.setState({video_error:false})
        //     }
        // }
        // if(e.target.name == "audiolink"){
        //     if(e.target.value != ""){
        //         this.setState({audio_error:false})
        //     }
        // }
        // if(e.target.name == "media"){
        //     if(e.target.value != ""){
        //         this.setState({media_error:false})
        //     }
        //     if(e.target.value == "audio"){
        //         this.setState({video_error:false,document_error:false})
        //     }else if(e.target.value == "video"){
        //         this.setState({audio_error:false,document_error:false})
        //     }else{
        //         this.setState({audio_error:false,video_error:false})
        //     }
        // }
        if(e.target.name == "description"){
            // if(e.target.value !=""){
                this.setState({description_error:false});
            // }else{
            //     this.setState({description_error:true});
            // }
        }
        this.setState({[e.target.name]:e.target.value})
        // if(this.state.media)
    }
    handleValidation(){
        let errors = {};
        let formIsValid = true;
        
        if(this.state.audio  && this.state.audiolink && this.state.audio !=="undefined"){
            formIsValid = false;
            errors["audio"] = "Please add audio link or upload audio file";
            // ReactDOM.findDOMNode(this.refs.video).focus();
        }
        if(!this.state.document && !this.state.video && !this.state.audio && !this.state.audiolink){
            formIsValid = false;
            errors["note_color"] = "Please upload atleast one media file (Ex: audio | video | document).";
        }
        if(this.state.document){
            if(this.state.document.type){
                if(this.state.document != '' && this.state.document != undefined && (this.state.document.type != "application/pdf" && this.state.document.type != "application/vnd.openxmlformats-officedocument.wordprocessingml.document")){
                    formIsValid = false;
                    errors["document"] = "Please upload pdf or document";
                    // ReactDOM.findDOMNode(this.refs.document1).focus();
                }
            }
        }
        
        if(this.state.audio){   
            if(this.state.audio.type){
                console.log(this.state.audio.type)
                if(this.state.audio != '' && this.state.audio != undefined && (this.state.audio.type != "audio/mp3")){
                    formIsValid = false;
                    errors["audio"] = "Please upload mp3 file";
                    // ReactDOM.findDOMNode(this.refs.document1).focus();
                }
            }
        }   
        if(this.state.thumbnail && this.state.thumbnail.name && !this.state.thumbnail.name.match(/.(jpg|jpeg|png)$/i)){
            formIsValid = false;
            errors["thumbnail"] = "Please select valid image (Ex: jpg | jpeg | png )";
            // ReactDOM.findDOMNode(this.refs.thumbnail).focus();
        }
        if(this.state.selectedValue.length==0){
            formIsValid = false;
            errors["seletedprogram"] = "Please select program";
        }
        if(!this.state.content){
            formIsValid = false;
            errors["description"] = "Please enter description";
            // ReactDOM.findDOMNode(this.refs.description).focus();
        }
        // var user_tye = []
        // this.state.options.map((option,i)=>{
        //     if(option.isChecked == true){
        //         user_tye.push(option.value)
        //     }
        // })
        // if(user_tye.length == 0){
        //     formIsValid = false;
        //     errors["usertype"] = "Please select user type";
        //     // ReactDOM.findDOMNode(this.refs.usertype).focus();
        // }
        if (!this.state.title){
            formIsValid = false;
            errors["title"] = "Please enter title";
            // ReactDOM.findDOMNode(this.refs.title).focus();
        }
        this.setState({
            errors: errors,
            title_error : true,
            status_error : true,
            description_error: true,
            prog_error:true,
            usertype_error: true,
            thumbnail_error:true,
            document_error:true,
            video_error : true,
            audio_error : true,
            media_error:true
        });
        return formIsValid;
    }
    handleSubmit(e){
        e.preventDefault();
        var user_tye = []
        this.state.options.map((option,i)=>{
            if(option.isChecked == true){
                user_tye.push(option.value)
            }
        })
        if(this.handleValidation()){
            this.setState({loading:1});
            let formData = new FormData();
            var prgs = []
            this.state.selectedValue.map((prg,index)=>{
                prgs.push(prg.prg_id)
            })
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            formData.append('title', this.state.title);
            formData.append('description', this.state.content);
            formData.append('status', this.state.status);
            formData.append('program', JSON.stringify(prgs));
            formData.append('thumbnail', this.state.thumbnail);
            formData.append('prev_thumbnail', this.state.prev_thumbnail);
            // formData.append('media', this.state.media);
            // formData.append('userType', JSON.stringify(user_tye));
            formData.append('audio', this.state.audio);
            formData.append('old_audio', this.state.old_audio);
            formData.append('audiolink', this.state.audiolink);
            formData.append('video', this.state.video);
            formData.append('document',this.state.document)
            formData.append('old_document', this.state.old_document);
                
            formData.append('file_type', this.state.file_type);

            axios.post(AppConstants.API+'/resource/updateResource/' + this.props.match.params.id,formData,config)
                .then(res => { 
                    if(res.data.Status == "Success"){
                        setTimeout((e) => {
                            this.props.history.push('/resources');
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
    }
    }
    componentDidMount(){
        var element = document.getElementById("navItem-Resources-0");
        element.classList.add("active");
        prg1 = [];
        fetch(AppConstants.API+'/programs/getAllactiveprograms').then(res=>{
            if(res.status == 200){
                return res.json();
            }
          }).then(result=>{
            result.data.map((res,i)=>{
              var prg = {}
              prg["name"] = res.title
              prg["prg_id"] = res._id
              prg1.push(prg)
            })
            this.setState({programs:prg1})
        })
        fetch(AppConstants.API+'/resource/getIdBasedResource/' + this.props.match.params.id).then(res=>{
            if(res.status == 200){
                return res.json();
            }
        }).then(result=>{
            let options = this.state.options
            result.data[0].user_type.map((user,index)=>{
                this.state.options.forEach(option => {
                    console.log(option.value,"option.value",user)
                    if (option.value === user)
                     option.isChecked =  true
                 })
            })
           console.log("result.data[0].audio",result.data[0].audio)
           console.log( " result.data[0].programs",result.data[0].programs)
            this.setState({title:result.data[0].title,status:result.data[0].status,content:result.data[0].description,selectedValue : result.data[0].programs,media:result.data[0].media_type,thumbnail:result.data[0].thumbnail,prev_thumbnail:result.data[0].thumbnail,audio:result.data[0].audio,old_audio:result.data[0].audio,old_document:result.data[0].document,document : result.data[0].document,video:result.data[0].video,options:options,audiolink:result.data[0].audio_link,
            file_type:result.data[0].file_type})
        })     
    }
    handleUsertpe(event){
        let options = this.state.options
        options.forEach(option => {
           if (option.value === event.target.value)
            option.isChecked =  event.target.checked
        })
        this.setState({options: options,usertype_error:false});
    }
    render(){
        console.log(this.state.options)
        const checkboxItems = this.state.options.map(planet => {
            return (<Label className="mx-3"><Input type="checkbox" name="usertype" onChange={this.handleUsertpe} value={planet.value} checked={planet.isChecked} ref="usertype" class="form-control"></Input><span>{planet.text}</span></Label>);
        });
        return(
            <Page className="cms-edit" title="Edit Resource">
                <ul className="cst-breadcrumb">
                    <li><Link to={'/dashboard'}>Dashboard</Link></li>
                    <li><Link to={'/resources'}>All Resources</Link></li>
                    <li>Edit Resource</li>
                </ul>
                <ReactTitle title="Edit Resource"/>
                <Row>
                    <Col xl={12} lg={12} md={12}>
                        <Card>
                            <CardBody>
                                <Form name="editresource" onSubmit= { this.handleSubmit }>
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

                                    {/* <FormGroup row>
                                        <Label for="title" sm={2}>
                                           User type<span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input type="checkbox"
                                                checked={this.state.isStudent}
                                                onChange={this.onChangeStudent}
                                                className="form-check-input"
                                            />
                                            Student &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <Input type="checkbox"
                                                checked={this.state.isStudent}
                                                onChange={this.onChangeStudent}
                                                className="form-check-input"
                                            />
                                            Parent
                                        </Col>
                                    </FormGroup> */}
                                     {/* <FormGroup row>
                                        <Label for="title" sm={2}>
                                           User type<span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                        <div className="ml-2">{checkboxItems}</div>
                                        {this.state.usertype_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["usertype"]}</span>:""}
                                        
                                        </Col>
                                    </FormGroup> */}
                                        
                                    <FormGroup row>
                                        <Label for="Description" sm={2}>
                                            Description<span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                          
                                             <CKEditor activeClass="editor12" content={this.state.content} events={{
                                                "blur": this.onBlur,
                                                "afterPaste": this.afterPaste,
                                                "change": this.onChange
                                                }}
                                                ref ="description"
                                                />
                                            {this.state.description_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["description"]}</span>:""}
                                        </Col> 
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="program" sm={2}>
                                            Program  <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                        <div>
                                            <Multiselect
                                            options={this.state.programs} // Options to display in the dropdown
                                            selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                            onSelect={this.onSelect} // Function will trigger on select event
                                            onRemove={this.onRemove} // Function will trigger on remove event
                                            displayValue="name" // Property name to display in the dropdown options
                                            placeholder="Program"
                                            />
                                            </div>
                                            {this.state.prog_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["seletedprogram"]}</span> :''}
                                        </Col>
                                    </FormGroup>
                                                
                                    <FormGroup row>
                                        <Label for="thumbnail" sm={2}>
                                           Thumbnail
                                        </Label>
                                        <Col sm={10}>
                                        {(this.state.prev_thumbnail && this.state.prev_thumbnail!=="undefined") ? (<div><img src={this.state.prev_thumbnail} style={{width: 100, height: 100}} /><br /><br /></div>) : ""}
                                            <Input
                                            type="file"
                                            name="thumbnail"
                                            placeholder="Upload Audio file"                      
                                            // value={this.state.thumbnail}
                                            onChange={ this.handleThumbnail }   
                                            ref ="thumbnail"           
                                            />
                                            {/* {this.state.thumbnail_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["thumbnail"]}</span>:""} */}
                                        </Col>
                                    </FormGroup>
                                    {/* <FormGroup row>
                                        <Label for="media" sm={2}>
                                            Media <span>*</span>
                                        </Label>
                                        <Col lg={10} >
                                            <div className="d-flex justify-content-left">
                                                <FormGroup check className="mr-3">
                                                <Label check>
                                                    <Input type="radio"  name="media" value="document" 
                                                        checked={this.state.media=='document' } ref ="media"  
                                                        onChange={ this.handleInputChange }/>Document
                                                </Label>
                                                </FormGroup>
                                                <FormGroup check>
                                                    <Label check>
                                                        <Input type="radio"  name="media" value="audio" ref ="media" 
                                                            checked={this.state.media=='audio'}
                                                            onChange={ this.handleInputChange }/>Audio&nbsp;&nbsp;
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup check>
                                                    <Label check>
                                                        <Input type="radio"  name="media" value="video" ref ="media" 
                                                            checked={this.state.media=='video'}
                                                            onChange={ this.handleInputChange }/>Video
                                                    </Label>
                                                </FormGroup>
                                           </div>
                                           {this.state.media_error == true  ? <span className="error" style={{color: 'red'}}>{this.state.errors["media"]}</span> : ""}
                                        </Col>
                                    </FormGroup> */}
                                    {/* {this.state.media == "audio" ?  */}
                      
                                    <FormGroup row>
                                        <Label sm={2} for="Eligibility requirements needed" >
                                        File Type
                                        </Label>
                                        <Col sm={10}>
                                            <div className="form-check-inline">
                                            <div className="form-check p-0">
                                            <Label className="form-check-label ">
                                            <Input name="file_type" type="radio" className="form-check-input" value="audio" checked={this.state.file_type == 'audio'}
                                            onChange={this.handleInputChange} />
                                            Audio </Label>
                                            </div>

                                            <div className="form-check">
                                            <Label className="form-check-label">
                                            <Input name="file_type" type="radio" className="form-check-input"
                                            value="video" checked={this.state.file_type == 'video'} onChange={this.handleInputChange} />Video</Label>
                                            </div>

                                            <div className="form-check">
                                            <Label className="form-check-label">
                                            <Input name="file_type" type="radio" className="form-check-input"
                                            value="document" checked={this.state.file_type == 'document'} onChange={this.handleInputChange} />Document</Label>
                                            </div>
                                            </div>
                                        </Col>
                                    
                                    </FormGroup>
                                    {this.state.file_type == 'audio' ? 
                                        <div>
                                            <FormGroup row>
                                                <Label for="audio" sm={2}>
                                                Audio File
                                                </Label>
                                                <Col sm={10}>
                                                    <Input
                                                    type="file"
                                                    name="audio"
                                                    // placeholder="Upload Audio file"                      
                                                    // value={this.state.audio}
                                                    onChange={ this.handleFileChange1 }   
                                                    // ref ="audio"           
                                                    />
                                                    {console.log(this.state.old_audio)}
                                                    {(this.state.old_audio!=="undefined" && this.state.old_audio) ? (<div><a href={this.state.old_audio} target="_blank">{this.state.old_audio}</a><br /><br /></div>) : (<div></div>)}
                                                    {this.state.audio_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["audio"]}</span>:""}
                                                </Col>
                                            </FormGroup> 
                                            <FormGroup row>
                                            <Label for="audio" sm={2}>
                                            Audio Link
                                            </Label>
                                            <Col sm={10}>
                                                <Input
                                                type="text"
                                                name="audiolink"
                                                placeholder="Audio link"                      
                                                value={this.state.audiolink}
                                                onChange={ this.handleInputChange }   
                                                ref ="audiolink"           
                                                />
                                            </Col>
                                        </FormGroup> 
                                    </div>
                                :""}
                                
                           
                                    {/* : this.state.media == "video" ?  */}
                                    {this.state.file_type == 'video' ? 

                                    <FormGroup row>
                                        <Label for="video" sm={2}>
                                            Video Link
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="video"
                                            placeholder="Video Link"                      
                                            value={this.state.video}
                                            onChange={ this.handleInputChange }   
                                            ref ="video"           
                                            />
                                            {/* {this.state.video_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["video"]}</span>:""} */}
                                        </Col>
                                    </FormGroup> 
                                    :''}
                                    {/* : this.state.media == "document" ? */}
                                    {this.state.file_type == 'document' ? 
                                        <FormGroup row>
                                        <Label for="title" sm={2}>
                                            Upload Document
                                        </Label>
                                        <Col sm={10}>
                                        {(this.state.old_document && this.state.old_document!=="undefined") ? (<div><a href={this.state.old_document} target="_blank">{this.state.old_document}</a><br /><br /></div>) : (<div></div>)}
                                            <Input
                                            type="file"
                                            name="document"
                                            placeholder="Upload Pdf document"                      
                                            //value={this.state.document}
                                            onChange={ this.handleFileChange }  
                                            ref = "document1"   
                                            />
                                            {this.state.document_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["document"]}</span>:""}
                                        </Col>
                                    </FormGroup> 
                                   :''}
                                   {/* : ""} */}
                                    {/* <FormGroup row>
                                        <Label for="audio" sm={2}>
                                           Audio File<span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="file"
                                            name="audio"
                                            placeholder="Upload Audio file"                      
                                            value={this.state.audio}
                                            onChange={ this.handleInputChange }   
                                            ref ="audio"           
                                            />
                                          
                                        </Col>
                                    </FormGroup> */}
                                    {/* <FormGroup row>
                                        <Label for="video" sm={2}>
                                            Video Link<span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="video"
                                            placeholder="Video Link"                      
                                            value={this.state.video}
                                            onChange={ this.handleInputChange }   
                                            ref ="video"           
                                            />
                                            {/* {this.state.video_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["video"]}</span>:""} */}
                                        {/* </Col>
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
                                    <FormGroup row>
                                    <Label for="status" sm={2}>
                                           &nbsp;
                                        </Label>
                                        <Col sm={10}>
                                         {this.state.errors["note_color"] ? <Alert color="danger" >Note: {this.state.errors["note_color"]}</Alert>:<Alert color="warning">Note: Please upload atleast one media file.</Alert>}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup check row>
                                        <Col sm={{ size: 10, offset: 2 }}>
                                            <Button className="btn btn-primary" onClick={ this.handleSubmit }>Update    <div style={this.state.loading ? {} : { display: 'none' }} className="image-fill w-25 loader-div">               <div class="clearfix">
  <div class="spinner-border spinner-border-sm" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div></div></Button>&nbsp;
                                            <Link to={"/resources"} className="btn btn-danger" title="Cancel">&nbsp;Cancel</Link>
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
EditResource.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});
export  default connect(mapStateToProps, {})(EditResource);