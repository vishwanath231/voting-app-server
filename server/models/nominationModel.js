import mongoose, { Schema } from 'mongoose';


const nominationSchema = new Schema({

    profile:{
        type: String
    },
    reg_no: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone_no:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    birth_date:{
        type: String,
        required: true
    },
    parent_name:{
        type: String,
        required: true
    },
    community:{
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
    },
    party_logo:{
        type: String,
    },
    party_name:{
        type: String,
        required: true
    },
    profile_cloudinary_id:{
        type: String,
    },
    party_logo_cloudinary_id:{
        type: String,
    }
},{
    timestamps: true
})


const Nomination = mongoose.model("Nomination", nominationSchema);

export default Nomination;