<?php

	$inData = getRequestInfo();

	$userName = $inData["UserName"];
	$password = $inData["Password"];
	$firstName = $inData["FirstName"];
	$lastName = $inData["LastName"];

	$conn = new mysqli("198.71.225.55:3306", "User", "Password1!", "Contacts");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "INSERT INTO `Login` (`UserName`, `Password`, `FirstName`, `LastName`) VALUES ('" . $userName . "','" . $password . "','" . $inData["FirstName"] . "','" . $inData["LastName"] . "')";
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
