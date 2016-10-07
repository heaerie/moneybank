//alert("Improt  melakartha.js ");
var rn=new Array("","kanakAngi ","rathnAngi  ","gAnamUrthi ","vanaspathi ","mAnavathi ","thAnarUpi ","sEnAvathi ","HanumathOdi ","DhEnukA ","nAtakapriya ","kOkilapriya ","rUpavathi ","gAyakapriya ","vakulAbharaNam ","mAyAmALava gowLA ","chakravAkam ","sUryakAntam ","HAtakAmbari ","JankAradhvani ","naTabhairavi ","kIravANi ","KaraHarapriya ","gowrimanOHari ","varuNapriya ","mAraranjani ","chArukeshi ","sarasAngi ","HarikAmbhOji ","DhIrashankarAbharaNam ","nAgAnandhini ","yAgapriya ","rAgavarDhani ","gAngeyabhushani ","vAgaDhIsvari ","shUlini ","chalanAta ","sAlagam ","jalArnavam ","JAlavarALi ","navanItham ","pAvani ","raGupriya ","gavAmbodhi ","bhavapriya ","shubhapanthuvarALi ","shadhvidha mArgiNi ","suvarNAngi ","dhivyAmaNi ","dhavalAmbari ","nAmanArAyaNi ","kAmavardhini (Pantuvarali) ","rAmapriya ","gamanashrama ","vishvAmbhari ","shyAmaLAngi ","shanmuKapriya ","simHendra madhyamam ","HemAvathi ","DharmAvathi ","nIthimathi ","kAnthAmaNi ","rishabhapriya ","lathAngi ","vAchaspathi ","mEchakalyANi ","chithrAmbari ","sucharithra ","jyothisvarUpiNi ","dhAtuvardhani ","nAsika bhUshaNi ","kosalam ","rasikapriya ");
/*Raga names*/
var lv_i=0;
function writeCombo(name)
{


////alert(name);
  with (document)
  {   write('<td class="ctext">');
   write('Raga Name');
   write('</td>');
   write('<td class="ctext">');
   write('<select id= "rName'+name+'"  name="rName'+name+'"  onchange="javascript:rNo.value=rName'+name+'.value; val1(this);">');
   for(lv_i=1;lv_i<rn.length;lv_i++)
   write('<option value='+ lv_i+'>'+rn[lv_i]+'</option>');
   write('</select>');
   write('</td>');
   write('<td class="ctext">');
   write('Melakartha No ');
   write('</td>');
   write('<td class="ctext">');
   write('<select id="rNo'+name+'"  name="rNo" nameid="'+name+'"  onchange="javascript:rName.value=rNo.value; val1(this);" >');
   for(lv_i=1;lv_i<rn.length;lv_i++)
   write('<option value='+ lv_i+'>'+lv_i+'</option>');
   write('</select>');
   write('</td>');
  }
}

function rtWriteCombo(name)
{
	
	 var rn=new Array("","kanakAngi ","rathnAngi  ","gAnamUrthi ","vanaspathi ","mAnavathi ","thAnarUpi ","sEnAvathi ","HanumathOdi ","DhEnukA ","nAtakapriya ","kOkilapriya ","rUpavathi ","gAyakapriya ","vakulAbharaNam ","mAyAmALava gowLA ","chakravAkam ","sUryakAntam ","HAtakAmbari ","JankAradhvani ","naTabhairavi ","kIravANi ","KaraHarapriya ","gowrimanOHari ","varuNapriya ","mAraranjani ","chArukeshi ","sarasAngi ","HarikAmbhOji ","DhIrashankarAbharaNam ","nAgAnandhini ","yAgapriya ","rAgavarDhani ","gAngeyabhushani ","vAgaDhIsvari ","shUlini ","chalanAta ","sAlagam ","jalArnavam ","JAlavarALi ","navanItham ","pAvani ","raGupriya ","gavAmbodhi ","bhavapriya ","shubhapanthuvarALi ","shadhvidha mArgiNi ","suvarNAngi ","dhivyAmaNi ","dhavalAmbari ","nAmanArAyaNi ","kAmavardhini (Pantuvarali) ","rAmapriya ","gamanashrama ","vishvAmbhari ","shyAmaLAngi ","shanmuKapriya ","simHendra madhyamam ","HemAvathi ","DharmAvathi ","nIthimathi ","kAnthAmaNi ","rishabhapriya ","lathAngi ","vAchaspathi ","mEchakalyANi ","chithrAmbari ","sucharithra ","jyothisvarUpiNi ","dhAtuvardhani ","nAsika bhUshaNi ","kosalam ","rasikapriya ");

alert(name);
 var rtString="";
 
 rtString+='<td class="ctext">';
 rtString+='Raga Name';
 rtString+='</td>';
 rtString+='<td class="ctext">';
 rtString+='<select id= "rName'+name+'"  name="rName" nameid="'+name+'"  onchange="javascript:rNo.value=rName.value; val1(this;">';
 for(lv_i=1;lv_i<rn.length;lv_i++)
 rtString+='<option value='+ lv_i+'>'+rn[lv_i]+'</option>';
 rtString+='</select>';
 rtString+='</td>';
 rtString+='<td class="ctext">';
 rtString+='Melakartha No ';
 rtString+='</td>';
 rtString+='<td class="ctext">';
 rtString+='<select id="rNo'+name+'"  name="rNo" nameid="'+name+'"  onchange="javascript:rName.value=rNo.value; val1(this;" >';
 for(lv_i=1;lv_i<rn.length;lv_i++)
 rtString+='<option value='+ lv_i+'>'+lv_i+'</option>';
 rtString+='</select>';
 rtString+='</td>';
 
 return rtString;
}

function val1(obj)
{
	//alert("val");
 var lrg =0;
 var name=obj.getAttribute('nameid');
if(obj.name=="rName")
{
document.getElementById("rNo"+name).value = obj.value;

}
else
{
document.getElementById("rName"+name).value = obj.value;
}


var v_rNo= parseInt(document.getElementById("rNo"+name).value);

 if(v_rNo ==0)
 {
  alert("plese Chose Raga Or Mela No!");
  return false;
 }
 else
 {
  if(v_rNo > 36)
  {

  document.getElementById("m"+name).value =36;

   v_rNo = v_rNo-36;
  }
  else
  {
    document.getElementById("m"+name).value=0;
  }


   lrg= parseInt(v_rNo );
   if(lrg>=7 &&  lrg<=12)
   {
    document.getElementById("r"+name).value=0;
	document.getElementById("g"+name).value=6;
   }

   else if(lrg>=13 &&  lrg<=18)
   {
    document.getElementById("r"+name).value=0;
    document.getElementById("g"+name).value=12;
   }
   else if(lrg>=19 &&  lrg<=24)
   {
    document.getElementById("r"+name).value=12;
    document.getElementById("g"+name).value=6;
   }
   else if(lrg>=25 &&  lrg<=30)
   {
    document.getElementById("r"+name).value=12;
    document.getElementById("g"+name).value=12;
   }
   else if(lrg>=31 &&  lrg<=36)
   {
    document.getElementById("r"+name).value=18;
    document.getElementById("g"+name).value=12;
   }
   else if(lrg>=1 &&  lrg<=6)
   {
    document.getElementById("r"+name).value=0;
    document.getElementById("g"+name).value=0;
   }


  lrg=0;

  lrg= v_rNo %6;
  if(lrg ==1)
  {
   document.getElementById("d"+name).value=0;
   document.getElementById("n"+name).value=1;
  }
  else if(lrg ==2)
  {
   document.getElementById("d"+name).value=0;
   document.getElementById("n"+name).value=2;
  }
  else if(lrg ==3)
  {

   document.getElementById("d"+name).value=0;
   document.getElementById("n"+name).value= 3;
  }
  else if(lrg == 4 )
  {
   document.getElementById("d"+name).value=2;
   document.getElementById("n"+name).value=2;
  }
  else if(lrg == 5 )
  {
   document.getElementById("d"+name).value=2;
   document.getElementById("n"+name).value=3;
  }
  else if(lrg == 0 )
  {
   document.getElementById("d"+name).value=3;
   document.getElementById("n"+name).value=3;
  }
 }
}
function valfmtrg(b,name)
{
	
	alert(name);
	var objr =document.getElementById("r"+name);
	var objg=document.getElementById("g"+name);
	
	try
	{
		
	alert("r= " + objr.getAttribute('sra')+ "g= " + objg.getAttribute('sra'));	
	if( objr.getAttribute('sra')   < objg.getAttribute('sra'))
		;
	else
	{
		alert("this isn't a proper raga");
		b.value=0;
		return 0;
	}
	}
	catch(e)
	{
		alert('Exception:'+e);
	}
return 1;
}
function valfmtdn(b)
{
obj=document.forms[0];
if( obj.d.sra   < obj.n.sra )
;
else
{
alert("This isn't a proper Raga");

if(b.id=='n')
{
b.value=1;
}
else
b.value=0;
return 0;
}
return 1;
}

function val3()
{
	try
	{

var r=document.forms[0].r;
var g=document.forms[0].g;
var d=document.forms[0].d;
var n=document.forms[0].n;

if(r.value==0) r.setAttribute('sra',1);
if(r.value==12)r.setAttribute('sra',2);
if(r.value==18)r.setAttribute('sra',3);
if(g.value==0) g.setAttribute('sra',2);
if(g.value==6) g.setAttribute('sra',3);
if(g.value==12)g.setAttribute('sra',4);
if(d.value==0) d.setAttribute('sra',1);
if(d.value==2) d.setAttribute('sra',2);
if(d.value==3) d.setAttribute('sra',3);
if(n.value==1) n.setAttribute('sra',2);
if(n.value==2) n.setAttribute('sra',3);
if(n.value==3) n.setAttribute('sra',4);

	}
	catch(e)
	{
		alert("val3 ="+e);
	}
return true;
}






function val2( name)
{
 var i= 0;
 var r= 0;
 //alert('call val3');
val3(name);
document.getElementById("g"+name).onchange();
document.getElementById("n"+name).onchange();
var s=0;
var s =document.getElementById("s"+name).value;
var r=document.getElementById("r"+name).value;
var g=document.getElementById("g"+name).value;
var m=document.getElementById("m"+name).value;
var p=document.getElementById("p"+name).value;
var d=document.getElementById("d"+name).value;
var n=document.getElementById("n"+name).value;
s=parseInt(s);
r=parseInt(r);
g=parseInt(g);
m=parseInt(m);
p=parseInt(p);
d=parseInt(d);
n=parseInt(n);
document.getElementById("rName"+name).value = s+r+g+m+p+d+n;
document.getElementById("rNo"+name).value = s+r+g+m+p+d+n;
}

function cl(obj)
{

var swraCombination = obj.value;
var i_RagaClass=1;
var name="";

if(obj.id=="avan")
{
	i_RagaClass=parseInt(document.getElementById("ava").value );
		name="avr1";


}
else
{
	i_RagaClass=parseInt(document.getElementById("aro").value );
name="aro1";

}
////alert(" i_RagaClass "+i_RagaClass);
ebabledAll(name);
if( i_RagaClass ==2 )
{


	switch(parseInt(swraCombination))
	{
		case 1:

			document.getElementById("n"+name).disabled = true;
		break;
		case 2:

				document.getElementById("d"+name).disabled = true;
		break;
		case 3:
				document.getElementById("p"+name).disabled = true;
		break;
		case 4:

				document.getElementById("m"+name).disabled = true;
		break;
		case 5:

				document.getElementById("g"+name).disabled = true;
		break;
		case 6:
				document.getElementById("r"+name).disabled = true;
		break;


	}
}
else if( i_RagaClass ==3 )
{
	var i_sc =parseInt(swraCombination);
	if( i_sc >= 1 && i_sc <=5)
	{
	document.getElementById("n"+name).disabled = true;
	}
	if (( i_sc >= 6 && i_sc <=9) || (i_sc == 1) )
	{
		document.getElementById("d"+name).disabled = true;
	}
	if (( i_sc >= 10 && i_sc <=12) || (i_sc == 2) || (i_sc == 6))
	{
		document.getElementById("p"+name).disabled = true;
	}
	if (( i_sc >= 13 && i_sc <=14) || (i_sc == 3) || (i_sc == 7)|| (i_sc == 10))
		{
			document.getElementById("m"+name).disabled = true;
	}
	if ( (i_sc == 5) || (i_sc == 9)|| (i_sc == 12)|| (i_sc == 14)|| (i_sc == 15))
	{
				document.getElementById("r"+name).disabled = true;
	}
	if ( (i_sc ==4) || (i_sc == 8)|| (i_sc == 11)|| (i_sc == 13)|| (i_sc == 15))
		{
					document.getElementById("g"+name).disabled = true;
	}
}


}

function ebabledAll(name)
{
document.getElementById("n"+name).disabled = false;
document.getElementById("d"+name).disabled = false;
document.getElementById("p"+name).disabled = false;
document.getElementById("m"+name).disabled = false;
document.getElementById("g"+name).disabled = false;
document.getElementById("r"+name).disabled = false;
}

function onchange(obj)
{
	alert('onchange');
}

function wrtMel(name,caption)
{

//alert("name" +name +"|"+caption);


document.write('<tr>');
document.write('<td class="ccaption" colspan=10>');
document.write('<span id="srafmt'+name+'" >'+caption+'  </span>');
document.write('</td>');
document.write('</tr>');
document.write(' <TR>');
document.write('<tr>');
dyCombo(name);
document.write('</tr>');
document.write('<TD class="ctext">');
document.write('  svara Format: </TD>');
document.write('<TD colspan=2>');

document.write('<SELECT id=s'+name+'   name=s> <OPTION value=0 selected>S</OPTION>');
document.write('</SELECT>');

document.write('<SELECT id=r'+name+'  nameid="'+name+'" onchange="javascript:if(this.value==0)this.setAttribute(\'sra\',1);if(this.value==12)this.setAttribute(\'sra\',2);if(this.value==18)this.setAttribute(\'sra\',3);"   name=r sra="1">');
document.write('<OPTION value=0 selected>R1</OPTION>');
document.write('<OPTION value=12>R2</OPTION> <OPTION value=18>R3</OPTION>');
document.write('</SELECT>');
document.write('<SELECT  id=g'+name+' nameid="'+name+'" onchange="javascript:onchange(this):"           name=g sra="2">');
document.write('<OPTION  value=0 selected>G1</OPTION>');
document.write('<OPTION  value=6>G2</OPTION> <OPTION value=12>G3</OPTION>');
document.write('</SELECT>');

document.write('<SELECT          id=m'+name+'   name=m>');
document.write('<OPTION value=0 selected>M1</OPTION>');
document.write('<OPTION   value=36>M2</OPTION>');
document.write('</SELECT> <SELECT id=p'+name+'  name=p>');
document.write('<OPTION value=0   selected>P</OPTION>');
document.write('</SELECT> <SELECT id=d'+name+'   nameid="'+name+'"  onchange=javascript:if(this.value==0)this.sra=1;if(this.value==2)this.sra=2;if(this.value==3)this.sra=3;            name=d sra="1">');
document.write('<OPTION value=0 selected>D1</OPTION>');
document.write('<OPTION  value=2>D2</OPTION>');
document.write('<OPTION value=3>D3</OPTION>');
document.write('</SELECT>');

document.write('<SELECT  id=n'+name+'  nameid="'+name+'"  rval="d'+name+'" onchange="javascript:if(this.value==1)this.sra=2;if(this.value==2)this.sra=3;if(this.value==3) this.sra=4; valfmtdn(this,this.getAttribute("nameid")); obj=this; "             name=n sra="2">');
document.write('<OPTION value=1 selected>N1</OPTION>');
document.write('<OPTION     value=2>N2</OPTION> <OPTION value=3>N3</OPTION>');
document.write('</SELECT>');

document.write('</TD>');

document.write('<TD class="ctext">&nbsp;<LABEL id=h onclick=javascript:newwindow()> help       </LABEL>');
document.write('</TD>');
document.write('<TD class="ctext" >');

document.write('<INPUT class="button1" id='+name+' nameid="'+name+'" onclick="javascript:val2(this.id);" type="button" value="'+caption+' Validate"  name="Validate" >');
document.write('</TD>');


document.write('</TR>');
return 0;

}

function chgsubclss(obj)
{

var comb=0;
var idn=obj.id ;
var idn=idn+'n';
var dycm='<select name= "sc" id='+idn+' onchange="javascript:cl(this)">';
switch(obj.value)
{
case '1': comb=1;break;
case '2': comb=6;break;
case '3': comb=15;break;
default:comb=1;
}
for(var k=1;k <=comb;k++)
{
dycm += '<option  value='+k+'> '+k+' </option>'
}

dycm += '</select>'
if(obj.id =="aro")
{
	drsc1.innerHTML="Swra Combination(aroganam)  " + comb;
	rsc1.innerHTML=dycm;
}
else
{
drsc2.innerHTML="Swra Combination (avraganam) " + comb;
rsc2.innerHTML=dycm;
}
document.getElementById(idn).onchange();

}
function fnDisArAv(b)
{
if( b.value ==1 )
{
document.forms[0].aro.disabled = true;
document.forms[0].ava.disabled = true;
document.forms[0].aro.value =1;
document.forms[0].ava.value =1;

chgsubclss(document.forms[0].aro);
chgsubclss(document.forms[0].ava);
}
else
{
document.forms[0].aro.disabled = false;
document.forms[0].ava.disabled = false;
}
}


function dyCombo(name)
{


 var rn=new Array("","kanakAngi ","rathnAngi  ","gAnamUrthi ","vanaspathi ","mAnavathi ","thAnarUpi ","sEnAvathi ","HanumathOdi ","DhEnukA ","nAtakapriya ","kOkilapriya ","rUpavathi ","gAyakapriya ","vakulAbharaNam ","mAyAmALava gowLA ","chakravAkam ","sUryakAntam ","HAtakAmbari ","JankAradhvani ","naTabhairavi ","kIravANi ","KaraHarapriya ","gowrimanOHari ","varuNapriya ","mAraranjani ","chArukeshi ","sarasAngi ","HarikAmbhOji ","DhIrashankarAbharaNam ","nAgAnandhini ","yAgapriya ","rAgavarDhani ","gAngeyabhushani ","vAgaDhIsvari ","shUlini ","chalanAta ","sAlagam ","jalArnavam ","JAlavarALi ","navanItham ","pAvani ","raGupriya ","gavAmbodhi ","bhavapriya ","shubhapanthuvarALi ","shadhvidha mArgiNi ","suvarNAngi ","dhivyAmaNi ","dhavalAmbari ","nAmanArAyaNi ","kAmavardhini (Pantuvarali) ","rAmapriya ","gamanashrama ","vishvAmbhari ","shyAmaLAngi ","shanmuKapriya ","simHendra madhyamam ","HemAvathi ","DharmAvathi ","nIthimathi ","kAnthAmaNi ","rishabhapriya ","lathAngi ","vAchaspathi ","mEchakalyANi ","chithrAmbari ","sucharithra ","jyothisvarUpiNi ","dhAtuvardhani ","nAsika bhUshaNi ","kosalam ","rasikapriya ");


////alert(name);
  with (document)
  {
   write('<td class="ctext">');
   write('Raga Name');
   write('</td>');
   write('<td class="ctext">');
   write('<select id= "rName'+name+'"  name="rName'+name+'" nameid="'+name+'"   onchange="javascript:rNo'+name+'.value=rName'+name+'.value; val1(this);">');
   for(lv_i=1;lv_i<rn.length;lv_i++)
   write('<option value='+ lv_i+'>'+rn[lv_i]+'</option>');
   write('</select>');
   write('</td>');
   write('<td class="ctext">');
   write('Melakartha No ');
   write('</td>');
   write('<td class="ctext">');
   write('<select id="rNo'+name+'"  name="rNo'+name+'" nameid="'+name+'"  onchange="javascript:rName'+name+'.value=rNo'+name+'.value; val1(this);" >');
   for(lv_i=1;lv_i<rn.length;lv_i++)
   write('<option value='+ lv_i+'>'+lv_i+'</option>');
   write('</select>');
   write('</td>');
  }
}



-->