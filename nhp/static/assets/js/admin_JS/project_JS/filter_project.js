function filter_project(){
    var filterByStatus = $('#filterByStatus').val();
    var filterByProject = $('#filterByProject').val();
    var filterByProgress = $('#filterByProgress').val();
    var filterByEmployee = $('#employes').val();
    var filterByProjectSector = $('#filterByProjectSector').val();
    var filterByProjectType = $('#filterByProjectType').val();
    var filterByLanguage = $('#filterByLanguage').val();
    // alert(filterByProject); 

    // ---------------  AJAX CALL  ----------------------------
    $.ajax({
        type: 'GET',
        url: "/project-management/filter-project",
        data: {'filterByStatus': filterByStatus, 'filterByProject': filterByProject, 'filterByProgress': filterByProgress,'filterByEmployee': filterByEmployee,'filterByProjectSector': filterByProjectSector,'filterByProjectType': filterByProjectType,'filterByLanguage': filterByLanguage},
        success: function (response) {
            $('#resultsFilterData').html("");
            console.log(response['data'])
            if(response['data'].length != 0 ){
                for(var i =0; i < response['data'].length; i++){
                    var progressStr = response['data'][i]['project_progress'];
                    var color = '';
                    if(parseInt(progressStr) >0 && parseInt(progressStr)<25){
                        color = 'danger';
                    }else if(parseInt(progressStr) >25 && parseInt(progressStr)<=50){
                        color = 'warning';
                    }else if(parseInt(progressStr) >50 && parseInt(progressStr)<=75){
                        color = 'info';
                    }else if(parseInt(progressStr) >75 && parseInt(progressStr)<=100){
                        color = 'success';
                    }
                    var status_color = '';
                    if(response['data'][i]['project_status'] == 'Delayed'){
                        status_color = 'danger';
                    }else if(response['data'][i]['project_status'] == 'Just Created'){
                        status_color = 'warning';
                    }else if(response['data'][i]['project_status'] == 'Ongoing'){
                        status_color = 'info';
                    }else if(response['data'][i]['project_status'] == 'Completed'){
                        status_color = 'success';
                    }
                    // ==============================================================================
                    //                            Project Team
                    // ==============================================================================
                    var teamDataStr = '';
                    for(var t=0;t<response['data'][i]['teamList'].length;t++){
                        if(response['data'][i]['teamList'][t]['empImg'] == ''){
                            var data = '<a href="javascript:void(0);" data-bs-container="#tooltip-container" data-bs-toggle="tooltip" data-bs-placement="top" title="'+response['data'][i]['teamList'][t]['empName']+'" class="d-inline-block">\
                                        <img src="https://images.vexels.com/media/users/3/129616/isolated/preview/fb517f8913bd99cd48ef00facb4a67c0-businessman-avatar-silhouette-by-vexels.png" class="rounded-circle avatar-xs" alt="friend">\
                                    </a>';
                        }else{
                            var data = '<a href="javascript:void(0);" data-bs-container="#tooltip-container" data-bs-toggle="tooltip" data-bs-placement="top" title="'+response['data'][i]['teamList'][t]['empName']+'" class="d-inline-block">\
                                        <img src="/media/'+response['data'][i]['teamList'][t]['empImg']+'" class="rounded-circle avatar-xs" alt="friend">\
                                    </a>';
                        }
                        teamDataStr = teamDataStr + data;
                    }

                    var logoData = ''
                    if(response['data'][i]['project_logo'] == ''){
                        logoData = '<img src="https://www.launchgrowjoy.com/wp-content/uploads/logo-placeholder-300x210.jpg" class="rounded-circle avatar-sm mr-2" alt="friend">';
                    }else{
                        logoData = '<img src="/media/'+response['data'][i]['project_logo']+'" class="rounded-circle avatar-sm mr-2" alt="friend">';
                    }
                    // ==============================================================================
                    $('#resultsFilterData').append('<div class="col-lg-6 col-xxl-3">\
                    <div class="card d-block">\
                        <div class="card-body">\
                            <div class="dropdown card-widgets">\
                                <a href="#" class="dropdown-toggle arrow-none" data-bs-toggle="dropdown" aria-expanded="false">\
                                    <i class="dripicons-dots-3"></i>\
                                </a>\
                                <div class="dropdown-menu dropdown-menu-end">\
                                    <a href="/project-management/project-detail/'+response['data'][i]['project_id']+'" class="dropdown-item"><i class="mdi mdi-eye me-1">\
                                    </i>View Detail</a>\
                                    <a href="/project-management/update-project-detail/'+response['data'][i]['project_id']+'" class="dropdown-item"><i class="mdi mdi-pencil me-1"></i>Edit</a>\
                                </div>\
                            </div>\
                            <h4 class="mt-0">\
                                <a href="/project-management/project-detail" class="text-title">'+ logoData + response['data'][i]['project_name']+'</a>\
                            </h4>\
                            <p>Project Manager <span class="text-primary text-medium" style="font-weight:800;"><small>'+response['data'][i]['projectManagerName']+'</small></span>\
                              <span class="badge bg-'+status_color+' mb-3 text-end  p_status  ">'+response['data'][i]['project_status']+'</span></p>\
                              <p class="text-muted font-13 mb-3">'+response['data'][i]['project_description'].slice(0,21)+' <a href="/project-management/project-detail/'+response['data'][i]['project_id']+'" class="fw-bold text-muted"> ...view more</a>\
                            </p>\
                            <p class="mb-1">\
                                <span class="pe-2 text-nowrap mb-2 d-inline-block">\
                                    <i class="mdi mdi-format-list-bulleted-type text-muted"></i>\
                                    <b>'+response['data'][i]['total_task']+'</b> Tasks\
                                </span>\
                                <span class="text-nowrap mb-2 d-inline-block">\
                                    <i class="mdi mdi-view-module text-muted"></i>\
                                    <b>'+response['data'][i]['total_module']+'</b> Modules\
                                </span>\
                            </p>\
                            <div id="tooltip-container">\
                                '+teamDataStr+'\
                                </div>\
                        </div>\
                        <ul class="list-group list-group-flush">\
                            <li class="list-group-item p-3 pt-0">\
                                <p class="mb-2 fw-bold">Progress <span class="float-end">'+response['data'][i]['project_progress']+'%</span></p>\
                                <div class="progress progress-sm">\
                                    <div class="progress-bar bg-'+color+'" role="progressbar" aria-valuenow='+response['data'][i]['project_progress']+' aria-valuemin="0" aria-valuemax="100" style="width: '+response['data'][i]['project_progress']+'%;">\
                                    </div>\
                                </div>\
                            </li>\
                        </ul>\
                    </div>\
                </div>')
                }
            }else{
                $('#resultsFilterData').html("<div class='text-center'><br><br><br><br><h3><i class='fas fa-exclamation-triangle'></i> NO PROJECT DATA FOUND</h3></div>");
            }
        }
    });
}



// #####################################################################################################################
// #####################################################################################################################
// Filter By Year
// #####################################################################################################################
function filterByYear(thisTxt){
    var filterYear = $(thisTxt).val();
    console.log(filterYear);

    // ---------------  AJAX CALL  ----------------------------
    $.ajax({
        type: 'GET',
        url: "/project-management/filter-project-by-year",
        data: {'filterYear': filterYear},
        success: function (response) {
            $('#resultsFilterData').html("");
            console.log(response['data'])
            if(response['data'].length != 0 ){
                for(var i =0; i < response['data'].length; i++){
                    var progressStr = response['data'][i]['project_progress'];
                    var color = '';
                    if(parseInt(progressStr) >0 && parseInt(progressStr)<25){
                        color = 'danger';
                    }else if(parseInt(progressStr) >25 && parseInt(progressStr)<=50){
                        color = 'warning';
                    }else if(parseInt(progressStr) >50 && parseInt(progressStr)<=75){
                        color = 'info';
                    }else if(parseInt(progressStr) >75 && parseInt(progressStr)<=100){
                        color = 'success';
                    }
                    var status_color = '';
                    if(response['data'][i]['project_status'] == 'Delayed'){
                        status_color = 'danger';
                    }else if(response['data'][i]['project_status'] == 'Just Created'){
                        status_color = 'warning';
                    }else if(response['data'][i]['project_status'] == 'Ongoing'){
                        status_color = 'info';
                    }else if(response['data'][i]['project_status'] == 'Completed'){
                        status_color = 'success';
                    }
                    // ==============================================================================
                    //                            Project Team
                    // ==============================================================================
                    var teamDataStr = '';
                    for(var t=0;t<response['data'][i]['teamList'].length;t++){
                        if(response['data'][i]['teamList'][t]['empImg'] == ''){
                            var data = '<a href="javascript:void(0);" data-bs-container="#tooltip-container" data-bs-toggle="tooltip" data-bs-placement="top" title="'+response['data'][i]['teamList'][t]['empName']+'" class="d-inline-block">\
                                        <img src="https://images.vexels.com/media/users/3/129616/isolated/preview/fb517f8913bd99cd48ef00facb4a67c0-businessman-avatar-silhouette-by-vexels.png" class="rounded-circle avatar-xs" alt="friend">\
                                    </a>';
                        }else{
                            var data = '<a href="javascript:void(0);" data-bs-container="#tooltip-container" data-bs-toggle="tooltip" data-bs-placement="top" title="'+response['data'][i]['teamList'][t]['empName']+'" class="d-inline-block">\
                                        <img src="/media/'+response['data'][i]['teamList'][t]['empImg']+'" class="rounded-circle avatar-xs" alt="friend">\
                                    </a>';
                        }
                        teamDataStr = teamDataStr + data;
                    }

                    var logoData = ''
                    if(response['data'][i]['project_logo'] == ''){
                        logoData = '<img src="https://www.launchgrowjoy.com/wp-content/uploads/logo-placeholder-300x210.jpg" class="rounded-circle avatar-sm mr-2" alt="friend">';
                    }else{
                        logoData = '<img src="/media/'+response['data'][i]['project_logo']+'" class="rounded-circle avatar-sm mr-2" alt="friend">';
                    }
                    // ==============================================================================
                    $('#resultsFilterData').append('<div class="col-lg-6 col-xxl-3">\
                    <div class="card d-block">\
                        <div class="card-body">\
                            <div class="dropdown card-widgets">\
                                <a href="#" class="dropdown-toggle arrow-none" data-bs-toggle="dropdown" aria-expanded="false">\
                                    <i class="dripicons-dots-3"></i>\
                                </a>\
                                <div class="dropdown-menu dropdown-menu-end">\
                                    <a href="/project-management/project-detail/'+response['data'][i]['project_id']+'" class="dropdown-item"><i class="mdi mdi-eye me-1">\
                                    </i>View Detail</a>\
                                    <a href="/project-management/update-project-detail/'+response['data'][i]['project_id']+'" class="dropdown-item"><i class="mdi mdi-pencil me-1"></i>Edit</a>\
                                </div>\
                            </div>\
                            <h4 class="mt-0">\
                                <a href="/project-management/project-detail" class="text-title">'+ logoData + response['data'][i]['project_name']+'</a>\
                            </h4>\
                            <p>Project Manager <span class="text-primary text-medium" style="font-weight:800;"><small>'+response['data'][i]['projectManagerName']+'</small></span>\
                              <span class="badge bg-'+status_color+' mb-3 text-end  p_status  ">'+response['data'][i]['project_status']+'</span></p>\
                              <p class="text-muted font-13 mb-3">'+response['data'][i]['project_description'].slice(0,21)+' <a href="/project-management/project-detail/'+response['data'][i]['project_id']+'" class="fw-bold text-muted"> ...view more</a>\
                            </p>\
                            <p class="mb-1">\
                                <span class="pe-2 text-nowrap mb-2 d-inline-block">\
                                    <i class="mdi mdi-format-list-bulleted-type text-muted"></i>\
                                    <b>'+response['data'][i]['total_task']+'</b> Tasks\
                                </span>\
                                <span class="text-nowrap mb-2 d-inline-block">\
                                    <i class="mdi mdi-view-module text-muted"></i>\
                                    <b>'+response['data'][i]['total_module']+'</b> Modules\
                                </span>\
                            </p>\
                            <div id="tooltip-container">\
                                '+teamDataStr+'\
                                </div>\
                        </div>\
                        <ul class="list-group list-group-flush">\
                            <li class="list-group-item p-3 pt-0">\
                                <p class="mb-2 fw-bold">Progress <span class="float-end">'+response['data'][i]['project_progress']+'%</span></p>\
                                <div class="progress progress-sm">\
                                    <div class="progress-bar bg-'+color+'" role="progressbar" aria-valuenow='+response['data'][i]['project_progress']+' aria-valuemin="0" aria-valuemax="100" style="width: '+response['data'][i]['project_progress']+'%;">\
                                    </div>\
                                </div>\
                            </li>\
                        </ul>\
                    </div>\
                </div>')
                }
            }else{
                $('#resultsFilterData').html("<div class='text-center'><br><br><br><br><h3><i class='fas fa-exclamation-triangle'></i> NO PROJECT DATA FOUND</h3></div>");
            }
        }
    });
}