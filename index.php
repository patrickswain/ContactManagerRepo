

<!DOCTYPE html>
<html lang = "en">
    <head>
      <?php
      session_start();

      if(isset($_SESSION['User_ID'])) {
           header("Location: /loggedInPage"); // redirects them to homepage
           exit; // for good measure
      }
      ?>
      <!-- <script src="hashes.js"></script> -->
      <script src="back-end.js"></script>
      <script src="javacode.js"></script>
      <link rel="stylesheet" href="Stylesheet.css">
      <link href="https://fonts.googleapis.com/css?family=Open+Sans|Roboto&display=swap" rel="stylesheet">
  		<meta charset = "utf-8" />
          <title>CONTACT MNGR</title>
    </head>
    <body>
    <!--
      Login page
        -includes login prompts
        -inludes create new user prompts
      -->
			<div id = "loginPage">
				<h1> Contact MNGR Log In</h1>
        <form>
          <label>Username</label><br>
          <input type = "text"
                 id = "username_textbox"
                 placeholder="Enter Username"/><br>
          <label>Password</label><br>
          <input type = "text"
                 id = "password_textbox"
                 placeholder="Enter Password" /><br>
          <p id = "login_result">temporary text</p>

          <button onclick = "window.location.pathname = "/loggedInPage.html";" >Alert </button>
          <button onclick = "login()" >Login </button>
          <button id = "add_user">Create New Account</button>
          <!-- script to make modal appear-->
          <script>
            var modal = document.getElementById("create_user_modal");
          	var add_user_button = document.getElementById("add_user");

          	add_user_button.onclick = function() {
          		modal.style.display = "block";
          	}

          	//window.onclick = function() {
          	//	modal.style.display = "none";
          	//}
            </script>
        </form>
        <!--
          Create Account popup modal
        -->
        <div id = "create_user_modal">
          <h1>Create New User</h1>
          <form>
            <label>First Name</label><br>
            <input type = "text"
                   id = "new_user_first_name"
                   placeholder="Enter First Name" /><br>
            <label>Last Name</label><br>
            <input type = "text"
                   id = "new_user_last_name"
                   placeholder="Enter Last Name" /><br>
            <label>New Username</label><br>
            <input type = "text"
                   id = "new_user_name"
                   placeholder="Enter Username"/><br>
            <label>New Password</label><br>
            <input type = "text"
                   id = "new_password"
                   placeholder="Enter Password" /><br>
            <p id = "user_added_result">temporary text</p>

            <button onclick = "addUser()" >Create User</button>

      </div>
      <!--
        Contacts page
          -includes search bar
          -inludes create new user prompts
        -->
     <!--  <div id = "contactsPage">
        <div id = "topOfPage">
          <h1> Contact MNGR</h1>
          <p> Welcome insertfirstname insertlastname </p>
          <input type = "text"
                 id = "search_textbox"
                 placeholder="Search for Contacts..."/>
          <button onclick = "alert('hola')"> Search</button>
          <button onclick = "addContact()">Add Contact</button>
          <button onclick = "logout()">Logout</button>
        </div>
        <div id = "contactDisplay">
          <label>contacts shown here</label>
        </div>
        <div id = "editContactPage">
          <h2>Edit Contact</h2>
          <label>First Name</label><br>
          <input type = "text"
                 id = "edit_firstname_textbox"
                 placeholder="Enter Username"/><br>
          <label>Last Name</label><br>
          <input type = "text"
                 id = "edit_lastname_textbox"
                 placeholder="Enter Username"/><br>
          <label>Phone Number</label><br>
          <input type = "text"
                 id = "edit_phone_textbox"
                 placeholder="Enter Username"/><br>
          <label>Email</label><br>
          <input type = "text"
                 id = "edit_email_textbox"
                 placeholder="Enter Username"/><br>
          <label>Address</label><br>
          <input type = "text"
                 id = "edit_address_textbox"
                 placeholder="Enter Username"/><br>
          <button onclick = "editContact()" >Submit </button>
          <button onclick = "">Cancel </button>
          <label id = "contact_edited_result">Contact edited result</label>
        </div>
        <div id = "addContactsPage">
          <h2>Add Contact</h2>
          <label>First Name</label><br>
          <input type = "text"
                 id = "add_firstname_textbox"
                 placeholder="Enter First Name..."/><br>
          <label>Last Name</label><br>
          <input type = "text"
                 id = "add_lastname_textbox"
                 placeholder="Enter Last Name..."/><br>
          <label>Phone Number</label><br>
          <input type = "text"
                 id = "add_phone_textbox"
                 placeholder="Enter Phone Number..."/><br>
          <label>Email</label><br>
          <input type = "text"
                 id = "add_email_textbox"
                 placeholder="Enter Email..."/><br>
          <label>Address</label><br>
          <input type = "text"
                 id = "add_address_textbox"
                 placeholder="Enter Address..."/><br>
          <button onclick = "addContact()" >Add</button>
          <button onclick = "">Cancel</button>
          <label id = "contact_added_result">Contact added result</label>
        </div>
      </div> -->


 		</body>
</html>
