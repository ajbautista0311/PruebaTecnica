const axiosSender =require('../Commons/AxiosSender');
const DTOPeople = require('./DTOPeople');
class AbstractPeople {

    constructor(id) {
        if (this.constructor == AbstractPeople) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.id=id;
    }

    async init(){
        //throw new Error('To be implemented');
    }

    getId() {
       return this.id;
    }

    getName() {
        return this.name;
    }

    getMass() {
        return this.mass;
    }

    getHeight() {
        return this.height;
    }

    getHomeworldName() {
        return this.homeworldName;
    }

    getHomeworlId() {
        return this.homeworlId;
    }

    async getPeopleById(app) {
        const response = await app.db.swPeople.findByPk(this.id);
        if(response==null){
            const axiossender = new axiosSender();
            const response=await axiossender.GetSender('https://swapi.dev/api/people/'+this.id);
            const responseByRequest = new DTOPeople;
            responseByRequest.height=response.data.height;
            responseByRequest.name=response.data.name;
            responseByRequest.mass=response.data.mass;
            const idPlanet = response.data.homeworld.split('/');
            responseByRequest.homeworldId=idPlanet[idPlanet.length-2];
            var planetName = await axiossender.GetSender(response.data.homeworld);
            responseByRequest.homeworldName=planetName.data.name;
            return responseByRequest;
        }else{
            const responseByDB = new DTOPeople;
            responseByDB.height=response.height;
            responseByDB.name=response.name;
            responseByDB.mass=response.mass;
            const idPlanet = response.homeworld.split('/');
            responseByDB.homeworldId=idPlanet[idPlanet.length-2];
            responseByDB.homeworldName=response.homeworld_name;
            return responseByDB;
        }
    } 
}
module.exports=AbstractPeople;