from django.contrib.auth.models import User, Group, Permission
from rest_framework import serializers

from bankapp.models import Product


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ['name', 'age', 'student', 'income', 'slug']
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }


class GroupSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        return instance.name

    class Meta:
        model = Group
        fields = ['name']


class PermissionSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        return instance.name

    class Meta:
        model = Permission
        fields = ['name']


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    groups = GroupSerializer(read_only=True, many=True)
    user_permissions = PermissionSerializer(read_only=True, many=True)

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user

    class Meta:
        model = User
        fields = ['username', 'password', 'user_permissions', 'id', 'groups']

