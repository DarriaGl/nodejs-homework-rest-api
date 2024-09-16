const express = require("express");
const { validate, validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas.schema), ctrl.add);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", validateBody(schemas.schema), ctrl.updateById);

module.exports = router;
