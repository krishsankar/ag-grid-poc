import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";

class InfiniteScroll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "id" },
        {
          field: "athlete",
          width: 150
        },
        { field: "age" },
        { field: "country" },
        { field: "year" },
        { field: "sport" },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" }
      ],
      defaultColDef: {
        width: 120,
        resizable: true
      },
      rowModelType: "serverSide",
      cacheBlockSize: 100,
      maxBlocksInCache: 10
    };
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();
    const updateData = data => {
      var idSequence = 0;
      data.forEach(function(item) {
        item.id = idSequence++;
      });
      var server = new FakeServer(data);
      var datasource = new ServerSideDatasource(server);
      params.api.setServerSideDatasource(datasource);
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

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div style={{ height: "100%", paddingTop: "26px", boxSizing: "border-box" }}>
          <div
            id="myGrid"
            style={{ 
                height: '500px', 
                width: '1400px' }}
            // className="ag-theme-balham-dark"
            className="ag-theme-bootstrap"
          >
            <AgGridReact
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              rowModelType={this.state.rowModelType}
              cacheBlockSize={this.state.cacheBlockSize}
              maxBlocksInCache={this.state.maxBlocksInCache}
              animateRows={true}
              debug={true}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

function ServerSideDatasource(server) {
  return {
    getRows(params) {
      setTimeout(function() {
        var response = server.getResponse(params.request);
        if (response.success) {
          params.successCallback(response.rows, response.lastRow);
        } else {
          params.failCallback();
        }
      }, 500);
    }
  };
}
function FakeServer(allData) {
  return {
    getResponse(request) {
      console.log("asking for rows: " + request.startRow + " to " + request.endRow);
      console.log(allData);
      var rowsThisPage = allData.slice(request.startRow, request.endRow);
      var lastRow = allData.length <= request.endRow ? allData.length : -1;
      return {
        success: true,
        rows: rowsThisPage,
        lastRow: lastRow
      };
    }
  };
}

export default InfiniteScroll;