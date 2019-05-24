var url = "contactmngr.com";


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
	var url = "contactmngr.com/API/CreateUser.php";
}

function addContact()
{
	// Take in contact's name
	var contact_name = document.getElementById("new_contact_name").value;
	// Set result intdicator to blank
	document.getElementById("contact_added_result") = "";

	var jsonText = "{}"
	var url = "contactmngr.com/API/AddContact.php";
}

function deleteContact()
{

}

function editContact()
{

}
