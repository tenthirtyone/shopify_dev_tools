var root = process.cwd();
var faker = require(root + '/lib/Faker');
var Commerce = faker.commerce;
var Company = faker.company;
var Image = faker.image;

function createProduct() {
  return {
  "product": {
    "title": Commerce.productName(),
    "body_html": "<strong>" + Commerce.productAdjective() + ", " + Commerce.product() + " <\/strong>",
    "vendor": Company.companyName(),
    "product_type": Commerce.product(),
    "variants": [
     {
       "option1": "First",
       "price": Commerce.price()/100,
       "sku": Commerce.product().toUpperCase() + parseInt(Math.random()*100),
       "inventory_management" : "shopify",
       "inventory_quantity" : parseInt(Math.random()*10)
     },
     {
       "option1": "Second",
       "price": Commerce.price()/100,
       "sku": Commerce.product().toUpperCase() + parseInt(Math.random()*100),
       "inventory_management" : "shopify",
       "inventory_quantity" : parseInt(Math.random()*10)
     }
   ],
    "images": [
      {
        "src": Image.imageUrl()
      }
    ]
  }
};

}

module.exports = {
  createProduct: createProduct
}
