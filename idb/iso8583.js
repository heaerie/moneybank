var util = require('util');
var  InvokeDB = function(packager) {
	packager && (this.packager = packager);

	console.log(packager);	
	this.fields = {};
	
	this._unpack = function(msg, id) {
		var result;
		try {
			var packager = this.packager[id];
			result = require('./packer/' + packager.type).unpack(msg, packager);
			this.fields[id] = result.data;
		} catch(e) {
			console.error(e);
			var errMsg = 'Error unpacking data from bit ' + id + '\nPackager: ' + util.inspect(packager);
			console.error(errMsg);
			throw new Error(errMsg + ': ' + e.message);
		}
		return result;
	};
	
	
	
	
};

exports.InvokeDB = InvokeDB;
exports.defaultPackager = require('./packager').packager;
