const User = require("../models/User")

//GET ONE
const updatedUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id, {
                $set: req.body
            },
            {new: true}
        )
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err)
    }
}