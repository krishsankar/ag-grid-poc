import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import './App.css';

import BasicGrid from "./basicgrid/basicgrid";
import LargeData from "./largedata/largedata";
import Pagination from "./pagination/pagination";
import BasicCrud from "./basiccrud/basiccrud";
import SelectSearch from "./selection/selection";
import InfiniteScroll from "./infinite/infinite";

class App extends Component {
  render(){
    return (
      <div className="container">      
        <Tabs>
            <TabList>
              <Tab>
                Basic Grid
              </Tab>
              <Tab>Large Data</Tab>
              <Tab>Infinite Scroll </Tab>
              <Tab>Pagination</Tab>
              <Tab>Basic CRUD</Tab>
              <Tab>Select & Search </Tab>
            </TabList>
        
            <TabPanel>
              <h2>Basic Grid, CRUD, Tooltip, Sorting </h2>
              <BasicGrid />            
            </TabPanel>
            <TabPanel>
              <h2>Large Data</h2>
              <LargeData />
            </TabPanel>
            <TabPanel>
              <h2>Large Data</h2>
              <InfiniteScroll />
            </TabPanel>
            <TabPanel>
              <h2>Pagination</h2>
              <Pagination />
            </TabPanel>
            <TabPanel>
              <h2>Basic CRUD</h2>
              <BasicCrud />
            </TabPanel>
            <TabPanel>
              <h2>Select & Search</h2>
              <SelectSearch />
            </TabPanel>
          </Tabs>
    </div>
    );
  }
}


export default App;
