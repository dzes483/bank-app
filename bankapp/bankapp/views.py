from django.contrib.auth.models import User, Group
from django.views.generic.base import TemplateView
from rest_framework import viewsets, mixins, generics
# import django_filters.rest_framework

from bankapp.models import Product
from bankapp.serializers import UserSerializer, GroupSerializer, ProductSerializer


class ProductCreateViewSet(mixins.CreateModelMixin, generics.GenericAPIView):
    """
    API endpoint that allows products to be created.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class ProductDetailViewSet(viewsets.ModelViewSet):
    """
    A simple viewset for viewing and editing products.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'slug'


class ProductListViewSet(generics.ListAPIView):
    """
    API endpoint that allows products to be viewed.
    """
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    # def get_queryset(self):
    #     """
    #     Optionally restricts the products shown by filtering the query parameters in the URL.
    #     """
    #     age = self.request.query_params.get('age')
    #     income = self.request.query_params.get('income')
    #     student = self.request.query_params.get('student')
    #     params = [age, income, student]
    #     if params:
    #         queryset = queryset.filter(age__contains=age, income__contains=income, student__exact=student)
    #     return queryset


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    # permission_classes = [permissions.IsAuthenticated]


# class FrontEndRenderView(TemplateView):
#     template_name = 'bankapp/index.html'
