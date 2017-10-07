/**
 * Created by steve haight on 10/6/2017.
 *
 * description: this module defines the battle logic for a transformer battle
 */

var transformers = {
    autobots: [],
    decepticons: []
};

var survivors = {
    winners: [],
    losers: []
};

var battleCount             // count of battles fought
    , decepticonWins = 0    // count of decepticon wins
    , autobotWins = 0       // count autobot wins
    , winningTeam           // winning team name
    , losingTeam;           // losing team name

var addTransformer = function (transformer) {
    /**
     @param {Transformer} transformer
     @return none
     */

    if (transformer.affiliation === 'D') {
        transformers.decepticons.push(transformer);
    } else if (transformer.affiliation === 'A') {
        transformers.autobots.push(transformer);
    }
    sortTransformers();
};

var reset = function () {
    /**
     @param none
     @return none
     */

    transformers.autobots = [];
    transformers.decepticons = [];
    survivors.winners = [];
    survivors.losers = [];
    battleCount = 0;
    decepticonWins = 0;
    autobotWins = 0;
    winningTeam = '';
    losingTeam = '';
};

var getAutobots = function () {
    /**
     @param none
     @return none
     */

    return transformers.autobots;
};

var getDecepticons = function () {
    /**
     @param none
     @return (Transformer}
     */

    return transformers.decepticons;
};

var sortCompare = function (a, b) {
    /**
     @param {string} a
     @param {string} b
     @return {Number}
     */

    return (a.rank < b.rank) ? 1 : ((b.rank < a.rank) ? -1 : 0);
};

var sortTransformers = function () {
    /**
     @param none
     @return none
     */

    transformers.autobots.sort(sortCompare);
    transformers.decepticons.sort(sortCompare);
};

var doBattle = function () {
    /**
     @param none
     @return none
     */

    battleCount = Math.min(transformers.autobots.length, transformers.decepticons.length);

    for (var i = 0; i < battleCount; i++) {
        // Optimus Prime / Predaking battle rule
        ruleOptimusPrimePredaking(transformers.autobots[i], transformers.decepticons[i]);

        // courage / strength battle rule (if both still alive)
        if (transformers.autobots[i].alive && transformers.decepticons[i].alive) {
            ruleCourageStrength(transformers.autobots[i], transformers.decepticons[i]);
        }

        // skill battle rule (if both still alive)
        if (transformers.autobots[i].alive && transformers.decepticons[i].alive) {
            ruleSkill(transformers.autobots[i], transformers.decepticons[i]);
        }

        // overall rating battle rule (if both still alive)
        if (transformers.autobots[i].alive && transformers.decepticons[i].alive) {
            ruleOverallRating(transformers.autobots[i], transformers.decepticons[i]);
        }
    }

    processResults();
};

var ruleOptimusPrimePredaking = function (autobot, decepticon) {
    /**
     @param {Transformer} autobot
     @param {Transformer} decepticon
     @return none
     */

    var eliteNames = [
        'Optimus Prime',
        'Predaking'
    ];

    if (eliteNames.indexOf(autobot.name) >= 0 && eliteNames.indexOf(decepticon.name) < 0) {
        decepticon.alive = false;
        autobotWins += 1;
    } else if (eliteNames.indexOf(autobot.name) < 0 && eliteNames.indexOf(decepticon.name) >= 0) {
        autobot.alive = false;
        decepticonWins += 1;
    } else if (eliteNames.indexOf(autobot.name) >= 0 && eliteNames.indexOf(decepticon.name) >= 0) {
        decepticon.alive = false;
        autobot.alive = false;
    }
};

var ruleSkill = function (autobot, decepticon) {
    /**
     @param {Transformer} autobot
     @param {Transformer} decepticon
     @return none
     */

    var offset = 3; // stat comparison difference

    if (autobot.skill >= decepticon.skill + offset) {
        decepticon.alive = false;
        autobotWins += 1;
    } else if (decepticon.skill >= autobot.skill + offset) {
        autobot.alive = false;
        decepticonWins += 1;
    }
};

var ruleCourageStrength = function (autobot, decepticon) {
    /**
     @param {Transformer} autobot
     @param {Transformer} decepticon
     @return none
     */

    var offsetCourage = 4       // courage comparison difference
        , offsetStrength = 3;   // strength comparison difference

    if (autobot.courage >= decepticon.courage + offsetCourage && autobot.strength >= decepticon.strength + offsetStrength) {
        decepticon.alive = false;
        autobotWins += 1;
    } else if (decepticon.courage >= autobot.courage + offsetCourage && decepticon.strength >= autobot.strength + offsetStrength) {
        autobot.alive = false;
        decepticonWins += 1;
    }
};

var ruleOverallRating = function (autobot, decepticon) {
    /**
     @param {Transformer} autobot
     @param {Transformer} decepticon
     @return none
     */

    if (autobot.overallRating > decepticon.overallRating) {
        decepticon.alive = false;
        autobotWins += 1;
    } else if (decepticon.overallRating > autobot.overallRating) {
        autobot.alive = false;
        decepticonWins += 1;
    } else {
        decepticon.alive = false;
        autobot.alive = false;
    }
};

var processResults = function () {
    /**
     @param none
     @return none
     */

    // set winner / loser
    winningTeam = 'Tie';
    losingTeam = 'Tie';

    if (decepticonWins > autobotWins) {
        winningTeam = 'Decepticons';
        losingTeam = 'Autobots';
    } else if (autobotWins > decepticonWins) {
        winningTeam = 'Autobots';
        losingTeam = 'Decepticons';
    }

    if (winningTeam !== 'Tie') {
        survivors = processSurvivors(winningTeam.toLowerCase(), losingTeam.toLowerCase());
    } else {
        survivors = {
            winners: [],
            losers: []
        };
    }
};

var processSurvivors = function (winner, loser) {
    /**
     @param {string} winner
     @param {string} loser
     @return {object}
     */

    var survivors = {
        winners: [],
        losers: []
    };

    // store winning team
    for (var i = 0, len = transformers[winner].length; i < len; i++) {
        survivors.winners.push(transformers[winner][i].name);
    }

    // store losing team survivors
    for (var i = 0, len = transformers[loser].length; i < len; i++) {
        if (transformers[loser][i].alive) {
            survivors.losers.push(transformers[loser][i].name);
        }
    }

    return survivors;
};

var getResults = function () {
    /**
     @param none
     @return {object}
     */

    return {
        battleCount: battleCount,
        winningTeam: winningTeam,
        losingTeam: losingTeam,
        survivors: survivors
    }
};

module.exports = {
    addTransformer: addTransformer,
    getAutobots: getAutobots,
    getDecepticons: getDecepticons,
    doBattle: doBattle,
    getResults: getResults,
    reset: reset
};