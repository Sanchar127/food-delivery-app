import mongoose from "mongoose";
import {User} from '../../models/user'
import { parseArgs } from "util"
const bcrypt = require('bcryptjs');
export async function  POST(req){
    console.log("hello")
    const body= await req.json();
    mongoose.connect(process.env.MONGO_URL)
    const pass =body.password;
    if(!pass?.length || pass.length<5){
        new Error('password must be at least 5 charcters ')
    }

    const nothashPassword = pass;
    var salt = bcrypt.genSaltSync(10);
   body.password = bcrypt.hashSync(nothashPassword, salt);
   const createdUser= await User.create(body)

    return Response.json(createdUser);
}