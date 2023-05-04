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
function add_employee_anniversary() {

    var employeeID = $('#employee_id').val().trim();
    var annivaersaryDate = $('#anniversaryDate').val().trim();
    var anniversary_highlights = $('#event_highlights').val();

    console.log('employeeID >>> ',employeeID);
    console.log('anniversaryDate >>> ',annivaersaryDate);
    console.log('anniversary_highlights >>> ',anniversary_highlights);

    if(employeeID.trim() == ''){
        alert('select an employee to create Anniversary!');
        return false;
    }
    if(annivaersaryDate.trim() == ''){
        alert('select a date to create Anniversary!');
        return false;
    }
    if(anniversary_highlights.length == 0){
        alert('select atleast 1 highlight to create Anniversary!');
        return false;
    }

    // ---------------  AJAX CALL  ----------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/event-management/add-anniversary/"+employeeID.toString(),
        headers: { 'X-CSRFToken': csrftoken },
        data: {'anniversary_highlights':anniversary_highlights,'annivaersaryDate':annivaersaryDate},
        success: function (response) {
            console.log(response['response']);
            if(response['response'] == 'created'){
                alert('New Anniversary created Successfully');
                window.location.reload()
            }else if(response['response'] == 'updated'){
                alert('Anniversary Highlights updated Successfully');
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

function check_existing_anniversary(){
    var empID = $('#employee_id').val();
    // ---------------  AJAX CALL  ----------------------------
    $.ajax({
        type: 'GET',
        url: "/event-management/check_existing_anniversary/"+empID.toString(),
        success: function (response) {
            console.log(response['response']);
            if(response['response'].length > 0 && response['response'][0]['message'] == 'exist'){
                $('#anniversarywarningText').css('display','');
                // $('#anniversaryDate').val(response['response'][0]['date']);
                var new_date = response['response'][0]['date'].replaceAll('/', '-')
                
                console.log(new_date);
                
                $('#anniversaryDate').val(new_date);
                $('#anniversaryDate').datepicker({  
                    format: 'dd-mm-yyyy'  
                  }); 
                $('#event_highlights').val(response['response'][0]['highlight']);
                $("#event_highlights").select2({
                });

            }else if(response['response'].length > 0 && response['response'][0]['message'] == 'new'){
                $('#anniversarywarningText').css('display','none');
                // $('#anniversaryDate').val(response['response'][0]['date']);
                var new_date = response['response'][0]['date'].replaceAll('/', '-')
                
                console.log(new_date);
                
                $('#anniversaryDate').val(new_date);
                $('#anniversaryDate').datepicker({  
                    format: 'dd-mm-yyyy'  
                  }); 
                // $('#event_highlights').val(response['response'][0]['highlight']);
                $("#event_highlights").select2({
                });
            }else if(response['response'].length == 0){
                $('#anniversarywarningText').css('display','none');
                $('#anniversaryDate').val('');
                // $('#event_highlights').val(response['response'][0]['highlight']);
                // $("#event_highlights").select2({
                // });
            }else{
                $('#anniversarywarningText').css('display','none');
                $('#anniversaryDate').val('');
                // $("#event_highlights").select2({
                // });
                // $('#event_highlights').val(response['response'][0]['highlight']);
            }
        }
    });
    // --------------------------------------------------------
}



