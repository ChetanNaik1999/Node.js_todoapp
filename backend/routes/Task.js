const express=require('express');
const { createNewNote, getMyNotes, deleteTask, updateTask } = require('../controllers/Task');
const { isAuthenticated } = require('../middlewares/auth');
const router=express.Router();


router.route('/newnote').post(isAuthenticated,createNewNote);
router.route('/mynotes').get(isAuthenticated,getMyNotes);
router.route('/deletetask/:id').delete(isAuthenticated,deleteTask);
router.route('/updatetask/:id').put(isAuthenticated,updateTask);
module.exports=router;