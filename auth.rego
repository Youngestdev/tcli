package httpapi.authz
import input
default allow = false



allow {
  {"name": input.name,"groupname": input.groupname} == data.geostore.usergroup[_]
  input.request_path == "v1/collections/geo"
  input.company == "osgeo"
  input.request_method == "GET"
  input.groupname == "everyone"
}

