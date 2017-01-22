getData();
var displayObj = {};
var displayObjs = [];

var start_no = 0;
var end_no = 10;

function clearSearch(){
  document.getElementById("globalSearch").value = "";
  filter();
}

function sort(newObjects){
  newObjects = newObjects || displayObjs;
  sortedObject = newObjects.sort(function(a, b){
    var multiplier = document.getElementById('sortBy').value === 'desc' ? -1 : 1;
    return a.date < b.date ? -1*multiplier : 1*multiplier;
  });
  // filter(sortedObject);
  update_news(sortedObject);
}

function filter(){
  var value = document.getElementById('globalSearch').value;
  filteredObjects = displayObjs.filter(function(obj){
    if(obj.title.toLowerCase().indexOf(value.toLowerCase()) !=-1 || obj.displayText.toLowerCase().indexOf(value.toLowerCase()) !=-1)
      return true;
    else
      return false;
  });
  sort(filteredObjects);
  // update_news(filteredObjects);
}

function createDisplayModel(ele,index){
  if(index !== 0)  {
    displayObj.url = ele.url;
    var res = ele.url.split("/");
    var url = res[0]=="https:" || res[0]=="http:" ? res[2].substr(4) : " ";
    displayObj.title = ele.title + "(" + url + ")";
    // TODO: see formate fuction on date object
    displayObj.date = ele.created_at;
    var date = new Date(ele.created_at).toString().split(" ");
    displayObj.displayText = ele.num_points + " Points By " + ele.author  + " " + date[1] + " " + date[2] + " " + date[3] + " | Hide | " + ele.num_comments + " Comments";

    tmp_obj = JSON.parse(JSON.stringify(displayObj));
    displayObjs.push(tmp_obj);
  }
}

function update_news(news){
  // start_no = start;
  // end_no = end;
  // var display_code = "<a href=" + obj.url +">" + obj.title + "</a></br><span>" + obj.displayText + "</span>";
  var element = document.getElementById("news");
  element.innerHTML = "";
  if(news.length == 0)
      element.innerHTML = "<h3>No Data Found... Please Try Again...</h3>"
  for(i = start_no; i<end_no; i++)
  {
        element.innerHTML += "<div class='article'><span class='article_no'>"+" "+(i+1)+" "+"</span><i  class='glyphicon glyphicon-triangle-top triangle'></i><div class='article_details'><a href=" + news[i].url +"  target = '_blank'>" + news[i].title + "</a></br><span>" +  news[i].displayText + "</span></div></br></div>";
  }
}


function createModel(obj){
  console.log(JSON.parse(obj));
  // actualResponse = JSON.parse(obj);
  JSON.parse(obj).map(createDisplayModel);
  console.log(displayObjs);
  update_news(displayObjs);
}


function pre(){
  scrollTo(0, 0);
  if(start_no === 0){}
  else{
    start_no = start_no-10 ? start_no-10 : 0;
    end_no = end_no-10;
    update_news(displayObjs);
  }
}
function next(){
  scrollTo(0, 0);
  if(end_no === 100){}
  else {
    end_no = end_no+10 > 100 ? 100 : end_no+10;
    start_no = start_no+10;
    update_news(displayObjs);
  }
}
