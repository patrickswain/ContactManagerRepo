<?php

  session_start();

  $inData = getRequestInfo();

  //$userID= "_SESSION['User_ID']";
  userID = $inData["userID"];
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
		$sql = "SELECT * FROM ContactInfo where User_ID= $userID";
		$result = mysqli_query($conn, $sql);
    $contacts = array();

    mysqli_num_rows($result);

		if (mysqli_num_rows($result) > 0)
		{
      while($row = mysqli_fetch_assoc($result))
      {
        $contacts[] = $row;
      }
      returnWithInfo($contacts, $num_rows);
    }
		else
		{
      $error = "No records found";
			returnWithError( $error );
		}
		$conn->close();
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

	function     returnWithInfo($contacts)
	{
	  sendResultInfoAsJson( json_encode($contacts) );
	}

?>
