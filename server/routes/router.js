const express = require("express");
const mongoose = require("mongoose");
const AccountModel = require("../models/accountModel");
const ActionModel = require("../models/actionModel");
const AdminModel = require("../models/adminModel");
const TransactionModel = require("../models/transactionModel");
const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/api/admin/in", async (req, res) => {
  try {
    const admin = await AdminModel.findByCredentials(req.body.username, req.body.password);
    const token = await admin.generateAuthToken();
    res.send({ admin, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/api/admin/out", auth, async (req, res) => {
  try {
    console.log(req.admin);
    req.admin.tokens = req.admin.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.admin.save();

    res.status(200).send({ message: "logged out" });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/api/accounts", auth, async (req, res) => {
  try {
    console.log(req);
    const account = new AccountModel(req.body);
    await account.save();
    res.status(201).send(account);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/api/accounts", auth, async (req, res) => {
  try {
    const accounts = await AccountModel.find({});
    res.status(200).send(accounts);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/api/accounts/:id", auth, async (req, res) => {
  try {
    const account = await AccountModel.findOne({ _id: req.params.id });
    if (!account) return res.status(404).send(`No user with passport id ${req.params.id} was found`);
    res.status(200).send(account);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/api/transactions", auth, async (req, res) => {
  try {
    const transactions = await TransactionModel.find({});
    res.status(200).send(transactions);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/api/actions", auth, async (req, res) => {
  try {
    const actions = await ActionModel.find({});
    res.status(200).send(actions);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/api/accounts/transaction", auth, async (req, res) => {
  if (typeof req.body.amount === "undefined") return res.status(400).send({ error: "You need to pass an amount for the transaction" });
  req.body.amount = Number(req.body.amount);
  if (Number.isNaN(req.body.amount) || req.body.amount <= 0) return res.status(400).send({ error: "Amount needs to be a positive number" });
  mongoose.connection.transaction(async (session) => {
    try {
      const fromAccount = await AccountModel.findOne({ _id: req.body.fromId, isActive: true });
      const toAccount = await AccountModel.findOne({ _id: req.body.toId, isActive: true });
      if (!fromAccount) return res.status(404).send(`No active user with passport id ${req.body.fromId} was found`);
      if (!toAccount) return res.status(404).send(`No active user with passport id ${req.body.toId} was found`);
      fromAccount.cash -= req.body.amount;
      toAccount.cash += req.body.amount;
      const transaction = new TransactionModel({
        actionType: "transaction",
        fromAccount: fromAccount._id,
        toAccount: toAccount._id,
        amount: req.body.amount,
      });
      console.log(1);
      await fromAccount.save({ session });
      console.log(2);
      await toAccount.save({ session });
      console.log(3);
      await transaction.save({ session });
      console.log(4);
      res.status(200).send({ fromAccount, toAccount });
      console.log(5);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
});

router.patch("/api/accounts/:id/credit", auth, async (req, res) => {
  if (typeof req.body.credit === "undefined") return res.status(400).send({ error: "you need to have the new credit in the request body" });
  try {
    const account = await AccountModel.findOneAndUpdate(
      { _id: req.params.id, isActive: true },
      { credit: req.body.credit },
      { new: true, runValidators: true }
    );
    if (!account) return res.status(404).send(`No active user with passport id ${rer.params.id} was found`);
    res.status(200).send(account);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/api/accounts/:id/active", auth, async (req, res) => {
  if (typeof req.body.isActive === "undefined") return res.status(400).send({ error: "you need to pass isActive true or false" });
  try {
    const account = await AccountModel.findOneAndUpdate(
      { _id: req.params.id },
      { isActive: req.body.isActive },
      { new: true, runValidators: true }
    );
    if (!account) return res.status(404).send(error);
    res.status(200).send(account);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/api/accounts/:id/deposit", auth, async (req, res) => {
  if (typeof req.body.amount === "undefined") return res.status(400).send({ error: "You need to pass an amount for the deposit" });
  req.body.amount = Number(req.body.amount);
  if (Number.isNaN(req.body.amount) || req.body.amount <= 0) return res.status(400).send({ error: "Amount needs to be a positive number" });
  mongoose.connection.transaction(async (session) => {
    try {
      const account = await AccountModel.findOne({ _id: req.params.id, isActive: true });
      if (!account) return res.status(404).send(`No active user with passport id ${req.params.id} was found`);
      account.cash += req.body.amount;
      const deposit = new ActionModel({ actionType: "deposit", account: account._id, amount: req.body.amount });
      await account.save({ session });
      await deposit.save({ session });
      res.status(200).send(account);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
});

router.patch("/api/accounts/:id/withdraw", auth, async (req, res) => {
  if (typeof req.body.amount === "undefined") return res.status(400).send({ error: "You need to pass an amount for the withdraw" });
  req.body.amount = Number(req.body.amount);
  if (Number.isNaN(req.body.amount) || req.body.amount <= 0) return res.status(400).send({ error: "Amount needs to be a positive number" });
  mongoose.connection.transaction(async (session) => {
    try {
      const account = await AccountModel.findOne({ _id: req.params.id, isActive: true });
      if (!account) return res.status(404).send(`No active user with passport id ${req.params.id} was found`);
      account.cash -= req.body.amount;
      const deposit = new ActionModel({ actionType: "withdraw", account: account._id, amount: req.body.amount });
      await account.save({ session });
      await deposit.save({ session });
      res.status(200).send(account);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
});

module.exports = router;
