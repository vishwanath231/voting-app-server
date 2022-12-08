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


/**
 * @desc    selective location vote count analysis
 * @method  POST
 * @routes  /api/analysis/oneLocation
 * @access  private
 */
 const getSelectiveLocationAnalysis = asyncHandler(async (req, res) => {

    const { location } = req.body;

    if (!location) {
        res.status(400)
        throw Error("Choose location!")
    }

    const vote = await Vote.find({})

    const result = vote.filter(val => val.location.toLowerCase() === location)


    const district = [];

    result.map(val => {
        if (typeof val.location === 'string') {
            district.push(val.vote.toLowerCase())           
        }
    })
    
    const obj = {};

    for (let i = 0; i < district.length; i++){
        if(obj[district[i]] === undefined){
           obj[district[i]] = 1;
        }else{
           obj[district[i]]++;
        }
     }

    res.status(200).json(obj)
})



const getSelectiveLocationGenderAnalysis = asyncHandler(async (req, res) => {

    const { location } = req.body;

    if (!location) {
        res.status(400)
        throw Error("Choose location!")
    }
    const vote = await Vote.find({})

    const result = vote.filter(val => val.location.toLowerCase() === location)

    const leaf = result.filter(val => val.vote === 'leaf');
    const hand = result.filter(val => val.vote === 'hand');

    
    const locLeafGender = [];
    const locHandGender = [];
    
    leaf.map(val => {
        if (typeof val.gender === 'string') {
            locLeafGender.push(val.gender.toLowerCase())           
        }
    })

    hand.map(val => {
        if (typeof val.gender === 'string') {
            locHandGender.push(val.gender.toLowerCase())           
        }
    })

    
    const leafObj = {};
    const handObj = {};

    for (let i = 0; i < locLeafGender.length; i++){
        if(leafObj[locLeafGender[i]] === undefined){
            leafObj[locLeafGender[i]] = 1;
        }else{
            leafObj[locLeafGender[i]]++;
        }
    }


    for (let i = 0; i < locHandGender.length; i++){
        if(handObj[locHandGender[i]] === undefined){
            handObj[locHandGender[i]] = 1;
        }else{
            handObj[locHandGender[i]]++;
        }
    }

    res.status(200).json({
        vote:{
            hand: handObj,
            leaf: leafObj
        }
    })
})



export {
    userGenderAnalysis,
    userLocationAnalysis,
    voteGenderAnalysis,
    voteLocationAnalysis,
    voteCountAnalysis,
    handGenderAnalysis,
    leafGenderAnalysis,
    getSelectiveLocationAnalysis,
    getSelectiveLocationGenderAnalysis
};