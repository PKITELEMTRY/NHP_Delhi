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
function update_application_status(thisTxt){
    var appID = $(thisTxt).attr('appID');
    var status = $(thisTxt).val();

    var formdata = new FormData();
    formdata.append("status", status);
    // ---------------  AJAX CALL  ----------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/hr-management/edit-application-status/"+appID.toString(),
        headers: { 'X-CSRFToken': csrftoken },
        data: formdata,
        cache : false,
        processData : false,
        contentType : false,
        encType : 'multipart/form-data',
        success: function (response) {
            console.log(response['response']);
            
            if(response['response'] == 'success'){
                alert('Job Application Status Changed Successfully to '+status+'');
                location.reload();
            }else if(response['response'] == 'Unauthorized Personal'){
                alert('You are not allowed to change status of job application!');
                return false;
            }else{
                alert('An Error occured while changing job application status. Please try again!');
                return false;
            }
        }
    });
    // --------------------------------------------------------
}
// ##############################################################################################################
// SCHEDULE INTERVIEW
// ##############################################################################################################
function get_application_info(thisTxt){
    var appID = $(thisTxt).attr('appID');
    // ---------------  AJAX CALL  ----------------------------
    $.ajax({
        type: 'GET',
        url: "/hr-management/get-application-info/"+appID.toString(),
        success: function (response) {
            console.log(response['response']);
            $('#append_candidate_info').html('');
            $('#append_candidate_info').append('<span class="text-danger">'+response['response'][0]['role']+'</span> - '+response['response'][0]['candidate_name']+'');
            $('#candEmail').val(response['response'][0]['candidate_email']);
            $('#datepicker').val(response['response'][0]['interviewDate']);
            // $("#datepicker").datepicker({});
            $('#interviewerName').val(response['response'][0]['interviewer']);
            $('#interviewSchedBTN').attr('appID',response['response'][0]['applicationID'])   
        }
    });
    // --------------------------------------------------------
}
// ==============================================================================================================
function schedule_interview(thisTxt){
    var appID = $(thisTxt).attr('appID');
    var interviewDate = $('#datepicker').val();
    var interviewerName = $('#interviewerName').val();

    if(interviewDate.trim() == ''){
        alert('Select Interview Date.');
        return false;
    }if(interviewerName.trim() == ''){
        alert('Enter Interviewer Name.');
        return false;
    }

    var formdata = new FormData();
    formdata.append("interviewDate", interviewDate);
    formdata.append("interviewerName", interviewerName);
    // ---------------  AJAX CALL  ----------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/hr-management/schedule-interview/"+appID.toString(),
        headers: { 'X-CSRFToken': csrftoken },
        data: formdata,
        cache : false,
        processData : false,
        contentType : false,
        encType : 'multipart/form-data',
        success: function (response) {
            console.log(response['response']);
            
            if(response['response'] == 'success'){
                alert('Interview Scheduled Successfully.');
                location.reload();
            }else if(response['response'] == 'Unauthorized Personal'){
                alert('You are not allowed to schedule interview!');
                return false;
            }else{
                alert('An Error occured while scheduling interview. Please try again!');
                return false;
            }
        }
    });
    // --------------------------------------------------------

}
// ##############################################################################################################
// SEND REPLY MESSAGE
// ##############################################################################################################
function get_app_info(thisTxt){
    var appID = $(thisTxt).attr('appID');
    // ---------------  AJAX CALL  ----------------------------
    $.ajax({
        type: 'GET',
        url: "/hr-management/get-application-info/"+appID.toString(),
        success: function (response) {
            $('#CandidateINFOR').html('');
            $('#CandidateINFOR').append('<span class="text-danger">'+response['response'][0]['role']+'</span> - '+response['response'][0]['candidate_name']+'');
            $('#canEmAIl').val(response['response'][0]['candidate_email']);
            $('#sendMsgBTN').attr('appID',response['response'][0]['applicationID'])
        }
    });
    // --------------------------------------------------------
}
// ==============================================================================================================
// ==============================================================================================================
function send_message(thisTxt){
    var appID = $(thisTxt).attr('appID');
    var messageData = $('#message').val();

    if(messageData.trim() == ''){
        alert('Enter message.');
        return false;
    }

    var formdata = new FormData();
    formdata.append("messageData", messageData);
    // ---------------  AJAX CALL  ----------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/hr-management/send-message/"+appID.toString(),
        headers: { 'X-CSRFToken': csrftoken },
        data: formdata,
        cache : false,
        processData : false,
        contentType : false,
        encType : 'multipart/form-data',
        success: function (response) {
            console.log(response['response']);
            
            if(response['response'] == 'success'){
                alert('Message Sent Successfully.');
                location.reload();
            }else if(response['response'] == 'Unauthorized Personal'){
                alert('You are not allowed to send message!');
                return false;
            }else{
                alert('An Error occured while sending message. Please try again!');
                return false;
            }
        }
    });
    // --------------------------------------------------------

}
// ##############################################################################################################
// ##############################################################################################################
