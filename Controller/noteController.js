var noteServices = require("../Services/noteServices");


exports.createNoteController = async (req, res) => {
  console.log("in ctrl note");
  let responseResult = {};
  try {
    req.checkBody("title", "title must be valid").isLength({ min: 3 }),
      req
        .checkBody("discription", "discription must be valid")
        .isLength({ min: 3 });
    var errors = req.validationErrors();
    if (errors) {
      responseResult.err = errors;
      responseResult.status = false;
      res.status(400).send(responseResult);
    }

    if (!errors) {
      let noteData = {
        userId: req.decoded,
        title: req.body.title,
        discription: req.body.discription
      };
      await noteServices
        .createNoteService(noteData)
        .then(response => {
          res.send(response);
        })
        .catch(err => {
          res.status(422).send(err);
        });
    }
  } catch (err) {
    responseResult.err = err;
    responseResult.status = false;
    res.status(500).send(responseResult);
  }
};

exports.updateNoteController = async (req, res) => {
  let responseResult = {};
  try {
    console.log("in update note ctrl");

    req.checkBody("title", "title must be valid").isLength({ min: 3 }),
      req
        .checkBody("discription", "discription must be valid")
        .isLength({ min: 3 });
    var errors = req.validationErrors();
    if (errors) {
      responseResult.err = errors;
      responseResult.status = false;
      res.status(400).send(responseResult);
    }
    if (!errors) {
      let data = {
        userData: {
          userId: req.decoded,
          noteId: req.params.noteId
        },
        updateData: {
          title: req.body.title,
          discription: req.body.discription
        }
      };
      console.log("data in controller", data);

      await noteServices
        .updateNoteService(data)
        .then(response => {
          res.send(response);
        })
        .catch(err => {
          res.send(err);
        });
    }
  } catch (err) {
    responseResult.err = err;
    responseResult.status = false;
    res.status(500).send(responseResult);
  }
};

exports.deleteNoteController = async (req, res) => {
  let responseResult = {};
  try {
    let noteData = {
      userId: req.decoded,
      noteId: req.body.noteId
    };
    console.log("in delet ctrl", noteData.noteId);

    await noteServices
      .deleteNoteServices(noteData)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.send(err);
      });
  } catch (err) {
    responseResult.err = err;
    responseResult.status = false;
    res.status(500).send(responseResult);
  }
};

exports.getAllNoteController = async (req, res) => {
  let responseResult = {};
  try {
    let data = {
      userId: req.decoded
    };
    // console.log("data in controller", data);

    await noteServices
      .getAllNoteServices(data)
      .then(response => {
        // console.log("response in contrl", response);

        res.send(response);
      })
      .catch(err => {
        res.send(err);
      });
  } catch (err) {
    responseResult.err = err;
    responseResult.status = false;
    res.status(500).send(responseResult);
  }
};

exports.changeColorController = async (req, res) => {
  console.log("in change clr", req.body._id);

  let responseResult = {};
  try {
    req.checkBody("color", "color required").isLength({ min: 3 });
    var errors = req.validationErrors();
    if (errors) {
      responseResult.err = errors;
      responseResult.status = false;
      res.status(400).send(responseResult);
    }
    if (!errors) {
      let data = {
        userData: {
          userId: req.decoded,
          noteId: req.body._id
        },
        updateData: {
          color: req.body.color
        }
      };
      console.log("data", req.body.color);

      await noteServices
        .changeColorService(data)
        .then(response => {
          res.send(response);
        })
        .catch(err => {
          res.send(err);
        });
    }
  } catch (err) {
    responseResult.err = err;
    responseResult.status = false;
    res.status(500).send(responseResult);
  }
};

exports.addRemainderController = async (req, res) => {
  let responseResult = {};
  try {
    let data = {
      userData: {
        userId: req.decoded,
        noteId: req.body._id
      },
      updateData: {
        remainder: req.body.remainder
      }
    };
    console.log("in change ctrl", data.updateData.remainder);
    await noteServices
      .addRemainderServices(data)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.send(err);
      });
  } catch (err) {
    responseResult.err = err;
    responseResult.status = false;
    res.status(500).send(responseResult);
  }
};

exports.trashNoteController = async (req, res) => {
  let responseResult = {};
  try {
    let data = {
      userData: {
        userId: req.decoded,
        noteId: req.params.noteId
      },
      updateData: {
        isTrash: req.body.isTrash
      }
    };
    await noteServices
      .trashNoteServices(data)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.send(err);
      });
  } catch (err) {
    responseResult.err = err;
    responseResult.status = false;
    res.status(500).send(responseResult);
  }
};

exports.archiveNoteController = async (req, res) => {
  let responseResult = {};
  try {
    let data = {
      userData: {
        userId: req.decoded,
        noteId: req.body._id
      },
      updateData: {
        isArchive: req.body.isArchive
      }
    };
    await noteServices
      .archiveNoteServices(data)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.send(err);
      });
  } catch (err) {
    responseResult.err = err;
    responseResult.status = false;
    res.status(500).send(responseResult);
  }
};

exports.removeRemainderController = async (req, res) => {
  let responseResult = {};
  console.log("data i remove remainder ctrl", req.body);

  try {
    let data = {
      userData: {
        userId: req.decoded,
        noteId: req.body._id
      },
      updateData: {
        remainder: (req.body.remainder)
      }
    }
    console.log("datat in rem remainder ctrl");

    await noteServices
      .removeRemainderService(data)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.send(err);
      });
  } catch (err) {
    responseResult.err = err;
    responseResult.status = false;
    res.status(500).send(responseResult);
  }
};

exports.unTrashController = async (req, res) => {
  let responseResult = {};
  try {
    let data = {
      userData: {
        userId: req.decoded,
        noteId: req.params.noteId
      },
      updateData: {
        isTrash: req.body.isTrash
      }
    };
    await noteServices
      .unTrashServices(data)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.send(err);
      });
  } catch (err) {
    responseResult.err = err;
    responseResult.status = false;
    res.status(500).send(responseResult);
  }
};

exports.unArchiveNoteController = async (req, res) => {
  let responseResult = {};
  try {
    let data = {
      userData: {
        userId: req.decoded,
        noteId: req.body._id
      },
      updateData: {
        isArchive: req.body.isArchive
      }
    };
    await noteServices
      .unArchiveNoteServices(data)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.send(err);
      });
  } catch (err) {
    responseResult.err = err;
    responseResult.status = false;
    res.status(500).send(responseResult);
  }
};

exports.listingNotesController = async (req, res) => {
  let responseResult = {};
  try {
    console.log("req.query", req.query);

    if ("isTrash" in req.query || "isArchive" in req.query) {
      var request =
        Object.keys(req.query)[0] == "isTrash"
          ? { userId: req.decoded, isTrash: true }
          : Object.keys(req.query)[0] === "isArchive"
            ? { userId: req.decoded, isArchive: true }
            : new Error("bad request");
    }
    console.log("resques====", request);
    await noteServices
      .listingNotesServices(request)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.send(err);
      });
  } catch (err) {
    responseResult.err = err;
    responseResult.status = false;
    res.status(500).send(responseResult);
  }
};

exports.getAllTrashedController = async (req, res) => {
  let responseResult = {};
  try {
    let data = {
      userId: req.decoded,
      isTrash: true
    };
    console.log("data in controller", data);

    await noteServices
      .getAllTrashNoteServices(data)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.send(err);
      });
  } catch (err) {
    responseResult.err = err;
    responseResult.status = false;
    res.status(500).send(responseResult);
  }
};

exports.getAllArchiveController = async (req, res) => {
  let responseResult = {};
  try {
    let data = {
      userId: req.decoded,
      isArchive: true
    };
    await noteServices
      .getAllArchiveNoteServices(data)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.send(err);
      });
  } catch (err) {
    responseResult.err = err;
    responseResult.status = false;
    res.status(500).send(responseResult);
  }
};

exports.addLableToNoteController = async (req, res) => {
  let responseResult = {};
  try {
    let data = {
      userData: {
        userId: req.decoded,
        noteId: req.body._id
      },
      updateData: {
        label: req.body.label
      }
    };
    await noteServices
      .addLabelToNoteServices(data)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.send(err);
      });
  } catch (err) {
    responseResult.err = err;
    responseResult.status = false;
    res.status(500).send(responseResult);
  }
};

exports.removeLabelFromNoteController = async (req, res) => {
  let responseResult = {};
  try {
    let data = {
      userData: {
        userId: req.decoded,
        noteId: req.body.noteId
      },
      updateData: {
        labelId: req.params.labelId
      }
    };
    await noteServices
      .removeLabelFromNoteServices(data)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.send(err);
      });
  } catch (err) {
    responseResult.err = err;
    responseResult.status = false;
    res.status(500).send(responseResult);
  }
};

exports.getAllRemainderController = async (req, res) => {
  let responseResult = {};
  try {
    let data = {
      userId: req.decoded
    };
    await noteServices
      .getAllRemainderServices(data)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.send(err);
      });
  } catch (err) {
    responseResult.err = err;
    responseResult.status = false;
    res.status(500).send(responseResult);
  }
};


exports.addCollabrator = async (req, res) => {
  let data = {
    userData: {
      userId: req.decoded,
      noteId: req.body.noteId
    },
    updateData: {
      $push: { collabrator: req.body.collabrator }
    }
  }
  await noteServices
    .addCollabratorServices(data)
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      res.send(err);
    })
}
exports.removeCollabrator = async (req, res) => {
  let data = {
    userData: {
      userId: req.decoded,
      noteId: req.body.noteId
    },
    updateData: {
      $pull: { collabrator: req.body.collabrator }
    }
  }
  await noteServices
    .addCollabratorServices(data)
    .then(response => {
      console.log("in romove collab", response);

      res.send(response);
    })
    .catch(err => {
      res.send(err);
    })
}
