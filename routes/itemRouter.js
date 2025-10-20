const express = require("express")
const router = express.Router()

const itemCtrl = require("../controllers/itemController")

router.get("/", itemCtrl.item_index_get)
router.post("/", itemCtrl.item_create_post)
router.put("/:id", itemCtrl.item_updateStatus_put)
router.get("/:id", itemCtrl.item_recover_get)
router.delete("/delete/:id", itemCtrl.item_delete_delete)

module.exports = router
