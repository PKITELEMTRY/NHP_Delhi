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
function allot_leave(){
    var empID = $('#getEmployeeID').val().trim();
    var no_of_days = $('#no_of_days').val().trim();
    var reason = $('#getLeaveReason').val().trim();

    if(empID.trim() == ''){
        alert('select valid employee!');
        return false;
    }
    if(no_of_days.trim() == 0){
        alert('select valid no. of days!');
        return false;
    }
    if(no_of_days.trim() == ''){
        alert('select valid no. of days!');
        return false;
    }
    if(reason.trim() == ''){
        alert('select valid reason!');
        return false;
    }
    // ---------------  AJAX CALL  ----------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/leave-management/allot-leave",
        headers: { 'X-CSRFToken': csrftoken },
        data: {'empID':empID,'no_of_days':no_of_days,'reason':reason},
        success: function (response) {
            console.log(response['response']);
            if(response['response'] == 'success'){
                alert('Leave alloted Successfully');
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