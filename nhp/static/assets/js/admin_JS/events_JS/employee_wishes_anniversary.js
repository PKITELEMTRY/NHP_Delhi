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
// ##############################################################################################################
function send_message(thisTxt){
    var receiverID = $(thisTxt).attr('receiverID');
    var title = $('#anniversaryTitle').val().trim();
    var message = $('#anniversarymessage').val();
    var eventType = $(thisTxt).attr('eventType');

    console.log('receiverID >>> ',receiverID);
    console.log('title >>> ',title);
    console.log('message >>> ',message);
    console.log('eventType >>> ',eventType);


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
    formdata.append("eventType", eventType);

    let myFileimg = document.getElementById('emp_photo').files[0];
    if (typeof myFileimg != 'undefined') {
        formdata.append('creative', myFileimg, myFileimg['name']);
    }
    // ---------------  AJAX CALL  ----------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/event-management/send-message-anniversary",
        headers: { 'X-CSRFToken': csrftoken },
        data: formdata,
        cache : false,
        processData : false,
        contentType : false,
        encType : 'multipart/form-data',
        success: function (response) {
            console.log(response['response']);
            if(response['response'] == 'success'){
                alert('Message sent Successfully');
                window.location.reload()
            }else{
                alert('An error occured!');
                return false;
            }
        }
    });
    // --------------------------------------------------------
}


function schedule_message(thisTxt){
    var receiverID = $(thisTxt).attr('receiverID');
    var title = $('#anniversary_sched_Title').val().trim();
    var message = $('#anniversary_sched_message').val();
    var eventType = $(thisTxt).attr('event_Type');

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
    formdata.append("eventType", eventType);
    
    let myFileimg = document.getElementById('creative_file').files[0];
    if (typeof myFileimg != 'undefined') {
        formdata.append('creative', myFileimg, myFileimg['name']);
    }
    // ---------------  AJAX CALL  ----------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/event-management/schedule-message-anniversary",
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
// ##############################################################################################################
function send_message_modal(thisTxt){
    var receiverID = $(thisTxt).attr('recID');
    var receiverName = $(thisTxt).attr('recName');
    var receiverImage = $(thisTxt).attr('recImage');
    var eventType = $(thisTxt).attr('eventType');
    console.log('receiverID >>> ',receiverID);
    console.log('receiverName >>> ',receiverName);
    console.log('receiverImage >>> ',receiverImage);
    console.log('eventType >>> ',eventType);
    // --------------------------------------------------------
    $('#sendBTN').attr('receiverID',receiverID);
    $('#sendBTN').attr('eventType',eventType)
    
    if(receiverImage == ''){
        var data = '<img src="https://images.vexels.com/media/users/3/129616/isolated/preview/fb517f8913bd99cd48ef00facb4a67c0-businessman-avatar-silhouette-by-vexels.png" class="rounded-circle img-thumbnail avatar-lg" alt="friend"><h3 id="recName">'+receiverName+'</h3>'
    }else{
        var data = '<img src="/media/'+receiverImage+'" class="rounded-circle img-thumbnail avatar-lg" alt="friend"><h3 id="recName">'+receiverName+'</h3>';
    }
    
    $('#recData').html('')
    $('#recData').append(data)
    // --------------------------------------------------------
}

function schedule_message_modal(thisTxt){
    var receiverID = $(thisTxt).attr('recID');
    var receiverName = $(thisTxt).attr('recName');
    var receiverImage = $(thisTxt).attr('recImage');
    var eventType = $(thisTxt).attr('eventType');

    console.log('receiverID >>> ',receiverID);
    console.log('receiverName >>> ',receiverName);
    console.log('receiverImage >>> ',receiverImage);
    // --------------------------------------------------------
    $('#schedBTN').attr('receiverID',receiverID)
    $('#schedBTN').attr('event_Type',eventType)
    
    if(receiverImage == ''){
        var data = '<img src="https://images.vexels.com/media/users/3/129616/isolated/preview/fb517f8913bd99cd48ef00facb4a67c0-businessman-avatar-silhouette-by-vexels.png" class="rounded-circle img-thumbnail avatar-lg" alt="friend"><h3 id="rec_sched_Name">'+receiverName+'</h3>'
    }else{
        var data = '<img src="/media/'+receiverImage+'" class="rounded-circle img-thumbnail avatar-lg" alt="friend"><h3 id="rec_sched_Name">'+receiverName+'</h3>';
    }
    
    $('#rec_sched_Data').html('')
    $('#rec_sched_Data').append(data)
    // --------------------------------------------------------
}
// ##############################################################################################################
// ##############################################################################################################
function get_wishes(thisTxt){
    var wishID = $(thisTxt).attr('wishID');
    console.log('wishID >>> ',wishID);
    // ---------------  AJAX CALL  ----------------------------
    $.ajax({
        type: 'GET',
        url: "/event-management/get_wish_data/"+wishID.toString(),
        success: function (response) {
            console.log(response['response']);
            $('#wist_event').html('');
            $('#wish_to').html('');
            $('#wish_title').html('');
            $('#wish_message').html('');
            $('#wish_date').html('');
            $('#wish_from').html('');

            $('#wist_event').html(response['response']['event']);
            $('#wish_to').html(response['response']['receiver']);
            $('#wish_title').html(response['response']['title']);
            $('#wish_message').html(response['response']['message']);
            $('#wish_date').html(response['response']['date']);
            $('#wish_from').html(response['response']['sender']);
            $('#wish_creative').attr('src',response['response']['creative']);

        }
    });
    // --------------------------------------------------------
}
// ##############################################################################################################
