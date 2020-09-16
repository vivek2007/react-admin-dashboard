import React from 'react';
import { Row, Col, CardBody, Card, CardHeader,Label} from 'reactstrap';
import Page from 'components/Page';
import { Link } from 'react-router-dom';
import {ReactTitle} from 'react-meta-tags';
import AppConstants from 'AppConstants';
import Switch from "react-switch";
import axios from 'axios';
import { MdSettings} from 'react-icons/md';
var prg1 = [];
class viewResource extends React.Component{
    constructor(){
        super();
        this.state={
            title : "",
            description : "",
            document : "",
            status : "",
            programs:[],
            audio : "",
            video : "",
            thumbnail : "",
            media : "",
            audiolink : '',
            options : []
        }
    }  
    componentDidMount(){
        var element = document.getElementById("navItem-Resources-0");
        element.classList.add("active");
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
            let selectedValue = []
            result.data[0].programs.map((prgs,i)=>{
                this.state.programs.forEach(option => {
                    console.log(prgs.prg_id,option.prg_id,option.name)
                    if(prgs == option.prg_id){
                        var item ={}
                        item["name"] = option.name
                        item["prg_id"] = option.prg_id
                        selectedValue.push(item)
                    }
                 })
            })
            this.setState({title:result.data[0].title,status:result.data[0].status,description:result.data[0].description,programs : result.data[0].programs,media:result.data[0].media_type,thumbnail:result.data[0].thumbnail,audio:result.data[0].audio,document : result.data[0].document,video:result.data[0].video,options: result.data[0].user_type,audiolink:result.data[0].audio_link})
        })     
    }
  
    render(){
        console.log(this.state.audio,this.state.media)
        return(
            <Page title="View Resource">
                <ul className="cst-breadcrumb">
                    <li><Link to={'/dashboard'}>Dashboard</Link></li>
                    <li><Link to={'/resources'}>All Resources</Link></li>
                    <li>View Resource</li>
                </ul>
                <ReactTitle title="View Resource"/>
                <Row>
                    <Col xl={12} lg={12} md={12} className="profile-info">
                        <Card className="p-0 mb-4">
                            <CardHeader> 
                            <Label for="examplePassword" className="m-0"><strong><MdSettings fontSize="24" className="mr-2" />Resource Details</strong>
                            </Label>
                            </CardHeader>
                            <CardBody>
                            <div className="row form-group mb-0">
                            <label htmlFor="exampleEmail" className="col-3 col-form-label">Title</label>
                            <label className="col-auto col-form-label">{this.state.title ? this.state.title : 'N/A'} </label>
                            </div>

                            {/* <div className="row form-group mb-0">
                            <label htmlFor="exampleEmail" className="col-3 col-form-label">Users</label>
                            <label className="col-auto col-form-label">{this.state.options.length>0 ? this.state.options.toString() : 'N/A'} </label>
                            </div> */}
                            
                            <div className="row form-group mb-0">
                            <label htmlFor="exampleEmail" className="col-3 col-form-label">Description</label>
                            <label className="col-8 col-form-label">{this.state.description ?  <div dangerouslySetInnerHTML={{__html: this.state.description}} /> : 'N/A'} </label>
                            </div>

                            <div className="row form-group mb-0">
                            <label htmlFor="exampleEmail" className="col-3 col-form-label">programs</label>
                            <label className="col-8 col-form-label">{this.state.programs ? this.state.programs.map((prg,index)=>{
                                console.log("asdf",prg.name)
                                return(prg.name+", ")
                            }) : 'N/A'} </label>
                            </div>

                            <div className="row form-group mb-0">
                            <label htmlFor="exampleEmail" className="col-3 col-form-label"> Thumbnail</label>
                            <label className="col-auto col-form-label">{this.state.thumbnail ? <img src={this.state.thumbnail} style={{width: 100, height: 100}} /> : 'N/A'} </label>
                            </div>
                            {/* {(this.state.prev_thumbnail && this.state.prev_thumbnail!=="undefined") ? (<div><img src={this.state.prev_thumbnail} style={{width: 100, height: 100}} /><br /><br /></div>) : ""} */}
                            {/* {this.state.media == "audio" ?  */}
                            <span><div className="row form-group mb-0">
                            <label htmlFor="exampleEmail" className="col-3 col-form-label"> Audio</label>
                            <label className="col-auto col-form-label">{this.state.audio && this.state.audio != undefined ? <a href={this.state.audio} target="_blank">{this.state.audio}</a> : 'N/A'} </label></div> <div className="row form-group mb-0">
                            <label htmlFor="exampleEmail" className="col-3 col-form-label">Audio Link</label>
                            <label className="col-auto col-form-label">{this.state.audiolink && this.state.audiolink != undefined ? <a className="mr-1 badge badge-dark" href={this.state.audiolink} target="_blank">Audio Link</a> : 'N/A'} </label>
                            </div></span> 
                            {/* :
                            this.state.media == "video" ?  */}
                            <div className="row form-group mb-0">
                            <label htmlFor="exampleEmail" className="col-3 col-form-label">Video</label>
                            <label className="col-auto col-form-label col-8">{this.state.video && this.state.video != undefined ? <a className="mr-1 badge badge-dark" href={this.state.video} target="_blank">Video Link</a> : 'N/A'} </label></div> 
                            {/* :  */}
                            <div className="row form-group mb-0">
                            <label htmlFor="exampleEmail" className="col-3 col-form-label">Document</label>
                            <label className="col-auto col-form-label">{this.state.document && this.state.document != undefined ? <a className="mr-1 badge badge-dark" href={this.state.document} target="_blank">Document Link</a> : 'N/A'} </label>
                            </div> 
                            {/* } */}
                            
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Page>
        )
    }
}
export  default viewResource;