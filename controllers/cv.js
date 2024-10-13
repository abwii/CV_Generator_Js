const CVModel = require("../models/CVs");

module.exports = {
getAllCV: (req, res) => {
    CVModel.find()
        .then((cvs) => {
            res.send(cvs);
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message
            });
        })
},
create: (req, res) => {
    
}
}
