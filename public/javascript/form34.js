/*jsp functions starts here*/
var countryArray = new Array();
var stateArray = new Array();
var districtArray = new Array();
var nationalityArray = new Array();
var Qualificationresult="";
var prevCheckboxList = "";
var tablecheckboxid = "";
var flag = "N";
var validate =true;
var finalCheck = "true"; 
var applicationData = new Array();


jQuery(function(){
       jQuery('#container-11').tabs();
       jQuery('.nexttabbutton').click( //function called onclick of next button takes the class
	       function(){
		        if(validate){
			     	 var xTab = 26;
			     	 var buttonid = jQuery(this).attr("id");
			     	 var ntab = buttonid.slice(-1);
			     	 var tabIndx = (parseInt(xTab)+parseInt(ntab))
			         var currfrag = "fragment-" + tabIndx;
					 var nextfrag = "fragment-" + (++tabIndx);
					 jQuery("#" + nextfrag).css("display","block");
					 jQuery("#" + currfrag).css("display","none");
					 jQuery("." + nextfrag).addClass("tabs-selected");
					 jQuery("." + currfrag).removeClass("tabs-selected");
					 return false;
			 	}
				else{
				//  alert("Data not validated");
				}
	     });
});           
           
    
function doValidateNew() {

 var tab1_Validation=false; 
 var tab2_Validation=false;
 var tab3_Validation=false;
 var tab4_Validation=false;
 var tab5_Validation=false;
      
    tab1_Validation = eval('validatePersonalDetails()');

	if(tab1_Validation) {
	tab2_Validation = eval('validateTestDetails()');
	}
	if(tab2_Validation){
	tab3_Validation = eval('validatePaymentDetails()');	
	}
		
		
		if(tab3_Validation){
		if(confirm("Are you sure you want to submit the form ?"))
		{
			eval('saveDataNew()');
		}
		else 
		{
			//$('#container-11').triggerTab(1);
			validate=false;
        	return false;	
		}
	}
	
}
function saveDataNew(){
      /* if(document.getElementById('DomicileState').style.display=='block'){
			var index=document.getElementById('DomicileState').selectedIndex;
			document.getElementById('txtDomicileState').value=document.getElementById('DomicileState').options[index].text;
		}
		else if(document.getElementById('txtDomicileState').style.display=='block'){
			//document.getElementById('txtDomicileState').value=document.getElementById('apptxtDomicileSt').value;
		}*/
				
		if(document.getElementById('State').style.display=='block'){
			//alert("dropdwn state value");
			var index=document.getElementById('State').selectedIndex;
			document.getElementById('txtState').value=document.getElementById('State').options[index].text;
		}
		else if(document.getElementById('txtState').style.display=='block'){
			//alert("text state value");
			//document.getElementById('txtState').value=document.getElementById('apptxtSt').value;
		}
		
		
				//if(doValidateNew()){
				document.onlineAppForm.encoding = "multipart/form-data";
		         //document.onlineAppForm.subAction.value="saveFormData";
		         document.getElementById("subAction").value="saveFormData";   
		         document.onlineAppForm.action = "onlineApplicationAction.do";
		         document.onlineAppForm.submit();
		       //  }
}
function validatePersonalDetails(){

  if (trim(document.getElementById("txtAppFirstName").value) == '') {
        $('#container-11').triggerTab(1);
        alert("Please enter the Applicant Name.");
       	validate=false;
        return false;
    }
    else{
    	validate=true;
    }
   /* 
    if (trim(document.getElementById("txtAppLastName").value) == '') {
        $('#container-11').triggerTab(1);
        alert("Please enter the Applicant Last Name or put the DOT (.) in the box given for the Last Name. ");
       	validate=false;
        return false;
    }
    else{
    	validate=true;
    }
    */
    
    document.getElementById('txtAppName').value = trim(document.getElementById("txtAppFirstName").value);
   // document.getElementById('billing_cust_name').value= trim(document.getElementById('txt_CreditCardName').value);
    //document.getElementById('billing_cust_name').value = trim(document.getElementById("txtAppFirstName").value)+' '+trim(document.getElementById("txtAppLastName").value);
        
    if (trim(document.getElementById("appDob").value) == '') {
         $('#container-11').triggerTab(1);
        alert("Please select the Applicant Date of Birth.");
        validate=false;
        return false;
    }
    else{
    	validate=true;
    }
    
    
     var currentTime = new Date("January 1, 1993 11:13:00");
    //var currentTime="Thu Apr 18 1996 00:00:00 GMT+0530 (India Standard Time)";
   // var currentTime=new Date();
    var dob=new Date(trim(document.getElementById("appDob").value));
    
    if(dob>currentTime){
    	$('#container-11').triggerTab(1);
    	alert("Please select correct Date of Birth");
    	validate=false;
    	return false;
    }
    else{
    	validate=true;
    }

  
    if (trim(document.getElementById("txtAppSex").value)=="") {
        $('#container-11').triggerTab(1);
        alert("Please select Applicant's gender.");
        validate=false;
        return false;
    }
    else{
    	validate=true;
    }
    
     if (trim(document.getElementById("txtParentName").value) == '') {
        $('#container-11').triggerTab(1);
        alert("Please enter the Applicant Father's Name.");
        validate=false;
        return false;
    }
    else{
    	validate=true;
    }
    
    if (trim(document.getElementById("txtMotherName").value) == '') {
        $('#container-11').triggerTab(1);
        alert("Please enter the Applicant Mother's Name.");
        validate=false;
        return false;
    }
    else{
    	validate=true;
    }
    
   if(trim(document.getElementById("txtAppFirstName").value) == trim(document.getElementById("txtParentName").value)){
       $('#container-11').triggerTab(1);
        alert("Candidate's Name and Candidate's Father's/Husband's Name cannot be same.");
        validate=false;
        return false;
    }
    else{
    	validate=true;
    }
    
    if(trim(document.getElementById("txtAppFirstName").value) == trim(document.getElementById("txtMotherName").value)){
       $('#container-11').triggerTab(1);
        alert("Candidate's Name and Candidate's Mother's Name cannot be same.");
        validate=false;
        return false;
    }
    else{
    	validate=true;
    }
    
    if(trim(document.getElementById("txtParentName").value) == trim(document.getElementById("txtMotherName").value)){
       $('#container-11').triggerTab(1);
        alert("Candidate's Father's/Husband's Name and Candidate's Mother's Name cannot be same.");
        validate=false;
        return false;
    }
    else{
    	validate=true;
    }
   
    
    
    
    if (trim(document.getElementById("txtAddress1").value) == '') {
        $('#container-11').triggerTab(1);
        alert("Please enter the Applicant's Address Line1.");
        validate=false;
        return false;
    }
   else{
    	validate=true;
    }
     if (trim(document.getElementById("txtAddress2").value) == '') {
        $('#container-11').triggerTab(1);
        alert("Please enter the Applicant's Address Line2.");
        validate=false;
        return false;
    }
   else{
    	validate=true;
    }
    
    
   
    
    
     
    
   if(trim(document.getElementById("txtEmail").value) == ''){
		$('#container-11').triggerTab(1);
		alert("Please enter email id.");
		validate=false;
        return false;
    }
    else{
    	validate=true;
    }

	if(trim(document.getElementById("txtConfirmEmail").value) == ''){
		$('#container-11').triggerTab(1);
		alert("Please confirm email id.");
		validate=false;
        return false;
    }
    else{
    	validate=true;
    }
    
    if(trim(document.getElementById("txtEmail").value) != trim(document.getElementById("txtConfirmEmail").value)){
		$('#container-11').triggerTab(1);
		alert("The confirmed email id does not match with email id.");
		validate=false;
        return false;
    }
    else{
    	validate=true;
    }
  	
  	if(!validateEmail(document.getElementById('txtEmail').value,false)){
	  $('#container-11').triggerTab(1);	
	  alert('The Email ID format is invalid,the valid Email Id format is name@org.com or name@org.co.in ' );
 	//document.forms[0].emailId.focus();
 	validate=false;
	return false;
	
    }
    else{
    	validate=true;
    }
    
    if(!validateEmail(document.getElementById('txtConfirmEmail').value,false)){
      $('#container-11').triggerTab(1);	
	  alert('The Email ID format is invalid,the valid Email Id format is name@org.com or name@org.co.in' );
 	//document.forms[0].emailId.focus();
 	validate=false;
	return false;
	
    }
    else{
    	validate=true;
    }

	/*if((trim(document.getElementById('txtAltEmail').value)!='')){
		if(!validateEmail(trim(document.getElementById('txtAltEmail').value),false)){
	  		$('#container-11').triggerTab(1);	
	  		alert('The Email ID format is invalid,the valid Email Id format is name@org.com or name@org.co.in ' );
 			//document.forms[0].emailId.focus();
 			validate=false;
			return false;
			
    	}
    	else{
    		validate=true;
    	}
	}

	if(trim(document.getElementById('txtEmail').value) == trim(document.getElementById("txtAltEmail").value)){
	$('#container-11').triggerTab(1);
	alert("Alternate Email can not same as Email.");
	validate=false;
	return false;
	}
	else{
		validate=true;
	}*/
    
    if(trim(document.getElementById("txtCountry").value) == '0'){
		$('#container-11').triggerTab(1);
		alert("Please select Applicant's Country.");
		validate=false;
        return false;
    }
    else{
		validate=true;
	}
	
    
    
    if(document.getElementById("State").style.display=='block'){
    	if (trim(document.getElementById("State").value) == '0') {
        	$('#container-11').triggerTab(1);
        	alert("Please select Applicant's State.");
        	validate=false;
        	return false;
    	}
    	else{
    		validate=true;
    	}
    }
    
    if(document.getElementById("txtState").style.display=='block'){
    	if (trim(document.getElementById("txtState").value) == '') {
	        $('#container-11').triggerTab(1);
	        alert("Please enter Applicant's State.");
	        validate=false;
	        return false;
    	}
    	else{
    		validate=true;
    	}
    }
    
     if(trim(document.getElementById("txtCity").value) == '0'){
		$('#container-11').triggerTab(1);
		alert("Please select Applicant's City.");
		validate=false;
        return false;
    }
    else{
		validate=true;
	}
    
     if(trim(document.getElementById("txtCity").value) == '' ){
		$('#container-11').triggerTab(1);
		alert("Please enter Applicant's City.");
		validate=false;
        return false;
    }
    else{
		validate=true;
	}
    
    
	
    
     /*if(document.getElementById("DomicileState").style.display=='block'){
    	if (document.getElementById("DomicileState").value == "0") {
        	$('#container-11').triggerTab(1);
        	alert("Please select Applicant's Domiciled State.");
        	validate=false;
        	return false;
    	}
    	else{
    		validate=true;
    	}
    }
    
    if(document.getElementById("txtDomicileState").style.display=='block'){
    	if (document.getElementById("txtDomicileState").value == '') {
	        $('#container-11').triggerTab(1);
	        alert("Please enter Applicant's Domiciled State.");
	        validate=false;
	        return false;
    	}
    	else{
    		validate=true;
    	}
    }*/
    
   /* if(isNaN(trim(document.getElementById('txtMobileAreaCode').value))){
       $('#container-11').triggerTab(1);
       alert("Please enter number in Mobile AreaCode");
       document.getElementById('txtMobileAreaCode').value='';
	   //document.getElementById('txtMobileAreaCode').focus();
	   validate=false;
	   return false;
    }
    else{
		validate=true;
	}*/
	
    /*if(isNaN(trim(document.getElementById('txtMobileNo').value))){
       $('#container-11').triggerTab(1);
       alert("Please enter number in Mobile Number");
	   document.getElementById('txtMobileNo').value='';
	   //document.getElementById('txtMobileNo').focus();
	   validate=false;
	   return false;
    }
    else{
		validate=true;
	}*/
    
   /* if(isNaN(trim(document.getElementById('txtContactNoAreaCode').value))){
    	 $('#container-11').triggerTab(1);
    	alert("Please enter number in ContactNo AreaCode");
		document.getElementById('txtContactNoAreaCode').value='';
		//document.getElementById('txtContactNoAreaCode').focus();
		validate=false;
		return false;
    }
    else{
    	validate=true;
    }*/
    
   /* if(isNaN(trim(document.getElementById('txtContactNoSTDCode').value))){
    	$('#container-11').triggerTab(1);
    	alert("Please enter number in ContactNo STDCode");
		document.getElementById('txtContactNoSTDCode').value='';
		//document.getElementById('txtContactNoSTDCode').focus();
		validate=false;
		return false;
    }
    else{
    	validate=true;
    }
    
    if(isNaN(trim(document.getElementById('txtContactNo').value))){
    	$('#container-11').triggerTab(1);
        alert("Please enter number in ContactNo");
		document.getElementById('txtContactNo').value='';
		//document.getElementById('txtContactNo').focus();
		validate=false;
		return false;
    }
    else{
    	validate=true;
    }*/
    
    
	     if(trim(document.getElementById("txtPincode").value) == ''){
			$('#container-11').triggerTab(1);
			alert("Please enter Applicant's Pincode.");
			validate=false;
	        return false;
	    }
	    else{
			validate=true;
		}
	
	
     if(isNaN(trim(document.getElementById('txtPincode').value))){
       $('#container-11').triggerTab(1);
       alert("Please enter number in Pin Code");
	   document.getElementById('txtPincode').value='';
	   //document.getElementById('txtPincode').focus();
	   validate=false;
	   return false;
    }
    else{
		validate=true;
	}
	
     if (trim(document.getElementById("txtAppNationality").value) == "") {
        $('#container-11').triggerTab(1);
        alert("Please select Applicant's Nationality.");
        validate=false;
        return false;
    }
    else{
    	validate=true;
    }
    
    if (trim(document.getElementById("txtAppCategory").value) == "") {
        $('#container-11').triggerTab(1);
        alert("Please select Applicant's Category.");
        validate=false;
        return false;
    }
    else{
    	validate=true;
    }

    
	if (trim(document.getElementById("isDisabled").value)=="") {
        $('#container-11').triggerTab(1);
        alert("Please select Is Applicant Disabled.");
        validate=false;
        return false;
    }
    else{
    	validate=true;
    }
    if(document.getElementById("isDisabled").value=='Y' && document.getElementById("txtAppDisabled").value=='') {
        $('#container-11').triggerTab(1);
        alert("Please Mention the type of disability.");
        validate=false;
        return false;
    }
    else{
    	validate=true;
    }
	
    
   
           
    return true;
}

function validateTestDetails(){
		
		if (trim(document.getElementById("candTestCentrePref1Code").value) == '') {
        $('#container-11').triggerTab(2);
        alert("Please select Applicant's  Examination center Preference 1.");
        validate=false;
        return false;
		    }
		    else{
		    	validate=true;
		    }
		    
       /* if (trim(document.getElementById("candTestCentrePref2Code").value) == '') {
        $('#container-11').triggerTab(2);
        alert("Please select Applicant's  Examination center Preference 2.");
        validate=false;
        return false;
		    }
		    else{
		    	validate=true;
		    }
		 if (trim(document.getElementById("candTestCentrePref3Code").value) == '') {
        $('#container-11').triggerTab(2);
        alert("Please select Applicant's  Examination center Preference 3.");
        validate=false;
        return false;
		    }
		    else{
		    	validate=true;
		    }*/
		
		
		if(document.getElementById("candTestCentrePref2Code").value!='' || document.getElementById("candTestCentrePref3Code").value!=''){
		
		 if (trim(document.getElementById("candTestCentrePref1Code").value) == trim(document.getElementById("candTestCentrePref2Code").value)) {
	        $('#container-11').triggerTab(2);
	        alert(" Applicant's Examination center Preference 1 and Preference 2 should not be same.");
	        validate=false;
	        return false;
		    }
		    else{
		    	validate=true;
		    }
		
		 if (trim(document.getElementById("candTestCentrePref2Code").value) == trim(document.getElementById("candTestCentrePref3Code").value)) {
	        $('#container-11').triggerTab(2);
	        alert(" Applicant's Examination center Preference 2 and Preference 3 should not be same.");
	        validate=false;
	        return false;
		    }
		    else{
		    	validate=true;
		    }
		    
		 if (trim(document.getElementById("candTestCentrePref3Code").value) == trim(document.getElementById("candTestCentrePref1Code").value)) {
	        $('#container-11').triggerTab(2);
	        alert(" Applicant's Examination center Preference 3 and Preference 1 should not be same.");
	        validate=false;
	        return false;
		    }
		    else{
		    	validate=true;
		    }
		    
		     if (trim(document.getElementById("candTestCentrePref2Code").value) == trim(document.getElementById("candTestCentrePref1Code").value)) {
		        $('#container-11').triggerTab(2);
		        alert(" Applicant's Examination center Preference 2 and Preference 1 should not be same.");
		        validate=false;
		        return false;
		    }
		    else{
		    	validate=true;
		    }
		  }  
		
		if (trim(document.getElementById("candLangPref1Code").value) == '') {
        $('#container-11').triggerTab(2);
        alert("Please select   Applicant's Language Preference 1.");
        validate=false;
        return false;
		    }
		    else{
		    	validate=true;
		    }
		    
        if (trim(document.getElementById("candLangPref2Code").value) == '') {
        $('#container-11').triggerTab(2);
        alert("Please select  Applicant's Language Preference 2.");
        validate=false;
        return false;
		    }
		    else{
		    	validate=true;
		    }
		    
    
    
     if (trim(document.getElementById("candLangPref1Code").value) == trim(document.getElementById("candLangPref2Code").value)) {
        $('#container-11').triggerTab(2);
        alert(" Applicant's Language Preference 1 and Preference 2 should not be same.");
        validate=false;
        return false;
		    }
		    else{
		    	validate=true;
		    }
		    

		
		if (document.getElementById("txtQPMedium").value=="") {
    		$('#container-11').triggerTab(2);
        	alert("Please choose option for Medium of Question Paper.");
        	validate=false;
        	return false;
    	}else{
 			validate=true;
 			} 
 			
		if (document.getElementById("qualStatus").value=="") {
    		$('#container-11').triggerTab(2);
        	alert("Please choose option for status of the qualifying exam.");
        	validate=false;
        	return false;
    	}else{
 			validate=true;
 			} 
    	if (document.getElementById("groupRadio").value=="") {
    	$('#container-11').triggerTab(2);
        alert("Please choose Paper Applying for option.");
        validate=false;
        return false;
		 }
		 else{
		 		validate=true;
		 } 
		 if(((document.getElementById("groupRadio").value=="Paper-II")||(document.getElementById("groupRadio").value=="Both")) && document.getElementById("paper2Radio").value=="" ) {
    	$('#container-11').triggerTab(2);
        alert("Please choose Subject Offered for Paper-2 option.");
        validate=false;
        return false;
		 }
		 else{
		 		validate=true;
		 } 
		 if((document.getElementById("groupRadio").value=="Paper-I")&& (document.getElementById("txtMinEduQual1").value=="")) {
	    	$('#container-11').triggerTab(2);
	        alert("Please choose Minimum Education Qualification for becoming teacher for Classes I-V option.");
	        validate=false;
	        return false;
		 }
		 else{
		 		validate=true;
		 } 
		  if((document.getElementById("groupRadio").value=="Paper-II")&& (document.getElementById("txtMinEduQual2").value=="")) {
	    	$('#container-11').triggerTab(2);
	        alert("Please choose Minimum Education Qualification for becoming teacher for Classes VI-VIII option.");
	        validate=false;
	        return false;
		 }
		 else{
		 		validate=true;
		 } 
		  if((document.getElementById("groupRadio").value=="Both")&&((document.getElementById("txtMinEduQual2").value=="")||(document.getElementById("txtMinEduQual2").value==""))) {
	    	$('#container-11').triggerTab(2);
	        alert("Please choose Minimum Education Qualification for becoming teacher for Classes I-V option and Classes VI-VIII option.");
	        validate=false;
	        return false;
		 }
		 else{
		 		validate=true;
		 } 
 return true;
}


function validatePaymentDetails(){

			
			if(trim(document.getElementById("payment_mode").value)==''){
	        //$('#container-11').triggerTab(5);
	        alert("Please choose payment mode.");
	        finalCheck="false";	        
			return false;
				 }else{
				 		finalCheck="true";
				 }
	    
		if(document.getElementById("payment_mode").value=='dd'){
			
			if(document.getElementById("txt_DD_NO").value == ''){
			  //$('#container-11').triggerTab(4);
			  alert("Please enter the DD Number.");
			  return false;
            } 
			
			if(document.getElementById('dt_DD').value == ''){
              //$('#container-11').triggerTab(4);
              alert("Please select the DD date");
			  return false;
            } 
            var currentTime = new Date();
   		 	 var dob=new Date(document.getElementById("dt_DD").value);
   		  
   		   if(dob>currentTime){
   		     alert("Please select the correct DD date");
			  return false;
            } 

			/*if(document.getElementById('dd_Amount').value == ''){
				//$('#container-11').triggerTab(4);
				alert("Please enter a value on the basis of the category i.e.General and SC/ST etc .");
				return false;
			}*/

			if(document.getElementById('txt_DD_Drawn_Branch').value == ''){
				//$('#container-11').triggerTab(4);
				alert("Please enter the DD Drawn Bank Branch Name.");
				return false;
			}

            if(document.getElementById('txt_DD_Issue_Branch').value == ''){
				//$('#container-11').triggerTab(4);
				alert("Please enter the DD Issuing Bank Branch Name.");
				return false;
			}
			
			if(document.getElementById('txt_Bank_Code').value == ''){
				//$('#container-11').triggerTab(4);
				alert("Please enter the Bank Code.");
				return false;
			}
			}	
			
			if(trim(document.getElementById("payment_mode").value)=='online'){
    		    if(trim(document.getElementById("txt_CreditCardName").value)==''){
				   // $('#container-11').triggerTab(5);
					alert("Please enter your Name for Online Payment.");
					finalCheck="false";
				    return false;
				    }else{
				    	finalCheck="true";
				    }
				    }
		   /* if(document.getElementById("payment_mode").value=='online'){
		    	 if(document.getElementById("txt_Card_Amount").value==''){
		    	 alert("Please enter the amount for Online Payment.");
					finalCheck="false";
				    return false;
				    }else{
				    	finalCheck="true";
				    }
				    }*/
				
		    if(document.getElementById("acceptanceCHK").checked == false){
		       // $('#container-11').triggerTab(4);
		        alert("Please accept the Terms and Conditions.");
				return false;
		    }
		    return true;
    
}
function fnSelectValue(otherFieldName,selectValue){
	//alert("otherFieldName:"+otherFieldName+" selectValue:"+selectValue);
	document.getElementById(otherFieldName).value=selectValue;
}
function fnCheckRadio(id,hiddenField){
	document.getElementById(hiddenField).value=id.value;
}
function resetElementsInDiv(div) {
	var elms = document.getElementById(div).getElementsByTagName('*');
	var maxI = elms.length;

	for(var i = 0; i < maxI; i++) {    
	        var elm = elms[i];          
	        if("input" == elm.tagName.toLowerCase()){
	            if (elm.type=="text"||elm.type=="password"||elm.type=="hidden") {    
	                elm.value=elm.defaultValue;        
	            } else if (elm.type=="radio"||elm.type=="checkbox") {
	                elm.checked=elm.defaultChecked;        
	            }       
	        }else if("select" == elm.tagName.toLowerCase() && elm.disabled == false){
	            for (var j=0; j<elm.options.length;j++) {  
	                elm.options[j].selected=elm.options[j].defaultSelected;
	            }                   
	        }else if("textarea" == elm.tagName.toLowerCase()){
	            elm.value=elm.defaultValue;    
	        }
	    } 

}
function ltrim(str){
	if (str==null){return null;}
	for(var i=0;str.charAt(i)==" ";i++);
	return str.substring(i,str.length);
	}
function rtrim(str){
	if (str==null){return null;}
	for(var i=str.length-1;str.charAt(i)==" ";i--);
	return str.substring(0,i+1);
	}
function trim(str){return ltrim(rtrim(str));}

function trimWS( text ) {return (text || "").replace( /^\s+|\s+$/g, "" );} // white space removel function

function fnEditApplication(){
	//alert("m in form 34");
	document.loginForm.action="/EForms/editApplication.do?orgId=223&formId=34";
	document.loginForm.method="POST";
	document.loginForm.submit();
}

function  openImagePopUp(){
 
 window.open("applicantImageUploadAction.do?subAction=Display&formid=34","image","status=yes,height=600,width=800,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=no,top=100; left=100;");
  
 }
function fnPaperdetails(id){
//alert("inside function radio value:::"+id);
if((document.getElementById('groupRadio').value=="Paper-II") ||(document.getElementById('groupRadio').value=="Both")){
	document.getElementById('PaperIIResultTable').style.display='';		
}else if(document.getElementById('groupRadio').value=="Paper-I"){
	document.getElementById('PaperIIResultTable').style.display='none';
	//document.getElementsByName('txtMinEduQual1_R').disabled="false";	
	//document.getElementsByName('txtMinEduQual1_R').disabled="true";
	
}/*else if(document.getElementById('groupRadio').value=="Paper-II"){
	document.getElementsByName('txtMinEduQual2_R').disabled="false";	
	document.getElementsByName('txtMinEduQual1_R').disabled="true";
}
else if(document.getElementById('groupRadio').value=="Both"){
	document.getElementsByName('txtMinEduQual2_R').disabled="false";	
	document.getElementsByName('txtMinEduQual1_R').disabled="false";
}*/
}


function fnDisabled(id){
document.getElementById('Is_disabled').value=id;
if(id=='Y'){
document.getElementById('Is_disabled').style.display = "";
document.getElementById('txtAppDisabled').style.display="";

if(document.getElementById('dd_Amount').value="500")
{
document.getElementById('dd_Amount').text="250";
document.getElementById('dd_Amount').value="250";
}
if(document.getElementById('txt_Card_Amount').value="511.28")
{document.getElementById('txt_Card_Amount').text="255.64";
document.getElementById("txt_Card_Amount").value="255.64";
document.getElementById('txt_Amount').value = "255.64"; 
}


}
else if(id=='N'){
document.getElementById('Is_disabled').style.display="none";
document.getElementById('txtAppDisabled').style.display="none";
if(document.getElementById('dd_Amount').value="250" &&(document.getElementById("txtAppCategory").value==1 ||document.getElementById("txtAppCategory").value==4))
{
document.getElementById('dd_Amount').text="500";
document.getElementById('dd_Amount').value="500";
}
if(document.getElementById('txt_Card_Amount').value="255.64"&&(document.getElementById("txtAppCategory").value==1 ||document.getElementById("txtAppCategory").value==4))
{document.getElementById('txt_Card_Amount').text="511.28";
document.getElementById("txt_Card_Amount").value="511.28";
document.getElementById('txt_Amount').value = "511.28"; 
}


}
}


function getCheckedValue(radioObj) {
	if(!radioObj)
		return "";
	var radioLength = radioObj.length;
	if(radioLength == undefined)
		if(radioObj.checked)
			return radioObj.value;
		else
			return "";
	for(var i = 0; i < radioLength; i++) {
		if(radioObj[i].checked) {
			return radioObj[i].value;
		}
	}
	return "";
}
function fnSetDDAmount(elemt){
	var categoryText = document.getElementById(elemt.id);
	//alert("txtAppCategory:::"+document.getElementById("txtAppCategory").value);
	var curText = categoryText.options[categoryText.selectedIndex].text;
	//alert("curText:::"+curText);
    if(curText=="General" ||curText=="OBC"){
    	document.getElementById('dd_Amount').text="500";
    	document.getElementById('dd_Amount').value="500";
    }
    else{
    	document.getElementById('dd_Amount').text="250";
    	document.getElementById('dd_Amount').value="250";
    }
}

function view(id) {
	
	var radioVal=id.value;
	
	eval( resetElementsInDiv('choose_dd'));
	eval( resetElementsInDiv('choose_online'));
	
	document.getElementById("payment_mode").value = radioVal;
    document.getElementById('choose_dd').style.display = "none";
    document.getElementById('choose_online').style.display = "none";
   
  	ge = document.getElementById('choose_'+radioVal);
  	
    ge.style.display = "block";
    
    
    if(radioVal=="dd" &&  (document.getElementById("isDisabled").value=='Y')){
    //alert("inside view:::");
    document.getElementById('dd_Amount').text="250";
    document.getElementById("dd_Amount").value="250";
     document.getElementById('txt_Amount').value = "250"; 
    }else if(radioVal=="dd" &&  (document.getElementById("isDisabled").value=='N')&&(document.getElementById("txtAppCategory").value==1 ||document.getElementById("txtAppCategory").value==4)){
   	//alert("inside else if for category general and obc");
   	document.getElementById('dd_Amount').text="500";
    document.getElementById("dd_Amount").value="500";
     document.getElementById('txt_Amount').value = "500"; 
    }else if(radioVal=="dd" &&  (document.getElementById("isDisabled").value=='N')&&(document.getElementById("txtAppCategory").value==2 ||document.getElementById("txtAppCategory").value==3)){
   	//alert("inside else if for category sc/st");
   	document.getElementById('dd_Amount').text="250";
    document.getElementById("dd_Amount").value="250";
     document.getElementById('txt_Amount').value = "250"; 
    }
    
    
    if(radioVal=="online" &&  (document.getElementById("isDisabled").value=='Y')){
    //alert("inside view:::");
    document.getElementById('txt_Card_Amount').text="255.64";
    document.getElementById("txt_Card_Amount").value="255.64";
    document.getElementById('txt_Amount').value = "255.64"; 
    }else if(radioVal=="online" &&  (document.getElementById("isDisabled").value=='N')&&(document.getElementById("txtAppCategory").value==1 ||document.getElementById("txtAppCategory").value==4)){
   	//alert("inside else if for category general and obc");
   	document.getElementById('txt_Card_Amount').text="511.28";
    document.getElementById("txt_Card_Amount").value="511.28";
    document.getElementById('txt_Amount').value = "511.28"; 
    }else if(radioVal=="online" &&  (document.getElementById("isDisabled").value=='N')&&(document.getElementById("txtAppCategory").value==2 ||document.getElementById("txtAppCategory").value==3)){
   	//alert("inside else if for category sc/st");
   	document.getElementById('txt_Card_Amount').text="255.64";
    document.getElementById("txt_Card_Amount").value="255.64";
    document.getElementById('txt_Amount').value = "255.64"; 
    }
  /* if(radioVal=="online"){
   document.getElementById('choose_online').style.display = "";
   document.getElementById('choose_dd').style.display = "none";
    document.getElementById('txt_Amount').value = "1750";
    }else if(radioVal=="dd"){
    document.getElementById('choose_dd').style.display = "";
    document.getElementById('choose_online').style.display = "none";
   document.getElementById('txt_Amount').value = "1700";
    }
     */
    if(radioVal="online")
    { 
   // var midname = trim(document.getElementById("txtAppMiddleName").value)==''?'':trim(document.getElementById("txtAppMiddleName").value)+' ';
    document.getElementById('txt_CreditCardName').value = trim(document.getElementById("txtAppFirstName").value);
    }
    else{
    document.getElementById('txt_CreditCardName').value='';
    }
    
}

function paper(a)
{
    if(a=='Paper-I')
    { 
       document.getElementById('paper1').style.display='';
       document.getElementById('paper2').style.display='none';
    }
    else if(a=='Paper-II')
    {
       document.getElementById('paper1').style.display='none';
       document.getElementById('paper2').style.display='';
    }
    else if(a=='Both')
    {
       document.getElementById('paper1').style.display='';
       document.getElementById('paper2').style.display='';
    }
}


