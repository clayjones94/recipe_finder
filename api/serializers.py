from rest_framework import serializers

from . models import Ingredient
from . models import Recipe
from . models import RecipeIngredient

class IngredientSerializer(serializers.ModelSerializer):

	class Meta:
		model=Ingredient
		fields="__all__"

class RecipeIngredientSerializer(serializers.ModelSerializer):

	class Meta:
		model=RecipeIngredient
		fields=('quantity', 'unit', 'ingredient')

class RecipeSerializer(serializers.ModelSerializer):
	recipe_ingredients = RecipeIngredientSerializer(many=True)

	class Meta:
		model = Recipe
		fields=('name', 'serving_size', 'cuisine', 'meal_type', 'recipe_ingredients')

	def create(self, validated_data):
		ingredients_data = validated_data.pop('recipe_ingredients')
		recipe = Recipe.objects.create(**validated_data)
		for ingredient_data in ingredients_data:
			rcp_ing = RecipeIngredient.objects.create(recipe=recipe, **ingredient_data)
		return recipe