import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import db from "../models"
import { s3 } from "../s3"
import { randomImageName } from "../utils/utils"
import sharp from "sharp/lib/sharp";

const getProducts = (type, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (type === 'coffee') {
        let products = [];
        if (id === 'all') {
          products = await db.ProductCoffee.findAll()
        }
        if (id && id !== 'all') {
          coffeeProducts = await db.ProductCoffee.findOne({
            where: { id }
          })
        }
        resolve(products)
      }
    } catch (e) {
      reject(e)
    }
  })
}


const createProduct = (data) => {
  return new Promise(async (resolve, reject) => {

    const base64Data = new Buffer.from(data.image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    const mineType = data.image.substring(data.image.indexOf(":") + 1, data.image.indexOf(";"))
    const imageName = randomImageName()
    let sharpImage;

    if (base64Data) {
      sharpImage = await sharp(base64Data).resize({
        height: 1920,
        width: 1920,
        fit: "contain"
      }).toBuffer()
    }

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: imageName,
      Body: base64Data,
      ContentEncoding: 'base64',
      ContentType: `${mineType}`
    }

    const command = new PutObjectCommand(params)
    await s3.send(command)

    try {
      if (!data.title || !data.price) {
        resolve({
          errCode: 1,
          errMessage: `Didn't have enough data to create a new product.`
        })
      } else {
        if (data.type === "coffee") {
          await db.ProductCoffee.create({
            name: data.name,
            author: data.author,
            description: data.description,
            roast: data.roast,
            origin: data.origin,
            taste: data.taste,
            price: +data.price,
            image: imageName
          })

          resolve({
            errCode: 0,
            errMessage: `Created product successful!`
          })
        }
        else {
          resolve({
            errCode: 1,
            errMessage: `Missing Product Type!`
          })
        }
      }
    } catch (e) {
      reject(e)
    }
  })
}

export default {
  createProduct,
  getProducts
}