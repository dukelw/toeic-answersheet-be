const UploadService = require("../services/upload");

class UploadController {
  async upload(req, res, next) {
    const result = await UploadService.uploadImageFromUrl();
    res.status(200).send(result);
  }

  async uploadThumb(req, res, next) {
    const {
      file,
      body: { folderName },
    } = req;
    console.log("File:::", file, folderName);
    if (!file) throw new Error("File missing");
    const result = await UploadService.uploadImageFromLocal({
      path: file.path,
      folderName: folderName,
      name: file.filename,
    });
    res.status(200).send(result);
  }

  async uploadAudio(req, res, next) {
    const { file } = req;
    console.log("Audio:::", file);
    if (!file) throw new Error("File missing");
    const result = await UploadService.uploadAudioFromLocal(file.path);
    return res.status(200).send(result);
  }
}

module.exports = new UploadController();
