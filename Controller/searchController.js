var searchService = require('../Services/elstiSearchService')

class ElasticSearchController {

    async createIndex(req, res) {
        let indexName = req.body.indexName;
        await searchService.initIndex(indexName).then((response) => {
            console.log("response");
            res.send(response)
        }).catch(err => {
            res.send(err)
        })
    }

    async checkIndexPersentControl(req, res) {
        console.log("hoo in ctrl", req.params.indexName);

        let indexName = req.params.indexName;
        await searchService.indexExists(indexName).then((response) => {
            console.log("response from services===", response);

            res.send(response)
        }).catch((error) => {
            res.send(error)
        })
    }
}

module.exports = new ElasticSearchController()