"use strict";

var mongoose = require("../mongoose");
var contactModel = require("../model/contact.model");
var logEntryModel = require("../model/log-entry.model");

const FIELD = {
    CONTACT_ID: "contactId",
    FIRSTNAME: "firstname",
    LASTNAME: "lastname",
    COUNTRY: "country",
    CITY: "city",
    ADDRESS: "address",
    PHONE: "phone"
}

const ACTION = {
    CREATE: "create",
    GET: "get",
    UPDATE: "update",
    DELETE: "delete"
}

/**
 * Creates a contact and return a promise
 * @param {object} contact
 * @return {Promise}
 */
function createContact(contact) {
    return new Promise(function (resolve, reject) {
        contact.save(function (err, contact) {
            if (err) {
                reject("unable to create");
            } else {
                resolve(contact);
                log(contact, ACTION.CREATE);
            }
        });
    });
}

/**
 * Get a particular contact defined by firstname and lastname
 *
 * @param {String} firstname
 * @param {String} lastname
 *
 * @return {Promise}
 */
function getContact(firstname, lastname) {
    return new Promise(function (resolve, reject) {
        contactModel
            .find({
                firstname: firstname,
                lastname: lastname
            })
            .exec(function (err, contact) {
                if (err) {
                    reject("server error")
                } else {
                    resolve(contact)
                    log(contact, ACTION.GET);
                }
            });
    });
}

/**
 * Updates a contact and return a promise
 * @param {object} contact
 * @return {Promise}
 */
function updateContact(contactObj) {
    return new Promise(function (resolve, reject) {
        contactModel.findOneAndUpdate({
                firstname: contactObj.firstname,
                lastname: contactObj.lastname
            }, { $set: contactObj },
            { "new": true },
            function (err, contact) {
                if (err) {
                    reject("Unable to update")
                } else {
                    resolve(contact);
                    log(contact, ACTION.UPDATE);
                }
            });
    });
}

/**
 * Deletes a contact
 * @param {object} contact
 * @return {Promise}
 */
function deleteContact(firstname, lastname) {
    return new Promise(function (resolve, reject) {
        contactModel.findOneAndRemove({
                firstname: firstname,
                lastname: lastname
            },
            { "new": false },
            function (err, contact) {
                if (err) {
                    console.info("ERROR:", err);
                    reject("Unable to Remove")
                } else {
                    resolve(contact);
                    log(contact, ACTION.DELETE);
                }
            });
    });
}

function getContactList() {
    return new Promise(function (resolve, reject) {
        contactModel
            .find()
            .exec(function (err, contacts) {
                if (err) {
                    reject("server error")
                } else {
                    resolve(contacts)
                }
            });
    });
}

function getContactHistory(firstname, lastname) {
    return new Promise(function (resolve, reject) {
        logEntryModel
            .find({
                contactName: firstname + lastname
            })
            .exec(function (err, contacts) {
                if (err) {
                    reject("server error")
                } else {
                    resolve(contacts)
                }
            });
    });
}

function log(contact, action) {
    var logEntry = new logEntryModel({
        contactName: contact.firstname + contact.lastname,
        createDate: new Date,
        action: action
    });

    logEntry.save();
}

/**
 * Creates a model from the request object params
 *
 * @param {object} req  Request from express
 * @return {ContactModel} a mongoose contact model
 */
function createContactModelFromRequest(params) {
    return new contactModel(createContactObjectFromRequest(params));
}

/**
 * Creates an object from the request object params
 *
 * @param {object} req  Request from express
 * @return {ContactModel} a mongoose contact model
 */
function createContactObjectFromRequest(params) {
    return {
        firstname: params[FIELD.FIRSTNAME],
        lastname: params[FIELD.LASTNAME],
        country: params[FIELD.COUNTRY],
        city: params[FIELD.CITY],
        address: params[FIELD.ADDRESS],
        phone: params[FIELD.PHONE]
    };
}

/**
 * 
 */
module.exports = {
    createContact: createContact,
    getContact: getContact,
    updateContact: updateContact,
    deleteContact: deleteContact,
    getContactList: getContactList,
    getContactHistory: getContactHistory,
    createContactModelFromRequest: createContactModelFromRequest,
    createContactObjectFromRequest: createContactObjectFromRequest
}