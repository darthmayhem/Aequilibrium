/**
 * Created by steve haight on 10/6/2017.
 *
 * description: this module defines text strings for the cli
 */

module.exports = {
    actions: {
        enterDataArray: '\nPlease enter your peak and valley array numbers separated by commas\n(type exit to quit)'
    },
    errors: {
        invalidArray: '\nError: We are not able to process your input!\nPlease try again. (Invalid array detected)\n\n'
    },
    headers: {
        global: '\n\nWelcome to the part one of the Aequilibrium Technical Assignment: The Castle Company'
    },
    messages: {
        farewell: '\nThanks for coming!'
    },
    menus: {
        results: [
            'Based on your provided data, you should build {0} castles.  '
        ]
    },
    tpls: {
        sectionHeaderTpl: '\n---------------- {0} ----------------',
        dataEntryPrompt: '> '
    }
};