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
function add_job(){
    var profileID = $('#designation').val();
    var text = $('.Editor-editor').html();
    var jobLoc = $('#selectedJobLoc').val();


    console.log('profileID >>> ',profileID);
    console.log('text >>> ',text);
    console.log('jobLoc >>> ',jobLoc);

    if(profileID.trim() == ''){
        alert('Select Job Title.');
        return false;
    }if(jobLoc.length == 0){
        alert('Select atleast 1 Job Location.');
        return false;
    }if(text.trim() == ''){
        alert('Enter Job Description.');
        return false;
    }
    
    var formdata = new FormData();
    formdata.append("profileID", profileID);
    formdata.append("location", jobLoc);
    formdata.append("text", text);

    // ---------------  AJAX CALL  ----------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/hr-management/add-new-job",
        headers: { 'X-CSRFToken': csrftoken },
        data: formdata,
        cache : false,
        processData : false,
        contentType : false,
        encType : 'multipart/form-data',
        success: function (response) {
            console.log(response['response']);
            
            if(response['response'] == 'success'){
                alert('New Job Added successfully');
                location.reload();
            }else if(response['response'] == 'Unauthorized Personal'){
                alert('You are not allowed to add new Job!');
                return false;
            }else{
                alert('An Error occured while storing new Job info. Please try again!');
                return false;
            }
        }
    });
    // --------------------------------------------------------
}