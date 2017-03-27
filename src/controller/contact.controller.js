"use strict";

const contactModel = require("../model/contact.model");
const contactService = require("../service/contact.service");
const assert = require("assert");
const FIELD = {
    CONTACT_ID: "contactId",
    FIRSTNAME:  "firstname",
    LASTNAME:   "lastname",
    COUNTRY:     "country",
    CITY:       "city",
    ADDRESS:    "address",
    PHONE:      "phone"
}

/**
 * Action for creating a contact
 *
 * @param {Object} req  Request object 
 * @param {Object} res  Response object
 */
function createContact(req, res) {
    var contact = createContactModelFromRequest(req);
    contactService.createContact(contact)
        .then(function (response) {
            sendResponse(res, response, 200);
        });
}

/**
 * Action for getting a contact
 *
 * @param {Object} req  Request object
 * @param {Object} res  Response object
 */
function getContact(req, res) {
    var contactId = req.query["contactId"];

    contactService.getContact(contactId)
        .then(function (message) {
            sendResponse(res, message, 200);
        }).catch(function () {
            sendResponse(res, message, 500);
        });
}

/**
 * Action for updating a contact
 *
 * @param {Object} req  Request object
 * @param {Object} res  Response object
 */
function updateContact(req, res) {
    var contact = createContactModelFromRequest(req);

    contactService.updateContact(contact)
        .then(function (response) {
            sendResponse(res, response, 200);
        });
}

/**
 * Action for deleting a contact
 *
 * @param {Object} req  Request object
 * @param {Object} res  Response object
 */
function deleteContact(req, res) {
    var contactId = req.params["contactId"];
    
    contactService.deleteContact(contactId).then(function (result) {
        sendResponse(res, result, 200);
    });
}

/**
 * Action for getting a contact list
 *
 * @param {Object} req  Request object
 * @param {Object} res  Response object
 */
function getContactList(req, res) {
    contactService.getContactList()
        .then(function (result) {
            sendResponse(res, result, 200);
        });
}

/**
 * Return a list of actions for the selected contact
 * 
 * @param {any} req   Request object from express
 * @param {any} res   Responte object from express
 *
 * @return {undefined}
 */
function getContactHistory(req, res) {
    contactService.getContactHistoryList(1)
        .then(function (result) {
            sendResponse(res, result, 200);
        });
}

/**
 * Sends nice response to the frontend
 *
 * @param {Object} res      Result object from express
 * @param {String} message  message to return to the frontend
 * @param {Number} status   HTTP status code
 *
 * @return {undefined}
 */
function sendResponse(res, message, status) {
    res.status(status);
    res.json({
        success: isSuccessful(status),
        message: message,
        status: status
    });
}

/**
 * Creates a model from the request object params
 *
 * @param {object} req  Request from express
 * @return {ContactModel} a mongoose contact model
 */
function createContactModelFromRequest(req) {
    return new contactModel({
        firstname: req.params[FIELD.FIRSTNAME],
        lastname: req.params[FIELD.LASTNAME],
        country: req.params[FIELD.COUNTRY],
        city: req.params[FIELD.CITY],
        address: req.params[FIELD.ADDRESS],
        phone: req.params[FIELD.PHONE]
    });
}

/**
 * Checks whether response status represents an error or not.
 *
 * @param {Number} status  HTTP status code
 * @return {boolean} true if status is a successful response.
 */
function isSuccessful(status) {
    return [200, 201].indexOf(status) >= 0;
}

module.exports = {
    createContact: createContact,
    getContact: getContact,
    updateContact: updateContact,
    deleteContact: deleteContact,
    getContactList: getContactList,
    getContactHistory: getContactHistory
}