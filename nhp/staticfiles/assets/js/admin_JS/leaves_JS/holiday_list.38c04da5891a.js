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
//                                       CREATE HOLIDAY
// ##############################################################################################################
function add_holiday(){
    var holidayYear = $('#selectCurrentYear').val().trim();
    var holiday_fromDate = $('#from_Date').val().trim();
    var holiday_toDate = $('#to_Date').val().trim();
    var holidayName = $('#holidayName').val().trim();

    if(holidayYear.trim() == ''){
        alert('select valid holiday year!');
        return false;
    }
    if(holiday_fromDate.trim() == ''){
        alert('select valid holiday date!');
        return false;
    }
    if(holidayName.trim() == ''){
        alert('Enter holiday name!');
        return false;
    }

    var year = holiday_fromDate.split('-')[2];
    if(holidayYear.trim() != year.toString().trim()){
        alert('Selected from date is not from seleted year!');
        return false;
    }
    
    if(holiday_toDate.trim() != ''){   
        var year1 = holiday_toDate.split('-')[2];
        if(holidayYear.trim() != year1.toString().trim()){
            alert('Selected to date is not from seleted year!');
            return false;
        }
    }

    // ---------------  AJAX CALL  ----------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/leave-management/holiday-list",
        headers: { 'X-CSRFToken': csrftoken },
        data: {'holidayYear':holidayYear,'holiday_fromDate':holiday_fromDate,'holiday_toDate':holiday_toDate,'holidayName':holidayName},
        success: function (response) {
            console.log(response['response']);
            if(response['response'] == 'success'){
                alert('New holiday created successfully');
                window.location.reload()
            }else if(response['response'] == 'Pair already exist'){
                alert('Holiday with selected dates already exist!');
                return false;
            }else if(response['response'] == 'Pair1 already exist'){
                alert('Holiday already exist in selected year!');
                return false;
            }else{
                alert('An error occured!');
                return false;
            }
        }
    });
    // --------------------------------------------------------

}
// ##############################################################################################################
//                                        Fetch HOLIDAY
// ##############################################################################################################
function fetch_holiday(thisTxt){
    var hoidayID = $(thisTxt).attr('hoidayID').trim();
    // ---------------  AJAX CALL  ----------------------------
    $.ajax({
        type: 'GET',
        url: "/leave-management/fetchHoliday/"+hoidayID.toString(),
        success: function (response) {
            console.log(response['response']);
            $('#edit_holiday_name').val(response['response'][0]['holiday_name']);
            $('#edit_from_date').val(response['response'][0]['from_date']);
            $('#edit_to_date').val(response['response'][0]['to_date']);
            $('#edit_holiday_year').val(response['response'][0]['holiday_year']);

            $('#edit_btn').attr('holidayId',response['response'][0]['holiday_ID']);

        }
    });
    // --------------------------------------------------------

}
// ##############################################################################################################
//                                        EDIT HOLIDAY
// ##############################################################################################################
function edit_holiday(thisTxt){
    var holidayID = $(thisTxt).attr('holidayId').trim()
    var holidayYear = $('#edit_holiday_year').val().trim();
    var holiday_fromDate = $('#edit_from_date').val().trim();
    var holiday_toDate = $('#edit_to_date').val().trim();
    var holidayName = $('#edit_holiday_name').val().trim();

    if(holidayYear.trim() == ''){
        alert('select valid holiday year!');
        return false;
    }
    if(holiday_fromDate.trim() == ''){
        alert('select valid holiday date!');
        return false;
    }
    if(holidayName.trim() == ''){
        alert('Enter holiday name!');
        return false;
    }

    var year = holiday_fromDate.split('-')[2];
    if(holidayYear.trim() != year.toString().trim()){
        alert('Selected from date is not from seleted year!');
        return false;
    }
    
    if(holiday_toDate.trim() != ''){   
        var year1 = holiday_toDate.split('-')[2];
        if(holidayYear.trim() != year1.toString().trim()){
            alert('Selected to date is not from seleted year!');
            return false;
        }
    }

    // ---------------  AJAX CALL  ----------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/leave-management/edit-holiday/"+holidayID.toString(),
        headers: { 'X-CSRFToken': csrftoken },
        data: {'holidayYear':holidayYear,'holiday_fromDate':holiday_fromDate,'holiday_toDate':holiday_toDate,'holidayName':holidayName},
        success: function (response) {
            console.log(response['response']);
            if(response['response'] == 'success'){
                alert('Holiday updated successfully');
                window.location.reload()
            }else if(response['response'] == 'Pair already exist'){
                alert('Holiday with selected dates already exist!');
                return false;
            }else if(response['response'] == 'Pair1 already exist'){
                alert('Holiday already exist in selected year!');
                return false;
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
