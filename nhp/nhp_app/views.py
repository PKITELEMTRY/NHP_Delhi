from django.http.response import JsonResponse, HttpResponse
from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from nhp_app.models import *
from datetime import date, datetime
import pandas as pd
# from ..models.master_models import designation_Master

USER_LOGIN_MAP = {
    'delhi' : 'nhp-delhi',
    'shimla' : 'nhp-shimla',
    'super_admin' : 'admin',
}

def user_login(request):
    if request.method == 'GET':
        print('>>>>>>>>>>> ',request.user)
        if request.user:
            if request.user.is_superuser:
                return redirect('admin_dashboard')
            else:
                states = state_master.objects.all()
                return render(request,'authentication/login.html', {'states':states})
        states = state_master.objects.all()
        return render(request,'authentication/login.html', {'states':states})

    # if request.method == 'POST':
    #     username = request.POST['emailaddress']
    #     password = request.POST['password']
    #     state = request.POST['nhp-state']

    #     userFK = authenticate(username=username, password=password)
    #     if userFK is not None:
    #         if(userFK.is_superuser):
    #             if(state == 'admin'):
    #                 login(request, userFK)
    #                 return redirect('admin_dashboard')
    #             else:
    #                 messages.success(request,'Invalid credentials')
    #                 return redirect('user_login')
    #         else:
    #             user_prof = user_profile.objects.get(user=userFK)
    #             if user_prof.state.name == state:
    #                 login(request, userFK)
    #                 return redirect('admin_dashboard')
    #             else:
    #                 messages.success(request,'Invalid credentials')
    #                 return redirect('user_login')
    #     else:
    #         messages.success(request,'Invalid credentials')
    #         return redirect('user_login')
    if request.method == 'POST':
        username = request.POST['emailaddress']
        password = request.POST['password']

        userFK = authenticate(username=username, password=password)
        if userFK is not None:
            if(userFK.is_superuser):
                login(request, userFK)
                return redirect('admin_dashboard')
            elif(userFK.is_active):
                login(request, userFK)
                return redirect('admin_dashboard')
            else:
                messages.success(request,'Invalid credentials')
                return redirect('user_login')
        else:
            messages.success(request,'Invalid credentials')
            return redirect('user_login')



@login_required(login_url='/')
def update_site_detail(request, uuid):
    if request.method == 'GET':
        siteObj = site.objects.get(uuid=uuid)
        projects = project_master.objects.all()
        return render(request,'admin/bin_serv/edit_detail.html', {'siteObj':siteObj,'projects':projects})
    if request.method == 'POST':
        dev_name = request.POST.get('dev_name',' ')
        dev_loc = request.POST.get('dev_loc',' ')
        dev_lat = request.POST.get('dev_lat',' ')
        dev_lon = request.POST.get('dev_lon',' ')
        tpro_prfx = request.POST.get('tpro_prfx',' ')
        tpro_file = request.POST.get('tpro_file',' ')
        dev_proj = request.POST.get('dev_proj',' ')
        pos1 = request.POST.get('pos1',' ')
        pos2 = request.POST.get('pos2',' ')
        pos3 = request.POST.get('pos3',' ')
        pos4 = request.POST.get('pos4',' ')
        pos5 = request.POST.get('pos5',' ')
        pos6 = request.POST.get('pos6',' ')
        pos7 = request.POST.get('pos7',' ')
        pos8 = request.POST.get('pos8',' ')
        pos9 = request.POST.get('pos9',' ')
        pos10 = request.POST.get('pos10',' ')

        try:
            siteObj = site.objects.get(uuid=uuid)
            deviceCong = {
                            "device" : siteObj.prefix.lower(),
                            "location" : dev_loc,
                            "sensor_position" : {
                                "0" : "timestamp",
                                "1" : "count",
                                "2" : pos1,
                                "3" : pos2,
                                "4" : pos3,
                                "5" : pos4,
                                "6" : pos5,
                                "7" : pos6,
                                "8" : pos7,
                                "9" : pos8,
                                "10" : pos9,
                                "11" : pos10,
                            }
                        }
            paramList = []
            if pos1:
                paramList.append(pos1)
            if pos2:
                paramList.append(pos2)
            if pos3:
                paramList.append(pos3)
            if pos4:
                paramList.append(pos4)
            if pos5:
                paramList.append(pos5)
            if pos6:
                paramList.append(pos6)
            if pos7:
                paramList.append(pos7)
            if pos8:
                paramList.append(pos8)
            if pos9:
                paramList.append(pos9)
            if pos10:
                paramList.append(pos10)

            siteList = siteObj.total_params
            for i in paramList:
                siteList.append(i)
            siteList = list(set(siteList))
            siteObj.name = dev_name
            siteObj.tpro_file_name = tpro_file
            if dev_proj:
                projectObj = project_master.objects.get(uuid=dev_proj)
                siteObj.project = projectObj

            siteObj.total_params = siteList
            siteObj.device_location = dev_loc
            siteObj.tpro_prefix = tpro_prfx
            siteObj.site_lattitude = dev_lat
            siteObj.sit_longitude = dev_lon
            siteObj.device_config = deviceCong
            siteObj.last_updated_by = request.user.email
            siteObj.save()
            return JsonResponse({'response':'Site updated successfully.'})

        except Exception as err:
            print(f'Error occured due to : {err}')
            return JsonResponse({'response':str(err)})


@login_required(login_url='/')
def site_data(request, uuid):
    if request.method == 'GET':
        siteObj = site.objects.get(uuid=uuid)
        readings_obj = readings_2023.objects.filter(site_id=siteObj).order_by('-timestamp')
        if readings_obj:
            df = pd.DataFrame(list(readings_obj.values()))
            df = df.drop("uuid", axis=1)
            df = df.drop("site_id_id", axis=1)
            df = df.drop("created_at", axis=1)

            df = pd.concat([df.drop(['readings'], axis=1), df['readings'].apply(pd.Series)], axis=1)

            if('errorparam' in df.columns):
                df.drop('errorparam', axis=1, inplace=True)
            
            if('counter' in df.columns):
                df.drop('counter', axis=1, inplace=True)

            if('level1' in df.columns):
                df.drop('level1', axis=1, inplace=True)
            
            if('level2' in df.columns):
                df.drop('level2', axis=1, inplace=True)

            # if('pulse' in df.columns):
            #     df['pulse'] = df['pulse']*0.5
            
            df1 = df.to_dict('records')

            cols = list(df.columns.values)
            print('cols >>> \n',cols,type(cols))
            new_cols = []
            for col in cols:
                if col != "timestamp":
                    new_cols.append(col)
            print('new_cols >>> \n',new_cols)
            print('df >>> \n',df1)
        else:
            df1 = {}
            new_cols = []

        return render(request,'admin/bin_serv/site_data.html', {'siteObj':siteObj,'readings_obj':df1,'cols':new_cols})

import pytz
tz = pytz.timezone('Asia/Kolkata')
now = datetime.now(tz)
@login_required(login_url='/')
def export_data(request, uuid):
    if request.method == 'GET':
        siteObj = site.objects.get(uuid=uuid)
        readings_obj = readings_2023.objects.filter(site_id=siteObj).order_by('-timestamp')
        if readings_obj:
            df = pd.DataFrame(list(readings_obj.values()))
            df = df.drop("uuid", axis=1)
            df = df.drop("site_id_id", axis=1)
            df = df.drop("created_at", axis=1)
            df = pd.concat([df.drop(['readings'], axis=1), df['readings'].apply(pd.Series)], axis=1)

            if('errorparam' in df.columns):
                df.drop('errorparam', axis=1, inplace=True)
            
            if('counter' in df.columns):
                df.drop('counter', axis=1, inplace=True)
            
            if('level1' in df.columns):
                df.drop('level1', axis=1, inplace=True)
            
            if('level2' in df.columns):
                df.drop('level2', axis=1, inplace=True)

        else:
            df = {}
            new_cols = []

        csv_data = df.to_csv(index=False)
        current_datetime = datetime.now(tz)
        ts_now = current_datetime.strftime("%Y%m%d_%H%M%S")
        response = HttpResponse(csv_data, content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="%s_%s.csv"' % (siteObj.prefix, ts_now)
        return response



@login_required(login_url='/')
def projects_list(request):
    if request.method == 'GET':
        project_obj = project_master.objects.all()
        return render(request,'admin/bin_serv/project-list.html', {'project_obj':project_obj})



@login_required(login_url='/')
def profile(request):
    if request.method == 'GET':
        project_obj = project_master.objects.all()
        return render(request,'admin/bin_serv/edit-profile.html', {'project_obj':project_obj})


@login_required(login_url='/')
def latest_logs(request,uuid):
    if request.method == 'GET':
        project_obj = project_master.objects.all()
        return render(request,'admin/bin_serv/lates-logs.html', {'project_obj':project_obj})



@login_required(login_url='/')
def user_logout(request):
    if request.method == 'GET':
        logout(request)
        return redirect('user_login')




@login_required(login_url='/')
def admin_dashboard(request):
    if request.method == 'GET':
        if request.user.is_superuser:
            project_obj = project_master.objects.all()
            sites = site.objects.all().order_by("-last_reading_received_at")
            non_tpro_sites = len(site.objects.filter(tpro_prefix = None) | site.objects.filter(tpro_prefix = ''))
            tpro_sites = len(sites) - non_tpro_sites

            non_configured_sites = len(site.objects.filter(last_reading = None) | site.objects.filter(last_reading = ''))
            configured_sites = len(sites) - non_configured_sites

            live_cnt = len(site.objects.filter(status = "Live"))
            delay_cnt = len(site.objects.filter(status = "Delay"))
            offline_cnt = len(site.objects.filter(status = "Offline"))
            disabled_cnt = len(site.objects.filter(status = "Disabled"))
            nat_cnt = len(site.objects.filter(status = "NAT"))

            return render(request,'admin/dashboard.html', {'project_obj':project_obj,'sites':sites,'tpro_sites':tpro_sites,'non_tpro_sites':non_tpro_sites,'non_configured_sites':non_configured_sites,'configured_sites':configured_sites,"live_cnt":live_cnt,"delay_cnt":delay_cnt,"offline_cnt":offline_cnt,"disabled_cnt":disabled_cnt,"nat_cnt":nat_cnt})
        

        else:
            project_obj = project_master.objects.all()
            sites = site.objects.filter(project__name="NHP- Delhi").order_by("-last_reading_received_at")
            non_tpro_sites = len(site.objects.filter(tpro_prefix = None) | site.objects.filter(tpro_prefix = ''))
            tpro_sites = len(sites) - non_tpro_sites

            non_configured_sites = len(site.objects.filter(last_reading = None) | site.objects.filter(last_reading = ''))
            configured_sites = len(sites) - non_configured_sites

            live_cnt = len(site.objects.filter(status = "Live", project__name="NHP- Delhi"))
            delay_cnt = len(site.objects.filter(status = "Delay", project__name="NHP- Delhi"))
            offline_cnt = len(site.objects.filter(status = "Offline", project__name="NHP- Delhi"))
            disabled_cnt = len(site.objects.filter(status = "Disabled", project__name="NHP- Delhi"))
            nat_cnt = len(site.objects.filter(status = "NAT", project__name="NHP- Delhi"))

            return render(request,'admin/dashboard.html', {'project_obj':project_obj,'sites':sites,'tpro_sites':tpro_sites,'non_tpro_sites':non_tpro_sites,'non_configured_sites':non_configured_sites,'configured_sites':configured_sites,"live_cnt":live_cnt,"delay_cnt":delay_cnt,"offline_cnt":offline_cnt,"disabled_cnt":disabled_cnt,"nat_cnt":nat_cnt})


        # if request.user.is_superuser:
        #     project_obj = project_master.objects.all()
        #     sites = site.objects.all().order_by("-last_reading_received_at")
        #     non_tpro_sites = len(site.objects.filter(tpro_prefix = None) | site.objects.filter(tpro_prefix = ''))
        #     tpro_sites = len(sites) - non_tpro_sites

        #     non_configured_sites = len(site.objects.filter(last_reading = None) | site.objects.filter(last_reading = ''))
        #     configured_sites = len(sites) - non_configured_sites
        #     return render(request,'admin/dashboard.html', {'project_obj':project_obj,'sites':sites,'tpro_sites':tpro_sites,'non_tpro_sites':non_tpro_sites,'non_configured_sites':non_configured_sites,'configured_sites':configured_sites})
        # else:
        #     project_obj = project_master.objects.all()
        #     sites = site.objects.all().order_by("-last_reading_received_at")
        #     non_tpro_sites = len(site.objects.filter(tpro_prefix = None) | site.objects.filter(tpro_prefix = ''))
        #     tpro_sites = len(sites) - non_tpro_sites

        #     non_configured_sites = len(site.objects.filter(last_reading = None) | site.objects.filter(last_reading = ''))
        #     configured_sites = len(sites) - non_configured_sites
        #     return render(request,'admin/dashboard.html', {'project_obj':project_obj,'sites':sites,'tpro_sites':tpro_sites,'non_tpro_sites':non_tpro_sites,'non_configured_sites':non_configured_sites,'configured_sites':configured_sites})
