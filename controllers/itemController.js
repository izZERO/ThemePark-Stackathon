const Item = require("../models/Item")
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
})

const sendEmail = async (data) => {
  const info = await transporter.sendMail({
    from: "Zero's Park Security Department <zeroPark@ethereal.email>",
    to: data.email,
    subject: "Your Lost Item Has been Found!",
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #4CAF50;">🎉 Great News!</h1>
        <p>Hi there!</p>
        <p>This is Zero's Park Security Department. We're excited to let you know that your lost item has been found!</p>

        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <strong>Item:</strong> ${data.name}<br>
          <strong>Recovery Hours:</strong> 9:00 AM - 8:00 PM
        </div>

        <p>Please visit our Security Office during the hours above to collect your item.</p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="http://localhost:5173/recover/${data._id}"
            style="background-color: #4CAF50; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            ✅ Click Here After You Recover Your Item
          </a>
        </div>

        <p><small>After you physically collect your item, please click the button above to confirm your recovery. This helps us keep our records up to date.</small></p>

        <p>Thank you and have a wonderful day at Zero's Park!</p>

        <hr style="margin-top: 30px;">
        <p><small>Zero's Park Security Department<br>
        If you have any questions, please visit our Security Office.</small></p>
      </div>
    `,
    text: `Hi, this is Zero's Park Security Department. Your lost item (${data.name}) has been found!

    You can come recover it between 9am to 8pm at our Security Office.

    Once you recover your item, please click this link to confirm: http://localhost:5173/recover/${data._id}

    Thank you!
    Zero's Park Security Department
    `,
  })
}

exports.item_index_get = async (req, res) => {
  try {
    const items = await Item.find()
    res.status(200).send(items)
  } catch (error) {
    res.status(500).send({ msg: "Error getting all items!", error })
  }
}

exports.item_create_post = async (req, res) => {
  try {
    const item = await Item.create(req.body)

    if (!req.file) {
      item.image = "../public/Items/no-image.png"
    } else {
      item.image = req.file.path
    }

    await item.save()

    res.status(200).send("Item Has Been Created!")
  } catch (error) {
    res.status(500).send({ msg: "Error creating a new item!", error })
  }
}

exports.item_updateStatus_put = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)

    if (item.status === "Lost") {
      item.status = "Found"
      sendEmail(item)
    }

    await item.save()
    res.status(200).send("Item Status Updated to Found!")
  } catch (error) {
    res.status(500).send({ msg: "Error Updating Item Status!", error })
  }
}

exports.item_recover_get = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)

    if (!item) {
      return res.status(404).send({ msg: "Item not found!" })
    }

    if (item.status === "Found") {
      item.status = "Recovered"
      await item.save()
      res.status(200).send("Item Recovery Confirmed!")
    } else {
      res
        .status(400)
        .send({ msg: "Item already processed or not available for recovery!" })
    }
  } catch (error) {
    res.status(500).send({ msg: "Error confirming item recovery!", error })
  }
}

exports.item_delete_delete = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id)
    res.status(200).send("Item Has Been Deleted!")
  } catch (error) {
    res.status(500).send({ msg: "Error Deleting Item!", error })
  }
}
