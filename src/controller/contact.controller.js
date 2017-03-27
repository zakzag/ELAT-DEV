"use strict";

const contactModel = require("../model/contact.model");
const contactService = require("../service/contact.service");
const assert = require("assert");

/**
 * Action for creating a contact
 *
 * @param {Object} req  Request object 
 * @param {Object} res  Response object
 */
function createContact(req, res) {
    var contact = contactService.createContactModelFromRequest(req.body);

    contactService.createContact(contact)
        .then(function (response) {
            sendResponse(res, response, 200);
        }).catch(function () {
            sendResponse(res, response, 500);
        });
}

/**
 * Action for getting a contact
 *
 * @param {Object} req  Request object
 * @param {Object} res  Response object
 */
function getContact(req, res) {
    var firstname = req.query["firstname"];
    var lastname = req.query["lastname"];

    contactService.getContact(firstname, lastname)
        .then(function (message) {
            sendResponse(res, message, 200);
        })
        .catch(function (message) {
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
    var contact = contactService.createContactObjectFromRequest(req.body);

    contactService.updateContact(contact)
        .then(function (response) {
            sendResponse(res, response, 200);
        }).catch(function (response) {
            sendResponse(res, response, 500);
        });
}

/**
 * Action for deleting a contact
 *
 * @param {Object} req  Request object
 * @param {Object} res  Response object
 */
function deleteContact(req, res) {
    var firstname = req.query["firstname"];
    var lastname = req.query["lastname"];

    contactService.deleteContact(firstname, lastname)
        .then(function (result) {
            sendResponse(res, result, 200);
        })
        .catch(function () {
            sendResponse(res, response, 500);
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
    var firstname = req.query["firstname"];
    var lastname = req.query["lastname"];

    contactService.getContactHistoryList(firstname, lastname)
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
        data: message,
        status: status
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