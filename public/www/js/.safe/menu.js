function small(obj)
{
//alert("small");
obj.className="small";
}

function large(obj)
{
//alert("large");
obj.className="large";
}


function ToyIn()
{
ToyDiv.style.visibility = "visible";
ToyDiv.style.left = 0;
ToyDiv.style.top = 72;
}
function HideAll()
{
ToyDiv.style.visibility = "hidden";
}


function disp1(obj,name,value)
{
	var dy = name;

var	idDesc=document.getElementById(obj.id+"desc");
var	idImg=document.getElementById(obj.id);
if(idDesc.className == "plusClass" )
{
var values=value.split('|');
dy +=  "<ul>"
for(i=0;i<values.length;i++)
{

		dy += "<li ><span id='i1' class='small' onmouseover='large(this)' onmouseout='small(this)' > "+ values[i]+" </span> </li>";

}
		dy += "</ul>";
	idDesc.innerHTML = dy;
	idDesc.className= "minusClass";
	idImg.src="img/m.GIF";

}
else
{
	idDesc.innerHTML = dy;
	idDesc.className= "plusClass"
	idImg.src="img/p.GIF";
}

return 0;
}
