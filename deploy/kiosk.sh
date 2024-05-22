#!/bin/sh

# disable DPMS and prevent screen from blanking
/usr/bin/xset s off -dpms

# hide cursor after 1s
/usr/bin/unclutter -idle 1 -root &

# start chromium as 'pi' user
/usr/bin/sudo -H -u pi -- /usr/bin/chromium-browser \
  --kiosk \
  --start-fullscreen \
  --start-maximized \
  --window-size=1920,1080 \
  https://ambience.local
