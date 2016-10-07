/*
 2012 copyright Heaerie Global Solution Ltd. Vellore.
  USS()
 @constructor

*/
function USS()
{
	this.USSBrowserDetail_()
//	this.USSIncludeLinks_()
	this.USSfield_()
}

USS.prototype.USSBrowserDetail_= function()
{
  this.browserIE = false;
  this.rowserFirefox = false;
  this.browserSafari = false;
  this.location =  ""+  window.location;


	//alert(navigator.userAgent);

  if (navigator.userAgent.indexOf("MSIE") > -1) {
    this.browserIE = true;
  } else if ((navigator.userAgent.indexOf("Firefox/") > -1)) {
    this.browserFirefox = true;
    if ((navigator.userAgent.indexOf("Firefox/1.0.") > -1)) {
      this.browserFirefox10 = true;
    } else {
      this.browserFirefox10 = false;
    }
  } else if (navigator.userAgent.indexOf("Safari") > -1) {
    this.browserSafari = true;
    if (navigator.userAgent.indexOf("Version/") > -1) {
      this.browserSafari3OrHigher = true;
    }
  }
	
}
USS.prototype.USSIncludeLinks_=function(filename)
{
	try
	{
		if(arguments.length< 1)
		{
			alert('SYS:USSIncludeLinks_:Argument is must for this function');
			return false;
		}
		else if (filename.length== 0)
		{
			alert('SYS:USSIncludeLinks_: filename is can be null');
		}

		var el = document.createElement('link');
		//el.href = this.resourcesPath + "styles/" + filename;
		el.href = filename;
		alert(" filename " +  filename);
		el.type = 'text/css';
		el.rel = 'stylesheet';
		document.getElementsByTagName('head').item(0).appendChild(el);
	}
	catch(e)
	{
		alert("APPUINLException:"+ e);
	}

}
USS.prototype.USSfield_=function()
{
	
}
USS.prototype.USSCreareTab_=function()
{
	
 this.searchResultsEl = document.createElement("div");
  this.searchResultsEl.id = 'searchAsYouTypeResults1';
  this.searchResultsEl.className = 'searchResults';
  this.searchResultsEl.style.display = 'none'; 
  this.searchResultsEl.style.position = 'absolute'; 
  this.searchResultsEl.onclick = 'event.cancelBubble = true;';
  this.searchResultsEl.tabIndex = -1;

	
}

