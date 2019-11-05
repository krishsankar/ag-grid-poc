import React, { Component } from 'react';
import { render } from "react-dom";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import "./basicgrid.css";
import data from "./data";
import ButtonRenderer from "./buttonrenderer";
import CustomTooltip from "../components/customTooltip";


class BasicGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
        columnDefs: data.colDefs,
        rowData: data.recordData,   
        editType: 'fullRow', 
        paginationPageSize: 5,
        paginationNumberFormatter: function(params) {
            return "[" + params.value.toLocaleString() + "]";
        },
        defaultColDef: {
            editable: true,
            resizable: true,
            sortable: true ,
            tooltipComponent: "customTooltip"           
        },
       
        frameworkComponents: {               
            buttonRenderer: ButtonRenderer,
            customTooltip: CustomTooltip
        },
        context: { componentParent: this },
        components: {
            boldRenderer: this.boldRenderFunc
        },
        rowSelection: "single",
        newData : {
            id: "88888",
            firstname: "",
            lastname: "",
            email: "",
            gender: "",
            salary:"",
            skillset: ""
        },
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
  };
  
 
  onCellValueChanged = (event) =>  {
    console.log(event);
  };

  onAddRow = () =>{
    let newItem = this.state.newData;
    let res = this.gridApi.updateRowData({add: [newItem]});
  };

  onRemoveSelected() {
    let selectedData = this.gridApi.getSelectedRows();
    let res = this.gridApi.updateRowData({ remove: selectedData });
  };

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();

    const updateData = data => {
      this.setState({ rowData: data });
      // params.api.paginationGoToPage(1);
    };
  };

  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    console.log("selected row ",selectedRows);
  };

  methodFromParent(cell) {
    alert("Parent Component Method from " + cell + "!");
  };

//   boldRenderFunc = (params) => {
//             return '<b>' + params.value.name + '</b>';
//   }
 
  render() {
    
      return (
        <div>
            <div className="grid">
                <button onClick={this.onAddRow} type="button" class="btn btn-primary btn-sm">Add Row</button>
                {/* <button >Add Row</button>
                <button className="top_button" onClick={this.onRemoveSelected}> Remove Selected Row </button> */}
            </div>           
            <div 
                id="myGrid"
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
                    // pagination={true}
                    // paginationPageSize={this.state.paginationPageSize}
                    // paginationNumberFormatter={this.state.paginationNumberFormatter}
                    // suppressRowClickSelection={true}
                    debug={true}
                    rowSelection={this.state.rowSelection}
                    onSelectionChanged={this.onSelectionChanged.bind(this)}>                        
                </AgGridReact>
            </div>
        </div>      
    );
  }
}



  
export default BasicGrid;