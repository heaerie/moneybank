
/**
 * `Passport` constructor.
 *
 * @api public
 */
function Mcar() {
  this._key = 'mcar';
  this._strategies = {};
  this._serializers = [];
  this._deserializers = [];
  this._infoTransformers = [];
  this._framework = null;

  this._userProperty = 'user';

};


Mcar.prototype.validate = function() {

        console.log("###: authenticate  " );
};

exports = module.exports = new Mcar();
