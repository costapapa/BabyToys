const Toy = require('../models/toy')

module.exports = async function(req, res, next) {

    try{
        const requestorId = req.user._id
        const toyToEdit = await Toy.findById(req.params.id)
        const toyOwnerId = toyToEdit.toyOwnerId
        
        if(requestorId.equals(toyOwnerId)) {
            return next()
        } else {
            res.send('YOU ARE NOT THE OWNER')
        }
    } catch (error) {
        console.log(error)
    }
}