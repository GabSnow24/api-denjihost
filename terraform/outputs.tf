output "cloudrun_url" {
  value       = module.gcp-cloud-run.cloudrun_url
  description = "The url of the Cloud Run Service"
  depends_on = [
    module.gcp-cloud-run
  ]
}