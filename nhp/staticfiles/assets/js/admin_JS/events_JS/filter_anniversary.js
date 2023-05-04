function filter_anniversarymonth() {
    var anniversarymonth = $("#anniversarymonth").val();
    console.log('anniversarymonth >>>>>>>>', anniversarymonth)

    $.ajax({
        type: 'GET',
        url: "/event-management/filter-eventlist",
        data: { 'anniversarymonth': anniversarymonth },
        success: function (response) {
            console.log(response['response']);

            var dataString = '';
            if(response['response'].length) {
                for (var i = 0; i < response['response'].length; i++){
                    var data = '<tr>\
                        <td>'+ response['response'][i]['emp'] +'</td>\
                        <td>'+ response['response'][i]['designation'] +'</td>\
                        <td><span class="badge bg">'+response['response'][i]['event_date']+'</span></td>\
                    </tr>';
                    dataString = dataString + data;

                }

            }
            else {
                var dataString = '<tr><td>-</td><td>-</td><td>-</td></tr>';
            }
                $('#anniversary_data').html('');
                $('#anniversary_data').append(dataString);
        }

    });
        
}