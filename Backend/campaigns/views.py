from django.shortcuts import render

# Create your views here.
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from campaigns.models import Campaign
from campaigns.serializers import CampaignSerializer
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage


@api_view(['GET', 'POST', 'DELETE'])
def campaign_list(request):
    if request.method == 'GET':
        campaigns = Campaign.objects.all()
        
        title = request.GET.get('title', None)
        if title is not None:
            campaigns = campaigns.filter(title__icontains=title)
        
        campaigns_serializer = CampaignSerializer(campaigns, many=True)
        return JsonResponse(campaigns_serializer.data, safe=False)
        # 'safe=False' for objects serialization
 
    elif request.method == 'POST':
        campaign_data = JSONParser().parse(request)
        campaign_serializer = CampaignSerializer(data=campaign_data)
        if campaign_serializer.is_valid():
            campaign_serializer.save()
            return JsonResponse(campaign_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(campaign_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        count = Campaign.objects.all().delete()
        return JsonResponse({'message': '{} Campaigns were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)
 
 
@api_view(['GET', 'PUT', 'DELETE'])
def campaign_detail(request, pk):
    try: 
        campaign = Campaign.objects.get(pk=pk) 
    except Campaign.DoesNotExist: 
        return JsonResponse({'message': 'The campaign does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        campaign_serializer = CampaignSerializer(campaign) 
        return JsonResponse(campaign_serializer.data) 
 
    elif request.method == 'PUT': 
        campaign_data = JSONParser().parse(request) 
        campaign_serializer = CampaignSerializer(campaign, data=campaign_data) 
        if campaign_serializer.is_valid(): 
            campaign_serializer.save() 
            return JsonResponse(campaign_serializer.data) 
        return JsonResponse(campaign_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        campaign.delete() 
        return JsonResponse({'message': 'Campaign was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    
        
@api_view(['GET'])
def campaign_list_published(request):
    campaigns = Campaign.objects.filter(published=True)
        
    if request.method == 'GET': 
        campaign_serializer = CampaignSerializer(campaigns, many=True)
        return JsonResponse(campaign_serializer.data, safe=False)

@csrf_exempt
def SaveFile(request):
    file=request.FILES['uploadedFile']
    file_name = default_storage.save(file.name,file)

    return JsonResponse(file_name,safe=False)        
    
