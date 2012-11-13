# Smtp supertest

  Smtp supertest lib for testing sent mail in your node apps.

## Installation

    $ npm install smtp-supertest

## Usage

  Simply create a `new SmtpSupertest()` and start listening:

```javascript
var SmtpSupertest = require('smtp-supertest');

var smtpSupertest = new SmtpSupertest();

smtpSupertest.listen(8465);
```

When the  smtp-supertest receives mail it will emit a 'email' event and with parsed email object:

```javascript
smtpSupertest.on('email', function(mail) {
  // Assert your mail here
});
```

## License 

(The MIT License)
