var USER_ID = 0;
var firstName = "";
var lastName = "";

function login()
{
	USER_ID = 0;
	//sessionStorage.setItem("userID", "0");

	var newUrl = "contactmngr.com/loggedInPage";
  // retrieve textbox information
	var loginUsername = document.getElementById("username_textbox").value;
  var loginPassword = document.getElementById("password_textbox").value;

	// Hashing password with username as salt
	var SHA512 = new Hashes.MD5().hex(loginPassword + loginUsername);
	password = SHA512;

  document.getElementById("login_result").innerHTML = "test-test-test";

  // turn json object to string
  var jsonLoginString = '{"login" : "' + loginUsername + '", "password" : "' + password + '"}';

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
		USER_ID = jsonObject.UserID;
		//sessionStorage.getItem("userID");

    // if id is less than 1 that means the combination is not in our server.
		if( USER_ID < 1 )
		{
			document.getElementById("login_result").innerHTML = "Username or Password is incorrect";
			return;
		}

		sessionStorage.setItem("userID", USER_ID);

    // retrieve first name and last name from the updated jsonObject
		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;

		//sessionStorage.setItem("firstName") = firstName;
		//sessionStorage.setItem("lastName") = lastName;

		document.getElementById("username_textbox").value = "";
		document.getElementById("password_textbox").value = "";
		document.getElementById("login_result").innerHTML = "logged in";

		window.location.href = "loggedInPage.html";

		//function () {
		//	displayAllContacts();
		//};
	}
	catch(err)
	{
		document.getElementById("login_result").innerHTML = err.message;
	}
}

function logout()
{
	USER_ID = 0;
	sessionStorage.setItem("userID", 0);
	firstName = "";
	lastName = "";

	window.location.href = "index.html";
}

function addUser()
{
	// Take in new user info
	var username = document.getElementById("new_user_name").value;
	var password = document.getElementById("new_password").value;
	var user_first_name = document.getElementById("new_user_first_name").value;
	var user_last_name = document.getElementById("new_user_last_name").value;

	// Hashing password with username as salt
	var SHA512 = new Hashes.MD5().hex(password + username);
	password = SHA512;

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
	// Testing
	USER_ID = sessionStorage.getItem("userID");

	// Take in contact's info
	var contact_first_name = document.getElementById("add_firstname_textbox").value;
	var contact_last_name = document.getElementById("add_lastname_textbox").value;
	var contact_email = document.getElementById("add_email_textbox").value;
	var contact_phone = document.getElementById("add_phone_textbox").value;
	var contact_address = document.getElementById("add_address_textbox").value;

	// Set result intdicator to blank
	document.getElementById("contact_added_result").innerHTML = "";

	var jsonText = '{"FirstName" : "' + contact_first_name + '","LastName" : "' + contact_last_name + '","User_ID" : "' + USER_ID + '","PhoneNumber" : "' + contact_phone + '","Email" : "' + contact_email + '","Address" : "' + contact_address +'"}';

	// Connect to API
	var url = "/API/AddContact.php";
	var xmlhr = new XMLHttpRequest();
	xmlhr.open("POST", url, true);
	xmlhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	// Send jsonText to API
	try {
		xmlhr.send(jsonText);

		var jsonObject = JSON.parse( xmlhr.responseText );

    // get contact id from the updated jsonObject
		contactID = jsonObject.contactID;

		xmlhr.onreadystatechange =function(){
			if (this.readyState == 4 && this.status == 200)
			{
				// Update HTML
				document.getElementById("contact_added_result").innerHTML = "Contact Added";
			}
		};

		addContactToDisplay(contactID);
	} catch (e) {
		// Update HTML
		document.getElementById("contact_added_result").innerHTML = e.message;
	}
}

// new function to add contact to display
function addContactToDisplay(contactID)
{
	var table1 = document.getElementById("tableID");
	//var table1 = document.getElementById('tableID').getElementsByTagName('tbody')[0];

	var rowID = table1.rows.length;
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

	btn1.addEventListener("click", (function (rowID, contactID)
	{return function() {editContactWindow(rowID, contactID);
	}})(rowID, contactID));

	cell6.appendChild(btn1);

	var cell7 = row.insertCell(6);
	var btn2 = document.createElement("button");
	btn2.setAttribute("type", "button");
	btn2.setAttribute("class", "btn btn-primary");
	var deleteButtonTextNode = document.createTextNode("Delete");
	btn2.appendChild(deleteButtonTextNode);
	// calls the deleteContact function and passes it the contactID as the rowID
	btn2.addEventListener("click", function () {
		deleteContact(rowID, contact_id);
	});
	cell7.appendChild(btn2);
}

function displayAllContacts()
{
	USER_ID = sessionStorage.getItem("userID");
	var url = "/API/ShowContacts.php";

	var jsonText = '{"userID" : "' + USER_ID + '"}';

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

				if (jsonObject == "No records found")
				{
					return;
				}

        var i;
				// gets the div id of the spot on the homepage where displayAllContacts will go.
        var homepageDiv = document.getElementById("contactDisplay");

        // get tableid
        var table1 = document.getElementById("tableID");
				//var table1 = document.getElementById('tableID').getElementsByTagName('tbody')[0];

        for(i = 0; i < jsonObject.length; i++)
        {
          // insert a new row and set the row id with the contact id
          var row = table1.insertRow(-1);
					var contact_id = jsonObject[i].Contact_ID;
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
          btn1.setAttribute("class", "btn btn-success");
					btn1.setAttribute("id", "rowID");
          var editButtonTextNode = document.createTextNode("Edit");
          btn1.appendChild(editButtonTextNode);
          // calls the editContact function and passes it the contactID as the rowID
          //btn1.addEventListener("click", function () {
					//	editContactWindow(rowID, contact_id);
					//});
					btn1.addEventListener("click", (function (rowID, contact_id)
					{return function() {editContactWindow(rowID, contact_id);
					}})(rowID, contact_id));
					btn1.setAttribute("data-toggle","modal");
					btn1.setAttribute("data-target","#editModal");

          //btn1.addEventListener("click", editContactWindow(rowID, contact_id));
					//btn1.addEventListener("click", alert("event listened"));
          cell6.appendChild(btn1);


          var cell7 = row.insertCell(6);
          var btn2 = document.createElement("button");
          btn2.setAttribute("type", "button");
          btn2.setAttribute("class", "btn btn-success");
          var deleteButtonTextNode = document.createTextNode("Delete");
          btn2.appendChild(deleteButtonTextNode);
          // calls the deleteContact function and passes it the contactID as the rowID
          //btn2.addEventListener("click", function () {
					//	deleteContact(rowID, contact_id);
					//});
					btn2.addEventListener("click", (function (rowID, contact_id)
					{return function() {deleteContact(rowID, contact_id);
					}})(rowID, contact_id));
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
		console.log(err.message);
		//document.getElementById("displayAllContactsResults").innerHTML = err.message;
	}
}

function deleteContact(rowID, contactID)
{

	 var url = "/API/DeleteContact.php"
	 // creates the json text with contact id and userid
   var jsonText = '{"Contact_Id" : "' + contactID + '"}';

	 // remove the row in the html for that contact
	 //var table = document.getElementById("tableID");
	 var row = document.getElementById(rowID);
	 row.parentNode.removeChild(row);
	 //table.deleteRow(rowID);

   var xhr = new XMLHttpRequest();
	 xhr.open("POST", url, true);
   xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
   try
	 {
	 	xhr.onreadystatechange = function()
	 	{
	 		if (this.readyState == 4 && this.status == 200)
	 		{

	 		}
	 	};
	 	// send the contact id to the api
	 	xhr.send(jsonText);
	 }
	 catch(err)
	 {
	 	console.log(err.message);
	 	//document.getElementById("deletedContactResult").innerHTML = err.message;
	 }

}


// baidong's version
function editContactWindow(rowID, contactID)
{
  var modal = document.getElementById("editModal");
  var saveBtn = document.getElementById("saveButtonEdit");
  //saveBtn.addEventListener("click", editContact(contactID));
	saveBtn.addEventListener("click", (function (rowID, contactID)
	{return function() {editContact(rowID, contactID);
	}})(rowID, contactID));
	saveBtn.setAttribute("data-dismiss", "modal");

  //var row = document.getElementById("contactID");
	var table = document.getElementById("tableID");

	//var row = contactID;
	
  document.getElementById("edited_first_textbox").value = table.rows[rowID].cells[0].innerText;
  document.getElementById("edited_last_textbox").value = table.rows[rowID].cells[1].innerText;
  document.getElementById("edited_phone_textbox").value = table.rows[rowID].cells[2].innerText;
  document.getElementById("edited_email_textbox").value = table.rows[rowID].cells[3].innerText;
  document.getElementById("edited_address_textbox").value = table.rows[rowID].cells[4].innerText;


	/*
	document.getElementById("edited_first_textbox").value = document.getElementById(rowID).children[0].innerText;
	document.getElementById("edited_first_textbox").value = document.getElementById(rowID).children[1].innerText;
  document.getElementById("edited_first_textbox").value = document.getElementById(rowID).children[2].innerText;
	document.getElementById("edited_first_textbox").value = document.getElementById(rowID).children[3].innerText;
	document.getElementById("edited_first_textbox").value = document.getElementById(rowID).children[4].innerText;
	*/

	//$("#editModal").modal("show");
	// modal.style.visibility = "visible";
	// modal.style.display = "block";
  //modal.modal();
	//modal.style.visibility
}


// patrick's function edited by baidong
 function editContact (rowID, contactID)
 {
 	var editContactUrl = "/API/UpdateContact.php";

 	var edited_first = document.getElementById("edited_first_textbox").value;
 	var edited_last = document.getElementById("edited_last_textbox").value;
 	var edited_phone = document.getElementById("edited_phone_textbox").value;
 	var edited_email = document.getElementById("edited_email_textbox").value;
 	var edited_address = document.getElementById("edited_address_textbox").value;

 	var jsonText = '{"FirstName" : "' + edited_first + '","LastName" : "' + edited_last + '","Contact_ID" : "' + contactID + '","PhoneNumber" : "' + edited_phone + '","Email" : "' + edited_email + '","Address" : "' + edited_address +  '"}';

	//disregard this just testing
	//var jsonText = '{"UserName" : "' + username + '","Password" : "' + password + '","FirstName" : "' + user_first_name + '","LastName" : "' + user_last_name + '"}';

 	// Connect to API
 	var xmlhr = new XMLHttpRequest();
 	xmlhr.open("POST", editContactUrl, true);
 	xmlhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	table = document.getElementById("tableID");
 	// Send jsonText to API
 	try {
 		xmlhr.send(jsonText);
 		xmlhr.onreadystatechange =function(){
 			if (this.readyState == 4 && this.status == 200)
 			{
 				// Update HTML
				table.rows[rowID].cells[0].innerHTML = edited_first;
			  table.rows[rowID].cells[1].innerHTML = edited_last;
			  table.rows[rowID].cells[2].innerHTML = edited_phone;
			  table.rows[rowID].cells[3].innerHTML = edited_email;
			  table.rows[rowID].cells[4].innerHTML = edited_address;
 			}
 		};

 	} catch (e) {
 		// Update HTML
		// using contact added result in meantime
 		document.getElementById("contact_added_result").innerHTML = e.message;
 	}
 }

function searchContact()
{
	var input, filter, found, table, tr, td, i, j;
  input = document.getElementById("search_textbox");
  filter = input.value.toUpperCase();
  table = document.getElementById("tableID");
  tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++)
	{
      td = tr[i].getElementsByTagName("td");
      for (j = 0; j < td.length; j++)
			{
        if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1)
				{
          found = true;
        }
      }
      if (found) {
          tr[i].style.display = "";
          found = false;
      }
			else
			{
          tr[i].style.display = "none";
      }
  }
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
