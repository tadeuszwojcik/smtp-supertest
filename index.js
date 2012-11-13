var EventEmitter = require('events').EventEmitter;
var simplesmtp = require('simplesmtp');
var MailParser = require('mailparser').MailParser;

function SmtpSupertest() {
    var self = new EventEmitter(),
        smtp = simplesmtp.createServer({
                                           timeout: 100,
                                           name: 'localhost',
                                           secureConnection: false,
                                           requireAuthentication: false,
                                           disableDNSValidation: true,
                                           validateSender: false,
                                           validateRecipients: false
                                       });

    smtp.on('startData', function (envelope) {
        envelope.saveStream = new MailParser();
        envelope.saveStream.on('end', function (mail) {
            self.emit('email', mail);
        });
    });

    smtp.on('data', function (envelope, chunk) {

        envelope.saveStream.write(chunk);
    });

    smtp.on('dataReady', function (envelope, callback) {
        envelope.saveStream.end();
        callback(null, 'queueId');

    });

    self.listen = function (port) {
        smtp.listen(port);
    };

    self.close = function (callback) {
        smtp.end(callback);
    };

    return self;
}

module.exports = SmtpSupertest;