import mongoose  from "mongoose";

export const dbConnection=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:'job_seeking_website_mernstack'
    }).then(()=>{
        console.log('connected to database')
    }).catch((err)=>{
        console.log(`some error occured while occuring to database :${err}`)
    })
}


// garvit2205be21
// VzuOzC7ZqME1dRKz


// MONGO_URI=mongodb+srv://garvit2205be21:<password>@cluster0.opbkf.mongodb.net/?retryWrites=true
// mongodb://127.0.0.1:27017