var payload = {
    "index": 'note',
    "body": {
        mappings: {
            "properties": {
                "title": {
                    "type": "text"
                },
                "discription": {
                    "type": "text"
                },
                "label": {
                    "type": "nested",
                    "properties": {
                        "label": {
                            "type": "text"
                        }
                    }
                }
            }
        }

    }
}

module.exports = payload