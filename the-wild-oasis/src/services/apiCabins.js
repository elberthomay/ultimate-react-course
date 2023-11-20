import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) throw new Error("Failed fetching cabins");
  else return data;
}

//input: image: string || fileObject
// return: imageName: undefined if input is string, generated image name otherwise
// return: imageUrl: input if string, convert fileObject to supabase image url otherwise
function convertToImageUrl(image) {
  if (typeof image === "string")
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

export async function insertUpdateCabin(cabinData, id = undefined) {
  const isUpdateOperation = Boolean(id);
  const imageData = cabinData.image;
  const { imageName, imageUrl } = convertToImageUrl(imageData);

  let query = supabase.from("cabins");

  if (isUpdateOperation) {
    query = query.update({ ...cabinData, image: imageUrl }).eq("id", id);
  } else {
    query = query.insert([{ ...cabinData, image: imageUrl }]);
  }

  const { data, error } = await query.select().single();

  if (error)
    throw new Error(
      isUpdateOperation ? "Failed updating cabin" : "Failed creating cabin"
    );

  if (imageName) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, imageData, {
        cacheControl: "3600",
        upsert: false,
      });

    if (storageError)
      throw new Error(
        isUpdateOperation ? "Failed updating cabin" : "Failed creating cabin"
      );
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) throw Error("Failed deleting cabin");
  else return { status: "success" };
}
