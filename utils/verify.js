const jwt = require('jsonwebtoken');

// const verifyToken = async (req, res, next) => {
//     const authHeader = req.headers.token

//     // jwt.sign({ email: req.email, password: req.password });
//     if (authHeader) {
//         const token = authHeader.split(" ")[1];
//         jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//             if (err) res.status(400).json('token is invalid!');
//             req.user = user;
//             next();
//         })
//     } else {
//         return res.status(401).json('You are not authenticated');
//     }
// }


function verifyToken (req, res, next) {
    const authHeader = req.headers['authorization'];
    
    if (typeof authHeader !== 'undefined') {
        const token = authHeader.split(' ')[1];
        req.token = token;
        next();
    } else {
        res.status(403).json('Forbidden');
    }
}


const verifyTokenAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id) {
            next();
        } else {
            res.status(403).json('You are not allowed to do that!');
        }
    })
};

const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id) {
            if (req.user.account_bal > req.body.amount) {
                next();
            } else {
                return next(createError(403, 'you be barao'));
            }
        } else {
            if (err) return next(createError(403, 'You are not authorized!'));
        }
    })
}



module.exports = { verifyToken, verifyTokenAuthorization };