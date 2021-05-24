# Lab8_Starter
## Participants

Qianjun Li

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter) : answer is 1
   

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user. : answer is no, "message" feature is complicated and may involved multiple pieces like reading the detination user's ID, passing that to the server, potential compressing to make things faster... A unit test would apply to something smaller.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters : answer: yes, such a function can be tested because it is just a single function call,

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true? answer: it will show a browser UI.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case? 
   
   beforeAll(async () => {
    const settingsBtn = await page.$('header > img');
    settingsBtn.click();
    await page.goto('http://127.0.0.1:5500/#settings');
    await page.waitForTimeout(500);
  });

