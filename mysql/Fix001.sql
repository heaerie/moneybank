alter table DBHSP.RAPG004LB add ACCESS_IND varchar(1);

update DBHSP.RAPG004LB set access_ind ='Y';


alter table DBHSP.GID001MB add acct_type varchar(60);


update DBHSP.GID001MB set acct_type ='EXPENSE';