
from django.contrib import admin
from django.urls import path
from django.urls import include
from ml_server.chatbot.views import chatbot_query


urlpatterns = [
    path('admin/', admin.site.urls),
    path('chatbot/', chatbot_query),
]
