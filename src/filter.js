const fs = require("fs");

let data = fs.readFileSync('./city.list.json', 'utf8');

const needed = [
    698740, 709930, 710735, 706483, 686967, 696643,
    706448, 703448, 687700, 702658, 709717, 689558,
    694423, 705812, 700569, 692194, 702550, 710791,
    706369, 702569, 695594, 707471, 691650, 690548, 710741];

data = JSON.parse(data)
    .filter(city => needed.includes(+city.id))
    .map(({ id, name }) => { return { id, name } })
    .sort( (a, b) => { return a.id > b.id ? -1 : 1 } );

fs.writeFile('./city.ua.json', JSON.stringify(data), 'utf8', ()=>{})
