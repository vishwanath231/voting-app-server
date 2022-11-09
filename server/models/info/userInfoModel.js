import mongoose, { Schema } from 'mongoose';



const userInfoSchema = Schema({
   
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reg_no:{
        type: String,
        required: true
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


const UserInfo = mongoose.model('User_Info', userInfoSchema);

export default UserInfo;