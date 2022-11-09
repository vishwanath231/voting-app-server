import asyncHandler from 'express-async-handler';
import UserInfo from '../models/info/userInfoModel.js';
import Vote from '../models/voteModel.js';



/**
 * @desc    User gender analysis
 * @method  GET
 * @routes  /api/analysis/userGender
 * @access  private
 */

const userGenderAnalysis = asyncHandler(async (req, res) => {

    const users = await UserInfo.find({});
    
    const male = users.filter((val) => val.gender === "male")
    const female = users.filter((val) => val.gender === "female")
    
    res.status(200).json({
        user:{
            male: male.length,
            female: female.length
        }
    })

})




/**
 * @desc    User location analysis
 * @method  GET
 * @routes  /api/analysis/userLocation
 * @access  private
 */

const userLocationAnalysis = asyncHandler(async (req, res) => {

    const users = await UserInfo.find({});
    
    const district = [];

    users.map(val => {
        if (typeof val.address.district === 'string') {
            district.push(val.address.district.toLowerCase())           
        }
    })

    const obj= {}
       
    for (let i = 0; i < district.length; i++){
       if(obj[district[i]] === undefined){
          obj[district[i]] = 1;
       }else{
          obj[district[i]]++;
       }
    }

    res.status(200).json(obj)
})



/**
 * @desc    User vote count analysis
 * @method  GET
 * @routes  /api/analysis/voteCount
 * @access  private
 */

const voteCountAnalysis = asyncHandler(async (req, res) => {
    const vote = await Vote.find({})

    const hand = vote.filter((val) => val.vote.toLowerCase() === "hand")
    const leaf = vote.filter((val) => val.vote.toLowerCase() === "leaf")
    
    res.status(200).json({
        vote:{
            hand: hand.length,
            leaf: leaf.length
        }
    })
    
})



/**
 * @desc    Vote gender analysis
 * @method  GET
 * @routes  /api/analysis/voteGender
 * @access  private
 */

const voteGenderAnalysis = asyncHandler(async (req, res) => {
    const vote = await Vote.find({})

    const male = vote.filter((val) => val.gender === "male")
    const female = vote.filter((val) => val.gender === "female")
    
    res.status(200).json({
        user:{
            male: male.length,
            female: female.length
        }
    })
})




/**
 * @desc    Hand-Vote gender analysis
 * @method  GET
 * @routes  /api/analysis/handGender
 * @access  private
 */

const handGenderAnalysis = asyncHandler(async (req, res) => {
    const vote = await Vote.find({vote: 'hand'})

    const male = vote.filter((val) => val.gender === "male")
    const female = vote.filter((val) => val.gender === "female")
    
    res.status(200).json({
        user:{
            male: male.length,
            female: female.length
        }
    })
})




/**
 * @desc    Leaf-Vote gender analysis
 * @method  GET
 * @routes  /api/analysis/leafGender
 * @access  private
 */

const leafGenderAnalysis = asyncHandler(async (req, res) => {
    const vote = await Vote.find({vote: 'leaf'})

    const male = vote.filter((val) => val.gender === "male")
    const female = vote.filter((val) => val.gender === "female")
    
    res.status(200).json({
        user:{
            male: male.length,
            female: female.length
        }
    })
})




/**
 * @desc    Vote location analysis
 * @method  GET
 * @routes  /api/analysis/voteLocation
 * @access  private
 */

const voteLocationAnalysis = asyncHandler(async (req, res) => {
    const vote = await Vote.find({})
 
    const district = [];

    vote.map(val => {
        if (typeof val.location === 'string') {
            district.push(val.location.toLowerCase())           
        }
    })

    const obj= {}
       
    for (let i = 0; i < district.length; i++){
       if(obj[district[i]] === undefined){
          obj[district[i]] = 1;
       }else{
          obj[district[i]]++;
       }
    }

    res.status(200).json(obj)
    
    
})




export {
    userGenderAnalysis,
    userLocationAnalysis,
    voteGenderAnalysis,
    voteLocationAnalysis,
    voteCountAnalysis,
    handGenderAnalysis,
    leafGenderAnalysis
};