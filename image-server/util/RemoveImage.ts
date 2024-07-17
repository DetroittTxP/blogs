import fs from "fs";
import path from "path";

export const RemoveUnuseImage = async (
  newfilename: string,
  userid: string,
  type: string
) => {
  const _dir = path.dirname(__dirname);

  const typedir = () => {
    if (type === "user") {
      return "profileimage";
    } else {
      return "postimage";
    }
  };

  const dirname = path.join(_dir, "image", typedir(), userid);

  fs.readdir(dirname, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach((file) => {
        let filename = path.join(_dir, "image", typedir(), userid, file);
        if (newfilename !== file) {
          fs.unlink(filename, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("unuse file deleted");
            }
          });
        }
      });
    }
  });
};
