import mongoose, { Schema } from 'mongoose';


const votingSchema = new Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId
    },
    reg_no:{
       type: String,
       required: true
    },
    gender: {
       type: String,
       required: true
    },
    community: {
        type: String,
        required: true
    },
    location:{
       type: String,
       required: true
    },
    vote: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

const Vote = mongoose.model("Vote", votingSchema);

export default Vote;
