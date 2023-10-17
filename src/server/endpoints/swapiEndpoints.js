const People = require('../../app/People');
const Planet = require('../../app/Planet');

const _isWookieeFormat = (req) => {
    if(req.query.format && req.query.format == 'wookiee'){
        return true;
    }
    return false;
}
const applySwapiEndpoints = (server, app) => {

    server.get('/hfswapi/test', async (req, res) => {
        const data = await app.swapiFunctions.genericRequest('https://swapi.dev/api/', 'GET', null, true);
        app.db.logging.create({ action: '/hfswapi/test'+id, ip: req.ip , header: JSON.stringify(req.headers)});
        res.send(data);
    });

    server.get('/hfswapi/getPeople/:id', async (req, res) => {
        const people = People;
        const {id}=req.params;
        const response = await people.peopleFactory(id,app);
        app.db.logging.create({ action: '/hfswapi/getPeople/'+id, ip: req.ip , header: JSON.stringify(req.headers)});
        res.send(response);

    });

    server.get('/hfswapi/getPlanet/:id', async (req, res) => {
        const planet = Planet;
        const {id}=req.params;
        const response = new planet.Planet(id);
        app.db.logging.create({ action: '/hfswapi/getPlanet/'+id, ip: req.ip , header: JSON.stringify(req.headers)});
        res.send(await response.getPlanetById(app));

    });

    server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
        const planet = Planet;
        const response = new planet.Planet(1);
        app.db.logging.create({ action: '/hfswapi/getWeightOnPlanetRandom', ip: req.ip , header: JSON.stringify(req.headers)});
        res.send(await response.getWeightOnPlanet(app));
    });

    
    server.get('/hfswapi/getLogs',async (req, res) => {
        const data = await app.db.logging.findAll();
        res.send(data);
    });
}

module.exports = applySwapiEndpoints;