const template_suffix = (req, res, next) => {
    res.locals.template_suffix = req.xhr ? 'partial' : '';
    next();
};

module.exports = template_suffix;
