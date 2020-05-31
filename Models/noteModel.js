var mongoose = require("mongoose");
var redis = require("redis");
var client = redis.createClient();

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
    // console.log("data._id", data._id);
    console.log("data.value", data.value);
    // if(data.value===)
    // if (data.value['$push']) {

    //   let r = await note.updateOne(data._id, data.value).populate('label')
    //   console.log("r====", r);

    //   let x = await note.findOne(data._id)
    //   console.log("x====", x);
    //   return r
    // }
    // else {
    // let resultOfFind= this.findOne
    // console.log("heyyy");
    // let x = await note.findOne(data._id)
    // console.log("x in update model",x);

    let result = await note.findOneAndUpdate(data._id, data.value, { upsert: true })
    // let result = await note.updateOne(data._id, data.value)
    console.log("result in update", result);

    return result;
    // }
  }

  async findAndDelete(data) {
    console.log("in models data", data._id);
    let result = await note.findOneAndDelete(data._id);
    console.log("result of delete", result);

    return result;
  }

  async createNote(data) {
    var noteData = new note(data);
    let resultOfSavingNote = await noteData.save();
    if (data.labelId) {
      noteData.populate('labelId')
      return resultOfSavingNote;
    }
    // labelId
    return resultOfSavingNote;
  }

  async get(data) {
    let result = await this.find(data);
    // console.log("result in get", result);
    client.set(data.userId + "notes", JSON.stringify(result));
    return result;
  }

  async getAll(keyData, data) {
    client.set(keyData, JSON.stringify(data));
    return data;
  }
}

module.exports = new NoteModel();
