// import query from "../../db/index.js";

// const downloadUserInfo = async (req, res) => {
//   const id = req.params.id;
//   const dbRes = await query("SELECT * FROM users WHERE id=$1", [id]);
//   if (dbRes.rows.length === 0) {
//     const notFoundRes = {
//       message: "No users found",
//     };
//     res.status(404).json(notFoundRes);
//   }
//   const successRes = {
//     message: `${dbRes.rowCount} users are found`,
//     data: dbRes.rows,
//   };
//   res.status(200).json(successRes);
// };

// export default downloadUserInfo;


import query from "../../db/index.js";
import axios from "axios";

const downloadUserInformation = async (req, res) => {
  try {
    const templateId = "f1ece9b";
    const apiKey = "Pu8XyXUYIAbdy-cCZPHlh";
    const apiUrl = `https://pdfgen.app/api/generate?templateId=${templateId}`;

    const requestData = {
      data: {
        id: 1,
        email: "admin@mail.com",
        is_admin: true,
        password:
          "$2a$10$/ZaBZeSMB/COqY4j5hFHiOUtYFRSshwFwLDAxYGv2SYUSaHpSEGVu",
        username: "admin",
        created_at: "2023-06-10T01:35:43.836Z",
        deleted_at: null,
      },
    };

    const response = await axios.post(apiUrl, requestData, {
      headers: {
        "Content-Type": "application/json",
        api_key: apiKey,
      },
      responseType: "stream",
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=mypdf.pdf");
    console.log(response);
    res.send(response.data);
  } catch (error) {
    console.error("Error generating PDF:", error.message);
    res.status(500).send("Error generating PDF");
  }
};

export default downloadUserInformation;
