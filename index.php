<?php

/**
 * Includes the basic scripts and markup for the header.
 */
 
include 'scripts/library.php';

include 'templates/header.php';

/**
 * Chekcs is the user likes the page and if not, displays and stops at the like gate.
 */

if(like() == false){
	include 'templates/like.php';
}

/**
 * Chekcs is the user has authorized the app and if not, displays and stops at the login gate.
 */

if($_SESSION['like'] == true && auth() == false){
	include 'templates/auth.php';
}

/**
 * After the user has liked the page and authorized the app, he is moved around in the rest of the pages
 * using $_GET requests. The variable $_GET['page'] holds the name of the page to be displayed.
 */

if(like() == true && auth() == true && isset($_GET['page'])){
	$page = $_GET['page'];
	include 'templates/'.$page.'.php';
}

/**
 * If the user has come fresh from the authorization link or refreshed the Facebook page he is landed
 * at the first page of the application.
 */

if(like() == true && auth() == true && !isset($_GET['page'])){
	//$count = countParticipations('nutella_filos_participation', userID());
	
	/*if($count > 0)} $page = 'congrats'; }else{*/$page = 'game';//}
	
	include 'templates/'.$page.'.php';
}

/**
 * Includes the markup for the footer.
 */

include 'templates/footer.php';

?>