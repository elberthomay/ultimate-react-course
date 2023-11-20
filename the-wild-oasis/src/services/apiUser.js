import supabase, { supabaseUrl } from "./supabase";

function convertToImageUrl(image) {
  console.log(image);
  if (typeof image === "string" || !image)
    return { imageName: undefined, imageUrl: image };
  else {
    const { name: originalImageName } = image;
    const imageName = `${Math.floor(
      Math.random() * 10000000000
    )}-${originalImageName}`.replaceAll("/", "");

    return {
      imageName: imageName,
      imageUrl:
        supabaseUrl + `/storage/v1/object/public/cabin-images/${imageName}`,
    };
  }
}

export default async function updateUser(updateData) {
  const imageData = updateData?.data?.avatar;
  const { imageName, imageUrl } = convertToImageUrl(imageData);
  if (imageName) updateData.data.avatar = imageUrl;

  console.log(updateData);

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);

  if (imageName) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, imageData, {
        cacheControl: "3600",
        upsert: false,
      });

    if (storageError) throw new Error("failed uploading avatar");
  }
  return data;
}
