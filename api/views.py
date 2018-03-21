# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from . models import Ingredient
from . models import Recipe
from . models import RecipeIngredient

from . serializers import IngredientSerializer
from . serializers import RecipeSerializer
from . serializers import RecipeIngredientSerializer

class IngredientList(APIView):
	def get(self, request):
		igts = Ingredient.objects.all()
		serializer = IngredientSerializer(igts, many=True)
		return Response(serializer.data)

class RecipeList(APIView):
	def get(self, request):
		rcps = Recipe.objects.all()
		serializer = RecipeSerializer(rcps, many=True)
		return Response(serializer.data)

	def post(self, request):
		serializer = RecipeSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
