var USER_ID = "";
var firstName = "";
var lastName = "";

function login()
{
  // retrieve textbox information
	var loginUsername = document.getElementById("username_textbox").value;
  var loginPassword = document.getElementByID("password_textbox").value;

  document.getElementByID("login_result");

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
		if( userId < 1 )
		{
			document.getElementById("login_result").innerHTML = "Username or Password is incorrect";
			return;
		}

    // retrieve first name and last name from the updated jsonObject
		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;

		document.getElementById("username_textbox").value = "";
		document.getElementById("password_textbox").value = "";

		hideOrShow( "loggedInDiv", true);
		hideOrShow( "accessUIDiv", true);
		hideOrShow( "loginDiv", false);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
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

function hashPassword(password)
{

}
