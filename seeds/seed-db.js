const db = require('../models');
const items = [
  {
    product_name: "Will's Starbucks Cup",
    department_name: "Memories",
    price: 1000,
    stock_quantity: 1
    }, 
  {
    product_name: "Peanut Plush",
    department_name: "Toys",
    price: 60,
    stock_quantity: 25
    }, 
  {
    product_name: "Suitcases",
    department_name: "Travel",
    price: 25,
    stock_quantity: 50
    }, 
  {
    product_name: "Laptop",
    department_name: "Electronics",
    price: 750,
    stock_quantity: 75
    }, 
  {
    product_name: "Crocks with glocks",
    department_name: "Lifestyle",
    price: 75,
    stock_quantity: 200
    }, 
  {
    product_name: "My dogs pictures",
    department_name: "Limited Edition",
    price: 15,
    stock_quantity: 10
    }, 
  {
    product_name: "Soy sauce",
    department_name: "Food",
    price: 8.64,
    stock_quantity: 5000
    }, 
  {
    product_name: "Meteorite",
    department_name: "Space",
    price: 1800,
    stock_quantity: 5
    }, 
  {
    product_name: "Decisions",
    department_name: "Life Choices",
    price: 9999,
    stock_quantity: 999999
    }, 
  {
    product_name: "Rock",
    department_name: "Pet",
    price: 600000,
    stock_quantity: 350
    }
  ];
  db.sequelize.sync({force: true}).then(function() {
    db.Product.bulkCreate(items).then(function(rows) {
      console.log('\n\nINSERTED\n\n');
      db.sequelize.close();

    }).catch(function(err) {
      console.log('\n\nError:', err);
    });
  });