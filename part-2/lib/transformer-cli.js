/**
 * Created by steve haight on 10/6/2017.
 *
 * description: this module defines a cli for the Transformers modules
 */

require('./string-replace-token');

var readline = require('readline')
    , Transformer = require('./transformer')
    , TransformerBattle = require('./transformer-battle')
    , uiText = require('./resources/text')
    , menu;

var start = function () {
    /**
     @param none
     @return none
     */

    showMainMenu();
};

var createMenu = function () {
    /**
     @param none
     @return none
     */

    if (menu) menu.close();

    // creates a readline interface instance
    menu = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
};

var showContinuePrompt = function () {
    /**
     @param none
     @return none
     */

    // create a new menu
    createMenu();

    menu.question(uiText.actions.pressEnterToContinue, function () {
        showMainMenu();
    });
};

var renderMenu = function (menuArray) {
    /**
     @param {string[]} menuArray
     @return none
     */

    for (var i = 0, len = menuArray.length; i < len; i++) {
        console.log(menuArray[i]);
    }
};

var renderApplicationHeader = function () {
    /**
     @param none
     @return none
     */

    var txt = uiText.headers.global;
    console.log(txt);
    showHorizontalRule(txt.length);
};

var showMainMenu = function () {
    /**
     @param none
     @return none
     */

    // clear screen
    process.stdout.write('\033c');

    renderApplicationHeader();

    // create a new menu
    createMenu();

    // log the main menu
    renderMenu(uiText.menus.main);

    menu.question('> ', function (input) {
        switch (input) {
            case '1':
                addTransformer();
                break;
            case '2':
                showAllTransformers('a');
                break;
            case '3':
                showAllTransformers('d');
                break;
            case '4':
                executeBattle();
                break;
            case '0':
                exitProgram();
                break;
            default:
                showMainMenu(); // show menu again if input does not match
        }
    });
};

var exitProgram = function () {
    /**
     @param none
     @return none
     */

    // clear screen
    process.stdout.write('\033c');

    renderApplicationHeader();

    console.log(uiText.messages.farewell);
    process.exit();
};

var showSectionHeader = function (header) {
    /**
     @param {string} header
     @return none
     */

    console.log(uiText.tpls.sectionHeaderTpl.replaceTokens([header]));
};

var showHorizontalRule = function (length) {
    /**
     @param {int} length
     @return none
     */

    var rule = '';
    for (var i = 0; i < length-1; i++)
        rule += '-';
    console.log(rule);
};

var showAllTransformers = function (type) {
    /**
     @param {string} type
     @return none
     */

    var title
        , transformers;

    // clear screen
    process.stdout.write('\033c');

    renderApplicationHeader();

    switch (type.toLowerCase()){
        case 'a':
            title = uiText.headers.autobotsListHeader;
            transformers = TransformerBattle.getAutobots();
            break;
        case 'd':
            title = uiText.headers.decepticonsListHeader;
            transformers = TransformerBattle.getDecepticons();
            break;
    }

    showSectionHeader(title);
    for (var i = 0, len = transformers.length; i < len; i++) {
        console.log('');
        showTransformerProperties(transformers[i]);
    }

    showContinuePrompt();
};

var addTransformer = function () {
    /**
     @param none
     @return none
     */

    var transformer = new Transformer();
    getTransformerAttributeInput(transformer, 0);
};

var validateInput = function (input, validator) {
    /**
     @param none
     @return none
     */

    switch (validator.type) {
        case 'string':
            return input.length > 0;
        case 'option':
            return validator.options.indexOf(input) >= 0;
    }
};

var getTransformerAttributeInput = function (transformer, attributeIndex) {
    /**
     @param {string} transformer
     @param {int} attributeIndex
     @return none
     */

    // clear screen
    process.stdout.write('\033c');

    renderApplicationHeader();

    // create a new menu
    createMenu();

    // get the Transformer class public properties
    var objProps = Transformer.prototype.attributes;
    var objPropValidator = Transformer.prototype[objProps[attributeIndex] + 'Validator'];

    menu.question(
        uiText.actions.enterTransformerAttribute.replaceTokens([objProps[attributeIndex] + (objPropValidator.hint ? ' (' + objPropValidator.hint + ')' : '')]) + '> ',
        function (input) {
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

var showTransformerProperties = function (transformer) {
    /**
     @param {Transformer} transformer
     @return none
     */

    var props = Transformer.prototype.attributes;
    showSectionHeader(transformer.name);
    for (var i = 1, len = props.length; i < len; i++) {
        console.log(props[i] + ': ' + transformer[props[i]]);
    }
    console.log(uiText.labels.overallRating + transformer.overallRating);
    console.log(uiText.labels.alive + transformer.alive);
    showHorizontalRule(uiText.tpls.sectionHeaderTpl.replaceTokens([transformer.name]).length);
};

var showNewTransformerAttributes = function (transformer) {
    /**
     @param {Transformer} transformer
     @return none
     */

    // clear screen
    process.stdout.write('\033c');

    renderApplicationHeader();

    showTransformerProperties(transformer);

    createMenu();

    menu.question(uiText.actions.confirmAddTransformer + '> ', function (input) {
        switch (input.toLowerCase()) {
            case 'y':
                TransformerBattle.addTransformer(transformer);
                // showAlert('Transformer added.');
                showMainMenu();
                break;
            case 'n':
                showMainMenu();
                break;
            default:
                showNewTransformerAttributes(transformer); // show menu again if input does not match
        }
    });
};

var showAlert = function (message) {
    /**
     @param {string} message
     @return none
     */

    // clear screen
    process.stdout.write('\033c');

    renderApplicationHeader();

    console.log(message);
    showContinuePrompt();
};

var executeBattle = function () {
    /**
     @param none
     @return none
     */

    // clear screen
    process.stdout.write('\033c');

    renderApplicationHeader();

    if (TransformerBattle.getDecepticons().length === 0) {
        console.log(uiText.errors.prefix + uiText.errors.noDecepticons);
        showContinuePrompt();
        return;
    }

    if (TransformerBattle.getAutobots().length === 0) {
        console.log(uiText.errors.prefix + uiText.errors.noAutobots);
        showContinuePrompt();
        return;
    }

    console.log(uiText.messages.rumble);

    // execute the fight!!!
    TransformerBattle.doBattle();

    var results = TransformerBattle.getResults();
    var winners = results.survivors.winners.join(', ');
    var losers = results.survivors.losers.join(', ');

    showSectionHeader(uiText.headers.battleResults);
    console.log(uiText.menus.battleResults[0].replaceTokens([results.battleCount, results.battleCount > 1 ? 's' : '']));
    console.log(uiText.menus.battleResults[1].replaceTokens([results.winningTeam, winners.length > 0 ? winners : 'none']));
    console.log(uiText.menus.battleResults[2].replaceTokens([results.losingTeam, losers.length > 0 ? losers : 'none']));
    showHorizontalRule(uiText.tpls.sectionHeaderTpl.replaceTokens([uiText.headers.battleResults]).length);


    showContinuePrompt();
};

module.exports = {
    start: start
};
