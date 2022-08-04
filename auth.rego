package httpapi.authz
import input
default allow = false



allow {
  input.request_path[0] == "v1" 
  input.request_path[1] == "collections" 
  
  input.request_path[2] != "obs"
  input.company == data.items[i].name
  input.request_method == "GET"
}

allow {
  
  input.company == "geobeyond"
  some i 
  data.items[i].name == input.preferred_username 
  data.items[i].groupname == input.groupname
}

allow {
  input.groupname == "EDITOR_ATAC"
}

allow {
  input.groupname == ["v1", "collections", "test-data", ""]
  input.name == "admin"
}

allow {
  input.request_path == ["v1", "collections", "lakes", ""]
  input.groupname == "admin"
}

