/**
 * Created by steve haight on 10/6/2017.
 *
 * description: this module receives and validates an array finding the peaks and valleys in it.
 */

function validateEntry(entry) {
    // entry must be a valid integer
    return !isNaN(parseFloat(entry));
}

module.exports = {
    find: function (array) {
        var start = 1                           // index to begin comparing
            , end = array.length - 1                // last index to compare
            , obj = {peaks: [], valleys: []};       // object for storing peaks and valleys

        obj.peaks.push(0);  // always add a peak at start of array

        for (var i = start; i < end; i++) {
            var curr = array[i]
                , next = array[i + 1]
                , last = array[i - 1];

            if (curr > next && curr > last)
                obj.peaks.push(i);
            else if (curr < next && curr < last)
                obj.valleys.push(i);
        }

        return obj;
    },

    validateInput: function (array) {
        return array.every(validateEntry);
    }
};