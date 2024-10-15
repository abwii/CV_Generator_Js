const { verify } = require("jsonwebtoken");
const CVModel = require("../models/CVs");

module.exports = {
findAllCV: (req, res) => {
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
findCVById: (req, res) => {
    const cvId = req.params.id;
    CVModel.findById(cvId)
    .then((cv) => {
        res.send(cv);
    })
    .catch((error) => {
        res.status(500).send({
            message: error.message
        });
    })
},
createMyCV: async (req, res) => {
    try {
        verifyCV(req.body);
    }
    
},
/*updateMyCV: (req, res) => {
    
},
deleteMyCV: (req, res) => {
    
},*/


}
