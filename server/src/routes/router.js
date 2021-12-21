const { Router } = require("express");
const {createContact, deleteContact, getContacts, updateContact, getContactById} = require("../controllers/agenda");
const {login, register} = require("../controllers/auth");
const {getUserInfos} = require("../controllers/users");

const router = Router();

router.post("/contact", createContact);
router.get("/contact", getContacts)
router.get("/contact/:id", getContactById)
router.delete("/contact/:id", deleteContact)
router.put("/contact/:id", updateContact)

router.get("/user", getUserInfos)

router.post("/login", login)
router.post("/register", register)

module.exports = router;
