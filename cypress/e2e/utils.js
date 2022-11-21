const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const waitForApplication = async (path = '/index') => {
  cy.task('log', `Waiting for app to restart and load ${path} page`)
  cy.task('waitUntilAppRestarts')
  cy.visit(path)
  cy.get('.govuk-header__logotype-text')
    .should('contains.text', 'GOV.UK')
}

const copyFile = (source, target) => {
  cy.task('log', `Copy ${source} to ${target}`)
  cy.task('copyFile', { source, target })
}

const deleteFile = (filename) => {
  cy.task('log', `Delete ${filename}`)
  cy.task('deleteFile', { filename })
}

const createFile = (filename, options) => {
  cy.task('log', `Create ${filename}`)
  cy.task('createFile', { filename, ...options })
}

function uninstallPlugin (plugin) {
  cy.task('log', `Uninstalling ${plugin}`)
  cy.exec(`cd ${Cypress.env('projectFolder')} && npm uninstall ${plugin}`)
  cy.task('pluginUninstalled', { plugin, timeout: 15000 })
}

function installPlugin (plugin, version = '') {
  cy.task('log', `Installing ${plugin}${version}`)
  cy.exec(`cd ${Cypress.env('projectFolder')} && npm install ${plugin}${version}`)
  if (plugin.startsWith('file:')) {
    plugin = plugin.substring(plugin.lastIndexOf('/') + 1)
  }
  cy.task('log', `Waiting for ${plugin}${version} to be installed`)
  cy.task('pluginInstalled', { plugin, timeout: 15000 })
}

module.exports = {
  sleep,
  waitForApplication,
  copyFile,
  deleteFile,
  createFile,
  installPlugin,
  uninstallPlugin
}
