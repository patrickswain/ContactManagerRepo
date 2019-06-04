//var USER_ID = "0";
//var firstName = "";
//var lastName = "";




//
// function addContact()
// {
// 	// Take in contact's info
// 	var contact_first_name = document.getElementById("new_contact_first_name").value;
// 	var contact_last_name = document.getElementById("new_contact_last_name").value;
// 	var contact_email = document.getElementById("new_contact_email").value;
// 	var contact_phone = document.getElementById("new_contact_phone").value;
//
//
// 	// Set result intdicator to blank
// 	document.getElementById("contact_added_result").innerHTML = "";
//
// 	var jsonText = '{"FirstName" : "' + contact_first_name + '",
// 			              "LastName" : "' + contact_last_name + '",
// 										"User_ID"  : "' + USER_ID + '",
// 										"PhoneNumber" : "' + contact_phone + '",
// 										"Email" : "' + contact_email + '",
// 										"Address" : "' + contact_address +  '}';
//
// 	// Connect to API
// 	var url = "contactmngr.com/API/AddContact.php";
// 	var xmlhr = new XMLHttpRequest();
// 	xmlhr.open("POST", url, true);
// 	xmlhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
//
// 	// Send jsonText to API
// 	try {
// 		xmlhr.send(jsonText);
// 		xmlhr.onreadystatechange =function(){
// 			if (this.readyState == 4 && this.status == 200)
// 			{
// 				// Update HTML
// 				document.getElementById("contact_added_result").innerHTML = "Contact Added";
// 			}
// 		};
//
// 	} catch (e) {
// 		// Update HTML
// 		document.getElementById("contact_added_result").innerHTML = e.message;
// 	}
//
//
// }

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
          contactDisplay.appendChild(divElement);
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
  var jsonText = '{"contact" : "' + contactID + '", "userId" : "' + USER_ID + '"}';

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

	var jsonText = '{"FirstName" : "' + edited_first_name + '","LastName" : "' + edited_last_name + '","Contact_ID"  : "' + contact_id + '","PhoneNumber" : "' + edited_phone + '","Email" : "' + edited_email + '","Address" : "' + edited_address +  '"}';

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
