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
import {Typeahead} from 'react-bootstrap-typeahead';
import { Multiselect } from 'multiselect-react-dropdown';
import Switch from "react-switch";
import {
    MdDateRange
  } from 'react-icons/md';
var prg1 = []

let airSpaceScore= 0;
let fireScore= 0;
let waterScore= 0;
let personality='';
class AddChild extends React.Component{
    constructor(){
        super();
        this.state = {
            name : "",
            lastname:"",
            organization : "",
            school : "",
            email : "",
            address : "",
            dob : "",
            phone : "",
            status : true,
            errors : {},
            usertype : "",
            errMsg : "",
            loading:"",
            read : false,
            gender: '',
            programs : [],
            program : '',            
            seletedprogram:[],
            //On board form
            "city_of_live": '',
            "weight": '',
            "height":'',
            "bmiCalculator":'',
            "occupation":'',
            "dailyActivity":'',
            "goals":"",
            "foodType":'',
            "concerns":'',
            "concernPriority":'',
            "justifications":'',
            "expectationsFromCoach":'',
            "preparedToDoWhat":'',
            //What do you want to change?
            "pastEfforts":'',
            "whatWorked":'',
            "whatDidnt":'',
            "recentChanges":'',
            "proposedChanges":'',
            "roadBlocksforproposedChanges":'',
            "propellorsOfChange":'',
            "rateOverallNutritionHabits":'',
            //Exercise
            "regularInExercise":'',
            "hoursPerWeek":'',
            "whatKindOfSports":'',
            "otherPhysicalActivity":'',
            "rateOverAllMobility":'',
            //Environment
            "whoLivesWthYou":'',
            "groceryShopping":'',
            "whodoesTheCooking":'',
            "whoDecidesOnMenus":'',
            "rateOverallEnvironment":'',
            //Heath Status Quo
            "specificHealthConcerns":'',
            "medications":'',
            "rateCurrentHealthCondition":'',
            //Time Management
            "paidWorkTimings":'',
            "travel": '',
            "peopleResponsibilities":'',
            "unpaidWork": '',
            "volunteering":'',
            "rateCurrentBusyNess":'',
            //Stress Level & Recovery
            "rateCurrentStress":'',
            "howdoYouCopeWithStress":'',
            "takenVacation": '',
            "suppressAnger":'',
            "childrenSpouse":'',
            //Sleep
            "hoursofSleep": '',
            "dinnerandSleep":'',
            "screenandSleep":'',
            "sleepQuality": '',
            "disclaimer": false,
            "checked": false,
            "recentDiagnosis":'',
            "heightVal":'',
            "hair_option1": 0,
            "hair_option2": 0,
            "hair_option3": 0,
            "skin_option1": 0,
            "skin_option2": 0,
            "skin_option3": 0,
            "mental_option1": 0,
            "mental_option2": 0,
            "mental_option3": 0,
            "memory_option1": 0,
            "memory_option2": 0,
            "memory_option3": 0,
            "weather_option1": 0,
            "weather_option2": 0,
            "weather_option3": 0,
            "sleep_option1": 0,
            "sleep_option2": 0,
            "sleep_option3": 0,
            "stress_option1": 0,
            "stress_option2": 0,
            "stress_option3": 0,
            "bone_option1": 0,
            "bone_option2": 0,
            "bone_option3": 0,
            "hunger_option1": 0,
            "hunger_option2": 0,
            "hunger_option3": 0,
            "mood_option1": 0,
            "mood_option2": 0,
            "mood_option3": 0,
            "bowel_option1": 0,
            "bowel_option2": 0,
            "bowel_option3": 0,
            "decision_option1": 0,
            "decision_option2": 0,
            "decision_option3": 0,
            "walking_option1": 0,
            "walking_option2": 0,
            "walking_option3": 0,
            "talk_option1": 0,
            "talk_option2": 0,
            "talk_option3": 0,
            "work_option1": 0,
            "work_option2": 0,
            "work_option3": 0,
            "airSpaceScore":0,
            "fireScore":0,
            "waterScore":0,
            "personality":''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.inputChangedHandlerContact = this.inputChangedHandlerContact.bind(this);
        this.handleDateofbirth = this.handleDateofbirth.bind(this);
        this.onChangeNumberkey = this.onChangeNumberkey.bind(this);
        this.handleBmiChange = this.handleBmiChange.bind(this);
        this.handleHairInputChange = this.handleHairInputChange.bind(this);
        //this.handleSkinInputChange = this.handleSkinInputChange.bind(this);
    }

    handleHairInputChange(e) {
        //Hair
        if(e.target.value == 'hair_option1') {
            console.log('ddfdsfdsf');
            this.setState({hair_option1:1,hair_option2:0,hair_option3:0});
        } else if(e.target.value == 'hair_option2') {
            this.setState({hair_option1:0,hair_option2:1,hair_option3:0});
        }  else if(e.target.value == 'hair_option3') {
            this.setState({hair_option1:0,hair_option2:0,hair_option3:1});
        }
        //Skin
        if(e.target.value == 'skin_option1') {
            this.setState({skin_option1:1,skin_option2:0,skin_option3:0});
        } else if(e.target.value == 'skin_option2') {
            this.setState({skin_option1:0,skin_option2:1,skin_option3:0});
        }  else if(e.target.value == 'skin_option3') {
            this.setState({skin_option1:0,skin_option2:0,skin_option3:1});
        }

        //Mental activity
        if(e.target.value == 'mental_option1') {
            this.setState({mental_option1:1,mental_option2:0,mental_option3:0});
        } else if(e.target.value == 'mental_option2') {
            this.setState({mental_option1:0,mental_option2:1,mental_option3:0});
        }  else if(e.target.value == 'mental_option3') {
            this.setState({mental_option1:0,mental_option2:0,mental_option3:1});
        }

         //Memory
         if(e.target.value == 'memory_option1') {
            this.setState({memory_option1:1,memory_option2:0,memory_option3:0});
        } else if(e.target.value == 'memory_option2') {
            this.setState({memory_option1:0,memory_option2:1,memory_option3:0});
        }  else if(e.target.value == 'memory_option3') {
            this.setState({memory_option1:0,memory_option2:0,memory_option3:1});
        }

        //Weather sensitivity
        if(e.target.value == 'weather_option1') {
            this.setState({weather_option1:1,weather_option2:0,weather_option3:0});
        } else if(e.target.value == 'weather_option2') {
            this.setState({weather_option1:0,weather_option2:1,weather_option3:0});
        }  else if(e.target.value == 'weather_option3') {
            this.setState({weather_option1:0,weather_option2:0,weather_option3:1});
        }

        //Sleep
        if(e.target.value == 'sleep_option1') {
            this.setState({sleep_option1:1,sleep_option2:0,sleep_option3:0});
        } else if(e.target.value == 'sleep_option2') {
            this.setState({sleep_option1:0,sleep_option2:1,sleep_option3:0});
        }  else if(e.target.value == 'sleep_option3') {
            this.setState({sleep_option1:0,sleep_option2:0,sleep_option3:1});
        }


        //Stress reaction
        if(e.target.value == 'stress_option1') {
            this.setState({stress_option1:1,stress_option2:0,stress_option3:0});
        } else if(e.target.value == 'stress_option2') {
            this.setState({stress_option1:0,stress_option2:1,stress_option3:0});
        }  else if(e.target.value == 'stress_option3') {
            this.setState({stress_option1:0,stress_option2:0,stress_option3:1});
        }

        //Bone Structure
        if(e.target.value == 'bone_option1') {
            this.setState({bone_option1:1,bone_option2:0,bone_option3:0});
        } else if(e.target.value == 'bone_option2') {
            this.setState({bone_option1:0,bone_option2:1,bone_option3:0});
        }  else if(e.target.value == 'bone_option3') {
            this.setState({bone_option1:0,bone_option2:0,bone_option3:1});
        }


        //Hunger
        if(e.target.value == 'hunger_option1') {
            this.setState({hunger_option1:1,hunger_option2:0,hunger_option3:0});
        } else if(e.target.value == 'hunger_option2') {
            this.setState({hunger_option1:0,hunger_option2:1,hunger_option3:0});
        }  else if(e.target.value == 'hunger_option3') {
            this.setState({hunger_option1:0,hunger_option2:0,hunger_option3:1});
        }

        //Mood
        if(e.target.value == 'mood_option1') {
            this.setState({mood_option1:1,mood_option2:0,mood_option3:0});
        } else if(e.target.value == 'mood_option2') {
            this.setState({mood_option1:0,mood_option2:1,mood_option3:0});
        }  else if(e.target.value == 'mood_option3') {
            this.setState({mood_option1:0,mood_option2:0,mood_option3:1});
        }

        //Bowel movements
        if(e.target.value == 'bowel_option1') {
            this.setState({bowel_option1:1,bowel_option2:0,bowel_option3:0});
        } else if(e.target.value == 'bowel_option2') {
            this.setState({bowel_option1:0,bowel_option2:1,bowel_option3:0});
        }  else if(e.target.value == 'bowel_option3') {
            this.setState({bowel_option1:0,bowel_option2:0,bowel_option3:1});
        }

        //Decision making
        if(e.target.value == 'decision_option1') {
            this.setState({decision_option1:1,decision_option2:0,decision_option3:0});
        } else if(e.target.value == 'decision_option2') {
            this.setState({decision_option1:0,decision_option2:1,decision_option3:0});
        }  else if(e.target.value == 'decision_option3') {
            this.setState({decision_option1:0,decision_option2:0,decision_option3:1});
        }

        //Walking Style
        if(e.target.value == 'walking_option1') {
            this.setState({walking_option1:1,walking_option2:0,walking_option3:0});
        } else if(e.target.value == 'walking_option2') {
            this.setState({walking_option1:0,walking_option2:1,walking_option3:0});
        }  else if(e.target.value == 'walking_option3') {
            this.setState({walking_option1:0,walking_option2:0,walking_option3:1});
        }

        //I talk
        if(e.target.value == 'talk_option1') {
            this.setState({talk_option1:1,talk_option2:0,talk_option3:0});
        } else if(e.target.value == 'talk_option2') {
            this.setState({talk_option1:0,talk_option2:1,talk_option3:0});
        }  else if(e.target.value == 'talk_option3') {
            this.setState({talk_option1:0,talk_option2:0,talk_option3:1});
        }


        //Work
        if(e.target.value == 'work_option1') {
            this.setState({work_option1:1,work_option2:0,work_option3:0});
        } else if(e.target.value == 'work_option2') {
            this.setState({work_option1:0,work_option2:1,work_option3:0});
        }  else if(e.target.value == 'work_option3') {
            this.setState({work_option1:0,work_option2:0,work_option3:1});
        }
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
            this.setState({bmiCalculator:0,heightVal:'',height:0});
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

    openDatepicker1 = () => this._calendar1.setOpen(true);
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
    

    handleDateofbirth(bday){
        if(bday != ""){
            this.setState({dob_error:false})
        }
        var years = moment().diff(bday, 'years');
        this.setState({dob:bday,years:years})
    }
    
    inputChangedHandlerContact=(values)=>{
        if(values.value != ""){
            this.setState({phone_error:false})
        }
        this.setState({
            phone: values.value,
        });
    }
    
    handleInputChange(e){
        this.setState({
            [e.target.name]: e.target.value.trimLeft(/(^\s+|\s+$)/g, '')
        });
    }
    
    handleValidation(){
        let errors = {};
        let formIsValid = true;      
               
        // if (this.state.seletedprogram.length ==0){
        //     formIsValid = false;
        //     errors["programs"] = "Please select program";
        //     ReactDOM.findDOMNode(this.refs.program).focus();
        // }
        if (this.state.disclaimer == false){
            formIsValid = false;
            errors["disclaimer"] = "Please check agree";
        }

        if (!this.state.goals){
            formIsValid = false;
            errors["goals"] = "Please select goal";
        }       


        if (!this.state.city_of_live){
            formIsValid = false;
            errors["city_of_live"] = "Please enter city of live";
            ReactDOM.findDOMNode(this.refs.city_of_live).focus();
        }
        if (!this.state.program){
            formIsValid = false;
            errors["program"] = "Please select program";
            ReactDOM.findDOMNode(this.refs.program).focus();
        }
        console.log("dob",this.state.dob)
        if (!this.state.dob){
            formIsValid = false;
            errors["dob"] = "Please enter date of birth";
            // ReactDOM.findDOMNode(this.refs.dob).focus();
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
        if (!this.state.gender){
            formIsValid = false;
            errors["gender"] = "Please select your gender";
            ReactDOM.findDOMNode(this.refs.gender).focus();
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
        if (!this.state.lastname){
            formIsValid = false;
            errors["lastname"] = "Please enter last name";
            ReactDOM.findDOMNode(this.refs.lastname).focus();
        }
        if (!this.state.name){
            formIsValid = false;
            errors["name"] = "Please enter name";
            ReactDOM.findDOMNode(this.refs.name).focus();
        }
        this.setState({errors: errors});
        return formIsValid;
    }
    handleSubmit(e){
        e.preventDefault();
        let formval={} 
        var prgs = []
        this.state.seletedprogram.map((prg,index)=>{
            prgs.push(prg.prg_id)
        })
         if(this.handleValidation()){
            this.setState({loading:1});
            formval={
                'name': this.state.name,
                'lastname': this.state.lastname,
                'email': this.state.email,
               // 'address': this.state.address,
                'phone': this.state.phone,
                'date_of_birth': this.state.dob,               
                'gender': this.state.gender,
                //'city': this.state.city,                
                'status' : this.state.status,     
                'program':this.state.program,   
                //'programs':JSON.stringify(prgs),
                // 'state':this.state.state,
                // 'zipcode':this.state.zipcode,
                'create_by':this.props.auth.user._id,
                'city_of_live':this.state.city_of_live,
                'weight':this.state.weight,
                'height':this.state.height,
                'bmiCalculator':this.state.bmiCalculator,
                'occupation':this.state.occupation,
                'dailyActivity':this.state.dailyActivity,
                'foodType':this.state.foodType,
                'goals':this.state.goals,
                'concerns':this.state.concerns,
                'concernPriority':this.state.concernPriority ,
                'justifications':this.state.justifications,
                'expectationsFromCoach':this.state.expectationsFromCoach,
                'preparedToDoWhat':this.state.preparedToDoWhat,
                'recentChanges':this.state.recentChanges,
                'roadBlocksforproposedChanges':this.state.roadBlocksforproposedChanges,
                'proposedChanges':this.state.proposedChanges,
                'propellorsOfChange':this.state.propellorsOfChange,
                'rateOverallNutritionHabits':this.state.rateOverallNutritionHabits,
                'pastEfforts':this.state.pastEfforts,
                'whatWorked':this.state.whatWorked,
                'whatDidnt':this.state.whatDidnt,
                'regularInExercise':this.state.regularInExercise,
                'hoursPerWeek':this.state.hoursPerWeek,
                'whatKindOfSports':this.state.whatKindOfSports,
                'otherPhysicalActivity':this.state.otherPhysicalActivity,
                'rateOverAllMobility':this.state.rateOverAllMobility,
                'whoLivesWthYou':this.state.whoLivesWthYou,
                'groceryShopping':this.state.groceryShopping,
                'whodoesTheCooking':this.state.whodoesTheCooking,
                'whoDecidesOnMenus':this.state.whoDecidesOnMenus,
                'rateOverallEnvironment':this.state.rateOverallEnvironment,
                'recentDiagnosis':this.state.recentDiagnosis,
                'specificHealthConcerns':this.state.specificHealthConcerns,
                'medications':this.state.medications,
                'rateCurrentHealthCondition':this.state.rateCurrentHealthCondition,
                'paidWorkTimings':this.state.paidWorkTimings,
                'travel':this.state.travel,
                'peopleResponsibilities':this.state.peopleResponsibilities,
                'unpaidWork':this.state.unpaidWork,
                'volunteering':this.state.volunteering,
                'rateCurrentBusyNess':this.state.rateCurrentBusyNess,
                'rateCurrentStress':this.state.rateCurrentStress,
                'howdoYouCopeWithStress':this.state.howdoYouCopeWithStress,
                'takenVacation':this.state.takenVacation,
                'suppressAnger':this.state.suppressAnger,
                'childrenSpouse':this.state.childrenSpouse,
                'hoursofSleep':this.state.hoursofSleep,
                'dinnerandSleep':this.state.dinnerandSleep,
                'screenandSleep':this.state.screenandSleep,
                'sleepQuality':this.state.sleepQuality,
                'heightVal':this.state.heightVal,
                "hair_option1": this.state.hair_option1,
                "hair_option2": this.state.hair_option2,
                "hair_option3": this.state.hair_option3,
                "skin_option1": this.state.skin_option1,
                "skin_option2": this.state.skin_option2,
                "skin_option3": this.state.skin_option3,
                "mental_option1": this.state.mental_option1,
                "mental_option2": this.state.mental_option2,
                "mental_option3": this.state.mental_option3,
                "memory_option1": this.state.memory_option1,
                "memory_option2": this.state.memory_option2,
                "memory_option3": this.state.memory_option3,
                "weather_option1": this.state.weather_option1,
                "weather_option2": this.state.weather_option2,
                "weather_option3": this.state.weather_option3,
                "sleep_option1": this.state.sleep_option1,
                "sleep_option2": this.state.sleep_option2,
                "sleep_option3": this.state.sleep_option3,
                "stress_option1": this.state.stress_option1,
                "stress_option2": this.state.stress_option2,
                "stress_option3": this.state.stress_option3,
                "bone_option1": this.state.bone_option1,
                "bone_option2": this.state.bone_option2,
                "bone_option3": this.state.bone_option3,
                "hunger_option1": this.state.hunger_option1,
                "hunger_option2": this.state.hunger_option2,
                "hunger_option3": this.state.hunger_option3,
                "mood_option1": this.state.mood_option1,
                "mood_option2": this.state.mood_option2,
                "mood_option3": this.state.mood_option3,
                "bowel_option1": this.state.bowel_option1,
                "bowel_option2": this.state.bowel_option2,
                "bowel_option3": this.state.bowel_option3,
                "decision_option1": this.state.decision_option1,
                "decision_option2": this.state.decision_option2,
                "decision_option3": this.state.decision_option3,
                "walking_option1": this.state.walking_option1,
                "walking_option2": this.state.walking_option2,
                "walking_option3": this.state.walking_option3,
                "talk_option1": this.state.talk_option1,
                "talk_option2": this.state.talk_option2,
                "talk_option3": this.state.talk_option3,
                "work_option1": this.state.work_option1,
                "work_option2": this.state.work_option2,
                "work_option3": this.state.work_option3,
                "airSpaceScore": airSpaceScore,
                "fireScore":fireScore,
                "waterScore":waterScore,
                "personality":personality
            }
            axios.post(AppConstants.API+'/child/addAdminChild',formval)
            .then(res => {   
             if(res.data.status == "Success"){
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
        let prg1 = []
        var element = document.getElementById("navItem-Clients-0");
        element.classList.add("active");
        fetch(AppConstants.API+'/programs/getAllactiveprograms').then(res=>{
            if(res.status == 200){
                return res.json();
            }
        }).then(result=>{
            {result.data.map(program=>{
                var prg = {}
                prg['title']=program.title
                prg["prg_id"] = program._id
                prg1.push(prg)
            })}
            this.setState({programs:prg1})
        })
      
        fetch(AppConstants.API+'/parent/getAllParents').then(res=>{
            if(res.status == 200){
                return res.json();
            }
        }).then(result=>{
            var mails = ["other"]
            {result.data.map((p_mail)=>{
                // this.setState({parent_emails:p_mail.email})
                mails.push(p_mail.email)
            })}
            this.setState({parent_emails:mails})
        })
       
    }
    render(){
        airSpaceScore = parseInt(this.state.hair_option1) + parseInt(this.state.skin_option1) + parseInt(this.state.mental_option1) + parseInt(this.state.memory_option1) + parseInt(this.state.weather_option1) + parseInt(this.state.sleep_option1) + parseInt(this.state.stress_option1) + parseInt(this.state.bone_option1) + parseInt(this.state.hunger_option1) + parseInt(this.state.mood_option1) + parseInt(this.state.bowel_option1) + parseInt(this.state.decision_option1) + parseInt(this.state.walking_option1) + parseInt(this.state.talk_option1) + parseInt(this.state.work_option1);

        fireScore = parseInt(this.state.hair_option2) + parseInt(this.state.skin_option2) + parseInt(this.state.mental_option2) + parseInt(this.state.memory_option2) + parseInt(this.state.weather_option2) + parseInt(this.state.sleep_option2) + parseInt(this.state.stress_option2) + parseInt(this.state.bone_option2) + parseInt(this.state.hunger_option2) + parseInt(this.state.mood_option2) + parseInt(this.state.bowel_option2) + parseInt(this.state.decision_option2) + parseInt(this.state.walking_option2) + parseInt(this.state.talk_option2) + parseInt(this.state.work_option2);

        waterScore = parseInt(this.state.hair_option3) + parseInt(this.state.skin_option3) + parseInt(this.state.mental_option3) + parseInt(this.state.memory_option3) + parseInt(this.state.weather_option3) + parseInt(this.state.sleep_option3) + parseInt(this.state.stress_option3) + parseInt(this.state.bone_option3) + parseInt(this.state.hunger_option3) + parseInt(this.state.mood_option3) + parseInt(this.state.bowel_option3) + parseInt(this.state.decision_option3) + parseInt(this.state.walking_option3) + parseInt(this.state.talk_option3) + parseInt(this.state.work_option3);


        if(parseInt(airSpaceScore) > parseInt(fireScore) && parseInt(airSpaceScore) > parseInt(waterScore)) {
            personality = 'Air/Space'
        } else if(parseInt(fireScore) > parseInt(airSpaceScore) && parseInt(fireScore) > parseInt(waterScore)){
            personality = 'Fire'
        } else if (parseInt(waterScore) > parseInt(airSpaceScore) && parseInt(waterScore) > parseInt(fireScore)) {
            personality = 'Water'
        }

        return(
            <Page title="Add Clients" /*breadcrumbs={[{ name: 'Call Center', active: true }]}*/>
                <ul className="cst-breadcrumb">
                    <li><Link to={'/dashboard'}>Dashboard</Link></li>
                    <li><Link to={'/allChildren'}>All Clients</Link></li>
                    <li>Add Client</li>
                </ul>
                <ReactTitle title="Add Client"/>
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
                                            name="name"
                                            placeholder="First Name"                      
                                            value={this.state.name}
                                            onChange={ this.handleInputChange }  
                                            autoComplete="nope" 
                                            ref ="name"           
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["name"]}</span>
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
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["email"]}</span>
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
                                                {/* <FormGroup check>
                                                    <Label check>
                                                        <Input type="radio"  name="gender" value="other" ref ="gender" 
                                                            checked={this.state.gender=='other'}
                                                            onChange={ this.handleInputChange }/>Other
                                                   </Label>
                                                </FormGroup> */}
                                           </div>
                                           <span className="error" style={{color: 'red'}}>{this.state.errors["gender"]}</span>
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
                                            ref={(c) => this._calendar1 = c}
                                            // minDate={new Date().setFullYear(new Date().getFullYear() - 5)}
                                            maxDate={new Date()}
                                        />
                                         <MdDateRange className="cale-icon" onClick={this.openDatepicker1.bind(this)}/> 
                                         </div>     
                                        <span className="error" style={{color: 'red'}}>{this.state.errors["dob"]}</span> 
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
                                                return(<option value={program.prg_id}>{program.title}</option>)
                                            })}
                                            </Input>
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["program"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        City you live  <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="city_of_live"
                                            placeholder="City you live"                      
                                            value={this.state.city_of_live}
                                            onChange={ this.handleInputChange }   
                                            ref ="city_of_live"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["city_of_live"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Weight (Kgs)
                                        </Label>
                                        <Col sm={10}>
                                            <NumberFormat name="weight" value={this.state.weight} decimalScale={0} allowNegative={false} onChange={this.handleInputChange} className="form-control" placeholder = "Enter weight in kg" ref ="weight"/>
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["weight"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Height (Cms)   
                                        </Label>
                                        <Col sm={10}>
                                            <NumberFormat name="height" decimalScale={0} allowNegative={false} onChange={this.handleBmiChange} className="form-control" placeholder = "Enter height in centimeters" ref ="height"/>
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["height"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        BMI(Calculator)   
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            readOnly
                                            type="text"
                                            name="bmiCalculator"
                                            placeholder="BMI(Calculator)"                      
                                            value={this.state.heightVal } 
                                            ref ="bmiCalculator"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["bmiCalculator"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Occupation
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="occupation"
                                            placeholder="Occupation"                      
                                            value={this.state.occupation }
                                            onChange={ this.handleInputChange }   
                                            ref ="occupation"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["occupation"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Daily Activity   
                                        </Label>
                                        <Col sm={10}>
                                        <Input
                                        type="select"
                                        name="dailyActivity"
                                        value={this.state.dailyActivity}
                                        onChange={ this.handleInputChange }   
                                        ref ="dailyActivity"           
                                        >
                                        <option value="">Select Daily Activity</option>
                                        <option value="Sedentary">Sedentary</option>
                                        <option value="Lightly Active">Lightly Active</option>
                                        <option value="Moderately Active">Moderately Active</option>
                                        <option value="Very Active">Very Active</option>
                                        </Input>
                                        <span className="error" style={{color: 'red'}}>{this.state.errors["dailyActivity"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Food Type  
                                        </Label>
                                        <Col sm={10}>
                                        <Input
                                        type="select"
                                        name="foodType"
                                        value={this.state.foodType}
                                        onChange={ this.handleInputChange }   
                                        ref ="foodType"           
                                        >
                                        <option value="">Select Food Type</option>
                                        <option value="Eggtarian">Eggtarian</option>
                                        <option value="Non-veg">Non-veg</option>
                                        <option value="Vegan">Vegan</option>
                                        <option value="Vegeterian">Vegeterian</option>
                                        </Input>
                                        <span className="error" style={{color: 'red'}}>{this.state.errors["foodType"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Goals  <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                        <Input
                                        type="select"
                                        name="goals"
                                        value={this.state.goals}
                                        onChange={ this.handleInputChange }   
                                        ref ="foodType"           
                                        >
                                        <option value="">Select Goal</option>
                                        <option value="Add Muscle">Add Muscle</option>
                                        <option value="Athletics">Athletics</option>
                                        <option value="Feel Better">Feel Better</option>
                                        <option value="Gain Weight">Gain Weight</option>
                                        <option value="Get control of eating habits">Get control of eating habits</option>
                                        <option value="Get Stronger">Get Stronger</option>
                                        <option value="Have much more energy and vitality">Have much more energy and vitality</option>
                                        <option value="Improve Physical Fitness">Improve Physical Fitness</option>
                                        <option value="Lose Weight">Lose Weight</option>
                                        <option value="Maintain Weight">Maintain Weight</option>
                                        <option value="Modeling">Modeling</option>
                                        </Input>
                                        <span className="error" style={{color: 'red'}}>{this.state.errors["goals"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Concerns 
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="concerns"
                                            placeholder="Concerns"                      
                                            value={this.state.concerns }
                                            onChange={ this.handleInputChange }   
                                            ref ="bmiCalculator"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["concerns"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Concern Priority List & Timelines 
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="concernPriority"
                                            placeholder="Concern Priority List & Timelines"                      
                                            value={this.state.concernPriority }
                                            onChange={ this.handleInputChange }   
                                            ref ="concernPriority"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["concernPriority"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Justifications 
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="justifications"
                                            placeholder="Justifications"                      
                                            value={this.state.justifications }
                                            onChange={ this.handleInputChange }   
                                            ref ="justifications"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["justifications"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Expectations from Coach
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="expectationsFromCoach"
                                            placeholder="Expectations from Coach"                      
                                            value={this.state.expectationsFromCoach }
                                            onChange={ this.handleInputChange }   
                                            ref ="expectationsFromCoach"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["expectationsFromCoach"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Prepared to do what
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="preparedToDoWhat"
                                            placeholder="Prepared to do what"                      
                                            value={this.state.preparedToDoWhat }
                                            onChange={ this.handleInputChange }   
                                            ref ="preparedToDoWhat"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["preparedToDoWhat"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="recentChanges" sm={2}>
                                        Recent Changes 
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="recentChanges"
                                            placeholder="Recent Changes"                      
                                            value={this.state.recentChanges }
                                            onChange={ this.handleInputChange }   
                                            ref ="recentChanges"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["recentChanges"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="recentChanges" sm={2}>
                                        Road Blocks for proposed changes 
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="roadBlocksforproposedChanges"
                                            placeholder="Road Blocks for proposed changes"                      
                                            value={this.state.roadBlocksforproposedChanges }
                                            onChange={ this.handleInputChange }   
                                            ref ="roadBlocksforproposedChanges"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["roadBlocksforproposedChanges"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="proposedChanges" sm={2}>
                                        Proposed Changes 
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="proposedChanges"
                                            placeholder="Proposed Changes"                      
                                            value={this.state.proposedChanges }
                                            onChange={ this.handleInputChange }   
                                            ref ="proposedChanges"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["proposedChanges"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="proposedChanges" sm={2}>
                                        Propellors of change 
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="propellorsOfChange"
                                            placeholder="Propellors of change"                      
                                            value={this.state.propellorsOfChange }
                                            onChange={ this.handleInputChange }   
                                            ref ="propellorsOfChange"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["propellorsOfChange"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="proposedChanges" sm={2}>
                                        Rate overall Nutrition Habits(1-10) 
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="rateOverallNutritionHabits"
                                            placeholder="Rate overall Nutrition Habits(1-10)"
                                            value={this.state.rateOverallNutritionHabits }
                                            onChange={ this.handleInputChange }   
                                            ref ="rateOverallNutritionHabits"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["rateOverallNutritionHabits"]}</span>
                                        </Col>
                                    </FormGroup>
                                    <h6 className="text-left mb-3"><b>What do you want to change?</b></h6>
                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Past Efforts
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="pastEfforts"
                                            placeholder="Past Efforts"                      
                                            value={this.state.pastEfforts }
                                            onChange={ this.handleInputChange }   
                                            ref ="pastEfforts"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["pastEfforts"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        What worked
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="whatWorked"
                                            placeholder="What worked"                      
                                            value={this.state.whatWorked }
                                            onChange={ this.handleInputChange }   
                                            ref ="whatWorked"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["whatWorked"]}</span>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        What didnt (Praise perseverance)
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="whatDidnt"
                                            placeholder="What didnt (Praise perseverance)"                      
                                            value={this.state.whatDidnt }
                                            onChange={ this.handleInputChange }   
                                            ref ="whatDidnt"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["whatDidnt"]}</span>
                                        </Col>
                                    </FormGroup>
                                    <h6 className="text-left mb-3"><b>Exercise</b></h6> 
                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Are you regular in sports / exercise
                                        </Label>
                                        <Col sm={10}>
                                       
                                            <Input
                                            type="text"
                                            name="regularInExercise"
                                            placeholder="Are you regular in sports / exercise"                      
                                            value={this.state.regularInExercise }
                                            onChange={ this.handleInputChange }   
                                            ref ="regularInExercise"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["regularInExercise"]}</span>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Hours per week
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="hoursPerWeek"
                                            placeholder="Hours per week"                      
                                            value={this.state.hoursPerWeek }
                                            onChange={ this.handleInputChange }   
                                            ref ="hoursPerWeek"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["hoursPerWeek"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        what kind of sports
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="whatKindOfSports"
                                            placeholder="what kind of sports"                      
                                            value={this.state.whatKindOfSports }
                                            onChange={ this.handleInputChange }   
                                            ref ="whatKindOfSports"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["whatKindOfSports"]}</span>
                                        </Col>
                                    </FormGroup> 

                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        other physical activity
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="otherPhysicalActivity"
                                            placeholder="other physical activity"                      
                                            value={this.state.otherPhysicalActivity }
                                            onChange={ this.handleInputChange }   
                                            ref ="otherPhysicalActivity"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["otherPhysicalActivity"]}</span>
                                        </Col>
                                    </FormGroup> 

                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Rate over all mobility
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="rateOverAllMobility"
                                            placeholder="Rate over all mobility"                      
                                            value={this.state.rateOverAllMobility }
                                            onChange={ this.handleInputChange }   
                                            ref ="rateOverAllMobility"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["rateOverAllMobility"]}</span>
                                        </Col>
                                    </FormGroup>
                                    <h6 className="text-left mb-3"><b>Environment</b></h6> 
                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Who lives wth you
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="whoLivesWthYou"
                                            placeholder="Who lives wth you"                      
                                            value={this.state.whoLivesWthYou }
                                            onChange={ this.handleInputChange }   
                                            ref ="whoLivesWthYou"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["whoLivesWthYou"]}</span>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Who does the grocery shopping
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="groceryShopping"
                                            placeholder="Who does the grocery shopping"                      
                                            value={this.state.groceryShopping }
                                            onChange={ this.handleInputChange }   
                                            ref ="groceryShopping"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["groceryShopping"]}</span>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Who does the cooking
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="whodoesTheCooking"
                                            placeholder="Who does the cooking"                      
                                            value={this.state.whodoesTheCooking }
                                            onChange={ this.handleInputChange }   
                                            ref ="whodoesTheCooking"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["whodoesTheCooking"]}</span>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Who decides on menus
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="whoDecidesOnMenus"
                                            placeholder="Who decides on menus"                      
                                            value={this.state.whoDecidesOnMenus }
                                            onChange={ this.handleInputChange }   
                                            ref ="whoDecidesOnMenus"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["whoDecidesOnMenus"]}</span>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Rate overall environment
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="rateOverallEnvironment"
                                            placeholder="Rate overall environment"                      
                                            value={this.state.rateOverallEnvironment }
                                            onChange={ this.handleInputChange }   
                                            ref ="rateOverallEnvironment"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["rateOverallEnvironment"]}</span>
                                        </Col>
                                    </FormGroup>
                                    <h6 className="text-left mb-3"><b>Heath Status Quo</b></h6> 
                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Recent Diagnosis
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="recentDiagnosis"
                                            placeholder="Recent Diagnosis"                      
                                            value={this.state.recentDiagnosis }
                                            onChange={ this.handleInputChange }   
                                            ref ="recentDiagnosis"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["recentDiagnosis"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Specific Health Concerns
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="specificHealthConcerns"
                                            placeholder="Specific Health Concerns"                      
                                            value={this.state.specificHealthConcerns }
                                            onChange={ this.handleInputChange }   
                                            ref ="specificHealthConcerns"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["specificHealthConcerns"]}</span>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Medications
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="medications"
                                            placeholder="Medications"                      
                                            value={this.state.medications }
                                            onChange={ this.handleInputChange }   
                                            ref ="medications"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["medications"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Rate current health condition
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="rateCurrentHealthCondition"
                                            placeholder="Rate current health condition"                      
                                            value={this.state.rateCurrentHealthCondition }
                                            onChange={ this.handleInputChange }   
                                            ref ="rateCurrentHealthCondition"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["rateCurrentHealthCondition"]}</span>
                                        </Col>
                                    </FormGroup>
                                    <h6 className="text-left mb-3"><b>Time Management</b></h6> 
                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        paid work timings
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="paidWorkTimings"
                                            placeholder="paid work timings"                      
                                            value={this.state.paidWorkTimings }
                                            onChange={ this.handleInputChange }   
                                            ref ="paidWorkTimings"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["paidWorkTimings"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Travel
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="travel"
                                            placeholder="Travel"                      
                                            value={this.state.travel }
                                            onChange={ this.handleInputChange }   
                                            ref ="travel"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["travel"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        people responsibilities 
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="peopleResponsibilities"
                                            placeholder="people responsibilities "                      
                                            value={this.state.peopleResponsibilities }
                                            onChange={ this.handleInputChange }   
                                            ref ="peopleResponsibilities"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["peopleResponsibilities"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        unpaid work 
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="unpaidWork"
                                            placeholder="unpaid work"                      
                                            value={this.state.unpaidWork }
                                            onChange={ this.handleInputChange }   
                                            ref ="unpaidWork"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["unpaidWork"]}</span>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Volunteering 
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="volunteering"
                                            placeholder="Volunteering"                      
                                            value={this.state.volunteering }
                                            onChange={ this.handleInputChange }   
                                            ref ="volunteering"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["volunteering"]}</span>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Rate current busy ness 
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="rateCurrentBusyNess"
                                            placeholder="Rate current busy ness"                      
                                            value={this.state.rateCurrentBusyNess }
                                            onChange={ this.handleInputChange }   
                                            ref ="rateCurrentBusyNess"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["rateCurrentBusyNess"]}</span>
                                        </Col>
                                    </FormGroup>
                                    <h6 className="text-left mb-3"><b>Stress Level &amp; Recovery</b></h6> 
                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Rate Current Stress
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="rateCurrentStress"
                                            placeholder="Rate Current Stress"                      
                                            value={this.state.rateCurrentStress }
                                            onChange={ this.handleInputChange }   
                                            ref ="rateCurrentStress"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["rateCurrentStress"]}</span>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        How do you cope with stress
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="howdoYouCopeWithStress"
                                            placeholder="How do you cope with stress"                      
                                            value={this.state.howdoYouCopeWithStress }
                                            onChange={ this.handleInputChange }   
                                            ref ="howdoYouCopeWithStress"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["howdoYouCopeWithStress"]}</span>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        when is the last you have taken vacation?
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="takenVacation"
                                            placeholder="when is the last you have taken vacation?"                      
                                            value={this.state.takenVacation }
                                            onChange={ this.handleInputChange }   
                                            ref ="takenVacation"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["takenVacation"]}</span>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        How many times do you suppress anger?
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="suppressAnger"
                                            placeholder="How many times do you suppress anger?"                      
                                            value={this.state.suppressAnger }
                                            onChange={ this.handleInputChange }   
                                            ref ="suppressAnger"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["suppressAnger"]}</span>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        How often do you shout at children / Spouse
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="childrenSpouse"
                                            placeholder="How often do you shout at children / Spouse"                      
                                            value={this.state.childrenSpouse }
                                            onChange={ this.handleInputChange }   
                                            ref ="childrenSpouse"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["childrenSpouse"]}</span>
                                        </Col>
                                    </FormGroup>
                                    <h6 className="text-left mb-3"><b>Sleep</b></h6> 
                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Average Hours of sleep
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="hoursofSleep"
                                            placeholder="Average Hours of sleep"                      
                                            value={this.state.hoursofSleep }
                                            onChange={ this.handleInputChange }   
                                            ref ="hoursofSleep"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["hoursofSleep"]}</span>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Gap between dinner and sleep
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="dinnerandSleep"
                                            placeholder="Gap between dinner and sleep"                      
                                            value={this.state.dinnerandSleep }
                                            onChange={ this.handleInputChange }   
                                            ref ="dinnerandSleep"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["dinnerandSleep"]}</span>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Gap between screen and sleep
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="screenandSleep"
                                            placeholder="Gap between screen and sleep"                      
                                            value={this.state.screenandSleep }
                                            onChange={ this.handleInputChange }   
                                            ref ="screenandSleep"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["screenandSleep"]}</span>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="email" sm={2}>
                                        Rate current sleep quality
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="sleepQuality"
                                            placeholder="Rate current sleep quality"                      
                                            value={this.state.sleepQuality }
                                            onChange={ this.handleInputChange }   
                                            ref ="sleepQuality"
                                            />
                                            <span className="error" style={{color: 'red'}}>{this.state.errors["sleepQuality"]}</span>
                                        </Col>
                                    </FormGroup>

                                  
                                    <h6 className="text-left mb-3"><b>Body Type Calculator</b></h6>
                                    <FormGroup row>
                                        <Label for="gender" sm={2}>
                                            Hair
                                        </Label>
                                        <Col lg={10} >
                                            <div className="d-flex justify-content-left">
                                                <FormGroup check className="onb-radio pl-0">
                                                <Label check>
                                                    <Input type="radio"  name="hair_option1" value="hair_option1" 
                                                        checked={this.state.hair_option1==1 }  
                                                        onChange={ this.handleHairInputChange }/>dry
                                                </Label>
                                                </FormGroup>
                                                <FormGroup check className="onb-radio">
                                                    <Label check>
                                                        <Input type="radio"  name="hair_option2" value="hair_option2"
                                                            checked={this.state.hair_option2==1}
                                                            onChange={ this.handleHairInputChange }/>fine, tendency to gray
                                                   </Label>
                                                </FormGroup> 
                                                <FormGroup check className="onb-radio">
                                                    <Label check>
                                                        <Input type="radio"  name="hair_option3" value="hair_option3"
                                                            checked={this.state.hair_option3==1}
                                                            onChange={ this.handleHairInputChange }/>thick, fat
                                                   </Label>
                                                </FormGroup>
                                           </div>
                                        </Col>
                                    </FormGroup>   

                                    <FormGroup row>
                                        <Label for="gender" sm={2}>
                                            Skin
                                        </Label>
                                        <Col lg={10} >
                                            <div className="d-flex justify-content-left">
                                                <FormGroup check  className="onb-radio pl-0">
                                                <Label check>
                                                    <Input type="radio"  name="skin_option1" value="skin_option1" 
                                                        checked={this.state.skin_option1==1 }  
                                                        onChange={ this.handleHairInputChange }/>dry, hard, thin
                                                </Label>
                                                </FormGroup>
                                                <FormGroup check  className="onb-radio">
                                                    <Label check>
                                                        <Input type="radio"  name="skin_option2" value="skin_option2"
                                                            checked={this.state.skin_option2==1}
                                                            onChange={ this.handleHairInputChange }/>soft, yellowish red
                                                   </Label>
                                                </FormGroup>
                                                <FormGroup check  className="onb-radio ">
                                                    <Label check>
                                                        <Input type="radio"  name="skin_option3" value="skin_option3"
                                                            checked={this.state.skin_option3==1}
                                                            onChange={ this.handleHairInputChange }/>moist, smooth, thick
                                                   </Label>
                                                </FormGroup>
                                           </div>
                                        </Col>
                                    </FormGroup>  

                                    <FormGroup row>
                                        <Label for="gender" sm={2}>
                                        Mental activity
                                        </Label>
                                        <Col lg={10} >
                                            <div className="d-flex justify-content-left">
                                                <FormGroup check  className="onb-radio pl-0">
                                                <Label check>
                                                    <Input type="radio"  name="mental_option1" value="mental_option1" 
                                                        checked={this.state.mental_option1==1 }  
                                                        onChange={ this.handleHairInputChange }/>quick, restless, fragmented
                                                </Label>
                                                </FormGroup>
                                                <FormGroup check  className="onb-radio">
                                                    <Label check>
                                                        <Input type="radio"  name="mental_option2" value="mental_option2"
                                                            checked={this.state.mental_option2==1}
                                                            onChange={ this.handleHairInputChange }/>sharp intellect, perfectionist, focused
                                                   </Label>
                                                </FormGroup>
                                                <FormGroup check  className="onb-radio ">
                                                    <Label check>
                                                        <Input type="radio"  name="mental_option3" value="mental_option3"
                                                            checked={this.state.mental_option3==1}
                                                            onChange={ this.handleHairInputChange }/>calm, steady, thoughtful
                                                   </Label>
                                                </FormGroup>
                                           </div>
                                        </Col>
                                    </FormGroup>   

                                    <FormGroup row>
                                        <Label for="gender" sm={2}>
                                        Memory
                                        </Label>
                                        <Col lg={10} >
                                            <div className="d-flex justify-content-left">
                                                <FormGroup check  className="onb-radio pl-0">
                                                <Label check>
                                                    <Input type="radio"  name="memory_option1" value="memory_option1" 
                                                        checked={this.state.memory_option1==1 }  
                                                        onChange={ this.handleHairInputChange }/>learn quickly, forget quickly
                                                </Label>
                                                </FormGroup >
                                                <FormGroup check  className="onb-radio">
                                                    <Label check>
                                                        <Input type="radio"  name="memory_option2" value="memory_option2"
                                                            checked={this.state.memory_option2==1}
                                                            onChange={ this.handleHairInputChange }/>good memory
                                                   </Label>
                                                </FormGroup> &nbsp;&nbsp;
                                                <FormGroup check  className="onb-radio ">
                                                    <Label check>
                                                        <Input type="radio"  name="memory_option3" value="memory_option3"
                                                            checked={this.state.memory_option3==1}
                                                            onChange={ this.handleHairInputChange }/>good long-term memory, slow learning
                                                   </Label>
                                                </FormGroup>
                                           </div>
                                        </Col>
                                    </FormGroup>  

                                    <FormGroup row>
                                        <Label for="gender" sm={2}>
                                        Weather sensitivity
                                        </Label>
                                        <Col lg={10} >
                                            <div className="d-flex justify-content-left">
                                                <FormGroup check  className="onb-radio pl-0">
                                                <Label check>
                                                    <Input type="radio"  name="weather_option1" value="weather_option1" 
                                                        checked={this.state.weather_option1==1 }  
                                                        onChange={ this.handleHairInputChange }/>do not like cold weather or wind
                                                </Label>
                                                </FormGroup>
                                                <FormGroup check  className="onb-radio">
                                                    <Label check>
                                                        <Input type="radio"  name="weather_option2" value="weather_option2"
                                                            checked={this.state.weather_option2==1}
                                                            onChange={ this.handleHairInputChange }/>do not like hot weather
                                                   </Label>
                                                </FormGroup> 
                                                <FormGroup check  className="onb-radio">
                                                    <Label check>
                                                        <Input type="radio"  name="weather_option3" value="weather_option3"
                                                            checked={this.state.weather_option3==1}
                                                            onChange={ this.handleHairInputChange }/>do not like cold or damp weather
                                                   </Label>
                                                </FormGroup>
                                           </div>
                                        </Col>
                                    </FormGroup>  

                                    <FormGroup row>
                                        <Label for="gender" sm={2}>
                                        Sleep
                                        </Label>
                                        <Col lg={10} >
                                            <div className="d-flex justify-content-left">
                                                <FormGroup check  className="onb-radio pl-0">
                                                <Label check>
                                                    <Input type="radio"  name="sleep_option1" value="sleep_option1" 
                                                        checked={this.state.sleep_option1==1 }  
                                                        onChange={ this.handleHairInputChange }/>light sleep, easily aroused, 6–8 hours
                                                </Label>
                                                </FormGroup>
                                                <FormGroup check  className="onb-radio ">
                                                    <Label check>
                                                        <Input type="radio"  name="sleep_option2" value="sleep_option2"
                                                            checked={this.state.sleep_option2==1}
                                                            onChange={ this.handleHairInputChange }/>salutary, 7–8 hours
                                                   </Label>
                                                </FormGroup>
                                                <FormGroup check  className="onb-radio">
                                                    <Label check>
                                                        <Input type="radio"  name="sleep_option3" value="sleep_option3"
                                                            checked={this.state.sleep_option3==1}
                                                            onChange={ this.handleHairInputChange }/>heavy, at least 8 hours
                                                   </Label>
                                                </FormGroup>
                                           </div>
                                        </Col>
                                    </FormGroup>  

                                    <FormGroup row>
                                        <Label for="gender" sm={2}>
                                        Stress reaction
                                        </Label>
                                        <Col lg={10} >
                                            <div className="d-flex justify-content-left">
                                                <FormGroup check  className="onb-radio pl-0">
                                                <Label check>
                                                    <Input type="radio"  name="stress_option1" value="stress_option1" 
                                                        checked={this.state.stress_option1==1 }  
                                                        onChange={ this.handleHairInputChange }/>tendency for worry and anxiety
                                                </Label>
                                                </FormGroup>
                                                <FormGroup check  className="onb-radio ">
                                                    <Label check>
                                                        <Input type="radio"  name="stress_option2" value="stress_option2"
                                                            checked={this.state.stress_option2==1}
                                                            onChange={ this.handleHairInputChange }/>easily become angry or irritable
                                                   </Label>
                                                </FormGroup> 
                                                <FormGroup check  className="onb-radio ">
                                                    <Label check>
                                                        <Input type="radio"  name="stress_option3" value="stress_option3"
                                                            checked={this.state.stress_option3==1}
                                                            onChange={ this.handleHairInputChange }/>calm, do not get angry or afraid easily
                                                   </Label>
                                                </FormGroup>
                                           </div>
                                        </Col>
                                    </FormGroup>  

                                    <FormGroup row>
                                        <Label for="gender" sm={2}>
                                        Bone Structure 
                                        </Label>
                                        <Col lg={10} >
                                            <div className="d-flex justify-content-left">
                                                <FormGroup check  className="onb-radio pl-0">
                                                <Label check>
                                                    <Input type="radio"  name="bone_option1" value="bone_option1" 
                                                        checked={this.state.bone_option1==1 }  
                                                        onChange={ this.handleHairInputChange }/>thin
                                                </Label>
                                                </FormGroup>
                                                <FormGroup check  className="onb-radio">
                                                    <Label check>
                                                        <Input type="radio"  name="bone_option2" value="bone_option2"
                                                            checked={this.state.bone_option2==1}
                                                            onChange={ this.handleHairInputChange }/>medium
                                                   </Label>
                                                </FormGroup> 
                                                <FormGroup check  className="onb-radio">
                                                    <Label check>
                                                        <Input type="radio"  name="bone_option3" value="bone_option3"
                                                            checked={this.state.bone_option3==1}
                                                            onChange={ this.handleHairInputChange }/>strong
                                                   </Label>
                                                </FormGroup>
                                           </div>
                                        </Col>
                                    </FormGroup>  

                                    <FormGroup row>
                                        <Label for="gender" sm={2}>
                                        Hunger
                                        </Label>
                                        <Col lg={10} >
                                            <div className="d-flex justify-content-left">
                                                <FormGroup check  className="onb-radio pl-0">
                                                <Label check>
                                                    <Input type="radio"  name="hunger_option1" value="hunger_option1" 
                                                        checked={this.state.hunger_option1==1 }  
                                                        onChange={ this.handleHairInputChange }/>irregular
                                                </Label>
                                                </FormGroup>
                                                <FormGroup check  className="onb-radio">
                                                    <Label check>
                                                        <Input type="radio"  name="hunger_option2" value="hunger_option2"
                                                            checked={this.state.hunger_option2==1}
                                                            onChange={ this.handleHairInputChange }/>strong, cannot skip meals
                                                   </Label>
                                                </FormGroup>
                                                <FormGroup check  className="onb-radio">
                                                    <Label check>
                                                        <Input type="radio"  name="hunger_option3" value="hunger_option3"
                                                            checked={this.state.hunger_option3==1}
                                                            onChange={ this.handleHairInputChange }/>can easily skip a meal
                                                   </Label>
                                                </FormGroup>
                                           </div>
                                        </Col>
                                    </FormGroup>  

                                    <FormGroup row>
                                        <Label for="gender" sm={2}>
                                        Mood
                                        </Label>
                                        <Col lg={10} >
                                            <div className="d-flex justify-content-left">
                                                <FormGroup check  className="onb-radio pl-0">
                                                <Label check>
                                                    <Input type="radio"  name="mood_option1" value="mood_option1" 
                                                        checked={this.state.mood_option1==1 }  
                                                        onChange={ this.handleHairInputChange }/>changes quickly
                                                </Label>
                                                </FormGroup>
                                                <FormGroup check  className="onb-radio">
                                                    <Label check>
                                                        <Input type="radio"  name="mood_option2" value="mood_option2"
                                                            checked={this.state.mood_option2==1}
                                                            onChange={ this.handleHairInputChange }/>temperamental
                                                   </Label>
                                                </FormGroup> 
                                                <FormGroup check  className="onb-radio">
                                                    <Label check>
                                                        <Input type="radio"  name="mood_option3" value="mood_option3"
                                                            checked={this.state.mood_option3==1}
                                                            onChange={ this.handleHairInputChange }/>stable
                                                   </Label>
                                                </FormGroup>
                                           </div>
                                        </Col>
                                    </FormGroup>  

                                    <FormGroup row>
                                        <Label for="gender" sm={2}>
                                        Bowel movements
                                        </Label>
                                        <Col lg={10} >
                                            <div className="d-flex justify-content-left">
                                                <FormGroup check  className="onb-radio pl-0">
                                                <Label check>
                                                    <Input type="radio"  name="bowel_option1" value="bowel_option1" 
                                                        checked={this.state.bowel_option1==1 }  
                                                        onChange={ this.handleHairInputChange }/>irregular, tendency for constipation
                                                </Label>
                                                </FormGroup>
                                                <FormGroup check  className="onb-radio">
                                                    <Label check>
                                                        <Input type="radio"  name="bowel_option2" value="bowel_option2"
                                                            checked={this.state.bowel_option2==1}
                                                            onChange={ this.handleHairInputChange }/>several times a day, tendency for liquid stools
                                                   </Label>
                                                </FormGroup>
                                                <FormGroup check  className="onb-radio">
                                                    <Label check>
                                                        <Input type="radio"  name="bowel_option3" value="bowel_option3"
                                                            checked={this.state.bowel_option3==1}
                                                            onChange={ this.handleHairInputChange }/>regular, one to two times per day, normal stools
                                                   </Label>
                                                </FormGroup>
                                           </div>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="gender" sm={2}>
                                        Decision making
                                        </Label>
                                        <Col lg={10} >
                                            <div className="d-flex justify-content-left">
                                                <FormGroup check  className="onb-radio pl-0">
                                                <Label check>
                                                    <Input type="radio"  name="decision_option1" value="decision_option1" 
                                                        checked={this.state.decision_option1==1 }  
                                                        onChange={ this.handleHairInputChange }/>indecisive, dithering
                                                </Label>
                                                </FormGroup>
                                                <FormGroup check  className="onb-radio">
                                                    <Label check>
                                                        <Input type="radio"  name="decision_option2" value="decision_option2"
                                                            checked={this.state.decision_option2==1}
                                                            onChange={ this.handleHairInputChange }/>makes decisions quick and easy
                                                   </Label>
                                                </FormGroup> 
                                                <FormGroup check  className="onb-radio">
                                                    <Label check>
                                                        <Input type="radio"  name="decision_option3" value="decision_option3"
                                                            checked={this.state.decision_option3==1}
                                                            onChange={ this.handleHairInputChange }/>needs time
                                                   </Label>
                                                </FormGroup>
                                           </div>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="gender" sm={2}>
                                        Walking Style
                                        </Label>
                                        <Col lg={10} >
                                            <div className="d-flex justify-content-left">
                                                <FormGroup check  className="onb-radio pl-0">
                                                <Label check>
                                                    <Input type="radio"  name="walking_option1" value="walking_option1" 
                                                        checked={this.state.walking_option1==1 }  
                                                        onChange={ this.handleHairInputChange }/>quick and easy, a bit aimlessly
                                                </Label>
                                                </FormGroup>
                                                <FormGroup check  className="onb-radio">
                                                    <Label check>
                                                        <Input type="radio"  name="walking_option2" value="walking_option2"
                                                            checked={this.state.walking_option2==1}
                                                            onChange={ this.handleHairInputChange }/>medium fast with determined steps, purposefully
                                                   </Label>
                                                </FormGroup> &nbsp;&nbsp;
                                                <FormGroup check  className="onb-radio">
                                                    <Label check>
                                                        <Input type="radio"  name="walking_option3" value="walking_option3"
                                                            checked={this.state.walking_option3==1}
                                                            onChange={ this.handleHairInputChange }/>slow and a bit heavy
                                                   </Label>
                                                </FormGroup>
                                           </div>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="gender" sm={2}>
                                        I talk
                                        </Label>
                                        <Col lg={10} >
                                            <div className="d-flex justify-content-left">
                                                <FormGroup check  className="onb-radio pl-0">
                                                <Label check>
                                                    <Input type="radio"  name="talk_option1" value="talk_option1" 
                                                        checked={this.state.talk_option1==1 }  
                                                        onChange={ this.handleHairInputChange }/>fast and a lot
                                                </Label>
                                                </FormGroup>
                                                <FormGroup check  className="onb-radio">
                                                    <Label check>
                                                        <Input type="radio"  name="talk_option2" value="talk_option2"
                                                            checked={this.state.talk_option2==1}
                                                            onChange={ this.handleHairInputChange }/>clearly, concisely and exact
                                                   </Label>
                                                </FormGroup> 
                                                <FormGroup check  className="onb-radio">
                                                    <Label check>
                                                        <Input type="radio"  name="talk_option3" value="talk_option3"
                                                            checked={this.state.talk_option3==1}
                                                            onChange={ this.handleHairInputChange }/>slowly and thoughtfully
                                                   </Label>
                                                </FormGroup>
                                           </div>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="gender" sm={2}>
                                        Work
                                        </Label>
                                        <Col lg={10} >
                                            <div className="d-flex justify-content-left">
                                                <FormGroup check  className="onb-radio pl-0">
                                                <Label check>
                                                    <Input type="radio"  name="work_option1" value="work_option1" 
                                                        checked={this.state.work_option1==1 }  
                                                        onChange={ this.handleHairInputChange }/>very fast, takes the initiative
                                                </Label>
                                                </FormGroup>
                                                <FormGroup check  className="onb-radio">
                                                    <Label check>
                                                        <Input type="radio"  name="work_option2" value="work_option2"
                                                            checked={this.state.work_option2==1}
                                                            onChange={ this.handleHairInputChange }/>accurate, efficient, purposeful
                                                   </Label>
                                                </FormGroup> &nbsp;&nbsp;
                                                <FormGroup check  className="onb-radio">
                                                    <Label check>
                                                        <Input type="radio"  name="work_option3" value="work_option3"
                                                            checked={this.state.work_option3==1}
                                                            onChange={ this.handleHairInputChange }/>slow, methodical
                                                   </Label>
                                                </FormGroup>
                                           </div>
                                        </Col>
                                    </FormGroup>

                                    {/* <Input type="text"  name="totalScore" value={totalScore}
                                                            />

                                    {personality} */}


                                    <div className="onb-score row">
                                    <FormGroup  className="col-3">
                                        <Label for="email" >
                                        Air Score 
                                        </Label>
                                        <Col className="p-0" >
                                            <Input
                                            readOnly
                                            type="text"
                                            name="airSpaceScore"
                                            placeholder="Air Score"                      
                                            value={airSpaceScore}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup  className="col-3">
                                        <Label for="email">
                                       Fir Score 
                                        </Label>
                                        <Col className="p-0" >
                                            <Input
                                            readOnly
                                            type="text"
                                            name="fireScore"
                                            placeholder="Fir Score"                      
                                            value={fireScore}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup className="col-3">
                                        <Label for="email" >
                                        Water Score 
                                        </Label>
                                        <Col className="p-0">
                                            <Input
                                            readOnly
                                            type="text"
                                            name="waterScore"
                                            placeholder="Water Score"                      
                                            value={waterScore}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup  className="col-3">
                                        <Label for="email" >
                                        Your Personality
                                        </Label>
                                        <Col className="p-0">
                                            <Input
                                            readOnly
                                            type="text"
                                            name="personality"
                                            placeholder="Your Personality"                      
                                            value={personality}
                                            />
                                        </Col>
                                    </FormGroup>
                                    </div>

                                    
                                    
                                    <FormGroup check className="mb-3">
                                        <Label check>
                                            <Input type="checkbox" name="disclaimer"
                                            checked={this.state.checked} 
                                            value={this.state.disclaimer}   
                                            onChange={ this.handleCheckClickMinority }
                                            /> Please recognize that it is your responsibly to work direclty with your health care provider before,during and after seeking nutrition or fitness consultation. Any information provided is not to be followed without prior approval of your doctor. If you choose to use this information without such approval, you agree to accept full responsibility for your decision. 
                                        </Label>
                                        <span className="error" style={{color: 'red'}}>{this.state.errors["disclaimer"]}</span>
                                    </FormGroup>
                                    
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