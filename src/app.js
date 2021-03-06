const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const contactService = require('./service/contact.service');
const uriService = require('./service/uri.service');
const contactController = require("./controller/contact.controller");
const mongoose = require("./mongoose");
const contactModel = require('./model/contact.model')(mongoose);
const logEntryModel = require('./model/log-entry.model')(mongoose);


app.use(bodyParser.urlencoded({ extended: true }));
/**
 * Routing of the application
 */

app.get("/", function (req, res) {
    res.sendFile('./index.html', { root: __dirname });
});
/**
 * Creates a contact
 *
 * URL:    /api/contact
 * method: POST
 * model   contact
 * required
 *   contactId: string
 *   firstname: string
 *   lastname:  string
 *   country:   string
 *   city:      string
 *   address    string
 *   phone      string
 *
 * return
 *   201 CREATED
       { contactId: String }
 *   500 SERVER ERROR
 */
app.post(uriService.CONTACT_URI, contactController.createContact)

/**
 * Retrieves a contact by its contactId
 *
 * URL:    /api/contact
 * method: GET
 * model   contact
 * required
 *   contactId: string
 * return
 *   200 OK
 *     { ...contact data... }
 *   404 NOT FOUND
 *   500 SERVER ERROR
 */
app.get(uriService.CONTACT_URI, contactController.getContact);

/**
 * Updates a contact by its contactId
 *
 * URL:    /api/contact
 * method: PUT
 * model   contact
 * required
 *   contactId: string
 *   firstname: string
 *   lastname:  string
 *   country:   string
 *   city:      string
 *   address    string
 *   phone      string
 *
 * return
 *   200 OK
 *   404 NOT FOUND
 *   500 SERVER ERROR
 */
app.put(uriService.CONTACT_URI, contactController.updateContact);

/**
 * Deletes a contact by its contactId
 *
 * URL:    /api/contact
 * method: DELETE
 * model   contact
 * required
 *   contactId: string
 *
 * return
 *   200 OK
 *   404 NOT FOUND
 *   500 SERVER ERROR
 */
app.delete(uriService.CONTACT_URI, contactController.deleteContact);

/**
 * Deletes a contact by its contactId
 *
 * URL:    /api/contact
 * method: DELETE
 * model   contact
 * required
 *   contactId: string
 *
 * return
 *   200 OK
 *   404 NOT FOUND
 *   500 SERVER ERROR
 */
app.get(uriService.CONTACTLIST_URI, contactController.getContactList);

/**
 * Deletes a contact by its contactId
 *
 * URL:    /api/contact
 * method: DELETE
 * model   contact
 * required
 *   contactId: string
 *
 * return
 *   200 OK
 *   404 NOT FOUND
 *   500 SERVER ERROR
 */
app.get(uriService.LOGENTRY_URI, contactController.getContactHistory);

module.exports = app;