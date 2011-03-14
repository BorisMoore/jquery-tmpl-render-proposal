function assertDesugarsToSelf(js) {
  assertEquals(js, desugar(js));
}

function testSimpleJs() {
  assertDesugarsToSelf('');
  assertDesugarsToSelf('42');
  assertDesugarsToSelf('-1.0');
  assertDesugarsToSelf('-.333');
  assertDesugarsToSelf('1e6');
  assertDesugarsToSelf('1e-6');
  assertDesugarsToSelf('"foo bar"');
  assertDesugarsToSelf("'foo bar'");
  assertDesugarsToSelf("for (var i = 0; i < 10; ++i) { alert('I love to \\'count\\''); }");
  assertDesugarsToSelf("foo");
}

function testBackquotesInStringsAndRegexs() {
  assertDesugarsToSelf("'`'");
  assertDesugarsToSelf("'\\`'");
  assertDesugarsToSelf('"`"');
  assertDesugarsToSelf('"\\`"');
  assertDesugarsToSelf('/`/');
  assertDesugarsToSelf('1, /`/');
  assertDesugarsToSelf('1, /[`]/');
  assertDesugarsToSelf('n /= /`/i');
}

function testSimpleQuasi() {
  assertEquals('(foo(["foo"])())', desugar('foo`foo`'));
}

function testQuasiOneInterp() {
  assertEquals('(foo(["foo ", " bar"])((x)))', desugar('foo`foo ${x} bar`'));
}

function testQuasiOneAbbreviatedInterp() {
  assertEquals('(foo(["foo ", " bar"])((x)))', desugar('foo`foo $x bar`'));
}

function testQuasiEscape() {
  assertEquals('(foo(["foo ", "\\nbar"])((x)))', desugar('foo`foo ${x}$\\nbar`'));
}

function testQuasiRawEscape() {
  assertEquals('(foo(["foo ", "\\\\nbar"])((x)))', desugar('foo`foo ${x}\\nbar`'));
}

function testBracketsInQuasiInterp() {
  assertEquals('(foo(["foo ", "\\\\nbar"])((f({a: b}))))', desugar('foo`foo ${f({a: b})}\\nbar`'));
}

function testStringInQuasiInterp() {
  assertEquals('(foo(["foo ", "\\\\nbar"])((f("`"))))', desugar('foo`foo ${f("`")}\\nbar`'));
}

function testNestedQuasi() {
  assertEquals('(foo(["foo ", "\\\\nbar"])((f((bar(["-", "-"])((x)))))))', desugar('foo`foo ${f(bar`-${x}-`)}\\nbar`'));
}