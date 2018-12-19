# Image API

A simple REST API for posting images and requesting images

## Structure
- NodeJS
- Simple Node Logger
- Express

## Basic Usage
- Download the latest release from the GitHub releases page
- Start the executable
- Update the `config.json` to your likings

## Development Usage
- Install NodeJS 8.0 or higher
- Copy the `_scripts/config/config.dev.json` to here `app/config/config.json`
- Run `npm install` in the root project folder
- Run `npm run dev` in the root project folder

## Logging
All logs will be written to the `image-api.log` file in the node folder.

To increase the logging change the logger level in the `config.json` file from `info` to `debug`.

## Endpoints
- POST - /api/save
```
{
    "image": "data:image/jpeg;base64,/9j/==",
    "extension": "jpg",
    "name": "image-name"
}
```

- GET - /api/random

## License

MIT
