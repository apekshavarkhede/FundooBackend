var elasticSearch = require('elasticsearch')
const esClient = new elasticSearch.Client({
    host: 'localhost:9200',
})

class ElasticSearch {
    ping() {
        esClient.ping({
            requestTimeout: 30000
        }, function (error) {
            if (error) {
                console.log("ElasticSearch cluster is down");
            }
            else {
                console.log("sucessfuly elasticSearch connected");
            }
        })
    }

    // create Index
    async initIndex(indexName) {
        let resultOfCreatingIndex = await esClient.indices.create({
            index: indexName
        })
        if (resultOfCreatingIndex.acknowledged === true) {
            return ({ sucess: true, message: "index sucessfully created", data: resultOfCreatingIndex })
        }
        if (resultOfCreatingIndex.acknowledged === true) {
            return ({ sucess: false, message: "Error while creating index", data: resultOfCreatingIndex })
        }
    }

    //check if index exists
    async  indexExists(indexName) {
        let resultOfFindingIndex = await esClient.indices.exists({ index: indexName })
        if (resultOfFindingIndex === true) {
            return ({ sucess: true, message: "index found", data: resultOfFindingIndex })
        }
        if (resultOfFindingIndex === false) {
            return ({ sucess: false, message: "index not found" })
        }
    }

}

var elasticSearchClass = new ElasticSearch()
module.exports = elasticSearchClass