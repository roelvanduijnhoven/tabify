exports.standardTuning = function(){
    return [40, 45, 50, 55, 59, 64];
}

exports.placeCapo = function capo(guitar, capoPosition) {
    var tunedGuitar = guitar;
    for (i in tunedGuitar) {
        tunedGuitar[i] += capoPosition;
    }
    return tunedGuitar;
}

exports.bestStringToPlay = function(guitar, note) {
    var bestString = null;
    var minDistance;
    for (var string = 0; string < guitar.length; string++) {
        var distance = note - guitar[string];
        if (distance >= 0 && (bestString === null || distance < minDistance) ) {
            bestString = string;
            minDistance = distance;
        }
    }
    return bestString;
}