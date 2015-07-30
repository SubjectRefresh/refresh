node-clockwork
==============

Install
---
```bash
npm install clockwork
```

Usage
---
```js
var clockwork = require('clockwork')({key:'your clockwork key here'});

clockwork.getBalance(function(error, credit) {
    console.log(credit);
});

clockwork.sendSms({ To: '44743743445335', Content: 'Test!'}, function(error, resp) {
    console.log(resp);
});
```
