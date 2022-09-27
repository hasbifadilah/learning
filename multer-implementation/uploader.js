import fs from "fs";

export const uploadToFileStorage = async (file, folderName) => {
  const { buffer, originalName } = file;
  const fileExt = originalName.split(".").pop();
  const publicPath = `./public/`;
  const fileKey = `${folderName}/${+new Date()}.${fileExt}`;

  const isFolderExist = (path) => {
    try {
      return fs.existsSync(path);
    } catch (error) {
      return false;
    }
  };

  if (!isFolderExist(`${publicPath}${folderName}`)) {
    await fs.promises.mkdir(`${publicPath}${folderName}`, { recursive: true });
  }

  await fs.promises.writeFile(`${publicPath}${fileKey}`, buffer);

  return `http://localhost:3000/api/public/${fileKey}`;
};
