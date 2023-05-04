// ########################################################################################################################################
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
function change_password(){
    var old_password = $('#pass').val().trim();
    var new_password = $('#new_pass1').val().trim();
    var re_enter_new_password = $('#new_pass2').val().trim();

    if(old_password.length == 0){
        alert('Enter valid current password');
        return false;
    }
    if(new_password.length < 8){
        alert('New password length must be minimum 8');
        return false;
    }
    if(re_enter_new_password.length < 8){
        alert('New password length must be minimum 8');
        return false;
    }
    if(new_password.trim() != re_enter_new_password.trim()){
        alert('Password not matched!');
        return false;
    }
    // --------------------------------------------------------
    // --------------------------------------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "change-password",
        headers: { 'X-CSRFToken': csrftoken },
        data: {'old_password':old_password,'new_password':re_enter_new_password},
        success: function (response) {
            console.log(response['response']);
            if(response['response'] == 'success'){
                alert('Password changed successfully. Login to continue.');
                location.href = '/';
            }
            else if(response['response'] == 'authFailed'){
                alert('Wrong Old Password!');
                // alert('Signing you out. Login to continue.');
                location.reload();
            }else{
                alert('An Error occured while changing new password. Please try again!');
                return false;
            }
        }
    });
    // --------------------------------------------------------
    // --------------------------------------------------------
}
// ########################################################################################################################################
// ########################################################################################################################################
function check_pass(){
    var new_password = $('#new_pass1').val().trim();
    var re_enter_new_password = $('#new_pass2').val().trim();

    if(new_password.trim() != re_enter_new_password.trim()){
        $('#new_pass1').css('border','1px solid red');
        $('#new_pass2').css('border','1px solid red'); 
        $('#pass_2_text').css('display',''); 
        $('#submitBtn').attr('disabled',true);  
    }
    else{
        $('#new_pass1').css('border','1px solid green');
        $('#new_pass2').css('border','1px solid green'); 
        $('#pass_2_text').css('display','none');
        $('#submitBtn').attr('disabled',false);  
    }
}