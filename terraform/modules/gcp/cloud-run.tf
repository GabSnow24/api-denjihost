#############
# Cloud Run #
#############

resource "google_cloud_run_service" "cloud-run" {
  name     = "${var.cloudrun_name}-srv"
  location = var.project-region
  autogenerate_revision_name = true

  metadata {
    namespace = var.project-id
     annotations = merge(
      {
        "run.googleapis.com/ingress" = var.ingress
        "run.googleapis.com/client-name" = "terraform"
        "client.knative.dev/user-image" = var.project-image
      }
    )
  }

  template {
    spec {
        ##TODO ADD LIVENESS PROBE OPTIONS
      containers {
        image = var.project-image
        ports {
          name = "http1"
          container_port = var.port
        }
        dynamic env {
          for_each = [for e in local.env: e if e.value != null]

          content {
            name = env.value.key
            value = env.value.value
          }
        }
      }
    
    }
    metadata {
      annotations = merge(
        {   
          "autoscaling.knative.dev/maxScale" = var.max_instances
          "autoscaling.knative.dev/minScale" = var.min_instances
        },
      )
    }
    
  }
  
  
  
  lifecycle {
    ignore_changes = [
      metadata.0.annotations,
    ]
  }
}

####################
# Cloud Run Access #
####################

resource google_cloud_run_service_iam_member "public_access" {
  count = var.allow_public_access ? 1 : 0
  service = google_cloud_run_service.cloud-run.name
  location = google_cloud_run_service.cloud-run.location
  project = google_cloud_run_service.cloud-run.project
  role = "roles/run.invoker"
  member = "allUsers"
  depends_on = [
    google_cloud_run_service.cloud-run
  ]
}