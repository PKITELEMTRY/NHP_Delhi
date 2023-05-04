// ########################################################################################################################################
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
// ########################################################################################################################################
// ########################################################################################################################################
function move_to_trash(thisTxt){
    var not_id = $(thisTxt).attr('not_id');
    console.log('not_id >>>> ',not_id);
    // --------------------------------------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/notification-management/move-to-trash/"+not_id.toString(),
        headers: { 'X-CSRFToken': csrftoken },
        success: function (response) {
            console.log(response['response']);
            $(thisTxt).parents('li').addClass('removed');
            $(thisTxt).parents('li').remove();
            location.reload();
            
        }
    });
    // --------------------------------------------------------
}

// ########################################################################################################################################
// ########################################################################################################################################
function move_to_starred(thisTxt){
    var not_id = $(thisTxt).attr('not_id');
    console.log('not_id >>>> ',not_id);
    // --------------------------------------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/notification-management/move-to-starred/"+not_id.toString(),
        headers: { 'X-CSRFToken': csrftoken },
        success: function (response) {
            console.log(response['response']);
            $(thisTxt).addClass('text-warning');
            $(thisTxt).attr('onclick','remove_from_starred(this)');
            location.reload();
        }
    });
    // --------------------------------------------------------
}

// ########################################################################################################################################
// ########################################################################################################################################
function remove_from_starred(thisTxt){
    var not_id = $(thisTxt).attr('not_id');
    console.log('not_id >>>> ',not_id);
    // --------------------------------------------------------
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/notification-management/remove-from-starred/"+not_id.toString(),
        headers: { 'X-CSRFToken': csrftoken },
        success: function (response) {
            console.log(response['response']);
            $(thisTxt).removeClass('text-warning');
            $(thisTxt).attr('onclick','move_to_starred(this)');
            location.reload();
        }
    });
    // --------------------------------------------------------
}