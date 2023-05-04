import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "nhp.settings")
import django
django.setup()

from datetime import datetime
import time
from nhp_app.models import site, readings_2023
from datetime import datetime
import pytz
from django.utils import timezone
import logging


FORMAT = "%(asctime)s - %(message)s"
logging.basicConfig(filename='/var/www/app/django_app/site_status_update.log', filemode='a', format=FORMAT)
log = logging.getLogger()
log.setLevel(logging.INFO)


# tz = pytz.timezone('Asia/Kolkata')
# now = datetime.now(tz)
now = timezone.now()


all_sites = site.objects.all().order_by('name')

for site_obj in all_sites:
    if(site_obj.last_reading_received_at != None):
        last_reading_ts = site_obj.last_reading_received_at
        last_reading_ts = timezone.localtime(last_reading_ts)
        duration = now - last_reading_ts 
        duration_in_s = duration.total_seconds() 
        hours = divmod(duration_in_s, 3600)[0] 
        if(int(hours) >= int(4) and int(hours) < int(36)):
            site_obj.status = 'Delay' 
        elif(int(hours) >= int(36)):
            site_obj.status = 'Offline'
        else:
            site_obj.status = 'Live'
        site_obj.save()
        log.info(f"{site_obj.prefix.upper()} - prefix status updated to : {site_obj.status}")