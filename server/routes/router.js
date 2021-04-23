const express = require("express");
const AccountModel = require("../models/accountModel");

const router = new express.Router();

router.post("/api/accounts", async (req, res) => {
  try {
    const account = new AccountModel(req.body);
    await account.save();
    res.status(201).send(account);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/api/accounts", async (req, res) => {
  try {
    const accounts = await AccountModel.find({});
    res.status(200).send(accounts);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/api/accounts/:passportId", async (req, res) => {
  try {
    const account = await AccountModel.findOne({ passportId: req.params.passportId });
    if (!account) res.status(404).send(`No user with passport id ${passportId} was found`);
    res.status(200).send(account);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/api/accounts/:passportId/credit", async (req, res) => {
  if (typeof req.body.credit === "undefined") return res.status(400).send({ error: "you need to have the new credit in the request body" });
  try {
    const account = await AccountModel.findOneAndUpdate(
      { passportId: req.params.passportId, isActive: true },
      { credit: req.body.credit },
      { new: true, runValidators: true }
    );
    if (!account) return res.status(404).send(`No active user with passport id ${passportId} was found`);
    res.status(200).send(account);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/api/accounts/:passportId/active", async (req, res) => {
  if (typeof req.body.active === "undefined") res.status(400).send({ error: "you need to pass isActive true or false" });
  try {
    const account = await AccountModel.findOneAndUpdate(
      { passportId: req.params.passportId },
      { isActive: req.body.isActive },
      { new: true, runValidators: true }
    );
    if (!account) res.status(404).send(error);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get;

module.exports = router;
