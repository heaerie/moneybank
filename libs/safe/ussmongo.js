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

var DBHSP_GID001MB  = new Schema({
    GRP_ID: {type: String, unique: false, required: false, default: ''  }
 ,  USR_ID: {type: String, unique: false, required: false, default: ''  }
 ,  F_NAME: {type: String, unique: false, required: false, default: ''  }
 ,  L_NAME: {type: String, unique: false, required: false, default: ''  }
 ,  EMAIL_ID: {type: String, unique: false, required: false, default: ''  }
 ,  CUR_BAL: {type: String, unique: false, required: false, default: ''  }
 ,  PEND_AMT: {type: String, unique: false, required: false, default: ''  }
 ,  LEDGER: {type: String, unique: false, required: false, default: ''  }
 ,  ACCT_TYPE: {type: String, unique: false, required: false, default: ''  }
// ,  PASSWORD: {type: String, unique: false, required: false, default: ''  }
 ,  HASHEDPASSWORD: {type: String, unique: false, required: false, default: ''  }
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

DBHSP_GID001MB.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    //more secure - return crypto.pbkdf2Sync(password, this.salt, 10000, 512);
};

DBHSP_GID001MB.virtual('userId')
    .get(function () {
        return this.id;
    });

DBHSP_GID001MB.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = crypto.randomBytes(32).toString('base64');
        //more secure - this.salt = crypto.randomBytes(128).toString('base64');
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword; });


DBHSP_GID001MB.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};




 var DBHSP_GID001MB_Model = mongoose.model('DBHSP_GID001MB', DBHSP_GID001MB);
 module.exports.DBHSP_GID001MB_Model = DBHSP_GID001MB_Model;

var DBHSP_GRP001MB  = new Schema({
    GRP_ID: {type: Number, unique: false, required: false, default: ''  }
 ,  PROD_ID: {type: Number, unique: false, required: false, default: ''  }
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
