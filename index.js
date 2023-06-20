const { Person } = require('./Person.js');

const arrayOfPersons = amount => Array.from({ length: amount }, () => new Person());

const personsInfo = persons_array => persons_array.map(person => person.info)

const personsByCities = persons_array => Object
    .entries(
        persons_array.reduce((acc, person) => {
            acc[person.city] ? (acc[person.city]++) : (acc[person.city] = 1)
            return acc
        }, {})
    )
    .sort((a, b) => a[1] - b[1] || a[0].localeCompare(b[0]))
    .reduce((acc, [city, amount]) => {
        acc.set(city, amount)
        return acc
    }, new Map())

const averageAgeOfPersons = persons_array =>
    persons_array.reduce((total, person) => total + person.age, 0) / persons_array.length

const personsBySex = persons_array => persons_array.reduce((acc, person) => {
    acc[person.sex] ? (acc[person.sex]++) : (acc[person.sex] = 1)
    return acc
}, {})

const persons = arrayOfPersons(10);

console.log("Listado de personas", personsInfo(persons))
console.log("\nPersonas por ciudades", personsByCities(persons));
console.log("\nPromedio de edades", averageAgeOfPersons(persons));
console.log("\nPersonas por cada sexo", personsBySex(persons));
