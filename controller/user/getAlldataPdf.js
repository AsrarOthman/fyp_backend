import query from "../../db/index.js";

const getAlldataPdf = async (req, res) => {
  const dbRes = await query(
    "SELECT id, username,filename,pdf_data, created_at FROM pdf_files"
  );
  const serverRes = {
    message: `${dbRes.rowCount} users are found`,
    data: dbRes.rows,
  };
  res.status(200).json(serverRes);
};

export default getAlldataPdf;
