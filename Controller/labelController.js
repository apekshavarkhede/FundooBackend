var labelServices = require('../Services/labelServices')

class labelController {

    async  createLabelController(req, res) {
        let responseResult = {}
        try {
            req.checkBody('label', 'label must be valid').isLength({ min: 1 })
            var errors = req.validationErrors();
            if (errors) {
                responseResult.err = errors;
                responseResult.status = false;
                res.status(400).send(responseResult)
            }
            if (!errors) {
                let data = {
                    "userId": req.decoded,
                    "label": req.body.label,
                    "noteId":req.body.noteId
                    // "noteId": req.body.noteId
                }
                console.log("dat in ");
                
                await labelServices.createLabelServices(data).then((response) => {
                    res.send(response)
                }).catch((err) => {
                    res.send(err)
                })
            }
        }
        catch (err) {
            responseResult.err = err;
            responseResult.status = false;
            res.status(500).send(responseResult)
        }
    }

    async getLabelController(req, res) {
        let responseResult = {}
        try {
            let data = {
                "userId": req.decoded,
                "noteId": req.body.noteId
            }
            await labelServices.getLabelServices(data).then((response) => {
                res.send(response)
            }).catch((err) => {
                res.send(err)
            })
        }
        catch (err) {
            responseResult.err = err;
            responseResult.status = false;
            res.status(500).send(responseResult)
        }
    }

    async updateLabelController(req, res) {
        let responseResult = {}
        try {

            
            let data = {
                "userData": {
                    "userId": req.decoded,
                    "labelId": req.params.labelId
                },
                "updateData": {
                    "label": req.body.label
                }
            }
            await labelServices.updateLabelServices(data).then((response) => {
                res.send(response)
            }).catch((err) => {
                res.send(err)
            })
        }
        catch (err) {
            responseResult.err = err;
            responseResult.status = false;
            res.status(500).send(responseResult)
        }
    }

    async deleteLabelController(req, res) {
        let responseResult = {}
        try {
            let data = {
                "userId": req.decoded,
                "labelId": req.params.labelId
            }
            await labelServices.deleteNoteServices(data).then((response) => {
                res.send(response)
            }).catch((err) => {
                res.send(err)
            })

        }
        catch (err) {
            responseResult.err = err;
            responseResult.status = false;
            res.status(500).send(responseResult)
        }
    }



}

module.exports = new labelController;