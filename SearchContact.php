<?php

	$inData = getRequestInfo();

	$searchResults = "";
	$searchCount = 0;
	$error = "";

	$conn = new mysqli("198.71.225.55:3306", "User", "Password1!", "Contacts");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
    $sql = "SELECT * FROM ContactInfo WHERE CONCAT(FirstName, ' ', LastName) LIKE '%" . $inData["search"] . "%' OR FirstName LIKE '%" . $inData["search"] . "%' OR LastName LIKE '%" . $inData["search"] . "%'";
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
