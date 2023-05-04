from django.db import models
from django.contrib.auth.models import User
import uuid
from jsonfield import JSONField

# state master
class state_master(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, primary_key=True,
                            max_length=120)
    name = models.CharField(max_length=64, unique=True,
                              verbose_name='State Name')
    
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.CharField(max_length=100)
    last_updated_at = models.DateTimeField(auto_now=True,blank=True,null=True)
    last_updated_by = models.CharField(max_length=100)


    def __str__(self) -> str:
        return self.name

# project master
class project_master(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, primary_key=True,
                            max_length=120)
    name = models.CharField(max_length=64, unique=True,
                              verbose_name='Project Name')
    described_name = models.CharField(max_length=250,
                              verbose_name='Project Described Name',blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.CharField(max_length=100)
    last_updated_at = models.DateTimeField(auto_now=True,blank=True,null=True)
    last_updated_by = models.CharField(max_length=100)


    def __str__(self) -> str:
        return self.name


# sites master
class site(models.Model):
    SITE_STATUS = (
        ("Live", "Live"),
        ("Delay", "Delay"),
        ("Offline", "Offline"),
        ("NAT", "NAT"),
        ("Disabled", "Disabled")
    )

    uuid = models.UUIDField(default=uuid.uuid4, primary_key=True,
                            max_length=120)
    name = models.CharField(max_length=150, null=True, blank=True)
    device_location = models.CharField(max_length=150, null=True, blank=True)
    prefix = models.CharField(max_length=64, unique=True,
                              verbose_name='prefix')
    status = models.CharField(max_length=10, choices=SITE_STATUS, default="NAT")
    tpro_prefix = models.CharField(max_length=64,
                              verbose_name='tpro_prefix', blank=True, null=True)
    project = models.ForeignKey(project_master, verbose_name="project", on_delete=models.CASCADE, blank=True, null=True)
    
    tpro_file_name = models.CharField(max_length=150, blank=True, null=True)
    last_reading_received_at = models.DateTimeField(blank=True,null=True)
    last_reading = models.TextField(null=True, blank=True)
    last_readings = JSONField(default=dict)
    total_params = JSONField(default=list)

    site_lattitude = models.CharField(max_length=100, blank=True, null=True)
    sit_longitude = models.CharField(max_length=100, blank=True, null=True)

    device_config = JSONField(default=dict)

    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.CharField(max_length=100, default='system/server')
    last_updated_at = models.DateTimeField(auto_now=True,blank=True,null=True)
    last_updated_by = models.CharField(max_length=100, default='system/server')

    def __str__(self) -> str:
        return f"{self.prefix} - {self.name}"


# user profile
class user_profile(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, primary_key=True,
                            max_length=120)
    user = models.OneToOneField(User, verbose_name="user", on_delete=models.CASCADE)
    state = models.ForeignKey(state_master, verbose_name="state", on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    city = models.CharField(max_length=100,blank=True,null=True)
    pincode = models.CharField(max_length=6,blank=True,null=True)
    contact = models.CharField(max_length=10,unique=True)
    alternate_contact = models.CharField(max_length=10,blank=True,null=True)
    address = models.TextField(blank=True,null=True)
    profile_image = models.ImageField(upload_to='Upload_Images/userProfileImages/',blank=True,null=True)
    allowed_sites = models.ManyToManyField(site, default=None)

    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.CharField(max_length=100)
    last_updated_at = models.DateTimeField(auto_now=True,blank=True,null=True)
    last_updated_by = models.CharField(max_length=100)



# reading model
class readings_2023(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, primary_key=True,
                            max_length=120)
    site_id = models.ForeignKey(site, verbose_name="site_id", on_delete=models.CASCADE)
    timestamp = models.DateTimeField()
    readings = JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)


    class Meta:
        unique_together = ('site_id', 'timestamp')