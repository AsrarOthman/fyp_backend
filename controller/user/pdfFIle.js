import query from "../../db/index.js";

const pdfFile = async (req, res) => {
  try {
    const body = req.body;
    const dbRes = await query(
      "INSERT INTO pdf_files (filename,pdf_data) VALUES ( $1,$2)",
      [body.filename, body.blob]
    );
    const serverRes = {
      message: "PDF data is saved",
    };
    res.status(200).json(serverRes);
  } catch (error) {
    const { name, table, constraint, detail } = error;
    const serverRes = {
      message: detail,
      error: { name, table, constraint },
    };
    res.status(500).json(serverRes);
  }
};

export default pdfFile;
