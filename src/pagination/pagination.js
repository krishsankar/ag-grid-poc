import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class GridPagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          headerName: "Athlete",
          field: "athlete",
          width: 150,
        //   checkboxSelection: function(params) {
        //     return params.columnApi.getRowGroupColumns().length === 0;
        //   },
        //   headerCheckboxSelection: function(params) {
        //     return params.columnApi.getRowGroupColumns().length === 0;
        //   }
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
    //   autoGroupColumnDef: {
    //     headerName: "Group",
    //     width: 200,
    //     field: "athlete",
    //     valueGetter: function(params) {
    //       if (params.node.group) {
    //         return params.node.key;
    //       } else {
    //         return params.data[params.colDef.field];
    //       }
    //     },
    //     headerCheckboxSelection: true,
    //     cellRenderer: "agGroupCellRenderer",
    //     cellRendererParams: { checkbox: true }
    //   },
      defaultColDef: {
        editable: true,
        // enableRowGroup: true,
        // enablePivot: true,
        // enableValue: true,
        sortable: true,
        resizable: true,
        filter: true
      },
      rowSelection: "multiple",
    //   rowGroupPanelShow: "always",
    //   pivotPanelShow: "always",
      paginationPageSize: 10,
      paginationNumberFormatter: function(params) {
        return "[" + params.value.toLocaleString() + "]";
      },
      rowData: []
    };
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();
    const updateData = data => {
      this.setState({ rowData: data });
      params.api.paginationGoToPage(1);
    };

    httpRequest.open(
      "GET",
      "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json"
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
  };

  onPageSizeChanged(newPageSize) {
    var value = document.getElementById("page-size").value;
    this.gridApi.paginationSetPageSize(Number(value));
  }
  render() {
    console.log(" Row Data " ,this.state.rowData);
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="test-container">
          <div className="test-header">
            Page Size:
            <select onChange={this.onPageSizeChanged.bind(this)} id="page-size">
              <option value="10" selected="">
                10
              </option>
              <option value="100">100</option>
              <option value="500">500</option>
              <option value="1000">1000</option>
            </select>
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
            //   autoGroupColumnDef={this.state.autoGroupColumnDef}
              defaultColDef={this.state.defaultColDef}
              suppressRowClickSelection={true}
            //   groupSelectsChildren={true}
              debug={true}
              rowSelection={this.state.rowSelection}
            //   rowGroupPanelShow={this.state.rowGroupPanelShow}
            //   pivotPanelShow={this.state.pivotPanelShow}
            //   enableRangeSelection={true}
              pagination={true}
              paginationPageSize={this.state.paginationPageSize}
              paginationNumberFormatter={this.state.paginationNumberFormatter}
              onGridReady={this.onGridReady}
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default GridPagination;
