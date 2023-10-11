const express = require("express");
const { validate } = require("../../middlewares");
const { schema } = require("../../schemas/contacts");

const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validate(schema), ctrl.add);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", validate(schema), ctrl.updateById);

module.exports = router;
