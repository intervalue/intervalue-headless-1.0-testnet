/*jslint node: true */
"use strict";
var headlessWallet = require('../start.js');
var eventBus = require('intervaluecore/event_bus.js');

function onError(err){
	throw Error(err);
}

function createDataFeed(){
	var composer = require('intervaluecore/composer.js');
	var network = require('intervaluecore/network.js');
	var callbacks = composer.getSavingCallbacks({
		ifNotEnoughFunds: onError,
		ifError: onError,
		ifOk: function(objJoint){
			network.broadcastJoint(objJoint);
		}
	});
	
	var datafeed = {
		time: new Date().toString(), 
		timestamp: Date.now()
	};
	composer.composeDataFeedJoint("PYQJWUWRMUUUSUHKNJWFHSR5OADZMUYR", datafeed, headlessWallet.signer, callbacks);
}

eventBus.on('headless_wallet_ready', createDataFeed);
