(function() {

    var fs = require('fs');
    var midiParser = require('midifile');

    var bufferHelper = require('./buffer-helper');
    var midiHelper = require('./midi-helper');
    var guitarHelper = require('./guitar-helper');

    var bufferedMidi = bufferHelper.toArrayBuffer(fs.readFileSync(__dirname + '/../data/hope-of-a-lifetime.mid'));
    var midi= new midiParser(bufferedMidi);

    var guitar = guitarHelper.placeCapo(guitarHelper.standardTuning(), 8);

    var notes = midiHelper.getNotes(midi);
    for (var i in notes) {
        var note = notes[i];
        var string = guitarHelper.bestStringToPlay(guitar, note);

        if (!string) {
            throw "Song is unplayable using this (tuned) guitar";
        }

        for (var j = 0; j < string; j++) {
            process.stdout.write('-');
        }

        process.stdout.write(String(guitarHelper.fretToPlayNoteOn(guitar, string, note)));

        for (var j = string + 1; j < guitar.length; j++) {
            process.stdout.write('-');
        }

        process.stdout.write("\n");

        for (var j = 0; j < guitar.length; j++) {
            process.stdout.write('-');
        }
        process.stdout.write("\n");
    }

}).call(this);