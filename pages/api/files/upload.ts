import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";
import { createReadStream } from "fs";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const form = formidable();

      const URL = await new Promise((resolve, reject) => {
        form.parse(req, async (_, __, files: any) => {
          const { filepath, newFilename } = files.file;

          const originalFilename = newFilename.split(".").shift();

          const fileExtension = newFilename.split(".").pop();

          const s3 = new AWS.S3({
            region: "ap-northeast-2",
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_SECRET_KEY,
            },
          });

          const stream = createReadStream(filepath);

          await s3
            .upload({
              Bucket: process.env.S3_BUCKET_NAME,
              Key: `${originalFilename}__${uuidv4()}.${fileExtension}`,
              ACL: "public-read",
              Body: stream,
            })
            .promise()
            .then((res) => resolve(res))
            .catch((e) => reject(e));
        });
      });
      res.statusCode = 201;
      res.send(URL);
    } catch (e) {
      console.log(e);
      res.end();
    }
  }
  res.statusCode = 405;

  return res.end();
};
