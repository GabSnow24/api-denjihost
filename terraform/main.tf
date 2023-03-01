terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.51.0"
    }
  }
}

provider "google" {
  project     = local.project-id
  region      = var.project-region
  credentials = file("creds.json")
}

module "gcp-cloud-run" {
  source              = "./modules/gcp"
  project-id          = local.project-id
  project-region      = var.project-region
  project-image       = var.project-image
  cloudrun_name       = var.cloudrun_name
  port                = var.port
  allow_public_access = var.allow_public_access
  max_instances       = var.max_instances
  min_instances       = var.min_instances
  env                 = var.env
  ingress             = var.ingress
}