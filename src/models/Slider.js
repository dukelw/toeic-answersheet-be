const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Slider";
const COLLECTION_NAME = "Sliders";

var sliderSchema = new Schema(
  {
    slider_collection: {
      type: String,
      required: true,
    },
    slider_content: {
      type: String,
      default: "",
    },
    slider_image: {
      type: String,
      default: "",
    },
    slider_link: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = {
  SliderModel: model(DOCUMENT_NAME, sliderSchema),
};
