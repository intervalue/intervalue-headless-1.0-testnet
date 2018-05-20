/*jslint node: true */
"use strict";
var headlessWallet = require('../start.js');
var eventBus = require('intervlauecore-1.0-testnet/event_bus.js');

function onError(err){
	throw Error(err);
}

function createAttestation(){
	var composer = require('intervlauecore-1.0-testnet/composer.js');
	var network = require('intervlauecore-1.0-testnet/network.js');
	var callbacks = composer.getSavingCallbacks({
		ifNotEnoughFunds: onError,
		ifError: onError,
		ifOk: function(objJoint){
			network.broadcastJoint(objJoint);
		}
	});
	
	var profile = {
		age: 24,
		name: "George",
		emails: ["george@example.com", "george@anotherexample.com"]
	};
	composer.composeAttestationJoint(
		"LS3PUAGJ2CEYBKWPODVV72D3IWWBXNXO", // attestor address
		"PYQJWUWRMUUUSUHKNJWFHSR5OADZMUYR", // address of the person being attested (subject)
		profile,                            // attested profile
		headlessWallet.signer, 
		callbacks
	);
}

eventBus.on('headless_wallet_ready', createAttestation);
