// ##############################################################################################################
// ##############################################################################################################
function leave_history(thisTxt){
    var empID = $(thisTxt).attr('empID').trim();

    if(empID.trim() == ''){
        alert('Invalid employee!');
        return false;
    }
    // ---------------  AJAX CALL  ----------------------------
    $.ajax({
        type: 'GET',
        url: "/leave-management/get_leave_record_history/"+empID.toString(),
        success: function (response) {
            console.log(response['response']);
            console.log(response['employeeData']);
            
            if(response['employeeData'][0]['employee_image'] == ''){
                var empData = '<h4> <img src="https://images.vexels.com/media/users/3/129616/isolated/preview/fb517f8913bd99cd48ef00facb4a67c0-businessman-avatar-silhouette-by-vexels.png" class="avatar-md rounded-circle me-1">'+response['employeeData'][0]['employee_name']+'</h4>';
            }else{
                var empData = '<h4> <img src="/media/'+response['employeeData'][0]['employee_image']+'" alt="image" class="avatar-md rounded-circle me-1">'+response['employeeData'][0]['employee_name']+'</h4>';
            }
            $('#employeeDetails').html('');
            $('#employeeDetails').append(empData);

            if(response['response'].length == 0){
                $('#leaveRecordTable').css('display','none');
                $('#noRecordDiv').css('display','');
            }else{
                var dataStr = '';
                for(var i=0;i<response['response'].length;i++){
                    if(response['response'][i]['status'] == 'pending'){
                        var approval = '<span class="text-warning">Pending</span>';
                    }else if(response['response'][i]['status'] == 'approved'){
                        var approval = '<span class="text-success">Approved</span>';
                    }else if(response['response'][i]['status'] == 'rejected'){
                        var approval = '<span class="text-danger">Rejected</span>';
                    }
                    var data = '<tr>\
                                    <td>'+(i+1)+'</td>\
                                    <td>'+response['response'][i]['leave_date']+'</td>\
                                    <td>'+response['response'][i]['leaveCount']+'</td>\
                                    <td>'+response['response'][i]['leaveReason']+' | '+approval+'</td>\
                                </tr>';
                    dataStr = dataStr + data;
                }
                $('#leaveRecordTable').css('display','');
                $('#noRecordDiv').css('display','none');
                $('#leavehistory').html('');
                $('#leavehistory').append(dataStr);
            }
        }
    });
    // --------------------------------------------------------

}
// ##############################################################################################################
// ##############################################################################################################