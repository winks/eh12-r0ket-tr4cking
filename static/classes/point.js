/**
 * User: schinken
 * Date: 12/29/11
 * Time: 2:11 PM
 */

function Point( X, Y ) {

    this.X = 0;
    this.Y = 0;

    this.getPosition = function() {
        return { 'x': this.X, 'y': this.Y };
    }

    this.setPosition = function( X, Y ) {
        this.X = X;
        this.Y = Y;
    }

    // Initialize Point
    this.setPosition( X, Y );
}
