/**
 * User: schinken
 * Date: 12/29/11
 * Time: 2:22 PM
 */


function Queue( n ) {
    this.queue  = [];
    this.length = n || 3;
}

/**
 * Returns the topmost Item
 */
Queue.prototype.getTop = function() {
    return this.queue[ this.queue.length-1 ];
}

/**
 * Returns the whole queue
 */
Queue.prototype.getQueue = function() {
    return this.queue;
}

/**
 * Adds an Item to the end of the queue,
 * if there are enough items in it, remove older ones
 * @param Item
 */
Queue.prototype.push = function( Item ) {

    if( this.queue.length >= this.length ) {
        this.queue.shift();
    }

    this.queue.push( Item );
};