from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status

from .models import Script, Test 
from .serializers import ScriptSerializer

from rest_framework.decorators import action, authentication_classes, permission_classes, api_view
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import redirect
from django.http import JsonResponse

from .utils.udfs import documentScriptElements, formatRes
from datetime import datetime as dt

available_languages = ['fr','it','en']

# Create your views here.

@api_view(['POST'])
@authentication_classes([TokenAuthentication, ] )
@permission_classes([IsAuthenticated,])
def dtProject(request) :
    if 'content' in request.data.keys() :
        prjName = "Quick code documentation"
        prjDesc = "Manual inserted script"
        selConn = "Manual"
        selLang = "TO DO"
        selIntp = request.data['sriptLang']
        selScrp = "TO DO"
        currentManualScript = request.data['content']
        prjInfo = {"demoAlias": request.data['demoAlias'],"demoDescription": request.data['demoDescription'],"demoUserAlias": request.data['demoUserAlias']}

        compact_option = '' if request.data['frontCompactOption'] == 'compact' else '_minimum'
        user_language = request.data['appLan'] if request.data['appLan'] in available_languages else 'fr'
        user_image = request.data['projectImg']
        
        selPrj = { 
            'contributor_ref' : "TO DO", 
            'name' : prjName, 
            'manager' : "TO DO",
            'description' : prjDesc, 
            'connector_ref' : selConn, 
            'interpreter_ref' : selIntp,
            'mainScript_ref' : selScrp,
            'tagId' : "QuickCode",
        }
        
        outvar = { 'conts': "TO DO", 'loginUser': "TO DO", 'selectedContr': "TO DO" }
        outvar['selectedProject'] = selPrj
        resultsDict, code_rows, oneline_rows, comm_rows = documentScriptElements( currentManualScript, True, user_language, selIntp, compact_option )

        print('--- DONE TECH DOC ---') 

        formated_out = formatRes(resultsDict, code_rows, oneline_rows, comm_rows, prjInfo)
        formated_out['dashboardDoc']['projectImg'] = user_image
 
        return JsonResponse(formated_out)

    else :
        response = {'message': 'UNEXPECTED ERROR : No Content in POST request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])  # Définie la méthode HTTP GET
def redirect_view(request):
    # Cette vue redirige l'utilisateur vers une autre URL (par exemple "/home")
    return redirect('http://localhost:3000/homelogin')