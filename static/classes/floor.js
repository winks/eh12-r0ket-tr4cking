function Floor( name ){

    var that        =   this;
    this.name       =   name;

    var Display     = true;
    var r0kets      = {};
    var radars      = {};

    /**
     * Add R0ket to Floor
     * @param r0ket r0ket
     */
    this.addR0ket = function( roket ) {
        var roketId = roket.getId();
        r0kets[ roketId ] = roket;
    };

    /**
     * Add radar to floor
     * @param radar
     */
    this.addRadar = function( radar ) {
        var radarId = radar.getId();
        radars[ radarId ] = radar;
    };

    this.removeR0ket = function( r0ket ) {
        var r0ketId = r0ket.getId();
        delete r0kets[ r0ketId ];
    };

    this.removeRadar = function( radar ) {
        var radarId = radar.getId();
        delete radars[ radarId ];
    };

    /**
     * Return all the radars
     * @return radar[]
     */
    this.getRadars = function() {
        return radars;
    };

    /**
     * Return all the rokets
     * @return r0ket[]
     */
    this.getR0kets = function() {
        return r0kets;
    };

    /**
     * Set if floor is displayed
     * @param state
     */
    this.setDisplay = function( state ) {
        Display = state;
    };

    /**
     * Check if floor is displayed
     */
    this.isDisplayed = function() {
        return Display;
    };
    
    /**
     * Return the name
     * @return string or int
     */
    this.getName = function() {
        return that.name;
    };
    
};
