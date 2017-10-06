/**
 * Created by steve haight on 10/6/2017.
 *
 * description: this module receives and validates an array finding the peaks and valleys in it.
 */

var readline = require('readline')
    , Transformer = require('./transformer');

var menu
    , autobots = []
    , decepticons = []
    , battleCount = 0
    , winningTeam = ""
    , survivors = [];

var start = function () {
    showMainMenu();
};

var createMenu = function () {
    // check if there is already a menu active. If true, close it.
    if (menu) menu.close();

    // creates a readline interface instance
    menu = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
};

var showContinuePrompt = function () {
    // create a new menu
    createMenu();

    menu.question('\n\npress enter to continue >>>', function (input) {
        showMainMenu();
    });
};

var showMainMenu = function () {
    // clear screen
    process.stdout.write('\033c');

    // create a new menu
    createMenu();

    // log the main menu
    console.log('\nWelcome to the part 2 of the Aequilibrium Technical Assignment: The Transformation Company');
    console.log(
        '\n\n' +
        'What would you like to do?\n\n' +
        '1) Add a Transformer\n' +
        '2) List Transformers\n' +
        '3) Do battle\n' +
        '4) Quit\n'
    );

    menu.question('> ', function (input) {
        switch (input) {
            case '1':
                addTransformer();
                break;
            case '2':
                listTransformers();
                break;
            case '4':
                console.log('Thanks for playing!');
                process.exit();
                break;
            default:
                showMainMenu(); // show menu again if input does not match
        }
    });
};

var addTransformer = function () {
    var transformer = new Transformer();
    getTransformerAttributeInput(transformer, 0);
};

var listTransformers = function () {
    // clear screen
    process.stdout.write('\033c');

    console.log('---------------Autobots------------------');
    console.log('');
    for (var i = 0; i < autobots.length; i++) {
        listTransformerProperties(autobots[i]);
        console.log('');
    }
    console.log('-----------------------------------------\n\n');

    console.log('--------------Decepticons----------------');
    console.log('');
    for (var i = 0; i < decepticons.length; i++) {
        listTransformerProperties(decepticons[i]);
        console.log('');
    }
    console.log('-----------------------------------------\n\n');

    showContinuePrompt();
};

var validateInput = function(input, validator){
    switch (validator.type){
        case 'string':
            return input.length > 0;
        case 'option':
            return validator.options.indexOf(input)>=0;
    }
};

var getTransformerAttributeInput = function (transformer, attributeIndex) {
    // clear screen
    process.stdout.write('\033c');

    // create a new menu
    createMenu();

    var objProps = Object.keys(transformer);

    // configure input validator
    var validator = {};
    switch (objProps[attributeIndex]) {
        case 'name':
            validator.hint = '';
            validator.type = 'string';
            break;
        case 'affiliation':
            validator.hint = '(A/D)';
            validator.type = 'option';
            validator.options = ['A','D'];
            break;
        default:
            validator.hint = '(1-10)';
            validator.type = 'option';
            validator.options = ['1','2','3','4','5','6','7','8','9','10'];

    }

    menu.question('Enter the Transformer\'s ' + objProps[attributeIndex] + ' ' + validator.hint + '> ', function (input) {
        if (validateInput(input, validator)) {
            transformer[objProps[attributeIndex]] = input;
            attributeIndex += 1;
            if (attributeIndex === objProps.length) {
                // clear screen
                process.stdout.write('\033c');

                showTransformerAttributes(transformer);
            } else {
                getTransformerAttributeInput(transformer, attributeIndex);
            }
        } else {
            getTransformerAttributeInput(transformer, attributeIndex);
        }
    });
};

var listTransformerProperties = function (transformer) {
    var props = Object.keys(transformer);
    for (var i = 0; i < props.length; i++) {
        console.log(props[i] + ': ' + transformer[props[i]]);
    }
    console.log('overall rating: ' + transformer.overallRating());
};

var showTransformerAttributes = function (transformer) {
    console.log('---------------- Transformer Attributes ----------------');
    listTransformerProperties(transformer);
    console.log('-------------------------------------------------------');
    // create a new menu
    createMenu();

    menu.question('Would you like to add this transformer? (Y/N)> ', function (input) {
        switch (input.toLowerCase()) {
            case 'y':
                if (transformer['affiliation'] === 'D') {
                    decepticons.push(transformer);
                } else {
                    autobots.push(transformer);
                }
                showTransformerAdded();
                break;
            case 'n':
                showMainMenu();
                break;
            default:
                showTransformerAttributes(); // show menu again if input does not match
        }
    });
};

var showTransformerAdded = function () {
    // clear screen
    process.stdout.write('\033c');

    console.log('Transformer added.');
    showContinuePrompt();
};

module.exports = {
    start: start
};