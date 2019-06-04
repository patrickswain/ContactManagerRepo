<?php

  $inData = getRequestInfo();

  $userID= 0;
  $firstName = "";
  $lastName = "";
  $phoneNumber = "";
  $email = "";
  $address = "";



  $conn = new mysqli("198.71.225.55:3306", "User", "Password1!", "Contacts");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "SELECT * FROM ContactInfo where User_ID='" . $inData["User_Id"] . "'";
		$result = mysqli_query($conn, $sql);
    $contacts = array();
		if (mysqli_num_rows($result) > 0)
		{
      while($row = mysqli_fetch_assoc($result))
      {
        $contacts[] = $row;
      }
      returnWithInfo($contacts);
    }
		else
		{
			returnWithError( "No Records Found" );
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
		sendResultInfoAsJson( $err );
	}

	function     returnWithInfo($contacts)
	{
    //$retValue = '{"ID":' . $userID . ',"FirstName":"' . $firstName . '","LastName":"' . $lastName . '", "Phone":"' . $phoneNumber . '", "Email":"' . $email . '", "address":"' . $address . '" }';
	  sendResultInfoAsJson( json_encode($contacts) );
	}

?>
