<?php
session_start();

	$inData = getRequestInfo();

	$id = 0;
	$userID = 0;
	$firstName = "";
	$lastName = "";
	$error = "";
	$mssg = "";

	$conn = new mysqli("198.71.225.55:3306", "User", "Password1!", "Contacts");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "SELECT ID,FirstName,LastName FROM Login where UserName='" . $inData["login"] . "' and Password='" . $inData["password"] . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();
			$firstName = $row["FirstName"];
			$lastName = $row["LastName"];
			$id = $row["ID"];
			$_SESSION["User_ID"] = $id;

			if (isset($_SESSION["User_ID"]))
			{
				$mssg = "Session variable is set";
				$userID = $_SESSION["User_ID"];
			}
			returnWithInfo($firstName, $lastName, $mssg, $id, $userID);
		}
		else
		{
			$firstName = "";
			$lastName = "";
			$id = 0;

			$_SESSION["User_ID"] = $id;

			returnWithInfo($firstName, $lastName, $mssg, $id, $userID );
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

	function returnWithInfo( $firstName, $lastName, $id, $userID)
	{
		$retValue = '{"Mssg":"' . $mssg . '",, "UserID":' . $userID . ', "ID":' . $id . ',"FirstName":"' . $firstName . '","LastName":"' . $lastName . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>
