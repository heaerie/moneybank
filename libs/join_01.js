var mongoose = require('mongoose')
var log         = require('./log')(module);
var config      = require('./config');
var crypto      = require('crypto');


mongoose.connect(config.get('mongoose:uri'));
var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

var Schema = mongoose.Schema;


var DBHSP_PROD001MB  = new Schema({
    PROD_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  PROD_NAME: {type: String, unique: false, required: false, default: ''  }
 ,  PROD_VERSION: {type: String, unique: false, required: false, default: ''  }
 ,  PROD_ST_DT: {type: String, unique: false, required: false, default: ''  }
 ,  MKR_ID: {type: String, unique: false, required: false, default: ''  }
 ,  DT_CREATED: {type: String, unique: false, required: false, default: ''  }
 ,  ATH_ID: {type: String, unique: false, required: false, default: ''  }
 ,  DT_MODIFIED: {type: String, unique: false, required: false, default: ''  }
 ,  DBNAME: {type: String, unique: false, required: false, default: ''  }
 ,  HOSTNAME: {type: String, unique: false, required: false, default: ''  }
 ,  BASE_HOME: {type: String, unique: false, required: false, default: ''  }
 ,  PORT: {type: String, unique: false, required: false, default: ''  }
 ,  PROTOCAL: {type: String, unique: false, required: false, default: ''  }
  });

 var DBHSP_PROD001MB_Model = mongoose.model('DBHSP_PROD001MB', DBHSP_PROD001MB);
 module.exports.DBHSP_PROD001MB_Model = DBHSP_PROD001MB_Model;

var DBHSP_PRTL002MB  = new Schema({
//    PROD_ID: {type: Number, unique: false, required: false, default: ''  }
    _PROD001MB: [{ type: Schema.Types.ObjectId, ref: 'DBHSP_PROD001MB' }]
 ,  PRTL_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  PRTL_NAME: {type: String, unique: false, required: false, default: ''  }
 ,  PRTL_VERSION: {type: String, unique: false, required: false, default: ''  }
 ,  PRTL_ST: {type: String, unique: false, required: false, default: ''  }
 ,  PRTL_ST_DT: {type: String, unique: false, required: false, default: ''  }
 ,  MKR_ID: {type: String, unique: false, required: false, default: ''  }
 ,  DT_CREATED: {type: String, unique: false, required: false, default: ''  }
 ,  ATH_ID: {type: String, unique: false, required: false, default: ''  }
 ,  DT_MODIFIED: {type: String, unique: false, required: false, default: ''  }
 ,  DBNAME: {type: String, unique: false, required: false, default: ''  }
 ,  HOSTNAME: {type: String, unique: false, required: false, default: ''  }
 ,  BASE_HOME: {type: String, unique: false, required: false, default: ''  }
 ,  PORT: {type: String, unique: false, required: false, default: ''  }
 ,  PROTOCAL: {type: String, unique: false, required: false, default: ''  }
  });


 var DBHSP_GID001MB  = new Schema({
    USR_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  GRP_ID: {type: Number, unique: true, required: true, default: '0',  }
 ,  F_NAME: {type: String, unique: false, required: false, default: ''  }
 ,  L_NAME: {type: String, unique: false, required: false, default: ''  }
 ,  EMAIL_ID: {type: String, unique: false, required: false, default: ''  }
 ,  CUR_BAL: {type: String, unique: false, required: false, default: ''  }
 ,  PEND_AMT: {type: String, unique: false, required: false, default: ''  }
 ,  LEDGER: {type: String, unique: false, required: false, default: ''  }
 ,  ACCT_TYPE: {type: String, unique: false, required: false, default: ''  }
 ,  PASSWORD: {type: String, unique: false, required: false, default: ''  }
 ,  LAST_LOGIN: {type: Date, unique: false, required: false, default: ''  }
 ,  PEND_Q_CNT: {type: Number, unique: false, required: false, default: ''  }
 ,  APVD_Q_CNT: {type: Number, unique: false, required: false, default: ''  }
 ,  LANG: {type: String, unique: false, required: false, default: ''  }
 ,  DT_CREATED: {type: Date, unique: false, required: false, default: ''  }
 ,  DT_MODIFIED: {type: Date, unique: false, required: false, default: ''  }
 ,  MKR_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  ATH_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  STATUS: {type: String, unique: false, required: false, default: ''  }
 ,  ADMIN_FLG: {type: String, unique: false, required: false, default: ''  }
  });

var DBHSP_GID001MB_Model = mongoose.model('DBHSP_GID001MB', DBHSP_GID001MB);
 module.exports.DBHSP_GID001MB_Model = DBHSP_GID001MB_Model;

 var DBHSP_PRTL002MB_Model = mongoose.model('DBHSP_PRTL002MB', DBHSP_PRTL002MB);
 module.exports.DBHSP_PRTL002MB_Model = DBHSP_PRTL002MB_Model;
 
DBHSP_PROD001MB_Model.remove({});
var DBHSP_PROD001MB_Model_rec = new DBHSP_PROD001MB_Model (
{
    PROD_ID      : "1"
 ,  PROD_NAME    : "HOMESPACE"
 ,  PROD_VERSION : "1"
 ,  PROD_ST_DT   : "01-JAN-2015"
 ,  MKR_ID       : "1"
 ,  DT_CREATED   : "01-JAN-2015"
 ,  ATH_ID       : "1"
 ,  DT_MODIFIED  : "01-JAN-2015"
 ,  DBNAME       : "DBHSP"
 ,  HOSTNAME     : "myroomexpense.com"
 ,  BASE_HOME    : "glbladmin"
 ,  PORT         : ""
 ,  PROTOCAL     : "HTTP"
  }
);
DBHSP_PROD001MB_Model_rec.save( function (err) {
if (err) console.log(err);

var DBHSP_PRTL002MB_Model_1 = new DBHSP_PRTL002MB_Model(
{
_PROD001MB      :  DBHSP_PROD001MB_Model_rec._id,
PRTL_ID      : 2,
PRTL_NAME    : "Global Portal Admin ",
PRTL_VERSION : "1",
PRTL_ST_DT   : "21-Jun-2014",
MKR_ID       : "1",
DT_CREATED   : "21-Jun-2014",
ATH_ID       : "1",
DT_MODIFIED  : "21-Jun-2014",
DBNAME       : "DBHSP",
HOSTNAME     : "myroomexpense.com",
BASE_HOME    : "glbladmin",
PORT         : '',
PROTOCAL     : 'http'
});

DBHSP_PRTL002MB_Model_1.save(
function (err) {
    if (err) console.log(err); 
  });

}
);

DBHSP_PRTL002MB_Model.findOne( {PRTL_ID : 2}, function(err,data)
{
	console.log('106');
	console.log(data);
}
);
DBHSP_PRTL002MB_Model.findOne( {PRTL_ID : 2})
.populate('_PROD001MB')
.exec(function (err, _PRTL002MB) {
  if (err) console.log(err);
  //console.log('prod is %s',_PRTL002MB);
  console.log('PRTL_NAME %s',_PRTL002MB.PRTL_NAME);
  //console.log('_PROD001MB  %s',_PRTL002MB._PROD001MB);
  console.log('_PROD_NAME  %s',_PRTL002MB._PROD001MB[0].PROD_NAME);
  // prints "The creator is Aaron"
});

