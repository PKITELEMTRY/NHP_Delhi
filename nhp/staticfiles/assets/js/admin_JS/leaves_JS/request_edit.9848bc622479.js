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
function fetch_edit_leaves(thisTxt){
    var leaveID = $(thisTxt).attr('leaveID');

    console.log('leaveID >>> ',leaveID);
    // ---------------  AJAX CALL  ----------------------------
    $.ajax({
        type: 'GET',
        url: "/leave-management/fetch_leave/"+leaveID.toString(),
        success: function (response) {
            console.log(response['response']);
            $('#from_date_edit').val(response['response']['from']);
            $('#to_date_edit').val(response['response']['to']);
            $('#getLeaveReason_edit').val(response['response']['reason']);


            $('#from_date_edit_request').val(response['response']['from']);
            $('#to_date_edit_request').val(response['response']['to']);
            $('#getLeaveReason_edit_request').val(response['response']['reason']);


            $('#edit_request_btn').attr('leaveId',leaveID);
            $('#edit_request_btn_pend').attr('leaveId',leaveID);
        }
    });
    // --------------------------------------------------------
}
// ##############################################################################################################
function edit_request(thisTxt){
    var leaveID = $(thisTxt).attr('leaveID');

    var fromDate = $('#from_date_edit_request').val().trim();
    var toDate = $('#to_date_edit_request').val().trim();
    var reason = $('#getLeaveReason_edit_request').val().trim();

    if(fromDate.trim() == ''){
        alert('select valid from Date!');
        return false;
    }
    if(reason.trim() == ''){
        alert('select valid reason!');
        return false;
    }

    if(toDate.trim() != ''){

        const x = new Date(fromDate);
        const y = new Date(toDate);
        
        console.log('startDate >>> ',x);
        console.log('endDate >>> ',y);
        
        if(+x <= +y){
            console.log('');
        }else{
            alert('To date must be greater than From date!');
            return false;
        }
    }
    // ---------------  AJAX CALL  ----------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/leave-management/edit_leave_request/"+leaveID.toString(),
        headers: { 'X-CSRFToken': csrftoken },
        data: {'fromDate':fromDate,'toDate':toDate,'reason':reason},
        success: function (response) {
            console.log(response['response']);
            if(response['response'] == 'success'){
                alert('Request to update leave send Successfully.');
                window.location.reload()
            }else{
                alert('An error occured!');
                return false;
            }
        }
    });
    // --------------------------------------------------------
}


// ############################################################################################################
function edit_leave(thisTxt){
    var leaveID = $(thisTxt).attr('leaveID');

    var fromDate = $('#from_date_edit').val().trim();
    var toDate = $('#to_date_edit').val().trim();
    var reason = $('#getLeaveReason_edit').val().trim();

    if(fromDate.trim() == ''){
        alert('select valid from Date!');
        return false;
    }
    if(reason.trim() == ''){
        alert('select valid reason!');
        return false;
    }

    if(toDate.trim() != ''){

        const x = new Date(fromDate);
        const y = new Date(toDate);
        
        console.log('startDate >>> ',x);
        console.log('endDate >>> ',y);
        
        if(+x <= +y){
            console.log('');
        }else{
            alert('To date must be greater than From date!');
            return false;
        }
    }
    // ---------------  AJAX CALL  ----------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/leave-management/edit_leave/"+leaveID.toString(),
        headers: { 'X-CSRFToken': csrftoken },
        data: {'fromDate':fromDate,'toDate':toDate,'reason':reason},
        success: function (response) {
            console.log(response['response']);
            if(response['response'] == 'success'){
                alert('Request updated Successfully.');
                window.location.reload()
            }else{
                alert('An error occured!');
                return false;
            }
        }
    });
    // --------------------------------------------------------
}

// ############################################################################################################
function send_leave_rejection_feedback(thisTxt){
    var leaveID = $(thisTxt).attr('leaveID');
    var reason = $('#rejectTextFeedback').val().trim();

    if(reason.trim() == ''){
        alert('select valid reason!');
        return false;
    }

    // ---------------  AJAX CALL  ----------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/leave-management/send_rejection_feedback/"+leaveID.toString(),
        headers: { 'X-CSRFToken': csrftoken },
        data: {'reason':reason},
        success: function (response) {
            console.log(response['response']);
            if(response['response'] == 'success'){
                alert('Feedback Sent Successfully.');
                window.location.reload()
            }else{
                alert('An error occured!');
                return false;
            }
        }
    });
    // --------------------------------------------------------
}
// ##############################################################################################################
// ##############################################################################################################
function fetch_leaves(thisTxt){
    var leaveID = $(thisTxt).attr('leaveID');
    $('#send_feedback_request_btn').attr('leaveId',leaveID);
}
// ##############################################################################################################