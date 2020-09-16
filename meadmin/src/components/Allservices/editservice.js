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
import NumberFormat from 'react-number-format';

class EditProgram extends React.Component{
    constructor(){
        super();
        this.state={
            ServiceType : "",
            status : true,
            loading : "",
            errors : {},
            ServiceType_error : false,
            MarketPrice:"",
            MarketPrice_error:false,
            MRprice:'',
            MRprice_error:false,
            PremiumPrice:'',
            PremiumPrice_error:false,
            PRprice:'',
            PRprice_error:false,
            ID:'',
            ID_error:false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(e){
        let errors = {};
        if(e.target.name == "ServiceType"){
            if(e.target.value != ""){
                this.setState({ServiceType_error:false})
            }else{
                errors["ServiceType"] = "Please enter ServiceType";
                this.setState({ServiceType_error:true,errors:errors})
            }
        }
        if(e.target.name == "MarketPrice"){
            if(e.target.value != ""){
                this.setState({MarketPrice_error:false})
            }else{
                this.setState({MarketPrice_error:true})
            }
        }
        if(e.target.name == "MRprice"){
            if(e.target.value != 0){
                this.setState({MRprice_error:false})
            }else{
                this.setState({MRprice_error:true})
            }
        }
        if(e.target.name == "PremiumPrice"){
            if(e.target.value != ""){
                this.setState({PremiumPrice_error:false})
            }else{
                errors["PremiumPrice"] = "Please enter PremiumPrice";
                this.setState({PremiumPrice_error:true,errors:errors})
            }
        }
        if(e.target.name == "PRprice"){
            if(e.target.value != ""){
                this.setState({PRprice_error:false})
            }else{
                this.setState({PRprice_error:true})
            }
        }
        if(e.target.name == "ID"){
            if(e.target.value != 0){
                this.setState({ID_error:false})
            }else{
                this.setState({ID_error:true})
            }
        }
        this.setState({[e.target.name]:e.target.value})
    }
    handleValidation(){
        let errors = {};
        let formIsValid = true;
        if (!this.state.MRprice){
            formIsValid = false;
            errors["MRprice"] = "Please enter MRprice";
            ReactDOM.findDOMNode(this.refs.MRprice).focus();
        }
        if (!this.state.MarketPrice){
            formIsValid = false;
            errors["MarketPrice"] = "Please enter MarketPrice";
            ReactDOM.findDOMNode(this.refs.MarketPrice).focus();
        }
        if (!this.state.ServiceType){
            formIsValid = false;
            errors["ServiceType"] = "Please enter ServiceType";
            ReactDOM.findDOMNode(this.refs.ServiceType).focus();
        }
        if (!this.state.ID){
            formIsValid = false;
            errors["ID"] = "Please enter ID";
            ReactDOM.findDOMNode(this.refs.ID).focus();
        }
        if (!this.state.PremiumPrice){
            formIsValid = false;
            errors["PremiumPrice"] = "Please enter PremiumPrice";
            ReactDOM.findDOMNode(this.refs.PremiumPrice).focus();
        }
        if (!this.state.PRprice){
            formIsValid = false;
            errors["PRprice"] = "Please enter PRprice";
            ReactDOM.findDOMNode(this.refs.PRprice).focus();
        }
        this.setState({
            errors: errors,
            ServiceType_error : true,
            MarketPrice_error: true,
            MRprice_error : true,
            PremiumPrice_error : true,
            PRprice_error : true,
            ID_error : true
        });
        return formIsValid;
    }
    handleStatusChange(checked){
        this.setState({status : checked})
    }
    handleSubmit(e){
        e.preventDefault();
        let formval={}
        if(this.handleValidation()){
            this.setState({loading:1});
            console.log( " this.state.status",this.state.status);
            formval = {
                'ServiceType': this.state.ServiceType,
                'status': this.state.status,
                'MarketPrice':this.state.MarketPrice,
                'MRprice': this.state.MRprice,
                'PremiumPrice': this.state.PremiumPrice,
                'PRprice': this.state.PRprice,
                'ID': this.state.ID
            }
            axios.post(AppConstants.API+'/services/updateService/' + this.props.match.params.id,formval)
                .then(res => { 
                    if(res.data.Status == "Success"){
                        setTimeout((e) => {
                            this.props.history.push('/services');
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
        var element = document.getElementById("navItem-Programs-2");
        element.classList.add("active");
        fetch(AppConstants.API+'/services/getService/' + this.props.match.params.id).then(res=>{
            if(res.status == 200){
                return res.json();
            }
        }).then(result=>{
            this.setState({ServiceType:result.data.ServiceType,
                status:result.data.status,
                MarketPrice:result.data.MarketPrice,
                MRprice:result.data.MRprice,
                PremiumPrice:result.data.PremiumPrice,
                PRprice:result.data.PRprice,
                ID:result.data.ID
            })
        })     
    }
    render(){
        return(
            <Page title="Edit Programs">
                <ul className="cst-breadcrumb">
                    <li><Link to={'/dashboard'}>Dashboard</Link></li>
                    <li><Link to={'/programs'}>Programs</Link></li>
                    <li>Edit Programs</li>
                </ul>
                <ReactTitle title="Edit Programs"/>
                <Row>
                    <Col xl={12} lg={12} md={12}>
                        <Card>
                            <CardBody>
                                <Form name="addchild" onSubmit= { this.handleSubmit }>
                                    <FormGroup row>
                                        <Label for="ServiceType" sm={2}>
                                        ServiceType<span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="ServiceType"
                                            placeholder="Title"                      
                                            value={this.state.ServiceType}
                                            onChange={ this.handleInputChange }   
                                            ref ="ServiceType"           
                                            />
                                           {this.state.ServiceType_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["ServiceType"]}</span>:""}
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="title" sm={2}>
                                        MarketPrice<span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="MarketPrice"
                                            placeholder="MarketPrice"                      
                                            value={this.state.MarketPrice}
                                            onChange={ this.handleInputChange }   
                                            ref ="MarketPrice"           
                                            />
                                            {this.state.MarketPrice_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["MarketPrice"]}</span>:""}
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="title" sm={2}>
                                        MRprice<span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="MRprice"
                                            placeholder="Duration"                      
                                            value={this.state.MRprice}
                                            onChange={ this.handleInputChange }   
                                            ref ="MRprice" className="form-control"  decimalScale={0} allowNegative={false}       
                                            />
                                            {this.state.MRprice_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["MRprice"]}</span>:""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="title" sm={2}>
                                        PremiumPrice<span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="PremiumPrice"
                                            placeholder="PremiumPrice"                      
                                            value={this.state.PremiumPrice}
                                            onChange={ this.handleInputChange }   
                                            ref ="PremiumPrice" className="form-control"  decimalScale={0} allowNegative={false}       
                                            />
                                            {this.state.PremiumPrice_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["PremiumPrice"]}</span>:""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="title" sm={2}>
                                        PRprice<span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="PRprice"
                                            placeholder="PRprice"                      
                                            value={this.state.PRprice}
                                            onChange={ this.handleInputChange }   
                                            ref ="PRprice" className="form-control"  decimalScale={0} allowNegative={false}       
                                            />
                                            {this.state.PRprice_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["PRprice"]}</span>:""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="title" sm={2}>
                                        ID<span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="ID"
                                            placeholder="ID"                      
                                            value={this.state.ID}
                                            onChange={ this.handleInputChange }   
                                            ref ="ID" className="form-control"  decimalScale={0} allowNegative={false}       
                                            />
                                            {this.state.ID_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["ID"]}</span>:""}
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
                                            <Button className="btn btn-primary" onClick={ this.handleSubmit }>Update    <div style={this.state.loading ? {} : { display: 'none' }} className="image-fill w-25 loader-div">               <div class="clearfix">
  <div class="spinner-border spinner-border-sm" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div></div></Button>&nbsp;
                                            <Link to={"/services"} className="btn btn-danger" title="Cancel">&nbsp;Cancel</Link>
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
EditProgram.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});
export  default connect(mapStateToProps, {})(EditProgram);