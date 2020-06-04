var mongoose = require("mongoose");
var redis = require("redis");
var client = redis.createClient();
var elasticSearch = require('../Services/elstiSearchService')

const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "userId required"],
    ref: "userSchema"
  },

  label: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "label"
    }
  ],

  title: {
    type: String,
    required: [true, "discription required"]
  },

  discription: {
    type: String,
    required: [true, "discription required"]
  },

  remainder: {
    type: Date,
    default: ""
  },

  collabrator: [{
    type: Object,
    default: ""
  }],

  color: {
    type: String,
    default: "#FFFFFF"
  },

  isArchive: {
    type: Boolean,
    default: false
  },

  isTrash: {
    type: Boolean,
    default: false
  }
});

const note = mongoose.model("note", noteSchema);


class NoteModel {
  async findOne(data) {
    let result = await note.findOne(data).populate('label')
    console.log("result====", result);

    return result;
  }

  async find(data) {
    let result = await note.find(data)
    return result;
  }

  async findAndUpdate(data) {
    let result = await note.findByIdAndUpdate(data._id._id, data.value, { new: true })
    let populateResult = await this.findOne(data._id)
    // if (data.value.$push) {
    //   let labelData = {
    //     label: populateResult.label[0].labelName
    //   }
    //   elasticSearch.addLableToNote(result, labelData)
    // }
    // else {
    elasticSearch.updateDocument(result)
    // }
    return result;
  }

  async findAndDelete(data) {
    let result = await note.findByIdAndDelete(data);
    elasticSearch.deleteDocument(result)
    return result;
  }

  async createNote(data) {
    var noteData = new note(data);
    let resultOfSavingNote = await noteData.save();
    if (resultOfSavingNote != null) {
      elasticSearch.indexExists(resultOfSavingNote)
      return resultOfSavingNote
    }
    return resultOfSavingNote;
  }

  async get(data) {
    let result = await this.find(data)
    client.set(data.userId + "notes", JSON.stringify(result));
    return result;
  }

  async getAll(keyData, data) {
    client.set(keyData, JSON.stringify(data));
    return data;
  }


  async search(data) {
    let resultOfFindingNote = await note.find(
      { 'title': { $regex: data.searchData, $options: 'i' } }
    )
    return resultOfFindingNote
  }
}

module.exports = new NoteModel();
