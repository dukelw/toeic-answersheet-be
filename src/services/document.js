const { DocumentModel } = require("../models/Document");

class DocumentService {
  add = async ({ name, content, image, link }) => {
    const foundDocument = await DocumentModel.findOne({ document_name: name });
    if (foundDocument)
      throw new Error("This document has already have an document!");

    const result = await DocumentModel.create({
      document_name: name,
      document_content: content,
      document_image: image,
      document_link: link,
    });

    return { result };
  };

  update = async (name, bodyUpdate) => {
    const foundDocument = await DocumentModel.findOne({ document_name: name });

    if (!foundDocument) throw new Error("Document not found!");

    const result = await DocumentModel.updateOne(
      { document_name: name },
      { $set: bodyUpdate },
      { upsert: true }
    );

    return { result };
  };

  find = async (ID) => {
    const foundDocument = await DocumentModel.findById(ID);
    if (!foundDocument) throw new Error("Cannot find this document!");

    const answer = {
      _id: foundDocument._id,
      name: foundDocument.document_name,
      content: foundDocument.document_content,
      image: foundDocument.document_image,
      link: foundDocument.document_link,
    };
    return answer;
  };

  findAll = async (keySearch = "") => {
    let foundDocuments;
    if (keySearch) {
      foundDocuments = await DocumentModel.find({
        document_name: { $regex: keySearch, $options: "i" },
      }).sort({
        document_name: 1,
      });
    } else {
      foundDocuments = await DocumentModel.find().sort({
        document_name: 1,
      });
    }
    return foundDocuments;
  };

  delete = async (ID) => {
    const foundDocument = await DocumentModel.findById(ID);
    if (!foundDocument) throw new Error("Cannot find this document!");

    const result = await DocumentModel.deleteOne({ _id: ID });
    return result;
  };
}

module.exports = new DocumentService();
