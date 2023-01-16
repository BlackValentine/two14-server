import db from "../models";
import bcrypt from 'bcryptjs';

var salt = bcrypt.genSaltSync(10);

const loginService = async (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      const isExist = await checkEmailExist(user.email);
      if (!isExist) {
        userData.errCode = 1;
        userData.errMessage = "This email is not exist!!!";
      } else {
        const userDb = await db.User.findOne({
          where: { email: user.email },
          attributes: ["email", "firstName", "lastName", "password"]
        });

        const check = await bcrypt.compareSync(
          user.password,
          userDb.password
        );
        if (check) {
          userData.errCode = 0;
          (userData.errMessage = "OK"), delete userDb.password;
          userData.user = {
            firstName: userDb.firstName,
            lastName: userDb.lastName,
            email: userDb.email
          };

        } else {
          userData.errCode = 2;
          userData.errMessage = 'Password is wrong. Try again.';
        }
      }
      resolve(userData)
    } catch (error) {
      reject(e)
    }
  })
}

const createUserService = async (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isExist = await checkEmailExist(user.email);
      if (isExist) {
        resolve({
          errCode: 1,
          errMessage: 'This email is existed. Please try another.'
        })
      } else {
        let hashPasswordBcrypt = await hashPasswordUser(user.password);
        await db.User.create({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: hashPasswordBcrypt
        })
        resolve({
          errCode: 0,
          errMessage: 'Create new user completed. Please sign in.'
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}

const hashPasswordUser = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword)
    } catch (e) {
      reject(e)
    }
  })
}

const checkEmailExist = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { email: email }
      })
      if (user) {
        resolve(true)
      } else {
        resolve(false)
      }
    } catch (e) {
      reject(e)
    }
  })
}

export default {
  createUserService,
  loginService
}