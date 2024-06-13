let ignores = [
    '/favicon.ico',
    '/api/navbar_item',
]
const log = (req, res, next) => {
    if (ignores.includes(req.url)) {
        next();
        return;
    }
    console.log('Request:', req.xhr ? 'AJAX' : 'HTTP', req.method, req.url)
    next();
};

module.exports = log;
