const CommonPeople = require('./CommonPeople');

const peopleFactory = async (id, app) => {
    let people = null;
    people = new CommonPeople(id);
    return await people.getPeopleById(app);
}

module.exports = { peopleFactory }