from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os
import re
import requests
from dotenv import load_dotenv


@api_view(['POST'])
def chatbot_query(request):
    load_dotenv()
    url = os.getenv("CHATBOT_URL")
    headers = {
        'Content-Type': 'application/json',
        'Authorization': os.getenv("CHATBOT_AUTH")
    }

    data = JSONParser().parse(request)
    response = requests.post(url, headers=headers, json=data)
    return JsonResponse(response.json(), safe=False)

