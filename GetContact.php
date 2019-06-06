<?php
  // Start the session
  session_start();

  $inData = getRequestInfo();

  $userID= 0;
  $firstName = "";
  $lastName = "";
  $phoneNumber = "";
  $email = "";
  $address = "";
  $error = "";

  $conn = new mysqli("198.71.225.55:3306", "User", "Password1!", "Contacts");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "SELECT * FROM ContactInfo where Contact_ID='" . $inData["id"] . "'";
		$result = $conn->query($sql);
    if (mysqli_num_rows($result) > 0)
		{
      $row = mysqli_fetch_assoc($result)
      returnWithInfo($row);
		}
    else
		{
      $error = "No records found";
			returnWithError( $error );
		}
		$conn->close();

    returnWithInfo($firstName, $lastName, $userID, $phoneNumber, $email, $address);
	}


	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

  function returnWithError( $err )
	{
		sendResultInfoAsJson( json_encode($err) );
	}

	function     returnWithInfo($contact)
	{
	  sendResultInfoAsJson( json_encode($contact) );
	}

?>
