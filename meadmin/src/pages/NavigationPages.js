import React from 'react';

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
} from 'reactstrap';

import {
  MdCreate,
  MdDelete,
  MdRemoveRedEye,
  MdLaunch,
  MdAdd,
} from 'react-icons/md';

import {
  supportTicketsData,
  productsData,
  userProgressTableData,
  avatarsData,
  todosData,
  chartjs,
} from 'demos/dashboardPage';

import Page from 'components/Page';

// Import React Table
import _ from "lodash";
import { makeData } from "../utils/datatables";

import ReactTable from "react-table";
import "react-table/react-table.css";



const rawData = makeData();

//console.log("Raw data ", rawData);

const requestData = (pageSize, page, sorted, filtered) => {
  return new Promise((resolve, reject) => {
    // You can retrieve your data however you want, in this case, we will just use some local data.
    let filteredData = rawData;
    // You can use the filters in your request, but you are responsible for applying them.
    if (filtered.length) {
      filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
        return filteredSoFar.filter(row => {
          return (row[nextFilter.id] + "").includes(nextFilter.value);
        });
      }, filteredData);
    }
    // You can also use the sorting in your request, but again, you are responsible for applying it.
    const sortedData = _.orderBy(
      filteredData,
      sorted.map(sort => {
        return row => {
          if (row[sort.id] === null || row[sort.id] === undefined) {
            return -Infinity;
          }
          return typeof row[sort.id] === "string"
            ? row[sort.id].toLowerCase()
            : row[sort.id];
        };
      }),
      sorted.map(d => (d.desc ? "desc" : "asc"))
    );

    // You must return an object containing the rows of the current page, and optionally the total pages number.
    const res = {
      rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
      pages: Math.ceil(filteredData.length / pageSize)
    };

    // Here we'll simulate a server response with 500ms of delay.
    setTimeout(() => resolve(res), 500);
  });
};

class NavigationPages extends React.Component {
  constructor() {
    super();
    this.state = { selected: {}, selectAll: 0, data: makeData() };
    this.fetchData = this.fetchData.bind(this);
    this.toggleRow = this.toggleRow.bind(this);
  }
  fetchData(state, instance) {
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: true });
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    requestData(
      state.pageSize,
      state.page,
      state.sorted,
      state.filtered
    ).then(res => {
      // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
      this.setState({
        data: res.rows,
        pages: res.pages,
        loading: false
      });
    });
  }


  toggleRow(firstName) {
		const newSelected = Object.assign({}, this.state.selected);
		newSelected[firstName] = !this.state.selected[firstName];
		this.setState({
			selected: newSelected,
			selectAll: 2
		});
	}

	toggleSelectAll() {
		let newSelected = {};

		if (this.state.selectAll === 0) {
			this.state.data.forEach(x => {
				newSelected[x.firstName] = true;
			});
		}

		this.setState({
			selected: newSelected,
			selectAll: this.state.selectAll === 0 ? 1 : 0
		});
	}

  render() {
    const { data, pages, loading  } = this.state;
    return (
      <Page
        className="NavigationPages"
        title="Navigation"
        breadcrumbs={[{ name: 'Navigation', active: true }]}>
        
        <row>
        <Card>
            <CardBody>
        <div>
        <a href="#" class="btn btn-success mb-3 float-right"><MdLaunch />&nbsp;Export to CSV</a>
        <a href="#" class="btn btn-info mb-3 mx-2 float-right"><MdAdd />&nbsp;New</a>
        <a href="#" class="btn btn-warning mb-3 float-right"><MdLaunch />&nbsp;Export to CSV</a>
        <div class="clearfix"></div>
        <ReactTable
          data={data}
          columns={[
            {
            columns: [{
              Header: 'First Name',
              accessor: 'firstName'
            }, {
              Header: 'Last Name',
              id: 'lastName',
              accessor: d => d.lastName
            },{
              Header: 'Age',
              accessor: 'age'
            }]
          }, {
           
            columns: [{
              Header: 'Status',
              accessor: 'status',
              Cell: row => (
                <div class="ca-controls">
                  <a href="/edit" class="text-muted"><MdCreate /></a>
                  <a href="#" class="text-muted"><MdRemoveRedEye /></a>  
                  <a href="#" class="text-muted"><MdDelete /></a>                
                </div>
              )
            }]
          }
        ]}
        manual // Forces table not to paginate or sort automatically, so we can handle it server-side
        data={data}
        pages={pages} // Display the total number of pages
        loading={loading} // Display the loading overlay when we need it
        onFetchData={this.fetchData} // Request new data when things change
        filterable
        defaultPageSize={10}
        className="-striped -highlight"
        />
      
      </div>
            </CardBody>
          </Card>
        </row>
      </Page>
    );
  }
}
export default NavigationPages;
