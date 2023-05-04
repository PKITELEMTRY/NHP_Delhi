// ########################################################################################################################################
// ########################################################################################################################################
function getModuleList() {
    var projectFk = $('#projects').val();

    // ---------------  AJAX CALL  ----------------------------
    $.ajax({
        type: 'GET',
        url: "/project-management/get_selected_project_module_list/" + projectFk,
        success: function (response) {
            console.log(response['response']);
            if (response['response'].length > 0) {
                var dataStr = '';
                var rowSpanData = '<tr class="view"><td rowspan=' + response['response'].length + 1 + '><a href="/project-management/project-detail/' + projectFk + '">' + response['response'][0]['projectName'] + '</a></td></tr>'
                dataStr = dataStr + rowSpanData;
                for (var i = 0; i < response['response'].length; i++) {
                    var data = '<tr class="view">\
                                    <td class="mod_list">\
                                        <div class="position-relative"> <input  class="form-control mb-1 bold" type="text" value="'+ response['response'][i]['moduleName'] + '" name="mod_' + response['response'][i]['id'] + '"><a href="javascript:void(0);" class="action-icon text-danger  "> <i class="mdi mdi-delete-outline"></i></a>\
                                            <small>Description:</small>\
                                        <textarea  class="form-control fs-13" rows="3" id="modText_'+ response['response'][i]['id'] + '"> ' + response['response'][i]['moduleDescription'] + '</textarea>\
                                        </div>\
                                    </td>\
                                    <td> <a href="javascript:void(0);" class="action-icon text-warning edit_btn"> <i class="mdi mdi-square-edit-outline"></i></a>\
                                        <a href="javascript:void(0);" class="  btn btn-sm btn-success   update_btn" id="'+ response['response'][i]['id'] + '"> Update</a>\
                                        <a href="javascript:void(0);" class="  btn btn-sm btn-danger   del_btn" id="'+ response['response'][i]['id'] + '"> Done</a>\
                                        <a href="javascript:void(0);" class="action-icon text-danger delete_btn"> <i class="mdi mdi-delete-outline"></i></a>\
                                    </td>\
                                </tr>';
                    dataStr = dataStr + data;
                }
                $('#no-record-deiv-mod').css('display','none');
            } else {
                var dataStr = '';
                $('#no-record-deiv-mod').css('display','');
            }
            $('#moduleTbodyData').html('');
            $('#moduleTbodyData').append(dataStr);
        }
    });
    // --------------------------------------------------------
}
// ########################################################################################################################################
// ########################################################################################################################################
function get_module_list() {
    var projectFk = $('#projectId').val();
    if(projectFk.trim() == ''){
        $('#module_data').html('');
        $('#module_data').append('<option></option>');
    }
    // ---------------  AJAX CALL  ----------------------------
    $.ajax({
        type: 'GET',
        url: "/project-management/get_selected_project_module_list/" + projectFk,
        success: function (response) {
            console.log(response['response']);
            if (response['response'].length > 0) {
                var dataStr = '';
                for (var i = 0; i < response['response'].length; i++) {
                    var data = '<option value="' + response['response'][i]['id'] + '">' + response['response'][i]['moduleName'] + '</option>';
                    dataStr = dataStr + data;
                }
                $('#add_sub_module_div').css('opacity', 1);
                $('#add_sub_module_btn_div').css('opacity', 1);

                $('#add_sub_module_div').css('pointer-events', '');
                $('#add_sub_module_btn_div').css('pointer-events', '');

            } else {
                var dataStr = '';
            }
            $('#module_data').html('');
            $('#module_data').append('<option></option>' + dataStr);
        }
    });
    // --------------------------------------------------------
}
// ########################################################################################################################################
// ########################################################################################################################################
function get_submodule_data_list() {
    var moduleFk = $('#module_data').val();
    console.log(moduleFk);
    // ---------------  AJAX CALL  ----------------------------
    $.ajax({
        type: 'GET',
        url: "/project-management/get_selected_project_subModule_list/" + moduleFk,
        success: function (response) {
            console.log(response['response']);
            if (response['response'].length > 0) {
                var dataStr = '';
                var rowSpanData = '<tr class="view">\
                <td rowspan="5"><a href="/project-management/project-detail/'+ response['response'][0]['projectid'] + '">' + response['response'][0]['projectName'] + '</a></td>\
                <td>'+ response['response'][0]['mod_name'] + ' <br>\
                    <small>Description:</small>\
                    <p class="fs-13">'+ response['response'][0]['mod_desc'] + '</p>\
                </td>\
                <td class="mod_list" style="width: 50%">\
                   <div class="position-relative"> <input class="form-control mb-1 bold" type="text" value="'+ response['response'][0]['subModuleName'] + '" name="submod_' + response['response'][0]['subMod_id'] + '"><a href="javascript:void(0);" class="action-icon text-danger  "> <i class="mdi mdi-delete-outline"></i></a>\
                    <small>Description:</small>\
                    <textarea  class="form-control fs-13" rows="3" id="submodText_'+ response['response'][0]['subMod_id'] + '">'+ response['response'][0]['subModuleDescription'] + '</textarea>\
                   </div>\
                </td>\
                <td> <a href="javascript:void(0);" class="action-icon text-warning edit_btn1"> <i class="mdi mdi-square-edit-outline"></i></a>\
                 <a href="javascript:void(0);" class="  btn btn-sm btn-success   update_btn1"  style="display:none;"  id="'+ response['response'][0]['subMod_id'] + '"> Update</a>\
                 <a href="javascript:void(0);" class="  btn btn-sm btn-danger   del_btn1" style="display:none;"  id="'+ response['response'][0]['subMod_id'] + '"> Done</a>\
                 <a href="javascript:void(0);" class="action-icon text-danger delete_btn1"> <i class="mdi mdi-delete-outline"></i></a></td>\
            </tr>';
                dataStr = dataStr + rowSpanData;
                for (var i = 1; i < response['response'].length; i++) {
                    //     var data = '<tr class="view">\
                    //     <td class="mod_list" style="width: 50%">\
                    //     <div class="position-relative"> <input class="form-control mb-1 bold" type="text" value="'+response['response'][i]['subModuleName']+'" name=""><a href="javascript:void(0);" class="action-icon text-danger  "> <i class="mdi mdi-delete-outline"></i></a>\
                    //      <small>Description:</small>\
                    //      <textarea  class="form-control fs-13" rows="3">'+response['response'][i]['subModuleDescription']+'</textarea>\
                    //     </div>\
                    //  </td>\
                    //  <td> <a href="javascript:void(0);" class="action-icon text-warning edit_btn"> <i class="mdi mdi-square-edit-outline"></i></a>\
                    //   <a href="javascript:void(0);" class="  btn btn-sm btn-success   update_btn"> Update</a>\
                    //   <a href="javascript:void(0);" class="  btn btn-sm btn-danger   del_btn"> Done</a>\
                    //   <a href="javascript:void(0);" class="action-icon text-danger delete_btn"> <i class="mdi mdi-delete-outline"></i></a></td>\
                    //                 </tr>';
                    var data = '<tr class="view"><td></td>\
                <td class="mod_list">\
                   <div class="position-relative"> <input class="form-control mb-1 bold" type="text" value="'+ response['response'][i]['subModuleName'] + '" name="submod_' + response['response'][i]['subMod_id'] + '"><a href="javascript:void(0);" class="action-icon text-danger  "> <i class="mdi mdi-delete-outline"></i></a>\
                    <small>Description:</small>\
                    <textarea  class="form-control fs-13" rows="3" id="submodText_'+ response['response'][i]['subMod_id'] + '">'+ response['response'][i]['subModuleDescription'] + '</textarea>\
                   </div>\
                </td>\
                <td> <a href="javascript:void(0);" class="action-icon text-warning edit_btn1"> <i class="mdi mdi-square-edit-outline"></i></a>\
                 <a href="javascript:void(0);" class="  btn btn-sm btn-success   update_btn1" style="display:none;" id="'+ response['response'][i]['subMod_id'] + '"> Update</a>\
                 <a href="javascript:void(0);" class="  btn btn-sm btn-danger   del_btn1" style="display:none;" id="'+ response['response'][i]['subMod_id'] + '"> Done</a>\
                 <a href="javascript:void(0);" class="action-icon text-danger delete_btn1"> <i class="mdi mdi-delete-outline"></i></a></td>\
            </tr>';
                    dataStr = dataStr + data;
                }
                $('#no-record-deiv-sub-mod').css('display','none');
            } else {
                var dataStr = '';
                $('#no-record-deiv-sub-mod').css('display','');
            }
            $('#subModuleTbodyData').html('');
            $('#subModuleTbodyData').append(dataStr);
        }
    });
    // --------------------------------------------------------
}
// ########################################################################################################################################
// ########################################################################################################################################
function checkModuleName(thisTxt) {
    if ($('#projectId').val().trim().length == 0) {
        alert('select project!');
        return false;
    }
    console.log('searchData >>> ', $(thisTxt).val().trim(), 'projectfk >>> ', $('#projectId').val().trim());
    // ---------------  AJAX CALL  ----------------------------
    $.ajax({
        type: 'GET',
        url: "/project-management/check-module-name",
        data: { 'searchData': $(thisTxt).val().trim(), 'projectfk': $('#projectId').val().trim() },
        success: function (response) {
            console.log(response['response']);
            if (response['response'] == 'fail') {
                $(thisTxt).css('border', '2px solid red');
                $('#moduleNameExist').css('display', '');
                $('#btnSubmit').attr('disabled', true);
            } else {
                $(thisTxt).css('border', '');
                $('#moduleNameExist').css('display', 'none');
                $('#btnSubmit').attr('disabled', false);
            }
        }
    });
    // --------------------------------------------------------
}
// ########################################################################################################################################
// ########################################################################################################################################
function checkSubModuleName(thisTxt) {
    if ($('#projectId').val().trim().length == 0) {
        alert('select project!');
        return false;
    }
    if ($('#module_data').val().trim().length == 0) {
        alert('select module!');
        return false;
    }
    // ---------------  AJAX CALL  ----------------------------
    $.ajax({
        type: 'GET',
        url: "/project-management/check-subModule-name",
        data: { 'searchData': $(thisTxt).val().trim(), 'projectfk': $('#projectId').val().trim(), 'modulefk': $('#module_data').val().trim() },
        success: function (response) {
            console.log(response['response']);
            if (response['response'] == 'fail') {
                $(thisTxt).css('border', '2px solid red');
                $('#submoduleNameExist').css('display', '');
                $('#btnSubmit').attr('disabled', true);
            } else {
                $(thisTxt).css('border', '');
                $('#submoduleNameExist').css('display', 'none');
                $('#btnSubmit').attr('disabled', false);
            }
        }
    });
    // --------------------------------------------------------
}
// ########################################################################################################################################
// ########################################################################################################################################
// // ########################################################################################################################################

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
// // ########################################################################################################################################
// // ########################################################################################################################################
$(document).on('click', '.module_table .update_btn', function () {
    var project = $('#projects').val();
    console.log('project data >> ', project);

    var module = $(this).attr('id');
    console.log('module data >> ', module);

    var moduleText = $("input[name=mod_" + module + "]").val();
    console.log('module data >> ', moduleText);

    var moduleDescription = $("#modText_" + module + "").val();
    console.log('moduleDescription >> ', moduleDescription);

    // return false;
    Swal.fire({
        position: 'center',
        title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'>Updating module info</b><br><div class='d-flex justify-content-center'>\
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
        url: "/project-management/edit-module",
        headers: { 'X-CSRFToken': csrftoken },
        data: { 'projectFK': project, 'moduleFK': module, 'moduleText': moduleText.trim(), 'moduleDescription': moduleDescription.trim() },
        success: function (response) {
            console.log(response);
            Swal.close();
            if (response['response'] == 'success') {

                // alert('New Employee Added successfully');
                // location.reload();
                // $('#exampleModalCenter').modal('hide');
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: '<small>Module info updated successfully</small>',
                    showConfirmButton: false,
                    timer: 1500
                }).then(function () {
                    $(this).parent().parent().addClass('view');
                    $(this).parent().find('.action-icon').show();
                    $(this).parent().find('.update_btn').hide();
                    window.location.reload();
                })
            } else {
                // $('#email').css('border','2px solid red');
                // alert('User With this Email Already Exist!');
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: '<small>Duplicate Module Name Found For associated Project!</small>',
                    showConfirmButton: false,
                    timer: 2000
                })
                return false;
            }

        }
    });
    // --------------------------------------------------------
});
// ########################################################################################################################################
// ########################################################################################################################################
$(document).on('click', '.module_table .del_btn', function () {

    Swal.fire({
        title: 'Are you sure you want to delete this module?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            var project = $('#projects').val();
            console.log('project data >> ', project);

            var module = $(this).attr('id');
            console.log('module data >> ', module);

            Swal.fire({
                position: 'center',
                title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'>Deleting module info</b><br><div class='d-flex justify-content-center'>\
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
            $.ajax({
                type: 'GET',
                url: "/project-management/delete-module",
                data: { 'projectFK': project, 'moduleFK': module },
                success: function (response) {
                    console.log(response['response']);
                    Swal.close();
                    if (response['response'] == 'success') {

                        // alert('New Employee Added successfully');
                        // location.reload();
                        // $('#exampleModalCenter').modal('hide');
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: '<small>Module deleted successfully</small>',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(function () {
                            window.location.reload();
                        })

                    } else {
                        // $('#email').css('border','2px solid red');
                        // alert('User With this Email Already Exist!');
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: '<small>Duplicate Module Name Found For associated Project!</small>',
                            showConfirmButton: false,
                            timer: 2000
                        })
                        return false;
                    }

                }
            });
            // --------------------------------------------------------

        }
    })



});
// ########################################################################################################################################
// ########################################################################################################################################
// ########################################################################################################################################
// ########################################################################################################################################
$(document).on('click', '.module_table .update_btn1', function () {
    var project = $('#projectId').val();
    console.log('project data >> ', project);

    var module = $('#module_data').val();
    console.log('module data >> ', module);

    var submodule = $(this).attr('id');
    console.log('submodule data >> ', submodule);

    var submoduleText = $("input[name=submod_" + submodule + "]").val();
    console.log('submodule data >> ', submoduleText);

    var submoduleDescription = $("#submodText_" + submodule + "").val();
    console.log('submoduleDescription >> ', submoduleDescription);

    // return false;

    Swal.fire({
        position: 'center',
        title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'>Updating sub module info</b><br><div class='d-flex justify-content-center'>\
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
        url: "/project-management/edit-submodule",
        headers: { 'X-CSRFToken': csrftoken },
        data: { 'projectFK': project, 'moduleFK': module, 'submoduleFK':submodule,'submoduleText': submoduleText.trim(), 'submoduleDescription': submoduleDescription.trim() },
        success: function (response) {
            console.log(response['response']);
            Swal.close();
            if (response['response'] == 'success') {

                // alert('New Employee Added successfully');
                // location.reload();
                // $('#exampleModalCenter').modal('hide');
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: '<small>Submodule info updated successfully</small>',
                    showConfirmButton: false,
                    timer: 1500
                }).then(function () {
                    $(this).parent().parent().addClass('view');
                    $(this).parent().find('.action-icon').show();
                    $(this).parent().find('.update_btn').hide();
                    window.location.reload();
                })

            } else {
                // $('#email').css('border','2px solid red');
                // alert('User With this Email Already Exist!');
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: '<small>An error occured while deleting module!</small>',
                    showConfirmButton: false,
                    timer: 2000
                })
                return false;
            }

        }
    });
    // --------------------------------------------------------

});
// ########################################################################################################################################
// ########################################################################################################################################
$(document).on('click', '.module_table .del_btn1', function () {

    Swal.fire({
        title: 'Are you sure you want to delete this submodule?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            var project = $('#projectId').val();
            console.log('project data >> ', project);

            var module = $('#module_data').val();
            console.log('module data >> ', module);

            var submodule = $(this).attr('id');
            console.log('submodule data >> ', module);

            Swal.fire({
                position: 'center',
                title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'>Deleting submodule info</b><br><div class='d-flex justify-content-center'>\
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
            $.ajax({
                type: 'GET',
                url: "/project-management/delete-submodule",
                data: { 'projectFK': project, 'moduleFK': module ,'submoduleFK':submodule},
                success: function (response) {
                    console.log(response['response']);
                    Swal.close();
                    if (response['response'] == 'success') {

                        // alert('New Employee Added successfully');
                        // location.reload();
                        // $('#exampleModalCenter').modal('hide');
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: '<small>Submodule deleted successfully</small>',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(function () {
                            window.location.reload();
                        })

                    } else {
                        // $('#email').css('border','2px solid red');
                        // alert('User With this Email Already Exist!');
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: '<small>An error occured while deleting submodule!</small>',
                            showConfirmButton: false,
                            timer: 2000
                        })
                        return false;
                    }

                }
            });
            // --------------------------------------------------------

        }
    })



});
// ########################################################################################################################################
