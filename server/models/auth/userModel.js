import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    
    reg_no: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: null 
    },
    phone_no: {
        type: Number,
        default: null, 
    },
    code: {
        type: Number,
        default: 0,
    },
    code_verification: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        required: true,
        default: 'user' 
    }

},{
    timestamps: true
})

const User = mongoose.model('User', userSchema);

export default User;