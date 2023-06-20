class PersonsArray extends Array {

    info() { return this.map(({ info }) => info) }

    byCities() {
        return Object
            .entries(
                this.reduce((acc, { city }) => {
                    acc[city] ? (acc[city]++) : (acc[city] = 1)
                    return acc
                }, {})
            )
            .sort((a, b) => a[1] - b[1] || a[0].localeCompare(b[0]))
            .reduce((acc, [city, amount]) => {
                acc.set(city, amount)
                return acc
            }, new Map())
    }

    averageAge() {
        return this.reduce((total, { age }) => total + age, 0) / this.length
    }

    bySex() {
        return this.reduce((acc, { sex }) => {
            acc[sex] ? (acc[sex]++) : (acc[sex] = 1)
            return acc
        }, {})
    }
}

module.exports = { PersonsArray }