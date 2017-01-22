function getData()
{
  var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
      createModel((this.responseText));
     }
   };
  xhttp.open("GET", "http://starlord.hackerearth.com/cleartrip/hackernews", true);
  xhttp.send();
}
