const express=require('express');
const { createUser, login, getMyProfile, logout } = require('../controllers/User');
const { isAuthenticated } = require('../middlewares/auth');
const router=express.Router();


router.route("/register").post(createUser);
router.route("/login").post(login);
router.route("/me").get(isAuthenticated,getMyProfile);
router.route("/logout").get(logout);
module.exports=router;