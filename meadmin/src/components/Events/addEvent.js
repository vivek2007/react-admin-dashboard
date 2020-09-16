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
import Loading from 'assets/img/loader.gif';
import {ReactTitle} from 'react-meta-tags';
import DatePicker from "react-datepicker";
import { Multiselect } from 'multiselect-react-dropdown';
import placeholderimg from '../../assets/img/placeholder.png';
import Switch from "react-switch";
import {
  MdFileUpload, MdDateRange
} from 'react-icons/md';
var prg1 = []
class AddEvent extends React.Component{
    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            image:'',
            dateofevent:'',
            endDate:'',
            event_link:'',
            errors:{},
            title_error : false,
            description_error : false,
            address1_error:false,
            address2_error:false,
            city_error:false,
            state_error:false,
            zipcode_error:false,
            dob_error:false,
            prog_error:false,
            errMsg : '',
            state:'',
            city:'',
            zipcode:'',
            status:true, 
            address1:'',
            address2:'',
            programs:[],
            seletedprogram : [],
            profile_image:'',
            profile_img:'',
            prev_logo:'',
        }
        this.handleSubmit = this.handleSubmit.bind(this);  
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputFileChange = this.handleInputFileChange.bind(this);
        this.handledateOfEvent = this.handledateOfEvent.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onChangeNumberkey = this.onChangeNumberkey.bind(this);
        this.handleprofile_image = this.handleprofile_image.bind(this);
        this.onChangeNumberkey = this.onChangeNumberkey.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }
    // openDatepicker = () => this._calendar.setOpen(true);
    openDatepicker1 = () => this._calendar1.setOpen(true);
    openDatepicker2 = () => this._calendar2.setOpen(true);
    onChangeNumberkey(e){
      const states = this.state
      const re = /^[0-9\b]+$/;
      if (e.target.value === '' || re.test(e.target.value)) {
      states[e.target.name] = e.target.value;
      this.setState({states})
      }
    }
    handleprofile_image(e) {
      this.setState({
         [e.target.name]: e.target.files[0],
         prev_logo:URL.createObjectURL(e.target.files[0])      
      });
    }
    handleInputChange(e) {
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
      if(e.target.name == "address1"){
        if(e.target.value != ""){
          this.setState({address1_error:false})
        }else{
          this.setState({address1_error:true})
        }
      }
      if(e.target.name == "address2"){
        if(e.target.value != ""){
          this.setState({address2_error:false})
        }else{
          this.setState({address2_error:true})
        }
      }
      if(e.target.name == "city"){
        if(e.target.value != ""){
          this.setState({city_error:false})
        }else{
          this.setState({city_error:true})
        }
      }
      if(e.target.name == "state"){
        if(e.target.value != ""){
          this.setState({state_error:false})
        }else{
          this.setState({state_error:true})
        }
      }
      if(e.target.name == "zipcode"){
        if(e.target.value != ""){
          this.setState({zipcode_error:false})
        }else{
          this.setState({zipcode_error:true})
        }
      }
     
      this.setState({
          [e.target.name]: e.target.value.trimLeft(/(^\s+|\s+$)/g, '')
      });
    }
    onChangeNumberkey(e){
      const states = this.state
      const re = /^[0-9\b]+$/;
      if (e.target.value === '' || re.test(e.target.value)) {
      states[e.target.name] = e.target.value;
      this.setState({states})
      }
    }
    onSelect(selectedList, selectedItem) {
      // if(selectedList != ""){
      //   this.setState({prog_error:false})
      // }
      // var arr = selectedList;
      // var array = []
      // arr.map((result,i)=>{
      //   array.push(result.name);
      // })
      console.log("selectedList",selectedList)
      this.setState({
        seletedprogram: selectedList
      });
    }
   
    onRemove(selectedList, removedItem) {
      if(selectedList == ""){
        this.setState({prog_error:true})
    }
    }
    handledateOfEvent(bday){
      console.log("bday",bday);
      if(bday != ""){
          this.setState({dob_error:false})
      }else{
        this.setState({dob_error:true})
      }
      this.setState({dateofevent:bday})
  }
  handleEndDate(bday){
    this.setState({endDate:bday})
  }
    handleInputFileChange(e) {
        this.setState({
            [e.target.name]: e.target.files[0]       
        });
    }
    handleValidation(){
        let errors = {};
        let formIsValid = true;

        if (this.state.profile_image && !this.state.profile_image.name.match(/.(jpg|jpeg|png|gif)$/i)){
          formIsValid = false;
          errors["profile_image"] = "Upload only images (JPEG, JPG, PNG)";
        }
        if(this.state.profile_image === ''){
          formIsValid = false;
          errors["profile_image"] = "Please choose profile image";
        }
        if(!this.state.title) {
          formIsValid = false;
          errors["title"] = "Please enter title";
        }
    
        if(!this.state.description){
          formIsValid = false;
          errors["description"] = "Please enter description";
        }
        if(!this.state.address1){
          formIsValid = false;
          errors["address1"] = "Please enter address1";
        }
     
        if(!this.state.city){
          formIsValid = false;
          errors["city"] = "Please enter city";
        }
        if(!this.state.state){
          formIsValid = false;
          errors["state"] = "Please select state";
        }
        if(!this.state.zipcode){
          formIsValid = false;
          errors["zipcode"] = "Please enter zipcode";
        }
        if(this.state.seletedprogram.length==0){
          formIsValid = false;
          errors["seletedprogram"] = "Please select program";
      }
        // if(this.state.seletedprogram == ''){
        //   formIsValid = false;
        //   errors["seletedprogram"] = "Please select program";
        // }
        if(!this.state.dateofevent){
          formIsValid = false;
          errors["dateofevent"] = "Please select start date";
        }
        if(!this.state.endDate){
          formIsValid = false;
          errors["endDate"] = "Please select end date";
        }
      if(this.state.endDate!='' && this.state.dateofevent!=''){
        if(new Date(this.state.endDate).toISOString() <= new Date(this.state.dateofevent).toISOString()){
          console.log("Coming");
          formIsValid = false;
          errors["date"] = "End date should be greater than Start date";
        }
      }
       
        if(this.state.event_link && !/^https?:\/\//i.test(this.state.event_link)){
          formIsValid = false;
          errors["url"] = "Please enter valid URL";
        }
      
        // if (this.state.image && !this.state.image.name.match(/.(jpg|jpeg|png|gif)$/i)){
        //     formIsValid = false;
        //     errors["image"] = "Please select valid image (Ex: jpg | jpeg | png | gif)";
        // }
        
        this.setState({
          errors: errors,
          title_error : true,
          description_error:true,
          address1_error:true,
          address2_error:true,
          city_error:true,
          state_error:true,
          zipcode_error:true,
          dob_error:true,
          prog_error:true
        });
        return formIsValid;
    }
    handleSubmit = event => {
      event.preventDefault();
      var prgs = []
      this.state.seletedprogram.map((prg,index)=>{
          prgs.push(prg.prg_id)
      })
      if(this.handleValidation()){
        this.setState({loading:1});
        let formData = new FormData();
      //  formData.append('id', this.props.auth.user._id);\
        formData.append('profile_image', this.state.profile_image);    
        formData.append('title', this.state.title);
        formData.append('description', this.state.description);
        formData.append('address1', this.state.address1);
        formData.append('address2', this.state.address2);
        formData.append('zipcode', this.state.zipcode);
        formData.append('state', this.state.state);
        formData.append('city', this.state.city);
        formData.append('status', this.state.status);
        formData.append('program', JSON.stringify(prgs));
        formData.append('dateofevent', this.state.dateofevent);
        formData.append('endDate', this.state.endDate);
        formData.append('event_link', this.state.event_link);

        
        axios.post(AppConstants.API+'/events/addEvent',formData)
          .then(res => {   
            if(res.data.Status == "Success"){
            this.setState({loading:''});
            setTimeout((e) => {            
                this.props.history.push('/events');
            }, 1500);
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
    handleStatusChange(checked){
      this.setState({status : checked})
    }
    componentDidMount(){
      prg1 = [];
      var element = document.getElementById("navItem-Events-1");
      element.classList.add("active");
      fetch(AppConstants.API+'/programs/getAllactiveprograms').then(res=>{
        console.log("resss",res.status);
        if(res.status == 200){
            return res.json();
        }
      }).then(result=>{
        console.log("result.data",result.data);
        if(result.data != ''){
          result.data.map((res,i)=>{
            var prg = {}
              prg["name"] = res.title
              prg["prg_id"] = res._id
              prg1.push(prg)
          })
        }
       
        this.setState({programs:prg1})
      })
    }
    render(){
      let image;
      console.log("placeholderimg",placeholderimg);
      if(this.state.profile_image == '')
      {
        image = placeholderimg;
      }else{
        image = this.state.prev_logo;
      } 
        return(
            <Page title="Add Event" /* breadcrumbs={[{ name: 'Add Ask Assistance', active: true }]} */>
            <ReactTitle title="Add Event"/>
            <ul className="cst-breadcrumb">
               <li><Link to={'/dashboard'}>Home</Link> </li>
               <li>  <Link to={'/events'}>  Events </Link> </li>
               <li> Add Event</li>
             </ul>
           <Row>
             <Col xl={12} lg={12} md={12}>
               <Card>
                 <CardBody>
                   <Form name="changeadminpassword" onSubmit= { this.handleSubmit }>
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
                            <span className="error" style={{color: 'red'}}>{this.state.errors["seletedprogram"]}</span>
                            {/* {this.state.prog_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["seletedprogram"]}</span> :''} */}
                        </Col>
                       
                        
                    </FormGroup>
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
                         <Input
                           type="textarea" rows={2}
                           name="description"
                           placeholder="Description"                      
                           value={this.state.description}
                           onChange={ this.handleInputChange }                  
                         />
                        {this.state.description_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["description"]}</span>:""}
                       </Col>
                     </FormGroup>
                     <FormGroup row>
                        <Label for="dob" sm={2}>
                        Start Date <span>*</span>
                        </Label>
                        <Col sm={10}>
                          <div className="cst-date-picker">
                          <DatePicker
                              name="dob"
                              className="form-control"
                              placeholderText="MM-DD-YYYY"
                              selected={this.state.dateofevent}
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
                        {this.state.dob_error ?<span className="error" style={{color: 'red'}}>{this.state.errors["dateofevent"]}</span>  :''}
                        </Col>
                        
                    </FormGroup>
                    <FormGroup row>
                        <Label for="dob" sm={2}>
                        End Date <span>*</span>
                        </Label>
                        <Col sm={10}>
                          <div className="cst-date-picker">
                          <DatePicker
                              name="enddate"
                              className="form-control"
                              placeholderText="MM-DD-YYYY"
                              selected={this.state.endDate}
                              selectsStart
                              peekNextMonth
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              onChange={this.handleEndDate}
                              // showTimeSelect                    
                              // timeIntervals={15}
                              dateFormat="MM-dd-yyyy"
                              // timeCaption="time"
                              autoComplete = "off"
                              onKeyDown={(e) =>e.preventDefault()}
                              ref={(c) => this._calendar2 = c}
                              // minDate={new Date().setFullYear(new Date().getFullYear() - 5)}
                              //maxDate={}
                          />
                         <MdDateRange className="cale-icon" onClick={this.openDatepicker2.bind(this)}/>
                        </div>
                     <span className="error" >{this.state.errors["endDate"]}</span>
                     <span className="error" >{this.state.errors["date"]}</span>

                      
                        </Col>
                        
                    </FormGroup>
                    <FormGroup row>
                      <Label for="examplePassword" sm={2}>
                        Address 1<span>*</span>
                      </Label>
                      <Col sm={10}>
                        <Input
                          type="text"
                          name="address1"
                          placeholder="Address1"                     
                          value={this.state.address}
                          onChange={ this.handleInputChange }
                          onKeyUp={this.handleKeyUp} 
                          ref ="address1"                     
                        />
                        {this.state.address1_error == true ?<span className="error" style={{color: 'red'}}>{this.state.errors["address1"]}</span>:""}
                      </Col>
                 </FormGroup>
                 <FormGroup row>
                      <Label for="examplePassword" sm={2}>
                        Address 2
                      </Label>
                      <Col sm={10}>
                        <Input
                          type="text"
                          name="address2"
                          placeholder="Address2"                     
                          value={this.state.address}
                          onChange={ this.handleInputChange }
                          onKeyUp={this.handleKeyUp} 
                          ref ="address2"                     
                        />
                       
                      </Col>
                 </FormGroup>
                    <FormGroup row>
                      <Label for="exampleCity" sm={2}>
                        City <span>*</span>
                      </Label>
                      <Col sm={10}>
                        <Input
                          type="text"
                          name="city"
                          placeholder="City"
                          value={this.state.city}
                          onChange={ this.handleInputChange }  
                          onKeyUp={this.handleKeyUp}
                          ref ="city"                   
                        />
                        {this.state.city_error == true ?<span className="error" style={{color: 'red'}}>{this.state.errors["city"]}</span>:""}
                      </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleState" sm={2}>
                    State <span>*</span>
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="select"
                      name="state"
                      placeholder="State"
                      value={this.state.state}
                      onChange={ this.handleInputChange }  
                      onKeyUp={this.handleKeyUp} 
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
                    {this.state.state_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["state"]}</span>:''}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleZipcode" sm={2}>
                    Zip Code <span>*</span>
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="zipcode"
                      placeholder="Zip Code"
                      maxLength={5}
                      value={this.state.zipcode}
                      onChange={ this.handleInputChange } onChange={this.onChangeNumberkey} onKeyUp={this.handleKeyUp}   
                      ref ="zipcode"                 
                    />
                   {this.state.zipcode_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["zipcode"]}</span>:''}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleZipcode" sm={2}>
                  Event Link 
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="event_link"
                      placeholder="Event Link"
                      value={this.state.event_link}
                      onChange={ this.handleInputChange }  
                                    
                    />
                    <span className="error">{this.state.errors["url"]}</span>
                
                  </Col>
                </FormGroup>
			        	<FormGroup row>
                  <Label for="exampleSelect" sm={2}>
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
                     {/* <FormGroup row>
                        <Label for="exampleedu" sm={2}>
                        Image  <span style={{color: 'red'}}> * </span>
                        </Label>
                        <Col sm={10}>
                            <Input
                            type="file"
                            name="image"
                            placeholder="Image"                      
                            onChange={ this.handleInputFileChange }     
                            />
                    
                        </Col>
                      </FormGroup> */}
                      {console.log("image565",image)}
                        <FormGroup row>
                          <Label for="Profile Image" sm={2}>
                             Image <span>*</span>
                          </Label>
                          <Col sm={10}>
                            <div className="cst-upload">
                          <img src={image} style={{width: 100, height: 100}} /> 
                            <div className="file-upload">
                          <Label for="upload" className="file-upload__label"><MdFileUpload/>&nbsp;upload Your Image</Label>
                          <Input  type="file"
                              name="profile_image"                  
                              onChange={ this.handleprofile_image } 
                              // onKeyUp={this.handleKeyUp} 
                              ref ="profile_image"  id="upload" className="file-upload__input"   />
                          </div>
                          </div>
                            <span className="error w-100 d-block" >{this.state.errors["profile_image"]}</span>
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
                         <Link to={"/events"} className="btn btn-danger" title="Cancel">&nbsp;Cancel</Link>
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
export default AddEvent;