function Floor( name ){

    var that        =   this;
    this.invalid    =   false;
    this.display    =   true;
    this.name       =   name;
    this.count      =   0;

    var $div = $( '<div/>' );

    $( "#floormenu" )
            .append( $div )
            .append( '<br/>' )
            .addClass('floor-active');

    $div.click(function(){
        that.display = !that.display;

        $div.removeClass('floor-active floor-inactive');
        if( that.display ) {
            $div.addClass('floor-active');
        } else {
            $div.addClass('floor-inactive');
        }

    });
    
    this.updateText = function() {
        $div.html( "Floor " + this.name + " " + this.count + "r0kets" );
    };

    this.destructor = function() {
        $div.remove();
    };
    
    this.updateText();
    
};
