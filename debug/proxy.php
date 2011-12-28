<?php

/**
 * User: schinken
 * Date: 12/27/11
 * Time: 9:50 AM
 */

if( isset($_REQUEST['example']) ) {

    $rnd = mt_rand(1,30);

    header('Content-type: application/json');
    echo file_get_contents( sprintf('exampledata/data%d.json', $rnd ) );

    exit;
}

$ch = curl_init( 'http://api.openbeacon.net/get/brucon.json' );

curl_setopt( $ch, CURLOPT_USERAGENT, "28c3 r0ketr5ck debug proxy" );
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT, 5);
curl_setopt( $ch, CURLOPT_ENCODING, 'gzip,deflate');

header('Content-type: application/json');
echo curl_exec( $ch );
