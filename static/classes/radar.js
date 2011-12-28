/**
 * User: schinken
 * Date: 12/28/11
 * Time: 10:37 PM
 */

function Radar( Id, Floor, X, Y, Room ) {

    this.Id     = Id;
    this.Floor  = Floor;
    this.posX   = X;
    this.posY   = Y;
    this.Room   = Room | 0;

    /**
     * @return int
     */
    this.getFloor = function() { return this.Floor; }

    /**
     * @return int
     */
    this.getRoom  = function() { return this.Room;  }

    /**
     * @return int
     */
    this.getId    = function() { return this.Id;    }

    this.getPosition = function() {
        return { 'x': this.posX, 'y': this.posY };
    }

}