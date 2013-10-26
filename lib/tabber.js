exports.usingMidi = function(sheet, midi) {
    var midiHelper = require('./midi-helper');
    var guitarHelper = require('./guitar-helper');

    var notes = midiHelper.getNotes(midi);

    for (var i in notes) {
        var note = notes[i];
        var string = guitarHelper.bestStringToPlay(sheet.guitar, note);

        if (!string) {
            sheet.markUnplayable = true;
        }

        sheet.place(string, guitarHelper.fretToPlayNoteOn(sheet.guitar, string, note));
    }
}