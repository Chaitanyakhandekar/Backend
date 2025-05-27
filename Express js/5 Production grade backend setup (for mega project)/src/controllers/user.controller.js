import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from "../utils/apiError.js"
import {ApiResponse} from "../utils/apiResponse.js"
import { User } from '../models/user.model.js'
import {uploadFileOnCloudinary} from '../utils/cloudinary.js'
import {generateAccessAndRefreshToken} from "../utils/generateARTokens.js"

const registerUser = asyncHandler(async (req,res)=>{

                     // Algorithm
                     // get user info from request
                     // validate user info
                     // check if user already exists
                     // check for cover image and avatar
                     // upload them to multer (middleware)
                     // upload them to cloudinary
                     // create user object  - create user entry in DB
                     // remove password and refreshtoken field from response
                     // check if user is created 
                     // return response

   const {username,email,password,fullName} = req.body      // step 1
   console.log("userInfo = ",req.body)


   if(                                                      // step 2
      [username,email,password,fullName].some((field)=>field.trim() === "")
   ){
         throw new ApiError(400,"All fields are required...!")
   }

   const userExisted = await User.findOne(   // returns first occurence of given data     //! step 3
   {
       $or:[{email},{username}]    // if email is not find then it searches for username
   }
   )
   if(userExisted){
      throw new ApiError(409,"User with given data already exists ")
   }
   else{
      console.log("User with given data not exists ")

   }
   
   console.log(req.files)
   const avatarLocalPath = req.files?.avatar[0]?.path;
   const coverImageLocalPath = Array.isArray(req.files?.coverImage) ? req.files.coverImage[0].path : "";
   console.log(avatarLocalPath)
   console.log(coverImageLocalPath)

   if(!avatarLocalPath){
      throw new ApiError(400,"Avatar Image is required")
   }
   let coverImage;
   const avatar = await uploadFileOnCloudinary(avatarLocalPath)            // step 5
   if(coverImageLocalPath){
    coverImage = await uploadFileOnCloudinary(coverImageLocalPath);
   }
   const newUser = await User.create({                      // step 6
      username,
      email,
      fullName,
      password,
      avatar:avatar.url,
      coverImage:coverImage ? coverImage.url : ""
   })


   const createdUser = await User.findById(newUser._id).select("-password -refreshToken")
   
   if(!createdUser){
      throw new ApiError(500,"Something went Wrong!...")
   }

   return res.status(201)
             .json(
      new ApiResponse(201,createdUser,"User created Succesfully.")
   )


})

const loginUser = asyncHandler(async (req,res)=>{
   // ALGORITHM : {  
   // req.body -> data
   // validate data
   // check user exists in database with username or email
   // if not exists then throw error
   // if exists then check password 
   // generate accessToken and refreshToken 
   // store refreshToken in database
   // send accessToken in httpOnly and secure cookie  or (in response body if using mobile application)
   // send success message or response}


   /* TODO: resolve issue of undefined email*/
   // const {email,username,password} = req.body

   const email = 'rohan@gmail.com'
   const username = 'rohan'
   const password = 'chaitanya13114'

   if(!username && !email){
      throw new ApiError(400 , "username or email is required!")
   }

   const user = await User.findOne({
      $or: [{username},{email}]
   })

   if(!user){
      throw new ApiError(401, "User with give data doesnt exists")
   }

   if(!password){
      throw new ApiError(400,"password is required!")
   }

   const isValidPassword = await user.isCorrectPassword(password)

   if(!isValidPassword){
      throw new ApiError(401,"Invalid user credantials")
   }

   const {accessToken , refreshToken} = await generateAccessAndRefreshToken(user._id)

   const options = {
      httpOnly:true,
      secure:true
   }

   return res
      .status(200)
      .cookie("accessToken" , accessToken , options)
      .cookie("refreshToken", refreshToken , options)
      .json({
         user:{            // if using mobile application
            id:user._id,
            username:user.username,
            email:user.email
         },
         accessToken,
         refreshToken
      })
})

const logoutUser = asyncHandler(async (req,res)=>{
   // Algorithm : {
   // req.user -> data
   // clear cookies
   // clear refreshToken from database
   // send success response}

   const options = {
      httpOnly:true,
      secure:true
   }

   const user = await User.findById(req.user._id)
   user.refreshToken = ""
   await user.save({validateBeforeSave:false})

   return res
            .status(200)
            .clearCookie("accessToken",options)
            .clearCookie("refreshToken",options)
            .json(
               new ApiResponse(200,{},"Logout succesfull")
            )
})

export { 
   registerUser,
   loginUser,
   logoutUser
};