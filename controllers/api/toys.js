const toy = require('../../models/toy');
const Toy = require('../../models/toy');

module.exports = {
  index,
  show,
  create,
  deleteOneToy,
  requestToy,
  acceptRequest
};

async function acceptRequest(req, res) {
  try {
    const toyId = req.params.id;
    const requesterId = req.body.requesterId;

    const toy = await Toy.findById(toyId);
    const request = toy.request.find((req) => req.requestedBy.toString() === requesterId);

    if (request) {
      request.approved = true;
      await toy.save();
      res.status(200).json({ message: 'Request accepted successfully' });
    } else {
      res.status(404).json({ error: 'Request not found' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Error accepting request', details: err });
  }
}


// async function acceptRequest(req, res) {
//   try{
//     const toyId = req.params.toyID
//     const userId = req.params.userId
    
//     const toy = await Toy.findById(toyId)
//     const request = toy.request.find((req) => req.requestedBy.toString() === userId);
//     if (request) {
//       request.status = true
//       await toy.save()
//     }

//   } catch (error) {
//     res.status(400).json({error: 'Error Accepting Request'})
//   }
// }

async function requestToy(req, res) {
  try {
    // console.log(req.params.id)
    // console.log(req.user)
    const toyToUpdate = await Toy.findOne({ _id: req.params.id })
    const userId = req.user._id
    const toyToUpdateRequestArr = toyToUpdate.request
    await toyToUpdateRequestArr.push({ requestedBy: userId })
    await toyToUpdate.save()
    // console.log(toyToUpdateRequestArr)
  } catch (err) {
    res.status(400).json(err)
  }
}

async function create(req, res) {
  try {
    // Add the user to the db
    const body = req.body
    body.toyOwnerId = req.user._id
    const createdToy = await Toy.create(body)

    // token will be a string
    // Yes, we can serialize a string
    res.json(createdToy)
  } catch (err) {
    res.status(400).json(err);
  }
}

async function deleteOneToy(req, res) {
  try {
    const deletedToy = await Toy.findByIdAndDelete(req.params.id)
    res.json(deletedToy)
  } catch (err) {
    res.status(400).json(err)
  }
}

async function index(req, res) {
  const toys = await Toy.find()
  res.json(toys)
}

async function show(req, res) {
  const toy = await Toy.findById(req.params.id);
  res.json(toy);
}



