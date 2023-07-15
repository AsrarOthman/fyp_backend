import query from "../../db/index.js";

const getPdf = async (req, res) => {
  console.log("filename", req.user.username);
  const username = req.user.username;
  const dbRes = await query("SELECT * FROM pdf_files WHERE filename=$1", [
    username,
  ]);
  const serverRes = {
    message: `${dbRes.rowCount} data are found`,
    data: dbRes.rows,
  };
  res.status(200).json(serverRes);
};

export default getPdf;
