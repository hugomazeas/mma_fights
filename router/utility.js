
function handleResponse(path, req, res, data) {
    data.xhr = req.xhr;
    res.cookie('last_visited', path, { maxAge: 900000})
    res.cookie('event', data?.event, { maxAge: 900000})
    res.cookie('organisation', data?.organisation, { maxAge: 900000})
    res.render(path, data);
}
exports.handleResponse = handleResponse;