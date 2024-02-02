## Import inventory database

![collection 1](./imgs/1.png)
![collection 2](./imgs/2.png)
![collection 3](./imgs/3.png)

## Import books collection

![books Collection](./imgs/booksImport.png)

## Result 
![result](./imgs/4.png)

## Display number of products per category.

![Q1](./imgs/Q1.png)

## Display max category products price.

![Q2](./imgs/Q2.png)

## Display user ahmed orders populated with product.

### Query
db.users.aggregate([
  {
    $match: {
      name: "ahmed"
    }
  },
  {
    $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "userId",
      as: "UserOrder"
    }
  },
  {
    $unwind: "$UserOrder"
  },
  {
    $unwind: "$UserOrder.productsIds"
  },
  {
    $lookup: {
      from: "products",
      localField: "UserOrder.productsIds",
      foreignField: "_id",
      as: "UserOrder.productNames"
    }
  },
  {
    $group: {
      _id: "$_id",
      name: { $first: "$name" },
      orders: { $push: "$UserOrder" } ,
    }
  },

  
])

### Result
![Q3](./imgs/Q3.png)
