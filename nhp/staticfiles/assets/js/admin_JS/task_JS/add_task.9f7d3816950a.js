// localStorage.setItem('projectFK',projectFk);
if(localStorage.hasOwnProperty("projectFK")){
    localStorage.removeItem("projectFK");
}
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
function createTask(){
    // var projectFk = $('#projectsData').val();
    if(localStorage.hasOwnProperty("projectFK")){
        var projectFK = localStorage.getItem('projectFK');
        // localStorage.removeItem("projectFK");
    }else{
        alert('Select valid Project!');
        return false;
    }

    var moduleFk = $('#modulesData').val();
    var subModuleFk = $('#submodulesData').val();

    var taskTitle = $('#task-title').val();

    var startDate = $('#startDate').val();
    var startTime = $('#startTime').val();

    var dueDate = $('#datepicker').val();
    var dueTime = $('#dueTime').val();
    var task_status = $('#task-status-add').val();

    var priority = $('#task-priority2').val();
    var employeeFK = $('#employeeFK').val();

    var taskDescription = $('#taskDescription').val();

    // if(projectFK.length == 0){
    //     alert('Select valid Project!');
    //     return false;
    // }
    if(moduleFk == null){
        alert('Select valid Module!');
        return false;
    }
    // if(subModuleFk.length == 0){
    //     alert('Select valid Submodule!');
    //     return false;
    // }
    if(taskTitle.length == 0){
        alert('Enter valid Task Title!');
        return false;
    }if(startDate.length == 0){
        alert('Select valid Start date!');
        return false;
    }if(startTime.length == 0){
        alert('Select valid Start time!');
        return false;
    }
    if(dueDate.length == 0){
        alert('Select valid Due date!');
        return false;
    }if(dueTime.length == 0){
        alert('Select valid Due time!');
        return false;
    }if(priority.length == 0){
        alert('Select priority!');
        return false;
    }if(task_status.length == 0){
        alert('Select task status!');
        return false;
    }
    if(typeof employeeFK != 'undefined'){
        if(employeeFK.length == 0){
            alert('Select valid Employee!');
            return false;
        }
    }else{
        var employeeFK = '';
    }



    $('#createBtn').css('display','none');
    $('#spinnerBtn').css('display','');
    // ---------------  AJAX CALL  ----------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/task-management/add-task",
        headers: { 'X-CSRFToken': csrftoken },
        data: {'projectFk':projectFK,'moduleFk':moduleFk,'subModuleFk':subModuleFk,'taskTitle':taskTitle,'startDate':startDate,'startTime':startTime,'dueDate':dueDate,'dueTime':dueTime,'priority':priority,'employeeFK':employeeFK,'taskDescription':taskDescription,'task_status':task_status},
        success: function (response) {
            
            if(response['response'] == 'success'){
                $('#createBtn').css('display','');
                $('#spinnerBtn').css('display','none');
                alert('New Task Added successfully');
                window.location.reload()
            }else{
                $('#createBtn').css('display','');
                $('#spinnerBtn').css('display','none');
                alert('An Error occured while storing Task Info. Please try again!');
                return false;
            }
        }
    });
    // --------------------------------------------------------


}
// ########################################################################################################################################
// ########################################################################################################################################
function add_no_module_task(thisTxt){
    if($(thisTxt).val().trim() == 'General Task'){
        $('#task-project-div').css('display','none');
        $('#task-module-div').css('display','none');
        $('#task-sub-module-div').css('display','none');
        $('#task-status-add-div').css('display','none');


        // ---------------  AJAX CALL  ----------------------------
        $.ajax({
            type: 'GET',
            url: "/task-management/get-emp",
            success: function (response) {
                var dataStr = '';
                for(var i=0;i<response['response'].length;i++){
                    var data = '<option value="'+response['response'][i]['empId']+'">'+response['response'][i]['empName']+'</option>';
                    dataStr = dataStr + data;
                }
    
                $('#employeeFK').html('');
                $('#employeeFK').append('<option></option>'+dataStr);
            }
        });
        $('#createBtn').css('display','none');
        $('#createBtn1').css('display','');
        // --------------------------------------------------------
    }else{
        $('#task-project-div').css('display','');
        $('#task-module-div').css('display','');
        $('#task-sub-module-div').css('display','');
        $('#task-status-add-div').css('display','');


        $('#employeeFK').html('');
        $('#employeeFK').append('<option></option>');

        $('#createBtn').css('display','');
        $('#createBtn1').css('display','none');
    }
}
// ########################################################################################################################################
// ########################################################################################################################################
function createGeneralTask(){

        var taskTitle = $('#task-title').val();

        var startDate = $('#startDate').val();
        var startTime = $('#startTime').val();
    
        var dueDate = $('#datepicker').val();
        var dueTime = $('#dueTime').val();
        var priority = $('#task-priority2').val();
        var employeeFK = $('#employeeFK').val();
    
        var taskDescription = $('#taskDescription').val();

        if(taskTitle.length == 0){
            alert('Enter valid Task Title!');
            return false;
        }if(startDate.length == 0){
            alert('Select valid Start date!');
            return false;
        }if(startTime.length == 0){
            alert('Select valid Start time!');
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
        if(typeof employeeFK != 'undefined'){
            if(employeeFK.length == 0){
                alert('Select valid Employee!');
                return false;
            }
        }else{
            var employeeFK = '';
        }

    
        $('#createBtn').css('display','none');
        $('#spinnerBtn').css('display','');
        // ---------------  AJAX CALL  ----------------------------
        const csrftoken = getCookie('csrftoken');
        $.ajax({
            type: 'POST',
            url: "/task-management/add-general-task",
            headers: { 'X-CSRFToken': csrftoken },
            data: {'taskTitle':taskTitle,'startDate':startDate,'startTime':startTime,'dueDate':dueDate,'dueTime':dueTime,'priority':priority,'employeeFK':employeeFK,'taskDescription':taskDescription,},
            success: function (response) {                
                if(response['response'] == 'success'){
                    $('#createBtn').css('display','');
                    $('#spinnerBtn').css('display','none');
                    alert('New Task Added successfully');
                    window.location.reload()
                }else{
                    $('#createBtn').css('display','');
                    $('#spinnerBtn').css('display','none');
                    alert('An Error occured while storing Task Info. Please try again!');
                    return false;
                }
            }
        });
        // --------------------------------------------------------
    
}

// ########################################################################################################################################
// ########################################################################################################################################
