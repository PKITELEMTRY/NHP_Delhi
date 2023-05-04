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
function add_cultural_event(){
    var eventID = $('#culturalEventID').val().trim();
    var eventTitle = $('#culturalEventTitle').val().trim();
    var eventDate = $('#culturalEventDate').val();
    var eventManagerID = $('#culturalEventManager').val();
    var eventBudget = $('#culturalEventBudget').val();
    var eventHighlight = $('#culturalEventHighlight').val();
    // var specialPerformance = $('#event_highlights').val();
    // var creative = $('#event_highlights').val();


    console.log('eventID >>> ',eventID);
    console.log('eventTitle >>> ',eventTitle);
    console.log('eventDate >>> ',eventDate);
    console.log('eventManagerID >>> ',eventManagerID);
    console.log('eventBudget >>> ',eventBudget);
    console.log('eventHighlight >>> ',eventHighlight);
    // console.log('specialPerformance >>> ',specialPerformance);
    // console.log('creative >>> ',creative);

    var employee_ID=[];
    var employee_perform=[];

    $('.employeeID').each(function() { employee_ID.push($(this).val()); });
    console.log(employee_ID);
    $('.employee_performance').each(function() { employee_perform.push($(this).val()); });
    console.log(employee_perform);

    
    var performanceDetail = '';
    var lstIndex = employee_ID.length -1;
    for(var i=0;i<employee_ID.length;i++){
        var stringData = employee_ID[i]+'$'+employee_perform[i];
        if(i != lstIndex){
            stringData = stringData + "|";
        }
        performanceDetail = performanceDetail + stringData;
    }
    console.log('performanceDetail >>> ',performanceDetail);



    if(eventID.trim() == ''){
        alert('select a Cultural event!');
        return false;
    }
    if(eventTitle.trim() == ''){
        alert('Enter event title!');
        return false;
    }
    if(eventDate.trim() == ''){
        alert('select a date to create event!');
        return false;
    }
    if(eventManagerID.length == 0){
        alert('select event manager!');
        return false;
    }
    if(eventBudget.trim() == ''){
        alert('select event budget!');
        return false;
    }
    if(eventHighlight.length == 0){
        alert('select atleast 1 highlight!');
        return false;
    }

    var formdata = new FormData();
    formdata.append("eventID", eventID);
    formdata.append("eventTitle", eventTitle);
    formdata.append("eventDate", eventDate);
    formdata.append("eventManagerID", eventManagerID);
    formdata.append("eventBudget", eventBudget);
    formdata.append("eventHighlight[]", eventHighlight);
    formdata.append("performanceDetail", performanceDetail);

    let myFileimg = document.getElementById('emp_photo').files[0];
    if (typeof myFileimg != 'undefined') {
        formdata.append('event_creative', myFileimg, myFileimg['name']);
    }else{
        alert('select event creative!');
        return false;
    }


    // ---------------  AJAX CALL  ----------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/event-management/add-cultural-event/"+eventID.toString(),
        headers: { 'X-CSRFToken': csrftoken },
        data: formdata,
        cache : false,
        processData : false,
        contentType : false,
        encType : 'multipart/form-data',
        success: function (response) {
            console.log(response['response']);
            if(response['response'] == 'created'){
                alert('New Event created Successfully');
                window.location.reload()
            }else if(response['response'] == 'updated'){
                alert('Event updated Successfully');
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
function check_existing_cultural_event(){
    var eventID = $('#culturalEventID').val();
    // ---------------  AJAX CALL  ----------------------------
    $.ajax({
        type: 'GET',
        url: "/event-management/check_existing_cultural_event/"+eventID.toString(),
        success: function (response) {
            console.log(response['response']);
            if(response['response'].length > 0 && response['response'][0]['message'] == 'exist'){
                $('#culturalEventText').css('display','');
                // $('#culturalEventDate').val(response['response'][0]['date']);
                // $('#culturalEventHighlight').val(response['response'][0]['highlight']);

                $('.exist').css('opacity','0.4');
                $('.exist').css('pointer-events','none');
                // $("#culturalEventHighlight").select2({
                // });
                // var new_date = response['response'][0]['date'].replaceAll('/', '-')
                
                // console.log(new_date);
                
                // $('#anniversaryDate').val(new_date);
                $('#culturalEventDate').datepicker({  
                    format: 'dd-mm-yyyy'  
                  }); 

            }else if(response['response'].length > 0 && response['response'][0]['message'] == 'new'){
                $('#culturalEventText').css('display','none');
                // $('#culturalEventDate').val(response['response'][0]['date']);

                $('.exist').css('opacity','1');
                $('.exist').css('pointer-events','');

                $('#culturalEventDate').datepicker({  
                    format: 'dd-mm-yyyy'  
                  });
                // $('#culturalEventHighlight').val(response['response'][0]['highlight']);
                // $("#culturalEventHighlight").select2({
                // });
            }else if(response['response'].length == 0){
                $('#culturalEventText').css('display','none');
                $('#culturalEventDate').val('');

                $('.exist').css('opacity','1');
                $('.exist').css('pointer-events','');
                // $('#culturalEventHighlight').val(response['response'][0]['highlight']);
                // $("#culturalEventHighlight").select2({
                // });
            }else{
                $('#culturalEventText').css('display','none');
                $('#culturalEventDate').val('');

                $('.exist').css('opacity','1');
                $('.exist').css('pointer-events','');
                // $("#culturalEventHighlight").select2({
                // });
                // $('#culturalEventHighlight').val(response['response'][0]['highlight']);
            }
            // $("#culturalEventHighlight").select2({
            // });
        }
    });
    // --------------------------------------------------------
}
// ##############################################################################################################
// ##############################################################################################################
function fetch_edit_cultural_event(thisTxt){
    var eventId = $(thisTxt).attr('eventId');
    console.log('id >>>>>> ',eventId);

    // ---------------  AJAX CALL  ----------------------------
    $.ajax({
        type: 'GET',
        url: "/event-management/fetch_edit_cultural_event/"+eventId.toString(),
        success: function (response) {
            console.log(response['response']);

            $('#event-id').val(response['response']['event']);
            $('#event-title').val(response['response']['event_title']);
            $('#event-date').val(response['response']['event_date']);
            var new_date = response['response']['event_date'].split('/')
            
            console.log(new_date);
            
            $('#event-date').val(new_date[1]+'-'+new_date[0]+'-'+new_date[2]);
            $('#event-date').datepicker({  
                format: 'dd-mm-yyyy'  
                }); 
            // $('#event-manager').val('');
            $('#event-manager').val(response['response']['cultural_event_manager']);
            $("#event-manager").select2({
            });
            $('#event-budget').val(response['response']['event_budget']);
            // $('#event-highlight').val('');
            $('#event-highlight').val(response['response']['event_highlight']);
            $('#edit_imgphoto').attr('src','/media/'+response['response']['cultural_event_creative']+'');
            $('#edit-task-btn').attr('eventId',eventId);
        }
    });
    // --------------------------------------------------------
}
// ##############################################################################################################
function edit_cultural_event(thisTxt){
    var eventId = $(thisTxt).attr('eventId');
    console.log('id >>>>>> ',eventId);

    var eventID = $('#event-id').val();
    var eventTitle = $('#event-title').val();
    var eventDate = $('#event-date').val();
    var eventManagerID = $('#event-manager').val();
    var eventBudget = $('#event-budget').val();
    var eventHighlight = $('#event-highlight').val();


    console.log('eventID >>>> ',eventID);
    console.log('eventTitle >>>> ',eventTitle);
    console.log('eventDate >>>> ',eventDate);
    console.log('eventManagerID >>>> ',eventManagerID);
    console.log('eventBudget >>>> ',eventBudget);
    console.log('eventHighlight >>>> ',eventHighlight);


    if(eventID.trim() == ''){
        alert('select a Cultural event!');
        return false;
    }
    if(eventTitle.trim() == ''){
        alert('Enter event title!');
        return false;
    }
    if(eventDate.trim() == ''){
        alert('select a date to create event!');
        return false;
    }
    if(eventManagerID.length == 0){
        alert('select event manager!');
        return false;
    }
    if(eventBudget.trim() == ''){
        alert('select event date!');
        return false;
    }
    if(eventHighlight.length == 0){
        alert('select atleast 1 highlight!');
        return false;
    }

    var formdata = new FormData();
    formdata.append("eventID", eventID);
    formdata.append("eventTitle", eventTitle);
    formdata.append("eventDate", eventDate);
    formdata.append("eventManagerID", eventManagerID);
    formdata.append("eventBudget", eventBudget);
    formdata.append("eventHighlight[]", eventHighlight);
    // formdata.append("performanceDetail", performanceDetail);

    let myFileimg = document.getElementById('edit_emp_photo').files[0];
    if (typeof myFileimg != 'undefined') {
        formdata.append('event_creative', myFileimg, myFileimg['name']);
    }


    // ---------------  AJAX CALL  ----------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/event-management/edit-cultural-event/"+eventID.toString(),
        headers: { 'X-CSRFToken': csrftoken },
        data: formdata,
        cache : false,
        processData : false,
        contentType : false,
        encType : 'multipart/form-data',
        success: function (response) {
            console.log(response['response']);
            if(response['response'] == 'created'){
                alert('Event Updated Successfully');
                window.location.reload()
            }else if(response['response'] == 'updated'){
                alert('Event updated Successfully');
                window.location.reload()
            }else{
                alert('An error occured!');
                return false;
            }
        }
    });
    // --------------------------------------------------------
}