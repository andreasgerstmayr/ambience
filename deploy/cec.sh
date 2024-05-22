#!/bin/sh

export DISPLAY=:0

echo as | cec-client | while IFS= read -r line
do
  case "$line" in
    *"key pressed: left"*"current"*)
      echo Left
      xdotool key Left
      ;;

    *"key pressed: right"*"current"*)
      echo Right
      xdotool key Right
      ;;

    *"key pressed: select"*"current"*)
      echo Select
      xdotool key space
      ;;

    *"key pressed: play"*"current"*)
      echo Play
      xdotool key P
      ;;

    *"key pressed: pause"*"current"*)
      echo Pause
      xdotool key S
      ;;
  esac
done
