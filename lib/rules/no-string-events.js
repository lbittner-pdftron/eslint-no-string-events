/**
 * @fileoverview Disallows string literal event names
 * @author Logan
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    name: 'no-string-events',
    meta: {
        type: 'problem',
        docs: {
            description: "Disallows string literal event names",
            category: "Possible Errors",
            recommended: 'error'
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            {
                type: 'object',
                properties: {
                    eventFunctions: {
                        type: 'array',
                        items: [{ type: 'string', minItems: 1 }]
                    }
                }
            }
        ],
        messages: {
            incorrectAccessor:
                'Cannot access an EventHandler function with a string literal. Please use a constant instead',
            variableAccessor:
                'Cannot access an EventHandler function with a variable. Please use a constant instead',
            incorrectParameters:
                'Please use an array to pass parameters instead of variable arguments'
        },
       
    },
    defaultOptions: [{}],
    create: function (context) {
 
        const { settings } = context;

        const eventFunctions = settings.eventFunctions || ['on', 'off', 'trigger', 'once'];

        const getCalleeName = node => {
            if (!node) return null;
            if (!node.expression) return null;
            if (!node.expression.callee) return null;
            if (!node.expression.callee.property) return null;
            return node.expression.callee.property.name;
        }

        const getCalleeArugment = (node, index = 0) => {
            if (!node) return null;
            if (!node.expression) return null;
            if (!node.expression.arguments) return null;
            return node.expression.arguments[index];
        }


        const isStringLiteralOrSimilar = argument => {
            if (!argument) return false;
            const type = argument.type;
            if (type === 'Literal') return true;
            if (type === 'TemplateLiteral') return true;
            return false;
        }

        const isIdentifier = argument => {
            if (!argument) return false;
            const type = argument.type;
            return type === 'Identifier';
        }

        return {
            // give me methods
            ExpressionStatement(node) {
                const functionName = getCalleeName(node);
                if (!functionName) return;

                /**
                 * Check if the first argument is a string (or template), or a variable, throw if it is
                 */
                const canCheckFirstArg = eventFunctions.indexOf(functionName) > -1;
                if (canCheckFirstArg) {
                    const firstArgument = getCalleeArugment(node);
                    if (isStringLiteralOrSimilar(firstArgument)) {
                        return context.report({
                            node,
                            messageId: 'incorrectAccessor',
                            loc: getCalleeArugment(node).loc
                        })
                    }

                    if (isIdentifier(firstArgument)) {
                        return context.report({
                            node,
                            messageId: 'variableAccessor',
                            loc: getCalleeArugment(node).loc
                        })
                    }
                }
            }
        };
    }
};
