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
                console.log("err in ping");

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
            this.addDocument('note', '_doc', data)
        }
        if (resultOfFindingIndex === false) {
            let resultOfCreatingIndex = await esClient.indices.create(payload)
            if (resultOfCreatingIndex.acknowledged === true) {
                this.addDocument('note', '_doc', data)

            }
        }
    }

    addDocument(indexName, type, data) {
        esClient.index({
            index: indexName,
            type: type,
            body: {
                title: data.title,
                discription: data.discription,
                id: data._id,
                label: data.label,
                remainder: data.remainder
            }
        }).then(function (resp) {
            console.log("resp==", resp);
        }, function (err) {
            console.log("err", err);
        })
    }

    async searchDocumentByTitle(data) {
        let searchDocument = await esClient.search({
            index: 'note',
            type: '_doc',
            body: {
                query: {
                    match: {
                        title: data.title
                    }
                }
            }
        })
        return searchDocument
    }

    async  updateDocument(data) {
        let document = await this.searchDocumentByTitle(data)
        let indexId = document.hits.hits[0]._id;
        return new Promise((resolve, reject) => {
            esClient.update({
                index: 'note',
                type: '_doc',
                id: indexId,
                body: {
                    doc: {
                        title: data.title,
                        id: data._id._id,
                        discription: data.discription,
                        label: data.label,
                        remainder: data.remainder
                    }
                }
            }).then((response) => {
                resolve({ sucess: true, messag: "sucessfully updated" })
            }).catch((error) => {
                reject({ sucess: false, messag: 'Error while updating note' })
            })
        })
    }

    async deleteDocument(data) {
        let document = await this.searchDocumentByTitle(data)
        let indexId = document.hits.hits[0]._id;
        esClient.delete({
            index: 'note',
            type: '_doc',
            id: indexId,
        }).then((response) => {
            resolve({ sucess: true, messag: "Document deleted" })
        }).catch((error) => {
            reject({ sucess: false, messag: 'Err while deleting documnet' })
        })

    }

}

module.exports = new ElastiSearch()