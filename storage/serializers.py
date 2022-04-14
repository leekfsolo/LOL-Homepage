from rest_framework import serializers

from storage.models import Champion

class ChampionSerializers(serializers.ModelSerializer):
  class Meta:
    model = Champion
    fields = ('name', 'region', 'image', 'imagePosition')