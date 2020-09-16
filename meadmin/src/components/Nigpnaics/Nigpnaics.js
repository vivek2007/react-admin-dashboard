import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import axios from 'axios';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback
} from 'reactstrap';

import {
  MdCreate,
  MdDelete,
  MdRemoveRedEye,
  MdLaunch,
  MdAdd,
} from 'react-icons/md';
import Page from 'components/Page';
// Import React Table
import _ from "lodash";
import "react-table/react-table.css";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

class NavigationPages extends React.Component {
  constructor(props) {
    super();
		this.state = {			
        selected: [],
        link:'',
        nigpcodes: [],
        columns: [
          {
            dataField: 'NIGP_CODE',
            text: 'Nigp Code',
            sort: true,
            filter: textFilter(),

          },
          {
            dataField: 'NIGP_Description',
            text: 'NIGP Description',
            sort: true,
            filter: textFilter()
          }				
        ]
      };		
    }

  componentDidMount()
  {
    fetch('http://localhost:3400/api/users/getallnaiccodes').then(response => response.json())
      .then(data => {
      console.log(data);
      if(data.Status == "Success")
      {
        this.setState({ nigpcodes: data.naiccodes });
      }
      else
      {
        this.setState({ nigpcodes: "" });
      }    
    });  
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
	}   
       
  render()
  {
    if(localStorage.jwtToken != undefined)
    {			
			const { link  } = this.state;			
			return (
			   <Page title="Nigp and Naic Codes" breadcrumbs={[{ name: 'Nigp and Naic Codes', active: true }]}>
				  <row>
            <Card>
              <CardBody>
                <div>
                  <Link to={"/import_nigpnaic"} class="btn btn-success mb-3 float-right" title="Import Nigp and Naic"><MdLaunch />&nbsp;Import</Link>				   
                  <div class="clearfix"></div>					
                    <BootstrapTable 
                      striped
                      hover
                      keyField='email' 
                      data={ this.state.nigpcodes } 
                      columns={ this.state.columns }						
                      filter={ filterFactory() } 
                      pagination={ paginationFactory() }		   
                    />
                </div>
              </CardBody>
            </Card>
		      </row>
		    </Page>
			);
	    }
	    else 
      {
          window.location.href = '/'
      }
    }  
}
export default NavigationPages;
