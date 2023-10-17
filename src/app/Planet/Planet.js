const DTOPanet = require("./dtoPlanet");
const axiosSender =require('../Commons/AxiosSender');
class Planet {
    constructor(id){
        this.id=id;
    }

    async init(){
        //throw new Error('To be implemented');
    }

    getName() {
        return this.name;
    }

    getGravity() {
        return this.gravity;
    }
    
    async getWeightOnPlanet(app){
        const randomIdPlanet=await Math.floor(Math.random() * (11-1)+1);
        const randomIdPeople=await Math.floor(Math.random() * (11-1)+1);
        let mass; 
        let gravity;
        let planetId;
        let regex = /^[0-9]*\.?[0-9]*/;
        const responsePerson = await app.db.swPeople.findByPk(randomIdPeople);
        if(responsePerson==null){
            const axiossender = new axiosSender();
            const responsePerson=await axiossender.GetSender('https://swapi.dev/api/people/'+randomIdPeople);
            mass=responsePerson.data.mass;
            const idPlanet = responsePerson.data.homeworld.split('/');
            planetId=idPlanet[idPlanet.length-2];
        }else{
            mass=responsePerson.mass;
            const idPlanet = responsePerson.homeworld.split('/');
            planetId=idPlanet[idPlanet.length-2];
        }
        if(planetId==randomIdPlanet){
            return('The character belongs to the random planet.');
        }
        //--------------------
        const responsePlanet = await app.db.swPlanet.findByPk(randomIdPlanet);
        if(responsePlanet==null){
            const axiossender = new axiosSender();
            const responsePlanet=await axiossender.GetSender('https://swapi.dev/api/planets/'+randomIdPlanet);
            gravity=responsePlanet.data.gravity.match(regex)[0];
        }else{
            gravity=responsePlanet.gravity;
        }
        return ('Result: '+mass*gravity);
    }
    async getPlanetById(app){
        const response = await app.db.swPlanet.findByPk(this.id);
        if(response==null){
            const axiossender = new axiosSender();
            const response=await axiossender.GetSender('https://swapi.dev/api/planets/'+this.id);
            const responseByRequest = new DTOPanet;
            responseByRequest.gravity=response.data.gravity;
            responseByRequest.name=response.data.name;
            return responseByRequest;
        }
        else{
            const responseByDB = new DTOPanet;
            responseByDB.name=response.name;
            responseByDB.gravity=response.gravity;
            return responseByDB;
        }
    }
}
module.exports=Planet;