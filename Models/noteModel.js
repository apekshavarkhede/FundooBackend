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
    console.log("data", data);
    let result = await note.findOne(data).populate('labels')
    console.log("result in findOne models", result);
    return result;
  }

  async find(data) {
    let result = await note.find(data).populate('label')
    return result;
  }

  async findAndUpdate(data) {
    let result = await note.findOneAndUpdate(data._id, data.value, { upsert: true })
    return result;
  }

  async findAndDelete(data) {
    let result = await note.findOneAndDelete(data._id);
    return result;
  }

  async createNote(data) {
    var noteData = new note(data);
    let resultOfSavingNote = await noteData.save();
    console.log("1111", resultOfSavingNote);
    if (resultOfSavingNote != null) {
      await elasticSearch.addDocument(data)
    }
    return resultOfSavingNote;
  }

  async get(data) {
    let result = await this.find(data);
    client.set(data.userId + "notes", JSON.stringify(result));
    return result;
  }

  async getAll(keyData, data) {
    client.set(keyData, JSON.stringify(data));
    return data;
  }
}

module.exports = new NoteModel();
