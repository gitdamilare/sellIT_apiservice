

function showProductsbyStatus(status) {
    console.log("session");
    
console.log("my session-"+sessionStorage.getItem("matrik_num"));
    // Add your code below this line
    if(sessionStorage.getItem("matrik_num")=='sucessfull'){
    req=new XMLHttpRequest();
  req.open("GET",'/api/v1/product/getProductsByStatus/'+status,true);
  req.send();
  req.onload=function(){
      json=JSON.parse(req.responseText);
      console.log("there is -"+json.products.length);
      var body="<div class='row products-admin ratio_asos'>";
      for(var i=json.products.length-1;i>=0;i--)
      { console.log(json.products[i]);
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
                              <h6>"+json.products[i].name+"</h6>\
                          </a>\
                          <h4>"+json.products[i].price+" &euro;</h4>\
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
  };


  //////
  function getProductPage(product_id) {
    if(sessionStorage.getItem("matrik_num")=='sucessfull'){
    // Add your code below this line
    req=new XMLHttpRequest();
    req.onload=function(){
        
            var json=JSON.parse(req.responseText);
            // console.log(json.products[0].product_id);
            var body="<section>\
                <div class='collection-wrapper'>\
                <div class='container'>\
                     <div class='row'>\
            <div class='col-lg-6'>\
                <div class='product-slick'>\
                <table><tr>"
                for(var i=0;i<json.products[0].image.length;i++){
                        if(i%2==0){
                            body+="</tr>"
                        }
                    body+="<td><div><img src='"+json.products[0].image[i].url+"' alt='' class='w-100 p-3'></div></td>";

                }
                  
                 body+="</tr></table> </div>\
            </div>\
            <div class='col-lg-6 rtl-text'>\
                <div class='product-right'>\
                    <h2>"+json.products[0].name+"</h2>\
                    <h3>"+json.products[0].price+" &euro;</h3>"
                    if(json.products[0].status==3){
                    body+="<button type='button' onclick='changeProductStatus("+json.products[0].product_id+",1)' class='btn btn-success m-1'>Approve</button>";
                    }
                    
                    body+="<button type='button' onclick='changeProductStatus("+json.products[0].product_id+",4)' class='btn btn-danger m-1'>Deny</button>";      
                    body+="<div class='border-product'>\
                        <h6 class='product-title'>product details</h6>\
                        <p>"+json.products[0].more_details+"</p>\
                    </div>\
                    <section class='tab-product m-0'>\
                        <div class='container'>\
                            <div class='row'>\
                                <div class='col-sm-12 col-lg-12'>\
                                    <ul class='nav nav-tabs nav-material' id='top-tab' role='tablist'>\
                                        <li class='nav-item'><a class='nav-link active' id='top-home-tab' data-toggle='tab' href='#top-home' role='tab' aria-selected='true'>Description</a>\
                                            <div class='material-border'></div>\
                                        </li>\
                                        <li class='nav-item'><a class='nav-link' id='profile-top-tab' data-toggle='tab' href='#top-profile' role='tab' aria-selected='false'>Details</a>\
                                            <div class='material-border'></div>\
                                        </li>\
                                    </ul>\
                                    <div class='tab-content nav-material' id='top-tabContent'>\
                                        <div class='tab-pane fade show active' id='top-home' role='tabpanel' aria-labelledby='top-home-tab'>\
                                            <p>"+json.products[0].description+"</p>\
                                        </div>\
                                        <div class='tab-pane fade' id='top-profile' role='tabpanel' aria-labelledby='profile-top-tab'>\
                                            <p>"+json.products[0].more_details+"</p>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </section>\
                </div>\
            </div>\
            </div>\
        </div>\
    </div>\
</section>"
        
            document.getElementById('mainContainer').innerHTML=body;
        
       };
       
  req.open("GET",'/api/v1/product/id/'+product_id,true);
  req.send();

    }
    else
window.location.replace("admin/login.ejs");
  };
///////////////
function changeProductStatus(product_id,status){
    if(sessionStorage.getItem("matrik_num")=='sucessfull'){
console.log(product_id+"-this-"+status);
var params = 'productid=' + product_id + '&status=' + status;
req = new XMLHttpRequest();

req.open("POST", '/api/v1/product/changeProductStatus', true);
req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
req.send(params);
Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Done',
    showConfirmButton: false,
    timer: 1500
})
showProductsbyStatus(3); 
    }
    else
window.location.replace("admin/login.ejs");
}