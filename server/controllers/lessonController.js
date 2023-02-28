
const lessonsDal = require("../dal/lesson-DB-accessor");
//const pricesDal = require("../dal/price-DB-accessor");

class lessonsController {
     getAllLessons=async(req,res)=>{
        const lessons = await lessonsDal.getAllLessons();
    if(!lessons?.length){
        return res.status(400).json({message: 'No reports found'})
    }
    res.json(lessons)
}

// getAllPrices=async(req,res)=>{
//     const prices = await pricesDal.getAllPrices();
// if(!prices?.length){
//     return res.status(400).json({message: 'No reports found'})
// }
// res.json(prices)
// }

    //get lesson by lessonid
    getLessonById=async(req,res)=>{
        const id = req.params.id;
        const lesson = await lessonsDal.getOneLesson(id);
        res.json(lesson)
    }
}

const lessoncontroller = new lessonsController();
module.exports = lessoncontroller;
