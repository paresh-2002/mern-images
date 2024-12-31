import mongoose from "mongoose";
import { Image } from "../models/image.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const uploadImage = asyncHandler(async (req, res) => {
  const imageLocalPath = req?.file?.path;
  if (!imageLocalPath) {
    throw new ApiError(401, "Image is required");
  }

  const image = await uploadOnCloudinary(imageLocalPath);
  if (!image) {
    throw new ApiError(401, "Image upload failed");
  }

  const uploadedImage = await Image.create({
    image: image?.url,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, uploadedImage, "Uploaded image successfully"));
});

const getallImages = asyncHandler(async (req, res) => {
  try {
    const image = await Image.find();
    res.json(image);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

const deleteImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Image Id" });
  }
  try {
    await Image.findByIdAndDelete(id);
    return res
      .status(200)
      .json(new ApiResponse(200, { message: "image Deleted successfully" }));
  } catch (error) {
    console.log("Error in deleting product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});



export { uploadImage, getallImages, deleteImage };
