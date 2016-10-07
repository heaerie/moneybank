select gid.USR_ID 
		,rolem.ROLE_NAME  
		,rapg.PRTL_PAGE_GRP_ID 
		,pggr.PAGE_GRP_TITLE 
		,pggr.PAGE_GRP_KEY  
		,rapg.ACCESS_IND 
from  DBHSP.GID001MB   gid     
	, DBHSP.MEMA001MB  mema    
	, DBHSP.ROLA003MB  rolem   
	, DBHSP.RAPG004LB  rapg    
	, DBHSP.PGGR005MB  pggr 
where gid.USR_ID             = mema.USR_ID  
and   rolem.ROLE_ID          = mema.ROLE_ID 
and   rapg.PRTL_PAGE_GRP_ID  = pggr.PRTL_PAGE_GRP_ID 
and   gid.USR_ID             = 1  
and   rapg.ACCESS_IND        = 'Y'


+--------+--------+--------------+------------+------------------+----------+------------+------+------------+-------------+--------+--------+--------+-----------+
| USR_ID | GRP_ID | F_NAME       | L_NAME     | EMAIL_ID         | PASSWORD | LAST_LOGIN | LANG | DT_CREATED | DT_MODIFIED | MKR_ID | ATH_ID | STATUS | ADMIN_FLG |
+--------+--------+--------------+------------+------------------+----------+------------+------+------------+-------------+--------+--------+--------+-----------+
|      1 |      1 | DURAIMURUGAN | GOVINDARAJ | durai145@live.in | 1qaz2wsx | 0000-00-00 | ENG  | 0000-00-00 | 0000-00-00  |      0 |      0 | ACTIVE | Y         |
+--------+--------+--------------+------------+------------------+----------+------------+------+------------+-------------+--------+--------+--------+-----------+


select f_name, l_name , g.grp_id , i.usr_id , i.acct_type 
from DBHSP.GID001MB  i ,  DBHSP.GRP001MB g
where g.grp_id  = i.grp_id and  i.usr_id  = 1


select f_name, l_name , g.grp_id , i.usr_id , i.acct_type  from DBHSP.GID001MB  i ,  DBHSP.GRP001MB g where g.grp_id  = i.grp_id and  i.acct_type ='EXPENSE' and  i.usr_id  = 1

select f_name, l_name , g.grp_id , i.usr_id , i.acct_type  from DBHSP.GID001MB  i ,  DBHSP.GRP001MB g where g.grp_id  = i.grp_id and  i.acct_type ='EXPENSE' and  i.usr_id  = 1

