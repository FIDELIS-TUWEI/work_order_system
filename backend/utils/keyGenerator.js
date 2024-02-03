// utils/keyGenerator
module.exports = function keyGenerator (request, _response) {
    if (!request.ip) {
        console.error('Warning: request.ip is missing!')
        return request.socket.remoteAddress
    }

    return request.ip.replace(/:\d+[^:]*$/, '')
}

