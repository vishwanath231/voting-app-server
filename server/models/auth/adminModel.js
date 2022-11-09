import mongoose, { Schema } from 'mongoose';

const adminSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'admin' 
    }

},{
    timestamps: true
})

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;