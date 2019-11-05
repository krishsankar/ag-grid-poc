import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "./basiccrud.css";


class BasicCrud extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          headerName: "Athlete",
          field: "athlete",
          width: 150,
          
        },
        {
          headerName: "Age",
          field: "age",
          width: 90
        },
        {
          headerName: "Country",
          field: "country",
          width: 120
        },
        {
          headerName: "Year",
          field: "year",
          width: 90
        },
        {
          headerName: "Date",
          field: "date",
          width: 110
        },
        {
          headerName: "Sport",
          field: "sport",
          width: 110
        },
        {
          headerName: "Gold",
          field: "gold",
          width: 100
        },
        {
          headerName: "Silver",
          field: "silver",
          width: 100
        },
        {
          headerName: "Bronze",
          field: "bronze",
          width: 100
        },
        {
          headerName: "Total",
          field: "total",
          width: 100
        }
      ],
      rowSelection: "multiple",
      rowData: []
    };
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();
    const updateData = data => {
      this.setState({ rowData: data });
    };

    httpRequest.open(
      "GET",
      "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json"
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
        console.log(JSON.parse(httpRequest.responseText));
      }
    };
  };

  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    var selectedRowsString = "";
    selectedRows.forEach(function(selectedRow, index) {
      if (index > 5) {
        return;
      }
      if (index !== 0) {
        selectedRowsString += ", ";
      }
      selectedRowsString += selectedRow.athlete;
    });
    if (selectedRows.length >= 5) {
      selectedRowsString += " - and " + (selectedRows.length - 5) + " others";
    }
    document.querySelector("#selectedRows").innerHTML = selectedRowsString;
  }

  createRowData = () => {
    var rowData = [];
    for (var i = 0; i < 1000; i++) {
      rowData.push({
        age: 23,
        athlete: "Michael Phelps",
        bronze: 0,
        country: "United States",
        date: "24/08/2008",
        gold: 8,
        silver: 0,
        sport: "Swimming",
        total: 8,
        year: 2008   
      });
    }
    return rowData;
  }

  render() {
    console.log("Data ", this.state.rowData);
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="test-container">
          <div className="test-header">
            Selection:
            <span id="selectedRows" />
          </div>
          <div
            id="myGrid"
            className="ag-theme-balham"
            style={{
            height: '500px', 
            width: '1400px' }}
          >
            <AgGridReact             
              columnDefs={this.state.columnDefs}
              rowSelection={this.state.rowSelection}
              onGridReady={this.onGridReady}
              onSelectionChanged={this.onSelectionChanged.bind(this)}
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BasicCrud;