#!/usr/bin/env bash

printf "\nEXECUTING load-data.js................\n\n"
node load-data.js
printf "\nEXECUTING load-content.js.............\n\n"
node load-content.js
#printf "\nEXECUTING update-counts.js............\n"
#node update-counts.js
printf "\nDONE\n"
