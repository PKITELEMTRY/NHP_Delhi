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
// leave approve/reject
$('.leave_req .approve').click(function () {
    var requestID = $(this).attr('requestID');
    // ---------------  AJAX CALL  ----------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/leave-management/handle-leave-requests/"+requestID.toString(),
        headers: { 'X-CSRFToken': csrftoken },
        data: {'response':'approved'},
        success: function (response) {
        }
    });
    $(this).text('Approved');
    $(this).css('font-size', '16px');
    $(this).parent().find('.reject').hide();
    // window.location.href=window.location.href;
    // --------------------------------------------------------
});
// ===============================================================================================
// ===============================================================================================
$('.leave_req .reject').click(function () {
    var requestID = $(this).attr('requestID');
    // ---------------  AJAX CALL  ----------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/leave-management/handle-leave-requests/"+requestID.toString(),
        headers: { 'X-CSRFToken': csrftoken },
        data: {'response':'rejected'},
        success: function (response) {
        }
    });
    $(this).text('Rejected');
    $(this).css('font-size', '16px');
    $(this).parent().find('.approve').hide();
    // window.location.href=window.location.href;
    // --------------------------------------------------------
});
// ##############################################################################################################
// ##############################################################################################################
