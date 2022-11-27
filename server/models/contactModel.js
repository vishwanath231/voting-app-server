import mongoose, { Schema } from 'mongoose';


const contactSchema = new Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId
    },
    username:{
       type: String,
       required: true
    },
    email: {
       type: String,
       required: true
    },
    subject: {
        type: String,
        required: true
    },
    message:{
       type: String,
       required: true
    }
},{
    timestamps: true
})

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
