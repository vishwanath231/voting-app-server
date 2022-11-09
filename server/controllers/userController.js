import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import nodemailer from 'nodemailer';
import generateToken from '../utils/generateToken.js';
import User from '../models/auth/userModel.js';
import UserInfo from '../models/info/userInfoModel.js';
import Nomination from '../models/nominationModel.js';
import Vote from '../models/voteModel.js';



/**
 * @desc    User login
 * @method  POST
 * @routes  /api/users/login
 * @access  public
 */

const userLogin = asyncHandler(async (req, res) => {

    const { reg_no, password } = req.body;

    if (!reg_no || !password){
        res.status(400)
        throw Error('please add all fields!')
    }

    const isRegNo = await User.findOne({ reg_no: reg_no.toLowerCase() })  
    if (!isRegNo){
        res.status(400)
        throw Error("Register Number doesn't exits!")
    }
    
    const isPassword = await bcrypt.compare(password, isRegNo.password)
    if (!isPassword){
        res.status(400)
        throw Error("Invalid credentials!")
    }
    
    const userId = await UserInfo.find({ user: isRegNo._id })

    let userDOB;

    userId.map(val => {
        userDOB = val.birth_date
    })

    var dob = new Date(userDOB);  
    //calculate month difference from current date in time  
    var month_diff = Date.now() - dob.getTime();  
      
    //convert the calculated difference in date format  
    var age_dt = new Date(month_diff);   
      
    //extract year from date      
    var year = age_dt.getUTCFullYear();  
      
    //now calculate the age of the user  
    const age = Math.abs(year - 1970);
    
    if (age < 17) {
        res.status(400)
        throw Error("You not eligible to vote!, age is must be greater than 18")
    }
    

    res.status(200).json({
        msg: 'Login successful!',
        success: true,
        token: generateToken(isRegNo._id),
        data: {
            id: isRegNo._id,
            reg_no: isRegNo.reg_no,
            role: isRegNo.role
        }
    })

})




/**
 * @desc    User generate otp
 * @method  POST
 * @routes  /api/users/pin
 * @access  public
 */

const generatePin = asyncHandler(async (req, res) => {

    const { email, phone_no , pin } = req.body;


    if (!pin) {
        res.status(400)
        throw Error('Enter two digits number...')
    }

    if (pin.length !== 2) {
        res.status(400)
        throw Error('Only two digits are allowed!')
    }

    const user = await User.findById(req.user._id);
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }

    if (email !== '') {

        const random = Math.floor(Math.random() * 90 + 10)
        const otp = ''+ random + pin;
    
        
        if (email) {
            user.email = email || user.email
        }
        
        if (otp) {
            user.code = otp || user.code
        }
        
        await user.save();
        
        
        const output = `
        <div style="font-family:'Sen',sans-serif;">
            <h3>E-Voting OTP</h3>
            <p style="margin-left: 1rem;">${otp}</p>
        </div>`;

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 465,
            secure: true, // use SSL // true for 465, false for other ports
            auth: {
                user: `vishwanathvishwabai@gmail.com`, // generated ethereal user
                pass: 'fqepeazarrgoydyy'  // generated ethereal password
            },
            tls:{
                rejectUnAuthorized:true
            }
        
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: 'vishwanathvishwabai@gmail.com', // sender address
            to: email, // list of receivers
            subject: 'E-Voting OTP', // Subject line
            text: `Your E-Voting OTP`, // plain text body
            html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(401).json({
                    msg: error
                });
            }
            // console.log('Message sent: %s', info.messageId);   
            // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            if (info) {
                return res.status(200).json({
                    msg: `Message has been sent ${email}`,
                    token: generateToken(user._id),
                    success: true,
                    data: {
                        id: user._id,
                        reg_no: user.reg_no,
                        email: user.email,
                        role: user.role
                    }
                })
            }
        });

    }

    if (phone_no !== '') {
        
        const random = Math.floor(Math.random() * 90 + 10)

        const otp = ''+ random + pin;
    
        console.log("phone");
    
        res.status(200).json(Number(otp))
    }

})




/**
 * @desc    User verify otp
 * @method  POST
 * @routes  /api/users/verify
 * @access  public
 */

const verfiyPin = asyncHandler(async (req, res) => {

    const { pin } = req.body;

    if (pin.length !== 4) {
        res.status(400)
        throw Error('OPT length is 4 digits!')
    }

    const user = await User.findById(req.user._id);
    if (!user) {
        res.status(400)
        throw Error("user doesn't exists!")
    }
    
    const isMatch = await User.findOne({ code: pin})
    if (!isMatch) {
        res.status(400)
        throw Error('Invalid OPT')
    }

    res.status(200).json({
        msg: `verification successful!`,
        token: generateToken(user._id),
        success: true,
        data: {
            id: user._id,
            reg_no: user.reg_no,
            email: user.email,
            phone_no: user.phone_no,
            role: user.role
        }
    })
    
})




/**
 * @desc    User profile
 * @method  GET
 * @routes  /api/users/profile
 * @access  public
 */

const userProfile = asyncHandler(async (req, res) => {

    const user = await UserInfo.find({ user: req.user._id })

    if (!user) {
        res.status(400)
        throw Error("user doesn't exists!") 
    }

    res.status(200).json(user)
})




/**
 * @desc    Get nomination list
 * @method  GET
 * @routes  /api/users/nomination
 * @access  public
 */

const getNominationList = asyncHandler(async (req, res) => {

    const nomination = await Nomination.find({})

    res.status(200).json(nomination)
})




/**
 * @desc    Get individual nomination details
 * @method  GET
 * @routes  /api/users/nomination/:id
 * @access  public
 */

const getNominationById = asyncHandler(async (req, res) => {

    const nominationId = await Nomination.findById(req.params.id)

    if (!nominationId) {
        res.status(400)
        throw Error("Nomination ID doesn't exists!")
    }

    res.status(200).json(nominationId)
})



/**
 * @desc    user vote form
 * @method  POST
 * @routes  /api/users/vote
 * @access  public
 */

const userVote = asyncHandler(async (req, res) => {

    const { id, reg_no, gender, community, location, vote } = req.body;
    
    if(!vote){
       res.status(400)
       throw Error("Vote is required!")
    }

    const isCheck = await Vote.findOne({ reg_no: reg_no })

    if (isCheck) {
        res.status(400)
        throw Error("Register number already exists, you already voted!")
    }

    const voteSaved = new Vote({
        user: id,
        reg_no: reg_no,
        gender: gender,
        community: community,
        location: location,
        vote: vote
    })


    await voteSaved.save()

    res.status(200).json({
        msg: 'voted successful!'
    })

})



export {
    userLogin,
    generatePin,
    verfiyPin,
    userProfile,
    getNominationList,
    getNominationById,
    userVote
};
