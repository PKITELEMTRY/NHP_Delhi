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
function get_designation(thisTxt) {
    // --------------------------------------------------------
    $.ajax({
        type: 'GET',
        url: "get-specific-event-highlight-master/" + $(thisTxt).attr('designationID'),
        success: function (response) {
            console.log(response['response']);

            $('#edit_designation_val').val(response['response']['sector_name']);
            $('#edit_btn').attr('designation_masterID', response['response']['id']);
        }
    });
    // --------------------------------------------------------

}
// ########################################################################################################################################
// ########################################################################################################################################
function checkDesignationName(thisTxt) {
    // --------------------------------------------------------
    $.ajax({
        type: 'GET',
        url: "event-highlight-master-check",
        data : {'search_string':$(thisTxt).val().trim()},
        success: function (response) {
            console.log(response['response']);

            if(response['response'] == 'not-exist'){
                $('#designationCheckText').css('display','none');
            }else{
                $('#designationCheckText').css('display','');
            }
        }
    });
    // --------------------------------------------------------
}
// ########################################################################################################################################
// ########################################################################################################################################
function create_designation(){

    var projectType_name = $('#designationName').val().trim();
    if(projectType_name == ''){
        alert('Enter highlight name');
        return false;
    }

    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "event-highlight-master",
        headers: { 'X-CSRFToken': csrftoken },
        data: {'highlightText':projectType_name},
        success: function (response) {
            console.log(response['response']);
            if(response['response'] == 'success'){
                alert('New highlight created successfully');
                window.location.reload()
            }else{
                alert('An Error occured while storing highlight Info. Please try again!');
                return false;
            }
        }
    });
    // --------------------------------------------------------
}
// ########################################################################################################################################
// ########################################################################################################################################
function edit_designation(thisTxt){

    var sector_name = $('#edit_designation_val').val().trim();
    if(sector_name == ''){
        alert('Enter valid highlight name');
        return false;
    }

    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "event-highlight-master-edit/" + $(thisTxt).attr('designation_masterID'),
        headers: { 'X-CSRFToken': csrftoken },
        data: {'highlightText':sector_name},
        success: function (response) {
            console.log(response['response']);
            if(response['response'] == 'success'){
                alert('Highlight updated successfully');
                window.location.reload()
            }else{
                alert('An Error occured while updating highlight Info. Please try again!');
                return false;
            }
        }
    });
    // --------------------------------------------------------
}
// ########################################################################################################################################
// ########################################################################################################################################
function delete_designation(thisTxt){
    if (confirm('Are you sure you want to delete this event highlight?')) {
        // Save it!
        // --------------------------------------------------------
        $.ajax({
            type: 'GET',
            url: "event-highlight-master-delete/"+$(thisTxt).attr('designationID'),
            success: function (response) {
                console.log(response['response']);
                
                if(response['response'] == 'success'){
                    alert('Highlight deleted successfully');
                    window.location.reload()
                }else if(response['response'] == 'Exist'){
                    alert('Event with this highlight exist. Cannot delete this highlight!');
                    // window.location.reload()
                }else{
                    alert('You are not authorized to delete this highlight!');
                    return false;
                }
            }
        });
        // --------------------------------------------------------
      } else {
        return false;
      }
}