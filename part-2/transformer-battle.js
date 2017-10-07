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

var battleCount
    , decepticonWins = 0
    , autobotWins = 0
    , winningTeam
    , losingTeam;

var addTransformer = function (transformer) {
    if (transformer.affiliation === 'D') {
        transformers.decepticons.push(transformer);
    } else if (transformer.affiliation === 'A') {
        transformers.autobots.push(transformer);
    }
    sortTransformers();
};

var getAutobots = function () {
    return transformers.autobots;
};

var getDecepticons = function () {
    return transformers.decepticons;
};

var sortCompare = function (a, b) {
    return (a.overallRating < b.overallRating) ? 1 : ((b.overallRating < a.overallRating) ? -1 : 0);
};

var sortTransformers = function () {
    transformers.autobots.sort(sortCompare);
    transformers.decepticons.sort(sortCompare);
};

var doBattle = function () {
    battleCount = Math.min(transformers.autobots.length, transformers.decepticons.length);

    for (var i = 0; i < battleCount; i++) {
        // Optimus Prime / Predaking battle rule
        ruleOptimusPrimePredaking(transformers.autobots[i], transformers.decepticons[i]);

        // attr offset battle rule (if both still alive)
        if (transformers.autobots[i].alive && transformers.decepticons[i].alive) {
            ruleStatOffet(transformers.autobots[i], transformers.decepticons[i]);
        }

        // overall rating battle rule (if both still alive)
        if (transformers.autobots[i].alive && transformers.decepticons[i].alive) {
            ruleOverallRating(transformers.autobots[i], transformers.decepticons[i]);
        }
    }

    processResults();
};

var ruleOptimusPrimePredaking = function (autobot, decepticon) {
    if (autobot.name === 'Optimus Prime' && decepticon.name !== 'Predaking') {
        decepticon.alive = false;
        autobotWins += 1;
    } else if (autobot.name !== 'Optimus Prime' && decepticon.name === 'Predaking') {
        autobot.alive = false;
        decepticonWins += 1;
    } else if (autobot.name === 'Optimus Prime' && decepticon.name === 'Predaking') {
        decepticon.alive = false;
        autobot.alive = false;
    }
};

var ruleStatOffet = function (autobot, decepticon) {
    var offset = 3;

    var allAttrs = autobot.attributes;
    for (var i = 0; i < allAttrs.length; i++) {
        var attr = allAttrs[i];
        if (autobot[attr] + offset >= decepticon[attr]) {
            decepticon.alive = false;
            autobotWins += 1;
        } else if (decepticon[attr] + offset >= autobot[attr]) {
            autobot.alive = false;
            decepticonWins += 1;
        }
    }
};

var ruleOverallRating = function (autobot, decepticon) {
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
    // set winner / loser
    if (decepticonWins > autobotWins) {
        winningTeam = 'Decepticons';
        losingTeam = 'Autobots';
    } else if (autobotWins > decepticonWins) {
        winningTeam = 'Autobots';
        losingTeam = 'Decepticons';
    } else {
        winningTeam = 'Tied';
        losingTeam = 'Tied';
    }

    if (winningTeam !== 'Tied' && losingTeam !== 'Tied') {
        survivors = processSurvivors(winningTeam.toLowerCase(), losingTeam.toLowerCase());
    }

};

var processSurvivors = function (winner, loser) {
    var i;
    var survivors = {
        winners: [],
        losers: []
    };

    // store losing survivors
    for (i = 0; i < transformers[loser].length; i++) {
        if (transformers[loser][i].alive) {
            survivors.losers.push(transformers[loser][i].name);
        }
    }

    // store winning survivors
    for (i = 0; i < transformers[winner].length; i++) {
        if (transformers[winner][i].alive) {
            survivors.winners.push(transformers[winner][i].name);
        }
    }

    return survivors;
};

var getResults = function () {
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
    getResults: getResults
};