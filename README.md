# Ars Nomadis Editor

**[Work In Progress]** Web editor for [Ars Nomadis](https://www.arsnomadis.eu/) geolocated soundwalks. The editor generates a JSON file to be used with Ars Nomadis custom hardware. The application is based on the [SvelteKit](https://kit.svelte.dev/) framework and uses [Leaflet](https://leafletjs.com/) & [OpenStreetMap](https://www.openstreetmap.org/) for the interactive map features.

## Installing

The installation requires [Nodejs](https://nodejs.org/en/) 14 or newer. The recommended version is the current LTS (16.15.0).

```bash
# Clone this repository
git clone ssh://git@denez.ni-vps.fr:2222/denezth/arsnomadis-editor.git

# Navigate to the project
cd arsnomadis-editor

# Install dependencies
npm install
```

## Developing

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of the app:

```bash
npm run build
```

You can preview the production build with `npm run preview -- --open`.
