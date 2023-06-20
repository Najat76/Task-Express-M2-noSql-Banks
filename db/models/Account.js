const { model, Schema } = require("mongoose");
const mongooseSlugPlugin = require(`mongoose-slug-plugin`);

const AccountSchema = new Schema(
  {
    username: { type: String, require: true },
    funds: { type: Number, default: 0 },
    slug: { type: String },
  },
  { timestamps: true }
);

AccountSchema.plugin(mongooseSlugPlugin, { tmp1: `account` });
module.exports = model("Account", AccountSchema); //Accounts.js file - this current file

// Task Requirement: Model Validation
//Apply some validation rules on your account model.
// The username should be required and can't be null.
// Give funds a default value of 0.
