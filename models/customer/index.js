var root = process.cwd();
var faker = require(root + '/lib/Faker');
var Name = faker.Name;
var Address = faker.Address;
var Phone = faker.PhoneNumber;
var Internet = faker.Internet;

function getCustomer() {
  var firstName = Name.firstName();
  var lastName = Name.lastName();
  return {
  "customer": {
    "first_name": firstName,
    "last_name": lastName,
    "email": Internet.email(),
    "addresses": [
      {
        "address1": Address.streetAddress(),
        "city": Address.city(),
        "province": Address.usState(),
        "phone": Phone.phoneNumber(),
        "zip": Address.zipCode(),
        "last_name": lastName,
        "first_name": firstName,
        "country": "US"
      }
    ]
  }
};

}

module.exports = {
  getCustomer: getCustomer
}
