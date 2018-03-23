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
		fields="__all__"

class RecipeSerializer(serializers.ModelSerializer):
	ingredients = RecipeIngredientSerializer(many=True)

	class Meta:
		model = Recipe
		fields="__all__"

	def create(self, validated_data):
		ingredients_data = validated_data.pop('ingredients')
		recipe = Recipe.objects.create(**validated_data)
		for ingredient_data in ingredients_data:
			ingredient_id = ingredient_data.pop('ingredient_id')
			ingredient = Ingredient.objects.get(id=ingredient_id)
			rcp_ing = recipe.recipe_ingredient_set.create(**ingredient_data)
			ingredient.recipe_ingredient_set.add(rcp_ing)
		return recipe