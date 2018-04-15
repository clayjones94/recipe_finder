# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
from django.db.models import Q

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from . models import Ingredient
from . models import Recipe
from . models import RecipeIngredient

from . serializers import IngredientSerializer
from . serializers import RecipeSerializer
from . serializers import RecipeIngredientSerializer

class SuggestIngredients(APIView):
	def get(self, request):
		query = request.GET.get('q')
		igts = Ingredient.objects.filter(Q(long_desc__icontains=query) | Q(short_desc__icontains=query))[:5]
		serializer = IngredientSerializer(igts, many=True)
		return Response(serializer.data)

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

class Recipe(APIView):
	def post(self, request):
		serializer = RecipeSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)