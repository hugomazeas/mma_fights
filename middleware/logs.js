const log = (req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
};

module.exports = log;
