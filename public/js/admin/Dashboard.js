
    if(sessionStorage.getItem("matrik_num")=='sucessfull'){
    req=new XMLHttpRequest();
  req.open("GET",'/api/v1/product/getProductsByStatus/'+status,true);
  req.send();
  req.onload=function(){
      json=JSON.parse(req.responseText);
      console.log("there is -"+json.products.length);
      var body="<div class='row products-admin ratio_asos'>";
      for(var i=json.products.length-1;i>=0;i--)
      { 
              var img_url;
              if(json.products[i].image.length>0)
              img_url=json.products[i].image[0].url;
              else
              img_url="https://icon-library.net/images/icon-product/icon-product-11.jpg"
          body+="<div class='col-xl-3 col-sm-6'>\
              <div class='card'>\
                  <div class='card-body product-box' onclick='getProductPage("+json.products[i].product_id+")'>\
                      <div class='img-wrapper'>\
                          <div class='front'>\
                              <a href='#'  class='bg-size' style='background-image: url(&quot;"+img_url+"&quot;); background-size: cover; background-position: center center; display: block;'><img  class='img-fluid blur-up lazyload bg-img' alt='' style='display: none;'></a>\
                          </div>\
                      </div>\
                      <div class='product-detail'>\
                         <a href='#'>\
                              <h6>"+json.products[i].more_details+"</h6>\
                          </a>\
                          <h4>"+json.products[i].price+"</h4>\
                      </div>\
                  </div>\
              </div>\
          </div>"
          
      }
      body+="</div>";
      document.getElementById('mainContainer').innerHTML=body;
         
      if(status==3){
        document.getElementById('mainHeader').innerHTML="Pending Products"
      }   
      else if(status==1){
        document.getElementById('mainHeader').innerHTML="Approved Products"
      }
      else if(status==2){
        document.getElementById('mainHeader').innerHTML="Sold Products"
      }
      else if(status==4){
        document.getElementById('mainHeader').innerHTML="Inactive Products"  
      }
  };
  
}
else
window.location.replace("admin/login.ejs");
