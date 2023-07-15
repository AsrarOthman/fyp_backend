import query from "../../db/index.js";

const dwnPdf = async (req, res) => {
  const id = req;
  console.log("data" + req);
  const dbRes = await query("SELECT pdf_file FROM pdf_files WHERE id = $1", [
    id,
  ]);

  if (dbRes.rows.length === 0) {
    const pdfData = result.rows[0].pdf_data;

    // Send the PDF data as a response
    res.set("Content-Type", "application/pdf");
    res.send(pdfData);
  } else {
    res.status(404).send("PDF file not found");
  }
};

export default dwnPdf;
