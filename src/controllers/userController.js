import userService from "../services/userService";

const handleCreateUser = async (req, res) => {
  const user = req.body
  let newUser = await userService.createUserService(user);

  return res.status(200).json({
    errCode: 0,
    errMessage: 'OK',
    newUser
  })
}

const handleLoginController = async (req, res) => {
  const user = req.body;
  let userData = await userService.loginService(user)

  return res.status(200).json(userData)
}

export default {
  handleCreateUser,
  handleLoginController
}