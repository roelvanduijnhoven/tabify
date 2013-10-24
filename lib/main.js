(function() {

    var fs = require('fs');
    var midiParser = require('midifile');

    var bufferHelper = require('./buffer-helper');
    var midiHelper = require('./midi-helper');

    function strings() {
        return [40, 45, 50, 55, 59, 64];
    }

    function capo(capoPosition) {
        var standard = strings();
        for (i in standard) {
            standard[i] += capoPosition;
        }
        return standard;
    }

    // Read midi file
    var bufferedMidi = bufferHelper.toArrayBuffer(gfs.readFileSync(__dirname + '/../data/hope-of-a-lifetime.mid'));
    var midi= new midiParser(bufferedMidi);

    guitar = capo(8);

    var notes = midiHelper.getNotes(midi);
    for (var i in notes) {
        var note = notes[i];

        var bestString;
        var minDistance = -1;
        for (var string = 0; string < guitar.length; string++) {
            var distance = note - guitar[string];
            if (distance >= 0 && (minDistance === -1 || distance < minDistance) ) {
                bestString = string;
                minDistance = distance;
            }
        }

        if (minDistance === -1) {
            throw "Song is unplayable on guitar";
        }

        for (var j = 0; j < bestString; j++) {
            process.stdout.write('-');
        }

        process.stdout.write(String(note - guitar[bestString]));

        for (var j = bestString + 1; j < guitar.length; j++) {
            process.stdout.write('-');
        }

        process.stdout.write("\n");

        for (var j = 0; j < guitar.length; j++) {
            process.stdout.write('-');
        }
        process.stdout.write("\n");
    }

}).call(this);