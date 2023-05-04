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
        url: "get-specific-passingYear-master/" + $(thisTxt).attr('designationID'),
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
        url: "passingYear-master-check",
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
        alert('Enter passing Year');
        return false;
    }

    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "passingYear-master",
        headers: { 'X-CSRFToken': csrftoken },
        data: {'designationText':designation_name},
        success: function (response) {
            console.log(response['response']);
            if(response['response'] == 'success'){
                alert('New passing year created successfully');
                window.location.reload()
            }else{
                alert('An Error occured while storing passing year Info. Please try again!');
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
        alert('Enter valid passing year name');
        return false;
    }

    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "passingYear-master-edit/" + $(thisTxt).attr('designation_masterID'),
        headers: { 'X-CSRFToken': csrftoken },
        data: {'designationText':designation_name},
        success: function (response) {
            console.log(response['response']);
            if(response['response'] == 'success'){
                alert('Passing year updated successfully');
                window.location.reload()
            }else{
                alert('An Error occured while updating passing year Info. Please try again!');
                return false;
            }
        }
    });
    // --------------------------------------------------------
}
// ########################################################################################################################################
// ########################################################################################################################################
function delete_designation(thisTxt){
    if (confirm('Are you sure you want to delete this passing year?')) {
        // Save it!
        // --------------------------------------------------------
        $.ajax({
            type: 'GET',
            url: "passingYear-master-delete/"+$(thisTxt).attr('designationID'),
            success: function (response) {
                console.log(response['response']);
                
                if(response['response'] == 'success'){
                    alert('Passing year deleted successfully');
                    window.location.reload()
                }else if(response['response'] == 'Exist'){
                    alert('Employee with this passing year exist. Cannot delete this passing year!');
                    // window.location.reload()
                }else{
                    alert('You are not authorized to delete this passing year!');
                    return false;
                }
            }
        });
        // --------------------------------------------------------
      } else {
        return false;
      }
}