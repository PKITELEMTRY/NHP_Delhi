// ##############################################################################################################
var currentProjectName = $('#projectname').val().trim();
function checkProject(thisTxt) {
    if ($(thisTxt).val().trim() != currentProjectName) {
        // ---------------  AJAX CALL  ----------------------------
        $.ajax({
            type: 'GET',
            url: "/project-management/check-project-name",
            data: { 'searchData': $(thisTxt).val().trim() },
            success: function (response) {
                console.log(response['response']);
                if (response['response'] == 'Project exist') {
                    $('#projectNameExist').css('display', '');
                    $('#update_btn').attr('disabled', true);
                } else {
                    $('#projectNameExist').css('display', 'none');
                    $('#update_btn').attr('disabled', false);
                }
            }
        });
        // --------------------------------------------------------
    }
}
// ##############################################################################################################
// ##############################################################################################################
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
// ##############################################################################################################
// ##############################################################################################################
function updateProjectData() {

    var ProjectName = $('#projectname').val();
    var ProjectSector = $('#projectsector').val();
    var ProjectTypeArray = $('#projectEditType').val();

    if (ProjectName.trim().length == 0) {
        alert('Enter Project Name');
        return false;
    }
    if (ProjectSector.trim().length == 0) {
        alert('Select valid project sector');
        return false;
    }
    if (ProjectTypeArray.length == 0) {
        alert('Select valid project type');
        return false;
    }
    var ProjectTechnoloyArray = $('#projectEditTech').val();

    var startDate = $('#startDate').val();
    var endDate = $('#due_date').val();

    const x = new Date(startDate);
    const y = new Date(endDate);

    console.log('startDate >>> ', x);
    console.log('endDate >>> ', y);


    if (startDate.length == 0) {
        alert('Select tentative project start date');
        return false;
    }
    // if(endDate.length == 0){
    //     alert('Select tentative project end date');
    //     return false;
    // }

    // if(+x <= +y){
    //     console.log('');
    // }else{
    //     alert('End date must be greater than start date!');
    //     return false;
    // }

    var ProjectOverview = $('#project-overview').val();

    var ProjectManagersArray = $('#projectEditManager').val();
    var ProjectTeamArray = $('#projectTeam').val();

    console.log('ProjectName >>> ', ProjectName);
    console.log('ProjectSector >>> ', ProjectSector);
    console.log('ProjectTypeArray >>> ', ProjectTypeArray);
    console.log('ProjectTechnoloyArray >>> ', ProjectTechnoloyArray);
    console.log('startDate >>> ', startDate);
    console.log('endDate >>> ', endDate);
    console.log('ProjectOverview >>> ', ProjectOverview);
    console.log('ProjectManagersArray >>> ', ProjectManagersArray);
    console.log('ProjectTeamArray >>> ', ProjectTeamArray);

    // ev.preventDefault();   
    //bundle the files and data we want to send to the server
    var formdata = new FormData();
    formdata.append("ProjectName", ProjectName);
    formdata.append("ProjectSector", ProjectSector);
    formdata.append("ProjectTypeArray", ProjectTypeArray);
    formdata.append("ProjectTechnoloyArray", ProjectTechnoloyArray);
    formdata.append("startDate", startDate);
    formdata.append("endDate", endDate);
    formdata.append("ProjectOverview", ProjectOverview);
    formdata.append("ProjectManagersArray", ProjectManagersArray);
    formdata.append("ProjectTeamArray", ProjectTeamArray);

    let myFileimg = document.getElementById('emp_photo').files[0];
    if (typeof myFileimg != 'undefined') {
        formdata.append('ProjectLogo', myFileimg, myFileimg['name']);
    }
    // ===================================================================================
    //                                Project DOCS
    // ===================================================================================
    var ProjectDocs = [];
    $('.project_docs').each(function () { ProjectDocs.push($(this).attr('id')); });
    console.log(ProjectDocs);

    for (var j = 0; j < ProjectDocs.length; j++) {
        let upload_docs = document.getElementById(ProjectDocs[j]).files[0];
        if (typeof upload_docs != 'undefined') {
            formdata.append('upload_docs_' + j + '', upload_docs, upload_docs['name']);
        }
    }
    // ===================================================================================
    // ===================================================================================
    //                                Project URLs
    // ===================================================================================
    var projectUrlName = [];
    var projectUrl = [];

    $('.projectUrlName').each(function () { projectUrlName.push($(this).attr('id')); });
    console.log(projectUrlName);
    $('.projectURL').each(function () { projectUrl.push($(this).attr('id')); });
    console.log(projectUrl);

    for (var j = 0; j < projectUrlName.length; j++) {
        let upload_docs_type = document.getElementById(projectUrlName[j]).value;
        if (typeof upload_docs_type != 'undefined') {
            formdata.append('upload_url_type_' + j + '', upload_docs_type);
        }
        let upload_url = document.getElementById(projectUrl[j]).value;
        console.log('upload_url >>> ', upload_url);
        if (typeof upload_url != 'undefined') {
            formdata.append('upload_url_' + j + '', upload_url);
        }
    }
    // ===================================================================================
    // ===================================================================================
    // ===================================================================================
    // return false;
    // -------------------------------  AJAX CALL  ---------------------------------------
    var urlData = window.location.href;
    var URLArray = urlData.split('/');
    var projectID = URLArray[URLArray.length - 1];
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/project-management/update-project-detail/" + projectID.toString(),
        headers: { 'X-CSRFToken': csrftoken },
        data: formdata,
        cache: false,
        processData: false,
        contentType: false,
        encType: 'multipart/form-data',
        success: function (response) {
            console.log(response['response']);
            // $('#enquiryButton').css('display','');
            // $('#spinnerbtn').css('display','none');
            if (response['response'] == 'success') {
                alert('Project Updated successfully');
                // location.reload();
                // $('#exampleModalCenter').modal('hide');
                window.location.reload()
            } else {
                alert('An Error occured while Updationg Project Info. Please try again!');
                return false;
            }
        }
    });
    // --------------------------------------------------------
}
// ##############################################################################################################
// ##############################################################################################################
function change_status(thisTxt) {
    console.log('data val >>> ', $(thisTxt).val());
    var data = $(thisTxt).val();
    swal("Are you sure? You want to force update project status!", {
        buttons: {
            defeat: "Update",
            cancel: "Cancel",
        },
    })
        .then((value) => {
            switch (value) {

                case "defeat":
                    // -----------------------------------------------------------------------------------
                    // -------------------------------  AJAX CALL  ---------------------------------------
                    var urlData = window.location.href;
                    var URLArray = urlData.split('/');
                    var projectID = URLArray[URLArray.length - 1];
                    const csrftoken = getCookie('csrftoken');
                    $.ajax({
                        type: 'POST',
                        url: "/project-management/force-update-project-status/" + projectID.toString(),
                        headers: { 'X-CSRFToken': csrftoken },
                        data: {'projectStatus':data},
                        success: function (response) {
                            console.log(response['response']);
                            if (response['response'] == 'success') {
                                // alert('Project Updated successfully');
                                swal("Project Status Updated successfully");
                                location.reload();
                            } else {
                                alert('An Error occured while Updationg Project Info. Please try again!');
                                return false;
                            }
                        }
                    });
                    // --------------------------------------------------------
                    // swal("Pikachu fainted! You gained 500 XP!");

                    // -----------------------------------------------------------------------------------
                    break;

                default:
                    if (data == 'Completed') {
                        $(thisTxt).val('In Progress');
                    } else {
                        $(thisTxt).val('Completed');
                    }
                    $("#force_update_status").select2({
                    });
                    return false;
            }
        });
}






function change_to_maintenance_mode(){
    // -----------------------------------------------------------------------------------
    // -------------------------------  AJAX CALL  ---------------------------------------
    var urlData = window.location.href;
    var URLArray = urlData.split('/');
    var projectID = URLArray[URLArray.length - 1];
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/project-management/change_to_maintenace_mode/" + projectID.toString(),
        headers: { 'X-CSRFToken': csrftoken },
        success: function (response) {
            console.log(response['response']);
            if (response['response'] == 'success') {
                alert('Project status updated for maintenance mode.');
                location.reload();
            } else {
                alert('An Error occured while Updationg Project Info. Please try again!');
                return false;
            }
        }
    });
    // -----------------------------------------------------------------------------------
}


function change_to_development_mode(){
    // -----------------------------------------------------------------------------------
    // -------------------------------  AJAX CALL  ---------------------------------------
    var urlData = window.location.href;
    var URLArray = urlData.split('/');
    var projectID = URLArray[URLArray.length - 1];
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/project-management/change_to_development_mode/" + projectID.toString(),
        headers: { 'X-CSRFToken': csrftoken },
        success: function (response) {
            console.log(response['response']);
            if (response['response'] == 'success') {
                alert('Project status updated for development mode.');
                location.reload();
            } else {
                alert('An Error occured while Updationg Project Info. Please try again!');
                return false;
            }
        }
    });
    // -----------------------------------------------------------------------------------
}



function edit_Project_Data(){

    var endDate = $('#due_date').val();
    const y = new Date(endDate);


    var ProjectOverview = $('#project-overview').val();

    var ProjectTeamArray = $('#projectTeam').val();
    console.log('endDate >>> ', endDate);
    console.log('ProjectOverview >>> ', ProjectOverview);
    console.log('ProjectTeamArray >>> ', ProjectTeamArray);

    // ev.preventDefault();   
    //bundle the files and data we want to send to the server
    var formdata = new FormData();
    formdata.append("endDate", endDate);
    formdata.append("ProjectOverview", ProjectOverview);
    formdata.append("ProjectTeamArray", ProjectTeamArray);

    let myFileimg = document.getElementById('emp_photo').files[0];
    if (typeof myFileimg != 'undefined') {
        formdata.append('ProjectLogo', myFileimg, myFileimg['name']);
    }
    // ===================================================================================
    //                                Project DOCS
    // ===================================================================================
    var ProjectDocs = [];
    $('.project_docs').each(function () { ProjectDocs.push($(this).attr('id')); });
    console.log(ProjectDocs);

    for (var j = 0; j < ProjectDocs.length; j++) {
        let upload_docs = document.getElementById(ProjectDocs[j]).files[0];
        if (typeof upload_docs != 'undefined') {
            formdata.append('upload_docs_' + j + '', upload_docs, upload_docs['name']);
        }
    }
    // ===================================================================================
    // ===================================================================================
    //                                Project URLs
    // ===================================================================================
    var projectUrlName = [];
    var projectUrl = [];

    $('.projectUrlName').each(function () { projectUrlName.push($(this).attr('id')); });
    console.log(projectUrlName);
    $('.projectURL').each(function () { projectUrl.push($(this).attr('id')); });
    console.log(projectUrl);

    for (var j = 0; j < projectUrlName.length; j++) {
        let upload_docs_type = document.getElementById(projectUrlName[j]).value;
        if (typeof upload_docs_type != 'undefined') {
            formdata.append('upload_url_type_' + j + '', upload_docs_type);
        }
        let upload_url = document.getElementById(projectUrl[j]).value;
        console.log('upload_url >>> ', upload_url);
        if (typeof upload_url != 'undefined') {
            formdata.append('upload_url_' + j + '', upload_url);
        }
    }
    // ===================================================================================
    // ===================================================================================
    // ===================================================================================
    // return false;
    // -------------------------------  AJAX CALL  ---------------------------------------
    var urlData = window.location.href;
    var URLArray = urlData.split('/');
    var projectID = URLArray[URLArray.length - 1];
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/project-management/update-project-detail/" + projectID.toString(),
        headers: { 'X-CSRFToken': csrftoken },
        data: formdata,
        cache: false,
        processData: false,
        contentType: false,
        encType: 'multipart/form-data',
        success: function (response) {
            console.log(response['response']);
            // $('#enquiryButton').css('display','');
            // $('#spinnerbtn').css('display','none');
            if (response['response'] == 'success') {
                alert('Project Updated successfully');
                // location.reload();
                // $('#exampleModalCenter').modal('hide');
                window.location.reload()
            } else {
                alert('An Error occured while Updationg Project Info. Please try again!');
                return false;
            }
        }
    });
    // --------------------------------------------------------

}