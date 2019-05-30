<?php

	$inData = getRequestInfo();

	$userName = $inData["UserName"];
	$password = $inData["Password"];
	$firstName = $inData["FirstName"];
	$lastName = $inData["LastName"];
	$id = 0;

	$conn = new mysqli("198.71.225.55:3306", "User", "Password1!", "Contacts");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "INSERT INTO `Login` (`UserName`, `Password`, `FirstName`, `LastName`) VALUES ('" . $userName . "','" . $password . "','" . $firstName . "','" . $lastName . "')";
		$result = $conn->query($sql);

		if( $result != TRUE )
		{
			returnWithError( $conn->error );
		}

		$sql = "SELECT ID FROM Login where UserName='" . $userName . "' and Password='" . $password. "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();
			$id = $row["ID"];

			returnWithInfo( $id );
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

	function returnWithInfo( $id )
	{
		$retValue = '{"id":' . $id . '}';
		sendResultInfoAsJson( $retValue );
	}


?>
