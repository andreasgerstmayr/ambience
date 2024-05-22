# ambience

ambience shows selected pictures from [Immich](https://immich.app/) in a slideshow on your TV.
Portrait pictures are arranged side-by-side, and date and location (if available) of the pictures will be displayed.

[![Screenshot](deploy/example.png)](deploy/example.png)

## Configuration

| Environment Variable | Description                                           |
| -------------------- | ----------------------------------------------------- |
| `IMMICH_HOST`        | Immich hostname, for example https://immich.local     |
| `IMMICH_API_KEY`     | Immich API key (Immich > Account Settings > API Keys) |
| `IMMICH_ALBUMS`      | A comma-seperated list of Immich album names          |
| `SLIDESHOW_DURATION` | Number of seconds per picture. Default: 20            |

## Keyboard Shortcuts

| Key                           | Function                                |
| ----------------------------- | --------------------------------------- |
| Left arrow                    | Show previous slide and pause slideshow |
| Right arrow                   | Show next slide and pause slideshow     |
| Space<br>Play/Pause Media Key | Play / Pause                            |
| P                             | Play                                    |
| S<br>Stop Media Key           | Pause                                   |

## Deployment

ambience is a Node.js web application, packaged in a container.
You can point the browser on your TV directly to ambience, or attach a Raspberry PI or Mini PC to your TV and open ambience in fullscreen (e.g. Chrome Kiosk mode).
The [deploy](deploy/) folder contains examples using a Raspberry PI, incl. support for HDMI-CEC to control the slideshow with a TV remote.

## Development

To start the development server, use the following commands:

```
export IMMICH_HOST=https://immich.local
export IMMICH_API_KEY=...
export IMMICH_ALBUMS=...

npm install
npm run dev -- --open
```
