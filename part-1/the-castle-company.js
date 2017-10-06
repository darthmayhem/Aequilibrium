/**
 * Created by steve haight on 10/6/2017.
 */

var peaksAndValleys = require('./peaks-and-valleys');

console.log('Welcome to the first part of the Aequilibrium Technical Assignment: The Castle Company\n');

var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('Please enter your peak and valley array numbers separated by commas (type exit to quit):>');
rl.on('line', function (line) {
    var array = line.toString().split(',');
    if (line === 'exit'){
        rl.close();
        return;
    }
    if (!peaksAndValleys.validateArray(array)){
        console.log('\nError: We are not able to process your input! Please try again.\n(Invalid array detected)\n\n');
        rl.setPrompt('Please enter your peak and valley array numbers separated by commas (positive integers only please, type exit to quit):>');
        rl.prompt();
        return;
    }

    var obj = peaksAndValleys.find(array)
        , castleCount = obj.peaks.length + obj.valleys.length;

    console.log('\nBased on your provided array, you should build ' + castleCount + ' castles.');

    rl.close();
}).on('close', function () {
    console.log('\nthanks for coming!');
    process.exit(0);
});

rl.prompt();