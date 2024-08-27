const { SliderModel } = require("../models/Slider");

class SliderService {
  add = async ({ collection, content, image, link }) => {
    let isActive = false;
    const foundCollection = await SliderModel.findOne({
      slider_collection: collection,
    });
    if (foundCollection) {
      isActive = foundCollection.isActive;
    }
    const result = await SliderModel.create({
      slider_collection: collection,
      slider_content: content,
      slider_image: image,
      slider_link: link,
      isActive,
    });

    return { result };
  };

  update = async (ID, bodyUpdate) => {
    const foundSlider = await SliderModel.findById(ID);

    if (!foundSlider) throw new Error("Slider not found!");

    const result = await SliderModel.updateOne(
      { _id: ID },
      { $set: bodyUpdate },
      { upsert: true }
    );

    return { result };
  };

  changeStatus = async (collection, activate = true) => {
    await SliderModel.updateMany({}, { isActive: !activate });

    const result = await SliderModel.updateMany(
      { slider_collection: collection },
      { isActive: activate }
    );

    return { result };
  };

  find = async (ID) => {
    const foundSlider = await SliderModel.findById(ID);
    if (!foundSlider) throw new Error("Slider not found!");

    const slider = {
      _id: foundSlider._id,
      collection: foundSlider.slider_collection,
      content: foundSlider.slider_content,
      image: foundSlider.slider_image,
      link: foundSlider.slider_link,
    };
    return slider;
  };

  findAll = async () => {
    const foundSliders = await SliderModel.find().sort({
      slider_collection: 1,
    });
    return foundSliders;
  };

  findActive = async () => {
    const foundSliders = await SliderModel.find({
      isActive: true,
    });
    return foundSliders;
  };

  findCollections = async (keySearch = "") => {
    const collections = await SliderModel.aggregate(
      [
        {
          $group: {
            _id: "$slider_collection",
            isActive: { $first: "$isActive" },
          },
        },
        {
          $project: {
            slider_collection: "$_id",
            isActive: 1,
            _id: 0,
          },
        },
        keySearch
          ? {
              $match: {
                slider_collection: { $regex: keySearch, $options: "i" },
              },
            }
          : null,
      ].filter(Boolean)
    ).sort({ slider_collection: -1 });

    return collections;
  };

  findByCollection = async (collection) => {
    const foundSliders = await SliderModel.find({
      slider_collection: collection,
    });
    if (!foundSliders) throw new Error("Sliders not found!");

    return foundSliders;
  };

  delete = async (ID) => {
    const foundSlider = await SliderModel.findById(ID);
    if (!foundSlider) throw new Error("Cannot find slider!");

    const result = await SliderModel.deleteOne({ _id: ID });
    return result;
  };

  deleteCollection = async (collection) => {
    const result = await SliderModel.deleteMany({
      slider_collection: collection,
    });
    return result;
  };
}

module.exports = new SliderService();
