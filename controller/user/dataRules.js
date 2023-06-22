import query from "../../db/index.js";

const dataRules = async (req, res) => {
  console.log("userdata kot", req.user.username);
  const username = req.user.username;
  const dbRes = await query("SELECT * FROM users WHERE username=$1", [
    username,
  ]);
  const serverRes = {
    message: `${dbRes.rowCount} data are found`,
    data: dbRes.rows,
  };
  res.status(200).json(serverRes);
};

export default dataRules;
