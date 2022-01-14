const url = require('url');
const fs = require('fs-extra');
const http = require('http');
const _ = require('lodash');
const objUsers = require('./users.json')
const express = require('express')
const app = express()

const requestListener = function (req, res) {
    file = fs.createReadStream("index.html");
    if (req.url === "/about") {
        file = fs.createReadStream("about.html");
    } else if (req.url === "/contect_us") {
        file = fs.createReadStream("contect_us.html");
    } else if (req.url === "/api/users") {
        file = fs.createReadStream("users.json");
        res.setHeader('content-Type', 'application/json');
        requestMethod = req.requestMethod;
    } else if (req.url === '/greeting-user?name=matan') {
        const queryObject = url.parse(req.url, true).query;
        res.setHeader('content-Type', 'application/json');
        requestMethod = req.requestMethod;
        res.end(`hi user ${queryObject.name}`)
    } else if (req.url === '/redirect-me') {
        file = fs.createReadStream("index.html");
        app.get(objUsers, function (req, res) {
            res.end(`Hi user: ${objUsers.user_name || 'Unknown user'}`);
        });
    }
    file.pipe(res);
}
const server = http.createServer(requestListener);
server.listen(8031);
console.log("server is runing");