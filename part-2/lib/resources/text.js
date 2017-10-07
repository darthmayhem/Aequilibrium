/**
 * Created by steve haight on 10/6/2017.
 *
 * description: this module defines text strings for the cli
 */

module.exports = {
    actions: {
        pressEnterToContinue: '\n\npress enter to continue >>>',
        enterTransformerAttribute: '\nEnter the Transformer\'s {0}',
        confirmAddTransformer: '\nWould you like to add this transformer? (Y/N)'
    },
    errors: {
        prefix: '\nError: ',
        noDecepticons: 'Add at least one Decepticon',
        noAutobots: 'Add at least one Autobot'
    },
    headers: {
        autobotsListHeader: 'Autobots',
        decepticonsListHeader: 'Decepticons',
        global: '\nPart 2 of the Aequilibrium Technical Assignment: The Transformation Company',
        battleResults: 'Battle Results'
    },
    labels: {
        overallRating: 'overall rating: ',
        alive: 'alive: '
    },
    messages: {
        farewell: '\nThanks for playing!',
        rumble: '\nLets rumble!!!'
    },
    menus: {
        main: [
            '',
            'What would you like to do?\n',
            '1) Add a Transformer',
            '2) List all Autobots',
            '3) List all Decepticons',
            '4) Fight!!!',
            '',
            '0) Quit\n'
        ],
        battleResults: [
            '{0} battle{1}',
            'Winning team ({0}): {1}',
            'Survivors from the losing team ({0}): {1}'
]
    },
    tpls: {
        sectionHeaderTpl: '\n------------------- {0} -------------------',
        dataEntryPrompt: '> '
    }
};