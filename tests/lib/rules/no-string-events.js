/**
 * @fileoverview Dissallows string literal event names
 * @author Logan
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-string-events"),

    RuleTester = require("../../../lib/testers/rule-tester");


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-string-events", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "obj.trigger('change')",
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
    ]
});
