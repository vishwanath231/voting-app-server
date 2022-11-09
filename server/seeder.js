import dotenv from 'dotenv';
import color from 'colors';

import connectDB from './config/db.js';

import userLoginData from './data/auth/userLogin.js';
import adminLoginData from './data/auth/adminLogin.js';
import userInfoData from './data/info/userInfo.js';
import adminInfoData from './data/info/adminInfo.js';
import nominationData from './data/nomination.js';


import User from './models/auth/userModel.js';
import Admin from './models/auth/adminModel.js';
import UserInfo from './models/info/userInfoModel.js';
import AdminInfo from './models/info/adminInfoModel.js';
import Nomination from './models/nominationModel.js';
import Vote from './models/voteModel.js';


// confirguration environment
dotenv.config()

// connect the database
connectDB()


// insert datas in a database;
const importData = async () => {

    try {

        // first delete the all collections;
        await User.deleteMany();
        await Admin.deleteMany();
        await UserInfo.deleteMany();
        await AdminInfo.deleteMany();
        await Vote.deleteMany();
        await Nomination.deleteMany()

        // insert user login data in a database
        // insert user login data in a database
        const userLogin = await User.insertMany(userLoginData)

        // insert user information in a databse
        const userInfoArr = [...userInfoData]
        
        for (let i = 0; i < userInfoData.length; i++) {
    
            userInfoArr.push(userInfoData[i].user = userLogin[i]._id)
        }
 
        // remove same id in user_info collection
        userInfoArr.forEach((val) => {
            if (val.user === val.user) {
                return userInfoArr.pop()
            }
        })

        await UserInfo.insertMany(userInfoArr);

        // //insert admin login data in a database
        const adminLogin = await Admin.insertMany(adminLoginData)

        // //insert admin information in a database
        const adminInfoObj = {...adminInfoData, admin: adminLogin[0]._id}

        await AdminInfo.create(adminInfoObj)

        await Nomination.insertMany(nominationData)


        console.log(`Data imported`.bgGreen);
        
    } catch (err) {

        console.log(`${err}`.bgRed);
        process.exit(1)
        
    }
}


// destroy data in a database
const destroyData = async () => {

    try {
        
        // delete all the collections of database
        await User.deleteMany();
        await Admin.deleteMany();
        await UserInfo.deleteMany();
        await AdminInfo.deleteMany();
        await Vote.deleteMany();
        await Nomination.deleteMany()

        console.log(`Data destroyed...!`.bgGreen);

    } catch (err) {
        
        console.log(`${err}`.bgRed);
        process.exit(1)
    }
}



// command line execute this 
if (process.argv[2] === '-d') {
    destroyData() // npm run data:destroy
}else{
    importData() // npm run data:import
}
