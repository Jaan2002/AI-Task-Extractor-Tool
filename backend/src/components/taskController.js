const { processText } = require("../services/taskService");

const extractTasks = async(req,res)=>{
    try{
         const {text,source} = req.body;

         //Validation
         if(!text || text.trim() === ""){
            return res.status(400).json({
                success :false,
                message:"Text input is required"
            });
         }

         const result = await processText(text,source);
        //  console.log("FINAL RESULT:", result);
         res.json({
            success: true,
            data: result
         });
    }catch(error){
        console.error("Error:",error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    } 
};

module.exports={extractTasks};