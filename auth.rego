package httpapi.authz
import input
default allow = false



allow {
  {"name": input.name,"groupname": input.groupname} == data.usergroups[_]
  input.request_path[0] == "v1" 
  input.request_path[1] == "collections" 
  
  input.request_path[2] != "obs"
  input.company == data.items[_].company
  input.request_method == "GET"
}

allow {
  
  input.company == "geobeyond"
}

allow {
  input.groupname == "EDITOR_ATAC"
}

allow {
  input.name == "admin"
}

allow {
  input.request_path == ["v1", "collections", "lakes", ""]
  input.groupname == "admin"
}

