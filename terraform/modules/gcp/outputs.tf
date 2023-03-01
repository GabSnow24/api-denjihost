output "cloudrun_url" {
  value       = local.cloudrun-url
  description = "The url of the Cloud Run Service"
  depends_on = [
    google_cloud_run_service.cloud-run
  ]
}