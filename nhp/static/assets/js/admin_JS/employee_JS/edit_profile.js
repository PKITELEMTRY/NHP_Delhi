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
function getPostalAddress() {
    var pincode = $('#customerNewPincode').val().trim();
    if (pincode.length == 6) {

        $.ajax({
            type: 'GET',
            url: "https://api.postalpincode.in/pincode/"+pincode,
            success: function (response) {
                console.log(response);

                if(response[0]['Status'] == 'Success'){
                    $('#customerNewPincode').css('border','');
                    $('#customerNewPincode').css('color','black');

                    var district = response[0]['PostOffice'][0]['District'];
                    var state = response[0]['PostOffice'][0]['State'];
                    $('#customerCity').val('');
                    $('#customerNewState').val('');
                    
                    $('#customerCity').val(district);
                    $('#customerNewState').val(state);
                }else{
                    $('#customerNewPincode').css('border','2px solid red');
                    $('#customerNewPincode').css('color','red');
                    $('#customerCity').val('');
                    $('#customerNewState').val('');
                }
                
            }
        });
    }else{
        $('#customerCity').val('');
        $('#customerNewState').val('');
    }
}
// ##############################################################################################################
// ##############################################################################################################
// ##############################################################################################################
function submitData(){
    
    var alternateContact = $('#alternateContact').val();
    var fathersName = $('#fathersName').val();
    var address = $('#address').val();
    var pincode = $('#customerNewPincode').val();
    var state = $('#customerNewState').val();
    var city = $('#customerCity').val();


    // if(alternateContact.trim().length > 0 && alternateContact.trim().length < 10){
    //     alert('Enter valid 10 digit alternate contact number');
    //     return false;
    // }
    // if(DOB.trim().length == 0){
    //     alert('Enter valid DOB');
    //     return false;
    // }
    // if(fathersName.trim().length == 0){
    //     alert('Enter valid Fathers Name');
    //     return false;
    // }
    // if(pincode.trim().length < 6){
    //     alert('Enter valid pincode');
    //     return false;
    // }
    // if(city.trim().length == 0){
    //     alert('Enter valid city');
    //     return false;
    // }
    // if(state.trim().length == 0){
    //     alert('Select valid state');
    //     return false;
    // }
    // if(address.trim().length == 0){
    //     alert('Enter valid address');
    //     return false;
    // }
    

    var qualificationType=[];
    var qualificationFrom=[];
    var qualificationYear=[];

    $('.qualification').each(function() { 
        qualificationType.push($(this).val()); 
        // if($(this).val().trim() == 'Select Qualification'){
        //     alert('Select valid qualification!');
        //     $(this).css('border','2px solid red');
        //     return false;
        // }else{
        //     $(this).css('border','');
        // }
    });
    console.log(qualificationType);
    $('.qualificationFrom').each(function() { 
        qualificationFrom.push($(this).val());    
        // if($(this).val().trim().length == 0){
        //     alert('Enter where u qualified from!');
        //     $(this).css('border','2px solid red');
        //     return false;
        // }else{
        //     $(this).css('border','');
        // } 
        });
    console.log(qualificationFrom);
    $('.qualificationYear').each(function() { 
        qualificationYear.push($(this).val());
        // if($(this).val().trim() == 'Select Year'){
        //     alert('Select valid passing year!');
        //     $(this).css('border','2px solid red');
        //     return false;
        // }else{
        //     $(this).css('border','');
        // } 
        });
    console.log(qualificationYear);

    
    var QualificationDetails = '';
    var lstIndex = qualificationType.length -1;
    for(var i=0;i<qualificationType.length;i++){
        // if(qualificationType[i] == '' && qualificationFrom[i] == '' && qualificationYear[i] == ''){
        //     var stringData = qualificationType[i]+'$'+qualificationFrom[i]+"$"+qualificationYear[i];
        // }
        var stringData = qualificationType[i]+'$'+qualificationFrom[i]+"$"+qualificationYear[i];
        if(i != lstIndex){
            stringData = stringData + "|";
        }
        QualificationDetails = QualificationDetails + stringData;
    }
    console.log('QualificationDetails >>> ',QualificationDetails);

    var last_experience = $('#editOldDesignation').val();
    var Company = $('#editOldCompany').val();
    var Duration = $('#editOldExperienceYear').val();
    

    console.log('alternateContact >>> ',alternateContact);
    console.log('fathersName >>> ',fathersName);
    console.log('address >>> ',address);
    console.log('pincode >>> ',pincode);
    console.log('state >>> ',state);
    console.log('city >>> ',city);
    
    console.log('last_experience >>> ',last_experience);
    console.log('Company >>> ',Company);
    console.log('Duration >>> ',Duration);
    console.log('QualificationDetails >>> ',QualificationDetails);

    // ev.preventDefault();   
    //bundle the files and data we want to send to the server
    var formdata = new FormData();

    formdata.append("alternateContact", alternateContact);
    formdata.append("fathersName", fathersName);
    formdata.append("address", address);
    formdata.append("pincode", pincode);
    formdata.append("state", state);
    formdata.append("city", city);
    
    formdata.append("last_experience", last_experience);
    formdata.append("Company", Company);
    formdata.append("Duration", Duration);
    formdata.append("QualificationDetails",QualificationDetails);
    

    // ===================================================================================
    //                                EMPLOYEE DOCS
    // ===================================================================================
    var empDocTypeName = [];
    var empDocName= [];
    
        $('.emp_docs_type').each(function() { empDocTypeName.push($(this).attr('id')); });
        console.log(empDocTypeName);
        $('.empDocs').each(function() { empDocName.push($(this).attr('id')); });
        console.log(empDocName);

        for(var j=0;j<empDocTypeName.length;j++){
            let upload_docs_type = document.getElementById(empDocTypeName[j]).value;
            if (typeof upload_docs_type != 'undefined') {
                console.log(upload_docs_type);
                formdata.append('upload_docs_type_'+j+'', upload_docs_type);
            }
            let upload_docs = document.getElementById(empDocName[j]).files[0];
            if (typeof upload_docs != 'undefined') {
                console.log(upload_docs);
                formdata.append('upload_docs_'+j+'', upload_docs, upload_docs['name']);
            }
        }
    // ===================================================================================
    // ===================================================================================
    Swal.fire({
        position: 'center',
        title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'>Updating Profile Details</b><br><div class='d-flex justify-content-center'>\
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
    var urlData = window.location.href;
    var URLArray = urlData.split('/');
    var empID = URLArray[URLArray.length -1];
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/edit-profile",
        headers: { 'X-CSRFToken': csrftoken },
        data: formdata,
        cache : false,
        processData : false,
        contentType : false,
        encType : 'multipart/form-data',
        success: function (response) {
            console.log(response['response']);
            Swal.close();
            // $('#enquiryButton').css('display','');
            // $('#spinnerbtn').css('display','none');
            if(response['response'] == 'success'){

                // alert('New Employee Added successfully');
                // location.reload();
                // $('#exampleModalCenter').modal('hide');
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: '<small>Profile updated successfully</small>',
                    showConfirmButton: false,
                    timer: 1500
                  }).then(function(){
                    //   window.location.reload();
                    window.location.href = "/user-profile";
                  })

            }else{
                alert('An Error occured while updating Profile Info. Please try again!');
                return false;
            }
        }
    });
    // --------------------------------------------------------
}
// ##############################################################################################################