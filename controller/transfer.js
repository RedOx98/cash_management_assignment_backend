const Transfer = require('../models/Transfer');

const updatedTransfer = async (req, res, next) => {
    try {
        const transfer = await Transfer.findByIdAndUpdate(
            req.params.id, {
                $set: req.body
            },
            {new: true}
        )
        res.status(200).json(updatedTransfer);
    } catch (err) {
        next(err);
    }
}