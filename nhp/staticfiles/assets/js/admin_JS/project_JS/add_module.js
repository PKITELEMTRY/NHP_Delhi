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
function add_module(){
    var projectFk = $('#projectId').val();
    console.log(projectFk);
    if(projectFk == ''){
        alert('select project!');
        return false;
    }
    var moduleName = [];
    var moduleDescription = [];
    $('.moduleName').each(function() {
            $(this).css('border',"");
        });

    $('.moduleName').each(function() {
        if($(this).val() == ''){
            alert("Module Name can't be blank!");
            $(this).css('border',"2px solid red");
            return false;
        }else if(moduleName.indexOf($(this).val().toLowerCase().trim()) > -1){
            alert("Module Name can't be duplicate!");
            $(this).css('border',"2px solid red");
            return false;
        }else{
            $(this).css('border',"");
            moduleName.push($(this).val().toLowerCase().trim()); 
        }
        });
    console.log(moduleName);
    $('.moduleDescription').each(function() { 
        moduleDescription.push($(this).val()); 
    });
    console.log(moduleDescription);

    if(moduleName.length == moduleDescription.length){

        // ---------------  AJAX CALL  ----------------------------
        const csrftoken = getCookie('csrftoken');
        $.ajax({
            type: 'POST',
        url: "/project-management/add-module",
        headers: { 'X-CSRFToken': csrftoken },
        data: {'projectFk':projectFk,"moduleName[]":moduleName,'moduleDescription[]':moduleDescription},
        success: function (response) {
            console.log(response['response']);
            
            if(response['response'] == 'success'){
                alert('New Module Added successfully');
                window.location.reload()
            }else if(response['response'] == 'User With this Contact Already Exist!'){
                $('#contact').css('border','2px solid red');
                alert('User With this Contact Already Exist!');
                return false;
            }else{
                alert('An Error occured while storing Module Info. Please try again!');
                return false;
            }
        }
    });
    // --------------------------------------------------------
}
}
// ########################################################################################################################################
// ########################################################################################################################################
function add_sub_module(){
    var projectID = $('#projectId').val();
    console.log(projectID);
    var moduleFk = $('#module_data').val();
    if(projectID == ''){
        alert('select project!');
        return false;
    }
    if(moduleFk == ''){
        alert('select module!');
        return false;
    }
    var subModuleName = [];
    var subModuleDescription = [];
    $('.submoduleName').each(function() {
            $(this).css('border',"");
        });

    $('.submoduleName').each(function() {
        if($(this).val() == ''){
            alert("Sub Module Name can't be blank!");
            $(this).css('border',"2px solid red");
            return false;
        }else if(subModuleName.indexOf($(this).val().toLowerCase().trim()) > -1){
            alert("Sub Module Name can't be duplicate!");
            $(this).css('border',"2px solid red");
            return false;
        }else{
            $(this).css('border',"");
            subModuleName.push($(this).val().toLowerCase().trim()); 
        }
        });
    console.log(subModuleName);
    $('.submoduledesc').each(function() { 
        subModuleDescription.push($(this).val()); 
    });
    console.log(subModuleDescription);

    if(subModuleName.length == subModuleDescription.length){

        // ---------------  AJAX CALL  ----------------------------
        const csrftoken = getCookie('csrftoken');
        $.ajax({
            type: 'POST',
        url: "/project-management/add-submodule",
        headers: { 'X-CSRFToken': csrftoken },
        data: {'projectID':projectID,'moduleFk':moduleFk,"subModuleName[]":subModuleName,'subModuleDescription[]':subModuleDescription},
        success: function (response) {
            console.log(response['response']);
            
            if(response['response'] == 'success'){
                alert('New Sub Module Added successfully');
                window.location.reload()
            }else if(response['response'] == 'User With this Contact Already Exist!'){
                $('#contact').css('border','2px solid red');
                alert('User With this Contact Already Exist!');
                return false;
            }else{
                alert('An Error occured while storing Sub Module Info. Please try again!');
                return false;
            }
        }
    });
    // --------------------------------------------------------
}
}