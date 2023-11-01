function logger(req, res, next) {
    console.log(req.method, req.originalUrl)
    console.log('i see ya')
    
    next()
}

module.exports = logger;
