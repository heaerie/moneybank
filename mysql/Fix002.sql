DROP TABLE IF EXISTS `DBHSP`.`CARD001MB` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `DBHSP`.`CARD001MB` (
  `MKR_ID` INT NULL,
  `DT_CREATED` DATETIME NULL,
  `ATH_ID` INT NULL,
  `DT_MODIFIED` DATETIME NULL,
  `CARD4` INT NULL,
  `BAL_TRNS_AMT` INT NULL,
  `MIN_DUE_AMT` INT NULL,
  `TTL_BAL` INT NULL,
  `DUE_DATE` DATETIME NULL,
  `DUE_DAYS` INT NULL,
  `ACCT_STATUS` VARCHAR(45) NULL,
  `PURCHASE_APR` INT NULL,
  `BAL_TRANS_APR` INT NULL,
  `BANK_ID` INT NULL,
  `USR_ID` INT NULL,
  `GRP_ID` INT NULL,
  `APR_ZERO_DATE` DATETIME NULL);

SHOW WARNINGS;
USE `DBHSP` ;



insert into CARD001MB ( MKR_ID         , DT_CREATED     , ATH_ID         , DT_MODIFIED    , CARD4          , BAL_TRNS_AMT   , MIN_DUE_AMT    , TTL_BAL        , DUE_DATE       , DUE_DAYS       , ACCT_STATUS    , PURCHASE_APR   , BAL_TRANS_APR  , BANK_ID        , USR_ID         , GRP_ID         , APR_ZERO_DATE  ) values                                                                                          (    '1'               , curdate()      , '1'              , curdate()      , '3000'         , '2900'           , '27'             , '2900'           , curdate()      , '30'             , 'ACTIVE'       , '23'             , '34'             , '1'              , '1'              , '1'              , date_add(curdate() , INTERVAL 15 MONTH )  );
