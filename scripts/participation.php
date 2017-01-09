<?php

include 'library.php';

for($i = 0; $i < 10; $i++){
	insertDB('xxxxxx_participation', array('user_fb_id', 'part_friend_id', 'part_image', 'part_tray', 'part_text'), array(userID(), userID(), '0', '0', '0'));
}

?>