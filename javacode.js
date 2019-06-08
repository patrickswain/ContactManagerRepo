
function deleteContact(contactID)
{
	// // creates the json text with contact id and userid
  // var jsonText = '{"contact" : "' + contactID + '", "userId" : "' + USER_ID + '"}';
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
	// 			// remove all the html with the contact
	// 			var divRemove = document.getElementById("contactID");
	// 			divRemove.parentNode.removeChild(divRemove);
	// 		}
	// 	};
	// 	// send the user id and contact id to the api
	// 	xhr.send(jsonText);
	// }
	// catch(err)
	// {
	// 	document.getElementById("deletedContactResult").innerHTML = err.message;
	// }
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
	// var editContactUrl = "contactmngr.com/API/EditContact.php";
  //
	// var edited_first = document.getElementById("edited_first_textbox").value;
	// var edited_last = document.getElementById("edited_last_textbox").value;
	// var edited_phone = document.getElementById("edited_phone_textbox").value;
	// var edited_email = document.getElementById("edited_email_textbox").value;
	// var edited_address = document.getElementById("edited_address_textbox").value;
	// var contact_id = document.getElementById("contact_id").value;
  //
	// var jsonText = '{"FirstName" : "' + edited_first_name + '","LastName" : "' + edited_last_name + '","Contact_ID"  : "' + contact_id + '","PhoneNumber" : "' + edited_phone + '","Email" : "' + edited_email + '","Address" : "' + edited_address +  '"}';
  //
	// // Connect to API
	// var xmlhr = new XMLHttpRequest();
	// xmlhr.open("POST", editContactUrl, true);
	// xmlhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  //
	// // Send jsonText to API
	// try {
	// 	xmlhr.send(jsonText);
	// 	xmlhr.onreadystatechange =function(){
	// 		if (this.readyState == 4 && this.status == 200)
	// 		{
	// 			// Update HTML
	// 			document.getElementById("contact_edited_result").innerHTML = "Contact Edited";
	// 		}
	// 	};
  //
	// } catch (e) {
	// 	// Update HTML
	// 	document.getElementById("contact_edited_result").innerHTML = e.message;
	// }
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
