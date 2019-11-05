import React, { Component } from 'react';
import { render } from "react-dom";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import "./basicgrid.css";
import data from "./data";
import ButtonRenderer from "./buttonrenderer";

class LargeData extends Component {
  constructor(props) {
    super(props);
    this.state = {
        columnDefs: data.colDefs,
        rowData: this.createRowData(),   
        editType: 'fullRow', 
        defaultColDef: {
            editable: true,
            resizable: true
        },
       
        frameworkComponents: {               
            buttonRenderer: ButtonRenderer
        },
        context: { componentParent: this },
        gridData: {
            onCellValueChanged: function(event) {
                console.log('onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue);
            },
            onRowValueChanged: function(event) {
                var data = event.data;
                console.log("Event ", event.data);
                console.log('onRowValueChanged: (' + data.last_name + ', ' + data.email + ', ' + data.gender + ')');
            },
            // components:{
            //     boldRenderer: function(params) {
            //         return '<b>' + params.value.name + '</b>';
            //     }
            // }
        }
    }
  }

  createNewRowData() {
    var newData = {
        id: "88888",
        firstname: "",
        lastname: "",
        email: "",
        gender: "",
        salary:"",
        skillset: ""
    };  
    return newData;
  }
  
  onCellValueChanged = (event) =>  {
    console.log(event);
  }
  onAddRow(){
    var newItem = this.createNewRowData();
    var res = this.state.gridOptions.api.updateRowData({add: [newItem]});
  }

  onRemoveSelected() {

  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  };

  methodFromParent(cell) {
    alert("Parent Component Method from " + cell + "!");
  };

  createRowData = () => {
    var rowData = [];
    for (var i = 0; i < 500000; i++) {
      rowData.push({
        id: "Row " + i,
        firstname: "Carolan"+ i,
        lastname: "Bains" + i,
        email: "cbains0@vk.com" + i,
        gender: "Female",
        salary: "10000" + i,
        skillset: "React"      
      });
    }
    return rowData;
  }
  
  render() {
    
      return (
        <div>
            <div className="grid">
                <button onClick={this.onAddRow}>Add Row</button>
                <button className="top_button" onClick={this.onRemoveSelected}> Remove Selected Row </button>
            </div>           
            <div 
                className="ag-theme-balham"
                style={{ 
                height: '500px', 
                width: '1400px' }} 
            >
                <AgGridReact
                    defaultColDef={this.state.defaultColDef}
                    editType={this.state.editType}                                
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}
                    onCellValueChanged={this.onCellValueChanged}
                    context={this.state.context}
                    frameworkComponents={this.state.frameworkComponents}
                    onGridReady={this.onGridReady}
                    cacheQuickFilter={true}>
                </AgGridReact>
            </div>
        </div>      
    );
  }
}

export default LargeData;