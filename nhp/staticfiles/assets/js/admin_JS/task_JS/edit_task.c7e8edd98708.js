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
function edit_task_status(thisTxt){
    var taskStatus = $(thisTxt).val();
    var taskID = $(thisTxt).attr('taskID');
    // ---------------  AJAX CALL  ----------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/task-management/update-task-status",
        headers: { 'X-CSRFToken': csrftoken },
        data: {'taskStatus':taskStatus,'taskID':taskID},
        success: function (response) {
            
            if(response['response'] == 'success'){
                // $('#createBtn').css('display','');
                // $('#spinnerBtn').css('display','none');
                // alert('New Task Added successfully');
                window.location.reload()
            }else if(response['response'] == 'You are not authorized to change Task Status!'){
                alert('You are not authorized to change Task Status!');
                window.location.reload()
            }else if(response['response'] == 'You are not authorized to change Task Status to Done!'){
                alert('You are not authorized to change Task Status to Done!');
                window.location.reload()
            }else{
                // $('#createBtn').css('display','');
                // $('#spinnerBtn').css('display','none');
                alert('An Error occured while storing Task Info. Please try again!');
                window.location.reload()
                return false;
            }
        }
    });
    // --------------------------------------------------------
     
}
// ########################################################################################################################################
// ########################################################################################################################################
function edit_task_info(thisTxt){
    var taskID = $(thisTxt).attr('taskId');

    var taskTitle = $('#task_titleName').val();
    var dueDate = $('#datepicker1').val();
    var dueTime = $('#due_time_append').val();
    var priority = $('#task-priority4').val();
    var employeeFK = $('#prevEmp').val();
    var taskDescription = $('#task_descName').val();

    if(taskTitle.length == 0){
        alert('Enter valid Task Title!');
        return false;
    }if(dueDate.length == 0){
        alert('Select valid Due date!');
        return false;
    }if(dueTime.length == 0){
        alert('Select valid Due time!');
        return false;
    }if(priority.length == 0){
        alert('Select priority!');
        return false;
    }if(typeof employeeFK != 'undefined'){
        if(employeeFK.length == 0){
            alert('Select valid Employee!');
            return false;
        }
    }else{
        var employeeFK = '';
    }

    // ---------------  AJAX CALL  ----------------------------
    $('#update_task').css('display','none');
    $('#edit_spinner_btn').css('display','');

    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/task-management/update-task-info",
        headers: { 'X-CSRFToken': csrftoken },
        data: {'taskID':taskID,'taskTitle':taskTitle.trim(),'dueDate':dueDate,'dueTime':dueTime,'priority':priority,'employeeFK':employeeFK,'taskDescription':taskDescription.trim(),},
        success: function (response) {
            
            if(response['response'] == 'success'){
                $('#update_task').css('display','');
                $('#edit_spinner_btn').css('display','none');
                alert('Task Updated successfully');
                window.location.reload()
            }else if(response['response'] == 'You are not authorized to update this task!'){
                $('#update_task').css('display','');
                $('#edit_spinner_btn').css('display','none');
                alert('You are not authorized to update this task!');
                return false;
            }else{
                $('#update_task').css('display','');
                $('#edit_spinner_btn').css('display','none');
                alert('An Error occured while storing Task Info. Please try again!');
                return false;
            }
        }
    });
    // --------------------------------------------------------
     
}
// ########################################################################################################################################
// ########################################################################################################################################
function udate_dependencies_info(thisTxt){
    var taskId = $(thisTxt).attr('taskId');

    var taskDependencies = $('#task_dependencies_append').val().trim();
    if(taskDependencies == ''){
        alert('Enter dependencies to update');
        return false;
    }

    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/task-management/update-task-dependencies",
        headers: { 'X-CSRFToken': csrftoken },
        data: {'taskID':taskId,'taskDependencies':taskDependencies.trim(),},
        success: function (response) {
            
            if(response['response'] == 'success'){
                $('#update_task').css('display','');
                $('#edit_spinner_btn').css('display','none');
                alert('Task Updated successfully');
                window.location.reload()
            }else if(response['response'] == 'You are not authorized to change Task Status!'){
                alert('You are not authorized to change Task Status!');
                window.location.reload()
            }else{
                $('#update_task').css('display','');
                $('#edit_spinner_btn').css('display','none');
                alert('An Error occured while storing Task Info. Please try again!');
                return false;
            }
        }
    });
    // --------------------------------------------------------
}
// ########################################################################################################################################
// ########################################################################################################################################
function delete_task(thisTxt){
    if (confirm('Are you sure you want to delete this task?')) {
        // Save it!
        // --------------------------------------------------------
        $.ajax({
            type: 'GET',
            url: "/task-management/delete-task/"+$(thisTxt).attr('taskID'),
            success: function (response) {
                
                if(response['response'] == 'success'){
                    $('#update_task').css('display','');
                    $('#edit_spinner_btn').css('display','none');
                    alert('Task deleted successfully');
                    window.location.reload()
                }else{
                    alert('You are not authorized to delete this task!');
                    return false;
                }
            }
        });
        // --------------------------------------------------------
      } else {
        return false;
      }
}

// ########################################################################################################################################
// ########################################################################################################################################
function edit_general_task_info(thisTxt){
    var taskID = $(thisTxt).attr('taskId');

    var taskTitle = $('#task_general_titleName').val();
    var dueDate = $('#general_datepicker1').val();
    var dueTime = $('#due_general_time_append').val();
    var priority = $('#task-general-priority4').val();
    // var employeeFK = $('#prevEmp').val();
    var taskDescription = $('#general_task_descName').val();

    if(taskTitle.length == 0){
        alert('Enter valid Task Title!');
        return false;
    }if(dueDate.length == 0){
        alert('Select valid Due date!');
        return false;
    }if(dueTime.length == 0){
        alert('Select valid Due time!');
        return false;
    }if(priority.length == 0){
        alert('Select priority!');
        return false;
    }


    // ---------------  AJAX CALL  ----------------------------
    $('#general_update_task').css('display','none');
    $('#edit_general_spinner_btn').css('display','');

    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/task-management/update-task-info",
        headers: { 'X-CSRFToken': csrftoken },
        data: {'taskID':taskID,'taskTitle':taskTitle.trim(),'dueDate':dueDate,'dueTime':dueTime,'priority':priority,'taskDescription':taskDescription.trim(),'typeOfUpdate':'general'},
        success: function (response) {
            
            if(response['response'] == 'success'){
                $('#general_update_task').css('display','');
                $('#edit_general_spinner_btn').css('display','none');
                alert('General Task Updated successfully');
                window.location.reload()
            }else if(response['response'] == 'You are not authorized to update this task!'){
                $('#general_update_task').css('display','');
                $('#edit_general_spinner_btn').css('display','none');
                alert('You are not authorized to update this task!');
                return false;
            }else{
                $('#general_update_task').css('display','');
                $('#edit_general_spinner_btn').css('display','none');
                alert('An Error occured while storing Task Info. Please try again!');
                return false;
            }
        }
    });
    // --------------------------------------------------------
     
}