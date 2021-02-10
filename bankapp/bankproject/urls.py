from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView, RedirectView
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from bankapp import views
from bankapp.views import *


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'manage', views.ProductDetailViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/', include('rest_framework.urls')),
    path('api/login/', obtain_jwt_token),
    path('api/manage/add', views.ProductCreateViewSet.as_view()),
    path('api/products', views.ProductListViewSet.as_view()),
    path('api/refresh-token/', refresh_jwt_token)
]

urlpatterns += [
    re_path(r'(?P<path>.*)', FrontEndRenderView.as_view())
]
