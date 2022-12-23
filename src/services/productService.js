import db from "../models"

const createProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.price) {
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
            price: data.price,
            // image: data.image
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
  createProduct
}