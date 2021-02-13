from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from bankapp import views


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/', include('rest_framework.urls')),
    path('api/login/', obtain_jwt_token),
    path('api/manage', views.ProductListViewSet.as_view()),
    path('api/manage/<slug:slug>', views.ProductDetailViewSet.as_view()),
    path('api/manage/add', views.ProductCreateViewSet.as_view()),
    path('api/products', views.ProductListViewSet.as_view()),
    path('api/products/search', views.ProductListViewSet.as_view()),
    path('api/refresh-token/', refresh_jwt_token)
]

# urlpatterns += [
#     re_path(r'(?P<path>.*)', FrontEndRenderView.as_view())
# ]
