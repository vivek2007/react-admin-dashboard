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
            period_error : false,
            prog_error : false,
            dueDate:'',
            dueDate_err:false,
            seletedprogram  : [],
            resourse_error : false,
            program_id:'',
            programs:[],
            label: '',
            duration:'',
            duration_start_date:'',
            duration_start_err:false,
            duration_end_date:'',
            duration_end_err:false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onRemove = this.onRemove.bind(this);
        // this.onSelect1 = this.onSelect1.bind(this);
        // this.onRemove1 = this.onRemove1.bind(this);
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
    // onSelect1(selectedList, selectedItem) {
    //     this.setState({
    //       seletedprogram: selectedList
    //     });
    //     if(selectedList){
    //         this.setState({prog_error:false})
    //         var prgs = [];
    //         selectedList.map((prg,i)=>{
    //             prgs.push(prg.prg_id)
    //         })
    //         let data1 = {};
    //         data1 = {
    //             'user': this.props.match.params.user_type,
    //             'programs' : prgs
    //         }
    //         axios.post(AppConstants.API+'/resource/getUserandProgrambasedResources',data1)
    //             .then(res => { 
    //                 // console.log(res.data)
    //                 if(res.data.Status == "Success"){
    //                     var resources1 = []
    //                     res.data.data.map((resource,index)=>{
    //                         var item ={}
    //                         item["name"] = resource.title
    //                         item["id"] = resource._id
    //                         resources1.push(item)
    //                     })
    //                     this.setState({resources:resources1,selectedValue:[],seletedresources:[]})
    //                 }
    //             }) 
    //     }
        
    // }
    // onRemove1(selectedList, removedItem) {
    //     this.setState({seletedprogram: selectedList})
    //     if(selectedList == ""){
    //       this.setState({prog_error:true})
    //     }
    //     if(selectedList){
    //         this.setState({prog_error:false})
    //         var prgs = [];
    //         selectedList.map((prg,i)=>{
    //             prgs.push(prg.prg_id)
    //         })
    //         let data1 = {};
    //         data1 = {
    //             'user': this.props.match.params.user_type,
    //             'programs' : prgs
    //         }
    //         axios.post(AppConstants.API+'/resource/getUserandProgrambasedResources',data1)
    //             .then(res => { 
    //                 // console.log(res.data)
    //                 if(res.data.Status == "Success"){
    //                     var resources1 = []
    //                     res.data.data.map((resource,index)=>{
    //                         var item ={}
    //                         item["name"] = resource.title
    //                         item["id"] = resource._id
    //                         resources1.push(item)
    //                     })
    //                     this.setState({resources:resources1,selectedValue:[],seletedresources:[]})
    //                 }
    //             }) 
    //     }
    // }
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
        // if(e.target.name == "user_type"){
           
            // if(e.target.value != ""){
            //   this.setState({user_type_error:false})
            // }else{
            //   this.setState({user_type_error:true})
            // }
        // }

        this.setState({[e.target.name]:e.target.value})
    }

    
    //program change
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
                        var resources1 = []
                        res.data.data.map((resource,index)=>{
                            var item ={}
                            item["name"] = resource.title
                            item["id"] = resource._id
                            resources1.push(item)
                        })
                        this.setState({resources:resources1,selectedValue:[],seletedresources:[]})
                    }
                }) 
            this.setState({[e.target.name]:e.target.value})
        } else {
            this.setState({[e.target.name]:e.target.value,})
        }
        
    }

    handleValidation(){
        let errors = {};
        let formIsValid = true;
        // if(!this.state.dueDate){
        //     formIsValid = false;
        //     errors["dueDate"] = "Please select due date";
        // }
        if(this.state.seletedresources.length==0){
            formIsValid = false;
            errors["resource_error"] = "Please select resorces";
            //ReactDOM.findDOMNode(this.refs.resource).focus();
        }

     
        // if(this.state.program_id.length==0){
        //     formIsValid = false;
        //     errors["seletedprogram"] = "Please select program";
        // }
        if(!this.state.program_id){
            formIsValid = false;
            errors["program_id"] = "Please enter program";
        }
        
        if(!this.state.duration){
            formIsValid = false;
            errors["duration"] = "Please enter duration";
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
    handleStatusChange(checked){
        this.setState({status : checked})
    }
    handleSubmit(e){
        e.preventDefault();
        console.log("program_id",this.state.program_id)
        if(this.handleValidation()){
         
             var reso = []
            this.state.seletedresources.map((res)=>{
                reso.push(res.id)
            })
            var prgs = []
            this.state.seletedprogram.map((prg,index)=>{
                prgs.push(prg.prg_id)
            })
            this.setState({loading:1});
            let formData = new FormData();
            let formval = {};
            formval = {
                'user_type': this.props.match.params.user_type,
                'title': this.state.title,
                'description': this.state.description,
                'status': this.state.status,
                'programs' : JSON.stringify(prgs),
                'resources' : JSON.stringify(reso),
                "duration": this.state.duration,
                'programs' : this.state.program_id,
                'dueDate':this.state.dueDate,
                'created_by':this.props.auth.user._id,
            }
            
            
            axios.post(AppConstants.API+'/todos/addTodo',formval)
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
        prg1 = [];
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
              console.log("result.data",result.data)
            // result.data.map((res,i)=>{
            //   var prg = {}
            //   prg["name"] = res.title
            //   prg["prg_id"] = res._id
            //   prg1.push(prg)
            // })
            this.setState({programs:result.data})
            // this.setState({programsdata:result.data})
          })
          fetch(AppConstants.API+'/resource/getUserbasedResources/'+this.props.match.params.user_type).then(res=>{
            if(res.status == 200){
                return res.json();  
            }
          }).then(result=>{
                var resources1 = []
                result.data.map((resource,index)=>{
                    var item ={}
                    item["name"] = resource.title
                    item["id"] = resource._id
                    resources1.push(item)
                })
                this.setState({resources:resources1})
        })  
    }
    render(){
        //console.log('dfdsf',this.state.program_id)
        let page;
        if(this.props.match.params.user_type == 'parent'){
            page =  <ul className="cst-breadcrumb">
                        <li><Link to={'/dashboard'}>Dashboard</Link></li>
                        <li><Link to={'/allParentTodos'}>Habits</Link></li>
                        <li>Add Parent Habit</li>
                    </ul> 
        }else if(this.props.match.params.user_type == 'student'){

            page =  <ul className="cst-breadcrumb">
                        <li><Link to={'/dashboard'}>Dashboard</Link></li>
                        <li><Link to={'/allStudentTodos'}>All Habits</Link></li>
                        <li>Add  Habit</li>
                    </ul> 
        }else{
            page =  <ul className="cst-breadcrumb">
                        <li><Link to={'/dashboard'}>Dashboard</Link></li>
                        <li><Link to={'/allMentorTodos'}>Habits</Link></li>
                        <li>Add Mentor Habit</li>
                    </ul> 
        }
    let pageTitle
        if(this.props.match.params.user_type == 'parent'){
            pageTitle =  'Add Parent Habit'
        }else if(this.props.match.params.user_type == 'student'){
            pageTitle =  'Add  Habit'
        }else{
            pageTitle =  'Add Mentor Habit' 
        }
        var resource_links = [];
        this.state.seletedresources.map((item,index)=>{
            resource_links.push(item)
        })
        return(
            <Page title={pageTitle}>
               { page}
                <ReactTitle title={pageTitle}/>
                <Row>
                    <Col xl={12} lg={12} md={12}>
                        <Card>
                            <CardBody>
                                <Form name="addchild" onSubmit= { this.handleSubmit }>
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
                                        <Label for="program" sm={2}>
                                        Program  <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            {console.log("this.state.program",this.state.programs)}
                                        <Input
                                        type="select"
                                        name="program_id"
                                        value={this.state.program_id}
                                        onChange={ this.handleSelectChange }  
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
                                      <span className="error" style={{color: 'red'}}>{this.state.errors["program_id"]}</span>
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
                                        Duration(Days)  <span>*</span>
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

                                    {/* {this.state.label != '' ? 
                                    <div>
                                         <FormGroup row>
                                         <Label for="dob" sm={2}>
                                         Start Date <span>*</span>
                                         </Label>
                                         <Col sm={10}>
                                         <div className="cst-date-picker">
                                         <DatePicker
                                             name="duration_start_date"
                                             className="form-control"
                                             placeholderText="MM-DD-YYYY"
                                             selected={this.state.duration_start_date}
                                             selectsStart
                                             peekNextMonth
                                             showMonthDropdown
                                             showYearDropdown
                                             dropdownMode="select"
                                             onChange={this.starthandledateOfEvent}
                                             // showTimeSelect                    
                                             // timeIntervals={15}
                                             dateFormat="MM-dd-yyyy"
                                             // timeCaption="time"
                                             autoComplete = "off"
                                             onKeyDown={(e) =>e.preventDefault()}
                                             ref={(c) => this._calendar1 = c}
                                             // minDate={new Date().setFullYear(new Date().getFullYear() - 5)}
                                             //maxDate={}
                                         />
                                         <MdDateRange className="cale-icon" onClick={this.openDatepicker2.bind(this)}/>
                                         </div>
                                         {this.state.duration_start_err == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["duration_start_date"]}</span> :''}
                                         </Col>                                        
                                     </FormGroup>

                                    <FormGroup row>
                                        <Label for="dob" sm={2}>
                                        End Date <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                        <div className="cst-date-picker">
                                        <DatePicker
                                            name="duration_end_date"
                                            className="form-control"
                                            placeholderText="MM-DD-YYYY"
                                            selected={this.state.duration_end_date}
                                            selectsStart
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            dateFormat="MM-dd-yyyy"
                                            autoComplete = "off"
                                            onKeyDown={(e) =>e.preventDefault()}
                                            ref={(c) => this._calendar1 = c}
                                            readOnly
                                        />
                                        <MdDateRange className="cale-icon" onClick={this.openDatepicker2.bind(this)}/>
                                        </div>
                                        </Col>                                        
                                        </FormGroup>

                                    </div>
                                   :''} */}

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
                                            placeholder="Resources"
                                            ref="resource"
                                            />
                                            </div>
                                            {this.state.res_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["resource_error"]}</span> :''}
                                        </Col>
                                    </FormGroup>

                                    {/* <FormGroup row>
                                        <Label for="dob" sm={2}>
                                        Due Date <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                        <div className="cst-date-picker">
                                        <DatePicker
                                            name="dob"
                                            className="form-control"
                                            placeholderText="MM-DD-YYYY"
                                            selected={this.state.dueDate}
                                            selectsStart
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            onChange={this.handledateOfEvent}
                                            // showTimeSelect                    
                                            // timeIntervals={15}
                                            dateFormat="MM-dd-yyyy"
                                            // timeCaption="time"
                                            autoComplete = "off"
                                            onKeyDown={(e) =>e.preventDefault()}
                                            ref={(c) => this._calendar1 = c}
                                            // minDate={new Date().setFullYear(new Date().getFullYear() - 5)}
                                            //maxDate={}
                                        />
                                        <MdDateRange className="cale-icon" onClick={this.openDatepicker1.bind(this)}/>
                                        </div>
                                        {this.state.dueDate_err == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["dueDate"]}</span> :''}
                                        </Col>                                        
                                    </FormGroup> */}
                                    {/* <FormGroup row>
                                        <Label for="period" sm={2}>
                                            Duration (Days) <span>*</span>
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
                                            <Button className="btn btn-primary" onClick={ this.handleSubmit }>Save    <div style={this.state.loading ? {} : { display: 'none' }} className="image-fill w-25 loader-div">
                                                
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
                                            {/* <Link to={"/allStudentTodos"} className="btn btn-danger" title="Cancel">&nbsp;Cancel</Link> */}
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