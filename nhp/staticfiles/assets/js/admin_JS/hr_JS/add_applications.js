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
// ##############################################################################################################
function add_application(){

    var job_role = $('#roleID').val();
    var candidate_name = $('#candidateName').val();
    var candidate_email = $('#candidateEmail').val();
    var candidate_contact = $('#candidateMobile').val();
    var candidate_experience = $('#candidate_Exp').val();
    var hiring_status = $('#candidateStat').val();
    var application_date = $('#candidateApplicationDate').val();

    if(job_role.trim() == ''){
        alert('Select Job Title.');
        return false;
    }if(candidate_name.trim() == ''){
        alert('Enter Candidate Name');
        return false;
    }if(candidate_email.trim() == ''){
        alert('Enter Candidate Email');
        return false;
    }if(candidate_contact.trim() < 10){
        alert('Enter Candidate Email');
        return false;
    }if(candidate_experience.trim() == ''){
        alert('Select Candidate Experience.');
        return false;
    }if(hiring_status.trim() == ''){
        alert('Select Hiring Status.');
        return false;
    }if(application_date.trim() == ''){
        alert('Select Application Date.');
        return false;
    }
    
    var formdata = new FormData();
    formdata.append("job_role", job_role);
    formdata.append("candidate_name", candidate_name);
    formdata.append("candidate_email", candidate_email);
    formdata.append("candidate_contact", candidate_contact);
    formdata.append("candidate_experience", candidate_experience);
    formdata.append("hiring_status", hiring_status);
    formdata.append("application_date", application_date);

    let myFileimg = document.getElementById('candidateResume').files[0];
    if (typeof myFileimg != 'undefined') {
        formdata.append('candidate_resume', myFileimg, myFileimg['name']);
    }else{
        alert('Upload candidate resume.');
        return false;
    }
    // ---------------  AJAX CALL  ----------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/hr-management/add-applications",
        headers: { 'X-CSRFToken': csrftoken },
        data: formdata,
        cache : false,
        processData : false,
        contentType : false,
        encType : 'multipart/form-data',
        success: function (response) {
            console.log(response['response']);
            
            if(response['response'] == 'success'){
                alert('New Job Application Added Successfully');
                location.reload();
            }else if(response['response'] == 'Unauthorized Personal'){
                alert('You are not allowed to add Job applications!');
                return false;
            }else{
                alert('An Error occured while storing New job application info. Please try again!');
                return false;
            }
        }
    });
    // --------------------------------------------------------
}