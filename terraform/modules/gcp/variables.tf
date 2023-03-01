variable "project-id" {
  type = string
  default = "dynamic-cooler-378812"
}

variable "project-region" {
  type = string
  default = "us-central1"
}

variable "project-image" {
  type = string
}

variable "cloudrun_name" {
  type = string
}

variable "port" {
  type = number
  default = 8080
}

variable "allow_public_access" {
  type = bool
  default = true
}

variable "max_instances" {
  type = number
}

variable "min_instances" {
  type = number
}

variable env {
  type = set(
    object({
      key = string,
      value = optional(string),
      secret = optional(string),
      version = optional(string),
    })
  )

  default = []
  description = "Environment variables to inject into container instances."

  validation {
    error_message = "Environment variables must have one of `value` or `secret` defined."
    condition = alltrue([
      length([for e in var.env: e if (e.value == null && e.secret == null)]) < 1,
      length([for e in var.env: e if (e.value != null && e.secret != null)]) < 1,
    ])
  }
}
variable ingress {
  type = string
  default = "all"
  description = "Ingress settings for the service. Allowed values: [`\"all\"`, `\"internal\"`, `\"internal-and-cloud-load-balancing\"`]"

  validation {
    error_message = "Ingress must be one of: [\"all\", \"internal\", \"internal-and-cloud-load-balancing\"]."
    condition = contains(["all", "internal", "internal-and-cloud-load-balancing"], var.ingress)
  }
}





