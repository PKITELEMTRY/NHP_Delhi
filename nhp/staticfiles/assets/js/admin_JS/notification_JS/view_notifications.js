function view_notification(thisTxt){
    var notificationID = $(thisTxt).attr('not_id');
    // --------------------------------------------------------
    $.ajax({
        type: 'GET',
        url: "/notification-management/view-notification/"+notificationID.toString(),
        success: function (response) {
            $('#title_data').html('').append("Subject : "+response['response']['title']);
            $('#message_data').html('').append(response['response']['message']);
            $('#to_data').html('').append(response['response']['sender']);
            $('#from_data').html('').append(response['response']['receiver']);
            $('#date_data').html('').append(response['response']['created_at']);
        }
    });
    // --------------------------------------------------------
}



function hide_div1(){
    $('#inbox-id').hide();
    $('#trash-id').hide();
    $('#starred-id').hide();
    $('#sent-id').show();
    // localStorage.setItem("notification_type", "Sent");
    // // =================================================================================
    // // -------------------------------  AJAX CALL  -------------------------------------
    // $.ajax({
    //     type: 'GET',
    //     url: "/notification-management/get-selected-notification",
    //     data : {'notification_type':localStorage.getItem("notification_type")},
    //     success: function (response) {
    //         console.log(response);
    //         var dataStr = '';
    //         if(response.length > 0){
    //             var data = '';
    //         }else{
    //             var dataStr = '<div class="text-center text-info"><h5><i class="dripicons-exit me-2"></i>No sent notifications found!</h5></div>';
    //         }
    //         $('#sent-id').html('');
    //         $('#sent-id').append(data);
    //     }
    // });
    // ---------------------------------------------------------------------------------
    // =================================================================================
}

function hide_div2(){
    $('#inbox-id').hide();
    $('#sent-id').hide();
    $('#starred-id').hide();
    $('#trash-id').show();
    // localStorage.setItem("notification_type", "Trash");
    // // =================================================================================
    // // -------------------------------  AJAX CALL  -------------------------------------
    // $.ajax({
    //     type: 'GET',
    //     url: "/notification-management/get-selected-notification",
    //     data : {'notification_type':localStorage.getItem("notification_type")},
    //     success: function (response) {
    //         console.log(response);
    //     }
    // });
    // ---------------------------------------------------------------------------------
    // =================================================================================
}

function hide_div3(){
    $('#inbox-id').hide();
    $('#sent-id').hide();
    $('#trash-id').hide();
    $('#starred-id').show();
    // localStorage.setItem("notification_type", "Starred");
    // // =================================================================================
    // // -------------------------------  AJAX CALL  -------------------------------------
    // $.ajax({
    //     type: 'GET',
    //     url: "/notification-management/get-selected-notification",
    //     data : {'notification_type':localStorage.getItem("notification_type")},
    //     success: function (response) {
    //         console.log(response['response']);
    //     }
    // });
    // ---------------------------------------------------------------------------------
    // =================================================================================
}