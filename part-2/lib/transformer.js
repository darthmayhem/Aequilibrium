/**
 * Created by steve haight on 10/6/2017.
 *
 * description: this module receives and validates an array finding the peaks and valleys in it.
 */

module.exports = Transformer;

function Transformer() {
    /**
     @param none
     @return none
     */

    'use strict';

    if (!(this instanceof Transformer)) {
        throw new Error("Transformer needs to be called with the new keyword");
    }

    this._name = '';
    this._affiliation = '';
    this._strength = 0;
    this._intelligence = 0;
    this._speed = 0;
    this._endurance = 0;
    this._rank = 0;
    this._courage = 0;
    this._firePower = 0;
    this._skill = 0;
    this._alive = true;
}

Transformer.prototype = {};

Object.defineProperty(Transformer.prototype, 'name', {
    enumerable: true,
    get: function () {
        return this._name;
    },
    set: function (value) {
        this._name = value;
    }
});

Object.defineProperty(Transformer.prototype, 'nameValidator', {
    enumerable: false,
    get: function () {
        return {
            hint: '',
            type: 'string'
        }
    }
});

Object.defineProperty(Transformer.prototype, 'affiliation', {
    enumerable: true,
    get: function () {
        return this._affiliation;
    },
    set: function (value) {
        this._affiliation = value;
    }
});

Object.defineProperty(Transformer.prototype, 'affiliationValidator', {
    enumerable: false,
    get: function () {
        return {
            hint: 'A/D',
            type: 'option',
            options: ['A', 'D']
        }
    }
});

Object.defineProperty(Transformer.prototype, 'strength', {
    enumerable: true,
    get: function () {
        return this._strength;
    },
    set: function (value) {
        this._strength = parseInt(value)
    }
});

Object.defineProperty(Transformer.prototype, 'strengthValidator', {
    enumerable: false,
    get: function () {
        return {
            hint: '1-10',
            type: 'option',
            options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        }
    }
});


Object.defineProperty(Transformer.prototype, 'intelligence', {
    enumerable: true,
    get: function () {
        return this._intelligence;
    },
    set: function (value) {
        this._intelligence = parseInt(value)
    }
});

Object.defineProperty(Transformer.prototype, 'intelligenceValidator', {
    enumerable: false,
    get: function () {
        return {
            hint: '1-10',
            type: 'option',
            options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        }
    }
});

Object.defineProperty(Transformer.prototype, 'speed', {
    enumerable: true,
    get: function () {
        return this._speed;
    },
    set: function (value) {
        this._speed = parseInt(value)
    }
});

Object.defineProperty(Transformer.prototype, 'speedValidator', {
    enumerable: false,
    get: function () {
        return {
            hint: '1-10',
            type: 'option',
            options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        }
    }
});

Object.defineProperty(Transformer.prototype, 'endurance', {
    enumerable: true,
    get: function () {
        return this._endurance;
    },
    set: function (value) {
        this._endurance = parseInt(value)
    }
});

Object.defineProperty(Transformer.prototype, 'enduranceValidator', {
    enumerable: false,
    get: function () {
        return {
            hint: '1-10',
            type: 'option',
            options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        }
    }
});

Object.defineProperty(Transformer.prototype, 'rank', {
    enumerable: true,
    get: function () {
        return this._rank;
    },
    set: function (value) {
        this._rank = parseInt(value)
    }
});

Object.defineProperty(Transformer.prototype, 'rankValidator', {
    enumerable: false,
    get: function () {
        return {
            hint: '1-10',
            type: 'option',
            options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        }
    }
});

Object.defineProperty(Transformer.prototype, 'courage', {
    enumerable: true,
    get: function () {
        return this._courage;
    },
    set: function (value) {
        this._courage = parseInt(value)
    }
});

Object.defineProperty(Transformer.prototype, 'courageValidator', {
    enumerable: false,
    get: function () {
        return {
            hint: '1-10',
            type: 'option',
            options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        }
    }
});

Object.defineProperty(Transformer.prototype, 'firePower', {
    enumerable: true,
    get: function () {
        return this._firePower;
    },
    set: function (value) {
        this._firePower = parseInt(value)
    }
});

Object.defineProperty(Transformer.prototype, 'firePowerValidator', {
    enumerable: false,
    get: function () {
        return {
            hint: '1-10',
            type: 'option',
            options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        }
    }
});

Object.defineProperty(Transformer.prototype, 'skill', {
    enumerable: true,
    get: function () {
        return this._skill;
    },
    set: function (value) {
        this._skill = parseInt(value)
    }
});

Object.defineProperty(Transformer.prototype, 'skillValidator', {
    enumerable: false,
    get: function () {
        return {
            hint: '1-10',
            type: 'option',
            options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        }
    }
});

Object.defineProperty(Transformer.prototype, 'alive', {
    enumerable: false,
    get: function () {
        return this._alive;
    },
    set: function (value) {
        this._alive = value;
    }
});

Object.defineProperty(Transformer.prototype, 'attributes', {
    enumerable: false,
    get: function () {
        var attrs = [];
        for (var attr in Transformer.prototype) {
            attrs.push(attr);
        }
        return attrs;
    }
});

Object.defineProperty(Transformer.prototype, 'overallRating', {
    enumerable: false,
    get: function () {
        var rating = this._strength +
            this._intelligence +
            this._speed +
            this._endurance +
            this._firePower;
        return rating;
    }
});
