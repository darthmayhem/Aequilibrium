/**
 * Created by steve haight on 10/6/2017.
 *
 * description: this module define an object class for a Transformer
 */

var autobots = []
    , decepticons = []
    , battleCount = 0
    , winningTeam = ''
    , survivors = [];

var addTransformer = function (transformer){
    if (transformer.affiliation === 'D') {
        decepticons.push(transformer);
    } else if (transformer.affiliation === 'A') {
        autobots.push(transformer);
    }
};

var getAutobots = function (){
    return autobots;
};

var getDecepticons = function (){
    return decepticons;
};

module.exports = {
    addTransformer: addTransformer,
    getAutobots: getAutobots,
    getDecepticons: getDecepticons
};