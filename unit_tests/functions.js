/**
 * 
 * @param {*} a the numerator, must be a number (float or int)
 * @param {*} b the denominator, must be a number (float or int)
 * @returns 
 */
function div (a, b) {

    return a/b;
}
/**
 * 
 * @param {*} text a string of characters
 * @returns returns false if the string is only english letters, true if the string contains a !NaN
 */
function containsNumbers(text) {
    for (let i = 0; i < text.length; i++) {
        if (!isNaN(text.charAt(i))) {
            return true;
        }
    }
    return false;
}

exports.div = div;
exports.containsNumbers=containsNumbers;