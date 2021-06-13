# Vuer

## Introduction

Vuer is a Vue.js single page app that uses a Drupal instance running the Drupal Outline module as a backend.  The app provides an improved interface for Drupal content editors, using the Vuetify / Material Design Component library, drag and drop functionality, undo/redo, workflow integration, etc.  The Drupal GraphQL module is used for communication between the Vue app and the Drupal back end. The app was built using DruxtJS https://www.drupal.org/project/druxt, which provides integration with Vue's Nuxt.js framework. There is also a node.js app that provides support for Druxt pre-rendering and Pupetteer for screen scraping.

Primary capabilities supported:

- An app based content editing interface for Drupal.
- An app based administrative interface for Drupal.
- A more efficient way to publish a "book" of content.

A Drupal Outline is conceptually similar to a Drupal Book, except that an outline may contain any Drupal entity type, not just nodes.  Vue Outline supports editing of Drupal entities using Druxt editing components, see github.com/druxt/druxt-entity.

An outline is composed of outline entries organized in a heirarchy.  An outline entry is by default just a title and long text field for simple content. Optionally, an outline entry can represent any drupal entity, which is accomplished using Drupal's entity reference capability.

Pupetteer is planned for screen scraping of Drupal node editing pages.  The screen scaping technology is useful for automating repetitive content editing tasks.  Screen scraping also makes possible communication to Drupal when functionality is needed that is not provided by the json api or graphql configuration. For example the screen scraper could scrape the Drupal Admin UI Site Status page periodically and cache the output so that the current status information is instantly available to app users.

## Project setup

These must be installed globally prior to installation: git, node, npm, vue, composer, lando/docker.
Before installation, make sure you have drupal account set up with git access, SSH Key, and your global git user/email set.

### Step 1: Clone and install the Vue project

```bash
git clone git@github.com:captaindav/vue-outline
cd vue-outline
npm i
```
At this point you can run the app, as it is pointed to a test back-end located on webol.org:
```bash
npm run serve
```
If you want a full Drupal installation for your local development environment, continue with the steps that follow.

### Step 2: Initialize Drupal

Mac OSX:```bash npm run init:drupal:mac```
(requires composer.phar in /usr/local/bin)

Windows:```bash npm run init:drupal:windows```

### Step 3: Set Drupal GraphQL Permissions

- Login at [http://drupal-outline.lndo.site/user](http://drupal-outline.lndo.site/user), username=admin password=admin
- Navigate to: [http://drupal-outline.lndo.site/admin/people/permissions](http://drupal-outline.lndo.site/admin/people/permissions) and give the Anonymous role the GraphQL permissions:
-- Outline: Execute arbitrary requests
-- Outline: Execute persisted requests

### Step 4: VS Code Configuration

- In the top level vue-outline directory:

```bash
mkdir .vscode
cp scripts/vscode/launch.json .vscode
```

## Running the App

Start Drupal:

```bash
npm run start
```

Run the app:

```bash
npm run serve
```

Check Drupal status:

```bash
cd packages/drupal
lando drush status
```


## Rebuild or Reinitialize Lando / Reinstall Drupal

If Lando/Drupal are not working / broken in some way, go to the ../packages/drupal directory try a Lando rebuild:

```bash
lando rebuild
```

To reinitialize Lando and reinstall Drupal:

```bash
lando destroy
lando poweroff
lando start
lando site-setup
```

## Packages

- api
  - Simple express api server
  - Can use puppeteer
- drupal
  - Drupal environment running in Docker/Lando
  - Only generated when following the Initialize Drupal development server instructions above
- vuer-fe
  - Main vuer client/application front end
  - Requires drupal server to function

## General repository commands

### root level

- `build <package>`: runs build on all packages. Accepts `<package>` parameter to target specific packages
- `clean`: Cleans node_modules from all packages
- `init:drupal`: Initializes Drupal development server
- `lint`: Runs lint on all packages
- `lint:fix`: Runs `lint --fix` on all packages
- `serve <package>`: Runs `serve` on all packages. Accepts `<package>` parameter to target specific packages
- `start`: Starts drupal development server. Requires lando to function

### api package

- `serve`: Starts express api server

### vuer-fe package

- `build`: Compiles and minifies outline client for production
- `lint`: Lints and fixes outline client files
- `serve`: Compiles and hot-reloads outline client for development

## Roadmap

### Planned Features

- Drag and Drop
- Undo/Redo
- Forward/Back
- Puppeteer for scraping node edit forms.

### Long Term Features

- Taxonomy Editing
- Menu Editing
- Migrate module support for migrating Books to Outline
- Dynamic loading of children

See the ROADMAP.md file for a more complete roadmap.
