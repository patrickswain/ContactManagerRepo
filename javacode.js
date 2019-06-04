var USER_ID = "0";
var firstName = "";
var lastName = "";

function login()
{
  // retrieve textbox information
	var loginUsername = document.getElementById("username_textbox").value;
  var loginPassword = document.getElementByID("password_textbox").value;

  document.getElementByID("login_result").value = "test-test-test";

  // turn json object to string
  var jsonLoginString = '{"login" : "' + loginUsername + '", "password" : "' + loginPassword + '"}';

  // setting up xhr object to connect to server
	var url = "contactmngr.com/API/Login.php";
  var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try
	{
		xhr.send(jsonLoginString);

    // turn string back to jsonObject
		var jsonObject = JSON.parse( xhr.responseText );

    // get user id from the updated jsonObject
		USER_ID = jsonObject.id;

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
		//hideOrShow( "contactsPage", true);
		//hideOrShow( "accessUIDiv", true);
		//hideOrShow( "loginPage", false);
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
		// Don't need date created or User Id - those are done in application

	//USER_ID = Set user id from given id from api

	// Set result indicator to blank
	document.getElementById("user_added_result").innerHTML = "";

	var jsonText = '{"Username" : "' + username + '",
									 "Password" : "' + password + '",
								   "FirstName" : "' + user_first_name + '",
								   "LastName" : "' + user_last_name + '"}';

	// Connect to API
	var url = "contactmngr.com/API/CreateUser.php";
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
	var contact_first_name = document.getElementById("new_contact_first_name").value;
	var contact_last_name = document.getElementById("new_contact_last_name").value;
	var contact_email = document.getElementById("new_contact_email").value;
	var contact_phone = document.getElementById("new_contact_phone").value;


	// Set result intdicator to blank
	document.getElementById("contact_added_result").innerHTML = "";

	var jsonText = '{"FirstName" : "' + contact_first_name + '",
			              "LastName" : "' + contact_last_name + '",
										"User_ID"  : "' + USER_ID + '",
										"PhoneNumber" : "' + contact_phone + '",
										"Email" : "' + contact_email + '",
										"Address" : "' + contact_address +  '}';

	// Connect to API
	var url = "contactmngr.com/API/AddContact.php";
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

	} catch (e) {
		// Update HTML
		document.getElementById("contact_added_result").innerHTML = e.message;
	}


}

function displayAllContacts()
{
	var jsonText = '{"userId" : "' + USER_ID + '"}';

  var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				// i should receive back an array of objects with firstname, lastname
				// phone # and email (and maybe a contactID)
        var jsonObject = JSON.parse( xhr.responseText );

        var i;
				// gets the div id of the spot on the homepage where displayAllContacts will go.
        var homepageDiv = document.getElementByID("div#");
        for(i = 0; i < jsonObject.contacts.length; i++)
        {
					// create a new div element for each contact
          var divElement = document.createElement("div");
					// set the divs id# with the contactid so we can keep track which div is which contacts
          divElement.setAttribute("id", jsonObject.contacts[i].contactID);

          var firstName = document.createElement("p");
          var firstNameTextNode = document.createTextNode(jsonObject.contacts[i].firstName);
          firstName.appendChild(firstNameTextNode);
					divElement.appendChild(firstName);

          var lastName = document.createElement("p");
          var lastNameTextNode = document.createTextNode(jsonObject.contacts[i].lastName);
          lastName.appendChild(lastNameTextNode);
					divElement.appendChild(lastName);

          var email = document.createElement("p");
          var emailTextNode = document.createTextNode(jsonObject.contacts[i].email);
          email.appendChild(emailTextNode);
					divElement.appendChild(email);

          var phoneNumber = document.createElement("p");
          var phoneNumberTextNode = document.createTextNode(jsonObject.contacts[i].phoneNumber);
          phoneNumber.appendChild(phoneNumberTextNode);
					divElement.appendChild(phoneNumber);

					// create the buttons
          var btn1 = document.createElement("button");
          var editButtonTextNode = document.createTextNode("edit contact");
          btn1.appendChild(editButtonTextNode);
          btn1.addEventListener("click", editContact(jsonObject.contacts[i].contactID));
					divElement.appendChild(btn1);

          var btn2 = document.createElement("button");
          var deleteButtonTextNode = document.createTextNode("delete contact");
          btn2.appendChild(deleteButtonTextNode);
          btn2.addEventListener("click", deleteContact(jsonObject.contacts[i].contactID));
					divElement.appendChild(btn2);

					// add this entire created contact div to the div on the homepage.
          homepageDiv.appendChild(divElement);
        }

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
	// creates the json text with contact id and userid
  var jsonText = '{"contact" : "' + contactID + '", "userId" : ' + USER_ID + '}';

  var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				// remove all the html with the contact
				var divRemove = document.getElementById("contactID");
				divRemove.parentNode.removeChild(divRemove);
			}
		};
		// send the user id and contact id to the api
		xhr.send(jsonText);
	}
	catch(err)
	{
		document.getElementById("deletedContactResult").innerHTML = err.message;
	}
}

// Display current contact info in popupwindow
function editContactWindow()
{
	var getContactUrl = "contactmngr.com/API/GetContact.php";
	var xmlhr = new XMLHttpRequest();

	xmlhr.open("POST", getContactUrl, false);
	xmlhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	// Get current information of contact from api
	try {
		xmlhr.onreadystatechange = function(){
			if (this.readyState == 4 && this.status == 200)
			{
				// Update HTML
				document.getElementById("contact_edited_result").innerHTML = "Contact Edited";
			}
		};
	} catch (e) {
		// Update HTML
		document.getElementById("contact_edited_result").innerHTML = e.message;
	}

	var jsonObject = JSON.parse( xmlhr.responseText );

	// get user id from the updated jsonObject
	USER_ID = jsonObject.id;

	document.getElementById("edited_first_textbox").value = jsonObject.firstName;
	document.getElementById("edited_last_textbox").value = jsonObject.lastName;
	document.getElementById("edited_phone_textbox").value = jsonObject.phone;
	document.getElementById("edited_email_textbox").value = jsonObject.email;
	document.getElementById("edited_address_textbox").value = jsonObject.address;

}

// Send new contact info to database
function editContact ()
{
	var editContactUrl = "contactmngr.com/API/EditContact.php";

	var edited_first = document.getElementById("edited_first_textbox").value;
	var edited_last = document.getElementById("edited_last_textbox").value;
	var edited_phone = document.getElementById("edited_phone_textbox").value;
	var edited_email = document.getElementById("edited_email_textbox").value;
	var edited_address = document.getElementById("edited_address_textbox").value;
	var contact_id = document.getElementById("contact_id").value;

	var jsonText = '{"FirstName" : "' + edited_first_name + '",
			              "LastName" : "' + edited_last_name + '",
										"Contact_ID"  : "' + contact_id + '",
										"PhoneNumber" : "' + edited_phone + '",
										"Email" : "' + edited_email + '",
										"Address" : "' + edited_address +  '}';

	// Connect to API
	var xmlhr = new XMLHttpRequest();
	xmlhr.open("POST", editContactUrl, true);
	xmlhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	// Send jsonText to API
	try {
		xmlhr.send(jsonText);
		xmlhr.onreadystatechange =function(){
			if (this.readyState == 4 && this.status == 200)
			{
				// Update HTML
				document.getElementById("contact_edited_result").innerHTML = "Contact Edited";
			}
		};

	} catch (e) {
		// Update HTML
		document.getElementById("contact_edited_result").innerHTML = e.message;
	}
}



// credit to Professor Rick Leinecker for this function
function hideOrShow( elementId, showState )
{
	var vis = "visible";
	var dis = "block";
	if( !showState )
	{
		vis = "hidden";
		dis = "none";
	}

	document.getElementById( elementId ).style.visibility = vis;
	document.getElementById( elementId ).style.display = dis;
}

function hashPassword(password)
{

}
