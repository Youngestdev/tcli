package httpapi.authz
import input
default allow = false



allow {
  {"name": input.name,"groupname": input.groupname} == data.geostore.usergroup[_]
  input.request_path == "v1/collections/obs"
  input.company == "geobeyond"
  input.request_method == "POST"
  input.groupname == "EDITOR_DPAU"
}

