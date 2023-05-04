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
// GEt & Edit Schedule Wishes
// ##############################################################################################################
function get_scheduled_wish(thisTxt){
    var wishID = $(thisTxt).attr('wishID');

    console.log('wishID >>> ',wishID);
    // ---------------  AJAX CALL  ----------------------------
    $.ajax({
        type: 'GET',
        url: "/event-management/get_wish_data/"+wishID.toString(),
        success: function (response) {
            console.log(response['response']);
            
            $('#sendBTN').attr('receiverID',response['response']['receiverID'])
    
            if(response['response']['receiver_image'] == ''){
                var data = '<img src="https://images.vexels.com/media/users/3/129616/isolated/preview/fb517f8913bd99cd48ef00facb4a67c0-businessman-avatar-silhouette-by-vexels.png" class="rounded-circle img-thumbnail avatar-lg" alt="friend"><h3 id="recName">'+response['response']['receiver']+'</h3>'
            }else{
                var data = '<img src="/media/'+response['response']['receiver_image']+'" class="rounded-circle img-thumbnail avatar-lg" alt="friend"><h3 id="recName">'+response['response']['receiver']+'</h3>';
            }
            
            $('#recData').html('')
            $('#recData').append(data)

            $('#wishTitle').val('');
            $('#wish_msg').val('');
            // $('#emp_photo').val('');

            $('#wishTitle').val(response['response']['title']);
            $('#wish_msg').val(response['response']['message']);
            // $('#emp_photo').val(response['response']['receiver_image']);
            $('#imgphoto').attr('src',response['response']['creative']);

        }
    });
    // --------------------------------------------------------
}
// ##############################################################################################################
function edit_schedule_message(thisTxt){
    var receiverID = $(thisTxt).attr('receiverID');
    var title = $('#wishTitle').val().trim();
    var message = $('#wish_msg').val();

    console.log('receiverID >>> ',receiverID);
    console.log('title >>> ',title);
    console.log('message >>> ',message);

    if(title.trim() == ''){
        alert('Enter title for wish!');
        return false;
    }
    if(message.trim() == ''){
        alert('Enter message for wish!');
        return false;
    }

    var formdata = new FormData();
    formdata.append("receiverID", receiverID);
    formdata.append("title", title);
    formdata.append("message", message);
    let myFileimg = document.getElementById('emp_photo').files[0];
    if (typeof myFileimg != 'undefined') {
        formdata.append('creative', myFileimg, myFileimg['name']);
    }else{
        formdata.append('creative', '');
    }
    // ---------------  AJAX CALL  ----------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/event-management/schedule-message",
        headers: { 'X-CSRFToken': csrftoken },
        data: formdata,
        cache : false,
        processData : false,
        contentType : false,
        encType : 'multipart/form-data',
        success: function (response) {
            console.log(response['response']);
            if(response['response'] == 'success'){
                alert('Message scheduled Successfully');
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
