import express from "express";
//import multer from 'multer';
//const upload = multer({ storage: multer.memoryStorage() });
import {Logout,Login,Register,createPost,GetEvents, updateEvent,
     deleteEvent, getGallary,gallary, getMember,getDirector,
     editPicture,AllAdmin,AllMember, DeleteAdmin, DeleteMember,AddMember} from "../controller/admincontroller.js"
//import isAuthenticated from "../config/auth.js";
const router =express.Router();
router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);


router.route("/events/create").post(/*isAuthenticated,*/createPost);
router.route("/events/list").get(GetEvents);

router.route("/events/delete/:id").delete(/*isAuthenticated*/deleteEvent);
router.route("/events/updateEvent/:id").put(/*isAuthenticated,*/updateEvent);
router.route("/gallary").post(gallary);
router.route("/getGallary").get(getGallary);
router.route("/getMembers/:team").get(getMember);
router.route("/getDirector/:team").get(getDirector);
router.route("/gallary/:id").put(editPicture);
router.route("/Allmember/list").get(AllMember);
router.route("/Alladmin/list").get(AllAdmin);
router.route("/admin/delete/:id").delete(DeleteAdmin);
router.route("/member/delete/:id").delete(DeleteMember);
router.route("/addmember").put(AddMember);
/*
router.route("/like/:id").put(likeOrDislike);
router.route("/getalltweet/:id").get(isAuthenticated,getAllTweets);*/
export default router;