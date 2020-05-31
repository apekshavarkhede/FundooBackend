var mongoose = require('mongoose');

const labelSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'userId required'],
        ref: 'userSchema'
    },

    label: {
        type: String,
        required: [true, 'label required']
    },
})


const labels = mongoose.model('label', labelSchema,'label')

class labelModel {

    async find(data) {
        let result = await labels.find(data)
        console.log("result ==", result);
        return result
    }

    async createLabel(data) {
        let labelData = new labels(data)
        console.log("data.noteId", data.noteId);
        if (data.noteId) {
            let result = await labelData.save()
            return ({ sucess: true, message: "label created and populate", data: result })
        }
        let resultOfCreatingLabel = await labelData.save()
        if (resultOfCreatingLabel != null) {
            return ({ sucess: true, message: "label created", data: resultOfCreatingLabel })
        }
        return ({ sucess: false, message: "err while creating label" })
    }

    async getLabel(data) {
        let result = await labels.find(data.lable)
        if (result != null) {
            return ({ sucess: true, data: result })
        }
        return ({ sucess: false, message: "no label found" })
    }

    async update(data) {
        let result = await labels.update({ _id: data.userData.labelId }, { $set: data.updateData })
        if (result != null) {
            return ({ sucess: true, message: "label updated", data: result })
        }
        return ({ sucess: false })
    }

    async delete(data) {
        let result = await labels.findOneAndDelete({ _id: data.labelId })
        if (result != null) {
            return ({ sucess: true, message: "lable deleted" })
        }
        return ({ sucess: false })
    }



}

module.exports = new labelModel