var shopifyAPI = require('shopify-node-api');
var config = require('./lib/config.js');
var Customer = require('./models/customer');
var Product = require('./models/product');

var Shopify = new shopifyAPI({
  shop: config.Shopify.shop, // MYSHOP.myshopify.com
  shopify_api_key: config.Shopify.apiKey, // Your API key
  access_token: config.Shopify.token, // Your API password
  rate_limit_delay: config.Shopify.rate_limit, // 10 seconds (in ms) => if Shopify returns 429 response code
  backoff: config.Shopify.backoff, // limit X of 40 API calls => default is 35 of 40 API calls
  backoff_delay: config.Shopify.backoff_delay,
  verbose: config.Shopify.verbose
});

function createProducts(count, cb) {

  var p = [];
  for (var i=0; i<count; i++) {
    p.push(Product.createProduct())
    i++;
  }
  p.map((product) => {
    return postProduct(product, cb);
  })
}

function createCustomers(count, cb) {
  var c = [];
  for (var i=0; i<count; i++) {
    c.push(Customer.getCustomer())
    i++;
  }
  c.map((customer) => {
    return postCustomer(customer, cb);
  })
}

function getRandomCustomer(cb) {
  var q = {
    limit: 250,
    page: 1
  };

  Shopify.get('/admin/customers/count.json', q, function(err, count, headers){
    if (err) return cb(err);

    var count = count.count;
    var q = {
      limit: 1,
      page: getRandomInt(1, count)
    }
    Shopify.get('/admin/customers.json', q, function(err, data, headers){
      console.log(data);
    });
  });
}

function postCustomer(customer, cb) {
  customer = customer || Customer.getCustomer();
  Shopify.post('/admin/customers.json', customer, function(err, data, headers){
    if (err) {
      return cb(err);
    }
    return cb(null, data);
  });
}

function postProduct(product, cb) {
  console.log(product)
  product = product || Product.getProduct();
  Shopify.post('/admin/products.json', product, function(err, data, headers){
    if (err) {
      return cb(err);
    }
    console.log('test')
    return cb(null, data);
  });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  createCustomers: createCustomers,
  getRandomCustomer: getRandomCustomer,
  createProducts: createProducts
}
