const { gadgets } = require('../data/store');

function createGadget(req, res) {
  const gadget = {
    id: `g${gadgets.length + 1}`,
    name: req.body.name.trim(),
    brand: req.body.brand.trim(),
    category: req.body.category.trim(),
    price: Number(req.body.price),
    createdBy: req.user.id
  };
  gadgets.push(gadget);
  res.status(201).json({ message: 'Gadget created', gadget });
}

function deleteGadget(req, res) {
  const index = gadgets.findIndex((gadget) => gadget.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Gadget not found' });
  const [deleted] = gadgets.splice(index, 1);
  return res.status(200).json({ message: 'Gadget deleted', gadget: deleted });
}

module.exports = { createGadget, deleteGadget };
