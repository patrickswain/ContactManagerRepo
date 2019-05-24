var USER_ID = "";

function login()
{
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
	var contact_first_name = document.getElementById("new_contact__first_name").value;
	var contact_last_name = document.getElementById("new_contact_last_name").value;

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
