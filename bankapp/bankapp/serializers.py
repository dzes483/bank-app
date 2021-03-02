from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from bankapp.models import Product, CustomUser


class TokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['role'] = user.role
        token['username'] = user.username

        return token


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ['name', 'age', 'student', 'income', 'slug']
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    last_login = serializers.SerializerMethodField()

    def get_last_login(self, user):
        last_login = CustomUser.objects.get(username=user).last_login
        if last_login is not None:
            return last_login.strftime('%y-%m-%d %a %H:%M:%S')
        return None

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'password', 'role', 'last_login']
