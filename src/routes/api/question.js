const Questions=require('../../models/question');

async function question(req,res,next){
    try{
        const idd = req.params['cid'];
        const qid = req.params['qid'];
        let data= await Questions.find({contest_ID:idd});
        data=data
        .filter((dt)=>(dt.question_ID==qid))
        .map((dt)=>{
            return {
                question_ID:dt.question_ID,
                question_cat:dt.question_category,
                question_name:dt.question_name,
                question:dt.question
            }
        })
        // console.log(data);
        // console.log(data[0]);
        if(data==null)
        return res.status(400).json('Invalid contest id or invalid question id ')
        return res.status(200).json(data[0]);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ 'message': 'server on fire' });
    }
}
module.exports = question;