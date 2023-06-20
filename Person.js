const { faker } = require('@faker-js/faker');

class Person {
    #id = faker.string.uuid();
    #rut;
    #firstName;
    #lastName;
    #birthDate;
    #sex;
    #city;

    constructor(
        firstName,
        lastName,
        rut,
        city,
        birthDate,
        sex
    ) {
        this.#rut = rut ?? this.#randomRut(); // TODO: validation {valid rut}
        this.#sex = sex ?? faker.person.sexType(); // TODO: validation {male | female}
        this.#firstName = firstName ?? faker.person.firstName({ sex: this.#sex });
        this.#lastName = lastName ?? faker.person.lastName({ sex: this.#sex });
        this.#birthDate = birthDate ?? faker.date.birthdate();  // TODO: validation {type Date}
        this.#city = city ?? this.#randomChileanCity();
    }

    get id() { return this.#id; }

    get rut() { return this.#rut; }
    set rut(value) { this.#rut = value; }

    get firstName() { return this.#firstName; }
    set firstName(value) { this.#firstName = value; }

    get lastName() { return this.#lastName; }
    set lastName(value) { this.#lastName = value; }

    get birthDate() { return this.#birthDate; }
    set birthDate(value) { this.#birthDate = value; }

    get sex() { return this.#sex; }
    set sex(value) { this.#sex = value; }

    get city() { return this.#city; }
    set city(value) { this.#city = value; }

    get age() {
        const
            CURRENT_DATE = new Date(),
            years = CURRENT_DATE.getFullYear() - this.#birthDate.getFullYear(),
            months = CURRENT_DATE.getMonth() - this.#birthDate.getMonth()
        return months < 0 || (months === 0 && CURRENT_DATE.getDate() < this.#birthDate.getDate())
            ? years - 1 : years
    }

    get info() {
        return {
            id: this.id,
            rut: this.rut,
            fullName: `${this.firstName} ${this.lastName}`,
            birthDate: this.birthDate,
            age: this.age,
            sex: this.sex,
            city: this.city
        }
    }
    toString() {
        return `personaaaa ${this.firstName}`
    }

    #randomRut() {
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

        const
            MIN = 1_000_000,
            MAX = 30_999_999,
            randomNumber = Math.floor(Math.random() * (MAX - MIN + 1) + MIN)
        // return format(randomNumber + getCheckDigit(String(randomNumber)))
        return format(randomNumber + modulo11(randomNumber))
    }

    #randomChileanCity() {
        const cities = ['Arica', 'Iquique', 'Antofagasta', 'Copiapó', 'La Serena', 'Valparaíso', 'Rancagua', 'Talca', 'Concepción', 'Temuco', 'Valdivia', 'Puerto Montt', 'Coyhaique', 'Punta Arenas']
        return cities[Math.floor(Math.random() * cities.length)]
    }

}


exports.Person = Person;