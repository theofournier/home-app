import imageCompression from "browser-image-compression";

export const compressPhoto = async (photo: File) => {
  console.log(`${photo.name} original size ${photo.size / 1024 / 1024} MB`);

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(photo, options);
    console.log(
      `${photo.name} compressed size ${compressedFile.size / 1024 / 1024} MB`
    );

    return compressedFile;
  } catch (error) {
    console.log(`Error compressing file ${photo.name}`, error);
  }
};
