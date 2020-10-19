var faker = require('faker');

var database = { shipments: [] };

for (var i = 1; i<= 10; i++) {
  var boxes = []
  var shipmentCount = faker.random.number(20)
  for (var r = 1; r <= shipmentCount; r++) {
    var box = faker.random.number(80) + "." + faker.random.number(99)
    boxes.push(box)
  }
  database.shipments.push({
    id: i,
    name: faker.vehicle.vehicle(),
    email: faker.internet.email(),
    boxes: boxes.join(','),
  });
}

console.log(JSON.stringify(database));
