const { faker } = require('@faker-js/faker');
const { format, getCheckDigit } = require('rut.js');
const { Person } = require('./Person.js');

const randomChileanCity = () => {
    const cities = ['Arica', 'Iquique', 'Antofagasta', 'Copiapó', 'La Serena', 'Valparaíso', 'Rancagua', 'Talca', 'Concepción', 'Temuco', 'Valdivia', 'Puerto Montt', 'Coyhaique', 'Punta Arenas']
    return cities[Math.floor(Math.random() * cities.length)]
}

const randomRut = () => {
    const
        MIN = 1_000_000,
        MAX = 30_999_999,
        randomNumber = Math.floor(Math.random() * (MAX - MIN + 1) + MIN)
    return format(randomNumber + getCheckDigit(String(randomNumber)))
}

const arrayOfPersons = amount => Array.from(
    { length: amount },
    () => {
        const sex = faker.person.sexType()
        return new Person({
            id: faker.string.uuid(),
            rut: randomRut(),
            sex,
            firstName: faker.person.firstName({ sex }),
            lastName: faker.person.lastName({ sex }),
            birthDate: faker.date.birthdate(),
            city: randomChileanCity()
        })
    }
);

const personsInfo = persons_array => persons_array.map(({ info }) => info)

const personsByCities = persons_array => Object
    .entries(
        persons_array.reduce((acc, { city }) => {
            acc[city] ? (acc[city]++) : (acc[city] = 1)
            return acc
        }, {})
    )
    .sort((a, b) => a[1] - b[1] || a[0].localeCompare(b[0]))
    .reduce((acc, [city, amount]) => {
        acc.set(city, amount)
        return acc
    }, new Map())

const averageAgeOfPersons = persons_array =>
    persons_array.reduce((total, { age }) => total + age, 0) / persons_array.length

const personsBySex = persons_array => persons_array.reduce((acc, { sex }) => {
    acc[sex] ? (acc[sex]++) : (acc[sex] = 1)
    return acc
}, {})

const persons = arrayOfPersons(10);

console.log("Listado de personas", personsInfo(persons))
console.log("\nPersonas por ciudades", personsByCities(persons));
console.log("\nPromedio de edades", averageAgeOfPersons(persons));
console.log("\nPersonas por cada sexo", personsBySex(persons));