import mongoose, { Schema } from 'mongoose';


const adminInfoSchema = Schema({
   
    admin:{
        type: mongoose.Schema.Types.ObjectId,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_no: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    birth_date: {
        type: String,
        required: true
    },
    community: {
        type: String,
        required: true
    },
    address: {
        city: {
            type: String,
            required: true
        },
        taluk: {
            type: String,
            required: true
        },
        post: {
            type: String,
            required: true
        },
        district: {
            type: String,
            required: true
        },
        pincode: {
            type: Number,
            required: true
        },
    }

},{
    timestamps: true
})


const AdminInfo = mongoose.model('Admin_Info', adminInfoSchema);

export default AdminInfo;