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
        url: "get-specific-project-sector-master/" + $(thisTxt).attr('designationID'),
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
        url: "project-sector-master-check",
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
        alert('Enter project sector name');
        return false;
    }

    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "project-sector-master",
        headers: { 'X-CSRFToken': csrftoken },
        data: {'designationText':designation_name},
        success: function (response) {
            console.log(response['response']);
            if(response['response'] == 'success'){
                alert('New project sector created successfully');
                window.location.reload()
            }else{
                alert('An Error occured while storing project sector Info. Please try again!');
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
        alert('Enter valid project sector name');
        return false;
    }

    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "project-sector-master-edit/" + $(thisTxt).attr('designation_masterID'),
        headers: { 'X-CSRFToken': csrftoken },
        data: {'sectorText':sector_name},
        success: function (response) {
            console.log(response['response']);
            if(response['response'] == 'success'){
                alert('Project sector updated successfully');
                window.location.reload()
            }else{
                alert('An Error occured while updating project sector Info. Please try again!');
                return false;
            }
        }
    });
    // --------------------------------------------------------
}
// ########################################################################################################################################
// ########################################################################################################################################
function delete_designation(thisTxt){
    if (confirm('Are you sure you want to delete this project sector?')) {
        // Save it!
        // --------------------------------------------------------
        $.ajax({
            type: 'GET',
            url: "project-sector-master-delete/"+$(thisTxt).attr('designationID'),
            success: function (response) {
                console.log(response['response']);
                
                if(response['response'] == 'success'){
                    alert('Project sector deleted successfully');
                    window.location.reload()
                }else if(response['response'] == 'Exist'){
                    alert('Project with this sector exist. Cannot delete this sector!');
                    // window.location.reload()
                }else{
                    alert('You are not authorized to delete this project sector!');
                    return false;
                }
            }
        });
        // --------------------------------------------------------
      } else {
        return false;
      }
}