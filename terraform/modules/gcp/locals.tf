locals {
  cloudrun-url = google_cloud_run_service.cloud-run.status[0].url

  env = toset([
    for e in var.env: {
      key = e.key
      value = e.value
    #   secret = {
    #     name = e.secret
    #     alias = e.secret != null ? lookup(local.secrets_to_aliases, e.secret, null) : null
    #     version = coalesce(e.version, "latest")
    #   }
    }
  ])
}