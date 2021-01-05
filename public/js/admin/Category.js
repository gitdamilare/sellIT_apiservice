function getAllCategory(){
    if(sessionStorage.getItem("matrik_num")=='sucessfull'){
    req=new XMLHttpRequest();
    req.open("GET",'/api/v1/category/categories',true);
    req.send();
    req.onload=function(){
        json=JSON.parse(req.responseText);
        
        var body="<div class='container-fluid'>\
        <div class='row'>\
            <div class='col-sm-12'>\
                <div class='card'>\
                <div class='card-body'>\
        <div class='btn-popup pull-right'>\
            <button type='button' class='btn btn-primary' data-toggle='modal' data-original-title='test'\
                data-target='#exampleModal'>Add Category</button>\
            <div class='modal fade' id='exampleModal' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel'\
                style='display: none;' aria-hidden='true'>\
                <div class='modal-dialog' role='document'>\
                    <div class='modal-content'>\
                        <div class='modal-header'>\
                            <h5 class='modal-title f-w-600' id='exampleModalLabel'>Add Category</h5>\
                            <button class='close' type='button' data-dismiss='modal' aria-label='Close'><span\
                                    aria-hidden='true'>×</span></button>\
                        </div>\
                        <div class='modal-body'>\
                            <form class='needs-validation'>\
                                <div class='form'>\
                                    <div class='form-group'>\
                                        <label for='categoryName' class='mb-1'>Category Name :</label>\
                                        <input class='form-control' id='categoryName' type='text'>\
                                        <label for='categoryDesc' class='mb-1'>Category Description :</label>\
                                        <input class='form-control' id='categoryDesc' type='text'>\
                                    </div>\
                                </div>\
                            </form>\
                        </div>\
                        <div class='modal-footer'>\
                            <button onclick='addCategory()' class='btn btn-primary' type='button'  data-dismiss='modal'>Save</button>\
                            <button class='btn btn-secondary' type='button' data-dismiss='modal'>Close</button>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
        <div id='basicScenario' class='product-physical jsgrid' style='position: relative; height: auto; width: 100%;'>\
            <div class='jsgrid-grid-header jsgrid-header-scrollbar'>\
                <table class='jsgrid-table'>\
                    <tr class='jsgrid-header-row'>\
                        <th class='jsgrid-header-cell jsgrid-header-sortable' style='width: 50px;'>Name</th>\
                        <th class='jsgrid-header-cell jsgrid-align-right jsgrid-header-sortable' style='width: 100px;'>Description</th>\
                        <th class='jsgrid-header-cell jsgrid-header-sortable' style='width: 50px;'>Added Date</th>\
                    </tr>\
                </table>\
            </div>\
            <div class='jsgrid-grid-body'>\
                <table class='jsgrid-table'>\
                    <tbody>"
                    for(var i=json.rows.length-1;i>=0;i--){
                        body+="<tr class='jsgrid-alt-row' style=''>\
                        <td class='jsgrid-cell' style='width: 50px;'>"+json.rows[i].name+"</td>\
                        <td class='jsgrid-cell jsgrid-align-right' style='width: 100px;'>"+json.rows[i].description+"</td>\
                        <td class='jsgrid-cell' style='width: 50px;'>"+json.rows[i].created_date+"</td>\
                        </tr>"
    
                    }    
                   body+="</tbody>\
                </table>\
            </div>\
        </div>\
    </div>\
    </div>\
            </div>\
        </div>\
    </div>"

        
        
        document.getElementById('mainContainer').innerHTML=body;
        document.getElementById('mainHeader').innerHTML="Add Category"
        
    };
}
else
window.location.replace("admin/login.ejs");
}

function addCategory(){
    if(sessionStorage.getItem("matrik_num")=='sucessfull'){
var categoryName=document.getElementById('categoryName').value;
var categoryDesc=document.getElementById('categoryDesc').value;
var params = 'name=' + categoryName + '&description=' + categoryDesc+"&parent_id=0";
req = new XMLHttpRequest();
req.onload=function(){setTimeout(getAllCategory(), 1000)}
req.open("POST", '/api/v1/category', true);
req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
req.send(params);
Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Done',
    showConfirmButton: false,
    timer: 1500
})
    }
    else
window.location.replace("admin/login.ejs");
}



/////////
function getAllSubCategory(){
    if(sessionStorage.getItem("matrik_num")=='sucessfull'){
    req=new XMLHttpRequest();
    req.open("GET",'/api/v1/category/categoriesandsub',true);
    req.send();
    req.onload=function(){
        json=JSON.parse(req.responseText);
        
        var body="<div class='container-fluid'>\
        <div class='row'>\
            <div class='col-sm-12'>\
                <div class='card'>\
                <div class='card-body'>\
        <div class='btn-popup pull-right'>\
            <button type='button' class='btn btn-primary' data-toggle='modal' data-original-title='test'\
                data-target='#exampleModal'>Add SubCategory</button>\
            <div class='modal fade' id='exampleModal' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel'\
                style='display: none;' aria-hidden='true'>\
                <div class='modal-dialog' role='document'>\
                    <div class='modal-content'>\
                        <div class='modal-header'>\
                            <h5 class='modal-title f-w-600' id='exampleModalLabel'>Add SubCategory</h5>\
                            <button class='close' type='button' data-dismiss='modal' aria-label='Close'><span\
                                    aria-hidden='true'>×</span></button>\
                        </div>\
                        <div class='modal-body'>\
                            <form class='needs-validation'>\
                                <div class='form'>\
                                    <div class='form-group'>\
                                    <select class='selectpicker' id='parentCategory'>"
                                    for(var i=0;i<json.rows.length;i++){

                                        body+="<option value="+json.rows[i].category_id+">"+json.rows[i].name+"</option>"
                                    }
                                    body+="</select>\
                                    <label for='categoryName' class='mb-1'>Category Name :</label>\
                                        <input class='form-control' id='categoryName' type='text'>\
                                        <label for='categoryDesc' class='mb-1'>Category Description :</label>\
                                        <input class='form-control' id='categoryDesc' type='text'>\
                                    </div>\
                                </div>\
                            </form>\
                        </div>\
                        <div class='modal-footer'>\
                            <button onclick='addSubCategory()' class='btn btn-primary' type='button'  data-dismiss='modal'>Save</button>\
                            <button class='btn btn-secondary' type='button' data-dismiss='modal'>Close</button>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
        <div id='basicScenario' class='product-physical jsgrid' style='position: relative; height: auto; width: 100%;'>\
            <div class='jsgrid-grid-header jsgrid-header-scrollbar'>\
                <table class='jsgrid-table'>\
                    <tr class='jsgrid-header-row'>\
                        <th class='jsgrid-header-cell jsgrid-header-sortable' style='width: 50px;'>Name</th>\
                        <th class='jsgrid-header-cell jsgrid-align-right jsgrid-header-sortable' style='width: 100px;'>Description</th>\
                        <th class='jsgrid-header-cell jsgrid-align-right jsgrid-header-sortable' style='width: 50px;'>Parent Category</th>\
                        <th class='jsgrid-header-cell jsgrid-header-sortable' style='width: 50px;'>Added Date</th>\
                    </tr>\
                </table>\
            </div>\
            <div class='jsgrid-grid-body'>\
                <table class='jsgrid-table'>\
                    <tbody>"
                    for(var i=0;i<json.rows.length;i++){
                        for(var j=json.rows[i].sub_category.length-1;j>=0;j--){
                        
                        body+="<tr class='jsgrid-alt-row' style=''>\
                        <td class='jsgrid-cell' style='width: 50px;'>"+json.rows[i].sub_category[j].name+"</td>\
                        <td class='jsgrid-cell jsgrid-align-right' style='width: 100px;'>"+json.rows[i].sub_category[j].description+"</td>\
                        <td class='jsgrid-cell' style='width: 50px;'>"+json.rows[i].name+"</td>\
                        <td class='jsgrid-cell' style='width: 50px;'>"+json.rows[i].sub_category[j].created_date+"</td>\
                        </tr>"
                        }
    
                    }    
                   body+="</tbody>\
                </table>\
            </div>\
        </div>\
    </div>\
    </div>\
            </div>\
        </div>\
    </div>"

        
        
        document.getElementById('mainContainer').innerHTML=body;
        document.getElementById('mainHeader').innerHTML="Add SubCategory"
        
    };
    

} 
else
window.location.replace("admin/login.ejs");
}


function addSubCategory(){
    if(sessionStorage.getItem("matrik_num")=='sucessfull'){
    var categoryName=document.getElementById('categoryName').value;
    var categoryDesc=document.getElementById('categoryDesc').value;
    var parent_id=document.getElementById('parentCategory').value;
    var params = 'name=' + categoryName + '&description=' + categoryDesc+"&parent_id="+parent_id;
    req = new XMLHttpRequest();
    req.onload=function(){setTimeout(getAllSubCategory(), 1000)}
    req.open("POST", '/api/v1/category', true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    req.send(params);
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Done',
        showConfirmButton: false,
        timer: 1500
    })
    }
    else
window.location.replace("admin/login.ejs");
    }