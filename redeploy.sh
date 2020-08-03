#!/bin/bash
pushd /home/rfhsweb/rfhs-frontend
if npm run build; then
  if rsync -aEXuh --progress --delete-after public/* /var/www/rfhackers/; then
    printf "site successfully deployed\n"
  else
    printf "SITE FAILED TO DEPLOY!!!\n"
  fi
else
  printf "npm failed\n"
fi
popd
