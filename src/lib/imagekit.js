import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export const uploadProfilePhoto = async (buffer, userId, mimeType) => {
  const ext = mimeType.split("/")[1] || "jpg";
  const fileName = `avatar_${userId}.${ext}`;
  const response = await imagekit.upload({
    file: buffer,
    fileName,
    folder: "/shebalink/avatars",
    useUniqueFileName: false,
    transformation: {
      pre: "w-400,h-400,c-maintain_ratio,fo-auto",
    },
    tags: ["avatar", "shebalink"],
  });

  return response.url;
};
export default imagekit;
