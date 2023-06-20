class Person {
    #id;
    #rut;
    #firstName;
    #lastName;
    #birthDate;
    #sex;
    #city;

    constructor({
        id,
        firstName,
        lastName,
        rut,
        city,
        birthDate,
        sex
    }) {
        this.#id = id
        this.#rut = rut
        this.#sex = sex
        this.#firstName = firstName
        this.#lastName = lastName
        this.#birthDate = birthDate
        this.#city = city
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
}

exports.Person = Person;