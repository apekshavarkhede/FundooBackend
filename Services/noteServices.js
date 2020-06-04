var noteModel = require("../Models/noteModel");
// var redis = require('../Services/redisService')
var redis = require("redis");
var client = redis.createClient();
var elasticSearch = require('elasticsearch')

class NoteServices {
  async createNoteService(data) {
    // console.log("data in services", data);s

    let dataToFind = { title: data.title };
    let result = await noteModel.findOne(dataToFind);

    let Note = {
      userId: data.userId
    };
    if (result != null) {
      return { success: false, message: "note is already present" };
    }
    if (result === null) {
      let resultOfOfSaving = await noteModel.createNote(data);
      if (resultOfOfSaving != null) {
        await noteModel.get(Note);
        return { success: true, message: "note created", data: data };
      }
      if (resultOfOfSaving === null) {
        return {
          success: false,
          message: "err while creating note",
          data: resultOfSavingNote
        };
      }
    }
  }

  async updateNoteService(data) {
    let dataToUpadate = {
      _id: { _id: data.userData.noteId },
      value: data.updateData,
    };
    let dataOfUser = {
      userId: data.userData.userId
    };
    let resultOfUpdating = await noteModel.findAndUpdate(dataToUpadate);
    console.log("resultOf updating in services", resultOfUpdating);

    if (resultOfUpdating != null) {
      await noteModel.get(dataOfUser);
      return {
        success: true,
        message: "sucessfully updated",
        data: resultOfUpdating
      };
    }
    return { success: false, message: "Error while updating note" };
  }

  async deleteNoteServices(data) {
    let noteToDelete = {
      _id: data.noteId
    };
    let dataOfUser = {
      userId: data.userId
    };
    let result = await noteModel.findAndDelete(noteToDelete);
    console.log("result in services", result);
    if (result != null) {
      // await noteModel.get(dataOfUser);
      return { success: true, message: "note deleted", dataa: result };
    }
    if (result == null) {
      return { success: false, message: "Note not found" };
    }
  }

  async getAllNoteServices(data) {
    let result = await noteModel.get(data);
    // console.log("result in grtALl Note services", result);
    if (result != null) {
      // console.log("result in get all", typeof result);

      return ({ success: true, data: result });
    }
    if (result == null) {
      return { message: "there in no note" };
    }
  }

  async changeColorService(data) {
    let dataToUpadate = {
      _id: { _id: data.userData.noteId },
      value: data.updateData
    };
    let dataOfUser = {
      userId: data.userData.userId
    };
    console.log("dataToUpadate in services", dataToUpadate);

    let result = await noteModel.findAndUpdate(dataToUpadate);
    if (result) {
      await noteModel.get(dataOfUser);
      return { success: true, message: "sucessfully updated", data: result };
    }
    return { success: false, message: "Error while updating note" };
  }

  async addRemainderServices(data) {
    let dataToUpadate = {
      _id: { _id: data.userData.noteId },
      value: data.updateData
    };
    let dataOfUser = {
      userId: data.userData.userId
    };

    let result = await noteModel.findAndUpdate(dataToUpadate);
    console.log("result in rema services", result);

    if (result) {
      await noteModel.get(dataOfUser);
      return ({ success: true, message: "sucessfully updated", data: data });
    }
    return { success: false, message: "Error while updating note" };
  }

  async trashNoteServices(data) {
    let dataToUpadate = {
      _id: { _id: data.userData.noteId },
      value: data.updateData
    };
    let dataOfUser = {
      userId: data.userData.userId
    };
    let result = await noteModel.findAndUpdate(dataToUpadate);

    if (result) {
      await noteModel.getAll(dataOfUser);
      return { success: true, message: "sucessfully updated", data: result };
    }
    return { success: false, message: "Error while updating note" };
  }

  async listingNotesServices(data) {
    let x = Object.keys(data)[1];
    let key = data.userId + Object.keys(data)[1];

    let result = await noteModel.find(data);
    if (result != null) {
      console.log("result in listing services", result);

      let res = await noteModel.getAll(key, result);
      return { success: true, data: res };
    }
    return { success: false, message: "null" };
  }

  async archiveNoteServices(data) {
    let dataToUpadate = {
      _id: { _id: data.userData.noteId },
      value: data.updateData
    };
    let dataOfUser = {
      userId: data.userData.userId
    };
    let result = await noteModel.findAndUpdate(dataToUpadate);
    if (result) {
      await noteModel.get(dataOfUser);
      return { success: true, message: "sucessfully updated", data: result };
    }
    return { success: false, message: "Error while updating note" };
  }

  async removeRemainderService(data) {
    let dataToUpadate = {
      _id: { _id: data.userData.noteId },
      value: data.updateData
    };
    let dataOfUser = {
      userId: data.userData.userId
    };
    let result = await noteModel.findAndUpdate(dataToUpadate);
    if (result) {
      await noteModel.get(dataOfUser);
      return { success: true, message: "sucessfully updated", data: result };
    }
    return { success: false, message: "Error while updating note" };
  }

  async unTrashServices(data) {
    let dataToUpadate = {
      _id: { _id: data.userData.noteId },
      value: data.updateData
    };
    let dataOfUser = {
      userId: data.userData.userId
    };
    let result = await noteModel.findAndUpdate(dataToUpadate);
    if (result) {
      await noteModel.get(dataOfUser);
      return { success: true, message: "sucessfully updated", data: result };
    }
    return { success: false, message: "Error while updating note" };
  }

  async unArchiveNoteServices(data) {
    let dataToUpadate = {
      _id: { _id: data.userData.noteId },
      value: data.updateData
    };
    let dataOfUser = {
      userId: data.userData.userId
    };

    let result = await noteModel.findAndUpdate(dataToUpadate);
    if (result) {
      await noteModel.get(dataOfUser);
      return { success: true, message: "sucessfully updated", data: result };
    }
    return { success: false, message: "Error while updating note" };
  }

  async getAllTrashNoteServices(data) {
    let dataToSearch = {
      userData: {
        userId: data.userId
      },
      key: data.isTrash
    };
    console.log("data in serv", dataToSearch.notedata);
    let result = await noteModel.getAll(dataToSearch);
    console.log("result in services");
    if (result != null) {
      return { success: true, data: result };
    }
    return { success: false, message: "nothing in trash" };
  }

  async getAllArchiveNoteServices(data) {
    let result = await noteModel.get(data);
    if (result != null) {
      return { success: true, data: result };
    }
    return { success: false };
  }

  async addLabelToNoteServices(data) {
    let dataToUpadate = {
      _id: { _id: data.userData.noteId },
      value: { $push: data.updateData }
    };

    let result = await noteModel.findAndUpdate(dataToUpadate);
    if (result.length !== 0) {
      return { success: true, message: "update sucessfully", data: result };
    }
    if (result.length === 0) {
      return { success: false, message: "Err while updating data" };
    }
  }

  async removeLabelFromNoteServices(data) {
    let dataToUpadate = {
      _id: { _id: data.userData.noteId },
      value: { $pull: { labelId: data.updateData.labelId } }
    };
    let result = await noteModel.findAndUpdate(dataToUpadate);
    if (result.nModified === 1) {
      client.set(data.userId + "notes", JSON.stringify(result));
      return { success: true, message: "update sucessfully", data: result };
    }
    if (result.nModified === 0) {
      return { success: false, message: "Err while updating data" };
    }
  }

  async getAllRemainderServices(data) {
    let dataToSearch = {
      userId: data.userId,
      remainder: { $ne: null }
    };

    let result = await noteModel.get(dataToSearch);
    if (result != null) {
      return { success: true, data: result };
    }
    return { success: false };
  }

  async addCollabratorServices(data) {
    let dataToUpadate = {
      _id: { _id: data.userData.noteId },
      value: data.updateData
    }
    let result = await noteModel.findAndUpdate(dataToUpadate);
    if (result) {
      return ({ success: true, message: "sucessfully updated", })
    }
  }

  async searchService(data) {
    let result = await noteModel.search(data)
    if (result.length > 0) {
      return ({ success: true, message: "Note search", data: result })
    }
    if (result.length === 0) {
      return ({ success: false, message: "No Note Found" })
    }
  }


}


module.exports = new NoteServices();
