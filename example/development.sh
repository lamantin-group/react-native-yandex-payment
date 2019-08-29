# $1 = source path 
# $2 = destination path 
# $3 = filter 
copy_from_source_to_destination_except_filter() { cp -r $(ls -A $1 | grep -v -w $3 | awk -v path=$1 '{printf "%s/%s ", path, $1}') $2 }