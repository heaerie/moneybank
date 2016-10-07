var mongoose    = require('mongoose');
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

// Article



 // tomg.scr generated version 1.0


 var DBHSP_DBER001MB  = new Schema({ 
    ERR_CODE: {type: String, unique: false, required: false, default: ''  }
 ,  ERR_DESC: {type: String, unique: false, required: false, default: ''  }
 ,  ERROR_PAGE: {type: String, unique: false, required: false, default: ''  }
 ,  ERROR_TEXT: {type: String, unique: false, required: false, default: ''  }
 ,  MKR_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  DT_MODIFIED: {type: Date, unique: false, required: false, default: ''  }
 ,  PROD_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  GRP_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  PAGE_GRP_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  PAGE_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  USR_ID: {type: Number, unique: false, required: false, default: ''  }
  });

 var DBHSP_DBER001MB_Model = mongoose.model('DBHSP_DBER001MB', DBHSP_DBER001MB); 
 module.exports.DBHSP_DBER001MB_Model = DBHSP_DBER001MB_Model; 

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

 var DBHSP_GRP001MB  = new Schema({ 
    PROD_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  GRP_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  GRP_NAME: {type: String, unique: false, required: false, default: ''  }
 ,  CUR_BAL: {type: String, unique: false, required: false, default: ''  }
 ,  MAX_PEND_AMT: {type: String, unique: false, required: false, default: ''  }
 ,  MAX_LEDGER: {type: String, unique: false, required: false, default: ''  }
 ,  PASSWORD: {type: String, unique: false, required: false, default: ''  }
 ,  LAST_LOGIN: {type: Date, unique: false, required: false, default: ''  }
 ,  MAX_PEND_Q_CNT: {type: Number, unique: false, required: false, default: ''  }
 ,  MAX_APVD_Q_CNT: {type: Number, unique: false, required: false, default: ''  }
 ,  LANG: {type: String, unique: false, required: false, default: ''  }
 ,  MAX_USR_CNT: {type: Number, unique: false, required: false, default: ''  }
 ,  DT_CREATED: {type: Date, unique: false, required: false, default: ''  }
 ,  DT_MODIFIED: {type: Date, unique: false, required: false, default: ''  }
 ,  MKR_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  ATH_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  STATUS: {type: String, unique: false, required: false, default: ''  }
  });

 var DBHSP_GRP001MB_Model = mongoose.model('DBHSP_GRP001MB', DBHSP_GRP001MB); 
 module.exports.DBHSP_GRP001MB_Model = DBHSP_GRP001MB_Model; 

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

 var DBHSP_GID001TB  = new Schema({ 
    USR_ID: {type: Number, unique: false, required: false, default: ''  }
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
 ,  GRP_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  LANG: {type: String, unique: false, required: false, default: ''  }
 ,  DT_CREATED: {type: Date, unique: false, required: false, default: ''  }
 ,  DT_MODIFIED: {type: Date, unique: false, required: false, default: ''  }
 ,  MKR_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  ATH_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  STATUS: {type: String, unique: false, required: false, default: ''  }
 ,  OTPE: {type: String, unique: false, required: false, default: ''  }
 ,  OTP: {type: String, unique: false, required: false, default: ''  }
  });

 var DBHSP_GID001TB_Model = mongoose.model('DBHSP_GID001TB', DBHSP_GID001TB); 
 module.exports.DBHSP_GID001TB_Model = DBHSP_GID001TB_Model; 

 var DBHSP_GRBL001MB  = new Schema({ 
    PEND_Q_CNT: {type: Number, unique: false, required: false, default: ''  }
 ,  APVD_Q_CNT: {type: Number, unique: false, required: false, default: ''  }
 ,  GRP_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  HOLD_AMT: {type: Number, unique: false, required: false, default: ''  }
 ,  HOLD_CNT: {type: Number, unique: false, required: false, default: ''  }
 ,  SPL_HOLD_AMT: {type: Number, unique: false, required: false, default: ''  }
 ,  SPL_HOLD_CNT: {type: Number, unique: false, required: false, default: ''  }
 ,  DT_CREATED: {type: String, unique: false, required: false, default: ''  }
 ,  MKR_ID: {type: String, unique: false, required: false, default: ''  }
 ,  DT_MODIFIED: {type: String, unique: false, required: false, default: ''  }
 ,  ATH_ID: {type: String, unique: false, required: false, default: ''  }
  });

 var DBHSP_GRBL001MB_Model = mongoose.model('DBHSP_GRBL001MB', DBHSP_GRBL001MB); 
 module.exports.DBHSP_GRBL001MB_Model = DBHSP_GRBL001MB_Model; 

 var DBHSP_GRP001TB  = new Schema({ 
    GRP_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  GRP_NAME: {type: String, unique: false, required: false, default: ''  }
 ,  LEDGER: {type: String, unique: false, required: false, default: ''  }
 ,  PASSWORD: {type: String, unique: false, required: false, default: ''  }
 ,  LAST_LOGIN: {type: Date, unique: false, required: false, default: ''  }
 ,  LANG: {type: String, unique: false, required: false, default: ''  }
 ,  DT_CREATED: {type: Date, unique: false, required: false, default: ''  }
 ,  DT_MODIFIED: {type: Date, unique: false, required: false, default: ''  }
 ,  MKR_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  ATH_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  STATUS: {type: String, unique: false, required: false, default: ''  }
  });

 var DBHSP_GRP001TB_Model = mongoose.model('DBHSP_GRP001TB', DBHSP_GRP001TB); 
 module.exports.DBHSP_GRP001TB_Model = DBHSP_GRP001TB_Model; 

 var DBHSP_GTRN002MB  = new Schema({ 
    GRP_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  GBKT_TXN_ID: {type: Number, unique: true, required: true, default: '0',  }
 ,  TRAN_ST: {type: String, unique: false, required: false, default: ''  }
 ,  DR_AMT: {type: String, unique: false, required: false, default: ''  }
 ,  CR_AMT: {type: String, unique: false, required: false, default: ''  }
 ,  PND_CR_AMT: {type: String, unique: false, required: false, default: ''  }
 ,  PND_DR_AMT: {type: String, unique: false, required: false, default: ''  }
 ,  DT_CREATED: {type: Date, unique: false, required: false, default: ''  }
 ,  MKR_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  DT_MODIFIED: {type: String, unique: false, required: false, default: ''  }
 ,  ATH_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  DESCR: {type: String, unique: false, required: false, default: ''  }
 ,  BILL_AMT: {type: String, unique: false, required: false, default: ''  }
 ,  BILL_DT: {type: Date, unique: false, required: false, default: ''  }
 ,  CARD_NUM: {type: Number, unique: false, required: false, default: ''  }
 ,  SHARE_CNT: {type: String, unique: false, required: false, default: ''  }
 ,  BILL_REF: {type: String, unique: false, required: false, default: ''  }
 ,  BANK: {type: String, unique: false, required: false, default: ''  }
 ,  PAY_MD: {type: String, unique: false, required: false, default: ''  }
 ,  STMT_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  TRAN_TYPE: {type: String, unique: false, required: false, default: ''  }
  });

 var DBHSP_GTRN002MB_Model = mongoose.model('DBHSP_GTRN002MB', DBHSP_GTRN002MB); 
 module.exports.DBHSP_GTRN002MB_Model = DBHSP_GTRN002MB_Model; 

 var DBHSP_LGNL001HT  = new Schema({ 
    BRWSR_NAME: {type: String, unique: false, required: false, default: ''  }
 ,  DEVICE: {type: String, unique: false, required: false, default: ''  }
 ,  OS: {type: String, unique: false, required: false, default: ''  }
 ,  LOGIN_DATE: {type: String, unique: false, required: false, default: ''  }
 ,  LOGOUT_DATE: {type: String, unique: false, required: false, default: ''  }
 ,  LOGIN_STATUS: {type: String, unique: false, required: false, default: ''  }
 ,  LOGIN_DESRC: {type: String, unique: false, required: false, default: ''  }
 ,  CLIENT_IP: {type: String, unique: false, required: false, default: ''  }
 ,  CLIENT_HOST: {type: String, unique: false, required: false, default: ''  }
 ,  GEO_COUNTRY: {type: String, unique: false, required: false, default: ''  }
 ,  LANG: {type: Number, unique: false, required: false, default: ''  }
 ,  USR_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  GRP_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  PROD_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  GEO_CITY: {type: String, unique: false, required: false, default: ''  }
 ,  GEO_DTL: {type: String, unique: false, required: false, default: ''  }
  });

 var DBHSP_LGNL001HT_Model = mongoose.model('DBHSP_LGNL001HT', DBHSP_LGNL001HT); 
 module.exports.DBHSP_LGNL001HT_Model = DBHSP_LGNL001HT_Model; 

 var DBHSP_PRTL002MB  = new Schema({ 
    PROD_ID: {type: Number, unique: false, required: false, default: ''  }
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

 var DBHSP_PRTL002MB_Model = mongoose.model('DBHSP_PRTL002MB', DBHSP_PRTL002MB); 
 module.exports.DBHSP_PRTL002MB_Model = DBHSP_PRTL002MB_Model; 

 var DBHSP_PGGR005MB  = new Schema({ 
    PRTL_PAGE_GRP_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  PRTL_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  PAGE_GRP_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  PAGE_GRP_TITLE: {type: String, unique: false, required: false, default: ''  }
 ,  DT_CREATED: {type: String, unique: false, required: false, default: ''  }
 ,  MKR_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  DT_MODIFIED: {type: String, unique: false, required: false, default: ''  }
 ,  ATH_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  PAGE_GRP_KEY: {type: String, unique: false, required: false, default: ''  }
  });

 var DBHSP_PGGR005MB_Model = mongoose.model('DBHSP_PGGR005MB', DBHSP_PGGR005MB); 
 module.exports.DBHSP_PGGR005MB_Model = DBHSP_PGGR005MB_Model; 

 var DBHSP_ROLA003MB  = new Schema({ 
    GRP_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  ROLE_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  ROLE_NAME: {type: String, unique: false, required: false, default: ''  }
 ,  ROLE_ACCESS: {type: String, unique: false, required: false, default: ''  }
 ,  DT_CREATED: {type: Date, unique: false, required: false, default: ''  }
 ,  DT_MODIFIED: {type: Date, unique: false, required: false, default: ''  }
 ,  MKR_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  ATH_ID: {type: Number, unique: false, required: false, default: ''  }
  });

 var DBHSP_ROLA003MB_Model = mongoose.model('DBHSP_ROLA003MB', DBHSP_ROLA003MB); 
 module.exports.DBHSP_ROLA003MB_Model = DBHSP_ROLA003MB_Model; 

 var DBHSP_RAPG004LB  = new Schema({ 
    ROLE_PAGE_ID: {type: String, unique: false, required: false, default: ''  }
 ,  PRTL_PAGE_GRP_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  ROLE_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  ACCESS_IND: {type: String, unique: false, required: false, default: ''  }
 ,  DT_CREATED: {type: String, unique: false, required: false, default: ''  }
 ,  MKR_ID: {type: String, unique: false, required: false, default: ''  }
 ,  DT_MODIFIED: {type: String, unique: false, required: false, default: ''  }
 ,  ATH_ID: {type: String, unique: false, required: false, default: ''  }
 ,  PAGE_GRP_ID: {type: Number, unique: false, required: false, default: ''  }
  });

 var DBHSP_RAPG004LB_Model = mongoose.model('DBHSP_RAPG004LB', DBHSP_RAPG004LB); 
 module.exports.DBHSP_RAPG004LB_Model = DBHSP_RAPG004LB_Model; 

 var DBHSP_MEMA001MB  = new Schema({ 
    ROLE_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  USR_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  ACCESS_IND: {type: String, unique: false, required: false, default: ''  }
 ,  DT_CREATED: {type: String, unique: false, required: false, default: ''  }
 ,  MKR_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  DT_MODIFIED: {type: String, unique: false, required: false, default: ''  }
 ,  ATH_ID: {type: Number, unique: false, required: false, default: ''  }
  });

 var DBHSP_MEMA001MB_Model = mongoose.model('DBHSP_MEMA001MB', DBHSP_MEMA001MB); 
 module.exports.DBHSP_MEMA001MB_Model = DBHSP_MEMA001MB_Model; 

 var DBHSP_ROLE001MB  = new Schema({ 
    PRTL_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  ROLE_ID: {type: String, unique: false, required: false, default: ''  }
 ,  ROLE_NAME: {type: String, unique: false, required: false, default: ''  }
 ,  DT_CREATED: {type: Date, unique: false, required: false, default: ''  }
 ,  DT_MODIFIED: {type: Date, unique: false, required: false, default: ''  }
 ,  MKR_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  ATH_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  STATUS: {type: String, unique: false, required: false, default: ''  }
  });

 var DBHSP_ROLE001MB_Model = mongoose.model('DBHSP_ROLE001MB', DBHSP_ROLE001MB); 
 module.exports.DBHSP_ROLE001MB_Model = DBHSP_ROLE001MB_Model; 

 var DBHSP_PDPG002MB  = new Schema({ 
    PROD_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  PROD_PAGE_GRP_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  ACESS_IND: {type: String, unique: false, required: false, default: ''  }
 ,  DT_CREATED: {type: String, unique: false, required: false, default: ''  }
 ,  MKR_ID: {type: String, unique: false, required: false, default: ''  }
 ,  DT_MODIFIED: {type: String, unique: false, required: false, default: ''  }
 ,  ATH_ID: {type: String, unique: false, required: false, default: ''  }
  });

 var DBHSP_PDPG002MB_Model = mongoose.model('DBHSP_PDPG002MB', DBHSP_PDPG002MB); 
 module.exports.DBHSP_PDPG002MB_Model = DBHSP_PDPG002MB_Model; 

 var DBHSP_PERSON  = new Schema({ 
    PERSON_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  MAX_NUM: {type: Number, unique: false, required: false, default: ''  }
 ,  PER_1_NAME: {type: String, unique: false, required: false, default: ''  }
 ,  PER_2_NAME: {type: String, unique: false, required: false, default: ''  }
 ,  PER_3_NAME: {type: String, unique: false, required: false, default: ''  }
 ,  PER_4_NAME: {type: String, unique: false, required: false, default: ''  }
 ,  PER_5_NAME: {type: String, unique: false, required: false, default: ''  }
 ,  PER_6_NAME: {type: String, unique: false, required: false, default: ''  }
  });

 var DBHSP_PERSON_Model = mongoose.model('DBHSP_PERSON', DBHSP_PERSON); 
 module.exports.DBHSP_PERSON_Model = DBHSP_PERSON_Model; 

 var DBHSP_PGDT006MB  = new Schema({ 
    PAGE_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  PAGE_BASE: {type: String, unique: false, required: false, default: ''  }
 ,  PAGE_KEY: {type: String, unique: false, required: false, default: ''  }
 ,  PAGE_NAME: {type: String, unique: false, required: false, default: ''  }
 ,  PAGE_TYPE: {type: String, unique: false, required: false, default: ''  }
 ,  AUTH_REQ_FLG: {type: String, unique: false, required: false, default: ''  }
 ,  DISP_ORDER: {type: Number, unique: false, required: false, default: ''  }
 ,  DT_CREATED: {type: Date, unique: false, required: false, default: ''  }
 ,  DT_MODIFIED: {type: Date, unique: false, required: false, default: ''  }
 ,  MKR_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  ATH_ID: {type: Number, unique: false, required: false, default: ''  }
  });

 var DBHSP_PGDT006MB_Model = mongoose.model('DBHSP_PGDT006MB', DBHSP_PGDT006MB); 
 module.exports.DBHSP_PGDT006MB_Model = DBHSP_PGDT006MB_Model; 

 var DBHSP_PGPD009LB  = new Schema({ 
    PAGE_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  PRTL_PAGE_GRP_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  ACCESS_IND: {type: String, unique: false, required: false, default: ''  }
 ,  MKR_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  DT_CREATED: {type: String, unique: false, required: false, default: ''  }
 ,  ATH_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  DT_MODIFIED: {type: String, unique: false, required: false, default: ''  }
  });

 var DBHSP_PGPD009LB_Model = mongoose.model('DBHSP_PGPD009LB', DBHSP_PGPD009LB); 
 module.exports.DBHSP_PGPD009LB_Model = DBHSP_PGPD009LB_Model; 

 var DBHSP_PGRL010LB  = new Schema({ 
    ROLE_PAGE_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  PAGE_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  ACCESS_IND: {type: String, unique: false, required: false, default: ''  }
 ,  DT_CREATED: {type: String, unique: false, required: false, default: ''  }
 ,  MKR_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  DT_MODIFIED: {type: String, unique: false, required: false, default: ''  }
 ,  ATH_ID: {type: Number, unique: false, required: false, default: ''  }
  });

 var DBHSP_PGRL010LB_Model = mongoose.model('DBHSP_PGRL010LB', DBHSP_PGRL010LB); 
 module.exports.DBHSP_PGRL010LB_Model = DBHSP_PGRL010LB_Model; 

 var DBHSP_CNTY001MB  = new Schema({ 
    PROD_ID: {type: String, unique: false, required: false, default: ''  }
 ,  COUNTRY_ID: {type: String, unique: false, required: false, default: ''  }
 ,  COUNTRY_CODE: {type: Number, unique: false, required: false, default: ''  }
 ,  COUNTRY_ISO: {type: String, unique: false, required: false, default: ''  }
 ,  CURRENCY_CODE: {type: String, unique: false, required: false, default: ''  }
 ,  CURRENCY_NAME: {type: String, unique: false, required: false, default: ''  }
 ,  TIMEZONE: {type: String, unique: false, required: false, default: ''  }
 ,  DST: {type: String, unique: false, required: false, default: ''  }
 ,  MKR_ID: {type: String, unique: false, required: false, default: ''  }
 ,  ATH_ID: {type: String, unique: false, required: false, default: ''  }
 ,  DT_CREATED: {type: String, unique: false, required: false, default: ''  }
 ,  DT_MODIFIED: {type: String, unique: false, required: false, default: ''  }
 ,  STATUS: {type: String, unique: false, required: false, default: ''  }
  });

 var DBHSP_CNTY001MB_Model = mongoose.model('DBHSP_CNTY001MB', DBHSP_CNTY001MB); 
 module.exports.DBHSP_CNTY001MB_Model = DBHSP_CNTY001MB_Model; 

 var DBHSP_REGISTERED_MEMBERS  = new Schema({ 
    ID: {type: Number, unique: true, required: true, default: ''  }
 ,  NAME: {type: String, unique: false, required: false, default: ''  }
 ,  EMAIL: {type: String, unique: false, required: false, default: ''  }
 ,  PASSWORD: {type: String, unique: false, required: false, default: ''  }
 ,  COUNTRY: {type: String, unique: false, required: false, default: ''  }
  });

 var DBHSP_REGISTERED_MEMBERS_Model = mongoose.model('DBHSP_REGISTERED_MEMBERS', DBHSP_REGISTERED_MEMBERS); 
 module.exports.DBHSP_REGISTERED_MEMBERS_Model = DBHSP_REGISTERED_MEMBERS_Model; 

 var DBHSP_SEQ  = new Schema({ 
    NAME: {type: String, unique: false, required: false, default: ''  }
 ,  VAL: {type: Number, unique: false, required: false, default: ''  }
  });

 var DBHSP_SEQ_Model = mongoose.model('DBHSP_SEQ', DBHSP_SEQ); 
 module.exports.DBHSP_SEQ_Model = DBHSP_SEQ_Model; 

 var DBHSP_STMT001MB  = new Schema({ 
    GRP_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  DESCR: {type: String, unique: false, required: false, default: ''  }
 ,  STATUS: {type: String, unique: false, required: false, default: ''  }
 ,  DT_CREATED: {type: Date, unique: false, required: false, default: ''  }
 ,  MKR_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  DT_MODIFIED: {type: Date, unique: false, required: false, default: ''  }
 ,  AUTH_ID: {type: Number, unique: false, required: false, default: ''  }
  });

 var DBHSP_STMT001MB_Model = mongoose.model('DBHSP_STMT001MB', DBHSP_STMT001MB); 
 module.exports.DBHSP_STMT001MB_Model = DBHSP_STMT001MB_Model; 

 var DBHSP_STMT002MB  = new Schema({ 
    GRP_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  USR_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  STMT_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  MON_BAL: {type: String, unique: false, required: false, default: ''  }
 ,  MON_SPND: {type: String, unique: false, required: false, default: ''  }
 ,  DESCR: {type: String, unique: false, required: false, default: ''  }
 ,  CREATED_DT: {type: Date, unique: false, required: false, default: ''  }
 ,  MAKER_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  MODIFIED_DT: {type: Date, unique: false, required: false, default: ''  }
 ,  AUTH_ID: {type: Number, unique: false, required: false, default: ''  }
  });

 var DBHSP_STMT002MB_Model = mongoose.model('DBHSP_STMT002MB', DBHSP_STMT002MB); 
 module.exports.DBHSP_STMT002MB_Model = DBHSP_STMT002MB_Model; 

 var DBHSP_TRN003MB  = new Schema({ 
    GRP_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  GBKT_TXN_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  TBKT_TXN_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  USR_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  TRAN_AMT: {type: String, unique: false, required: false, default: ''  }
 ,  DR_CR_FLG: {type: String, unique: false, required: false, default: ''  }
 ,  VALUE_DT: {type: Date, unique: false, required: false, default: ''  }
 ,  CRETED_DT: {type: Date, unique: false, required: false, default: ''  }
 ,  MAKER_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  MODIFIED_DT: {type: Date, unique: false, required: false, default: ''  }
 ,  AUTH_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  BUS_DT: {type: Date, unique: false, required: false, default: ''  }
  });

 var DBHSP_TRN003MB_Model = mongoose.model('DBHSP_TRN003MB', DBHSP_TRN003MB); 
 module.exports.DBHSP_TRN003MB_Model = DBHSP_TRN003MB_Model; 

 var DBHSP__SEQUENCE  = new Schema({ 
    SEQ_NAME: {type: String, unique: false, required: false, default: ''  }
 ,  SEQ_VAL: {type: Number, unique: false, required: false, default: ''  }
  });

 var DBHSP__SEQUENCE_Model = mongoose.model('DBHSP__SEQUENCE', DBHSP__SEQUENCE); 
 module.exports.DBHSP__SEQUENCE_Model = DBHSP__SEQUENCE_Model; 

 var DBHSP_STAT002MB  = new Schema({ 
    COUNTRY_ID: {type: String, unique: false, required: false, default: ''  }
 ,  STATE_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  STATE_CODE: {type: String, unique: false, required: false, default: ''  }
 ,  STATE_NAME: {type: String, unique: false, required: false, default: ''  }
 ,  TIMEZONE: {type: String, unique: false, required: false, default: ''  }
 ,  MKR_ID: {type: String, unique: false, required: false, default: ''  }
 ,  ATH_ID: {type: String, unique: false, required: false, default: ''  }
 ,  DT_CREATED: {type: String, unique: false, required: false, default: ''  }
 ,  DT_MODIFIED: {type: String, unique: false, required: false, default: ''  }
 ,  STATUS: {type: String, unique: false, required: false, default: ''  }
 ,  PROD_ID: {type: Number, unique: false, required: false, default: ''  }
  });

 var DBHSP_STAT002MB_Model = mongoose.model('DBHSP_STAT002MB', DBHSP_STAT002MB); 
 module.exports.DBHSP_STAT002MB_Model = DBHSP_STAT002MB_Model; 

 var DBHSP_ADDR003MB  = new Schema({ 
    ADDR_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  PROD_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  ADDR_TYPE: {type: String, unique: false, required: false, default: ''  }
 ,  ADDR_LINE1: {type: String, unique: false, required: false, default: ''  }
 ,  ADDR_LINE2: {type: String, unique: false, required: false, default: ''  }
 ,  ADDR_LINE3: {type: String, unique: false, required: false, default: ''  }
 ,  CITY: {type: String, unique: false, required: false, default: ''  }
 ,  ATH_ID: {type: String, unique: false, required: false, default: ''  }
 ,  STATE_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  COUNTRY_ID: {type: String, unique: false, required: false, default: ''  }
 ,  DT_CREATED: {type: String, unique: false, required: false, default: ''  }
 ,  DT_MODIFIED: {type: String, unique: false, required: false, default: ''  }
 ,  STATUS: {type: String, unique: false, required: false, default: ''  }
 ,  USR_ID: {type: String, unique: false, required: false, default: ''  }
  });

  var DBHSP_ADDR003MB_Model = mongoose.model('DBHSP_ADDR003MB', DBHSP_ADDR003MB); 
 module.exports.DBHSP_ADDR003MB_Model = DBHSP_ADDR003MB_Model; 
//done

var Images = new Schema({
    kind: {
        type: String,
        enum: ['thumbnail', 'detail'],
        required: true
    },
    url: { type: String, required: true }
});

var Article = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    images: [Images],
    modified: { type: Date, default: Date.now }
});

Article.path('title').validate(function (v) {
    return v.length > 5 && v.length < 70;
});

var ArticleModel = mongoose.model('Article', Article);

// User

var User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

User.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    //more secure - return crypto.pbkdf2Sync(password, this.salt, 10000, 512);
};

User.virtual('userId')
    .get(function () {
        return this.id;
    });

User.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = crypto.randomBytes(32).toString('base64');
        //more secure - this.salt = crypto.randomBytes(128).toString('base64');
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword; });


User.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

var UserModel = mongoose.model('User', User);
var DBHSP_GTRN002MB_Model = mongoose.model('DBHSP_GTRN002MB', DBHSP_GTRN002MB);

// Client

var Client = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    clientId: {
        type: String,
        unique: true,
        required: true
    },
    clientSecret: {
        type: String,
        required: true
    }
});

var ClientModel = mongoose.model('Client', Client);

// AccessToken

var AccessToken = new Schema({
    userId: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        unique: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

var AccessTokenModel = mongoose.model('AccessToken', AccessToken);

// RefreshToken

var RefreshToken = new Schema({
    userId: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        unique: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

var RefreshTokenModel = mongoose.model('RefreshToken', RefreshToken);

module.exports.mongoose = mongoose;
module.exports.ArticleModel = ArticleModel;
module.exports.UserModel = UserModel;
module.exports.ClientModel = ClientModel;
module.exports.AccessTokenModel = AccessTokenModel;
module.exports.RefreshTokenModel = RefreshTokenModel;
module.exports.DBHSP_GTRN002MB_Model = DBHSP_GTRN002MB_Model;
