/**
 * User: schinken
 * Date: 12/29/11
 * Time: 2:22 PM
 */


function Queue( n ) {

    var queue  = [];
    var length = n | 3;

    /**
     * Adds an Item to the end of the queue,
     * if there are enough items in it, remove older ones
     * @param Item
     */
    this.push = function( Item ) {

        if( queue.length >= length ) {
            queue.shift();
        }

        queue.push( Item );
    }

    /**
     * Returns the whole queue
     */
    this.getQueue = function() {
        return queue;
    }

    /**
     * Returns the topmost Item
     */
    this.getTop = function() {
        return queue[ queue.length-1 ];
    }
}