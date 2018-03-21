from rest_framework import serializers

from . models import Ingredient
from . models import Recipe
from . models import RecipeIngredient

class IngredientSerializer(serializers.ModelSerializer):

	class Meta:
		model=Ingredient
		fields="__all__"

class RecipeSerializer(serializers.ModelSerializer):

	class Meta:
		model=Recipe
		fields="__all__"

class RecipeIngredientSerializer(serializers.ModelSerializer):

	class Meta:
		model=RecipeIngredient
		fields="__all__"