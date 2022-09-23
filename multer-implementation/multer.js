import multer from "multer";

const extensionList = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "pdf",
  "doc",
  "docx",
  "xlsx",
  "svg",
  "mp4",
  "mkv",
  "m4v",
  "flv",
  "csv",
  "zip",
  "rar",
  "7z",
  "txt",
];

export const multerAny = (extensions = []) => {
  const imageFilter = (req, file, callback) => {
    const regex = new RegExp(`.(${extensions.join("|")})$`);

    if (!regex.test(file.originalname.toLowerCase())) {
      return callback(
        { message: "Only selected file type are allowed" },
        false
      );
    }

    return callback(null, true);
  };

  const multerInstance = multer({
    fileFilter: imageFilter,
  });

  return multerInstance.any();
};

export const getFile = (req, name) => {
  const files = req?.files || {};
  const selectedFile = files[name]?.[0];

  if (selectedFile) {
    const { fieldname, originalname, mimetype, size, buffer } = selectedFile;
    return {
      fieldName: fieldname,
      originalName: originalname,
      mimeType: mimetype,
      size,
      buffer,
    };
  }

  return null;
};

export const getFiles = (req, name) => {
  const files = req?.files || {};
  const selectedFiles = files[name];

  if (selectedFiles) {
    const result = [];

    selectedFiles.forEach((item) => {
      result.push({
        fieldName: item.fieldname,
        originalName: item.originalname,
        mimeType: item.mimetype,
        size: item.size,
        buffer: item.buffer,
      });
    });

    return result;
  }

  return null;
};

export const parseFile = (file) => {
  if (file) {
    const { fieldname, originalname, mimetype, size, buffer } = file;
    return {
      fieldName: fieldname,
      originalName: originalname,
      mimeType: mimetype,
      size,
      buffer,
    };
  }

  return null;
};

export default (fileNames = [], extensions = []) => {
  const imageFilter = (req, file, callback) => {
    const regex = new RegExp(`.(${extensions.join("|")})$`);

    if (!regex.test(file.originalname.toLowerCase())) {
      return callback(
        { message: "Only selected file type are allowed" },
        false
      );
    }

    return callback(null, true);
  };

  const multerInstance = multer({
    fileFilter: imageFilter,
  });

  const fields = fileNames.map((fileName) => ({
    name: fileName,
  }));

  return multerInstance.fields(fields);
};
