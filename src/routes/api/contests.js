const Contest = require('../../models/contest');

async function contests(req, res, next) {

    // let dt=new Date();
    // let dtt=new Date(dt.getTime()+60*60000);

    // let ct = await Contest.create({
    //     'contest_ID':'ID1',
    //     'contest_name':'contest1',
    //     'creater_email':'test4@test.com',
    //     'start_time':dt,
    //     'end_time':dtt
    // });
    // res.status(200).json('okok');

    try {
        let data = await Contest.find({})
        data = data.map((dt) => {
            return {
                contest_ID: dt['contest_ID'],
                contest_name: dt['contest_name'],
                start_time: dt['start_time'],
                end_time: dt['end_time']
            }
        });
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ 'message': 'server on fire' });
    }



}
module.exports = contests;