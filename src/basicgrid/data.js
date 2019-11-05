const BasicGridData = {
    colDefs: [{
        headerName: "#", field: "id"
      }, {
        headerName: "First Name", field: "firstname",  tooltipField: "firstname"
      }, {
        headerName: "Last Name", field: "lastname"
      },{
        headerName: "Email", field: "email"
      },{
        headerName: "Gender", field: "gender"
      },{
        headerName: "Salary", field: "salary"
      },{
        headerName: "Skill Set", field: "skillset"
      },{
        headerName: "", field: "value", cellRenderer: "buttonRenderer", colId: "deleteButton", editable: false
      }],
      recordData: [{
        id: "1", firstname: "Carolan", lastname: "Bains", email: "cbains0@vk.com", gender: "Female", salary: 88888, skillset: "Angular"
      }, {
        id: "1", firstname: "Carolan", lastname: "Bains", email: "cbains0@vk.com", gender: "Female", salary: 88888, skillset: "Angular"
      }, {
        id: "1", firstname: "Carolan", lastname: "Bains", email: "cbains0@vk.com", gender: "Female", salary: 88888, skillset: "Angular"
      }, {
        id: "1", firstname: "Carolan", lastname: "Bains", email: "cbains0@vk.com", gender: "Female", salary: 88888, skillset: "Angular"
      }, {
        id: "1", firstname: "Carolan", lastname: "Bains", email: "cbains0@vk.com", gender: "Female", salary: 88888, skillset: "Angular"
      }, {
        id: "1", firstname: "Carolan", lastname: "Bains", email: "cbains0@vk.com", gender: "Female", salary: 88888, skillset: "Angular"
      }, {
        id: "1", firstname: "Carolan", lastname: "Bains", email: "cbains0@vk.com", gender: "Female", salary: 88888, skillset: "Angular"
      }, {
        id: "1", firstname: "Carolan", lastname: "Bains", email: "cbains0@vk.com", gender: "Female", salary: 88888, skillset: "Angular"
      }, {
        id: "1", firstname: "Carolan", lastname: "Bains", email: "cbains0@vk.com", gender: "Female", salary: 88888, skillset: "Angular"
      }, {
        id: "1", firstname: "Carolan", lastname: "Bains", email: "cbains0@vk.com", gender: "Female", salary: 88888, skillset: "Angular"
      },{
        id: "1", firstname: "Carolan", lastname: "Bains", email: "cbains0@vk.com", gender: "Female", salary: 88888, skillset: "Angular"
      }]
}

export default BasicGridData;