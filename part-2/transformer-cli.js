/**
 * Created by steve haight on 10/6/2017.
 *
 * description: this module defines a cli for the Transformers modules
 */

var readline = require('readline')
    , Transformer = require('./transformer')
    , TransformerBattle = require('./transformer-battle')
    , menu;

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

    menu.question('\n\npress enter to continue >>>', function () {
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
    console.log('\nWhat would you like to do?\n');
    console.log('1) Add a Transformer');
    if (TransformerBattle.getAutobots().length > 0 || TransformerBattle.getDecepticons().length > 0)
        console.log('2) List Transformers');
    if (TransformerBattle.getAutobots().length > 0 && TransformerBattle.getDecepticons().length > 0)
        console.log('3) Do battle');
    if (TransformerBattle.getAutobots().length > 0 || TransformerBattle.getDecepticons().length > 0)
        console.log('4) Reset');
    console.log('5) Quit');

    menu.question('> ', function (input) {
        switch (input) {
            case '1':
                addTransformer();
                break;
            case '2':
                listAllTransformers();
                break;
            case '3':
                battle();
                break;
            case '5':
                // clear screen
                process.stdout.write('\033c');
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

var listAllTransformers = function () {
    var i;

    // clear screen
    process.stdout.write('\033c');

    console.log('---------------Autobots------------------');
    console.log('');
    var autobots = TransformerBattle.getAutobots();
    for (i = 0; i < autobots.length; i++) {
        listTransformerProperties(autobots[i]);
        console.log('');
    }
    console.log('-----------------------------------------\n\n');

    console.log('--------------Decepticons----------------');
    console.log('');
    var decepticons = TransformerBattle.getDecepticons();
    for (i = 0; i < decepticons.length; i++) {
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

    // get the Transformer class public properties
    var objProps = Transformer.prototype.attributes;
    var objPropValidator = Transformer.prototype[objProps[attributeIndex] + 'Validator'];

    menu.question('Enter the Transformer\'s ' +
        objProps[attributeIndex] + (objPropValidator.hint ? ' (' + objPropValidator.hint + ')' : '') + '> ', function (input) {
        if (validateInput(input, objPropValidator)) {
            transformer[objProps[attributeIndex]] = input;
            attributeIndex += 1;
            if (attributeIndex === objProps.length) {
                showNewTransformerAttributes(transformer);
            } else {
                getTransformerAttributeInput(transformer, attributeIndex);
            }
        } else {
            getTransformerAttributeInput(transformer, attributeIndex);
        }
    });
};

var listTransformerProperties = function (transformer) {
    // var props = Object.getOwnPropertyNames(Transformer.prototype);
    var props = Transformer.prototype.attributes;
    for (var i = 0; i < props.length; i++) {
        console.log(props[i] + ': ' + transformer[props[i]]);
    }
    console.log('overall rating: ' + transformer.overallRating);
};

var showNewTransformerAttributes = function (transformer) {
    // clear screen
    process.stdout.write('\033c');

    console.log('---------------- Transformer Attributes ----------------');
    listTransformerProperties(transformer);
    console.log('-------------------------------------------------------');

    // create a new menu
    createMenu();

    menu.question('\nWould you like to add this transformer? (Y/N)> ', function (input) {
        switch (input.toLowerCase()) {
            case 'y':
                TransformerBattle.addTransformer(transformer);
                showTransformerAdded();
                break;
            case 'n':
                showMainMenu();
                break;
            default:
                showNewTransformerAttributes(transformer); // show menu again if input does not match
        }
    });
};

var showTransformerAdded = function () {
    // clear screen
    process.stdout.write('\033c');

    console.log('Transformer added.');
    showContinuePrompt();
};

var battle = function (){
    // clear screen
    process.stdout.write('\033c');

    if (TransformerBattle.getDecepticons().length === 0){
        console.log('Error: Add more Decepticons');
        showContinuePrompt();
        return;
    }

    if (TransformerBattle.getAutobots().length === 0){
        console.log('Error: Add more Autobots');
        showContinuePrompt();
        return;
    }

    console.log('\nLets rumble!!!');

    // execute the fight!!!
    TransformerBattle.doBattle();

    var results = TransformerBattle.getResults();
    var winners = results.survivors.winners.join(', ');
    var losers = results.survivors.losers.join(', ');

    console.log('\n\n------------------ Battle Results ------------------' );
    console.log(results.battleCount + ' battle' + (results.battleCount > 1 ? 's' : ''));
    console.log('Survivors from the winning team (' + results.winningTeam + '): ' + (winners.length > 0 ? winners : 'none'));
    console.log('Survivors from the losing team (' + results.losingTeam + '): ' + (losers.length > 0 ? losers : 'none'));
    console.log('----------------------------------------------------' );

    showContinuePrompt();
};

module.exports = {
    start: start
};
