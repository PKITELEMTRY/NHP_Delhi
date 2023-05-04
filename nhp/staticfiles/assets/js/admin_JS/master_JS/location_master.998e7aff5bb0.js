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
        url: "get-specific-location-master/" + $(thisTxt).attr('designationID'),
        success: function (response) {
            console.log(response['response']);

            $('#edit_designation_val').val(response['response']['designation_name']);
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
        url: "location-master-check",
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

    var designation_name = $('#designationName').val().trim();
    if(designation_name == ''){
        alert('Enter location name');
        return false;
    }

    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "location-master",
        headers: { 'X-CSRFToken': csrftoken },
        data: {'designationText':designation_name},
        success: function (response) {
            console.log(response['response']);
            if(response['response'] == 'success'){
                alert('New location created successfully');
                window.location.reload()
            }else{
                alert('An Error occured while storing location Info. Please try again!');
                return false;
            }
        }
    });
    // --------------------------------------------------------
}
// ########################################################################################################################################
// ########################################################################################################################################
function edit_designation(thisTxt){

    var designation_name = $('#edit_designation_val').val().trim();
    if(designation_name == ''){
        alert('Enter valid location name');
        return false;
    }

    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "location-master-edit/" + $(thisTxt).attr('designation_masterID'),
        headers: { 'X-CSRFToken': csrftoken },
        data: {'designationText':designation_name},
        success: function (response) {
            console.log(response['response']);
            if(response['response'] == 'success'){
                alert('Location updated successfully');
                window.location.reload()
            }else{
                alert('An Error occured while updating location Info. Please try again!');
                return false;
            }
        }
    });
    // --------------------------------------------------------
}
// ########################################################################################################################################
// ########################################################################################################################################
function delete_designation(thisTxt){
    if (confirm('Are you sure you want to delete this location?')) {
        // Save it!
        // --------------------------------------------------------
        $.ajax({
            type: 'GET',
            url: "location-master-delete/"+$(thisTxt).attr('designationID'),
            success: function (response) {
                console.log(response['response']);
                
                if(response['response'] == 'success'){
                    alert('Location deleted successfully');
                    window.location.reload()
                }else if(response['response'] == 'Exist'){
                    alert('Job with this designation exist. Cannot delete this location!');
                    // window.location.reload()
                }else{
                    alert('You are not authorized to delete this location!');
                    return false;
                }
            }
        });
        // --------------------------------------------------------
      } else {
        return false;
      }
}