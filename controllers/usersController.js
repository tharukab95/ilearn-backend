const User = require("../model/User");
const Order = require("../model/Order");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
};

// const createUser = async (req, res) => {
//   const { userName, firstName, lastName, phone, role } = req.body;
//   console.log(req.body);
//   if ((!userName, !firstName || !lastName || !phone || !role))
//     return res
//       .status(400)
//       .json({ message: "Required field/fields values missing." });

//   const duplicate = await User.findOne({ phone: phone }).exec();
//   if (duplicate) return res.sendStatus(409);

//   try {
//     const result = await User.create(req.body);
//     console.log(result);
//     res.status(200).json({ result });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const updateUser = async (req, res) => {
  const { userName, ...updateParameters } = req.body;
  console.log(userName);
  console.log(updateParameters);
  if (!userName) {
    return res.status(400).json({ message: "userName is required." });
  } else if (!updateParameters) {
    return res
      .status(400)
      .json({ message: "fields to be updated not present." });
  }
  try {
    const result = await User.findOneAndUpdate(
      { userName: userName },
      updateParameters
    );
    // if (!user) {
    //   return res
    //     .status(204)
    //     .json({ message: `No user found for userName: ${userName}.` });
    // }

    // const result = await User.updateOne({
    //   userName: userName,
    //   $set: updateParameters,
    // });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "User ID required." });
  }

  const user = await User.findOne({ _id: id }).exec();
  if (!user) {
    return res.status(204).json({ message: `No user matches ID ${id}.` });
  }
  const result = await user.deleteOne({ _id: id });
  res.json(result);
};

const getUser = async (req, res) => {
  const { uid } = req.params;
  console.log(uid);
  if (!uid) return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ firebaseUid: uid }, { __v: 0 });
  if (!user) {
    return res.status(204).json({ message: `User ID ${uid} not found` });
  }

  res.status(200).json(user);
};

const getOrders = async (req, res) => {
  const { customerUid } = req.query;

  const result = await Order.find({ customerUid: customerUid });

  res.status(200).json({ data: result });
};

const createPaymentIntent = async (req, res) => {
  const { amount, customerUid } = req.body;
  const user = await User.findOne({ customerUid: customerUid });

  if (!user?.stripeId) {
    const customer = await stripe.customers.create({
      phone: user.phone,
      address: { country: "LK" },
    });
    user.stripeId = customer.id;
    await user.save();
  }
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: user.stripeId },
    { apiVersion: "2020-08-27" }
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "LKR",
    customer: user.stripeId,
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customerId: user.stripeId,
  });
};

module.exports = {
  getUsers,
  // createUser,
  updateUser,
  deleteUser,
  getUser,
  getOrders,
  createPaymentIntent,
};
