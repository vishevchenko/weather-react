const fs = require("fs");

let data = fs.readFileSync('./city.list.json', 'utf8')
data = JSON.parse(data).filter(city => city.country === "UA").map(({ id, name }) => { return { id, name } });

console.log(data)

fs.writeFile('./city.ua.json', JSON.stringify(data), 'utf8')





// console.log(cities.length);