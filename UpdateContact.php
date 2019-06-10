<?php

session_start();

	$inData = getRequestInfo();

	$contactID = $inData["Contact_ID"];
	$firstName = $inData["FirstName"];
	$lastName = $inData["LastName"];
	$phoneNumber = $inData["PhoneNumber"];
	$email = $inData["Email"];
	$address = $inData["Address"];


	$conn = new mysqli("198.71.225.55:3306", "User", "Password1!", "Contacts");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		//$userID = $_SESSION["User_ID"];
    $sql = "UPDATE ContactInfo SET FirstName='" . $firstName . "', LastName='" . $lastName . "', PhoneNumber='" . $phoneNumber . "', Email='" . $email . "', Address='" . $address . "' WHERE Contact_ID='" . $contactID . "'";
		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
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
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}


?>
