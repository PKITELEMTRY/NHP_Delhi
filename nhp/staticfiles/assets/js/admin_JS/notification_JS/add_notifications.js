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
function add_notifications(){
    if($("#sendToAll").prop('checked') == true){
        var employee_all = 'All';
        var employee_list = [];
    }else{
        var employee_list = $('#employeeList').val();
        var employee_all = 'None';
        if(employee_list.length == 0){
            alert('select atleast 1 employee');
            return false;
        }
    }

    var mailSubject = $('#mailsubject').val().trim();
    var mailMessage = $('#mailText').val().trim();

    if(mailSubject.trim() == ''){
        alert('Enter valid subject for message');
        return false;
    }
    if(mailMessage.trim() == ''){
        alert('Enter valid message');
        return false;
    }
    
    console.log('employee_all >>>> ',employee_all);
    console.log('employee_list >>>> ',employee_list);
    console.log('mailSubject >>>> ',mailSubject);
    console.log('mailMessage >>>> ',mailMessage);


    // --------------------------------------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/notification-management/notification",
        headers: { 'X-CSRFToken': csrftoken },
        data: {'employee_all':employee_all,'employee_list[]':employee_list,'mailSubject':mailSubject,'mailMessage':mailMessage},
        success: function (response) {
            console.log(response['response']);
            if(response['response'] == 'success'){
                alert('Message sent successfully');
                window.location.reload()
            }else{
                alert('An Error occured while sending message. Please try again!');
                return false;
            }
        }
    });
    // --------------------------------------------------------
}

// ########################################################################################################################################
// ########################################################################################################################################
