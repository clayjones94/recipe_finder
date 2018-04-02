from django.conf.urls import url
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
	url(r'^ingredients/',views.IngredientList.as_view()),
	url(r'^recipes/',views.RecipeList.as_view()),
	url(r'^recipe/create',views.Recipe.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
