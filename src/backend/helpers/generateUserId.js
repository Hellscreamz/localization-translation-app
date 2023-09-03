/**
* @summary Function to generate a unique user ID
* @return {string} unique user ID.
*/
// Can be used UUID library for generation of UUID v4, i just decide to write my custom implementation
function generateUniqueUserId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

module.exports = {
    generateUniqueUserId
}