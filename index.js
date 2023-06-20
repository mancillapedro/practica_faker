const { Person } = require('./Person.js');

const personsInfo = persons_array => persons_array.forEach(person => console.log(person.info))

const personsByCities = persons_array => Object
    .entries(
        persons_array.reduce((acc, person) => {
            acc[person.city] ? (acc[person.city]++) : (acc[person.city] = 1)
            return acc
        }, {})

    )
    .sort((a, b) => a[1] - b[1] || a[0].localeCompare(b[0]))
    .reduce((acc, [city, amount]) => {
        acc[city] = amount
        return acc
    }, {})


const averageAgeOfPersons = persons_array =>
    persons_array.reduce((total, person) => total + person.age, 0) / persons_array.length


const personsBySex = persons_array => persons_array.reduce((acc, person) => {
    acc[person.sex] ? (acc[person.sex]++) : (acc[person.sex] = 1)
    return acc
}, {})


const arrayOfPersons = amount => Array.from({ length: amount }, () => new Person());

const persons = arrayOfPersons(10);

personsInfo(persons)
console.log(personsByCities(persons));
console.log(averageAgeOfPersons(persons));
console.log(personsBySex(persons));
