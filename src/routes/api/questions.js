const Questions=require('../../models/question');

async function questions(req,res,next){
    
    // let qn= await Questions.create({
    //     question_ID:'QID1',
    //     contest_ID:'ID1',
    //     question_category:'cat1',
    //     question_name:'the ultimate question 1',
    //     question:'some random question1',
    //     answer:'some random flag1'
    // });
    // res.status(200).json('ookok');

    try{
        const idd = req.params['cid'];
        let data= await Questions.find({contest_ID:idd});
        data=data.map((dt)=>{
            return {
                question_ID:dt.question_ID,
                question_cat:dt.question_category,
                question_name:dt.question_name,
                // question:dt.question
            }
        })
        return res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ 'message': 'server on fire' });
    }
}
module.exports = questions;