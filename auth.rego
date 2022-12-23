package httpapi.authz
import input
default allow = false



allow {
  {"name": input.name,"groupname": input.groupname} = data.geostore.usergroup[_]
  input.request_path = ["v1", "collections"]
  input.company = "Geobeyond SRL"
  input.request_method = "DELETE"
  input.groupname = "EDITOR_SIZA"
}

allow {
  {"name": input.name,"groupname": input.groupname} = data.geostore.usergroup[_]
  input.request_path = ["v1", "collections"]
  input.company = "geobeyond"
  input.request_method = "POST"
  input.groupname = "VIEWER"
}

allow {
  {"name": input.name,"groupname": input.groupname} = data.geostore.usergroup[_]
  input.request_path = ["v2", "collection"]
  input.company = "osgeo"
  input.request_method = "GET"
  input.groupname = "TestGeocity"
}

