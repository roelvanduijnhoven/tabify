(function() {

    var fs = require('fs');
    var midiParser = require('midifile');

    var bufferHelper = require('./buffer-helper');
    var midiHelper = require('./midi-helper');
    var guitarHelper = require('./guitar-helper');
    var tab = require('./tab');

    var bufferedMidi = bufferHelper.toArrayBuffer(fs.readFileSync(__dirname + '/../data/hope-of-a-lifetime.mid'));
    var midi= new midiParser(bufferedMidi);

    var guitar = guitarHelper.placeCapo(guitarHelper.standardTuning(), 8);
    var sheet = new tab.Sheet(guitar.length);

    var notes = midiHelper.getNotes(midi);
    for (var i in notes) {
        var note = notes[i];
        var string = guitarHelper.bestStringToPlay(guitar, note);

        if (!string) {
            throw "Song is unplayable using this (tuned) guitar";
        }

        sheet.place(string, guitarHelper.fretToPlayNoteOn(guitar, string, note));
        sheet.rest();
    }

    console.log(tab.format(sheet));

}).call(this);