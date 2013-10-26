(function() {

    var fs = require('fs');
    var path = require('path');
    var program = require('commander');

    var tab = require('./tab');
    var tabber = require('./tabber');
    var midiHelper = require('./midi-helper');
    var guitarHelper = require('./guitar-helper');

    program
        .version(require(path.resolve(__dirname, '../package.json')).version)
        .usage('[options] <file ...>')
        .option('-b, --bars  <n>', 'Break after how many bars?', parseInt)
        .option('-c, --capo <n>', 'What position is the capo on?', parseInt)
        .option('-s, --separator <n>', 'Number of rests inserted between each bar?', parseInt)
        .parse(process.argv);

    if (process.argv.length < 3) {
        program.help();
        return;
    }

    var guitar = guitarHelper.placeCapo(guitarHelper.standardTuning(), program.capo || 0);
    var sheet = new tab.Sheet(guitar);

    var midi = midiHelper.createFromRaw(fs.readFileSync(process.argv[2]));
    tabber.usingMidi(sheet, midi);

    if (sheet.markUnplayable) {
        process.stdout.write("\nSong is unplayable using this (tuned) guitar\n\n");
    } else {
        process.stdout.write("\n" + tab.format(sheet, program.bars === 0 ? undefined : program.bars || 80));
    }

}).call(this);