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

header('Content-type: application/json');


if( $apcExists ) {
    $cache = microtime(true)*1000;
    $cache = sprintf("%.1f", round($cache/100*2)/2 );

    if(  ( $result = apc_fetch( $cache ) ) !== false ) {
        echo $result;
        exit;
    }
}

$ch = curl_init( 'http://r0ket.dyndns.org:8888/output.json' );

curl_setopt( $ch, CURLOPT_USERAGENT, "eh12 r0ketr4ck debug proxy" );
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT, 5);
curl_setopt( $ch, CURLOPT_ENCODING, 'gzip,deflate');

$result = curl_exec( $ch );

$result = preg_replace_callback('/"nick":"([^"]*?)"/u', function( $m ) {
    $clean = preg_replace('/[^A-Z0-9]+/i', '', $m[1] );
    return sprintf('"nick":"%s"', $clean );
}, $result );


echo $result;

if( $apcExists ) {
    apc_add( $cache, $result, 3 );
}
