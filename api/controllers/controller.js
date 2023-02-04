const Signee = require('../model/model.js');

// Create and Save a new hymn
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.content) {
    //     return res.status(400).send({
    //         message: "body content can not be empty"
    //     });
    // }

    // Create a hymn
    const signee = new Signee({
        fullName: req.body.fullName,
        email: req.body.email
    });

    // Save hymn in the database
    signee.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User Record."
            });
        });
};

// Retrieve and return all signees from the database.
exports.findAll = (req, res) => {
    Signee.find()
        .then(signees => {
            res.send(signees);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving signees."
            });
        });
};

// Find a single signee with an ID
exports.findOne = (req, res) => {
    Signee.findById(req.params.signeeID)
        .then(signee => {
            if (!signee) {
                return res.status(404).send({
                    message: "Signee not found with id " + req.params.signeeID
                });
            }
            res.send(signee);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Hymn not found with id " + req.params.signeeID
                });
            }
            return res.status(500).send({
                message: "Error retrieving hymn with id " + req.params.signeeID
            });
        });
};






// // Update a hymn identified by the hymnId in the request
// exports.update = (req, res) => {
//     // Validate Request
//     if (!req.body.content) {
//         return res.status(400).send({
//             message: "hymn content can not be empty"
//         });
//     }

//     // Find hymn and update it with the request body
//     Hymn.findByIdAndUpdate(req.params.hymnId, {
//             hymnNumber: req.body.hymnNumber,
//             title: req.body.title,
//             content: req.body.content,
//             meter: req.body.content.meter,
//             source: req.body.content.source,
//             chorus: req.body.content.chorus,
//             verses: req.body.content.verses,
//             // lines: req.body.content.verses.lines,
//             author: req.body.author,
//             isFavourite: req.body.isFavourite,
//         }, {
//             new: true
//         })
//         .then(hymn => {
//             if (!hymn) {
//                 return res.status(404).send({
//                     message: "Hymn not found with id " + req.params.hymnId
//                 });
//             }
//             res.send(hymn);
//         }).catch(err => {
//             if (err.kind === 'ObjectId') {
//                 return res.status(404).send({
//                     message: "hymn not found with id " + req.params.hymnId
//                 });
//             }
//             return res.status(500).send({
//                 message: "Error updating hymn with id " + req.params.hymnId
//             });
//         });
// };

// // Delete a hymn with the specified hymnId in the request
// exports.delete = (req, res) => {
//     Hymn.findByIdAndRemove(req.params.hymnId)
//         .then(hymn => {
//             if (!hymn) {
//                 return res.status(404).send({
//                     message: "hymn not found with id " + req.params.hymnId
//                 });
//             }
//             res.send({
//                 message: "hymn deleted successfully!"
//             });
//         }).catch(err => {
//             if (err.kind === 'ObjectId' || err.name === 'NotFound') {
//                 return res.status(404).send({
//                     message: "Hymn not found with id " + req.params.hymnId
//                 });
//             }
//             return res.status(500).send({
//                 message: "Could not delete hymn with id " + req.params.hymnId
//             });
//         });
// };