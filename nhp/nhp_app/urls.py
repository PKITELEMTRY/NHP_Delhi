from django.urls import path
from nhp_app.views import *


urlpatterns = [
    path('', user_login,name='user_login'),
    path('user_logout', user_logout,name='user_logout'),
    path('dashboard', admin_dashboard,name='admin_dashboard'),
    path('update-site-detail/<uuid:uuid>', update_site_detail,name='update_site_detail'),
    path('site-data/<uuid:uuid>', site_data,name='site_data'),


    path('projects-list', projects_list,name='projects_list'),

    # path('restricted-access', unautorizedaccess,name='unautorizedaccess'),


    # path('change-password', change_password,name='change_password'),
    path('latest_logs/<uuid:uuid>', latest_logs,name='latest_logs'),

    path('export_data/<uuid:uuid>', export_data,name='export_data'),

    path('user-profile', profile,name='profile'),

]