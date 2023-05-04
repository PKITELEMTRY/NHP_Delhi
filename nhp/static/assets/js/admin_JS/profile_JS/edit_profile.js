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
function update_profile(){
    var formdata = new FormData();
    let myFileimg = document.getElementById('emp_photo').files[0];
    if (typeof myFileimg != 'undefined') {
        formdata.append('profile_image', myFileimg, myFileimg['name']);
    }else{
        alert('select an image to update profile image.');
        return false;
    }
    // ===================================================================================
    Swal.fire({
        position: 'center',
        title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'>Updating profile image</b><br><div class='d-flex justify-content-center'>\
        <div class='spinner-border text-primary' role='status'>\
          <span class='sr-only'></span>\
        </div>\
      </div>",
        showConfirmButton: false,
        onOpen: () => {
            Swal.showLoading();
        }
    })
    // ---------------  AJAX CALL  ----------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/employee-management/update-profile",
        headers: { 'X-CSRFToken': csrftoken },
        data: formdata,
        cache : false,
        processData : false,
        contentType : false,
        encType : 'multipart/form-data',
        success: function (response) {
            console.log(response['response']);
            Swal.close();
            if(response['response'] == 'success'){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: '<small>Profile image updated successfully</small>',
                    showConfirmButton: false,
                    timer: 1500
                  }).then(function(){
                      window.location.reload();
                  })

            }else{
                alert('An Error occured while updating profile image. Please try again!');
                return false;
            }
        }
    });
    // --------------------------------------------------------

}
// ##############################################################################################################
// ##############################################################################################################
function request_edit(){
    var formdata = new FormData();
    let requestEdit = $('#exampleFormControlTextarea1').val().trim();
    formdata.append('requestEdit', requestEdit);
    // ===================================================================================
    Swal.fire({
        position: 'center',
        title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'>Sending edit request to Admin</b><br><div class='d-flex justify-content-center'>\
        <div class='spinner-border text-primary' role='status'>\
          <span class='sr-only'></span>\
        </div>\
      </div>",
        showConfirmButton: false,
        onOpen: () => {
            Swal.showLoading();
        }
    })
    // ---------------  AJAX CALL  ----------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/employee-management/request-edit",
        headers: { 'X-CSRFToken': csrftoken },
        data: formdata,
        cache : false,
        processData : false,
        contentType : false,
        encType : 'multipart/form-data',
        success: function (response) {
            console.log(response['response']);
            Swal.close();
            if(response['response'] == 'success'){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: '<small>Edit request send successfully</small>',
                    showConfirmButton: false,
                    timer: 1500
                  }).then(function(){
                      window.location.reload();
                  })

            }else{
                alert('An Error occured while sending edit request. Please try again!');
                return false;
            }
        }
    });
    // --------------------------------------------------------

}
// ##############################################################################################################
// ##############################################################################################################
