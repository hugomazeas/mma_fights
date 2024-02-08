function isRequestHTTPS(req) {
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        // AJAX Request, return partial content
        return false;
    } else {
        return true;
    }
}
module.exports.isRequestHTTPS = isRequestHTTPS;