var USER_ID = "";
var firstName = "";
var lastName = "";

function login()
{
	var USER_ID = "0";
	var newUrl = "contactmngr.com/loggedInPage";
  // retrieve textbox information
	var loginUsername = document.getElementById("username_textbox").value;
  var loginPassword = document.getElementById("password_textbox").value;

  document.getElementById("login_result").innerHTML = "test-test-test";

  // turn json object to string
  var jsonLoginString = '{"login" : "' + loginUsername + '", "password" : "' + loginPassword + '"}';

  // setting up xhr object to connect to server
	var url = "/API/Login.php";
  var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try
	{
		xhr.send(jsonLoginString);

    // turn string back to jsonObject
		var jsonObject = JSON.parse( xhr.responseText );

    // get user id from the updated jsonObject
		USER_ID = jsonObject.ID;

    // if id is less than 1 that means the combination is not in our server.
		if( USER_ID < 1 )
		{
			document.getElementById("login_result").innerHTML = "Username or Password is incorrect";
			return;
		}

    // retrieve first name and last name from the updated jsonObject
		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;

		document.getElementById("username_textbox").value = "";
		document.getElementById("password_textbox").value = "";
		document.getElementById("login_result").innerHTML = "logged in";

		window.location.href = "loggedInPage.html";

		displayAllContacts();
	}
	catch(err)
	{
		document.getElementById("login_result").innerHTML = err.message;
	}
}

function logout()
{
	USER_ID = 0;
	firstName = "";
	lastName = "";

	hideOrShow( "loggedInDiv", false);
	hideOrShow( "accessUIDiv", false);
	hideOrShow( "loginDiv", true);
}

function addUser()
{
	// Take in new user info
	var username = document.getElementById("new_user_name").value;
	var password = document.getElementById("new_password").value;
	var user_first_name = document.getElementById("new_user_first_name").value;
	var user_last_name = document.getElementById("new_user_last_name").value;

	// Set result indicator to blank
	document.getElementById("user_added_result").innerHTML = "";

	var jsonText = '{"UserName" : "' + username + '","Password" : "' + password + '","FirstName" : "' + user_first_name + '","LastName" : "' + user_last_name + '"}';

	// Connect to API
	var url = "/API/CreateUser.php";
	var xmlhr = new XMLHttpRequest();
	xmlhr.open("POST", url, true);
	xmlhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try {
		xmlhr.send(jsonText);
		// update user id
		xmlhr.onreadystatechange =function(){
			if (this.readyState == 4 && this.status == 200)
			{
				// Update HTML
				document.getElementById("user_added_result").innerHTML = "Contact Added";
			}
		};
	} catch (e) {
		document.getElementById("user_added_result").innerHTML = e.message;
	}
}

function addContact()
{
	// Take in contact's info
	var contact_first_name = document.getElementById("add_firstname_textbox").value;
	var contact_last_name = document.getElementById("add_lastname_textbox").value;
	var contact_email = document.getElementById("add_phone_textbox").value;
	var contact_phone = document.getElementById("add_email_textbox").value;
	var contact_address = document.getElementById("add_address_textbox").value;

	// Set result intdicator to blank
	document.getElementById("contact_added_result").innerHTML = "";

	var jsonText = '{"FirstName" : "' + contact_first_name + '","LastName" : "' + contact_last_name + '","User_ID"  : "' + USER_ID + '","PhoneNumber" : "' + contact_phone + '","Email" : "' + contact_email + '","Address" : "' + contact_address +'"}';

	// Connect to API
	var url = "/API/AddContact.php";
	var xmlhr = new XMLHttpRequest();
	xmlhr.open("POST", url, true);
	xmlhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	// Send jsonText to API
	try {
		xmlhr.send(jsonText);
		xmlhr.onreadystatechange =function(){
			if (this.readyState == 4 && this.status == 200)
			{
				// Update HTML
				document.getElementById("contact_added_result").innerHTML = "Contact Added";
			}
		};

		addContactToDisplay();
	} catch (e) {
		// Update HTML
		document.getElementById("contact_added_result").innerHTML = e.message;
	}
}

// new function to add contact to display
function addContactToDisplay()
{
	table1 = document.getElementById("tableID");

	var row = table1.insertRow(-1);
	/*
	var rowID = jsonObject.contacts[i].contactID;
	row.setAttribute("id", rowID);
	*/

	var cell1 = row.insertCell(0);
	var cell1Text = document.createTextNode(document.getElementById("add_firstname_textbox").value);
	cell1.appendChild(cell1Text);

	var cell2 = row.insertCell(1);
	var cell2Text = document.createTextNode(document.getElementById("add_lastname_textbox").value);
	cell2.appendChild(cell2Text)

	var cell3 = row.insertCell(2);
	var cell3Text = document.createTextNode(document.getElementById("add_phone_textbox").value);
	cell3.appendChild(cell3Text)

	var cell4 = row.insertCell(3)
	var cell4Text = document.createTextNode(document.getElementById("add_email_textbox").value);
	cell4.appendChild(cell4Text)

	var cell5 = row.insertCell(4)
	var cell5Text = document.createTextNode(document.getElementById("add_address_textbox").value);
	cell5.appendChild(cell5Text)

	var cell6 = row.insertCell(5);
	var btn1 = document.createElement("button");
	btn1.setAttribute("type", "button");
	btn1.setAttribute("class", "btn btn-primary");
	var editButtonTextNode = document.createTextNode("Edit");
	btn1.appendChild(editButtonTextNode);
	// calls the editContact function and passes it the contactID as the rowID
	//btn1.addEventListener("click", editContact(rowID));
	cell6.appendChild(btn1);

	var cell7 = row.insertCell(6);
	var btn2 = document.createElement("button");
	btn2.setAttribute("type", "button");
	btn2.setAttribute("class", "btn btn-primary");
	var deleteButtonTextNode = document.createTextNode("Delete");
	btn2.appendChild(deleteButtonTextNode);
	// calls the deleteContact function and passes it the contactID as the rowID
	//btn2.addEventListener("click", deleteContact(rowID));
	cell7.appendChild(btn2);
}

function displayAllContacts()
{
	USER_ID = 1;
	var url = "/API/ShowContacts.php";

	var jsonText = '{"userID" : "' + USER_ID + '"}';
	//var jsonText = '{"User_ID"  : "' + USER_ID + '","PhoneNumber" : "' + contact_phone + '","Email" : "' + contact_email + '","Address" : "' + contact_address +'"}';

  var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try
	{
		xhr.send(jsonText);
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				// i should receive back an array of objects with firstname, lastname
				// phone # and email and contact id
        var jsonObject = JSON.parse( xhr.responseText );

        var i;
				// gets the div id of the spot on the homepage where displayAllContacts will go.
        var homepageDiv = document.getElementById("contactDisplay");

        // create table and header elements with class for light design.
        var table1 = document.getElementById("tableID");

				/*
        table1.setAttribute("class","table");
        var header = table1.createTHead();
        header.setAttribute("class","thead-light");

        // create row for header names
        var headRow = table1.insertRow(0);

        // add firstname header
        var headCell1 = document.createElement("th");
        headCell1.setAttribute("scope", "col");
        headCell1Text = document.createTextNode("First Name");
        headCell1.appendChild(headCell1Text);
        headRow.appendChild(headCell1);

        var headCell2 = document.createElement("th");
        headCell2.setAttribute("scope", "col");
        headCell2Text = document.createTextNode("Last Name");
        headCell2.appendChild(headCell2Text);
        headRow.appendChild(headCell2);

        var headCell3 = document.createElement("th");
        headCell3.setAttribute("scope", "col");
        headCell3Text = document.createTextNode("Phone Number");
        headCell3.appendChild(headCell3Text);
        headRow.appendChild(headCell3);

        var headCell4 = document.createElement("th");
        headCell4.setAttribute("scope", "col");
        headCell4Text = document.createTextNode("Email");
        headCell4.appendChild(headCell4Text);
        headRow.appendChild(headCell4);

				var headCell5 = document.createElement("th");
        headCell5.setAttribute("scope", "col");
        headCell5Text = document.createTextNode("Address");
        headCell5.appendChild(headCell5Text);
        headRow.appendChild(headCell5);

				var headCell6 = document.createElement("th");
        headCell6.setAttribute("scope", "col");
        headCell6Text = document.createTextNode("Edit Contact");
        headCell6.appendChild(headCell6Text);
        headRow.appendChild(headCell6);

				var headCell7 = document.createElement("th");
        headCell7.setAttribute("scope", "col");
        headCell7Text = document.createTextNode("Delete Contact");
        headCell7.appendChild(headCell7Text);
        headRow.appendChild(headCell7);

        var body = document.createElement("tbody");
        table1.appendChild(body);
				*/

        for(i = 0; i < jsonObject.length; i++)
        {
          // insert a new row and set the row id with the contact id
          var row = table1.insertRow(-1);
					var contact_id = jsonObject[i].Contact_ID
					var rowID = i + 1;
          row.setAttribute("id", rowID);

          var cell1 = row.insertCell(0);
          var cell1Text = document.createTextNode(jsonObject[i].FirstName);
          cell1.appendChild(cell1Text);

          var cell2 = row.insertCell(1);
          var cell2Text = document.createTextNode(jsonObject[i].LastName);
          cell2.appendChild(cell2Text);

          var cell3 = row.insertCell(2);
          var cell3Text = document.createTextNode(jsonObject[i].PhoneNumber);
          cell3.appendChild(cell3Text);

          var cell4 = row.insertCell(3);
          var cell4Text = document.createTextNode(jsonObject[i].Email);
          cell4.appendChild(cell4Text);

					var cell5 = row.insertCell(4);
          var cell5Text = document.createTextNode(jsonObject[i].Address);
          cell5.appendChild(cell5Text);

          var cell6 = row.insertCell(5);
          var btn1 = document.createElement("button");
          btn1.setAttribute("type", "button");
          btn1.setAttribute("class", "btn btn-primary");
          var editButtonTextNode = document.createTextNode("Edit");
          btn1.appendChild(editButtonTextNode);
          // calls the editContact function and passes it the contactID as the rowID
					btn1.setAttribute("data-toggle","modal");
					btn1.setAttribute("data-target","#editModal");

          btn1.addEventListener("click", editContactWindow(rowID, contact_id));
          cell6.appendChild(btn1);

          var cell7 = row.insertCell(6);
          var btn2 = document.createElement("button");
          btn2.setAttribute("type", "button");
          btn2.setAttribute("class", "btn btn-primary");
          var deleteButtonTextNode = document.createTextNode("Delete");
          btn2.appendChild(deleteButtonTextNode);
          // calls the deleteContact function and passes it the contactID as the rowID
          btn2.addEventListener("click", deleteContact(rowID));
          cell7.appendChild(btn2);

        }

        // add the table to the div from html file
        homepageDiv.appendChild(table1);

			}
		};
		xhr.send(jsonText);
	}
	catch(err)
	{
		document.getElementById("displayAllContactsResults").innerHTML = err.message;
	}
}

function deleteContact(contactID)
{
	// // creates the json text with contact id and userid
  // var jsonText = '{"Contact_Id" : "' + contactID + '"}';
	//
  // var xhr = new XMLHttpRequest();
	// xhr.open("POST", url, true);
  // xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  // try
	// {
	// 	xhr.onreadystatechange = function()
	// 	{
	// 		if (this.readyState == 4 && this.status == 200)
	// 		{
	// 			// remove the row in the html for that contact
	// 			var row = contactID;
	// 			var table = getElementById("tableID");
	// 			row.parentNode.removeChild(row);
	// 		}
	// 	};
	// 	// send the contact id to the api
	// 	xhr.send(jsonText);
	// }
	// catch(err)
	// {
	// 	document.getElementById("deletedContactResult").innerHTML = err.message;
	// }
}


// baidong's version
function editContactWindow(rowID, contactID)
{
  var modal = document.getElementById("editModal");
  var saveBtn = document.getElementById("saveButtonEdit");
  //saveBtn.addEventListener("click", editContact(contactID))

  //var row = document.getElementById("contactID");
	var table = document.getElementById("tableID");

	//var row = contactID;
  document.getElementById("edited_first_textbox").innerHTML = table.rows[rowID].cells[0].value;
  document.getElementById("edited_last_textbox").innerHTML = table.rows[rowID].cells[1].value;
  document.getElementById("edited_phone_textbox").innerHTML = table.rows[rowID].cells[2].value;
  document.getElementById("edited_email_textbox").innerHTML = table.rows[rowID].cells[3].value;
  document.getElementById("edited_address_textbox").innerHTML = table.rows[rowID].cells[4].value;

	//$("#editModal").modal("show");
	// modal.style.visibility = "visible";
	// modal.style.display = "block";

	// document.getElementById("edited_first_textbox").innerHTML = row.cells[0].value;
  // document.getElementById("edited_last_textbox").innerHTML = row.cells[1].value;
  // document.getElementById("edited_phone_textbox").innerHTML = row.cells[2].value;
  // document.getElementById("edited_email_textbox").innerHTML = row.cells[3].value;
  // document.getElementById("edited_address_textbox").innerHTML = row.cells[4].value;

  //modal.modal();
	//modal.style.visibility
}



// Display current contact info in popupwindow
// function editContactWindow()
// {
// 	var getContactUrl = "/API/GetContact.php";
// 	var xmlhr = new XMLHttpRequest();
//
// 	xmlhr.open("POST", getContactUrl, false);
// 	xmlhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
//
// 	// Get current information of contact from api
// 	try {
// 		xmlhr.onreadystatechange = function(){
// 			if (this.readyState == 4 && this.status == 200)
// 			{
// 				// Update HTML
// 				document.getElementById("contact_edited_result").innerHTML = "Contact Edited";
// 			}
// 		};
// 	} catch (e) {
// 		// Update HTML
// 		document.getElementById("contact_edited_result").innerHTML = e.message;
// 	}
//
// 	var jsonObject = JSON.parse( xmlhr.responseText );
//
// 	// get user id from the updated jsonObject
// 	USER_ID = jsonObject.id;
//
// 	document.getElementById("edited_first_textbox").value = jsonObject.firstName;
// 	document.getElementById("edited_last_textbox").value = jsonObject.lastName;
// 	document.getElementById("edited_phone_textbox").value = jsonObject.phone;
// 	document.getElementById("edited_email_textbox").value = jsonObject.email;
// 	document.getElementById("edited_address_textbox").value = jsonObject.address;
//
// }
//
// // Send new contact info to database
// function editContact ()
// {
// 	var editContactUrl = "/API/EditContact.php";
//
// 	var edited_first = document.getElementById("edited_first_textbox").value;
// 	var edited_last = document.getElementById("edited_last_textbox").value;
// 	var edited_phone = document.getElementById("edited_phone_textbox").value;
// 	var edited_email = document.getElementById("edited_email_textbox").value;
// 	var edited_address = document.getElementById("edited_address_textbox").value;
// 	var contact_id = document.getElementById("contact_id").value;
//
// 	var jsonText = '{"FirstName" : "' + edited_first_name + '",
// 			              "LastName" : "' + edited_last_name + '",
// 										"Contact_ID"  : "' + contact_id + '",
// 										"PhoneNumber" : "' + edited_phone + '",
// 										"Email" : "' + edited_email + '",
// 										"Address" : "' + edited_address +  '}';
//
// 	// Connect to API
// 	var xmlhr = new XMLHttpRequest();
// 	xmlhr.open("POST", editContactUrl, true);
// 	xmlhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
//
// 	// Send jsonText to API
// 	try {
// 		xmlhr.send(jsonText);
// 		xmlhr.onreadystatechange =function(){
// 			if (this.readyState == 4 && this.status == 200)
// 			{
// 				// Update HTML
// 				document.getElementById("contact_edited_result").innerHTML = "Contact Edited";
// 			}
// 		};
//
// 	} catch (e) {
// 		// Update HTML
// 		document.getElementById("contact_edited_result").innerHTML = e.message;
// 	}
// }
