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
import Switch from "react-switch";
import {
    MdDateRange
  } from 'react-icons/md';

let airSpaceScore= 0;
let fireScore= 0;
let waterScore= 0;
let personality='';
class EditChild extends React.Component{
    constructor(){
        super();
        this.state = {
            name : "",
            organization : "",
            school : "",
            email : "",
            dob : [],
            endDate:[],
            phone : "",
            status : true,
            errors : {},
            usertype : "",
            errMsg : "",
            loading:"",
            read : false,
            gender: '',
            habits : [],
            program : '',
            pastProgram:'',
            show:[],
            checked:[],
            todo:[],
            programs:[],
            duration:[],
            program_id:'',
            editHabits:[]
        }
        // this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleDateofbirth = this.handleDateofbirth.bind(this);
        this.onChangeNumberkey = this.onChangeNumberkey.bind(this);
        this.handleBmiChange = this.handleBmiChange.bind(this);
        // this.handleUsertpe = this.handleUsertpe.bind(this);
    }

    
    handleBmiChange(e1){
        var weightData = parseInt(this.state.weight);
        if (e1.target.value != '') {
            var heightdata = parseInt(e1.target.value) / 100;       
            var Calculation =  weightData / (heightdata * heightdata); 
            var output = (Math.round(Calculation * 100) / 100).toFixed(2);         
            if (output < 18.5){
                this.setState({bmiCalculator:output,heightVal:'Underweight',height:e1.target.value});
            } else if(output >= 18.5 && output <= 25) {
                this.setState({bmiCalculator:output,heightVal:'Normal',height:e1.target.value});
            } else if (output >= 25 && output <= 30) {
                this.setState({bmiCalculator:output,heightVal:'Obese',height:e1.target.value});
            } else if (output > 30) {
                this.setState({bmiCalculator:output,heightVal:'Overweight',height:e1.target.value});
            }
         } else {
            this.setState({bmiCalculator:0,heightVal:'',height:''});
         }
    }

    handleCheckClickMinority = (e) => {
        if(this.state.checked == false) {
          this.setState({
            checked: !this.state.checked,
            disclaimer:!this.state.checked
          });
        }else{
          this.setState({
            checked: !this.state.checked,
            disclaimer:!this.state.checked
          });
        }
      }

    onChangeNumberkey(e){
		const states = this.state
        const re = /^[0-9\b]+$/;
      if(e.target.value == ''){
        this.setState({zipcode_error:true});
      }else{
        this.setState({zipcode_error:false})
      }
    
    if (e.target.value === '' || re.test(e.target.value)) {
        states[e.target.name] = e.target.value;
        this.setState({states})
        }
    }
    handleStatusChange(checked){
        this.setState({status : checked})
    }

    openDatepicker1 (id){
        this.refs['calender' + id].setOpen(true);
    }     
    handleDateofbirth(id,bday){        
        console.log("126",bday)
        let dob  = [...this.state.dob];
        dob[id] = bday;
        let endDate  = [...this.state.endDate];
        console.log("this.state.duration[id]",this.state.todo[id])
       
        // if(this.state.todo[id] != "undefined" && this.state.todo[id] !='' && this.state.todo[id] !=undefined){
            var currentDate = new Date(bday);
            currentDate.setDate(currentDate.getDate() + parseInt(this.state.duration[id]));
            endDate[id] = currentDate
            this.setState({dob:dob,endDate:endDate})

        // }else{

        // }
        

        //var years = moment().diff(bday, 'years');
        //this.setState({dob:bday,years:years})
    }
 
    
    // handleInputChange(e){      
      
    //     this.setState({
    //         [e.target.name]: e.target.value.trimLeft(/(^\s+|\s+$)/g, '')
    //     });
    // }
    handleUsertpe(id,dd,event){
        var editHabits = [...this.state.editHabits]
        var habits = [...this.state.habits]

        let duration = [...this.state.duration]
       
        let todo  = [...this.state.todo];
        todo[id]=event.target.value;
        let show  = [...this.state.show];
        let startDate =[...this.state.dob]
            let endDate = []
        if(event.target.checked == true){
            show[id] =  true;
            duration[id] = dd;
            var obj = {}
            var obj1 ={}
            obj['todo_id'] = event.target.value
            obj['duration'] = dd
            // obj1 =null
            // startDate.push(obj1)
            // obj['startDate'] = null
            // obj['endDate'] = null
            // startDate[id] = null;
            // endDate[id] = null;
            // this.setState({dob:startDate,endDate:[]})
            editHabits.push(obj)
        }else{
            duration[id] = '';
            editHabits.map((result,i)=>{
                if(result.todo_id==event.target.value){
                    editHabits.splice(i, 1);
                    show[id] =  false;
                }

            })
            let startDate = [...this.state.dob]
            let endDate = [...this.state.endDate]
            todo[id]= null
            startDate[id] = null;
            endDate[id] = null;
            this.setState({dob:startDate,endDate:endDate})
        }
        let arr =[]
        let options =[...this.state.habits] 
        options.map(option => {
            // var obj ={}
            if (option._id === event.target.value){
                option.isChecked =  event.target.checked;
            }
            
         })
        this.setState({habits: options,show:show,todo:todo,duration:duration,editHabits:editHabits});
    }
   
    handleValidation(){
        let errors = {};
        let formIsValid = true;
        var array3=[]
        if (this.state.todo.length ==0){
            formIsValid = false;
            errors["todo"] = "Please select habits";
            ReactDOM.findDOMNode(this.refs.program).focus();
        }
        for (var i =0; i < this.state.todo.length; i++) {
            if (this.state.todo[i]!=null && (this.state.dob[i] == '' || this.state.dob[i]== null || this.state.dob[i]== 'undefined' || this.state.dob[i]== undefined)) {
                formIsValid = false;
                errors["startDate" + i] =  "Please select startDate";
            }
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    handleSubmit(e){
        e.preventDefault();
        let formval={}
        if(this.handleValidation()){
            this.setState({loading:1});
            formval={
                user_id:this.props.match.params.id,
               startDate:this.state.dob,
               endDate:this.state.endDate,
               todo:this.state.todo,
               program:this.state.program_id
            }
            axios.post(AppConstants.API+'/child/assignHabits',formval)
            .then(res => {   
                if(res.data.Status == "Success"){
                setTimeout((e) => {
                    this.props.history.push('/allChildren');
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
        fetch(AppConstants.API+'/child/getChildProgram/' + this.props.match.params.id).then(res=>{
            if(res.status == 200){
              return res.json();
            }
          }).then(data=>{
            this.setState({  program : data.data.program[0].name,program_id: data.data.program[0]._id}
                )}
            )
        fetch(AppConstants.API+'/child/getChildHabits/' + this.props.match.params.id).then(res=>{
            if(res.status == 200){
              return res.json();
            }
          }).then(data=>{
           
            let arr=[]
            data.data.map((res,id)=>{
                var obj ={}
                obj['_id'] = res._id;
                obj['title'] = res.title;
                obj['duration'] = res.duration;
                obj['isChecked'] = false;
                arr.push(obj)
            })
            this.setState({
                habits:arr
            })
          })
          fetch(AppConstants.API+'/programs/getAllactiveprograms').then(res=>{
            if(res.status == 200){
                return res.json();
            }
            }).then(result=>{
                this.setState({programs:result.data})
            })

            fetch(AppConstants.API+'/child/getassignHabits/' + this.props.match.params.id).then(res=>{
                if(res.status == 200){
                  return res.json();
                }
              }).then(data=>{
                    this.setState({editHabits:data.data})
                    let show = []
                    let dob =[]
                    let endDate =[]
                    let durArr=[]
                    let todoArr=[]
                    this.state.habits.map((todos,id)=>{
                        var showobj ="";
                        var startDate ={}
                        var end ={}
                        var duration ={}
                        var todo 
                        if(data.data!=''){
                            data.data.find(o => o.todo_id == todos._id ?
                                (showobj =  true) : (showobj  =  false))
                                show.push(showobj);
                                data.data.find(o => o.todo_id == todos._id ?
                                   ( startDate=  new Date(o.startDate)):startDate=null)
                                    dob.push(startDate);
                                    data.data.find(o => o.todo_id == todos._id ?
                                        ( end=  new Date(o.endDate)):end= null)
                                        endDate.push(end);
                                        data.data.find(o => o.todo_id == todos._id ?
                                            ( duration=  o.todo_duration):null)
                                            durArr.push(duration);
                                            data.data.find(o => o.todo_id == todos._id ?
                                                ( todo=  o.todo_id):null)
                                                todoArr.push(todo);
                                this.setState({show:show,dob:dob,endDate:endDate,duration:durArr,todo:todoArr})
                        }
                      
                    })
              }
            )
            // fetch(AppConstants.API+'/child/getassignHabits/' + this.props.match.params.id).then(res=>{
            //     if(res.status == 200){
            //       return res.json();
            //     }
            //   }).then(data=>{
            //       var todo =[]
            //       let arr1 = []
            //       let arr2= []
            //       let arr3 = []
            //       let options =this.state.habits
            //       const todoArr = []
            //       const durArr = []
                 
            //       var obj={};
            //         options.map((option,i) => {
            //             var obj1={};
            //             var obj2 ={};
            //             var obj3 ={};
            //             var obj4 ={};
            //             var obj5 ={};

            //             data.data.map((todos,id)=>{
            //                 console.log("option",option)
            //             if (option._id == todos.todo_id){
            //                  option.isChecked =  true;
            //                  obj['title'] = todos.todo_title;
            //                  obj['_id'] = todos.todo_id;
            //                  obj4 = todos.todo_id;
            //                  obj['duration'] = todos.todo_duration;
            //                  obj['isChecked'] = true;

            //                  obj5=todos.todo_duration
            //                  obj2=  new Date(todos.startDate);
            //                  obj3= new Date(todos.endDate);
            //                  obj1  =true
            //                  arr1.push(obj1)
            //                  arr2.push(obj2)
            //                   arr3.push(obj3)
            //                   todoArr.push(obj4)
            //                   durArr.push(obj5)
            //             }else{
            //                 obj1  =false
            //                 obj['title'] ='';
            //                 obj['_id'] ='';
            //                 obj['duration'] ='';
            //                 obj['isChecked'] = false;

            //                 obj5=todos.todo_duration
            //                 obj4=todos.todo_id
            //                 obj2= null;
            //                 obj3= null;
            //                 arr1.push(obj1)
            //                 arr2.push(obj2)
            //                 arr3.push(obj3)
            //                 todoArr.push(obj4)
            //                 durArr.push(obj5)

            //             }
                       
            //          })
            //          console.log("obj1",obj1)
                     
                    
            //       })
            //     //   console.log("obj1",obj1)
            
            //             todo.push(obj)
                          
                       
            //     this.setState({
            //          habits:options,
            //          show:arr1,
            //          dob:arr2,
            //          endDate:arr3,
            //         duration:durArr,
            //         todo:todoArr
            //     })
            //   })
            
          
          var element = document.getElementById("navItem-Clients-0");
          element.classList.add("active");
    }
    render(){

        // console.log(this.state.dob)
    //   console.log("this.state.editHabits",this.state.editHabits)
        // const checkboxItems = this.state.habits.map((planet,id) => {
        //      console.log("planet",planet)
        //     return (<Label className="mx-3"><Input type="checkbox" duration={planet.duration} name="usertype" onChange={this.handleUsertpe.bind(this,id,planet.duration)} checked={planet.isChecked} value={planet._id} ref="program" class="form-control"></Input><span>{planet.title} ({planet.duration})</span></Label>);
        // });
        const checkboxItems = this.state.habits.map((planet,id) => {
           return (<Label className="d-block"><Input data-id={ this.state.editHabits.find(o => o.todo_id == planet._id)} type="checkbox" duration={planet.duration} name="usertype" onChange={this.handleUsertpe.bind(this,id,planet.duration)} checked={ this.state.editHabits.find(o => o.todo_id == planet._id) ? true : false }
         value={planet._id} ref="program" class="form-control"></Input><span>{planet.title} ({planet.duration})</span></Label>);
       });



     

        return(
            <Page title="Assign Habits" /*breadcrumbs={[{ name: 'Call Center', active: true }]}*/>
                <ul className="cst-breadcrumb">
                    <li><Link to={'/dashboard'}>Dashboard</Link></li>
                    <li><Link to={'/allChildren'}>All Clients</Link></li>
                    <li>Assign Habits</li>
                </ul>
                <ReactTitle title="Assign Habits"/>
                <Row>
                    <Col xl={12} lg={12} md={12}>
                        <Card>
                            <CardBody>
                                <Form name="addchild" onSubmit= { this.handleSubmit } className="habbits-block">
                                
                                <FormGroup row>
                                        <Label for="program" sm={2}>
                                            Program 
                                        </Label>
                                         <label className="col-7 col-form-label">{this.state.program ? this.state.program : 'N/A'}</label>
                                    </FormGroup>
                                    <FormGroup row>
                                       
                                        <Col sm={2} className="habits-list">
                                        <Label for="title" className="lb-title" >
                                          Habits(duration)
                                        </Label>
                                        <div className="ml-2"> {checkboxItems}
                                        </div>
                                        <span className="error" style={{color: 'red'}}>{this.state.errors["todo"]}</span>
                                        </Col>
                                        <Col sm={8} className="habits-dates">
                                        <FormGroup row>
                                        <Col sm={5}>
                                             <Label for="dob" className="lb-title">Start Date <span className='error'>*</span></Label>
                                        </Col>
                                        <Col sm={5}>
                                            <Label for="dob" className="lb-title"> End Date <span className='error'>*</span></Label>
                                        </Col>
                                        </FormGroup>
                                        {console.log("471",this.state.dob)}
                                        {this.state.habits.map((res,id)=>{
                                            if(this.state.todo[id] != 'undefined' && this.state.todo[id] != undefined && this.state.todo[id] != ''&& this.state.todo[id] != null){
                                                return(<React.Fragment>
                                                    {/* {res==true? */}
                                                    <div>
                                                      <FormGroup row>
                                                      <Col sm={5}>
                                                    
                                                    <div className="cst-date-picker">
                                                    <DatePicker
                                                        name="dob"
                                                        className="form-control"
                                                        placeholderText="MM-DD-YYYY"
                                                        selected={this.state.dob[id]}
                                                        // value ={this.state.editHabits[id].startDate}
                                                        selectsStart
                                                        peekNextMonth
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        onChange={this.handleDateofbirth.bind(this,id)}
                                                        autoComplete = "off"
                                                        dateFormat="MM-dd-yyyy"
                                                        autoComplete = "off"
                                                        ref={"calender" + id}
                                                        onKeyDown={(e) =>e.preventDefault()}
                                                    />
                                                    <MdDateRange className="cale-icon" onClick={this.openDatepicker1.bind(this,id)}/>     
                                                    </div>                                
                                                     <span className="error" style={{color: 'red'}}>{this.state.errors["startDate"+ id]}</span>
                                                    </Col>
                                                     <Col sm={5}>
                                                     <div className="cst-date-picker">
                                                     <DatePicker
                                                         name="endDate"
                                                         className="form-control"
                                                         placeholderText="MM-DD-YYYY"
                                                         selected={this.state.endDate[id]}
                                                         selectsStart
                                                         peekNextMonth
                                                         showMonthDropdown
                                                         showYearDropdown
                                                         dropdownMode="select"
                                                         autoComplete = "off"
                                                         dateFormat="MM-dd-yyyy"
                                                         autoComplete = "off"
                                                         ref={(c) => this._calendar1 = c}
                                                         onKeyDown={(e) =>e.preventDefault()}
                                                         readOnly
                                                     />
                                                     <MdDateRange className="cale-icon" />     
                                                     </div>                                  
                                                   <span className="error" style={{color: 'red'}}>{this.state.errors["endDate"]}</span> 
                                                     </Col>
                                                     </FormGroup>
                                                     </div>
                                                    {/* :''} */}
                                                     </React.Fragment>
                                                     )
                                            }else{
                                                return(<React.Fragment>
                                                    {/* {res==true? */}
                                                    <div>
                                                      <FormGroup row>
                                                      <Col sm={5}>
                                                    
                                                    <div className="cst-date-picker">
                                                    <DatePicker
                                                        name="dob"
                                                        className="form-control"
                                                        placeholderText="MM-DD-YYYY"
                                                        selected={this.state.dob[id]}
                                                        // value ={this.state.editHabits[id].startDate}
                                                        selectsStart
                                                        peekNextMonth
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        onChange={this.handleDateofbirth.bind(this,id)}
                                                        autoComplete = "off"
                                                        dateFormat="MM-dd-yyyy"
                                                        autoComplete = "off"
                                                        ref={(c) => this._calendar1 = c}
                                                        onKeyDown={(e) =>e.preventDefault()}
                                                        readOnly
                                                    />
                                                    <MdDateRange className="cale-icon" />     
                                                    </div>                                
                                                     <span className="error" style={{color: 'red'}}>{this.state.errors["startDate"+ id]}</span>
                                                    </Col>
                                                     <Col sm={5}>
                                                     <div className="cst-date-picker">
                                                     <DatePicker
                                                         name="endDate"
                                                         className="form-control"
                                                         placeholderText="MM-DD-YYYY"
                                                         selected={this.state.endDate[id]}
                                                         selectsStart
                                                         peekNextMonth
                                                         showMonthDropdown
                                                         showYearDropdown
                                                         dropdownMode="select"
                                                         autoComplete = "off"
                                                         dateFormat="MM-dd-yyyy"
                                                         autoComplete = "off"
                                                         ref={(c) => this._calendar1 = c}
                                                         onKeyDown={(e) =>e.preventDefault()}
                                                         readOnly
                                                     />
                                                     <MdDateRange className="cale-icon"/>     
                                                     </div>                                  
                                                   <span className="error" style={{color: 'red'}}>{this.state.errors["endDate"]}</span> 
                                                     </Col>
                                                     </FormGroup>
                                                     </div>
                                                    {/* :''} */}
                                                     </React.Fragment>
                                                     )
                                            }
                                    
                                   })} 
                                        </Col>
                                    </FormGroup>
                                   
                                    <FormGroup check row>
                                        <Col sm={{ size: 10, offset: 2 }}>
                                            <Button className="btn btn-primary" onClick={ this.handleSubmit }>Assign<div style={this.state.loading ? {} : { display: 'none' }} className="image-fill w-25 loader-div">               <div class="clearfix">
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
export default connect(mapStateToProps, {})(EditChild);