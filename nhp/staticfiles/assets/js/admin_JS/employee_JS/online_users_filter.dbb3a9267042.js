function filter_users(){
    var filter = $('#filter-user').val();
    if(filter.trim() == ''){
        alert('select valid filter!');
        return false;
    }else{
        // ---------------  AJAX CALL  ----------------------------
        $.ajax({
            type: 'GET',
            url: "/employee-management/filter-users",
            data: {'searchData' : filter.trim()},
            success: function (response) {
                console.log(response['response']);
                
                var dataString = '';
                var counter = 1;
                for(var i=0;i<response['response'].length;i++){

                    if(filter.trim() == 'Online'){
                        if(response['response'][i]['active_status'] == true){
                            var empData = '';
                            if(response['response'][i]['emp_img'] == 'None'){
                                empData = '<img src="https://images.vexels.com/media/users/3/129616/isolated/preview/fb517f8913bd99cd48ef00facb4a67c0-businessman-avatar-silhouette-by-vexels.png" alt="image" class="avatar-xs rounded-circle me-1">'+response['response'][i]['emp']+'';
                            }else{
                                empData = '<img src="/media/'+response['response'][i]['emp_img']+'" alt="image" class="avatar-xs rounded-circle me-1">'+response['response'][i]['emp']+'';
                            }




                            var data = '<tr>\
                                    <td>'+counter+'</td>\
                                    <td class="e_name">'+empData+'</td>\
                                    <td><span data-bs-toggle="popover" data-bs-trigger="hover" data-bs-content="Online"  data-bs-placement="top" class="online status"></span></td>\
                                    <td class="text-success"><i class="fas fa-sign-in-alt"></i> &nbsp;<small>Logged In at :</small> <strong>'+response['response'][i]['logged_in']+'</strong></td> \
                                </tr>';

                            dataString = dataString + data;
                            counter = counter + 1;

                        }
                    }
                    // else if(filter.trim() == 'Offline'){
                    //     pass
                    // }
                    // else{
                    //     pass
                    // }

                }

                $('#data_append').html('');
                $('#data_append').append(dataString);
            }
        });
        // --------------------------------------------------------
    }
}