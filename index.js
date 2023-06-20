const { faker } = require('@faker-js/faker');
const { format, getCheckDigit } = require('rut.js');
const { Person } = require('./Person.js');
const { PersonsArray } = require('./PersonsArray.js');

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

const arrayOfPersons = amount => PersonsArray.from(
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

const persons = arrayOfPersons(10);

console.log("Listado de personas", persons.info())
console.log("\nPersonas por ciudades", persons.byCities());
console.log("\nPromedio de edades", persons.averageAge());
console.log("\nPersonas por cada sexo", persons.bySex());
