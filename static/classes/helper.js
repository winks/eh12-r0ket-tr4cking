

function map_range( val, min1, max1, min2, max2 ) {
    return (val-min1)/(max1-min1) * (max2-min2) + min2;
}

var $lifeform = $('<div/>', {
    'class': 'lifeform'
});

var $floor = $('<div/>', {
    'class': 'floor'
});

var $radar = $('<div/>', {
    'class': 'radar'
});