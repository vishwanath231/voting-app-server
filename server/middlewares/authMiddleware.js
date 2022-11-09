import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/auth/userModel.js';
import Admin from '../models/auth/adminModel.js';


const userProtect = asyncHandler(async(req, res, next) => {
    
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        
        try {
            
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select("-password") 

            next()
        } catch (err) {
            
            res.status(401)
            throw Error('Not Authorized, Token Failed')
        }

    }

    if (!token) {
        res.status(401)
        throw Error('Not Authorized, No Token')
    }

})


const adminProtect = asyncHandler(async(req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        
        try {
            
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await Admin.findById(decoded.id).select("-password") 

            if (!req.user && req.user.role !== 'admin') {
                res.status(401)
                throw Error('Not Authorized as an admin, Token Failed')
            }
            
            next()

        } catch (err) {
            
            res.status(401)
            throw Error('Not Authorized as an admin, Token Failed')
        }

    }

    if (!token) {
        res.status(401)
        throw Error('Not Authorized, No Token')
    }

})


export {
   userProtect,
   adminProtect
}
