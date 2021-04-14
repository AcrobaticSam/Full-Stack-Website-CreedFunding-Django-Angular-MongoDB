from django.conf.urls import url 
from campaigns import views 
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [ 
    url(r'^api/campaigns$', views.campaign_list),
    url(r'^api/campaigns/(?P<pk>[0-9]+)$', views.campaign_detail),
    url(r'^api/campaigns/published$', views.campaign_list_published),
    url(r'^SaveFile$', views.SaveFile)
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
