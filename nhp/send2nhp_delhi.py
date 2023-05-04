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
from datetime import datetime
import pytz
import logging
from datetime import date, datetime
from django.utils import timezone
import ftplib

tz = pytz.timezone('Asia/Kolkata')
now = datetime.now(tz)
today = date.today().strftime("%d%b%Y")

# FORMAT = "%(asctime)s - %(message)s"
# logging.basicConfig(filename='/var/www/app/django_app/data_upload.log', filemode='a', format=FORMAT)
# log = logging.getLogger()
# log.setLevel(logging.INFO)

data_files = "/var/www/app/binserver/binserv/data/"
processed_data_folder = f"/var/www/app/binserver/binserv/processed_data/{today}"
site_processed_data_folder = f"/var/www/app/binserver/binserv/processed_data/{today}"

NHP_DELHI_HOST = "103.95.166.244"
NHP_DELHI_USER = "NHPDELHI"
NHP_DELHI_PASSWD = "Aaxis@123"
NHP_DELHI_FILE_PATH = "/FTP/raw_files/"

folders = [name for name in os.listdir(site_processed_data_folder) if os.path.isdir(os.path.join(site_processed_data_folder, name))]
print(folders)


def send2nhp_delhi(folder_path, files):
    fname = os.path.basename(files)
    try:
        session = ftplib.FTP(NHP_DELHI_HOST, NHP_DELHI_USER, NHP_DELHI_PASSWD)
        session.cwd(NHP_DELHI_FILE_PATH)
        file = open(files, 'rb')  # file to send
        session.storbinary(cmd='STOR %s' % fname,
                            fp=file)
        file.close()
        session.quit()
        print('%s sent to %s FTP' % (fname, NHP_DELHI_HOST))
    except FileNotFoundError:
        print('file missing now: %s' % fname)
    except:
        print(
            'error in sending %s to %s FTP' % (fname, NHP_DELHI_HOST))
    # try:
    #     ftp = FTP(NHP_DELHI_HOST)
    #     ftp.login(NHP_DELHI_USER, NHP_DELHI_PASSWD)
    #     print("Connection successfully established")

    #     ftp.cwd(NHP_DELHI_FILE_PATH)

    #     for f in files[:]:
    #         print('f files >>>> ',f)
    #         tmp_fpath = f
    #         local_file_path = f"{folder_path}{tmp_fpath}"
    #         if tmp_fpath:
    #             with open(local_file_path, 'rb') as file:
    #                 ftp.storbinary('STOR ' + tmp_fpath, file)
    #             print("%s file processed and data sent " % tmp_fpath)
    #             # cnopts = pysftp.CnOpts()
    #             # cnopts.hostkeys = None
    #             # try:
    #             #     with pysftp.Connection(host=NHP_DELHI_HOST,username=NHP_DELHI_USER,password=NHP_DELHI_PASSWD,port=22,cnopts=cnopts) as sftp:
    #             #         sftp.put(f"{NHP_DELHI_FILE_PATH}{tmp_fpath}")
    #             #     print("%s file processed and data sent " % tmp_fpath)
                        
    #             # except Exception as err:
    #             #     print('error in sending NHP ftp file: %s due to %s' % (tmp_fpath, err))
    #     ftp.quit()
    # except Exception as err:
    #     print('error in sending NHP ftp file due to %s' % err)


def main():
    for f in folders[:]:
        folder_path = f"{site_processed_data_folder}/{f}/"
        files = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]
        # print('files >>>> ',files)
        print('*'*100)
        send2nhp_delhi(folder_path, files)
        print('*'*100)


if __name__ == "__main__":
    print('Starting the process to send file')
    main()
    print('Files sent')

