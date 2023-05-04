$(document).ready(function () {

	// top nav
	// $('#load-navigation').html('<ul class="list-unstyled topbar-menu float-end mb-0"> <li class="dropdown notification-list d-lg-none"> <a class="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false"> <i class="dripicons-search noti-icon"></i> </a> </li><li class="dropdown notification-list"> <a class="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false"> <i class="dripicons-bell noti-icon"></i> <span class="noti-icon-badge"></span> </a> <div class="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg"> <div class="dropdown-item noti-title"> <h5 class="m-0"> <span class="float-end"> <a href="javascript: void(0);" class="text-dark"> <small>Clear All</small> </a> </span>Notification </h5> </div><div style="max-height: 230px;" data-simplebar> <a href="javascript:void(0);" class="dropdown-item notify-item"> <div class="notify-icon bg-primary"> <i class="mdi mdi-comment-account-outline"></i> </div><p class="notify-details">Caleb Flakelar commented on Admin <small class="text-muted">1 min ago</small> </p></a> <a href="javascript:void(0);" class="dropdown-item notify-item"> <div class="notify-icon bg-info"> <i class="mdi mdi-account-plus"></i> </div><p class="notify-details">New user registered. <small class="text-muted">5 hours ago</small> </p></a> <a href="javascript:void(0);" class="dropdown-item notify-item"> <div class="notify-icon"> <img src="../../static/assets/images/users/avatar-2.jpg" class="img-fluid rounded-circle" alt=""/> </div><p class="notify-details">Cristina Pride</p><p class="text-muted mb-0 user-msg"> <small>Hi, How are you? What about our next meeting</small> </p></a> <a href="javascript:void(0);" class="dropdown-item notify-item"> <div class="notify-icon bg-primary"> <i class="mdi mdi-comment-account-outline"></i> </div><p class="notify-details">Caleb Flakelar commented on Admin <small class="text-muted">4 days ago</small> </p></a> <a href="javascript:void(0);" class="dropdown-item notify-item"> <div class="notify-icon"> <img src="../../static/assets/images/users/avatar-4.jpg" class="img-fluid rounded-circle" alt=""/> </div><p class="notify-details">Karen Robinson</p><p class="text-muted mb-0 user-msg"> <small>Wow ! this admin looks good and awesome design</small> </p></a> <a href="javascript:void(0);" class="dropdown-item notify-item"> <div class="notify-icon bg-info"> <i class="mdi mdi-heart"></i> </div><p class="notify-details">Carlos Crouch liked <b>Admin</b> <small class="text-muted">13 days ago</small> </p></a> </div><a href="javascript:void(0);" class="dropdown-item text-center text-primary notify-item notify-all"> View All </a> </div></li><li class="dropdown notification-list"> <a class="nav-link dropdown-toggle nav-user arrow-none me-0" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false"> <span class="account-user-avatar"> <img src="../../static/assets/images/logo_sm.png" alt="user-image" class="rounded-circle"> </span> <span> <span class="account-user-name">18Pixels</span> <span class="account-position">Admin</span> </span> </a> <div class="dropdown-menu dropdown-menu-end dropdown-menu-animated topbar-dropdown-menu profile-dropdown"> <div class=" dropdown-header noti-title"> <h6 class="text-overflow m-0">Welcome !</h6> </div><a href="javascript:void(0);" class="dropdown-item notify-item"> <i class="mdi mdi-account-circle me-1"></i> <span>My Account</span> </a>   <a href="/user_logout" class="dropdown-item notify-item"> <i class="mdi mdi-logout me-1"></i> <span>Logout</span> </a> </div></li></ul> <button class="button-menu-mobile open-left"> <i class="mdi mdi-menu"></i> </button>');

	// left side menu
	// $('#sidebarMenus').html('<a href="/dashboard" class="logo text-center logo-light"> <span class="logo-lg"> <img src="../../static/assets/images/logo.png" alt="" height="50"> </span> <span class="logo-sm"> <img src="../../static/assets/images/logo_sm.png" alt="" height="25"> </span> </a> <div class="h-100" id="leftside-menu-container" data-simplebar> <ul class="side-nav"> <li class="side-nav-title side-nav-item">Navigation</li><li class="side-nav-item"> <a data-bs-toggle="collapse" href="#sidebarDashboards" aria-expanded="false" aria-controls="sidebarDashboards" class="side-nav-link"> <i class="uil-home-alt"></i> <span> Dashboards </span> </a> </li><li class="side-nav-item"> <a data-bs-toggle="collapse" href="#sidebarEcommerce" aria-expanded="false" aria-controls="sidebarEcommerce" class="side-nav-link"> <i class="uil-store"></i> <span> Employee Management </span> <span class="menu-arrow"></span> </a> <div class="collapse" id="sidebarEcommerce"> <ul class="side-nav-second-level"> <li> \
	// <a href="/employee-management/employee-list">Employee List</a> </li><li> \
	// <a href="/employee-management/add-employee">Add New Employee</a> </li>\
	// </ul> </div></li><li class="side-nav-item"> <a data-bs-toggle="collapse" href="#sidebarProject" aria-expanded="false" aria-controls="sidebarEmail" class="side-nav-link"> <i class="uil-envelope"></i> <span> Project Management </span> <span class="menu-arrow"></span> </a> <div class="collapse" id="sidebarProject"> <ul class="side-nav-second-level"> <li> \
	// <a href="/project-management/project-list">Project List</a> </li> <li> \
	// <a href="/project-management/add-project">Add New Project</a> </li> <li> \
	// <a href="/project-management/add-module">Add project Modules</a> </li><li>\
	//  <a href="/project-management/module-list"> Project Modules List</a> </li>  <li>\
	//  <a href="/project-management/add-submodule"> Add Sub-modules</a> </li> <li>\
	//  <a href="/project-management/submodule-list"> Project Sub Modules List</a> </li> </ul> </div></li><li class="side-nav-item"> <a data-bs-toggle="collapse" href="#sidebarEmail" aria-expanded="false" aria-controls="sidebarEmail" class="side-nav-link"> <i class="uil-envelope"></i> <span> Event Management </span> <span class="menu-arrow"></span> </a> <div class="collapse" id="sidebarEmail"> <ul class="side-nav-second-level"> <li> \
	// <a href="event-list.html">Events List</a> </li><!-- <li> \
	// <a href="apps-email-read.html">Read Email</a> </li>--> </ul> </div></li><li class="side-nav-item"> <a data-bs-toggle="collapse" href="#sidebarProjects" aria-expanded="false" aria-controls="sidebarProjects" class="side-nav-link"> <i class="uil-briefcase"></i> <span> Leave Management </span> <span class="menu-arrow"></span> </a> <div class="collapse" id="sidebarProjects"> <ul class="side-nav-second-level"> <li> \
	// <a href="leave-record.html">Leave Record</a> </li><li> \
	// <a href="leave-requests.html">Leave Requests</a> </li><li> \
	// <a href="add-leaves.html">Add Leaves </a> </li><li> \
	// <a href="list-of-holidays.html">List of Holidays </a> </li></ul> </div></li><li class="side-nav-item"> <a data-bs-toggle="collapse" href="#sidebarTasks" aria-expanded="false" aria-controls="sidebarTasks" class="side-nav-link"> <i class="uil-clipboard-alt"></i> <span> HR Management </span> <span class="menu-arrow"></span> </a> <div class="collapse" id="sidebarTasks"> <ul class="side-nav-second-level"> <li> \
	// <a href="received-applications.html">Received Applicants</a> </li><li> \
	// <a href="add-applications.html">Add Applications</a> </li><li> \
	// <a href="job-list.html">Job List</a> </li><li> \
	// <a href="add-new-job.html">Add/Create New Job</a> </li></ul> </div></li><li class="side-nav-item"> \
	// <a href="#" class="side-nav-link"> <i class="uil-folder-plus"></i> <span> Task Management </span> </a> </li><li class="side-nav-item"> \
	// <a href="#" class="side-nav-link"> <i class="uil-folder-plus"></i> <span> Report Management </span> </a> </li><li class="side-nav-item"> <a data-bs-toggle="collapse" href="#sidebarPages" aria-expanded="false" aria-controls="sidebarPages" class="side-nav-link"> <i class="uil-copy-alt"></i> <span> Master Pages </span> <span class="menu-arrow"></span> </a> <div class="collapse" id="sidebarPages"> <ul class="side-nav-second-level"> <li> \
	// <a href="#">Designation Master</a> </li><li> \
	// <a href="#">Event Type Master</a> </li><li> \
	// <a href="#">Qualification Master</a> </li><li> \
	// <a href="#">Passing Year Master</a> </li><li> \
	// <a href="#">Cultural Event Master</a> </li><li> \
	// <a href="#">Project Sector Master</a> </li><li> \
	// <a href="#">Project Type Master</a> </li><li> \
	// <a href="#">Project Technology Master</a> </li><li> \
	// <a href="#">Document Master</a> </li></ul> </div></li><li class="side-nav-item"> \
	// <a href="landing.html" target="_blank" class="side-nav-link"> <i class="uil-globe"></i> <span class="badge bg-primary text-light float-end">15</span> <span> Notifications </span> </a> </li><li class="side-nav-item"> <a data-bs-toggle="collapse" href="#reports" aria-expanded="false" aria-controls="reports" class="side-nav-link"> <i class="uil-copy-alt"></i> <span> Reports </span> <span class="menu-arrow"></span> </a> <div class="collapse" id="reports"> <ul class="side-nav-second-level"> <li> \
	// <a href="#">Employees List</a> </li><li> \
	// <a href="#">Holiday List</a> </li><li> \
	// <a href="#">Project List</a> </li><li> \
	// <a href="#">Task Report</a> </li><li> \
	// <a href="#">Event List</a> </li></ul> </div></li> </ul> <div class="clearfix"></div></div>');

	// $('#sidebarMenus').html(' <a href="dashboard.html" class="logo text-center logo-light"> <span class="logo-lg"> <img src="assets/images/logo.png" alt="" height="50"> </span> <span class="logo-sm"> <img src="assets/images/logo_sm.png" alt="" height="25"> </span> </a> <div class="h-100" id="leftside-menu-container" data-simplebar> <ul class="side-nav"> <li class="side-nav-title side-nav-item">Navigation</li><li class="side-nav-item"> <a  href="dashboard.html"  class="side-nav-link"> <i class="uil-home-alt"></i> <span> Dashboards </span> </a> </li><li class="side-nav-item"> <a data-bs-toggle="collapse" href="#sidebarEcommerce" aria-expanded="false" aria-controls="sidebarEcommerce" class="side-nav-link"> <i class="uil-store"></i> <span> Employee Management </span> <span class="menu-arrow"></span> </a> <div class="collapse" id="sidebarEcommerce"> <ul class="side-nav-second-level"> <li> <a href="employee-list.html">Employee List</a> </li><li> <a href="add-employee.html">Add New Employee</a> </li><li> <a href="send-notification.html">Send Notification to Employee</a> </li></ul> </div></li><li class="side-nav-item"> <a data-bs-toggle="collapse" href="#sidebarProject" aria-expanded="false" aria-controls="sidebarEmail" class="side-nav-link"> <i class="uil-envelope"></i> <span> Project Management </span> <span class="menu-arrow"></span> </a> <div class="collapse" id="sidebarProject"> <ul class="side-nav-second-level"> <li> <a href="project-list.html">Project List</a> </li> <li> <a href="add-new-project.html">Add New Project</a> </li> <li> <a href="add-modules.html">Add project Modules</a> </li> </ul> </div></li><li class="side-nav-item"> <a data-bs-toggle="collapse" href="#sidebarEmail" aria-expanded="false" aria-controls="sidebarEmail" class="side-nav-link"> <i class="uil-envelope"></i> <span> Event Management </span> <span class="menu-arrow"></span> </a> <div class="collapse" id="sidebarEmail"> <ul class="side-nav-second-level"> <li> <a href="event-list.html">Events List</a> </li><!-- <li> <a href="apps-email-read.html">Read Email</a> </li>--> </ul> </div></li><li class="side-nav-item"> <a data-bs-toggle="collapse" href="#sidebarProjects" aria-expanded="false" aria-controls="sidebarProjects" class="side-nav-link"> <i class="uil-briefcase"></i> <span> Leave Management </span> <span class="menu-arrow"></span> </a> <div class="collapse" id="sidebarProjects"> <ul class="side-nav-second-level"> <li> <a href="leave-record.html">Leave Record</a> </li><li> <a href="leave-requests.html">Leave Requests</a> </li><li> <a href="add-leaves.html">Add Leaves </a> </li><li> <a href="list-of-holidays.html">List of Holidays </a> </li></ul> </div></li><li class="side-nav-item"> <a data-bs-toggle="collapse" href="#sidebarTasks" aria-expanded="false" aria-controls="sidebarTasks" class="side-nav-link"> <i class="uil-clipboard-alt"></i> <span> HR Management </span> <span class="menu-arrow"></span> </a> <div class="collapse" id="sidebarTasks"> <ul class="side-nav-second-level"> <li> <a href="received-applications.html">Received Applicants</a> </li><li> <a href="add-applications.html">Add Applications</a> </li><li> <a href="job-list.html">Job List</a> </li><li> <a href="add-new-job.html">Add/Create New Job</a> </li></ul> </div></li><li class="side-nav-item"> <a href="#" class="side-nav-link"> <i class="uil-folder-plus"></i> <span> Task Management </span> </a> </li><li class="side-nav-item"> <a href="#" class="side-nav-link"> <i class="uil-folder-plus"></i> <span> Report Management </span> </a> </li><li class="side-nav-item"> <a data-bs-toggle="collapse" href="#sidebarPages" aria-expanded="false" aria-controls="sidebarPages" class="side-nav-link"> <i class="uil-copy-alt"></i> <span> Master Pages </span> <span class="menu-arrow"></span> </a> <div class="collapse" id="sidebarPages"> <ul class="side-nav-second-level"> <li> <a href="#">Designation Master</a> </li><li> <a href="#">Holiday Master</a> </li><li> <a href="#">Document Master</a> </li></ul> </div></li><li class="side-nav-item"> <a href="landing.html" target="_blank" class="side-nav-link"> <i class="uil-globe"></i> <span class="badge bg-primary text-light float-end">15</span> <span> Notifications </span> </a> </li><li class="side-nav-item"> <a data-bs-toggle="collapse" href="#reports" aria-expanded="false" aria-controls="reports" class="side-nav-link"> <i class="uil-copy-alt"></i> <span> Reports </span> <span class="menu-arrow"></span> </a> <div class="collapse" id="reports"> <ul class="side-nav-second-level"> <li> <a href="#">Employees List</a> </li><li> <a href="#">Holiday List</a> </li><li> <a href="#">Project List</a> </li><li> <a href="#">Task Report</a> </li><li> <a href="#">Event List</a> </li></ul> </div></li> </ul> <div class="clearfix"></div></div>');

			// add qualification

			// $('#add_quali').click(function(){
			// 	$('#more_qualifications').append('<div class="row"><div class="col-xl-3"> <div class="mb-3"> <label for="project-overview" class="form-label">Qualification</label> <select class="form-select" > <option>MCA</option> <option>B.tech.</option> </select> </div></div><div class="col-xl-6"> <div class="mb-3"> <label for="project-overview" class="form-label">From </label> <input type="text" id="name" class="form-control" placeholder="Collge/Institute name"> </div></div><div class="col-xl-2"> <div class="mb-3"> <label for="project-overview" class="form-label">Passing Year </label> <select class="form-select" > <option>Persuing</option> <option>2021</option> <option>2020</option> </select> </div> </div><div class="col-xl-1"> <a href="javascript:;"   class="minus-ico mt-3 remove_quali"><i class="mdi mdi-minus-circle"></i></a> </div></div>')
			// });
			// $(document).on('click','.remove_quali', function(){ 
			  
			// 	 $(this).parent().parent().remove();
			// });


		 function readURL(input) {
			  if (input.files && input.files[0]) {
			    var reader = new FileReader();
			    
			    reader.onload = function(e) {
			      $('#imgphoto').attr('src', e.target.result);
			    }
			    
			    reader.readAsDataURL(input.files[0]); // convert to base64 string
			  }
			}

			$("#emp_photo").change(function() {
			  readURL(this);
			});



			function readURL2(input) {
				if (input.files && input.files[0]) {
				  var reader = new FileReader();
				  
				  reader.onload = function(e) {
					$('#edit_imgphoto').attr('src', e.target.result);
				  }
				  
				  reader.readAsDataURL(input.files[0]); // convert to base64 string
				}
			  }
  
			  $("#edit_emp_photo").change(function() {
				readURL2(this);
			  });

			


			function readURL1(input) {
				if (input.files && input.files[0]) {
				  var reader = new FileReader();
				  
				  reader.onload = function(e) {
					$('#creative_img').attr('src', e.target.result);
				  }
				  
				  reader.readAsDataURL(input.files[0]); // convert to base64 string
				}
			  }
  
			  $("#creative_file").change(function() {
				readURL1(this);
			  });

			// $('#add_docs').click(function(){
			// 	$('#upoad_docs').append(' <div class="row  "> <div class="col-xl-4"> <div class="mb-3"> <label for="project-overview" class="form-label">Document Type</label> <select class="form-select" > <option>10th Marksheet</option> <option>Aadhar Card</option> <option>Experience Certificate</option> </select> </div></div><div class="col-xl-5"> <div class="mb-3"> <label for="project-overview" class="form-label d-block">Chose file</label> <input type="file" name=""> </div></div><div class="col-xl-1"> <a href="javascript:;" class="minus-ico mt-3 remove_docs"><i class="mdi mdi-minus-circle"></i></a> </div></div>');
			// });
			// $(document).on('click','.remove_docs', function(){ 
			  
			// 	 $(this).parent().parent().remove();
			// });


			// select 2
			$("#projects").select2({
			    placeholder: "Select a project" 
			});
			$("#employes").select2({
			    placeholder: "Select an employe" 
			});

			// add modules
			$('#add_modules').click(function(){
				$('#more-modules').append(' <div class="row position-relative"> <div class="col-xl-5 "> <div class="mb-2 position-relative" id="datepicker1">  <input type="text" class="form-control moduleName" placeholder="Enter Module name" onkeyup="checkModuleName(this)"> </div></div><div class="col-xl-6 "> <div class="mb-3">   <textarea class="form-control moduleDescription" id="project-overview" rows="3" placeholder="Enter some brief about module.."></textarea> </div></div><div class="col-xl-1  "><a href="javascript:;" class="minus-ico mt-3 remove_modules"><i class="mdi mdi-minus-circle"></i></a> </div></div>');
			});
			$(document).on('click','.remove_modules', function(){ 
			  
				 $(this).parent().parent().remove();
			});

			$('#add_sub_modules').click(function(){
				$('#more-sub-modules').append(' <div class="row position-relative"> <div class="col-xl-5 "> <div class="mb-2 position-relative" id="datepicker1">  <input type="text" class="form-control submoduleName" placeholder="Enter Sub-module name" onkeyup="checkSubModuleName(this)"> </div></div><div class="col-xl-6 "> <div class="mb-3">   <textarea class="form-control submoduledesc" id="project-overview" rows="3" placeholder="Enter some brief sub-module.."></textarea> </div></div><div class="col-xl-1  "><a href="javascript:;" class="minus-ico mt-3 remove_sub_modules"><i class="mdi mdi-minus-circle"></i></a> </div></div>');
			});
			$(document).on('click','.remove_sub_modules', function(){ 
			  
				 $(this).parent().parent().remove();
			});

 

			// module edit/delete
			//$('.module_table .edit_btn').click(function(){
				$(document).on('click','.module_table .edit_btn', function(){ 
				 $(this).parent().parent().removeClass('view');
				 $(this).parent().find('a').hide();
				 $(this).parent().find('.update_btn').css('display','inline-block');
			});

			// $('.module_table .update_btn').click(function(){
				$(document).on('click','.module_table .update_btn', function(){ 
				//  $(this).parent().parent().addClass('view');
				//  $(this).parent().find('.action-icon').show();
				//  $(this).parent().find('.update_btn').hide();
			});

			// $('.module_table .delete_btn').click(function(){
				$(document).on('click','.module_table .delete_btn', function(){ 
				 $(this).parent().parent().addClass('del');
				 $(this).parent().find('a').hide();
				 $(this).parent().find('.del_btn').css('display','inline-block');
			});

			// $('.module_table .mod_list a').click(function(){
				$(document).on('click','.module_table .mod_list a', function(){ 
				$(this).parent().remove();
			});

			// $('.module_table .del_btn').click(function(){
				$(document).on('click','.module_table .del_btn', function(){ 
				//  $(this).parent().parent().removeClass('del');
				//  $(this).parent().find('.action-icon').show();
				//  $(this).hide();
			});

			// add projects
			// $('#add_urls').click(function(){
			// 	$('#more-urls').append('<div class="mb-2 position-relative row" >  <div class="col-md-4"> <input type="text" class="form-control" placeholder="Title (what for)"> </div><div class="col-md-8"> <input style="width: 90%" type="text" class="form-control" placeholder="Enter URL"> <a style="right:10px;" href="javascript:;" class="minus-ico mt-3 ico1 remove_url"><i class="mdi mdi-minus-circle"></i></a> </div></div>');
			// });
			// $(document).on('click','.remove_url', function(){ 
			  
			// 	 $(this).parent().parent().remove();
			// });

			// $('#add_files').click(function(){
			// 	$('#proj_files').append(' <div class="row"> <div class="col-xl-10"> <div class="mb-3"> <label class="form-label d-block">Choose file</label> <input type="file" name=""> </div></div><div class="col-xl-2"> <a   href="javascript:;" class="minus-ico mt-4 ico1 remove_files position-relative"><i class="mdi mdi-minus-circle"></i></a>  </div></div>');
			// });
			// $(document).on('click','.remove_files', function(){ 
			  
			// 	 $(this).parent().parent().remove();
			// });
			
			$(document).on('click','.module_table .edit_btn1', function(){ 
				$(this).parent().parent().removeClass('view');
				$(this).parent().find('a').hide();
				$(this).parent().find('.update_btn1').css('display','inline-block');
		   });

		   // $('.module_table .update_btn').click(function(){
			   $(document).on('click','.module_table .update_btn1', function(){ 
			    // $(this).parent().parent().addClass('view');
			    // $(this).parent().find('.action-icon').show();
			    // $(this).parent().find('.update_btn1').hide();
		   });

		   // $('.module_table .delete_btn').click(function(){
			   $(document).on('click','.module_table .delete_btn1', function(){ 
				$(this).parent().parent().addClass('del');
				$(this).parent().find('a').hide();
				$(this).parent().find('.del_btn1').css('display','inline-block');
		   });

		   $(document).on('click','.module_table .del_btn1', function(){ 
			//  $(this).parent().parent().removeClass('del');
			//  $(this).parent().find('.action-icon').show();
			//  $(this).hide();
			});




			$('.add_new_task').click(function(){ 
					$(".select2").select2({
						 dropdownParent: $('#add-new-task-modal')
					});
			});

			$('.add_popup').click(function(){ 
				$(".select2").select2({
					 dropdownParent: $('#add-birthday')
				});
			});	
			$('.add_popup1').click(function(){ 
				$(".select2").select2({
					 dropdownParent: $('#add-anniversary')
				});
			});	
			$('.add_popup1_1').click(function(){ 
				$(".select2").select2({
					 dropdownParent: $('#add-cultural-event')
				});
			});
			$('.edit_popup').click(function(){ 
				$(".select2").select2({
					 dropdownParent: $('#edit-cultural-event')
				});
			});	
			$('.add_popup2').click(function(){ 
				$(".select2").select2({
					 dropdownParent: $('#add-cultural-event')
				});
			});	
			$('.send_noti').click(function(){ 
				$(".select2").select2({
					 dropdownParent: $('#compose-modal')
				});
			});	

			 	// add performances
		 	// $('#add_performance').click(function(){
			// 	$('#performances').append(' <div class="row"><div class="mb-3 col-md-4">   <select class="form-control select2 text-large" data-toggle="select2" data-placeholder="Select..."> <option value="0">Pooja Singh</option> <option value="1">Rohit</option> <option value="2">Anuj</option> </select> </div><div class="col-md-7"> <div class="mb-3">  <input type="text" class="form-control" placeholder="What to be performed.."> </div></div><div class="col-md-1  "><a   href="javascript:;" class="minus-ico mt-3 ico1 remove_performance position-relative"><i class="mdi mdi-minus-circle"></i></a>  </div></div>');
			// 		$(".select2").select2({
			// 		 dropdownParent: $('#add-cultural-event')
			// 	    });
			// });
			// $(document).on('click','.remove_performance', function(){ 
			// 	 $(this).parent().parent().remove();
			// });	


			// 	// leave approve/reject
		 	// $('.leave_req .approve').click(function(){
			// 	 $(this).text('Approved');
			// 	  $(this).css('font-size','16px');
			// 	 $(this).parent().find('.reject').hide();
			// });
			// 	$('.leave_req .reject').click(function(){
			// 	 $(this).text('Rejected');
			// 	  $(this).css('font-size','16px');
			// 	 $(this).parent().find('.approve').hide();
			// });

			// notificaiton page
			$('.email-content, .email-sender-info, .read-det').click(function(){
                $('#read').modal('show');
            }); 
			$('.send-to-all').click(function(){
                var chkbox = $(this).find('input');
                if($(chkbox).is(":checked")){
                	 $('.sel_emp').css('pointer-events','none');
                	 $('.sel_emp').css('opacity','.5');
                }
                else {
                	 $('.sel_emp').css('pointer-events','all');
                	 $('.sel_emp').css('opacity','1');
                }
            }); 
  


            // birthday
            // $('head').append('<link rel="stylesheet" href="assets/css/custom.css" type="text/css" />');

		    // $('body').addClass('anniversary');
			// $('.birthday, .anniversary').append('<div class="balloons"><img src="assets/images/events/b1.png"><img src="assets/images/events/b1.png"><img src="assets/images/events/b1.png"></div>');
			// $('.birthday .navbar-custom').append('<img class="hb" src="assets/images/events/hb.png">');
			// $('.birthday, .anniversary').append('<div class="b2"><img src="assets/images/events/b2.png"> </div>');
			// $('.birthday, .anniversary').append('<div class="b2-1"><img src="assets/images/events/b2.png"> </div>');
			// $('.birthday, .anniversary').append('<div class="b3"><img src="assets/images/events/b3.png"> </div>');
			// $('.birthday, .anniversary').append('<div class="b4"><img src="assets/images/events/b4.png"> </div>');
			// $('.anniversary .navbar-custom').append('<img class="anniv" src="assets/images/events/anniv.jpg">');
			// $('.anniversary .navbar-custom').append(' <h3 class="">on <span>1st</span> Anniversary</h3>');
			// $('.anniversary, .birthday').append('<span class="anim"></span><span class="anim anim1"></span> <span class="anim anim2"></span>');

			// christmas
			//  $('body').addClass('christmas');
			//  $('.christmas .navbar-custom').append('<img class="merry-c" src="assets/images/events/mc.png">');
			//  $('.christmas').append('<div class="d1"><img src="assets/images/events/decor1.png"> <img src="assets/images/events/decor1.png"> </div>');
			//  $('.christmas').append('<div class="d2"><img src="assets/images/events/decor2.png">  </div>');
			//  $('.christmas').append('<div class="cap"><img src="assets/images/events/cap.png">  </div>');
			//  $('.christmas').append('<div class="d3"><img src="assets/images/events/decor3.png">  </div>');
			//  $('.christmas').append('<div class="d4"><img src="assets/images/events/decor4.png">  </div>');
			//  $('.christmas').append('<div class="d5"><img src="assets/images/events/decor5.png">  </div>');

			// print tables reporting
			// $(document).ready(function() {
			//     $('.printable').DataTable( {
			//         dom: 'Bfrtip',
			//         buttons: [
			//             'print'
			//         ]
			//     } );
			// } );

			// $("#print-datatable").DataTable({
			//     keys: !0,
			//     language: { paginate: { previous: "<i class='mdi mdi-chevron-left'>", next: "<i class='mdi mdi-chevron-right'>" } },
			//     drawCallback: function () {
			//         $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
			//     },
			//     'aoColumnDefs': [{
			//             'bSortable': false,
			//             'aTargets': [-1] /* 1st one, start by the right */
			//         }],
			// 	    buttons: [
			// 	        'print'
			// 	    ]

			// 	});
 

});


