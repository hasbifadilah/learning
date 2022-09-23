import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer, { getFile } from "./multer";

const main = async () => {
  const port = 3000;
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/api", (req, res) => {
    res.send(`Hello, this is ICX dashboard penerbit API`);
  });

  app.post(
    "/upload-file",
    multer(["test"], ["pdf"]),
    async (req, res, next) => {
      try {
        const { buffer, ...otherProps } = getFile(req, "test");

        const result = {
          message: "Successfully upload file",
          data: otherProps,
        };

        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    }
  );

  // Start the Express server
  app.listen(port, () => {
    console.log(`App started at http://localhost:${port}`);
  });
};

main();
