String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
} 
String.prototype.initCap = function () {
    var new_str = this.split(' '),
        i,
        arr = [];
    for (i = 0; i < new_str.length; i++) {
        arr.push(initCap(new_str[i]).capitalize());
    }
    return arr.join(' ');
}
alert("hello world".initCap());

