// local dependencies
const { uninstallPlugin, restoreStarterFiles, log } = require('../../utils')
const {
  managePluginsPagePath,
  loadTemplatesPage,
  loadPluginsPage,
  manageTemplatesPagePath,
  manageInstalledPluginsPagePath
} = require('../plugin-utils')

const panelCompleteQuery = '[aria-live="polite"] #panel-complete'

async function installPluginTests ({ plugin, templates, version }) {
  describe(plugin, () => {
    after(restoreStarterFiles)

    it(`The ${plugin} templates will be installed`, () => {
      log(`The ${plugin} plugin templates are not available`)
      uninstallPlugin(plugin)
      loadTemplatesPage()
      cy.get(`[data-plugin-package-name="${plugin}"]`).should('not.exist')

      //   ------------------------

      log(`Install the ${plugin} plugin`)
      if (version) {
        cy.task('waitUntilAppRestarts')
        cy.visit(`${managePluginsPagePath}/install?package=${encodeURIComponent(plugin)}&version=${version}`)

        cy.get('#plugin-action-button').click()
      } else {
        loadPluginsPage()
        log(`Install the ${plugin} plugin`)
        cy.get(`[data-plugin-package-name="${plugin}"] button`).contains('Install').click()
      }

      cy.get(panelCompleteQuery, { timeout: 20000 })
        .should('be.visible')
      cy.get('a').contains('Back to plugins').click()

      cy.get('#installed-plugins-link').click()
      cy.get(`[data-plugin-package-name="${plugin}"] button`).contains('Uninstall')

      //   ------------------------

      log(`The ${plugin} plugin templates are available`)
      cy.get('a').contains('Templates').click()
      cy.get(`[data-plugin-package-name="${plugin}"]`).should('exist')

      //   ------------------------

      templates.forEach(({ name, filename }) => {
        log(`View ${name} template`)
        cy.visit(manageTemplatesPagePath)
        cy.get(`[data-plugin-package-name="${plugin}"] a`).contains(`View ${name} page`).click()
        cy.url().then(url => expect(url).to.contain(filename))
      })

      //   ------------------------

      log(`Uninstall the ${plugin} plugin`)
      cy.visit(manageInstalledPluginsPagePath)

      cy.get(`[data-plugin-package-name="${plugin}"] button`).contains('Uninstall').click()

      cy.get(panelCompleteQuery, { timeout: 20000 })
        .should('be.visible')
      cy.get('a').contains('Back to plugins').click()

      cy.get(`[data-plugin-package-name="${plugin}"] button`).contains('Install')
    })
  })
}

describe('Plugin tests', () => {
  after(restoreStarterFiles)

  installPluginTests({
    plugin: '@govuk-prototype-kit/common-templates',
    version: '1.1.1',
    templates: [
      { name: 'Blank GOV.UK', filename: 'blank-govuk.html' },
      { name: 'Blank unbranded', filename: 'blank-unbranded.html' },
      { name: 'Check answers', filename: 'check-answers.html' },
      { name: 'Confirmation', filename: 'confirmation.html' },
      { name: 'Content', filename: 'content.html' },
      { name: 'Mainstream guide', filename: 'mainstream-guide.html' },
      { name: 'Start', filename: 'start.html' },
      { name: 'Question', filename: 'question.html' }
    ]
  })

  installPluginTests({
    plugin: '@govuk-prototype-kit/task-list',
    version: '1.0.0',
    templates: [{ name: 'Task list', filename: 'task-list.html' }]
  })
})
