var labelModel = require('../Models/labelModel')

class labelServices {

    async createLabelServices(data) {
        let dataToFind = {
            lable: {
                label: data.label
            },
            note: {
                noteId: data.noteId
            }
        }
        let result = await labelModel.find(dataToFind.lable)
        console.log("result in ser", result);
        return await labelModel.createLabel(data)
    }

    async getLabelServices(data) {
        let dataToFind = {
            lable: data.noteId
        }
        return await labelModel.getLabel(dataToFind)
    }

    async updateLabelServices(data) {

        return await labelModel.update(data)
    }

    async deleteNoteServices(data) {
        return await labelModel.delete(data)
    }


}

module.exports = new labelServices