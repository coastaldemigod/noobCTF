const Contest = require('../../models/contest');

async function contest(req, res, next) {

    try {
        const idd = req.params['cid'];
        // console.log(idd);
        let data = await Contest.findOne({ contest_ID: idd });
        if (data) {
            data = {
                contest_ID: data['contest_ID'],
                contest_name: data['contest_name'],
                start_time: data['start_time'],
                end_time: data['end_time']
            };
            return res.status(200).json(data);
        }
        return res.status(404).json('Invalid contest ID');
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ 'message': 'server on fire' });
    }


}
module.exports = contest;