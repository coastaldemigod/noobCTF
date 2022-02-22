const Questions = require('../../models/question');
const Solution = require('../../models/solution');

async function submit(req, res, next) {

    try {
        const { contest_ID, question_ID, solution } = req.body;
        if (!(contest_ID && question_ID && solution))
            return res.status(400).json('solution missing');

        let data = await Questions.find({ contest_ID });
        data = data.filter((dt) => (dt.question_ID == question_ID))
        // console.log(data);
        data=data[0];
        
        let data2= await Solution.find({contest_ID})
        data2=data2
        .filter((dt)=>dt.question_ID==question_ID)
        .filter((dt)=>dt.username==req.user.username);
        // console.log(data2)
        
        if(data2.length!=0)
        return res.status(200).json('already submitted');
        
        // console.log(data);
        if(data['answer']==solution)
        {
            const tmp = await Solution.create({
                question_ID,
                contest_ID,
                username:req.user.username
            })
            return res.status(201).json('Solution accepted and response saved')
        }
        return res.status(400).json('Incorrect answer')
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ 'message': 'server on fire' });
    }
}

module.exports = submit;