from pathlib import Path
import os
import environ
from ms_identity_web.configuration import AADConfig
from ms_identity_web import IdentityWebPython
import logging

#AAD_CONFIG = AADConfig.parse_json(file_path='aad.config.json')
#MS_IDENTITY_WEB = IdentityWebPython(AAD_CONFIG)
#ERROR_TEMPLATE = 'auth/{}.html'  # for rendering 401 or other errors from msal_middleware

env = environ.Env()
environ.Env.read_env()  # Load environment variables from .env file

ALLOWED_HOSTS = env("LOCAL_ALLOWED_HOSTS", default="127.0.0.1,localhost").split(",")

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# reading .env file
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("LOCAL_SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = env("LOCAL_ALLOWED_HOSTS").split(",")

# Application definition
INSTALLED_APPS = [
  'corsheaders',  # added corsheaders dependency
  'django.contrib.admin',
  'django.contrib.auth',
  'django.contrib.contenttypes',
  'django.contrib.sessions',
  'django.contrib.messages',
  'django.contrib.staticfiles',
  'rest_framework',
  'rest_framework.authtoken',
  'confidiaApi',
  'django_extensions',
  'oauth2_provider', 
]

MIDDLEWARE = [
  'corsheaders.middleware.CorsMiddleware',
  'django.middleware.security.SecurityMiddleware',
  'django.contrib.sessions.middleware.SessionMiddleware',
  'django.middleware.common.CommonMiddleware',
  'django.middleware.csrf.CsrfViewMiddleware',
  'django.contrib.auth.middleware.AuthenticationMiddleware',
  'django.contrib.messages.middleware.MessageMiddleware',
  'django.middleware.clickjacking.XFrameOptionsMiddleware',
  'oauth2_provider.middleware.OAuth2TokenMiddleware',
]

AUTHENTICATION_BACKENDS = [
    'oauth2_provider.backends.OAuth2Backend',
]

OAUTH2_PROVIDER = {
    'ACCESS_TOKEN_EXPIRE_SECONDS': 3600,  # 1 hour
    'AUTHORIZATION_CODE_EXPIRE_SECONDS': 3600,
    'REFRESH_TOKEN_EXPIRE_SECONDS': 2592000,  # 30 days
    'SCOPES': {
        'read': 'Read access',
        'write': 'Write access',
        'groups': 'Access to user groups',
    },
    'RESOURCE_OWNER_PASSWORD_CREDENTIALS': False,
    'ALLOW_GET_REQUESTS_FOR_AUTH_CODE_GRANT': True,
    'ACCESS_TOKEN_METHOD': 'POST',
}

CLIENT_ID = 'd4983a08-45dc-4861-b57c-2b897e74509f'  # Replace with your client ID
CLIENT_SECRET = 'rTk8Q~tYBI-WBFD1ZhsSkPtDmvq1L6KNUpp1abCh'  # Replace with your client secret
TENANT_NAME = 'authAppTestConfidia'  # Replace with your Azure AD B2C tenant name
USER_FLOW = 'B2C_1_signupsignin1'  # Replace with your Azure AD B2C user flow name
REDIRECT_URI = 'https://jwt.ms'  # Replace with your application's redirect URI
LOGIN_REDIRECT_URL = '/' 
LOGOUT_REDIRECT_URL = '/'

#MIDDLEWARE.append('ms_identity_web.django.middleware.MsalMiddleware')

# CORS_ALLOWED_ORIGINS = env("LOCAL_REACT_CORS_ALLOWED_ORIGINS").split(",")
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Replace with your React front-end's origin
]

CORS_ORIGIN_ALLOW_ALL = True

REST_FRAMEWORK = {
  'DEFAULT_AUTHENTICATION_CLASSES': [
    'rest_framework.authentication.TokenAuthentication',
  ],
  'DEFAULT_PERMISSION_CLASSES': [
    'rest_framework.permissions.IsAuthenticated',
  ]
}

ROOT_URLCONF = 'confidia_back_dev.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')], 
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'confidia_back_dev.wsgi.application'

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

#DATABASES = {
#   'default': {
 #       'ENGINE': 'mssql',
  #      'NAME': 'confidia-db-migration',
   #     'USER': 'dsfordslogin',
    #    'PASSWORD': 'Dsford2024!',
     #   'HOST': 'confidia-test-sql.database.windows.net',
      #  'PORT': '1433',
       # 'OPTIONS': {
        #    'driver': 'ODBC Driver 18 for SQL Server',
        #}
 #   }
#}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'DEBUG',
    },
    'loggers': {
        'ms_identity_web': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}

# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'