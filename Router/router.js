var express = require('express');
var router = express.Router()
var userController = require('../Controller/userController');
var noteController = require('../Controller/noteController')
var auth = require('../authentication/authentication')
var redisAuth = require('../authentication/redisAuthentication')
var labelController = require('../Controller/labelController')
var redisControl = require('../Controller/cacheController')
var elasticSearch = require('../Controller/searchController')
console.log("in routes");

router.post('/register', userController.registerControl)

router.post('/login', userController.loginControl)

router.get('/registerVerify/:token', auth.authentication, userController.verifyUserController);

router.post('/forgetPassword', userController.forgetPasswordController);

router.get('/getAllUsers', userController.getAllUserCtrl)

router.post('/changePassword/:token', auth.authentication1, userController.changePasswordController)

router.post('/createNote', redisAuth.redisAuthentication, noteController.createNoteController)

router.post('/updateNote/:noteId', redisAuth.redisAuthentication, noteController.updateNoteController)

router.post('/deleteNote', redisAuth.redisAuthentication, noteController.deleteNoteController)

router.get('/getAllNotes', redisAuth.redisAuthentication, noteController.getAllNoteController)

router.post('/changeColor/noteId', redisAuth.redisAuthentication, noteController.changeColorController)

router.post('/addRemainder', redisAuth.redisAuthentication, noteController.addRemainderController)

router.post('/addCollabrator', redisAuth.redisAuthentication, noteController.addCollabrator)

router.post('/removeCollabrator', redisAuth.redisAuthentication, noteController.removeCollabrator)

router.post('/trashNote/:noteId', redisAuth.redisAuthentication, noteController.trashNoteController)

router.post('/archiveNote', redisAuth.redisAuthentication, noteController.archiveNoteController)

router.post('/removeRemainder/noteId', redisAuth.redisAuthentication, noteController.removeRemainderController)

router.post('/unTrashNote/:noteId', redisAuth.redisAuthentication, noteController.unTrashController)

router.post('/unArchieveNote', redisAuth.redisAuthentication, noteController.unArchiveNoteController)

router.get('/listingNotes', redisAuth.redisAuthentication, noteController.listingNotesController)

router.get('/getAllArchive', redisAuth.redisAuthentication, redisControl.resiCache, noteController.getAllArchiveController)

router.post('/createLabel', redisAuth.redisAuthentication, labelController.createLabelController)

router.get('/getLabel', redisAuth.redisAuthentication, labelController.getLabelController)

router.post('/updateLabel/:labelId', redisAuth.redisAuthentication, labelController.updateLabelController)

router.post('/deleteLabel/:labelId', redisAuth.redisAuthentication, labelController.deleteLabelController)

router.post('/addLableToNote', redisAuth.redisAuthentication, noteController.addLableToNoteController)

router.post('/removeLableFromNote/:labelId', redisAuth.redisAuthentication, noteController.removeLabelFromNoteController)

router.get('/getAllRemainder', redisAuth.redisAuthentication, redisControl.resiCache, noteController.getAllRemainderController)

module.exports = router;
