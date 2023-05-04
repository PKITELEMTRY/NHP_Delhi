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
function add_employee_birthday(){
    var employeeID = $('#employee_id').val().trim();
    var bdayDate = $('#birthdayDate').val().trim();
    var bday_highlights = $('#event_highlights').val();

    console.log('employeeID >>> ',employeeID);
    console.log('bdayDate >>> ',bdayDate);
    console.log('bday_highlights >>> ',bday_highlights);

    if(employeeID.trim() == ''){
        alert('select an employee to create Birthday!');
        return false;
    }
    if(bdayDate.trim() == ''){
        alert('select a date to create Birthday!');
        return false;
    }
    if(bday_highlights.length == 0){
        alert('select atleast 1 highlight to create Birthday!');
        return false;
    }

    // ---------------  AJAX CALL  ----------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/event-management/add-birthday/"+employeeID.toString(),
        headers: { 'X-CSRFToken': csrftoken },
        data: {'bday_highlights':bday_highlights,'bday_date':bdayDate},
        success: function (response) {
            console.log(response['response']);
            if(response['response'] == 'created'){
                alert('New Birthday created Successfully');
                window.location.reload()
            }else if(response['response'] == 'updated'){
                alert('Birthday Highlights updated Successfully');
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
function check_existing_birthday(){
    var empID = $('#employee_id').val();
    // ---------------  AJAX CALL  ----------------------------
    $.ajax({
        type: 'GET',
        url: "/event-management/check_existing_birthday/"+empID.toString(),
        success: function (response) {
            console.log(response['response']);
            if(response['response'].length > 0 && response['response'][0]['message'] == 'exist'){
                $('#bdaywarningText').css('display','');
                // $('#birthdayDate').val(response['response'][0]['date']);
                var new_date = response['response'][0]['date'].replaceAll('/', '-')
                
                console.log(new_date);
                
                $('#birthdayDate').val(new_date);
                $('#birthdayDate').datepicker({  
                    format: 'dd-mm-yyyy'  
                  }); 
                $('#event_highlights').val(response['response'][0]['highlight']);
                $("#event_highlights").select2({
                });

            }else if(response['response'].length > 0 && response['response'][0]['message'] == 'new'){
                $('#bdaywarningText').css('display','none');
                // $('#birthdayDate').val(response['response'][0]['date']);
                var new_date = response['response'][0]['date'].replaceAll('/', '-')
                
                console.log(new_date);
                
                $('#birthdayDate').val(new_date);
                $('#birthdayDate').datepicker({  
                    format: 'dd-mm-yyyy'  
                  }); 
                // $('#event_highlights').val(response['response'][0]['highlight']);
                $("#event_highlights").select2({
                });
            }else if(response['response'].length == 0){
                $('#bdaywarningText').css('display','none');
                $('#birthdayDate').val('');
                // $('#event_highlights').val(response['response'][0]['highlight']);
                // $("#event_highlights").select2({
                // });
            }else{
                $('#bdaywarningText').css('display','none');
                $('#birthdayDate').val('');
                // $("#event_highlights").select2({
                // });
                // $('#event_highlights').val(response['response'][0]['highlight']);
            }
        }
    });
    // --------------------------------------------------------
}