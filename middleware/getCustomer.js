const User = require("../model/User");

const getCustomer = (req, res, next) => {
  const { id } = req.params;
  let customer;
  try {
    customer = await User.findById(id);
    if (!customer) {
      return res.status(400).json({ message: "Cannot find customer" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.customer = customer;
  next();
};

module.exports = getCustomer;
