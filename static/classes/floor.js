function Floor(name){
    var that=this;
    this.invalid=false;
    this.display=true;
    this.name=name;
    this.count=0;
    var $div;
    $div=$('<div/>');
    $("#floormenu").append($div).append('<br/>');
    
    $div.click(function(){
        that.display= !that.display;
    });
    
    this.updateText=function(){
        $div.html("<h2>Floor " + this.name + " " + this.count + "r0kets</h2>");
    };
    this.destructor=function(){
        $div.remove();
    };
    
    this.updateText();
    
};
