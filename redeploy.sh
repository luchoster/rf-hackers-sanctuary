#!/bin/bash
pushd /home/rfhsweb/rfhs-frontend
if npm run build; then
  sudo rsync -aEXuh --progress --delete-after public/* /var/www/rfhackers/
else
  printf "npm failed\n"
fi
popd
