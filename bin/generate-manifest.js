#! /usr/bin/env node

const path = require('path');
const fs = require('fs');
const packageMeta = require('../package.json');

const manifest = {
  'manifest_version': 2,

  'name': packageMeta.name,
  'author': packageMeta.author,
  'version': packageMeta.version,
  'homepage_url': packageMeta.homepage,

  'applications': {
    'gecko': {
      'id': packageMeta.id,
      'update_url': 'https://testpilot.firefox.com/files/snoozetabs@mozilla/updates.json'
    }
  },

  'default_locale': 'en_US',
  'description': '__MSG_extDesc__',
  'icons': {
    '48': 'icons/bell_icon.svg'
  },

  'permissions': [
    'alarms',
    'bookmarks',
    'contextMenus',
    'notifications',
    'storage',
    'tabs',
    '<all_urls>'
  ],

  'background': {
    'scripts': ['testpilot-metrics.js', 'background.js']
  },

  'browser_action': {
    'browser_style': false,
    'default_title': '__MSG_popupTitle__',
    'default_popup': 'popup/snooze.html',
    'default_icon': {
      '32': 'icons/bell_icon.svg'
    }
  }
};

const outPath = path.join(path.dirname(__dirname), 'dist', 'manifest.json');
fs.writeFileSync(outPath, JSON.stringify(manifest, null, '  '));
