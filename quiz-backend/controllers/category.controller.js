import { Category } from "../models/category.model.js"
import { Level } from "../models/level.model.js"
import { Question } from "../models/question.model.js"

const createCategory = async (req,res) => {
   try {
     const { name, description,topicsCovered } = req.body 
 
     if(!name || !description || !topicsCovered){
         return res.status(400)
         .json({message:"All fields are required!"})
     }
 
     const existedCategory = await Category.findOne({ name })
 
     if(existedCategory){
         return res.status(400)
         .json({message: "Category already exists"})
     }
 
     const category = await Category.create({
         name,
         description,
         topicsCovered: topicsCovered || []
     })
 
     return res.status(201).json({
         success: true,
         category,
         message: "Category created successfully"
     })
 
   } catch (error) {
        res.status(500)
        .json({
            success: false,
            message: "Error while creating the category",
            error: error.message,
        })
   }
    
}

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

     const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        // 1️⃣ Category ke sare levels nikal lo
        const levels = await Level.find({ category: cat._id }).select("_id");

        // 2️⃣ Levels ke questions count
        const questionCount = await Question.countDocuments({
          level: { $in: levels.map((l) => l._id) },
        });

        return { ...cat.toObject(), totalQuestions: questionCount };
      })
    );

    return res.status(200).json({
      success: true,
      categories: categoriesWithCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while fetching categories",
      error: error.message,
    });
  }
};

const updateCategory = async(req,res)=>{
   try{
      const {categoryId} = req.params;
      const {name,description,topicsCovered} = req.body;
      if(!name && !description && !topicsCovered ){
        return res.status(400).json({
          success:false,
          message:"Please enter a field!"
        })
      }
     const existingCategory = await Category.findById(categoryId)
     if(!existingCategory){
      return res.status(400).json({
        success:false,
        message:"Invalid CategoryId"
      })
     }
     if(name) existingCategory.name = name
      if(description) existingCategory.description = description
      if(topicsCovered) existingCategory.topicsCovered = topicsCovered
      await existingCategory.save()

      return res.status(200).json({
        success:true,
        message:"Category updated",
        existingCategory
      })


   }catch(error){
    console.log("error",error)
    return res.status(500).json({
      success:false,
      message:"Error in server while updating categories!",
      error:error.message
    })
   }
}

export { createCategory, getAllCategories, updateCategory}