from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import Review

#Register models

@admin.register(Review)
class ReviewsAdmin(ImportExportModelAdmin):
    list = ('created_at', 'review_text', 'rating')