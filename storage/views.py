from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from storage.models import Champion
from storage.serializers import ChampionSerializers

# Create your views here.
class Champion_List(APIView):
  # permission_classes = (IsAuthenticated, )
  
  def get(self, request, format=None):
    champions = Champion.objects.all()
    serializer = ChampionSerializers(champions, many=True)
    return Response(serializer.data)
  
  def post(self, request, format=None):
    serializer = ChampionSerializers(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
class Champion_Detail(APIView):
  # permission_classes(isAuthenticated, )
  
  def get_object(self, id):
    try:
      return Champion.objects.get(id=id)
    except Champion.DoesNotExist:
      raise Http404
  
  def get(self, request, id, format=None):
    champion = self.get_object(id)
    serializer = ChampionSerializers(champion)
    return Response(serializer.data)
  
  def put(self, request, id, format=None):
    champion = self.get_object(id)
    serializer = ChampionSerializers(champion, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  def delete(self, request, id, format=None):
    champion = self.get_object(id)
    champion.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
    