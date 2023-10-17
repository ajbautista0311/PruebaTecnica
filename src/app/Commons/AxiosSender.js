const axios = require('axios');

class AxiosSender{
    async GetSender(url){
        return await axios.get(url);
    }

    async PostSender(url){
        return await axios.post(url);
    }
}

module.exports = AxiosSender;