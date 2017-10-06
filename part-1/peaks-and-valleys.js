/**
 * Created by steve haight on 10/6/2017.
 *
 * description: this library recieves and validates an array finding the peaks and valleys in it.
 */

function validEntry(entry){
    return entry === parseInt(entry) && entry >= 0;
}

module.exports = {
    find: function (array) {
        var start = 1                           // index to begin comparing
        , end = array.length - 2                // last index to compare
        , obj = {peaks: [], valleys: []};       // object for storing peaks and valleys

        for (var i = start; i <= end; i++) {
            var index = array[i]
                , next = array[i + 1]
                , last = array[i - 1];

            if (index > next && index > last)
                obj.peaks.push(i);
            else if (index < next && index < last)
                obj.valleys.push(i);
        }
        return obj;
    },

    validateArray: function (array){
        return array.every(validEntry);
    }
};