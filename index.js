const { faker } = require('@faker-js/faker');
const { format, getCheckDigit } = require('rut.js');
const CURRENT_DATE = new Date();

const getRut = () => {
    const
        MIN = 1_000_000,
        MAX = 30_999_999,
        randomNumber = String(Math.floor(Math.random() * (MAX - MIN + 1) + MIN))
    return format(randomNumber + getCheckDigit(randomNumber))
}
const getAge = birthDate => {
    const
        years = CURRENT_DATE.getFullYear() - birthDate.getFullYear(),
        months = CURRENT_DATE.getMonth() - birthDate.getMonth()
    return months < 0 || (months === 0 && CURRENT_DATE.getDate() < birthDate.getDate())
        ? years - 1 : years
}

const getChileanCity = () => {
    const cities = ['Arica', 'Iquique', 'Antofagasta', 'Copiapó', 'La Serena', 'Valparaíso', 'Rancagua', 'Talca', 'Concepción', 'Temuco', 'Valdivia', 'Puerto Montt', 'Coyhaique', 'Punta Arenas']
    return cities[Math.floor(Math.random() * cities.length)]
}

const getPersonsByCity = persons_array => persons_array.reduce((acc, person) => {
    acc[person.city] ? (acc[person.city]++) : (acc[person.city] = 1)
    return { ...acc }
}, {})

const persons = Array.from(
    { length: 10 },
    _ => {
        const
            birthDate = faker.date.birthdate(),
            age = getAge(birthDate)
        return {
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            birthDate,
            age,
            rut: getRut(),
            // city: faker.location.city(),
            city: getChileanCity()
        }
    }
);

console.log(persons);
console.log(getPersonsByCity(persons));