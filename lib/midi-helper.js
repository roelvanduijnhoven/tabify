var midiParser = require('midifile');
var midiConstants = require('midifile/src/MIDIEvents');

var bufferHelper = require('./buffer-helper');

exports.createFromRaw = function(raw) {
    var bufferedMidi = bufferHelper.toArrayBuffer(raw);
    return new midiParser(bufferedMidi);
}

exports.getNotes = function(midi){
    var notes = [];
    var events = midi.getMidiEvents();

    for (var i = 0; i < events.length; i++) {
        var event = events[i];

        if (event.type !== midiConstants.EVENT_MIDI) {
            continue;
        } else if (event.subtype !== midiConstants.EVENT_MIDI_NOTE_ON) {
            continue;
        }

        notes.push(event.param1);
    }

    return notes;
}