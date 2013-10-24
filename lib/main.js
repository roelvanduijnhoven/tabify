(function() {

    var program = require('commander');

    program
        .usage('[options] <file ...>')
        .option('-b, --bars  <n>', 'Break after how many bars?', parseInt)
        .option('-s, --separator <n>', 'Number of rests inserted between each bar?', parseInt)
        .parse(process.argv);

    var fs = require('fs');
    var midiParser = require('midifile');

    var bufferHelper = require('./buffer-helper');
    var midiHelper = require('./midi-helper');
    var guitarHelper = require('./guitar-helper');
    var tab = require('./tab');

    var bufferedMidi = bufferHelper.toArrayBuffer(fs.readFileSync(process.argv[2]));
    var midi = new midiParser(bufferedMidi);

    var guitar = guitarHelper.placeCapo(guitarHelper.standardTuning(), 8);
    var sheet = new tab.Sheet(guitar.length);

    var notes = midiHelper.getNotes(midi);
    for (var i in notes) {
        var note = notes[i];
        var string = guitarHelper.bestStringToPlay(guitar, note);

        if (!string) {
            process.stdout.write("\nSong is unplayable using this (tuned) guitar\n\n");
            return;
        }

        sheet.place(string, guitarHelper.fretToPlayNoteOn(guitar, string, note));

        for (var i = 0; i < Math.max(0, program.separator || 1); i++ ) {
            sheet.rest();
        }
    }

    process.stdout.write("\n" + tab.format(sheet, program.bars === 0 ? undefined : program.bars || 80));

}).call(this);