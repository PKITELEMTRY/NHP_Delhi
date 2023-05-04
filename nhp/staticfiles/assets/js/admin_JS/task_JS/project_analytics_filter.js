// ###############################################################################################################
// ###############################################################################################################
function project_analytics_filter() {
    var projectID = $('#project_analytics_filter').val();

    if (projectID == 'All') {
        $('#moduleDiv').css('pointer-events', 'none');
        $('#moduleDiv').css('opacity', 0.3);

        $('#subModuleDiv').css('pointer-events', 'none');
        $('#subModuleDiv').css('opacity', 0.3);

        $('#get_subModule_list').html('');
        $('#subMod').html('');
        $('#get_subModule_list').append('<option></option>');
        $('#subMod').append('<option></option>');

        $('#spinner_dashboard').css('display', 'none');
        $('#spinner_overview').css('display', 'none');

        $('#task_dash_div').html('');
        $('#task_overview_div').html('');
        $('#task_dash_div').append('<div class="col-lg-12 text-center">\
                                        <h4>Select project to view Analytics</h4>\
                                    </div>');
        $('#task_overview_div').append('<div class="col-lg-12 text-center">\
                                            <h4>Select project to view Analytics</h4>\
                                        </div>');

        return false;
    } else {
        $('#moduleDiv').css('pointer-events', '');
        $('#moduleDiv').css('opacity', 1);

        $('#spinner_dashboard').css('display', '');
        $('#spinner_overview').css('display', '');

        // ---------------  AJAX CALL  ----------------------------
        $.ajax({
            type: 'GET',
            url: "/task-management/get_module_list/" + projectID,
            success: function (response) {
                if (response['response'].length > 0) {
                    var dataStr = '<option></option>';
                    for (var i = 0; i < response['response'].length; i++) {
                        var data = '<option value="' + response['response'][i]['id'] + '">' + response['response'][i]['moduleName'] + '</option>';
                        dataStr = dataStr + data;
                    }
                } else {
                    var dataStr = '';
                }
                $('#get_subModule_list').html('');
                $('#get_subModule_list').append(dataStr);
                // ==============================================================================================
                //                               Task Dashboard Data
                // ==============================================================================================
                
                var dataArray = [];
                if (response['taskDashList'][0]['project_totalTask'] == 0 && response['taskDashList'][0]['project_completedTask'] == 0 && response['taskDashList'][0]['project_ongoingTask'] == 0 && response['taskDashList'][0]['project_todoTask'] == 0) {
                    $('#task_dash_div').html('');
                    $('#task_dash_div').append(' <div class="col-lg-12">\
                                    <h3>No Progress Found for this Project!</h3>\
                                </div>');
                    $('#spinner_dashboard').css('display', 'none');
                    $('#spinner_overview').css('display', 'none');
                } else {
                    dataArray.push(parseInt(response['taskDashList'][0]['project_completedTask']));
                    dataArray.push(parseInt(response['taskDashList'][0]['project_ongoingTask']));
                    dataArray.push(parseInt(response['taskDashList'][0]['project_delayTask']));
                    dataArray.push(parseInt(response['taskDashList'][0]['project_todoTask']));
                    // -------------------------------------------------------------------------------------------------------------------------------
                    var modulewisestr = '';
                    for(var m=0;m<response['moduleWiseList'].length;m++){
                        var colorDiv = '';

                        if(response['moduleWiseList'][m]['progress'] > 0 && response['moduleWiseList'][m]['progress'] <= 25){
                            colorDiv = '<div class="progress-bar bg-danger" role="progressbar" style="width: '+response['moduleWiseList'][m]['progress']+'%" aria-valuenow="'+response['moduleWiseList'][m]['progress']+'" aria-valuemin="0" aria-valuemax="100"></div>';
                        }else if(response['moduleWiseList'][m]['progress'] > 25 && response['moduleWiseList'][m]['progress'] <= 50){
                            colorDiv = '<div class="progress-bar bg-warning" role="progressbar" style="width: '+response['moduleWiseList'][m]['progress']+'%" aria-valuenow="'+response['moduleWiseList'][m]['progress']+'" aria-valuemin="0" aria-valuemax="100"></div>';
                        }else if(response['moduleWiseList'][m]['progress'] > 51 && response['moduleWiseList'][m]['progress'] <= 75){
                            colorDiv = '<div class="progress-bar bg-info" role="progressbar" style="width: '+response['moduleWiseList'][m]['progress']+'%" aria-valuenow="'+response['moduleWiseList'][m]['progress']+'" aria-valuemin="0" aria-valuemax="100"></div>';
                        }else if(response['moduleWiseList'][m]['progress'] > 76 && response['moduleWiseList'][m]['progress'] <= 100){
                            colorDiv = '<div class="progress-bar bg-success" role="progressbar" style="width: '+response['moduleWiseList'][m]['progress']+'%" aria-valuenow="'+response['moduleWiseList'][m]['progress']+'" aria-valuemin="0" aria-valuemax="100"></div>';
                        }


                        var modData = '<div class="moduless mb-3">\
                                            <label class="d-block">'+response['moduleWiseList'][m]['moduleName']+'<span class="float-end">'+response['moduleWiseList'][m]['progress']+'%</span></label>\
                                            <div class="progress " style="height: 10px">'+colorDiv+'\
                                            </div>\
                                        </div>';
                        modulewisestr = modulewisestr + modData;
                    }
                    // -------------------------------------------------------------------------------------------------------------------------------
                    var dataStr = '<div class="row mt-3">\
                    <div class="col-12">\
                        <div class="card widget-inline">\
                            <div class="card-body p-0">\
                                <div class="row g-0">\
                                    <div class="col-sm-6 col-xl-3">\
                                        <div class="card shadow-none m-0">\
                                            <div class="card-body text-center">\
                                                <i class="dripicons-thumbs-up text-success" style="font-size: 24px;"></i>\
                                                <h3><span>'+response['taskDashList'][0]['project_completedTask']+'</span></h3>\
                                                <p class="text-muted font-15 mb-0">  Tasks Completed</p>\
                                            </div>\
                                        </div>\
                                    </div>\
                                    <div class="col-sm-6 col-xl-3">\
                                        <div class="card shadow-none m-0 border-start">\
                                            <div class="card-body text-center">\
                                                <i class="dripicons-dots-3 text-orange  " style="font-size: 24px;"></i>\
                                                <h3><span>'+response['taskDashList'][0]['project_ongoingTask']+'</span></h3>\
                                                <p class="text-muted font-15 mb-0">Task In-process</p>\
                                            </div>\
                                        </div>\
                                    </div>\
                                    <div class="col-sm-6 col-xl-3">\
                                        <div class="card shadow-none m-0 border-start">\
                                            <div class="card-body text-center">\
                                                <i class="dripicons-user-group text-primary" style="font-size: 24px;"></i>\
                                                <h3><span>'+response['taskDashList'][0]['project_todoTask']+'</span></h3>\
                                                <p class="text-muted font-15 mb-0">Task to-do</p>\
                                            </div>\
                                        </div>\
                                    </div>\
                                    <div class="col-sm-6 col-xl-3">\
                                        <div class="card shadow-none m-0 border-start">\
                                            <div class="card-body text-center">\
                                                <i class=" dripicons-view-list text-muted" style="font-size: 24px;"></i>\
                                                <h3><span>'+response['taskDashList'][0]['project_totalTask']+'</span>  </h3>\
                                                <p class="text-muted font-15 mb-0">Total Tasks</p>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                <div class="row">\
                         <div class="col-lg-6">\
                            <div class="card">\
                                <div class="card-body">\
                                    <div class="dropdown float-end">\
                                         <select class="form-control-light"><option>Overall</option><option>Last 7 days</option><option>Last 15 days</option><option>Last month</option></select>\
                                    </div>\
                                    <h4 class="header-title mb-4">Project Status</h4>\
                                    <div class="my-4 chartjs-chart" style="height: 250px;">\
                                        <canvas id="project-status-chart" data-colors="#0acf97,#ef890a,#fa5c7c,#727cf5"></canvas>\
                                    </div>\
                                    <div class="row text-center mt-2 py-2">\
                                        <div class="col-3">\
                                            <i class="mdi mdi-trending-up text-success mt-3 h3"></i>\
                                            <h3 class="fw-normal">\
                                                <span>'+response['taskDashList'][0]['project_completedTaskPercentage']+'%</span>\
                                            </h3>\
                                            <p class="text-muted mb-0">Completed</p>\
                                        </div>\
                                        <div class="col-3">\
                                            <i class="mdi mdi-trending-neutral  text-orange mt-3 h3"></i>\
                                            <h3 class="fw-normal">\
                                                <span>'+response['taskDashList'][0]['project_ongoingTaskPercentage']+'%</span>\
                                            </h3>\
                                            <p class="text-muted mb-0"> In-progress</p>\
                                        </div>\
                                        <div class="col-3">\
                                            <i class="mdi mdi-trending-down text-danger mt-3 h3"></i>\
                                            <h3 class="fw-normal">\
                                                <span>'+response['taskDashList'][0]['project_delayedTaskPercentage']+'%</span>\
                                            </h3>\
                                            <p class="text-muted mb-0"> Delayed</p>\
                                        </div>\
                                         <div class="col-3">\
                                            <i class="mdi mdi-trending-up text-primary mt-3 h3"></i>\
                                            <h3 class="fw-normal">\
                                                <span>'+response['taskDashList'][0]['project_todoTaskPercentage']+'%</span>\
                                            </h3>\
                                            <p class="text-muted mb-0"> To-do</p>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="col-lg-6">\
                          <div class="card">\
                            <div class="card-body">\
                                <div class="dropdown float-end">\
                                     <select class="form-control-light"><option>Overall</option><option>Last 7 days</option><option>Last 15 days</option><option>Last month</option></select>\
                                </div>\
                                <h4 class="header-title mb-4">Module Wise Progress</h4>\
                                <div class="mt-4">'+modulewisestr+'\
                                </div>\
                            </div>\
                           </div>\
                        </div>\
                    </div>';

                    // $('#project-status-chart').html('')
                    $('#task_dash_div').html('');
                    $('#task_dash_div').append(dataStr);

                    // -------------------------------------------------------------------------------------------------------------------------------
                    // -------------------------------------------------------------------------------------------------------------------------------
                    !(function (o) {
                        "use strict";
                        function t() {
                            (this.$body = o("body")), (this.charts = []);
                        }
                        (t.prototype.respChart = function (r, a, e, n) {
                            (Chart.defaults.global.defaultFontColor = "#8391a2"), (Chart.defaults.scale.gridLines.color = "#8391a2");
                            var i = r.get(0).getContext("2d"),
                                s = o(r).parent();
                            return (function () {
                                var t;
                                switch ((r.attr("width", o(s).width()), a)) {
                                    case "Line":
                                        t = new Chart(i, { type: "line", data: e, options: n });
                                        break;
                                    case "Bar":
                                        t = new Chart(i, { type: "bar", data: e, options: n });
                                        break;
                                    case "Doughnut":
                                        t = new Chart(i, { type: "doughnut", data: e, options: n });
                                }
                                return t;
                            })();
                        }),
                            (t.prototype.initCharts = function () {
                                var t,
                                    r,
                                    a,
                                    e = [];
                                return (
                                    0 < o("#task-area-chart").length &&
                                    ((t = {
                                        labels: [
                                            "Sprint 1",
                                            "Sprint 2",
                                            "Sprint 3",
                                            "Sprint 4",
                                            "Sprint 5",
                                            "Sprint 6",
                                            "Sprint 7",
                                            "Sprint 8",
                                            "Sprint 9",
                                            "Sprint 10",
                                            "Sprint 11",
                                            "Sprint 12",
                                            "Sprint 13",
                                            "Sprint 14",
                                            "Sprint 15",
                                            "Sprint 16",
                                            "Sprint 17",
                                            "Sprint 18",
                                            "Sprint 19",
                                            "Sprint 20",
                                            "Sprint 21",
                                            "Sprint 22",
                                            "Sprint 23",
                                            "Sprint 24",
                                        ],
                                        datasets: [
                                            {
                                                label: "This year",
                                                backgroundColor: o("#task-area-chart").data("bgcolor") || "#727cf5",
                                                borderColor: o("#task-area-chart").data("bordercolor") || "#727cf5",
                                                data: [16, 44, 32, 48, 72, 60, 84, 64, 78, 50, 68, 34, 26, 44, 32, 48, 72, 60, 74, 52, 62, 50, 32, 22],
                                            },
                                        ],
                                    }),
                                        e.push(
                                            this.respChart(o("#task-area-chart"), "Bar", t, {
                                                maintainAspectRatio: !1,
                                                legend: { display: !1 },
                                                tooltips: { intersect: !1 },
                                                hover: { intersect: !0 },
                                                plugins: { filler: { propagate: !1 } },
                                                scales: {
                                                    xAxes: [{ barPercentage: 0.7, categoryPercentage: 0.5, reverse: !0, gridLines: { color: "rgba(0,0,0,0.05)" } }],
                                                    yAxes: [{ ticks: { stepSize: 10, display: !1 }, min: 10, max: 100, display: !0, borderDash: [5, 5], gridLines: { color: "rgba(0,0,0,0)", fontColor: "#fff" } }],
                                                },
                                            })
                                        )),
                                    0 < o("#project-status-chart").length &&
                                    ((a = {
                                        labels: ["Completed", "In-progress", "Delayed", "To-do"],
                                        datasets: [{ data: dataArray, backgroundColor: (r = o("#project-status-chart").data("colors")) ? r.split(",") : ["#0acf97", "#ef890a", "#fa5c7c", "#727cf5"], borderColor: "transparent", borderWidth: "3" }],
                                    }),
                                        e.push(this.respChart(o("#project-status-chart"), "Doughnut", a, { maintainAspectRatio: !1, cutoutPercentage: 80, legend: { display: !1 } }))),
                                    e
                                );
                            }),
                            (t.prototype.init = function () {
                                var r = this;
                                (Chart.defaults.global.defaultFontFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'),
                                    (r.charts = this.initCharts()),
                                    o(window).on("resize", function (t) {
                                        o.each(r.charts, function (t, r) {
                                            try {
                                                r.destroy();
                                            } catch (t) { }
                                        }),
                                            (r.charts = r.initCharts());
                                    });
                            }),
                            (o.ChartJs = new t()),
                            (o.ChartJs.Constructor = t);
                    })(window.jQuery),
                        (function () {
                            "use strict";
                            window.jQuery.ChartJs.init();
                        })();

                }

                // ==============================================================================================
                //                               Task Overview Data
                // ==============================================================================================
                var projectDetails = '<div class="card d-block mt-3 p-3  "> \
                <div class="dropdown float-end">\
                     <a href="'+response['projectDetailsList'][0]['projectURL']+'" class="text-primary"><i class=" mdi mdi-eye me-1"></i>View Detail</a>\
                </div>\
                <h3 class="mt-0">\
                    '+response['projectDetailsList'][0]['projectName']+'\
                </h3>\
                <div class="badge bg-warning text-light mb-3">Ongoing</div>\
                   <div class="row">\
                    <div class="col-md-4">\
                        <div class="mb-2">\
                            <h5>Start Date</h5>\
                            <p>'+response['projectDetailsList'][0]['projectStartData']+'</p>\
                        </div>\
                    </div>\
                    <div class="col-md-4">\
                        <div class="mb-2">\
                            <h5>End Date</h5>\
                            <p>'+response['projectDetailsList'][0]['projectDueDate']+'</p>\
                        </div>\
                    </div>\
                    <div class="col-md-4">\
                        <h5 class="card-title mb-3">Progress <span class="float-end">'+response['projectDetailsList'][0]['projectProgress']+'%</span></h5>\
                        <div class="progress progress-sm">\
                            <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="'+response['projectDetailsList'][0]['projectProgress']+'" style="width: '+response['projectDetailsList'][0]['projectProgress']+'%;">\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                <h5 class="mt-3">Project Overview:</h5>\
                <p class="text-muted mb-2">'+response['projectDetailsList'][0]['projectDesc']+'\
                </p>\
            </div > ';


                $('#task_overview_div').html('');
                $('#task_overview_div').append(projectDetails);
                $('#spinner_dashboard').css('display', 'none');
                $('#spinner_overview').css('display', 'none');

                // ==============================================================================================
                // ==============================================================================================
                // $('#get_subModule_list').html('');
                // $('#get_subModule_list').append(dataStr);

            }
        });
        // --------------------------------------------------------
    }
}
// ###############################################################################################################
// ###############################################################################################################
function get_subModule_list() {
    var moduleFk = $('#get_subModule_list').val();

    if (moduleFk == 'All') {
        $('#subModuleDiv').css('pointer-events', 'none');
        $('#subModuleDiv').css('opacity', 0.3);

        return false;
    } else {
        $('#subModuleDiv').css('pointer-events', '');
        $('#subModuleDiv').css('opacity', 1);

        // ---------------  AJAX CALL  ----------------------------
        $.ajax({
            type: 'GET',
            url: "/project-management/get_selected_project_subModule_list/" + moduleFk,
            success: function (response) {
                if (response['response'].length > 0) {
                    var dataStr = '<option></option>';
                    for (var i = 0; i < response['response'].length; i++) {
                        var data = '<option value="' + response['response'][i]['subMod_id'] + '">' + response['response'][i]['subModuleName'] + '</option>';
                        dataStr = dataStr + data;
                    }
                } else {
                    var dataStr = '<option></option>';
                }
                $('#subMod').html('');
                $('#subMod').append(dataStr);
            }
        });
        // --------------------------------------------------------
    }
}
// ###############################################################################################################
// ###############################################################################################################
