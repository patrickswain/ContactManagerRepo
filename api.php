<?php

//Initialize variables
$server = "
$user = "user";
$password = "Password1!";

// Create Connection
$connection = new mysqli($server, $user, $password);

if ($connection->connect_error) 
{
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";  

?>
