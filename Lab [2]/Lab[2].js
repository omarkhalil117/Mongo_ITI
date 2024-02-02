// Question [1]
// count of each category
db.products.aggregate([
  
  { $group : {_id: '$category' , count:  {$sum:1} } } ,
  { $match : {_id: {$ne:null} } } ,
 
])
  
// Question [2]
// Max price for each category  
  
db.products.aggregate([
  
  { $group : {_id: '$category' , maxPrice: {$max:"$price"} } } ,
  { $match : {_id: {$ne:null} } } ,
  
])


// Question [3] 
// display user ahmed orders populated with product
  
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

// Question [4]
// Under Maintenance 
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
  {
   $group: {
       _id: "$orders.userId",
       name : {$first:"$productNames[0].name"}
       }    
  }  

  
]) 
  
  
  
  
  
  
  
  
  

