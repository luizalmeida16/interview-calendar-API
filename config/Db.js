const mongoose = require('mongoose');

class Db {
    constructor(host, port, database) {
        this.host = host,
        this.port = port,
        this.database = database
    }

    connect() {
        return mongoose.connect(`mongodb://${this.host}:${this.port}/${this.database}`,
        { useNewUrlParser: true }).then(() => {
            console.log("MongoDb connected");
        }).catch((err) => {
            console.log(err);
        });
    }
}

module.exports = Db;