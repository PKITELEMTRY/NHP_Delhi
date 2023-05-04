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

import ftplib
import csv

tz = pytz.timezone('Asia/Kolkata')
now = datetime.now(tz)
today = date.today().strftime("%d%b%Y")
current_datetime = datetime.now()

ts_now = current_datetime.strftime("%Y-%m-%d_%H:%M:%S")

FORMAT = "%(asctime)s - %(message)s"
logging.basicConfig(filename='/var/www/app/django_app/data_upload.log', filemode='a', format=FORMAT)
log = logging.getLogger()
log.setLevel(logging.INFO)

# file_path = "/home/ubuntu/aaxisnano/devices.json"

data_files = "/var/www/app/binserver/binserv/data/"
processed_data_folder = f"/var/www/app/binserver/binserv/processed_data/{today}"
site_processed_data_folder = f"/var/www/app/binserver/binserv/processed_data/{today}"

#data_files = "/home/rohit/Desktop/nhp_projects/nhp/git/bin.-server-portal/nhp/data_folder/"
all_adata_files = glob.glob(data_files + "*.adata")


if not os.path.exists(processed_data_folder):
    try:
        os.mkdir(processed_data_folder)
        log.info(f"Folder {processed_data_folder} created successfully.")
    except OSError:
        log.exception(f"Creation of folder {processed_data_folder} failed.")


# check for site in DB
def _check4site(fprefix):
    log.info(f'[PREFIX CHECK] ... checking {fprefix.upper()} for existance')
    if(site.objects.filter(prefix=fprefix)):
        log.warning(f'[WARNING] ... {fprefix.upper()} device already exist')
        siteObj = site.objects.get(prefix=fprefix)
        # siteObj.device_config = deviceCong
        siteObj.total_params = ['timestamp', 'count']
        siteObj.save()

        params_labels = _get_param_labels(siteObj)
        return site.objects.filter(prefix=fprefix)[0], params_labels
    else:
        try:
            deviceCong = {
                            "device" : fprefix,
                            "location" : "",
                            "sensor_position" : {
                                "0" : "timestamp",
                                "1" : "count",
                                "2" : "",
                                "3" : "",
                                "4" : "",
                                "5" : "",
                                "6" : "",
                                "7" : "",
                                "8" : "",
                                "9" : "",
                                "10" : "",
                                "11" : "",
                            }
                        }

            siteObj = site(name = "",
                            device_location = "",
                            prefix = fprefix,
                            tpro_prefix = "",
                            site_lattitude = "",
                            sit_longitude = "",
                            device_config = deviceCong,
                            total_params = ['timestamp', 'count']
                            )
            siteObj.save()
            log.info(f'[OK] ... {fprefix.upper()}  device created successfully')
            params_labels = _get_param_labels(siteObj)
        except Exception as err:
            log.error(f'[ERROR] ... Error occured while add new device : {err}')
            return None, []
        return siteObj, params_labels


# upload data to DB
def _upload2db(site_obj, dic_readings, filepath, file_name):
    try:
        log.info(f'[READINGS STARTS] ... {fprefix.upper()}  readings starts')
        for new_readings in dic_readings:
            param_read = new_readings
            if "pulse" in param_read:
                param_read['pulse'] = param_read['pulse']*0.5

            ts = new_readings['timestamp']
            del param_read['timestamp']
            log.info(f"{ts}  ---> {new_readings}")
            try:
                reading_obj = readings_2023(site_id=site_obj,
                                        timestamp = ts,
                                        readings = new_readings)
                reading_obj.save()
                site_obj.last_reading_received_at = ts
                site_obj.last_readings = new_readings
                site_obj.save()

            except Exception as err:
                log.error(f'[ERROR] ... Error on adding new reading to db : {err}')
        log.info(f'[READINGS ENDS] ... {fprefix.upper()}  readings ends')
        try:
            site_directory = f"{site_processed_data_folder}/{fprefix.upper()}"
            if not os.path.exists(site_directory):
                try:
                    os.mkdir(site_directory)
                    log.info(f"Folder {site_directory} created successfully.")
                    try:
                        new_file_name = f"{site_directory}/{file_name}_{ts_now}"
                        # try:
                        #     send2nhp_delhi(filepath, f"{file_name}_{ts_now}")
                        # except Exception as err:
                        #     log.error(f'[FTP ERROR] ... Error in sending file due to: {err}')

                        shutil.move(filepath, os.path.join(os.path.dirname(filepath), new_file_name))
                        shutil.move(new_file_name, site_directory)
                        log.info(f'[FILE MOVED] ... {filepath} moved to {site_directory} successfully')
                    except Exception as err:
                        log.error(f'[ERROR] ... Error on renaming file due to: {err}')
                except OSError:
                    log.error(f'[ERROR] ... Error on moving file to processed folder due to: {err}')
            else:
                try:
                    new_file_name = f"{site_directory}/{file_name}_{ts_now}"
                    # try:
                    #     send2nhp_delhi(filepath, f"{file_name}_{ts_now}")
                    # except Exception as err:
                    #     log.error(f'[FTP ERROR] ... Error in sending file due to: {err}')

                    shutil.move(filepath, os.path.join(os.path.dirname(filepath), new_file_name))
                    shutil.move(new_file_name, site_directory)
                    log.info(f'[FILE MOVED] ... {filepath} moved to {site_directory} successfully')
                except Exception as err:
                    log.error(f'[ERROR] ... Error on renaming file due to: {err}')
                
        except Exception as err:
            log.exception(f"Creation of folder {site_directory} failed.")

        return True
    except Exception as err:
        return False


NHP_DELHI_HOST = "103.95.166.244"
NHP_DELHI_USER = "NHPDELHI"
NHP_DELHI_PASSWD = "Aaxis@123"
NHP_DELHI_FILE_PATH = "/FTP/raw_files/"
# send file2Nhp Delhi
def send2nhp_delhi(readings_df, new_file_name, field_names):
    try:
        items_to_remove = ['count', 'errorparam']
        field_names = [item for item in field_names if item not in items_to_remove]
        log.info('readings_df >>> %s' % readings_df)
        log.info('field_names >>> %s' % field_names)
        filename = f"{new_file_name}.csv"
        try:
            filename2send = f"{filename}"
            log.info('new_file_name >>> %s' % new_file_name)
            # readings_df.to_csv(f'{file_name}_{ts_now}', index=False)
            with open(filename2send, 'w') as csvfile:
                writer = csv.DictWriter(csvfile, fieldnames = field_names)
                writer.writeheader()
                writer.writerows(readings_df)
            log.info("file created successfully")
        except Exception as err:
            log.error("file not creadted due to %s" % err)
        

        fname = os.path.basename(filename2send)
        try:
            session = ftplib.FTP(NHP_DELHI_HOST, NHP_DELHI_USER, NHP_DELHI_PASSWD)
            session.cwd(NHP_DELHI_FILE_PATH)
            file = open(filename2send, 'rb')  # file to send
            session.storbinary(cmd='STOR %s' % fname,
                                fp=file)
            file.close()
            session.quit()
            print('%s sent to %s FTP' % (fname, NHP_DELHI_HOST))
        except FileNotFoundError:
            print('file missing now: %s' % fname)
        except Exception as err:
            print(
                'error in sending %s to %s FTP due to %s' % (fname, NHP_DELHI_HOST, err))

    except Exception as err:
        log.error("Connection not established due to %s" % err)

    # try:
    #     # Navigate to the remote directory where you want to upload files
    #     ftp.cwd(NHP_DELHI_FILE_PATH)
    #     log.info("directory successfully changed")
    # except Exception as err:
    #     log.error("directory not change due to %s" % err)

    # try:
    #     # Upload a file to the remote server
    #     local_file_path = filepath
    #     remote_file_name = new_file_name
    #     with open(local_file_path, 'rb') as file:
    #         ftp.storbinary('STOR ' + remote_file_name, file)

    #     # Close the FTP connection
    #     ftp.quit()
    #     log.info("file successfully transfered to %s" % NHP_DELHI_HOST)
    # except Exception as err:
    #     log.error("file not transfered due to %s" % err)


# get params label
def _get_param_labels(siteObj):
    data = siteObj.device_config['sensor_position']
    context_list = []
    for k, v in data.items():
        if v:
            context_list.append(v)
    return context_list


log.info("+"*100)
log.info("+"*100)
for f in all_adata_files[:]:
    fprefix = f.split('/')[-1].split('.')[0].lower()
    file_name = f.split('/')[-1]
    log.info(f'[STATION PREFIX] ... {fprefix.upper()}')
    site_obj, df_labels = _check4site(fprefix)
    if site_obj and df_labels:
        log.info(f'[STATION NAME] ... {site_obj}')
        log.info(f'[DATAFRAME LABELS] ... {df_labels}')
        filepath = os.path.join(data_files, os.path.basename(f))
        '''
        print("filepath ---> ",filepath)
        '''
        log.info(f'[FILEPATH] ... {filepath}')
        time.sleep(0.1)
        try:
            sample_df = pd.read_csv(filepath)
            df = pd.read_csv(filepath, names=df_labels)
        except pd.errors.EmptyDataError as err:
            log.error(f'[ERROR] ... File is empty \n{err}')
        except pd.errors.ParserError as err:
            log.error(f'[ERROR] ... No columns to parse from file \n{err}')
        else:
            df_col_count = len(df.columns)
            sample_df_col_count = len(sample_df.columns)
            '''
            print('df >>> \n',sample_df.head(1))
            '''
            if (df_col_count == sample_df_col_count):
                df = df.drop('count', axis=1)
                df = df.drop('errorparam', axis=1)
                '''
                print('df >>> \n',df.head())
                print('sample_df_col_count >>> ',sample_df_col_count)
                '''
                readings_df = df.to_dict(orient='records')
                readings_df1 = df.to_dict(orient='records')
                if readings_df:
                    _upload2db(site_obj, readings_df, filepath, file_name)

                    try:
                        send2nhp_delhi(readings_df1, f"{file_name}_{ts_now}", df_labels)
                        log.error(f'[FTP Success] ... file send successfully')
                    except Exception as err:
                        log.error(f'[FTP ERROR] ... Error in sending file due to: {err}')

                else:
                    log.warning("[WARNING] ... Empty dataframe")
            else:
                log.info("+-"*50)
                log.error('[ERROR] ... Site params not configured properly! .... plss configure it to process data.')
                log.info("+-"*50)
    else:
        log.error(f'[ERROR] ... Unable to process data. [site_obj:{site_obj} and df_labels:{df_labels}]')
    log.info("+"*100)
log.info("PROCESS COMPLETED :)")
log.info("+"*100)




