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
import DatePicker from "react-datepicker";
import {
    MdDateRange
  } from 'react-icons/md';
var prg1 = []
var resources1 = []

class EditTodos extends React.Component{
    constructor(){
        super();
        this.state={
            title : "",
            description : "",
            // user_type:"",
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
            period_error : false,
            programs:[],
            prog_error:false,
            selectedValue : [],
            seletedprogram : [],
            resources1 : [],
            program_id:'',
            selectedValue1:[],
            programsdata:[],
            duration_start_date:'',
            duration_end_date:'',
            dueDate_err:false,
            duration_start_err:false,
            duration_end_err:false,
            Changelabel: true,
            label: '',
            duration:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onSelect1 = this.onSelect1.bind(this);
        this.onRemove1 = this.onRemove1.bind(this);
        this.handledateOfEvent = this.handledateOfEvent.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.starthandledateOfEvent = this.starthandledateOfEvent.bind(this);
    }
    openDatepicker1 = () => this._calendar1.setOpen(true);
    openDatepicker2 = () => this._calendar1.setOpen(true);
    handledateOfEvent(bday){
        if(bday != ""){
            this.setState({dob_error:false})
        }else{
          this.setState({dob_error:true})
        }
        this.setState({dueDate:bday})
    }

    starthandledateOfEvent(startdate){
        var currentDate = new Date(startdate);
            currentDate.setDate(currentDate.getDate() + parseInt(this.state.label));
        if(startdate != ""){
            this.setState({duration_start_err:false})
        }else{
          this.setState({duration_start_err:true})
        }
        this.setState({duration_start_date:startdate,duration_end_date:currentDate})
    }
    onSelect1(selectedList, selectedItem) {
        // console.log("asdfghj",selectedList)
        this.setState({
            selectedValue1: selectedList
        });
        // if(selectedList){
        //     this.setState({prog_error:false})
        //     var prgs = [];
        //     selectedList.map((prg,i)=>{
        //         prgs.push(prg.prg_id)
        //     })
        //     let data1 = {};
        //     data1 = {
        //         'user': this.props.match.params.user_type,
        //         'programs' : prgs
        //     }
        //     axios.post(AppConstants.API+'/resource/getUserandProgrambasedResources',data1)
        //         .then(res => { 
        //             if(res.data.Status == "Success"){
        //                 var resources1 = []
        //                 res.data.data.map((resource,index)=>{
        //                     var item ={}
        //                     item["name"] = resource.title
        //                     item["id"] = resource._id
        //                     resources1.push(item)
        //                 })
        //                 this.setState({resources:resources1,selectedValue:[]})
        //             }
        //         }) 
        // }
        
    }
    onRemove1(selectedList, removedItem) {
        this.setState({selectedValue1: selectedList})
        if(selectedList == ""){
          this.setState({prog_error:true})
        }
        // if(selectedList){
        //     this.setState({prog_error:false})
        //     var prgs = [];
        //     selectedList.map((prg,i)=>{
        //         prgs.push(prg.prg_id)
        //     })
        //     let data1 = {};
        //     data1 = {
        //         'user': this.props.match.params.user_type,
        //         'programs' : prgs
        //     }
        //     axios.post(AppConstants.API+'/resource/getUserandProgrambasedResources',data1)
        //         .then(res => { 
        //             if(res.data.Status == "Success"){
        //                 var resources1 = []
        //                 res.data.data.map((resource,index)=>{
        //                     var item ={}
        //                     item["name"] = resource.title
        //                     item["id"] = resource._id
        //                     resources1.push(item)
        //                 })
        //                 this.setState({resources:resources1,selectedValue:[],seletedresources :[]})
        //             }
        //         }) 
        // }
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
          this.setState({
              res_error:true,
              seletedresources: selectedList
        })
        }
    }
    handleSelectChange= (e) => {
        if(e.target.value !=''  && this.state.Changelabel == false) {
            let index = e.nativeEvent.target.selectedIndex;
            let label = e.nativeEvent.target[index].text;
            this.setState({[e.target.name]:e.target.value, label: label,duration_start_date:'',duration_end_date:''})
        } else if(e.target.value !='') {
            let index = e.nativeEvent.target.selectedIndex;
            let label = e.nativeEvent.target[index].text;
            this.setState({[e.target.name]:e.target.value, label: label})
        }else {
            this.setState({[e.target.name]:e.target.value, label: '',duration_start_date:'',duration_end_date:''})
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
        // if(e.target.name == "period"){
        //     if(e.target.value != ""){
        //       this.setState({period_error:false})
        //     }else{
        //       this.setState({period_error:true})
        //     }
        // }
        // if(e.target.name == "user_type"){
        //     fetch(AppConstants.API+'/resource/getUserbasedResources/'+"student").then(res=>{
        //         if(res.status == 200){
        //             return res.json();
        //         }
        //       }).then(result=>{
        //             var resources1 = []
        //             result.data.map((resource,index)=>{
        //                 var item ={}
        //                 item["name"] = resource.title
        //                 item["id"] = resource._id
        //                 resources1.push(item)
        //             })
        //             this.setState({resources:resources1})
        //     })
        //     // if(e.target.value != ""){
        //     //   this.setState({user_type_error:false})
        //     // }else{
        //     //   this.setState({user_type_error:true})
        //     // }
        // }

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
        if(!this.state.dueDate){
            formIsValid = false;
            errors["dueDate"] = "Please select due date";
        }
        if(this.state.resources.length==0){
            formIsValid = false;
            errors["resource_error"] = "Please select resources";
        }
        // if(!this.state.period){
        //     formIsValid = false;
        //     errors["period"] = "Please enter period to complete todo";
        //     ReactDOM.findDOMNode(this.refs.period).focus();
        // }
        // if(this.state.selectedValue1.length==0){
        //     formIsValid = false;
        //     errors["seletedprogram"] = "Please select program";
        // }
        if(this.state.program_id !=''){
            if(!this.state.duration_start_date){
                formIsValid = false;
                errors["duration_start_date"] = "Please select start date";
            }
        }
        if(!this.state.program_id){
            formIsValid = false;
            errors["seletedprogram"] = "Please select duration";
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
        this.setState({
            errors: errors,
            title_error : true,
            description_error:true,
            res_error : true,
            period_error :true,
            prog_error : true,
            dueDate_err:true,
            duration_start_err:true
        });
        return formIsValid;
    }
     handleSelectChange= (e) => {
        console.log("value",e.target.value,"e.target.name",e.target.name)
        if(e.target.value !='') {
            let data1 = {};
            var usertype;
            if(this.props.match.params.user_type=='student'){
                usertype = 'Student'
            }else{
                usertype = 'Mentor'
            }
            data1 = {
                'user': usertype,
                'programs' : e.target.value
            }
            axios.post(AppConstants.API+'/resource/getUserandProgrambasedResources',data1)
                .then(res => { 
                    // console.log(res.data)
                    if(res.data.Status == "Success"){
                        // var resources1 = []
                        res.data.data.map((resource,index)=>{
                            var item ={}
                            item["name"] = resource.title
                            item["id"] = resource._id
                            resources1.push(item)
                        })
                        this.setState({resources1:resources1,selectedValue:[],seletedresources:[]})
                    }
                }) 
            this.setState({[e.target.name]:e.target.value})
        } else {
            this.setState({[e.target.name]:e.target.value,})
        }
        
    }
    handleStatusChange(checked){
        this.setState({status : checked})
    }
    handleSubmit(e){
        e.preventDefault();
        if(this.handleValidation()){
            this.setState({loading:1});
            // let formData = new FormData();
            var reso = []
            if(this.state.resources.length!==0){
                this.state.resources.map((res)=>{
                    reso.push(res.id)
                })
            }else{
                this.state.selectedValue.map((res)=>{
                    reso.push(res.id)
                })
            }
            var prgs = []
            this.state.selectedValue1.map((prg,index)=>{
                prgs.push(prg.prg_id)
            })
            let formval = {};
            formval = {
                'id':this.props.match.params.id,
                'user_type': this.props.match.params.user_type,
                'title': this.state.title,
                'duration': this.state.duration,
                'description': this.state.description,
                'resources': JSON.stringify(reso),
                'dueDate':this.state.dueDate,
                //'programs' : JSON.stringify(prgs),
                'status': this.state.status,
                'programs' : this.state.program_id,
                'created_by':this.props.auth.user._id,
                'duration_start_date':this.state.duration_start_date,
                'duration_end_date':this.state.duration_end_date
            }
            axios.post(AppConstants.API+'/todos/updateTodo',formval)
                .then(res => { 
                    if(res.data.Status == "Success"){
                        setTimeout((e) => {
                            if(this.props.match.params.user_type == 'parent'){
                                this.props.history.push('/allParentTodos');
                            }else if(this.props.match.params.user_type == 'student'){
                                this.props.history.push('/allStudentTodos');
                            }else{
                                this.props.history.push('/allMentorTodos');
                            }
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
        var that = this;
        prg1 = [];
        resources1 = [];
       if(this.props.match.params.user_type == 'student'){
             // var element = document.getElementById("navItem-Client Habits-0");
            // element.classList.remove("active");
            var element = document.getElementById("navItem-Habits-3");
            element.classList.add("active");
           
        }else{
            // var element = document.getElementById("navItem-Client Habits-0");
            // element.classList.remove("active");
            var element = document.getElementById("navItem-Habits-3");
            element.classList.add("active");
        }
        fetch(AppConstants.API+'/programs/getAllactiveprograms').then(res=>{
            if(res.status == 200){
                return res.json();
            }
          }).then(result=>{
            // result.data.map((res,i)=>{
            //   var prg = {}
            //   prg["name"] = res.title
            //   prg["prg_id"] = res._id
            //   prg1.push(prg)
            // })
            that.setState({programs:result.data})
            // this.setState({programsdata:result.data})
          })
          fetch(AppConstants.API+'/resource/getUserbasedResources/'+this.props.match.params.user_type).then(res=>{
          if(res.status == 200){
              return res.json();  
          }
        }).then(result=>{
            //   var resources1 = []
              result.data.map((resource,index)=>{
                  var item ={}
                  item["name"] = resource.title
                  item["id"] = resource._id
                  resources1.push(item)
              })
              this.setState({resources1:resources1})
      })
    //console.log("this.props.match.params.id",this.props.match.params.id,"this.props.match.params.user_type",this.props.match.params.user_type)
          fetch(AppConstants.API+'/todos/getStudentTodoData/'+this.props.match.params.id +'/'+ this.props.match.params.user_type)
        .then(function(res) {
            if(res.status == "200"){
                return res.json();
            }
        })
        .then(function(data) {
            if(data.Status == "Success"){
                console.log( " data.data[0].duration",data.data[0].duration)
                // let selectedValue1 = []
                // data.data[0].programs.map((prgs,i)=>{
                //     that.state.programs.forEach(option => {
                //         if(prgs == option.prg_id){
                //             var item ={}
                //             item["name"] = option.name
                //             item["prg_id"] = option.prg_id
                //             selectedValue1.push(item)
                //         }
                //     })
                // })
              
                // let data2 = {};
                // data2 = {
                //     'user': that.props.match.params.user_type,
                //     'programs' : data.data[0].programs
                // }

                
                // var resources1 = []
                // axios.post(AppConstants.API+'/resource/getUserandProgrambasedResources',data2)
                // .then(res => { 
                //     console.log("resorces",res.data);
                //     if(res.data.Status == "Success"){
                //         res.data.data.map((resource,index)=>{
                //             var item ={}
                //             item["name"] = resource.title
                //             item["id"] = resource._id
                //             resources1.push(item)
                //         })
                //         that.setState({resources:resources1})
                //     }
                // }) 
                that.setState({
                    user_type:data.data[0].user_type,
                    title: data.data[0].title,
                    // selectedValue : selectedValue,
                   // selectedValue1 : selectedValue1,
                    description: data.data[0].description,  
                    status:data.data[0].status,
                    dueDate :  new Date(data.data[0].dueDate),
                    resources:data.data[0].resources_data,
                    program_id: data.data[0].programs,
                    duration_start_date: new Date(data.data[0].duration_start_date),
                    duration_end_date: new Date(data.data[0].duration_end_date),
                    Changelabel:false,
                    duration: data.data[0].duration,
                    // label:data.data[0].duration
                }); 
            }
        }); 
    }
    render(){
        var resource_links = [];
        if(this.state.seletedresources.length!==0){
            this.state.seletedresources.map((item,index)=>{
                // console.log("selectedresources")
                resource_links.push(item)
            })
        }else{
            this.state.selectedValue.map((item,index)=>{
                resource_links.push(item)
            })
        }
        
        let page;
        if(this.props.match.params.user_type == 'parent'){
            page =  <ul className="cst-breadcrumb">
                        <li><Link to={'/dashboard'}>Dashboard</Link></li>
                        <li><Link to={'/allParentTodos'}>Habits</Link></li>
                        <li>Edit Parent Habit</li>
                    </ul> 
        }else if(this.props.match.params.user_type == 'student'){

            page =  <ul className="cst-breadcrumb">
                        <li><Link to={'/dashboard'}>Dashboard</Link></li>
                        <li><Link to={'/allStudentTodos'}>All Habits</Link></li>
                        <li>Edit Habit</li>
                    </ul> 
        }else{
            page =  <ul className="cst-breadcrumb">
                        <li><Link to={'/dashboard'}>Dashboard</Link></li>
                        <li><Link to={'/allMentorTodos'}>Habits</Link></li>
                        <li>Edit Mentor Habit</li>
                    </ul> 
        }
         let pageTitle;
        if(this.props.match.params.user_type == 'parent'){
            pageTitle =  'Edit Parent Habits'
        }else if(this.props.match.params.user_type == 'student'){
            pageTitle =  'Edit Habits'
        }else{
            pageTitle =  'Edit Mentor Habits' 
        }
        return(
            <Page title={pageTitle}>
                {page}
                <ReactTitle title={pageTitle}/>
                <Row>
                    <Col xl={12} lg={12} md={12}>
                        <Card>
                            <CardBody>
                                <Form name="EditTodo" onSubmit= { this.handleSubmit }>
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
                                    {/* <FormGroup row>
                                        <Label for="program" sm={2}>
                                            Program  <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                        <div>
                                            <Multiselect
                                            options={this.state.programs} // Options to display in the dropdown
                                            selectedValues={this.state.selectedValue1} // Preselected value to persist in dropdown
                                            onSelect={this.onSelect1} // Function will trigger on select event
                                            onRemove={this.onRemove1} // Function will trigger on remove event
                                            displayValue="name" // Property name to display in the dropdown options
                                            placeholder="Program"
                                            />
                                            </div>
                                            {this.state.prog_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["seletedprogram"]}</span> :''}
                                        </Col>
                                    </FormGroup> */}

                                    <FormGroup row>
                                        <Label for="program" sm={2}>
                                            Program  <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                        <Input
                                        type="select"
                                        name="program_id"
                                        value={this.state.program_id}
                                        onChange={ this.handleSelectChange }  
                                        // onKeyUp={this.handleKeyUp} 
                                        ref ="programs"                  
                                        >
                                        <option value="">Select Program</option>
                                        {
                                            this.state.programs.map((customers,index)=>{
                                            if(customers.status == true && customers.deleted == false){
                                                return <option key={index} value={customers._id}>{customers.title}</option>
                                            }
                                            })
                                        }
                                        </Input>
                                        {this.state.prog_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["seletedprogram"]}</span> :''}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="program" sm={2}>
                                        Duration(Days) <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                        <Input
                                        type="text"
                                        name="duration"
                                        placeholder="Duration"                      

                                        value={this.state.duration}
                                        onChange={ this.handleInputChange }  
                                        />
                                       
                                        <span className="error" style={{color: 'red'}}>{this.state.errors["duration"]}</span> 
                                        </Col>
                                    </FormGroup>
                                  
                                    <FormGroup row>
                                        <Label for="resource" sm={2}>
                                            Resources  <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                        <div>
                                            <Multiselect
                                            options={this.state.resources1} // Options to display in the dropdown
                                            selectedValues={this.state.resources} // Preselected value to persist in dropdown
                                            onSelect={this.onSelect} // Function will trigger on select event
                                            onRemove={this.onRemove} // Function will trigger on remove event
                                            displayValue="name" // Property name to display in the dropdown options
                                            placeholder="Resources"
                                            ref="resource"
                                            />
                                            
                                            </div>
                                            {this.state.res_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["resource_error"]}</span> :''}
                                        </Col>
                                    </FormGroup>
                                    

                                    {/* <FormGroup row>
                                        <Label for="period" sm={2}>
                                        Duration (Days)<span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                        <NumberFormat
                                            // format="(###) ###-####" mask=""
                                            name="period"
                                            placeholder='Duration'
                                            onChange={this.handleInputChange}
                                            value={this.state.period} class="form-control" ref ="period"/>   
                                            {this.state.period_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["period"]}</span>:""}
                                        </Col>
                                    </FormGroup> */}
                                    
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
                                            <Button className="btn btn-primary" onClick={ this.handleSubmit }>Update    <div style={this.state.loading ? {} : { display: 'none' }} className="image-fill w-25 loader-div">
                                                {/*                <div class="clearfix">
  <div class="spinner-border spinner-border-sm" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div> */}
                                                <div class="clearfix">
  <div class="spinner-border spinner-border-sm" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>
                                                </div></Button>&nbsp;
                                            {(this.props.match.params.user_type == 'parent') ?
                                                <Link to={"/allParentTodos"} className="btn btn-danger" title="Cancel">&nbsp;Cancel</Link> : this.props.match.params.user_type == 'student' ? <Link to={"/allStudentTodos"} className="btn btn-danger" title="Cancel">&nbsp;Cancel</Link> : <Link to={"/allMentorTodos"} className="btn btn-danger" title="Cancel">&nbsp;Cancel</Link> }
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
EditTodos.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});
export  default connect(mapStateToProps, {})(EditTodos);