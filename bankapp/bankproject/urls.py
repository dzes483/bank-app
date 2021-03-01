from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from bankapp import views
from bankapp.views import TokenView

urlpatterns = [
    path('api/login', TokenView.as_view()),
    path('api/refresh_jwt_token', TokenRefreshView.as_view()),
    path('admin/', admin.site.urls),
    path('api/', include('rest_framework.urls')),
    path('api/manage/add', views.ProductCreateViewSet.as_view()),
    path('api/manage/<slug:slug>', views.ProductDetailViewSet.as_view()),
    path('api/manage/users/<pk>', views.UserEditView.as_view()),
    path('api/manage', views.ProductListViewSet.as_view()),
    path('api/products/search', views.ProductListViewSet.as_view()),
    path('api/products', views.ProductListViewSet.as_view()),
    path('api/register', views.UserCreateView.as_view()),
    path('api/users', views.UserListView.as_view()),
]

# urlpatterns += [
#     re_path(r'(?P<path>.*)', FrontEndRenderView.as_view())
# ]
