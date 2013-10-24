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

exports.formatPartial = function(Sheet, start, limit) {
    var formatted = '';
    for (var string = 0; string < Sheet.numberOfStrings; string++) {
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