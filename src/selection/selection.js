import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";

class SelectSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          headerName: "Athlete",
          field: "athlete",
          headerCheckboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          checkboxSelection: true
        },
        {
          headerName: "Age",
          field: "age"
        },
        {
          headerName: "Country",
          field: "country"
        },
        {
          headerName: "Year",
          field: "year"
        },
        {
          headerName: "Date",
          field: "date"
        },
        {
          headerName: "Sport",
          field: "sport"
        },
        {
          headerName: "Gold",
          field: "gold"
        },
        {
          headerName: "Silver",
          field: "silver"
        },
        {
          headerName: "Bronze",
          field: "bronze"
        },
        {
          headerName: "Total",
          field: "total"
        }
      ],
      defaultColDef: {
        resizable: true,
        width: 100
      },
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
      }
    };
  };

  onQuickFilterChanged() {
    this.gridApi.setQuickFilter(document.getElementById("quickFilter").value);
  }
  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div style={{ marginBottom: "5px" }}>
          <input
            type="text"
            onInput={this.onQuickFilterChanged.bind(this)}
            id="quickFilter"
            placeholder="quick filter..."
          />
        </div>
        <div style={{ height: "calc(100% - 25px)" }}>
          <div
            id="myGrid"
            style={{ 
                height: '500px', 
                width: '1400px' }} 
            className="ag-theme-balham"
          >
            <AgGridReact
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              suppressRowClickSelection={true}
              rowSelection={this.state.rowSelection}
              onGridReady={this.onGridReady}
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SelectSearch;