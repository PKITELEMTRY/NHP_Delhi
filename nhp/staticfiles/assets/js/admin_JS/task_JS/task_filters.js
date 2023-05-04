// ########################################################################################################################################
// ########################################################################################################################################
function getProjectModuleList(thisTxt) {
    var projectFk = $(thisTxt).val();
    localStorage.setItem('projectFK',projectFk);

    // ---------------  AJAX CALL  ----------------------------
    $.ajax({
        type: 'GET',
        url: "/task-management/get_project_module_employee_list/" + projectFk,
        success: function (response) {

            if (response['response'].length > 0) {
                var dataStr = '<option></option>';
                for (var i = 0; i < response['response'].length; i++) {
                    var data = '<option value="'+ response['response'][i]['id'] + '">'+ response['response'][i]['moduleName'] + '</option>';
                    
                    dataStr = dataStr + data;
                }
            } else {
                var dataStr = '';
            }
            $('#modulesData').html('');
            $('#modulesData').append(dataStr);

            if (response['empDataArray'].length > 0) {
                if(response['userType'] == 'Employee'){
                    var dataStr = '<option value="'+response['userDataArray']['userID']+'" selected>'+response['userDataArray']['userName']+'</option>';
                }else{

                    var dataStr = '<option></option>';
                    for (var i = 0; i < response['empDataArray'].length; i++) {
                        var data = '<option value="'+ response['empDataArray'][i]['id'] + '">'+ response['empDataArray'][i]['emp_name'] + '</option>';
                        
                        dataStr = dataStr + data;
                    }
                }
            } else {
                var dataStr = '';
            }
            $('#employeeFK').html('');
            $('#employeeFK').append(dataStr);
        }
    });
    // --------------------------------------------------------
}
// ########################################################################################################################################
// ########################################################################################################################################
function get_submodule_data_list(thisTxt) {
    var moduleFk = $(thisTxt).val();
    // ---------------  AJAX CALL  ----------------------------
    $.ajax({
        type: 'GET',
        url: "/project-management/get_selected_project_subModule_list/" + moduleFk,
        success: function (response) {
            if (response['response'].length > 0) {
                var dataStr = '<option></option>';
                for (var i = 0; i < response['response'].length; i++) {
                    var data = '<option value="'+ response['response'][i]['subMod_id'] + '">'+ response['response'][i]['subModuleName'] + '</option>';
                    dataStr = dataStr + data;
                }
            } else {
                var dataStr = '';
            }
            $('#submodulesData').html('');
            $('#submodulesData').append(dataStr);
        }
    });
    // --------------------------------------------------------
}
// ########################################################################################################################################
// ########################################################################################################################################
// function filterTasks(){
//     var projectID = $('#project_analytics_filter').val();
//     var moduleID = $('#get_subModule_list').val();
//     var subModuleID = $('#subMod').val();
//     var employeeID = $('#employeeID').val();
//     var dueDate = $('#dueDate').val();
//     var status = $('#status').val();
//     // ----------------------------------------------
//     // ------------------  AJAX CALL  ------------------------------
//     $.ajax({
//         type: 'GET',
//         url: "/task-management/filter-task",
//         data : {'projectID':projectID,'moduleID':moduleID,'subModuleID':subModuleID,'employeeID':employeeID,'dueDate':dueDate,'status':status},
//         success: function (response) {
//             if (response['response'].length > 0) {
//                 var dataStr = '<option></option>';
//                 for (var i = 0; i < response['response'].length; i++) {
//                     var data = '<option value="'+ response['response'][i]['subMod_id'] + '">'+ response['response'][i]['subModuleName'] + '</option>';
//                     dataStr = dataStr + data;
//                 }
//             } else {
//                 var dataStr = '';
//             }
//             $('#submodulesData').html('');
//             $('#submodulesData').append(dataStr);
//         }
//     });
//     // --------------------------------------------------------
// }
function filterTasks() {
    var projectID = $('#project_analytics_filter').val();
    var moduleID = $('#get_subModule_list').val();
    var subModuleID = $('#subMod').val();
    var employeeID = $('#employeeID').val();
    var dueDate = $('#dueDate').val();
    var status = $('#status').val();
    // var start_date = $('#start_date').val();
    // -------------------------------------------------------------
    console.log('projectID >>>> ', projectID);
    console.log('moduleID >>>> ', moduleID);
    console.log('subModuleID >>>> ', subModuleID);
    console.log('employeeID >>>> ', employeeID);
    console.log('dueDate >>>> ', dueDate);
    console.log('status >>>> ', status);
    // console.log('start_date >>>>>>', start_date);
    var dateRange=''
    if (dueDate.trim() == 'custom') {
        dateRange = $('#daterange').val();
    }
    console.log(dateRange);
    // -------------------------------------------------------------
    // ------------------  AJAX CALL  ------------------------------
    $.ajax({
        type: 'GET',
        url: "/task-management/filter-task",
        data: { 'projectID': projectID, 'moduleID': moduleID, 'subModuleID': subModuleID, 'employeeID': employeeID, 'dueDate': dueDate,'dateRange':dateRange, 'status': status },
        success: function (response) {
           
            console.log(response['response']);
            $("#generalTasks").removeClass("show");
            if (response['response'].length > 0) {
                var dataStr = '<option></option>';
                for (var i = 0; i < response['response'].length; i++) {
                    var data = '<option value="' + response['response'][i]['subMod_id'] + '">' + response['response'][i]['subModuleName'] + '</option>';
                    dataStr = dataStr + data;
                }
            } else {
                var dataStr = '';
                for (var i = 0; i < response['data'][0]['todotask'].length; i++) {
                    var data = '<option value="' + response['response'][0]['todotask'] > ' </option>';
                    dataStr = dataStr + data;

                }
                

                //==============================================================================================
            }
            //==============================================================================================
            // data append to the html todo section
            //==============================================================================================
            var todoString = ''

            if (response['response'][0].length) {
                for (var i = 0; i < response['response'][0].length; i++) {
                    var data = '<tr><td>'+response['response'][0][i]['projectName'] + '</td><td><a  class="bold  text-primary end-bar-toggle" style="cursor:pointer;" onclick="view_task(this)" taskId="' + response['response'][0][i]['taskID'] + '">' + response['response'][0][i]['taskTitile'] + '<i class="mdi mdi-chevron-right  fs-15"></i></a></td><td><img src="/media/' + response['response'][0][i]['profile_image'] + '" alt="image" class="avatar-xs rounded-circle me-1"  >' + response['response'][0][i]['assignedTo'] + '</td><td><span class="text-info"></span><span class="text-info">' + response['response'][0][i]['due_date'] + '</span></span></td><td><span class="badge badge-info-lighten p-1">' + response['response'][0][i]['priority'] + '</span></td><td><select class="form-control-light" taskId="' + response['response'][0][i]['taskID'] + '" onchange="edit_task_status(this)"><option value="To do" selected>To do</option><option value="Doing">Doing</option><option value="Review">Review</option><option value="Done">Done</option></select></td></td><td><a data-bs-toggle="modal" data-bs-target="#edit-task-modal" href="javascript:;" class="action-icon text-warning"  onclick="get_update_task(this)" taskId="' + response['response'][0][i]['taskID'] + '"><i class="mdi mdi-square-edit-outline"></i></a><a href="javascript:void(0);" class="action-icon text-danger" taskId="' + response['response'][0][i]['taskID'] + '" onclick="delete_task(this)"> <i class="mdi mdi-delete-outline"></i></a></td></tr>';
                    todoString = todoString + data;
                }
                $("#todayTasks").addClass("show");

            }
            else {
                var todoString = '<tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>';
                // $("#todayTasks").accordion("active", false);
                $("#todayTasks").removeClass("show");

            }
            

            // todoString['todayTasks'][0].length
            $('#tbltask').html('');
            $('#tbltask').append(todoString);
            $('#todoTaskLen').html("");
            $('#todoTaskLen').html("(" + response['response'][0].length + ")");

            //=====================================================================================================================
            //data append to the html doing section
            //======================================================================================================================
            
            var doingString = '';
            if (response['response'][1].length) {
                for (var i = 0; i < response['response'][1].length; i++) {
                    var data = '<tr><td>'+response['response'][1][i]['projectName'] + '</td><td><a  class="bold  text-primary end-bar-toggle" style="cursor:pointer;" onclick="view_task(this)" taskId="' + response['response'][1][i]['taskID'] + '">' + response['response'][1][i]['taskTitile'] + '<i class="mdi mdi-chevron-right  fs-15"></i></a></td><td><img src="/media/' + response['response'][1][i]['profile_image'] + '" alt="image" class="avatar-xs rounded-circle me-1"  >' + response['response'][1][i]['assignedTo'] + '</td><td><span class="text-info"></span><span class="text-info">' + response['response'][1][i]['due_date'] +'</span></small></span></td><td><span class="badge badge-info-lighten p-1">' + response['response'][1][i]['priority'] + '</span></td><td><select class="form-control-light" taskId="' + response['response'][1][i]['taskID'] + '" onchange="edit_task_status(this)"><option value="To do" >To do</option><option value="Doing"  selected>Doing</option><option value="Review">Review</option><option value="Done">Done</option></select></td></td><td><a data-bs-toggle="modal" data-bs-target="#edit-task-modal" href="javascript:;" class="action-icon text-warning"  onclick="get_update_task(this)" taskId="' + response['response'][1][i]['taskID'] + '"><i class="mdi mdi-square-edit-outline"></i></a><a href="javascript:void(0);" class="action-icon text-danger" taskId="' + response['response'][1][i]['taskID'] + '" onclick="delete_task(this)"> <i class="mdi mdi-delete-outline"></i></a></td></tr>';
                    doingString = doingString + data;
                }
                $("#upcomingTasks").addClass("show");

            } else {
                var doingString = '<tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>';
                // $("#upcomingTasks").accordion("active", false);
                $("#upcomingTasks").removeClass("show");

            }

            $('#doingtask').html('');
            $('#doingtask').append(doingString);
            $('#doingtasklen').html("");
            $('#doingtasklen').html("(" + response['response'][1].length + ")");

            //======================================================================================================================
            //data append to the html review section
            //======================================================================================================================
            var reviewString = '';
            if (response['response'][2].length) {
                for (var i = 0; i < response['response'][2].length; i++) {
                   var data = '<tr><td>'+response['response'][2][i]['projectName'] + '</td><td><a  class="bold  text-primary end-bar-toggle" style="cursor:pointer;" onclick="view_task(this)" taskId="' + response['response'][2][i]['taskID'] + '">' + response['response'][2][i]['taskTitile'] + '<i class="mdi mdi-chevron-right  fs-15"></i></a></td><td><img src="/media/' + response['response'][2][i]['profile_image'] + '" alt="image" class="avatar-xs rounded-circle me-1"  >' + response['response'][2][i]['assignedTo'] + '</td><td><span class="text-info"></span><span class="text-info">' + response['response'][2][i]['due_date'] + '</span></small></span></td><td><span class="badge badge-info-lighten p-1">' + response['response'][2][i]['priority'] + '</span></td><td><select class="form-control-light" taskId="' + response['response'][2][i]['taskID'] + '" onchange="edit_task_status(this)"><option value="To do">To do</option><option value="Doing">Doing</option><option value="Review"  selected>Review</option><option value="Done">Done</option></select></td></td><td><a data-bs-toggle="modal" data-bs-target="#edit-task-modal" href="javascript:;" class="action-icon text-warning"  onclick="get_update_task(this)" taskId="' + response['response'][2][i]['taskID'] + '"><i class="mdi mdi-square-edit-outline"></i></a><a href="javascript:void(2);" class="action-icon text-danger" taskId="' + response['response'][2][i]['taskID'] + '" onclick="delete_task(this)"> <i class="mdi mdi-delete-outline"></i></a></td></tr>';
                    reviewString = reviewString + data;
                }
                $("#reviewTasks").addClass("show");

            } else {
                var reviewString = '<tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>';
                $("#reviewTasks").removeClass("show");


            }

            $('#reviewtask').html('');
            $('#reviewtask').append(reviewString);
             $('#reviewtasklen').html("");
            $('#reviewtasklen').html("(" + response['response'][2].length + ")");

            //=======================================================================================================================
            //data append to the html done section
            //=======================================================================================================================
            
            var doneString = '';
            if (response['response'][3].length) {
                for (var i = 0; i < response['response'][3].length; i++) {
                    var data = '<tr><td>'+response['response'][3][i]['projectName'] + '</td><td><a  class="bold  text-primary end-bar-toggle" style="cursor:pointer;" onclick="view_task(this)" taskId="' + response['response'][3][i]['taskID'] + '">' + response['response'][3][i]['taskTitile'] + '<i class="mdi mdi-chevron-right  fs-15"></i></a></td><td><img src="/media/' + response['response'][3][i]['profile_image'] + '" alt="image" class="avatar-xs rounded-circle me-1"  >' + response['response'][3][i]['assignedTo'] + '</td><td><span class="text-info"></span><span class="text-info">' + response['response'][3][i]['due_date'] + '</span></small></span></td><td><span class="badge badge-warning-lighten p-1">' + response['response'][3][i]['priority'] + '</span></td><td><select class="form-control-light" taskId="' + response['response'][3][i]['taskID'] + '" onchange="edit_task_status(this)"><option value="To do" >To do</option><option value="Doing">Doing</option><option value="Review">Review</option><option value="Done" selected>Done</option></select></td></td><td><span class="text-info">' + response['response'][3][i]['due_date'] + '</span></td></tr>';
                    doneString = doneString + data;
                }
                $("#doneTasks").addClass("show");

            } else {
                var donegString = '<tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>';
                $("#doneTasks").removeClass("show");

            }

            $('#donetask').html('');
            $('#donetask').append(doneString);
            $('#donetasklen').html("");
            $('#donetasklen').html("(" + response['response'][3].length + ")");

            $('#submodulesData').html('');
            $('#submodulesData').append(dataStr);
        }
    });
    
    // ----------------------------------------------------------------------------------------------------------------------------
}