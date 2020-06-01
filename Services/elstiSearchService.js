var elasticSearch = require('elasticsearch')
const esClient = new elasticSearch.Client({
    host: 'localhost:9200',
})
var payload = require('../Services/elasticSearchSettings')

class ElastiSearch {
    ping() {
        esClient.ping({
            requestTimeout: 30000
        }, function (error) {
            if (error) {
                return res.json({ status: false, msg: "ElasticSearch cluster is down" })
            }
            else {
                console.log("sucessfuly elasticSearch connected");
            }
        })
    }

    async indexExists(data) {
        let resultOfFindingIndex = await esClient.indices.exists({ index: 'note' })
        if (resultOfFindingIndex === true) {
            let m = await this.addDocument(data)
        }
        if (resultOfFindingIndex === false) {
            let resultOfCreatingIndex = await esClient.indices.create(payload)
            if (resultOfCreatingIndex.acknowledged === true) {
                let x = await this.addDocument(data)
            }
        }
    }

    addDocument(data) {
        esClient.index({
            index: 'note',
            type: '_doc',
            body: {
                doc: {
                    title: data.title,
                    discription: data.discription,
                    label: data.label
                }
            }
        }).then(function (resp) {
            console.log("resp==", resp);
        }, function (err) {
            console.log("err", err);
        })
    }

}

module.exports = new ElastiSearch()