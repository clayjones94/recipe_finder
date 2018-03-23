# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class Ingredient(models.Model):
    nut_db_id = models.IntegerField()
    food_grp_code = models.IntegerField(default=0, null=True)
    long_desc = models.CharField(max_length=200, blank=True, default=None)
    short_desc = models.CharField(max_length=60, blank=True, default=None)
    common_name = models.CharField(max_length=100, blank=True, default=None)
    manufac_name = models.CharField(max_length=65, blank=True, default=None)
    ref_desc = models.CharField(max_length=135, blank=True, default=None)
    refuse = models.IntegerField(default=0, null=True)
    sci_name = models.CharField(max_length=65, blank=True, default=None)
    n_factor = models.DecimalField(max_digits=4, decimal_places=2, default=0.0, null=True)
    pro_factor = models.DecimalField(max_digits=4, decimal_places=2, default=0.0, null=True)
    fat_factor = models.DecimalField(max_digits=4, decimal_places=2, default=0.0, null=True)
    cho_factor = models.DecimalField(max_digits=4, decimal_places=2, default=0.0, null=True)

    def __str__(self):
        return self.short_desc

class Recipe(models.Model):
    name  = models.CharField(max_length=60)
    serving_size = models.IntegerField()
    cuisine = models.CharField(max_length=60)
    meal_type = models.CharField(max_length=60)

    def __str__(self):
        return self.name

class RecipeIngredient(models.Model):
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=4, decimal_places=2)
    unit = models.CharField(max_length=60)

    def __str__(self):
        return self.recipe + "<>" + self.ingredient