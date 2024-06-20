
function handleResponse(path, req, res, data) {
    const xhr = req.xhr;
    data.xhr = xhr;
    res.render(path, data);
}
exports.handleResponse = handleResponse;