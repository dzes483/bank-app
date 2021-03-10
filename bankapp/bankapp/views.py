from rest_framework import generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView

from bankapp.models import Product, CustomUser
from bankapp.serializers import UserSerializer, ProductSerializer, TokenSerializer


class TokenView(TokenObtainPairView):
    serializer_class = TokenSerializer


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
            if not student:
                queryset = queryset.filter(age__contains=[age], income__contains=[income], student__exact=student)
            else:
                queryset = queryset.filter(age__contains=[age], income__contains=[income])
        return queryset


class UserListView(generics.ListAPIView):
    """
    API endpoint that allows users to be viewed.
    """
    queryset = CustomUser.objects.all().order_by('username')
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
    queryset = CustomUser.objects.all()
    # permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'pk'
