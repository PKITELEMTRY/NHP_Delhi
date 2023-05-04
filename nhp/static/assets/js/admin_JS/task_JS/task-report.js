// for employees only
function get_task_report(){
    var dateRange = $('#daterange').val();

    // ---------------  AJAX CALL  ----------------------------
    $.ajax({
        type: 'GET',
        url: "/task-management/get_task_report",
        data : {'dateRange':dateRange.trim()},
        success: function (response) {
            // =====================================================
            console.log('responseData > ',response['responseData']);
            // alert('Under Development. Will be available soon!');
            var dataSrt = '';
            for (const [key, value] of Object.entries(response['responseData'])) {
                // console.log(key, value,value.length);
                var data = ''
                if(value.length == 0){
                    data = '<div class="row mt-2" style="box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;border-radius:5px;background-color:#FF8A8A;">\
                                <div class="col-lg-12 mt-1 mb-1 p-1">\
                                    <span class="text-white bg-primary" style="border:1px solid primary;border-radius:2px;"><small><strong>&nbsp;&nbsp;'+key+'&nbsp;&nbsp;</strong></small></span>\
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong class="text-white"><small><i class="fa-solid fa-triangle-exclamation"></i> No Task Available for this date!</small></strong>\
                                </div>\
                            </div>';
                }else{
                    var taskStr = '';
                    for(var v=0;v<value.length;v++){
                        var status_data = '';
                        if(value[v]['task_status'] == 'Done'){
                            status_data = '<small class="text-success"><strong>Done</strong></small>'
                        }else if(value[v]['task_status'] == 'To do'){
                            status_data = '<small class="text-info"><strong>To do</strong></small>'
                        }else if(value[v]['task_status'] == 'Doing'){
                            status_data = '<small class="text-warning"><strong>Doing</strong></small>'
                        }else{
                            status_data = '<small class="text-danger"><strong>Delayed</strong></small>'
                        }

                        if(value[v]['task_project'] == ''){
                            var projectData = 'General Task'
                        }else{
                            var projectData = value[v]['task_project']
                        }
                        var single_task_row = '<tr>\
                                                    <th><small><i class="fa-solid fa-caret-right"></i>&nbsp;'+value[v]['task_title']+'</small>\
                                                    </th>\
                                                    <td><small><strong>'+projectData+'</td>\
                                                    <td><small><strong>\
                                                    '+value[v]['task_start_date']+'\
                                                            -</strong> '+value[v]['task_start_time']+'<small></td>\
                                                    <td><small><strong>'+value[v]['task_end_date']+' -</strong> '+value[v]['task_end_time']+'</small></td>\
                                                    <td>'+status_data+'</td>\
                                                </tr>';
                        taskStr = taskStr + single_task_row;

                    }
                    data = '<div class="row mt-2" style="box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;border-radius:5px;background-color:rgb(168, 235, 213);">\
                    <div class="col-lg-12 mt-1 mb-1 p-1">\
                        <span class="text-white bg-primary" style="border:1px solid primary;border-radius:2px;"><small><strong>&nbsp;&nbsp;'+key+'&nbsp;&nbsp;</strong></small></span>\
                    </div>\
                    <div class="col-lg-12 text-danger">\
                        <div class="col-lg-12">\
                            <table class="table table-borderless table-sm">\
                                <thead>\
                                    <tr>\
                                    <th scope="col" style="width: 650px;">Task</th>\
                                    <th scope="col">Project</th>\
                                    <th scope="col">Start DateTime</th>\
                                    <th scope="col">End DateTime</th>\
                                    <th scope="col">Status</th>\
                                    </tr>\
                                </thead>\
                                <tbody>'+taskStr+'</tbody>\
                                </table>\
                            </div>\
                        </div>\
                    </div>';
                }
                dataSrt = dataSrt + data;
              }
              $('#task-list-div').html('');
              $('#task-list-div').append(dataSrt);
        }
    });
    // --------------------------------------------------------
}

// ###########################################################################################################################
// ###########################################################################################################################
// ###########################################################################################################################
// for admin and manager only
function get_employee_task_report(){
    var employee = $('#employeeID').val();
    var dateRange = $('#daterange').val();

    if(employee.trim() == 'All'){
        // ---------------  AJAX CALL  ----------------------------
    $.ajax({
        type: 'GET',
        url: "/task-management/get_task_report",
        data : {'employee':employee.trim(),'dateRange':dateRange.trim()},
        success: function (response) {
            // =====================================================
            console.log('responseData > ',response['responseData']);
            // alert('Under Development. Will be available soon!');
            var dataSrt = '';
            for (const [key, value] of Object.entries(response['responseData'])) {
                // console.log(key, value,value.length);
                var data = ''
                if(value.length == 0){
                    data = '<div class="row mt-2" style="box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;border-radius:5px;background-color:#FF8A8A;">\
                                <div class="col-lg-12 mt-1 mb-1 p-1">\
                                    <span class="text-white bg-primary" style="border:1px solid primary;border-radius:2px;"><small><strong>&nbsp;&nbsp;'+key+'&nbsp;&nbsp;</strong></small></span>\
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong class="text-white"><small><i class="fa-solid fa-triangle-exclamation"></i> No Task Available for this date!</small></strong>\
                                </div>\
                            </div>';
                }else{
                    var taskStr = '';
                    for(var v=0;v<value.length;v++){
                        var status_data = '';
                        if(value[v]['task_status'] == 'Done'){
                            status_data = '<small class="text-success"><strong>Done</strong></small>'
                        }else if(value[v]['task_status'] == 'To do'){
                            status_data = '<small class="text-info"><strong>To do</strong></small>'
                        }else if(value[v]['task_status'] == 'Doing'){
                            status_data = '<small class="text-warning"><strong>Doing</strong></small>'
                        }else{
                            status_data = '<small class="text-danger"><strong>Delayed</strong></small>'
                        }

                        if(value[v]['task_project'] == ''){
                            var projectData = 'General Task'
                        }else{
                            var projectData = value[v]['task_project']
                        }
                        var single_task_row = '<tr>\
                                                    <th><small><i class="fa-solid fa-caret-right"></i>&nbsp;'+value[v]['task_title']+'</small>\
                                                    </th>\
                                                    <td><small><strong>'+projectData+'</td>\
                                                    <td><small><strong>\
                                                    '+value[v]['task_start_date']+'\
                                                            -</strong> '+value[v]['task_start_time']+'<small></td>\
                                                    <td><small><strong>'+value[v]['task_end_date']+' -</strong> '+value[v]['task_end_time']+'</small></td>\
                                                    <td>'+status_data+'</td>\
                                                </tr>';
                        taskStr = taskStr + single_task_row;

                    }
                    data = '<div class="row mt-2" style="box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;border-radius:5px;background-color:rgb(168, 235, 213);">\
                    <div class="col-lg-12 mt-1 mb-1 p-1">\
                        <span class="text-white bg-primary" style="border:1px solid primary;border-radius:2px;"><small><strong>&nbsp;&nbsp;'+key+'&nbsp;&nbsp;</strong></small></span>\
                    </div>\
                    <div class="col-lg-12 text-danger">\
                        <div class="col-lg-12">\
                            <table class="table table-borderless table-sm">\
                                <thead>\
                                    <tr>\
                                    <th scope="col" style="width: 650px;">Task</th>\
                                    <th scope="col">Project</th>\
                                    <th scope="col">Start DateTime</th>\
                                    <th scope="col">End DateTime</th>\
                                    <th scope="col">Status</th>\
                                    </tr>\
                                </thead>\
                                <tbody>'+taskStr+'</tbody>\
                                </table>\
                            </div>\
                        </div>\
                    </div>';
                }
                dataSrt = dataSrt + data;
              }
              $('#task-list-div').html('');
              $('#task-list-div').append(dataSrt);
        }
    });
    // --------------------------------------------------------
    }else{
        // ---------------  AJAX CALL  ----------------------------
        $.ajax({
            type: 'GET',
            url: "/task-management/get_task_report",
            data : {'employee':employee.trim(),'dateRange':dateRange.trim()},
            success: function (response) {
                // =====================================================
                console.log('responseData > ',response['responseData']);
                // alert('Under Development. Will be available soon!');
                var dataSrt = '';
                for (const [key, value] of Object.entries(response['responseData'])) {
                    // console.log(key, value,value.length);
                    var data = ''
                    if(value.length == 0){
                        data = '<div class="row mt-2" style="box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;border-radius:5px;background-color:#FF8A8A;">\
                                    <div class="col-lg-12 mt-1 mb-1 p-1">\
                                        <span class="text-white bg-primary" style="border:1px solid primary;border-radius:2px;"><small><strong>&nbsp;&nbsp;'+key+'&nbsp;&nbsp;</strong></small></span>\
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong class="text-white"><small><i class="fa-solid fa-triangle-exclamation"></i> No Task Available for this date!</small></strong>\
                                    </div>\
                                </div>';
                    }else{
                        var taskStr = '';
                        for(var v=0;v<value.length;v++){
                            var status_data = '';
                            if(value[v]['task_status'] == 'Done'){
                                status_data = '<small class="text-success"><strong>Done</strong></small>'
                            }else if(value[v]['task_status'] == 'To do'){
                                status_data = '<small class="text-info"><strong>To do</strong></small>'
                            }else if(value[v]['task_status'] == 'Doing'){
                                status_data = '<small class="text-warning"><strong>Doing</strong></small>'
                            }else{
                                status_data = '<small class="text-danger"><strong>Delayed</strong></small>'
                            }

                            if(value[v]['task_project'] == ''){
                                var projectData = 'General Task'
                            }else{
                                var projectData = value[v]['task_project']
                            }
                            var single_task_row = '<tr>\
                                                        <th><small><i class="fa-solid fa-caret-right"></i>&nbsp;'+value[v]['task_title']+'</small>\
                                                        </th>\
                                                        <td><small><strong>'+projectData+'</td>\
                                                        <td><small><strong>\
                                                        '+value[v]['task_start_date']+'\
                                                                -</strong> '+value[v]['task_start_time']+'<small></td>\
                                                        <td><small><strong>'+value[v]['task_end_date']+' -</strong> '+value[v]['task_end_time']+'</small></td>\
                                                        <td>'+status_data+'</td>\
                                                    </tr>';
                            taskStr = taskStr + single_task_row;
    
                        }
                        data = '<div class="row mt-2" style="box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;border-radius:5px;background-color:rgb(168, 235, 213);">\
                        <div class="col-lg-12 mt-1 mb-1 p-1">\
                            <span class="text-white bg-primary" style="border:1px solid primary;border-radius:2px;"><small><strong>&nbsp;&nbsp;'+key+'&nbsp;&nbsp;</strong></small></span>\
                        </div>\
                        <div class="col-lg-12 text-danger">\
                            <div class="col-lg-12">\
                                <table class="table table-borderless table-sm">\
                                    <thead>\
                                        <tr>\
                                        <th scope="col" style="width: 650px;">Task</th>\
                                        <th scope="col">Project</th>\
                                        <th scope="col">Start DateTime</th>\
                                        <th scope="col">End DateTime</th>\
                                        <th scope="col">Status</th>\
                                        </tr>\
                                    </thead>\
                                    <tbody>'+taskStr+'</tbody>\
                                    </table>\
                                </div>\
                            </div>\
                        </div>';
                    }
                    dataSrt = dataSrt + data;
                  }
                  $('#task-list-div').html('');
                  $('#task-list-div').append(dataSrt);
            }
        });
        // --------------------------------------------------------
    }
    }
