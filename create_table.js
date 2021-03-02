// Hard coded data
var myData = [
    {"dealId" : 0, "client_name" : "Microsoft", "project_name" : "Apollo Project", "project_manager" : "Mary", "project_cost" : 1000},
    {"dealId" : 1, "client_name" : "Intel", "project_name" : "Hermes Project", "project_manager" : "Bob", "project_cost" : 10000},
    {"dealId" : 2, "client_name" : "Apple", "project_name" : "Zeus Project", "project_manager" : "Jane", "project_cost" : 100000}
]
var currentDealId = myData.length;
var myData = localStorage.getItem("myData")
if(myData){
    myData=JSON.parse(myData);
}

// onload="CreateTableFromJSON()" function
function CreateTableFromJSON() {    
    // EXTRACT VALUE FOR HTML HEADER. 
    // ('Deal ID', 'Deal Name', 'Category' and 'Price')
    var col = [];
    for (var i = 0; i < myData.length; i++) {
        for (var key in myData[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < myData.length; i++) {

        // HTMLTableElement.insertRow()
        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            //.insertCell() method inserts a new cell (<td>) 
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = myData[i][col[j]];
        }
        // Insert Extra Cell for the Delete Icon
        //TODO: Complete this
        //var tabCell = tr.insertCell(-1);
        // tabCell.innerHTML = '<button onclick="DeleteRow(' + myData[i].dealId + ')"> <img src="trashcan.png"> </button>'

    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

//On click refrenced AddNewDeal function
function AddNewDeal() {
    //Set the variables values 
    var clientName = document.getElementById("clientNameInput").value;
    var projectName = document.getElementById("projectNameInput").value;
    var projectManager = document.getElementById("projectManagerInput").value;
    var projectCost = document.getElementById("projectCostInput").value;

    //Set the dom elements to an empty value
    document.getElementById("clientNameInput").value = "";
    document.getElementById("projectNameInput").value = "";
    document.getElementById("projectManagerInput").value = "";
    document.getElementById("projectCostInput").value = "";
    //Add row
    InsertRow(currentDealId, clientName, projectName, projectManager, projectCost);
}
function UpdateDeal() {
    //Set the variables values 
    var clientName = document.getElementById("updtClientNameInput").value;
    var projectName = document.getElementById("updtProjectNameInput").value;
    var projectManager = document.getElementById("updtProjectManagerInput").value;
    var projectCost = document.getElementById("updtProjectCostInput").value;
    //Set the dom elements to an empty value
    document.getElementById("updtClientNameInput").value = "";
    document.getElementById("updtProjectNameInput").value = "";
    document.getElementById("updtProjectManagerInput").value = "";
    document.getElementById("updtProjectCostInput").value = "";

    for( var i = 0; i < myData.length; i++){ 
    
        if ( myData[i].project_name === projectName ) { 
            //Add row
            InsertRow(myData[i].dealId, clientName, projectName, projectManager, projectCost);
            errorMessage.remove();
        } else{
            var errorMessage = document.createElement("P");     
            errorMessage.innerHTML ="Project Name Not Found";
            document.body.appendChild(errorMessage);
            return;
        }       
    }
    CreateTableFromJSON();    
}

function InsertRow(dealId, clientName, projectName, projectManager, projectCost) {
    myData.push({"dealId": dealId, "client_name" : clientName, "project_name" : projectName, "project_manager" : projectManager, "project_cost" : projectCost})
    currentDealId++;
    //Set items
    // localstorage allows us to persist key value pairs in a way that would survive page refreshes, navigation, and user closing/reopening browser.  
    localStorage.setItem("myData", JSON.stringify(myData));
    CreateTableFromJSON();
}

function DeleteRow(dealId) {
     
    for( var i = 0; i < myData.length; i++){ 
    
        if ( myData[i].dealId === dealId) { 
    
            myData.splice(i, 1); 
        }
    }
    CreateTableFromJSON();
}

