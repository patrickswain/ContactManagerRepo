var USER_ID = "";

function login()
{
	var username = document.getElementById("Username").value;
  var password = document.getElementByID("Password").value;

	var url = "contactmngr.com/API/Login.php";
}

function logout()
{

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
	//document.getElementById("new_contact_first_name").innerHTML = "";

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

function deleteContact()
{

}

function editContact()
{

}
