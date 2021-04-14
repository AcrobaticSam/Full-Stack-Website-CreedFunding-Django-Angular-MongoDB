from rest_framework import serializers 
from campaigns.models import Campaign

class CampaignSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Campaign
        fields = ('id',
                  'title',
                  'owner',
                  'description',
                  'category',
                  'subcategory',
                  'raisedAmmount',
                  'targetammount',
                  'backers',
                  'status',
                  'targetDate',
                  'published',
                  'comment',
                  'summary',
                  'details',
                  'intro',
                  'impact',
                  'PhotoFileName',
                  'PhotoFileName2',
                  'PhotoFileName3')
