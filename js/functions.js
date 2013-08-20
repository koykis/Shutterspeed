$(document).ready(function(){
	
	$('#loading').fadeOut(300);
	
});

$(document).ajaxStart(function(){
	$('#loading').fadeIn(100);
});

$(document).ajaxStop(function(){
	$('#loading').fadeOut(300);
});

/**
 * Basic authorization action to allow access to the user's profile data, based on the scope we choose.
 * Input variables  : text (string | The text to be displayed in the error message).
 * Output variables :	NONE.
 *
 */

function login(perms){
	
	FB.login(function(response) {
	 if (response.authResponse) {
			//Do something
			window.location = 'index.php?page=game';
		} else {
		 console.log('User cancelled login or did not fully authorize.');
		}
	}, {scope: 'email,user_likes,publish_stream,photo_upload'});
	
}

/**
 * The error function displays a warning window at the top right of the body for the user to see.
 * Input variables  : text (string | The text to be displayed in the error message).
 * Output variables :	NONE.
 *
 */

function error(text){
	$('#error').remove();
	$('body').prepend('<div id="error"><p><img src="img/buttons/warning.png" alt="Προσοχή!" /><br /><span>'+text+'</span></p></div>');
}

/**
 * The global_redir function redirects the user to some URL outside the Facebook iframe.
 * Input variables  : redirUrl (string | The URL to redirect to).
 * Output variables :	NONE.
 *
 */

function global_redir(redirUrl){
	window.top.location = redirUrl;
}

/**
 * The iframe_redir function redirects the user to some URL inside the Facebook iframe.
 * Input variables  : redirUrl (string | The URL to redirect to).
 * Output variables :	NONE.
 *
 */

function iframe_redir(redirUrl){
	window.location = redirUrl;
}

/**
 * The wallpost function automatically uploads a picture to the user's profile. It is placed
 * in an album named after the application.
 * Input variables  : photoUrl (string | The URL of the picture to be uploaded).
 * Output variables :	NONE.
 *
 */

function wallpost(photoUrl){
	FB.api('/me/photos', 'post', {
		message: '',
		url: photoUrl
	}, postCallback);
}

function postCallback(){
	return;
}

/**
 * The timelineShare function displays the pop-up window of Facebook, in order for the user to share a link to display
 * in their timeline.
 * Input variables  : url (string | The URL to be shared).
 *										name (string | The title of the shared link).
 *										picture (string | The of the picture that will be displayed next to the text).
 *										caption (string | Some text as subtitle).
 *										description (string | A short description of the link shared).
 * Output variables :	NONE.
 *
 */

function timelineShare(url, name, picture, caption, description){
	var obj = {
		method: 'feed',
		link: url,
		name: name,
		picture: picture,
		caption: caption,
		description: description
	};
	
	FB.ui(obj, shareCallback);
}

function shareCallback(){
	$.get('scripts/participation.php');
}

/**
 * The appRequest function displays the pop-up window of Facebook, in order for the user to choose friends who will recieve a
 * notification/invitation to try out the application.
 * Input variables  : text (string | The text that will be displayed in the App Center (255 Characters Max)).
 *										friends (int | The number of the maximun recipients for each request (20 Max)).
 * Output variables :	NONE.
 *
 */

function appRequest(text, friends){
	FB.ui({
		method: 'apprequests', 
		message: text,
		max_recipients: friends
	});
}

/**
 * The preload function downloads a number of images from the server to the user's RAM to be shown instantly on mouseover
 * or onclick events.
 * Input variables  : images (string | The file paths seperated by commas).
 * Output variables :	NONE.
 *
 */

function preload(images) {
	if(document.images) {
		var i = 0;
		var imageArray = new Array();
		imageArray = images.split(',');
		var imageObj = new Image();
		for(i=0; i<=imageArray.length-1; i++) {
			imageObj.src=imageArray[i];
		}
	}
}

/**
 * The appRequestReturn function displays the pop-up window of Facebook, in order for the user to choose friends who will recieve a
 * notification/invitation to try out the application. It is STRICTLY connected to its callback function, returnID.
 * appRequestReturn Input variables : text (string | The text that will be displayed in the App Center (255 Characters Max)).
 *																		friends (int | The number of the maximun recipients for each request (20 Max)).
 * Output variables :	NONE.
 *
 */

function appRequestReturn(text, friends){
	FB.ui({
		method: 'apprequests', 
		message: text,
		max_recipients: friends
	}, returnID);
}

function returnID(data){
	friendID = data.to;
	$('#returnedData').html('<img src="http://graph.facebook.com/'+friendID+'/picture" class="'+friendID+'" />');
}

/**
 * The buildMap function builds a Google Map inside the appointed container.
 * appRequestReturn Input variables : lat (decimal | Latitude of the spot we want to focus on the map).
 *																		long (decimal | Longditude of the spot we want to focus on the map).
 *																		container (string | The ID of the element we want the map to appear in).
 * Output variables :	NONE.
 *
 */

function buildMap(lat,long,container)
{
  var mapProp = {
    center: new google.maps.LatLng(lat,long),
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById(container),mapProp);
}