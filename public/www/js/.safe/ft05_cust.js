//alert('import cust.js');
var sarali="";


var objSwarasName= new SwarasName();

	var st ='<table class="ctable" border=1 >';
	var sr ='<tr>';
	var sd ='<td class="ctext">';
	var sc ='<td class="ccaption">';
	var dy = st;
	var et ='</table>';
	var er ='</tr>';
	var ed ='</td>';

	var channel_max = 8*12;										// number of channels
	audiochannels = new Array();
	for (a=0;a<channel_max;a++) {									// prepare the channels
		audiochannels[a] = new Array();
		audiochannels[a]['channel'] = new Audio();						// create a new audio object
		audiochannels[a]['finished'] = -1;							// expected end time for this channel
	}
	function play_multi_sound(s) {
		for (a=0;a<audiochannels.length;a++) {
			thistime = new Date();
			if (audiochannels[a]['finished'] < thistime.getTime()) {			// is this channel finished?
				audiochannels[a]['finished'] = thistime.getTime() + document.getElementById(s).duration*1000;
				audiochannels[a]['channel'].src = document.getElementById(s).src;
				audiochannels[a]['channel'].load();
				audiochannels[a]['channel'].play();
				break;
			}
		}
	}


//alert('C:001:@@@');
function  onLoadPage()
{
    //document.forms[0].rlt.value =docSource;
//	alert('On Load');
	try
	{
	}
	catch(e)
	{
		alert('ONLException: ' + e);
	}
}
//alert('C:002:@@@');

function   cust_pre_onChange(obj)
{
   // alert("this is cust preOnchange");
}
//alert('C:004:@@@');


function   cust_post_onChange(obj)
{

	try
	{
	}
	catch(e)
	{
		alert('EXPPostTran'+e);
	}
}
//alert('C:005:@@@');

function   cust_pre_onKeyDown(obj)
{
   //  alert("this is cust preOnKeyPresse");
}
//alert('C:006:@@@');


function   cust_post_onKeyDown(obj)
{
    //alert("this is cust postOnKeyPress");
}

//alert('C:007:@@@');

function   cust_pre_onKeyUp(obj)
{
   //  alert("this is cust preOnKeyUp");
}
//alert('C:010:@@@');


function   cust_post_onKeyUp(obj)
{
    //alert("this is cust postOnKeyUp");
}


function   cust_pre_onKeyPress(obj)
{
   //  alert("this is cust preOnKeyPresse");
}


function   cust_post_onKeyPress(obj)
{
    //alert("this is cust postOnKeyPress");
}

function   cust_pre_onClick(obj)
{
   //alert("this is cust cust_pre_onClick");

//	$("expand").onclick();
//	alert("clicked on expand");
	$("#middleid").find( "*" ).addClass("active");


        // if the expand link's text is 'expand all', set closeOthers 
        // to false, open all sections and call checkOpen 
//	alert("click bind");
//$('#container .section').hide(1, checkOpen); 


       // if ($('#container #expand').html() == "Expand All") { 
             //   closeOthers = false; 
                $('#container .section').slideDown('normal', checkOpen); 
      //  } 
        // if the expand link's text is 'expand all', set closeOthers 
        // to true, hide all sections, and call checkOpen 
      //  else { 
        //        closeOthers = true; 
                // the 1 prevents nasty flickering in some browsers 
          //      $('#container .section').hide(1, checkOpen); 
        //} 
        return true; 
//}); 

}

function   cust_post_onClick(obj)
{
   // alert("this is cust cust_pre_onClick");
if(obj.getAttribute('task') == "EXPAND" )
{

}
}




//alert('C:011:@@@');
function onClickLink(objId,Link,title)
{
//	alert("onClickLink");
	
	try
	{
		var url="../helpWin/";
		url+=Link; 
		url+="?helpWin.sysDate=" +document.getElementById(objId).value;
		
			window.showModalDialog(url,title); 
	}
	catch(e)
	{
			alert("OCLExceprion:"+e);
	}
		
}
/*--
1-Indhu         - Ragas 1-6    - (Db, D swaras are fixed)
2-Nethra        - Ragas 7-12  - (Db, Eb swaras are fixed)
3-Agni           - Ragas 13-18 - (Db, E swaras are fixed)
4-Vedha         - Ragas 19-24 - (D, Eb swaras are fixed)
5-Bhana         - Ragas 25-30 - (D, E swaras are fixed)
6-Rudhu         - Ragas 31-36 - (Eb, E swaras are fixed)
 
7- Rishi            - Ragas 37-42 - (Db, D swaras are fixed)
8- Vasu           - Ragas 43-48 - (Db, Eb swaras are fixed)
9- Brahma        - Ragas 49-54 - (Db, E swaras are fixed)
10-Disi            - Ragas 55-60 - (D, Eb swaras are fixed)
11-Rudra         - Ragas 61-66 - (D, E swaras are fixed)
12-Adithya       - Ragas 67-72 - (Eb, E swaras are fixed)

--*/

function mod(n,m)
{
if((n%m)==0)
return m;
else
return n%m;
}

function ceil(	inp)
{
	var rtVal=0;
	var intVal=parseInt(inp)*1000000000000; // it will remove the decimel point
	var floatVal=inp*1000000000000; // it has the decimel point

      //  alert("intVal " +intVal);
        //alert("floatVal" +floatVal);
	if( intVal  <floatVal)
	{
		rtVal=parseInt(inp)+1;
	}
	else
	{
		rtVal=parseInt(inp);	
	}
	

	return rtVal;
}
//alert('end cust.js');
