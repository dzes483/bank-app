from django.contrib.auth.models import User, Group
from rest_framework import generics, permissions

from bankapp.models import Product
from bankapp.serializers import UserSerializer, GroupSerializer, ProductSerializer


class ProductCreateViewSet(generics.CreateAPIView):
    """
    API endpoint that allows products to be created.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class ProductDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that allows products to be viewed, edited, and deleted.
    """
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    # permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'slug'


class ProductListViewSet(generics.ListAPIView):
    """
    API endpoint that allows products to be viewed.
    """
    serializer_class = ProductSerializer

    def get_queryset(self):
        """
        Optionally restricts the products shown by filtering the query parameters in the URL.
        """
        queryset = Product.objects.all()
        age = self.request.query_params.get('age')
        income = self.request.query_params.get('income')
        student = self.request.query_params.get('student')
        if age or income or student:
            queryset = queryset.filter(age__contains=[age], income__contains=[income], student__exact=student)
        return queryset


class UserListView(generics.ListAPIView):
    """
    API endpoint that allows users to be viewed.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAuthenticated]


class UserCreateView(generics.CreateAPIView):
    """
    API endpoint that allows users to be created.
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class UserEditView(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that allows users to be viewed, edited, and deleted.
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()
    # permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'pk'


class GroupListView(generics.ListAPIView):
    """
    API endpoint that allows groups to be viewed.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    # permission_classes = [permissions.IsAuthenticated]


class GroupCreateView(generics.CreateAPIView):
    """
    API endpoint that allows groups to be created.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    # permission_classes = [permissions.IsAuthenticated]


class GroupEditView(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that allows groups to be viewed, edited, and deleted.
    """
    serializer_class = GroupSerializer
    queryset = Group.objects.all()
    # permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'pk'

# class FrontEndRenderView(TemplateView):
#     template_name = 'bankapp/index.html'
