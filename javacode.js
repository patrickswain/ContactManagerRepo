var USER_ID = "1";

// if login button is pressed call this function
function login()
{
	var loginUsername = document.getElementById("loginUserNameID").value;
  var loginPassword = document.getElementByID("loginPasswordID").value;
  document.getElementById("loginResult").innerHTML = "";

  var jsonStringLogin = '{"login" : "' + loginUsername + '", "password" : "' + loginPassword + '"}';

	var url = "contactmngr.com/API/Login.php";
  xhr.open("POST", url, false);

  var xhr = new XMLHttpRequest();
}

// if register button is pressed activated this function
function register()
{
  var regUsername = document.getElementById("regUserNameID").value;
  var regPassword = document.getElementByID("regPasswordID").value;
  document.getElementById("regResult").innerHTML = "";

  var jsonStringLogin = '{"login" : "' + regUsername + '", "password" : "' + regPassword + '"}';
}

function logout()
{

}

function addUser()
{
	var url = "contactmngr.com/API/CreateUser.php";
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
	document.getElementById("new_contact_first_name").innerHTML = "";

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
