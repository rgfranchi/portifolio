#!/bin/bash

name='docker_java';
echo "JAVA DOCKER";

if ! [[ $(docker ps -f "name=$name" --format '{{.Names}}') == "$name" ]]
	then 
		docker start $name
fi;

docker exec -it $name java $@	

# if [[ $(docker ps -f "name=$name" --format '{{.Names}}') == "$name" ]]
# 	then 
# 		docker exec -it $name java $@
#    	else 
#   docker start $name && docker exec -it $name java $@	
# fi;