let accounts = require("../../accounts");
//const Task = require('../models/Task');
const Account = require(`../../db/models/Account`);

exports.accountsGet = async (req, res) => {
  try {
    const accounts = await accounts.find(req.body);
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOneAccount = async (req, res) => {
  const { accountId } = req.params;
  try {
    const foundAccount = await accounts.findById(accountId);
    if (!foundAccount) {
      return res.status(404).json({ message: "Account not found" });
    }
    return res.status(201).json(foundAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// to send only Id + account
// exports.accountsGet = async (req, res) => {
//   try {
//     const accounts = await accounts.find({}, `_id account`);
//     res.json(accounts);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// to execlude sending two fileds: createdAt + updatedAt
// exports.accountsGet = async (req, res) => {
//   try {
//     const accounts = await accounts.find({}, `-createdAt -updatedAt`);
//     res.json(accounts);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.accountCreate = async (req, res) => {
  try {
    //const id = accounts[accounts.length - 1].id + 1; -- MongoDB will create this Id for it
    const newAccount = await Account.create(req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ message: " Error: Can not create a new account" });
  }
};

exports.accountDelete = async (req, res) => {
  const { accountId } = req.params;
  try {
    const foundAccount = await accounts.findById(accountId);
    if (!foundAccount) {
      return res.status(404).json({ message: " Account not Found" });
    }

    if (foundAccount) {
      await foundAccount.deleteOne();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } catch (error) {
    res.status(404).json({ message: "There is an error, try to fix it" });
  }
};

exports.accountUpdate = async (req, res) => {
  const { accountId } = req.params;
  try {
    const foundAccount = await accounts.findById(accountId);
    if (!foundAccount) {
      return res.status(404).json({ message: "Account not found" });
    } else {
      await foundAccount.updateOne(req.body);
      res.status(204).end();
    }
  } catch (error) {
    return res.status(500).json({ message: "Fix error please" });
  }
};

exports.getAccountByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const foundAccount = accounts.find(
      (account) => account.username === username
    );
    if (req.query.currency === "usd") {
      const accountInUsd = {
        ...foundAccount,
        funds: foundAccount.funds * 3.31,
      };
      res.status(201).json(accountInUsd);
    }
    res.status(201).json(foundAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
