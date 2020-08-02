gcloud config set project nat-cloud-run-1
gcloud config get-value project
export GOOGLE_CLOUD_PROJECT="nat-cloud-run-1"
gcloud builds submit --tag gcr.io/${GOOGLE_CLOUD_PROJECT}/recorder:1.0.0 .

# gcloud builds submit --tag gcr.io/${GOOGLE_CLOUD_PROJECT}/monolith:3.0.0 .
# gcloud run services list
# gcloud builds submit --tag  --platform managed gcr.io/${GOOGLE_CLOUD_PROJECT}/monolith:3.0.0 .
#  gcloud run deploy --image=gcr.io/${GOOGLE_CLOUD_PROJECT}/monolith:1.0.0 --platform managed

