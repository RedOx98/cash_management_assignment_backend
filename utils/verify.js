const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.token
    
        jwt.sign({email: req.email, password: req.password});
        if (authHeader){
            const token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
                if (err) res.status(400).json('token is invalid!');
                req.user = user;
                next();
            })
        }else{
            return res.status(401).json('You are not authenticated');
        }
    }

    const verifyTokenAuthorization = (req, res, next) =>{
        verifyToken(req, res, ()=>{
            if (req.user.id === req.params.id) {
                next();
            }else{
                res.status(403).json('You are not allowed to do that!');
            }
        })
    }
    


module.exports = {verifyToken, verifyTokenAuthorization};