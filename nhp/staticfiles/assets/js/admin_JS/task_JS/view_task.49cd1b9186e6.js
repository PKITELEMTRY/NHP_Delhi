// ########################################################################################################################################
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
// ########################################################################################################################################
// ########################################################################################################################################
function view_task(thisTxt){
    // ---------------  AJAX CALL  ----------------------------
    $.ajax({
        type: 'GET',
        url: "/task-management/get_task_details/" + $(thisTxt).attr('taskId'),
        success: function (response) {
            // =====================================================
            $('#task_title_append').text('');
            $('#task_created_append').text('');
            $('#task_updated_append').text('');
            $('#task_project_append').text('');
            $('#task_module_append').text('');
            $('#task_subModule_append').text('');
            $('#task_due_append').text('');
            $('#task_start_append').text('');
            $('#task_priority_append').text('');
            $('#task_status_append').html('');
            $('#task_description_append').text('');
            $('#task_dependencies_append').val('');

            var dataStr = '';
            if(response['response']['task_status'] == 'To do'){
                dataStr = "<select  taskID="+response['response']['id']+" onchange='edit_task_status(this)' class='form-control-light'><option selected value='To do'>To do</option><option value='Doing'>Doing</option><option value='Review'>Review</option></select>"
            }
            if(response['response']['task_status'] == 'Doing'){
                dataStr = "<select  taskID="+response['response']['id']+" onchange='edit_task_status(this)' class='form-control-light'><option value='To do'>To do</option><option selected value='Doing'>Doing</option><option value='Review'>Review</option></select>"
            }
            if(response['response']['task_status'] == 'Review'){
                dataStr = "<select  taskID="+response['response']['id']+" onchange='edit_task_status(this)' class='form-control-light'><option value='To do'>To do</option><option value='Doing'>Doing</option><option selected value='Review'>Review</option></select>"
            }
            if(response['response']['task_status'] == 'Done'){
                dataStr = "<span class='text-success'>Done</span>"
            }

            $('#task_title_append').text(response['response']['task_title']);
            $('#task_created_append').text(response['response']['created_at']);
            $('#task_updated_append').text(response['response']['updated_at']);
            $('#task_project_append').text(response['response']['projectData']);
            $('#task_module_append').text(response['response']['moduleFK']);
            $('#task_subModule_append').text(response['response']['submoduleFK']);
            $('#task_due_append').text(response['response']['due_date_original']+ ', ' + response['response']['due_time']);
            $('#task_start_append').text(response['response']['created_at']+ ', ' + response['response']['start_time']);
            $('#task_priority_append').text(response['response']['priority']);
            $('#task_employee_append').html(response['response']['employeeFK']);
            $('#task_description_append').text(response['response']['task_description']);
            if(response['response']['task_status'] == 'Done'){
                $('#depDiv').css('display','none');
                $('#task_dependencies_append').css('display','none');
                $('#update_task_btn2').css('display','none');
                $('#task_complete_append').text(response['response']['completion_date']);
                $('#task_review_append').text(response['response']['review_date']);
            }else if(response['response']['task_status'] == 'Review'){
                $('#depDiv').css('display','');
                $('#task_dependencies_append').css('display','');
                $('#task_dependencies_append').val(response['response']['dependencies']);
                $('#update_task_btn2').css('display','');
                $('#task_complete_append').text('-');
                $('#task_review_append').text(response['response']['review_date']);
            }else{
                $('#depDiv').css('display','');
                $('#task_dependencies_append').css('display','');
                $('#task_dependencies_append').val(response['response']['dependencies']);
                $('#update_task_btn2').css('display','');
                $('#task_complete_append').text('-');
                $('#task_review_append').text('-');

            }
            $('#task_status_append').append(dataStr);


            $('#update_task_btn2').attr('taskId',response['response']['id']);

            // =====================================================
        }
    });
    // --------------------------------------------------------
}


// ########################################################################################################################################
// ########################################################################################################################################
function get_update_task(thisTxt){
    // ---------------  AJAX CALL  ----------------------------
    $.ajax({
        type: 'GET',
        url: "/task-management/get_task_details/" + $(thisTxt).attr('taskId'),
        success: function (response) {
            // =====================================================
            $('#task_projectName').val(response['response']['projectData']);
            $('#task_titleName').val(response['response']['task_title']);
            $('#task_descName').val(response['response']['task_description']);
            $('#task-priority4').val(response['response']['priority']);
            
            $('#datepicker1').val(response['response']['due_date_original']);
            $('#due_time_append').val(response['response']['due_time_original']);
            
            // =====================================================
            if (response['empDataArray'].length > 0) {
                var dataStr = '';
                for (var i = 0; i < response['empDataArray'].length; i++) {
                    var data = '<option value="'+ response['empDataArray'][i]['id'] + '">'+ response['empDataArray'][i]['emp_name'] + '</option>';
                    dataStr = dataStr + data;
                }
            } else {
                var dataStr = '';
            }
            $('#append_emp').html('');
            $('#append_emp').append('<label class="form-label">Employee</label>\
            <select class="form-control select2 text-large"  id="prevEmp" data-toggle="select2" data-placeholder="Select Employee">\
            '+dataStr+'\
            </select>');
            $('#prevEmp').val(response['response']['empID']);
            $('#submodulesAppend').val(response['response']['submoduleFK']);
            $('#modulesAppend').val(response['response']['moduleFK']);
            $('#update_task').attr('taskID',$(thisTxt).attr('taskId'));
        }
    });
    // --------------------------------------------------------
}
// ########################################################################################################################################
// ########################################################################################################################################
function get_general_task_update(thisTxt){
    // ---------------  AJAX CALL  ----------------------------
    $.ajax({
        type: 'GET',
        url: "/task-management/get_task_details/" + $(thisTxt).attr('taskId'),
        success: function (response) {
            // =====================================================
            $('#task_general_titleName').val(response['response']['task_title']);
            $('#general_task_descName').val(response['response']['task_description']);
            $('#task-general-priority4').val(response['response']['priority']);
            
            $('#general_datepicker1').val(response['response']['due_date_original']);
            $('#due_general_time_append').val(response['response']['due_time_original']);
            
            $('#general_update_task').attr('taskID',$(thisTxt).attr('taskId'));
        }
    });
    // --------------------------------------------------------
}