
const binaryOperator = new Set([
	"==",
	"!=",
	"===",
	"!==",
	"<",
	"<=",
	">",
	">=",
	"<<",
	">>",
	">>>",
	"+",
	"-",
	"*",
	"/",
	"%",
	"|",
	"^",
	"&",
	"in",
	"instanceof"
]);

const logicalOperator = new Set([
	"||",
	"&&"
]);

const assignmentOperator = new Set([
	"=",
	"+=",
	"-=",
	"*=",
	"/=",
	"%=",
	"<<=",
	">>=",
	">>>=",
	"|=",
	"^=",
	"&="
]);

const updateOperator = new Set([
	"++",
	"--"
]);

function assertBinaryOperator(operator) {
	if (binaryOperator.has(operator)) {
		return operator;
	} else {
		throw new Error(`Operator "${operator}" not binary!`);
	}
}

function assertLogicalOperator(operator) {
	if (logicalOperator.has(operator)) {
		return operator;
	} else {
		throw new Error(`Operator "${operator}" not logical!`);
	}
}

function assertAssignmentOperator(operator) {
	if (assignmentOperator.has(operator)) {
		return operator;
	} else {
		throw new Error(`Operator "${operator}" not assignment!`);
	}
}

function assertUpdateOperator(operator) {
	if (updateOperator.has(operator)) {
		return operator;
	} else {
		throw new Error(`Operator "${operator}" not update!`);
	}
}



export class Node {
	constructor() {
		// the .split('$')[0] adds rollup compatibility
		this.type = this.constructor.name.split('$')[0];
		this.loc = null;
	}

	[Symbol.iterator] () {
		var value = this, done = false;
		return {
			next() {
				if (!done) {
					done = true;
					return {done: false, value};
				} else {
					return {done}
				}
			}
		};
	}

	toJS(o) {
		return this;
	}

	from(origin) {
		var [left, up, right, down] = origin.position;
		this.loc = {
			source: origin.program.meta.source,
			start: {
				column: left,
				line: up + 1
			},
			end: {
				column: right,
				line: down + 1
			}
		};

		return this;
	}
}

export class Program extends Node {
	constructor(statements) {
		super();
		this.body = statements;
	}
}

export class Statement extends Node {

}

export class EmptyStatement extends Statement {

}

export class BlockStatement extends Statement {
	constructor(statements) {
		super();
		this.body = statements;
	}
}

export class ExpressionStatement extends Statement {
	constructor(expression) {
		super();
		this.expression = expression;
	}
}

export class IfStatement extends Statement {
	constructor(test, consequent, alternate) {
		super();
		this.test = test;
		this.consequent = consequent;
		this.alternate = alternate;
	}
}


export class BreakStatement extends Statement {
	constructor(label = null) {
		super();
		this.label = label;
	}
}

export class ContinueStatement extends Statement {
	constructor(label = null) {
		super();
		this.label = label;
	}
}

export class LabeledStatement extends Statement {
	constructor(label, body) {
		super();
		this.label = label;
		this.body = body;
	}
}

export class SwitchStatement extends Statement {
	constructor(discriminant, cases) {
		super();
		this.discriminant = discriminant;
		this.cases = cases;
	}
}

export class ReturnStatement extends Statement {
	constructor(argument) {
		super();
		this.argument = argument;
	}
}

export class ThrowStatement extends Statement {
	constructor(argument) {
		super();
		this.argument = argument;
	}
}

export class TryStatement extends Statement {
	constructor(block, handler = null, finalizer = null) {
		super();
		this.block = block;
		this.handler = handler;
		this.finalizer = finalizer;
	}
}

export class WhileStatement extends Statement {
	constructor(test, body) {
		super();
		this.test = test;
		this.body = body;
	}
}

export class ForStatement extends Statement {
	constructor(body, init = null, test = null, update = null) {
		super();
		this.body = body;
		this.init = init;
		this.test = test;
		this.update = update;
	}
}

export class ForInStatement extends Statement {
	constructor(body, left, right) {
		super();
		this.body = body;
		this.left = left;
		this.right = right;
	}
}

export class ForOfStatement extends ForInStatement {
	constructor(body, left, right) {
		super(body, left, right);
	}
}

export class Declaration extends Statement {

}

export class VariableDeclaration extends Declaration {
	constructor(declarations, kind) {
		super();
		this.declarations = declarations;
		this.kind = kind;
	}
}

export class VariableDeclarator extends Node {
	constructor(id, init = null) {
		super();
		this.id = id;
		this.init = init;
	}
}

export class Expression extends Node {

}

export class ThisExpression extends Expression {

}

export class ArrayExpression extends Expression {
	constructor(elements) {
		super();
		this.elements = elements;
	}
}

export class ObjectExpression extends Expression {
	constructor(properties) {
		super();
		this.properties = properties;
	}
}

export class Property extends Node {
	constructor(key, value, kind = 'init', method = false) {
		super();
		this.key = key;
		this.value = value;
		this.kind = kind;
		this.method = method;
	}
}

export class FunctionExpression extends Expression {
	constructor(id, params, body, generator = false) {
		super();
		this.id = id;
		this.params = params;
		this.body = body;
		this.generator = generator;
	}
}

export class Super extends Node {

}

export class ClassExpression extends Expression {
	constructor(id = null, superClass = null, body = []) {
		super();

		this.id = id;
		this.superClass = superClass;
		this.body = new ClassBody(body);
	}
}

export class ClassBody extends Node {
	constructor(body) {
		super();
		this.body = body;
	}
}

export class MethodDefinition extends Node {
	constructor(key, value, kind = "method", computed = false, isStatic = false) {
		super();

		this.key = key;
		this.value = value;
		this.kind = kind;
		this.computed = computed;
		this.static = isStatic;
	}
}

export class SequenceExpression extends Expression {
	constructor(expressions) {
		super();
		this.expressions = expressions;
	}
}

export class UnaryExpression extends Expression {
	constructor(operator, argument, prefix = true) {
		super();
		this.operator = operator;
		this.argument = argument;
		this.prefix = prefix;
	}
}

export class BinaryExpression extends Expression {
	constructor(operator, left, right) {
		super();
		this.operator = operator;
		this.left = left;
		this.right = right;
	}
}

export class AssignmentExpression extends Expression {
	constructor(operator, left, right) {
		super();
		this.operator = assertAssignmentOperator(operator);
		this.left = left;
		this.right = right;
	}
}

export class UpdateExpression extends Expression {
	constructor(operator, argument, prefix) {
		super();
		this.operator = assertUpdateOperator(operator);
		this.argument = argument;
		this.prefix = prefix;
	}
}

export class LogicalExpression extends Expression {
	constructor(operator, left, right) {
		super();
		this.operator = assertLogicalOperator(operator);
		this.left = left;
		this.right = right;
	}
}

export class ConditionalExpression extends Expression {
	constructor(test, consequent, alternate) {
		super();
		this.test = test;
		this.consequent = consequent;
		this.alternate = alternate;
	}
}

export class CallExpression extends Expression {
	constructor(callee, args) {
		super();
		this.callee = callee;
		this.arguments = args;
	}
}

export class NewExpression extends CallExpression {

}

export class MemberExpression extends Expression {
	constructor(object, property, computed = false) {
		super();
		this.object = object;
		this.property = property;
		this.computed = computed;
	}
}

export class Pattern extends Node {

}

export class SpreadElement extends Node {
	constructor(argument) {
		super();
		this.argument = argument;
	}
}


export class SwitchCase extends Node {
	constructor(test, consequent) {
		super();
		this.test = test;
		this.consequent = consequent;
	}
}

export class CatchClause extends Node {
	constructor(param, body) {
		super();
		this.param = param;
		this.body = body;
	}
}

export class Identifier extends Pattern {
	constructor(name) {
		super();
		this.name = name;
	}
}

export class Literal extends Expression {
	constructor(value) {
		super();
		this.value = value;
	}
}


// like properties but used in object patterns
export class AssignmentProperty extends Property {
	constructor(key, value) {
		super(key, value, 'init', false);
		this.type = "Property";
	}
}


// ES6

export class YieldExpression extends Expression {
	constructor(argument, delegate = false) {
		super();
		this.argument = argument;
		this.delegate = delegate;
	}
}

export class ObjectPattern extends Pattern {
	constructor(properties) {
		super();
		this.properties = properties;
	}
}

export class ArrayPattern extends Pattern {
	constructor(elements) {
		super();
		this.elements = elements;
	}
}

export class RestElement extends Pattern {
	constructor(argument) {
		super();
		this.argument = argument;
	}
}

export class AssignmentPattern extends Pattern {
	constructor(left, right) {
		super();

		this.left = left;
		this.right = right;
		this.operator = '=';
	}
}



export class ModuleDeclaration extends Node {

}

export class ModuleSpecifier extends Node {
	constructor(local) {
		super();

		this.local = local;
	}
}

export class ImportDeclaration extends ModuleDeclaration {
	constructor(specifiers, source) {
		super();

		this.specifiers = specifiers;
		this.source = source;
	}
}


export class ImportSpecifier extends ModuleSpecifier {
	constructor(local, imported = local) {
		super(local);

		this.imported = imported;
	}
}

export class ImportDefaultSpecifier extends ModuleSpecifier {

}

export class ImportNamespaceSpecifier extends ModuleSpecifier {

}







export class ExportNamedDeclaration extends ModuleDeclaration {
	constructor(declaration = null, specifiers = [], source = null) {
		super();

		this.declaration = declaration;
		this.specifiers = specifiers;
		this.source = source;
	}
}

export class ExportSpecifier extends ModuleSpecifier {
	constructor(local, exported = local) {
		super(local);

		this.exported = exported;
	}
}

export class ExportDefaultDeclaration extends ModuleDeclaration {
	constructor(declaration) {
		super();

		this.declaration = declaration;
	}
}

export class ExportAllDeclaration extends ModuleDeclaration {
	constructor(source) {
		super();

		this.source = source;
	}
}
