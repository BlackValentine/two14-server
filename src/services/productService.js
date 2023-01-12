import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import db from "../models"
import { s3 } from "../s3"
import { randomImageName } from "../utils/utils";

const bucketName = process.env.AWS_BUCKET_NAME

const getAllProductService = (productType) => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = [];
      if (productType === 'coffee') {
        products = await db.ProductCoffee.findAll()
      } else if (productType === 'apparel') {
        products = await db.ProductApparel.findAll()
      }

      for (const product of products) {
        const getObjectParams = {
          Bucket: bucketName,
          Key: product.image,
        }
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 })

        product.image = url;
      }

      resolve(products)
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
    // let sharpImage;

    // if (base64Data) {
    //   sharpImage = await sharp(base64Data).resize({
    //     height: 1920,
    //     width: 1920,
    //     fit: "contain"
    //   }).toBuffer()
    // }

    const params = {
      Bucket: bucketName,
      Key: imageName,
      Body: base64Data,
      ContentEncoding: 'base64',
      ContentType: `${mineType}`
    }

    const command = new PutObjectCommand(params)

    try {
      if (!data.name || !data.price) {
        resolve({
          errCode: 1,
          errMessage: `Didn't have enough data to create a new product.`
        })
      } else {
        await s3.send(command)

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
            errMessage: `Created a new coffee successful!`
          })
        } else if (data.type === "apparel") {
          await db.ProductApparel.create({
            name: data.name,
            author: data.author,
            description: data.description,
            price: +data.price,
            image: imageName
          })

          resolve({
            errCode: 0,
            errMessage: `Created a new apparel successful!`
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
  getAllProductService
}