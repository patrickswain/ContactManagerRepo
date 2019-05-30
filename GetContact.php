<?php

	$inData = getRequestInfo();

  $id = 0;
	$firstName = "";
	$lastName = "";
  $phone = "";
  $email = "";
  $address = "";

	$conn = new mysqli("198.71.225.55:3306", "User", "Password1!", "Contacts");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
    $sql = "SELECT * FROM ContactInfo WHERE Contact_ID = " . $inData["Contact_ID"] . ")";
		$result = $conn->query($sql);
    if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();
			$firstName = $row["firstName"];
			$lastName = $row["lastName"];
			$id = $row["ID"];
      $phone = $row["PhoneNumber"];
      $email = $row["Email"];
      $address = $row["address"];

			returnWithInfo($firstName, $lastName, $id, $phone, $email, $address);
		}
		else
		{
			returnWithError( "No Records Found" );
		}
		$conn->close();
	}

	returnWithInfo( $searchResults );

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

	function returnWithInfo( $firstName, $lastName, $id, $phone, $email, $address )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","phone":"'. $phone .'","email":"'. $email .'""address":"'. $address .'"}';
		sendResultInfoAsJson( $retValue );
	}

?>
