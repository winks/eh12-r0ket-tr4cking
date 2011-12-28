<?php

/**
 * User: schinken
 * Date: 12/27/11
 * Time: 9:50 AM
 */


$apcExists = false;

if( function_exists('apc_add') ) {
    $apcExists = true;
}

if( $apcExists ) {
    $cache = microtime(true)*1000;
    $cache = sprintf("%.1f", round($cache/100*2)/2 );

    if(  ( $result = apc_fetch( $cache ) ) !== false ) {
        echo $result;
        exit;
    }
}

$ch = curl_init( 'http://176.99.39.100/tracking.json' );

curl_setopt( $ch, CURLOPT_USERAGENT, "28c3 r0ketr5ck debug proxy" );
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT, 5);
curl_setopt( $ch, CURLOPT_ENCODING, 'gzip,deflate');

header('Content-type: application/json');
$result = curl_exec( $ch );

echo $result;

if( $apcExists ) {
    apc_add( $cache, $result, 3 );
}
