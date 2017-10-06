/**
 * Created by steve haight on 10/6/2017.
 *
 * description: this module receives and validates an array finding the peaks and valleys in it.
 */

module.exports = Transformer;

function Transformer() {
    'use strict';

    var _self = this;
    if (!(this instanceof Transformer)) {
        throw new Error("Transformer needs to be called with the new keyword");
    }

    this.name = '';
    this.affiliation = '';
    this.strength = 0;
    this.intelligence = 0;
    this.speed = 0;
    this.endurance = 0;
    this.rank = 0;
    this.courage = 0;
    this.firePower = 0;
    this.skill = 0;

    Object.defineProperty(this, 'strength', {
        set: function (value) {
            this.strength = parseInt(value)
        }
    });
}

Transformer.prototype = {};

Transformer.prototype.overallRating = function () {
    return this.strength + this.intelligence + this.speed + this.endurance + this.rank + this.courage + this.firePower + this.skill
};

Transformer.prototype.setStrength = function (value) {
    this.strength = parseInt(value);
};

// Transformer.prototype = {
//     get name() {
//         return this.name;
//     },
//     set name(name){
//       this.name = name;
//     },
//     get affiliation() {
//         return this.affiliation;
//     },
//     set affiliation(affiliation){
//         this.affiliation = affiliation;
//     },
//     get strength() {
//         return this.strength;
//     },
//     set strength(strength){
//         this.strength = parseInt(strength);
//     },
//     get intelligence() {
//         return this.intelligence;
//     },
//     set intelligence(intelligence){
//         this.intelligence = parseInt(intelligence);
//     },
//     get speed() {
//         return this.speed;
//     },
//     set speed(speed){
//         this.speed = parseInt(speed);
//     },
//     get endurance() {
//         return this.endurance;
//     },
//     set endurance(endurance){
//         this.endurance = parseInt(endurance);
//     },
//     get rank() {
//         return this.rank;
//     },
//     set rank(rank){
//         this.rank = parseInt(rank);
//     },
//     get courage() {
//         return this.courage;
//     },
//     set courage(courage){
//         this.courage = parseInt(courage);
//     },
//     get firePower() {
//         return this.firePower;
//     },
//     set firePower(firePower){
//         this.firePower = parseInt(firePower);
//     },
//     get skill() {
//         return this.skill;
//     },
//     set skill(skill){
//         this.skill = parseInt(skill);
//     },
//     overallRating: function (){
//         return this.strength + this.intelligence + this.speed + this.endurance + this.rank + this.courage + this.firePower + this.skill
//     }
// };