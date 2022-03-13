const { assert } = require("chai");
const valid_email = require("../utils/users/register/valid_email");
const hash_password = require("../utils/users/register/hash_password");
const validName = require("../utils/users/register/valid_name");
const validPassword = require("../utils/users/register/valid_password");

describe("Utils testing", async () => {
  await it("Email function check", async function () {
    var result;
    var expected_message;

    const email = "ashwindev1462001@gmail.com";
    const email2 = "ashw19112.cs@rmkec.ac.in";
    const email3 = "ashwindev1462001gmail.com";
    const email4 = undefined;
    const email5 = " ";
    const email6 = "@gmail.com";
    const email7 = "ashwin146200gmail.com@";
    const email8 =
      "ashwindev1462001@gmail.comaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

    result = await valid_email(email);
    assert.equal(result.valid, true);

    result = await valid_email(email2);
    assert.equal(result.valid, true);

    expected_message = `Email '${email3}' is invalid. Email '${email3}' does not contain '@'`;
    result = await valid_email(email3);
    assert.equal(result.valid, false);
    assert.equal(result.message, expected_message);

    expected_message = "Please enter an email id";
    result = await valid_email(email4);
    assert.equal(result.valid, false);
    assert.equal(result.message, expected_message);

    expected_message = "Please enter an email id";
    result = await valid_email(email5);
    assert.equal(result.valid, false);
    assert.equal(result.message, expected_message);

    expected_message = `Email '${email6}' is invalid`;
    result = await valid_email(email6);
    assert.equal(result.valid, false);
    assert.equal(result.message, expected_message);

    expected_message = `Email '${email7}' is invalid`;
    result = await valid_email(email7);
    assert.equal(result.valid, false);
    assert.equal(result.message, expected_message);

    expected_message = `Email can have a maximum lenght of 320 characters`;
    result = await valid_email(email8);
    assert.equal(result.valid, false);
    assert.equal(result.message, expected_message);
  });

  await it("hash password", async function () {
    var result;

    const password1 = "AshwinDev123455678";
    const password2 = undefined;

    result = await hash_password(password1);
    assert.equal(result.status, 200);

    result = await hash_password(password2);
    assert.equal(result.status, 500);
  });

  await it("valid name", async function () {
    const first_name1 = undefined;
    const last_name1 = undefined;
    const expected_message1 = "Please enter your first name";

    const first_name2 = "Ashwin $%";
    const last_name2 = undefined;
    const expected_message2 =
      "Please enter a valid first name. First name should contain only alphabets and spaces";

    const first_name3 = "Ashwin";
    const last_name3 = "Dev 6";
    const expected_message3 =
      "Please enter a valid last name. Last name should contain only alphabets and spaces";

    const first_name4 = "Ashwin";
    const last_name4 = undefined;
    const expected_message4 = "Valid name";

    const first_name5 = "Ashwin";
    const last_name5 = "Dev";
    const expected_message5 = "Valid name";

    result = await validName(first_name1, last_name1);
    assert.equal(result.status, 400);
    assert.equal(result.valid, false);
    assert.equal(result.message, expected_message1);

    result = await validName(first_name2, last_name2);
    assert.equal(result.status, 400);
    assert.equal(result.valid, false);
    assert.equal(result.message, expected_message2);

    result = await validName(first_name3, last_name3);
    assert.equal(result.status, 400);
    assert.equal(result.valid, false);
    assert.equal(result.message, expected_message3);

    result = await validName(first_name4, last_name4);
    assert.equal(result.status, 200);
    assert.equal(result.valid, true);
    assert.equal(result.message, expected_message4);

    result = await validName(first_name5, last_name5);
    assert.equal(result.status, 200);
    assert.equal(result.valid, true);
    assert.equal(result.message, expected_message5);
  });

  await it("Valid password function", async function () {
    const password1 = undefined;
    const password_confirmation1 = "";
    const expected_message1 = "Please enter a password";

    const password2 = " ";
    const password_confirmation2 = "";
    const expected_message2 = "Please enter a password";

    const password3 = "Ashwin";
    const password_confirmation3 = undefined;
    const expected_message3 = "Please enter a password confirmation";

    const password4 = "Ashwin";
    const password_confirmation4 = " ";
    const expected_message4 = "Please enter a password confirmation";

    const password5 = "Ashwin";
    const password_confirmation5 = " Aswhin";
    const expected_message5 = "Both the passwords do not match";

    const password6 = "Ashwin";
    const password_confirmation6 = "Ashwin";
    const expected_message6 = "Valid password";

    result = await validPassword(password1, password_confirmation1);
    assert.equal(result.valid, false);
    assert.equal(result.status, 400);
    assert.equal(result.message, expected_message1);

    result = await validPassword(password2, password_confirmation2);
    assert.equal(result.valid, false);
    assert.equal(result.status, 400);
    assert.equal(result.message, expected_message2);

    result = await validPassword(password3, password_confirmation3);
    assert.equal(result.valid, false);
    assert.equal(result.status, 400);
    assert.equal(result.message, expected_message3);

    result = await validPassword(password4, password_confirmation4);
    assert.equal(result.valid, false);
    assert.equal(result.status, 400);
    assert.equal(result.message, expected_message4);

    result = await validPassword(password5, password_confirmation5);
    assert.equal(result.valid, false);
    assert.equal(result.status, 400);
    assert.equal(result.message, expected_message5);

    result = await validPassword(password6, password_confirmation6);
    assert.equal(result.valid, true);
    assert.equal(result.status, 202);
    assert.equal(result.message, expected_message6);
  });
});
