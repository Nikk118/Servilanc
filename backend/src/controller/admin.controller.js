import {asyncHandler} from "../utils/asyncHandler.js";
import { Admin } from "../models/admin.model.js";
import { genrateToken } from "../utils/generateToken.js";
import { Professional } from "../models/professional.model.js";


const adminSignUp= asyncHandler(async(req,res)=>{

  const {email,username,password,phone}=req.body

    if(!email || !username|| !password || !phone){
      return res.status(400)
      .json(
       { message:"all feilds are required"}
      )
    }

    const adminExists= await Admin.findOne({email})

    if(adminExists){
      return res.status(400)
      .json(
       { message:"admin already exists"}
      )
    }

    const admin= await Admin.create({
      username,
        email,
        password,
        phone
    })

    const createdadmin= await Admin.findById(admin._id).select("-password")
    
        if(createdadmin){
    
            genrateToken(createdadmin._id,res)
            await createdadmin.save()
    
            return res.status(201)
            .json(
                {
                    message:"admin created successfully",
                    professional:createdadmin
                }
            )
        }else{
          return res.status(500)
          .json(
           { message:"internal server error"}
          )
    
        }
    }
      )

const loginAdmin=asyncHandler(async(req,res)=>{
    const {username,password}=req.body

 
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    const loggedinadmin = await Admin.findOne({ username: username });
    
    console.log("1")
    if (!loggedinadmin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log("2")
    
    const isPasswordValid = await loggedinadmin.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log("3")

    genrateToken(loggedinadmin._id, res);

    return res.status(200).json(
      {message:"admin logged in successfully",  admin:loggedinadmin}
    );

})

const logoutAdmin=asyncHandler(async(req,res)=>{
    res.cookie("jwt", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      return res.status(200).json({ message: "Admin logged out successfully" });
})

const getAdmin=asyncHandler(async(req,res)=>{

    return res.status(200).json({message:"Admin fetched successfully",admin:req.admin})
})

const addProfessional= asyncHandler(async(req,res)=>{

   
    const {email,name,password,phone,category}=req.body

      console.log(email,name,password,phone,category)
    if(!email || !name|| !password || !phone || !category){
      return res.status(400)
      .json(
       { message:"all feilds are required"}
      )
    }

     const professionalExists= await Professional.findOne({$or:[{name},{email}]})
    
        if(professionalExists){
          return res.status(400)
          .json(
           { message:"professional already exists"}
          )
        }
    
        const professional= await Professional.create({
            name,
            email,
            password,
            phone,
            category
        })
    
        const createdprofessional= await Professional.findById(professional._id).select("-password")
    
        if(createdprofessional){
    
            genrateToken(createdprofessional._id,res)
            await createdprofessional.save()
    
            return res.status(201)
            .json(
                {
                    message:"professional created successfully",
                    professional:createdprofessional
                }
            )
        }else{
          return res.status(500)
          .json(
           { message:"internal server error"}
          )
    
        }
        
        
    })
export {
    adminSignUp,
    getAdmin,
    loginAdmin,
    logoutAdmin,
    addProfessional
}
