/**
 * Created by Steve on 10/7/2017.
 *
 * description: extends the String class and adds a replaceTokens method
 */

String.prototype.replaceTokens = function (tokens) {
    return this.replace(/\{(\d+?)\}/g, function(match, index){
        return tokens[index];
    });
};