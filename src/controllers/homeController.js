import db from '../models';

let getAllUser = async (req, res) => {
  try {
    let data = await db.User.findAll()
    return res.send(data)
  } catch (e) {
    console.log(e)
  }
}

export default {
  getAllUser
}