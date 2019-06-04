<?php

  $inData = getRequestInfo();

  $userID= 0;
  $firstName = "";
  $lastName = "";
  $phoneNumber = "";
  $email = "";
  $address = "";
  $contacts = [];


  $conn = new mysqli("198.71.225.55:3306", "User", "Password1!", "Contacts");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "SELECT * FROM ContactInfo where Contact_ID='" . $inData["User_Id"] . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
      while($row = $result->fetch_assoc();)
        $contacts[] = $row;

		}
		else
		{
			returnWithError( "No Records Found" );
		}
		$conn->close();

    returnWithInfo($contacts);
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function     returnWithInfo($contacts)
	{
    //$retValue = '{"ID":' . $userID . ',"FirstName":"' . $firstName . '","LastName":"' . $lastName . '", "Phone":"' . $phoneNumber . '", "Email":"' . $email . '", "address":"' . $address . '" }';
	  sendResultInfoAsJson( json_encode($contacts) );
	}

?>
