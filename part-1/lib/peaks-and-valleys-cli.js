/**
 * Created by steve haight on 10/6/2017.
 *
 * description: this library is used as the cli for running the peaks-and-valleys module
 */

require('./string-replace-token');

var peaksAndValleys = require('./peaks-and-valleys')
    , uiText = require('../resources/text')
    , readline = require('readline');

var start = function () {
    /**
     @param none
     @return none
     */

    // clear screen
    process.stdout.write('\033c');

    console.log(uiText.headers.global);

    var rl = readline.createInterface(process.stdin, process.stdout);

    rl.setPrompt(uiText.actions.enterDataArray + uiText.tpls.dataEntryPrompt);
    rl.on('line', function (line) {
        var array = line.toString().split(',');
        if (line === 'exit') {
            rl.close();
            return;
        }
        if (!peaksAndValleys.validateInput(array)) {
            console.log(uiText.errors.invalidArray);
            rl.prompt();
            return;
        }

        var obj = peaksAndValleys.find(array)
            , castleCount = obj.peaks.length + obj.valleys.length;

        var results = uiText.menus.results[0].replaceTokens([castleCount]);
        console.log('\n');
        showHorizontalRule(results.length);
        console.log(results);
        showHorizontalRule(results.length);
        console.log('\n');

        rl.prompt();
    }).on('close', function () {
        console.log(uiText.messages.farewell);
        process.exit(0);
    });

    rl.prompt();
};

var showHorizontalRule = function (length) {
    /**
     @param {number} length
     @return {string}
     */

    var rule = '';
    for (var i = 0; i < length-1; i++)
        rule += '-';
    console.log(rule);
};

module.exports = {
    start: start
};