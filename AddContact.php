<?php
session_start();

	$inData = getRequestInfo();

	$userID = $inData["User_ID"];
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
		$sql = "INSERT INTO `ContactInfo` (`FirstName`, `LastName`, `User_ID`, `PhoneNumber`, `Email`, `Address` ) VALUES ('" . $firstName . "','" . $lastName . "','" . $userID. "','" . $phoneNumber . "','" . $email . "','" . $address . "')";
		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
		}

		$sql = "SELECT * FROM ContactInfo where (User_ID= $userID) and (FirstName= $firstName) and (LastName= $lastName)";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();
			$contactID = $row["Contact_ID"];

			returnWithInfo($contactID);
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

	// function returnWithInfo($contact)
	// {
	// 	sendResultInfoAsJson( json_encode($contact) );
	// }
	function returnWithInfo( $contactID)
	{
		$retValue = '{"contactID":"' . $contactID . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>
