from django.contrib import admin
from nhp_app.models import *
# Register your models here.


@admin.register(state_master)
class state_master(admin.ModelAdmin):
    list_display = ('uuid','name','created_at','created_by','last_updated_at','last_updated_by')
    list_filter = ['created_by','last_updated_by']

@admin.register(project_master)
class project_master(admin.ModelAdmin):
    list_display = ('uuid','name','created_at','created_by','last_updated_at','last_updated_by')
    list_filter = ['created_by','last_updated_by']


@admin.register(site)
class site(admin.ModelAdmin):
    list_display = ('uuid','name','prefix','project','created_at','created_by','last_updated_at','last_updated_by')
    list_filter = ['created_by','last_updated_by']


@admin.register(user_profile)
class user_profile(admin.ModelAdmin):
    list_display = ('uuid','user','name','contact','created_at','created_by','last_updated_at','last_updated_by')
    list_filter = ['created_by','last_updated_by']


@admin.register(readings_2023)
class readings_2023(admin.ModelAdmin):
    list_display = ('uuid','site_id','timestamp','readings','created_at')
