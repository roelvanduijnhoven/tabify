exports.Sheet = function(numberOfStrings) {
    this.notes = [];
    this.numberOfStrings = numberOfStrings;
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

exports.format = function(Sheet) {
    var formatted = '';

    for (var string = 0; string < Sheet.numberOfStrings; string++) {
        for (var index in Sheet.notes) {
            var note = Sheet.notes[index];
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