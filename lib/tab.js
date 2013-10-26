exports.Sheet = function(guitar) {
    this.notes = [];
    this.guitar = guitar;
}

exports.Sheet.prototype.place = function(string, fret) {
    this.notes.push({
        string: string,
        fret: fret
    });
}

exports.Sheet.prototype.rest = function() {
    this.notes.push(null);
}

exports.format = function(Sheet, bars) {
    var formatted = '';

    var start = 0;
    bars = bars || Sheet.notes.length;

    do {
        formatted += exports.formatPartial(Sheet, start, bars);
        formatted += "\n";
        start += bars;
    } while (start < Sheet.notes.length);

    return formatted;
}

exports.noteName = function(note) {
    var gabs = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    var delta = (note - 60) % gabs.length;
    return delta > 0 ? gabs[delta] : gabs[(gabs.length + delta) % gabs.length];
}

exports.formatPartial = function(Sheet, start, limit) {
    var pad = function(string, length) {
        for (var i = 0; i < Math.max(0, length - string.length); i++) {
            string = " " + string;
        }
        return string;
    }

    var formatted = '';
    for (var string = Sheet.guitar.length - 1; string >= 0; string--) {
        formatted += pad(exports.noteName(Sheet.guitar[string]), 2) + "| ";

        for (var i = start; i < start + limit; i++) {
            var note = Sheet.notes[i];
            if (note && note.string == string) {
                formatted += note.fret;
            } else {
                formatted += '-';
            }
        }
        formatted += "\n";
    }
    return formatted;
}