 module.exports = (app) => {
    const signees = require('../controllers/controller.js');

    // Create a new signee
    app.post('/signup', signees.create);

    // Retrieve all signees
    app.get('/view', signees.findAll);

    // Retrieve a single signee with signee
    app.get('/signee/:signeeID', signees.findOne);

    app.get('/exportcsv', signees.getcsv)
}