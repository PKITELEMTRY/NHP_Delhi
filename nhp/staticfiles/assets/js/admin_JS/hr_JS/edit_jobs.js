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
function update_active_status(thisTxt){
    var status = ''
    var jobID = $(thisTxt).attr('jobID');
    if($(thisTxt).prop("checked") == true){
        // deactivate block
        console.log('ON');
        status = 'deactivate';
    }else{
        // activate block
        console.log('OFF');
        status = 'activate';
    }
    
    var formdata = new FormData();
    formdata.append("status", status);
    // ---------------  AJAX CALL  ----------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/hr-management/edit-job-visibility/"+jobID,
        headers: { 'X-CSRFToken': csrftoken },
        data: formdata,
        cache : false,
        processData : false,
        contentType : false,
        encType : 'multipart/form-data',
        success: function (response) {
            console.log(response['response']);
            
            if(response['response'] == 'success'){
                alert('Job Active Status Changed successfully');
                location.reload();
            }else if(response['response'] == 'Unauthorized Personal'){
                alert('You are not allowed to change status of Job!');
                return false;
            }else{
                alert('An Error occured while changing Job active status. Please try again!');
                return false;
            }
        }
    });
    // --------------------------------------------------------
}
// ##############################################################################################################
// ##############################################################################################################
// ##############################################################################################################
function edit_job(){
    var profileID = $('#edit_designation').val();
    var text = $('.Editor-editor').html();
    var jobLoc = $('#edit_selectedJobLoc').val();

    if(profileID.trim() == ''){
        alert('Select Job Title.');
        return false;
    }if(jobLoc.length == 0){
        alert('Select atleast 1 Job Location.');
        return false;
    }if(text.trim() == ''){
        alert('Enter Job Description.');
        return false;
    }
    
    var formdata = new FormData();
    formdata.append("profileID", profileID);
    formdata.append("text", text);
    formdata.append("location", jobLoc);


    // ---------------  AJAX CALL  ----------------------------
    var url = window.location.href;
    var urlData = url.split('/');
    var id = urlData[urlData.length - 1];
    // --------------------------------------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/hr-management/edit-job/"+id.toString(),
        headers: { 'X-CSRFToken': csrftoken },
        data: formdata,
        cache : false,
        processData : false,
        contentType : false,
        encType : 'multipart/form-data',
        success: function (response) {
            
            if(response['response'] == 'success'){
                alert('Job Updated successfully');
                location.reload();
            }else if(response['response'] == 'Unauthorized Personal'){
                alert('You are not allowed to update Job!');
                return false;
            }else{
                alert('An Error occured while updating Job info. Please try again!');
                return false;
            }
        }
    });
    // --------------------------------------------------------
}