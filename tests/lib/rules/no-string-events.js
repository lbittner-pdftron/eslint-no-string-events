/**
 * @fileoverview Disallows string literal event names
 * @author Logan
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-string-events"),

    RuleTester = require("eslint").RuleTester;

    RuleTester.setDefaultConfig({
        parserOptions: {
          ecmaVersion: 6,

        }
      });

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-string-events", rule, {

    valid: [

        {
            code: 'obj.trigger(Obj.Events.CHANGE)',
        },
        {
            code: 'obj.on(Obj.Events.CHANGE, () => {})',
        },
        {
            code: 'obj.off(Obj.Events.CHANGE, () => {})',
        },
        {
            code: 'obj.once(Obj.Events.CHANGE, () => {})',
        },
        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "obj.trigger('change');",
            errors: [{
                messageId: 'incorrectAccessor',
            }]
        },
        {
            code: 'obj.trigger("change");',
            errors: [{
                messageId: 'incorrectAccessor',
            }]
        },
        {
            code: 'obj.trigger(\`change`\);',
            errors: [{
                messageId: 'incorrectAccessor',
            }]
        },
        {
            code: `const name = 'test'; obj.on(name, () => {})`,
            errors: [{
                messageId: 'variableAccessor',
            }]
        },
        {
            code: `
                const someFunc = (name) => {
                    this.on(name, () => {})
                }
            `.trim(),
            errors: [{
                messageId: 'variableAccessor',
            }]
        }
    ]
});
