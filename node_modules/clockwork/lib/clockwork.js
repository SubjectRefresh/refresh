// ex: set tabstop=4 shiftwidth=4 expandtab:
/*
 * node-clockwork
 *
 * Mediaburst Clockwork API wrapper for Node.js
 *
 * Copyright (c) 2012 Wesley Mason <wes@1stvamp.org>
 * See LICENSE file for rights.
 */

var request = require('request');
var querystring = require('querystring');
var xmlbuilder = require('xmlbuilder');
var xml2js = require('xml2js');
var util = require('util');

var BASE_URLS = {
    'sms': 'https://api.clockworksms.com/xml/send.aspx',
    'balance': 'https://api.clockworksms.com/xml/balance'
}

var ClockworkApi = function(auth)
{
    
    var rootRequest = {};

    if (auth && auth.key)
    {
        rootRequest.key = auth.key;
    }
    else if (auth && auth.username && auth.password)
    {
        rootRequest.username = auth.username;
        rootRequest.password = auth.password;
    }
    else
    {
        throw new Error('You must pass either an API key OR a username and password.');
    }

    this.parser = new xml2js.Parser({explicitArray:false});

    /**
      * See http://www.mediaburst.co.uk/api/doc/xml/check-credit/
      */
    this.getBalance = function(callback)
    {
        if (!callback)
        {
            throw new Error('Please provide a callback.');
        }

        var _this = this;
        var payload = {Balance: rootRequest};

        var xml = xmlbuilder.create(payload,{version: '1.0', encoding: 'UTF-8'}).end();

        // console.log ('PAYLOAD', util.inspect(payload, false, null));

        request({
            'uri': BASE_URLS.balance,
            'method': 'get',
            'body': xml
            },
            function(error, response, body) {
                var credit = null;
                if (error) {
                    callback(error, null);
                } 
                else {
                    _this.parser.parseString(body,function(error, data) {
                        if (!error) {
                            credit = data.Balance_Resp;
                        }
                        callback(error, credit);
                    });
                }
            }
        );
    };


    /**
      * See http://www.mediaburst.co.uk/api/doc/xml/send-sms/
      */
    this.sendSms = function(messages, callback)
    {
        if (!messages)
        {
            throw new Error('Please provide options for sending the SMS. At the very least to and content.');
        }

        var _this = this;

        var payload = {Message: rootRequest};

        if (messages instanceof Array){
            var smsArray = [];
            for (var i = 0; i < messages.length; i ++) {
                smsArray.push({SMS:messages[i]});
            };
            payload.Message['#list'] = smsArray;
        } else {
            payload.Message.SMS = messages; // Should work with arrays (multiple messages) or a single object literal
        }

        var xml = xmlbuilder.create(payload,{version: '1.0', encoding: 'UTF-8'}).end();

        request({
            'uri': BASE_URLS.sms,
            'method': 'post',
            'body': xml
            },
            function(error, response, body) {
                var resp = null;

                if (error) {
                    callback(error, null);
                }
                else {

                    _this.parser.parseString(body, function(error, data) {
                        if (!error) {

                            // Check for general error
                            if (data.Message_Resp.ErrNo) {
                                error = data.Message_Resp;
                            }
                            else {
                                // Just pass back the responses, as they are.
                                resp = data.Message_Resp;
                            }
                        }
                        callback(error, resp);
                    });
                }
            }
        );
    };

    return this;
}

module.exports = function(auth) {
    return ClockworkApi(auth);
};
