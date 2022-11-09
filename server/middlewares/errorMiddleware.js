const notFound  = (req, res, next) => {

    const error = new Error(`Not found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}


const errorHandle = (err, req, res, next) => {

    const stCode = res.statusCode === 200 ? 500 : res.statusCode

    res.status(stCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    })
}


export {
    errorHandle,
    notFound
}