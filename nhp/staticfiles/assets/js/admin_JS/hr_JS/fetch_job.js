function fetch_job(thisTxt){
    var jobID = $(thisTxt).attr('jobID');
// -------------  AJAX CALL  ----------------------------
    $.ajax({
        type: 'GET',
        url: "/hr-management/fetch-job/"+jobID.toString(),
        success: function (response) {
            console.log(response['response']);

            $('#NewTaskModalLabel').html('');
            $('#NewTaskModalLabel').append(response['response'][0]['position']);
            $('#textData').html('');
            $('#textData').append(response['response'][0]['job_desc']);
        }
    });
    // --------------------------------------------------------
}