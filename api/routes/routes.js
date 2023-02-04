 module.exports = (app) => {
    const signees = require('../controllers/controller.js');

    // Create a new Hymns
    app.post('/signup', signees.create);

    // Retrieve all Hymns
    app.get('/view', signees.findAll);

    // Retrieve a single Hymn with hymnId
    app.get('/signee/:signeeID', signees.findOne);

    // // Update a Hymn with hymnId
    // app.put('/hymns/:hymnId', hymns.update);

    // // Delete a Hymn with hymnId
    // app.delete('/hymns/:hymnId', hymns.delete);

    // // Search a Hymn with an hymnId
    // //app.get('/hymns', hymns.search);
}