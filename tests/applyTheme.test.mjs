import test from 'node:test'
import assert from 'node:assert/strict'
import { toKebab, themeToCssVariables } from '../src/config/applyTheme.js'

test('toKebab converts camelCase token names', () => {
  assert.equal(toKebab('accentSoft'), 'accent-soft')
  assert.equal(toKebab('foreground'), 'foreground')
})

test('themeToCssVariables maps colors and fonts to CSS variables', () => {
  const variables = themeToCssVariables({
    colors: { accentSoft: '#C084FC', foreground: '#F5F3F7' },
    fonts: { display: 'GomariceNoContinue' },
  })

  assert.deepEqual(variables, {
    '--accent-soft': '#C084FC',
    '--foreground': '#F5F3F7',
    '--brand-font-display': 'GomariceNoContinue',
  })
})
