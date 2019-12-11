const app = require('express')();
const mongoose = require('mongoose');
let port = 5001;
const cors = require('cors')
const parser = require('body-parser')
const Razorpay = require('razorpay')
app.use(cors())
app.use(parser())
require('./models/PaymentOrder');
const PaymentOrder = mongoose.model('PaymentOrder');

mongoose.connect('mongodb+srv://credithelp:credithelp@cluster0-b4cma.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// savedata1();
// async function savedata1 () {
// const aaaa = await payment.find({})
// console.log(aaaa)
// }

port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/test', async (req, res) => {

  res.send("runnning app success");

});

app.post('/payment', async (req, res) => {
  const addObj = new PaymentOrder({
    google_id: req.body.google_id || "",
    facebook_id: req.body.facebook_id || "",
    custom_id: req.body.custom_id || "",
    login_type: req.body.login_type || "",
    amount: req.body.amount,
    type: req.body.type,
    description: req.body.description,
    notes: req.body.notes,
  })
  const paymentResult = await addObj.save();
  var receipt = paymentResult._id.toString()
  var instance = new Razorpay({
    key_id: 'rzp_test_jRELGMEhhBTZK6',
    key_secret: 'Iea4bBJ4bWPskWSfPsQzHtDB'
  })
  const response = await instance.orders.create({
    amount: parseInt(req.body.amount) * 100,
    currency: 'INR',
    receipt: receipt,
    payment_capture: true,
    notes: req.body.notes
  })
  res.send(response)
})

app.post('/updatePaymentStatus', async (req, res) => {
  var id = req.body.payment_id
  var data = await PaymentOrder.findByIdAndUpdate(id, {
    $set: { status: "Done" }, multi: true
  })
  res.send(data)

})

app.post('/getPaymentId', async (req, res) => {
  var id = req.body.customer_id
  var login_type = req.body.type_login
  var data
  if (login_type == "Google") {
    data = await PaymentOrder.find({ google_id: id })
  }
  if (login_type == "Custom") {
    data = await PaymentOrder.find({ custom_id: id })
  }
  res.send(data)
})