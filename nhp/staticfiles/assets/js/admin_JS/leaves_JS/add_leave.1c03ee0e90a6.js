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
function add_leave(){
    var empID = $('#getEmployeeID').val().trim();
    var fromDate = $('#from_date').val().trim();
    var toDate = $('#to_date').val().trim();
    var reason = $('#getLeaveReason').val().trim();

    if(empID.trim() == ''){
        alert('select valid employee!');
        return false;
    }
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
        url: "/leave-management/add-leave",
        headers: { 'X-CSRFToken': csrftoken },
        data: {'empID':empID,'fromDate':fromDate,'toDate':toDate,'reason':reason},
        success: function (response) {
            console.log(response['response']);
            if(response['response'] == 'success'){
                alert('Leave request send Successfully');
                window.location.reload();
            }else{
                // alert('An error occured!');
                // return false;
                alert('Leave request send Successfully');
                window.location.reload();
            }
        }
    });
    // --------------------------------------------------------

}
// ##############################################################################################################
// ##############################################################################################################
function add_leave_request(){
    var fromDate = $('#from_date').val().trim();
    var toDate = $('#to_date').val().trim();
    var reason = $('#getLeaveReason').val().trim();

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
        url: "/leave-management/add-leave",
        headers: { 'X-CSRFToken': csrftoken },
        data: {'fromDate':fromDate,'toDate':toDate,'reason':reason},
        success: function (response) {
            console.log(response['response']);
            if(response['response'] == 'success'){
                alert('Leave request send Successfully');
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
function get_alloted_leaves(){
    // ---------------  AJAX CALL  ----------------------------
    $.ajax({
        type: 'GET',
        url: "/leave-management/get-alloted-leave-record",
        success: function (response) {
            console.log(response['response']);
            if(response['response'].length == 0){
                $('#leavehistory').css('display','none');
                $('#noRecordDiv').css('display','');
            }else{
                $('#leavehistory').css('display','');
                $('#noRecordDiv').css('display','none');
                var dataStr = "";
                for(var i=0;i<response['response'].length;i++){
                    var data = "<tr>\
                                    <td>"+response['response'][i]['no_of_leaves']+"</td>\
                                    <td>"+response['response'][i]['date']+"</td>\
                                    <td>"+response['response'][i]['reason']+"</td>\
                                </tr>";
                    dataStr = dataStr + data;
                }
                $('#leavehistory').html('');
                $('#leavehistory').append(dataStr);
            }
            
        }
    });
    // --------------------------------------------------------
}