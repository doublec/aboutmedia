/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

Components.utils.import('resource://gre/modules/Services.jsm');
Components.utils.import('resource://gre/modules/XPCOMUtils.jsm');

function AboutMediaHandler() {}

AboutMediaHandler.prototype = {
  newChannel: function(uri) {
    let channel = Services.io.newChannel('chrome://aboutmedia/content/aboutmedia.xhtml', null, null);
    channel.originalURI = uri;
    return channel;
  },
  getURIFlags: function(uri) {
    return Components.interfaces.nsIAboutModule.ALLOW_SCRIPT;
  },
  getIndexedDBOriginPostfix: function (uri) {
    return null;
  },
  classID: Components.ID("f4a8e0fc-31ea-43e0-8390-cd026b07db1b"),
  contractID: "@mozilla.org/network/protocol/about;1?what=media",
  QueryInterface: XPCOMUtils.generateQI([Components.interfaces.nsIAboutModule])
};

let NSGetFactory = XPCOMUtils.generateNSGetFactory([AboutMediaHandler]);
let AboutMediaHandlerFactory = NSGetFactory(AboutMediaHandler.prototype.classID);

function install(params, reason) {}
function uninstall(params, reason) {}

function startup(params, reason) {
  let registrar = Components.manager.QueryInterface(Components.interfaces.nsIComponentRegistrar);
  registrar.registerFactory(AboutMediaHandler.prototype.classID, '',
                            AboutMediaHandler.prototype.contractID,
                            AboutMediaHandlerFactory);
}

function shutdown(params, reason) {
  let registrar = Components.manager.QueryInterface(Components.interfaces.nsIComponentRegistrar);
  registrar.unregisterFactory(AboutMediaHandler.prototype.classID,
                              AboutMediaHandlerFactory);
}
