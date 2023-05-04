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
function add_file(){

    var file_title = $('#file_title').val();
    var project = $('#project').val();
    var doc_type = $('#doc_type').val();

    if(file_title.trim() == ''){
        alert('Enter File Title');
        return false;
    }
    // if(project.trim() == ''){
    //     alert('Select a valid project');
    //     return false;
    // }
    if(doc_type.trim() == ''){
        alert('Select valid doc type');
        return false;
    }
    
    var formdata = new FormData();
    formdata.append("file_title", file_title);
    formdata.append("project", project);
    formdata.append("doc_type", doc_type);

    let myFileimg = document.getElementById('uploaded-file').files[0];
    if (typeof myFileimg != 'undefined') {
        formdata.append('uploaded_file', myFileimg, myFileimg['name']);
    }else{
        alert('Select a valid file.');
        return false;
    }
    // ---------------  AJAX CALL  ----------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/file-management/add-file",
        headers: { 'X-CSRFToken': csrftoken },
        data: formdata,
        cache : false,
        processData : false,
        contentType : false,
        encType : 'multipart/form-data',
        success: function (response) {
            console.log(response['response']);
            
            if(response['response'] == 'success'){
                alert('New File Uploaded Successfully');
                location.reload();
            }else{
                alert('You are not allowed to upload files!');
                return false;
            }
            }
    });
    // --------------------------------------------------------
}