package com.heaerie.bean;
import javax.jms.JMSException;

/*import com.tibco.tibjms.naming.TibjmsInitialContextFactory;
import com.heaerie.uss.bean.USSJmsClient;
*/
import java.io.IOException;
import java.util.HashMap;
import java.util.concurrent.ExecutionException;

//import com.heaerie.tibco.*;


public class loginBean extends Thread {
	private String userName=new String();
	private String status=new String();
	public String getUserName() 
	{
		
		return userName;
	}
	public void setUserName(String userName) 
	{
		this.userName = userName;
	}
	public String getStatus() 
	{
		
		return status;
	}
	public  String validate() throws Exception
	{
		String rtstr=null;
		
		return rtstr;
	}
	
	public static  void  main(String a [])
	{
		loginBean test= new loginBean();
		System.out.println("calling Tibco");
		try
		{
			test.validate();
		}
		catch(Exception e)
		{
		;
			
		}
	}
	
}

