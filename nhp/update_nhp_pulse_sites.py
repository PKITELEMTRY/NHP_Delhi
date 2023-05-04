import json
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "nhp.settings")
import django
django.setup()

import sys
import anndata
import pandas as pd
import pysftp, os, random
import glob, shutil
from datetime import datetime
import time
from nhp_app.models import site, readings_2023
from datetime import datetime
import pytz
import shutil
import logging
from datetime import date, datetime

tz = pytz.timezone('Asia/Kolkata')
now = datetime.now(tz)
today = date.today().strftime("%d%b%Y")
current_datetime = datetime.now()

ts_now = current_datetime.strftime("%Y-%m-%d_%H:%M:%S")

FORMAT = "%(asctime)s - %(message)s"
logging.basicConfig(filename='/var/www/app/django_app/data_upload.log', filemode='a', format=FORMAT)
log = logging.getLogger()
log.setLevel(logging.INFO)

ARG_SITES = ["AAXI158", "AAXI025", "AAXI028", "AAXI165", "AAXI162", "AAXI153"]

for sites in  ARG_SITES:
    siteObj = site.objects.get(prefix = sites.lower())
    dataObjs = readings_2023.objects.filter(site_id=siteObj)
    for i in dataObjs:
        i.readings['pulse'] = i.readings['pulse']*0.5
        i.save()
