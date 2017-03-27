"use strict";

var mongoose = require("../mongoose");
var contactModel = require("../model/contact.model");
var logEntryModel = require("../model/log-entry.model");

function createContact(contact) {
    return new Promise(function (resolve, reject) {
        resolve({
            "result": "OK - create"
        });
    });
}

function getContact(contactId) {
    return new Promise(function (resolve, reject) {
        contactModel.find({ contactId: contactId }, function (err) {
            console.info("ERR:", err);

            return resolve({
                "result": "OK - get"
            });
        })

        
    });
}

function updateContact(contact) {
    return new Promise(function (resolve, reject) {
        resolve({
            "result": "OK - update"
        });
    });
}

function deleteContact(contactId) {
    return new Promise(function (resolve, reject) {
        resolve({
            "result": "OK - delete"
        });
    });
}

function getContactList() {
    return new Promise(function (resolve, reject) {
        resolve({
            "result": "OK - contactlist"
        });
    });
}

function getContactHistory(contactId) {
    return new Promise(function (resolve, reject) {
        resolve({
            "result": "OK - contacthistory"
        });
    });
}

module.exports = {
    createContact: createContact,
    getContact: getContact,
    updateContact: updateContact,
    deleteContact: deleteContact,
    getContactList: getContactList,
    getContactHistory: getContactHistory
}