/**
 * Created by steve haight on 10/6/2017.
 *
 * description: this library is used as the inpout harness for running the peaks-and-valleys module
 */

var peaksAndValleys = require('./peaks-and-valleys');

console.log('\n\nWelcome to the first part of the Aequilibrium Technical Assignment: The Castle Company');

var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('\n\nPlease enter your peak and valley array numbers separated by commas\n(type exit to quit)>');
rl.on('line', function (line) {
    var array = line.toString().split(',');
    if (line === 'exit'){
        rl.close();
        return;
    }
    if (!peaksAndValleys.validateInput(array)){
        console.log('\nError: We are not able to process your input!\nPlease try again. (Invalid array detected)\n\n');
        rl.setPrompt('Please enter your peak and valley array numbers separated by commas\n(integers only please, type exit to quit)>');
        rl.prompt();
        return;
    }

    var obj = peaksAndValleys.find(array)
        , castleCount = obj.peaks.length + obj.valleys.length;

    console.log('\n-----------------------------------------------------------------');
    console.log('  Based on your provided data, you should build ' + castleCount + ' castles.  ');
    console.log('-----------------------------------------------------------------');

    // rl.close();
    rl.prompt();
}).on('close', function () {
    console.log('\nThanks for coming!');
    process.exit(0);
});

rl.prompt();