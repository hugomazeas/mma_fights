const utility = (req, res, next) => {
    res.locals.capitalize_first_letter = capitalize_first_letter;
    res.locals.to_MM_SS_MS = to_MM_SS_MS;
    res.locals.format_seconds = format_seconds;
    res.locals.getRandomNumber = getRandomNumber;
    next();
    
};

function capitalize_first_letter(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function to_MM_SS_MS(milliseconds) {
    let minutes = Math.floor(milliseconds / 60000);
    let remainingSeconds = Math.floor((milliseconds % 60000) / 1000);
    let remainingMilliseconds = milliseconds % 1000;
    let formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
    let formattedMilliseconds = remainingMilliseconds < 10 ? '00' + remainingMilliseconds : remainingMilliseconds < 100 ? '0' + remainingMilliseconds : remainingMilliseconds;
    return minutes + ":" + formattedSeconds + "." + formattedMilliseconds;
}
function format_seconds(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    let formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
    return minutes + ":" + formattedSeconds;
}
function getRandomNumber() {
    return Math.floor(Math.random() * 999999) + 1;
}
module.exports = utility;
