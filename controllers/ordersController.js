const Order = require("../model/Order");
const User = require("../model/User");

const convert = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders) return res.status(204).json({ message: "No users found" });

    // orders.forEach((order) => {
    //   const {
    //     _id,
    //     customerId,
    //     customerUid,
    //     customerName,
    //     customerPhone,
    //     ...rest
    //   } = order;

    //   const customer = {
    //     id: customerId,
    //     uid: customerUid,
    //     name: customerName,
    //     phone: customerPhone,
    //   };

    //   Order.updateOne({
    //     _id: _id,
    //     $set: { customer },
    //   })
    //     .then((data) => console.log(data))
    //     .catch((err) => console.log(err.message));
    // });
    // await Order.collection.update(
    //   {},
    //   {
    //     $unset: {
    //       customerId: 1,
    //       customerUid: 1,
    //       customerName: 1,
    //       customerPhone: 1,
    //     },
    //   },
    //   { multi: true, safe: true }
    // );
    const result = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getOrders = async (req, res) => {
  const { customerUid } = req.query;

  var filter = {};
  if (!customerUid) {
    filter = {};
  } else {
    var filter = { "customer.uid": customerUid };
  }
  const orders = await Order.find(filter, { __v: 0 });
  if (!orders) return res.status(204).json({ message: "No orders found." });

  res.status(200).json(orders);
};

const createOrder = async (req, res) => {
  const {
    customerUid,
    total,
    cart,
    billingAddress,
    merchantLocation,
    merchantName,
  } = req.body;

  console.log(req.body);

  if (!customerUid || !total || !cart) {
    return res
      .status(400)
      .json({ message: "Required field/fields values missing" });
  }

  req.body.orderLocation = {
    latitude: 7.0600128,
    longitude: 79.9652596,
    heading: 222.51889038085938,
    accuracy: 5.0,
  };

  if (!merchantName) req.body.merchantName = "edrops";

  try {
    const user = await User.findOne({
      firebaseUid: customerUid,
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    req.body.customer = {
      id: user._id.toString(),
      uid: user.firebaseUid,
      name: user.firstName + " " + user.lastName,
      phone: user.phone,
    };

    if (!billingAddress || billingAddress === null)
      req.body.billingAddress = user.address ?? "";

    const { _id, ...data } = req.body;
    const order = new Order(data);

    const result = await order.save();

    result._id = result._id.toString();
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateOrder = async (req, res) => {
  const { id, ...updateParameters } = req.body;
  if (!id) {
    return res.status(400).json({ message: "ID parameter is required." });
  } else if (updateParameters.isEmpty()) {
    return res.status(400).json({ message: "Updated fields not present." });
  }

  const order = await Order.findOne({ _id: id }).exec();
  if (!order) {
    return res.status(204).json({ message: `No order matches ID ${id}.` });
  }

  const result = await Order.updateOne({ id: id, $set: updateParameters });
  res.json(result);
};

const deleteOrder = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Order ID required." });
  }

  const order = await Order.findOne({ _id: id }).exec();
  if (!order) {
    return res.status(204).json({ message: `No order matches ID ${id}.` });
  }
  const result = await order.deleteOne({ _id: id });
  res.json(result);
};

const getOrder = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Order ID required." });
  }

  const order = await Order.findOne({ _id: id }).exec();
  if (!order) {
    return res.status(204).json({ message: `No order matches ID ${id}.` });
  }
  res.json(order);
};

module.exports = {
  convert,
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
};
