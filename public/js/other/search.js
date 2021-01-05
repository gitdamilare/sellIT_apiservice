function showResult(str) {
    // Add your code below this line
    req=new XMLHttpRequest();
  req.open("GET",'/api/v1/product/'+str,true);
  req.send();
  req.onload=function(){
      json=JSON.parse(req.responseText);
      var body="";
      for(var i=0;i<json.products.length;i++)
      {
          body+="<a href='/api/v1/product/id/"+json.products[i].image[0].product_id+"' ><div class='results' > \
        <div class='repo' >\
            <div class='card-deck'>\
                <div class='card'>\
                <img src='"+json.products[i].image[0].url+"'\
                    width='100'\
                    height='auto'\
                    alt='avatar'\
                />\
                <h2>"+json.products[i].name+"</h2>\
                <p"+json.products[i].description+"</p>\
                <p>Price: "+json.products[i].price+"</p>\
            </div>\
            </div> \
        </div>\
    </div></a>"
      }
      console.log(json.products.length);
      document.getElementById('searchResult').innerHTML=body;         
  };
  
    
  };