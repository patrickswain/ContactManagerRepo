<?php

session_start();

	$inData = getRequestInfo();

	$userName = $inData["UserName"];
	$password = $inData["Password"];
	$firstName = $inData["FirstName"];
	$lastName = $inData["LastName"];
	$id = 0;
	$error = "";

	$conn = new mysqli("198.71.225.55:3306", "User", "Password1!", "Contacts");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "SELECT * FROM ContactInfo WHERE UserName='$userName'";
		$result = mysqli_query($conn, $sql);
		if (mysqli_num_rows($result) > 0)
		{
			$error = "User Name already exists";
			returnWithError($error);
		}

		$sql = "INSERT INTO `Login` (`UserName`, `Password`, `FirstName`, `LastName`) VALUES ('" . $userName . "','" . $password . "','" . $firstName . "','" . $lastName . "')";
		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
		}

		$sql = "SELECT ID FROM Login where UserName='" . $userName . "' and Password='" . $password. "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();
			$id = $row["ID"];
			$_SESSION["User_ID"] = $id;

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
		sendResultInfoAsJson( json_encode($err)  );
	}

	function returnWithInfo( $id )
	{
		$retValue = '{"id":' . $id . '}';
		sendResultInfoAsJson( $retValue );
	}


?>
