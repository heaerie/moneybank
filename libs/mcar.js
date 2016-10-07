
/**
 * `Mcar` constructor.
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


Mcar.prototype.include_css = function() {
        console.log("###: mcar.validate  " );
};
Mcar.prototype.validate = function() {
        console.log("###: mcar.validate  " );
};

exports = module.exports = new Mcar();
