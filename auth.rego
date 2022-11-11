package httpapi.authz
import input
default allow = false



allow {
  input.request_path == "v1/collections/geo"
  input.company == "osgeo"
  input.request_method == "UPDATE"
  input.groupname == ""
}

