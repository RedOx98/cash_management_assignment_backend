const router = require("express").Router();
const {checkVerified, verifyMail} = require('../controller/user');

router.post('/', checkVerified);
// router.get("/:id/verify/:token", checkVerified);
router.get('/:id/verify/:token', verifyMail);

module.exports = router;