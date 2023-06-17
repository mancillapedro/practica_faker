const { faker } = require('@faker-js/faker');
const {
    format,
    // getCheckDigit
} = require('rut.js');

/**
 * @description https://es.wikipedia.org/wiki/Rol_%C3%9Anico_Tributario
 * @param {Number} rut_cuerpo 
 * @returns {String}
 */
const modulo11 = (rut_cuerpo) => {
    const
        serie = [2, 3, 4, 5, 6, 7],
        digit = 11 - (String(rut_cuerpo).split("").reverse().reduce(
            (acc, digit, index) => acc + (digit * serie[index % 6]), 0) % 11)
    return digit === 11 ? '0' : digit === 10 ? "K" : String(digit)
}

const getRut = () => {
    const
        MIN = 1_000_000,
        MAX = 30_999_999,
        randomNumber = Math.floor(Math.random() * (MAX - MIN + 1) + MIN)
    // return format(randomNumber + getCheckDigit(randomNumber))
    return format(randomNumber + modulo11(randomNumber))
}

const getAge = birthDate => {
    const
        CURRENT_DATE = new Date(),
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
    return acc
}, {})

const newPerson = () => {
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

const persons = Array.from({ length: 10 }, newPerson);

console.log(persons);
console.log(getPersonsByCity(persons));