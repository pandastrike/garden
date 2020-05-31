"use strict";

var _assert = _interopRequireDefault(require("assert"));

var _amen = require("amen");

var _index = require("../src/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(async function () {
  (0, _amen.print)((await (0, _amen.test)("Core functions", [(0, _amen.test)("noOp", function () {
    return (0, _assert.default)((0, _index.noOp)(7) === void 0);
  }), (0, _amen.test)("identity", function () {
    return (0, _assert.default)((0, _index.identity)(7) === 7);
  }), (0, _amen.test)("wrap", function () {
    return (0, _assert.default)((0, _index.wrap)(7)() === 7);
  }), (0, _amen.test)("unary", function () {
    return (0, _assert.default)((0, _index.unary)(function () {}).length === 1);
  }), (0, _amen.test)("binary", function () {
    return (0, _assert.default)((0, _index.binary)(function () {}).length === 2);
  }), (0, _amen.test)("ternary", function () {
    return (0, _assert.default)((0, _index.ternary)(function () {}).length === 3);
  }), (0, _amen.test)("arity", function () {
    var f, g;

    f = function (x = 0, y = 0, z = 0) {
      return x + y + z;
    };

    g = (0, _index.arity)(2, f);
    (0, _assert.default)(g.length === 2);
    (0, _assert.default)(g(1, 2) === 3);
    return (0, _assert.default)(g(1, 2, 3) === 6);
  }), (0, _amen.test)("curry", [(0, _amen.test)("nullary function", function () {
    var g;
    g = (0, _index.curry)(function () {
      return 0;
    });
    (0, _assert.default)(g.length === 0);
    return (0, _assert.default)(g() === 0);
  }), (0, _amen.test)("unary function", function () {
    var g;
    g = (0, _index.curry)(function (x) {
      return x;
    });
    (0, _assert.default)(g.length === 1);
    return (0, _assert.default)(g(1) === 1);
  }), (0, _amen.test)("binary function", function () {
    var g;
    g = (0, _index.curry)(function (x, y) {
      return x + y;
    });
    (0, _assert.default)(g.length === 2);
    return (0, _assert.default)(g(1, 2) === 3);
  }), (0, _amen.test)("ternary function", function () {
    var g;
    g = (0, _index.curry)(function (x, y, z) {
      return x + y + z;
    });
    (0, _assert.default)(g.length === 3);
    return (0, _assert.default)(g(1, 2, 3) === 6);
  }), (0, _amen.test)("returns curried function", function () {
    var g, h, i, j;
    g = (0, _index.curry)(function (w, x, y, z) {
      return w + x + y + z;
    });
    (0, _assert.default)(g.length === 4);
    h = g(1);
    (0, _assert.default)(h.length === 3);
    i = h(2);
    (0, _assert.default)(i.length === 2);
    j = i(3);
    (0, _assert.default)(j.length === 1);
    return (0, _assert.default)(j(4) === 10);
  })]), (0, _amen.test)("substitute", function () {
    return (0, _assert.default)((0, _index.substitute)([1, _index._, 3], [2])[1] === 2);
  }), (0, _amen.test)("partial", function () {
    var square;
    square = (0, _index.partial)(Math.pow, _index._, 2);
    return (0, _assert.default)(square(3) === 9);
  }), (0, _amen.test)("flip", function () {
    var square;
    square = (0, _index.curry)((0, _index.flip)(Math.pow))(2);
    return (0, _assert.default)(square(3) === 9);
  }), (0, _amen.test)("compose", function () {
    var inverse, inverseSquare, square;

    inverse = function (x) {
      return 1 / x;
    };

    square = function (x) {
      return x * x;
    };

    inverseSquare = (0, _index.compose)(inverse, square);
    return (0, _assert.default)(inverseSquare(5 === 1 / 25));
  }), (0, _amen.test)("compose (promise)", function* () {
    var inverse, inverseSquare, square;

    inverse = function (x) {
      return Promise.resolve(1 / x);
    };

    square = function (x) {
      return x * x;
    };

    inverseSquare = (0, _index.compose)(inverse, square);
    (0, _assert.default)(inverseSquare(5).then != null);
    return (0, _assert.default)((yield inverseSquare(5)) === 1 / 25);
  }), (0, _amen.test)("tee", [(0, _amen.test)("nullary function", function () {
    var f, g;

    f = function () {
      return 1;
    };

    g = (0, _index.tee)(f);
    (0, _assert.default)(g.length === 1);
    return (0, _assert.default)(g(5) === 5);
  }), (0, _amen.test)("unary function", function () {
    var f;
    f = (0, _index.tee)(function (x) {
      return 1 / x;
    });
    (0, _assert.default)(f.length === 1);
    return (0, _assert.default)(f(5) === 5);
  }), (0, _amen.test)("binary function", function () {
    var f;
    f = (0, _index.tee)(function (x, y) {
      return x + y;
    });
    (0, _assert.default)(f.length === 2);
    return (0, _assert.default)(f(5, 10) === 5);
  }), (0, _amen.test)("ternary function", function () {
    var f;
    f = (0, _index.tee)(function (x, y, z) {
      return x + y + z;
    });
    (0, _assert.default)(f.length === 3);
    return (0, _assert.default)(f(5, 10, 15) === 5);
  })]), (0, _amen.test)("tee (promise)", [(0, _amen.test)("nullary function", async function () {
    var f;
    f = (0, _index.tee)(function () {
      return Promise.resolve(1);
    });
    (0, _assert.default)(f.length === 1);
    return (0, _assert.default)((await f(5)) === 5);
  }), (0, _amen.test)("unary function", async function () {
    var f;
    f = (0, _index.tee)(function (x) {
      return Promise.resolve(1 / x);
    });
    (0, _assert.default)(f.length === 1);
    return (0, _assert.default)((await f(5)) === 5);
  }), (0, _amen.test)("binary function", async function () {
    var f;
    f = (0, _index.tee)(function (x, y) {
      return Promise.resolve(x + y);
    });
    (0, _assert.default)(f.length === 2);
    return (0, _assert.default)((await f(5, 10)) === 5);
  }), (0, _amen.test)("ternary function", async function () {
    var f;
    f = (0, _index.tee)(function (x, y, z) {
      return Promise.resolve(x + y + z);
    });
    (0, _assert.default)(f.length === 3);
    return (0, _assert.default)((await f(5, 10, 15)) === 5);
  })]), (0, _amen.test)("rtee", [(0, _amen.test)("nullary function", function () {
    var f;
    f = (0, _index.rtee)(function () {
      return 1;
    });
    (0, _assert.default)(f.length === 1);
    return (0, _assert.default)(f(5) === 5);
  }), (0, _amen.test)("unary function", function () {
    var f;
    f = (0, _index.rtee)(function (x) {
      return 1 / x;
    });
    (0, _assert.default)(f.length === 1);
    return (0, _assert.default)(f(5) === 5);
  }), (0, _amen.test)("binary function", function () {
    var f;
    f = (0, _index.rtee)(function (x, y) {
      return x + y;
    });
    (0, _assert.default)(f.length === 2);
    return (0, _assert.default)(f(5, 10) === 10);
  }), (0, _amen.test)("ternary function", function () {
    var f;
    f = (0, _index.rtee)(function (x, y, z) {
      return x + y + z;
    });
    (0, _assert.default)(f.length === 3);
    return (0, _assert.default)(f(5, 10, 15) === 15);
  })]), (0, _amen.test)("rtee (promise)", [(0, _amen.test)("nullary function", async function () {
    var f;
    f = (0, _index.rtee)(function () {
      return Promise.resolve(1);
    });
    (0, _assert.default)(f.length === 1);
    return (0, _assert.default)((await f(5)) === 5);
  }), (0, _amen.test)("unary function", async function () {
    var f;
    f = (0, _index.rtee)(function (x) {
      return Promise.resolve(1 / x);
    });
    (0, _assert.default)(f.length === 1);
    return (0, _assert.default)((await f(5)) === 5);
  }), (0, _amen.test)("binary function", async function () {
    var f;
    f = (0, _index.rtee)(function (x, y) {
      return Promise.resolve(x + y);
    });
    (0, _assert.default)(f.length === 2);
    return (0, _assert.default)((await f(5, 10)) === 10);
  }), (0, _amen.test)("ternary function", async function () {
    var f;
    f = (0, _index.rtee)(function (x, y, z) {
      return Promise.resolve(x + y + z);
    });
    (0, _assert.default)(f.length === 3);
    return (0, _assert.default)((await f(5, 10, 15)) === 15);
  })]), (0, _amen.test)("wait", async function () {
    var square;
    square = (0, _index.wait)(function (x) {
      return Math.pow(x, 2);
    });
    (0, _assert.default)(square(2) === 4);
    return (0, _assert.default)((await square(Promise.resolve(2))) === 4);
  }), (0, _amen.test)("pipe", function () {
    var a, alpha, b, c;

    a = function (x) {
      return x + "a";
    };

    b = function (x) {
      return x + "b";
    };

    c = function (x) {
      return x + "c";
    };

    alpha = (0, _index.pipe)(a, b, c);
    return (0, _assert.default)(alpha("S") === "Sabc");
  }), (0, _amen.test)("flow", [(0, _amen.test)("sync works", function () {
    var a, alpha, b, c;

    a = function (x) {
      return x + "a";
    };

    b = function (x) {
      return x + "b";
    };

    c = function (x) {
      return x + "c";
    };

    alpha = (0, _index.pipe)(a, b, c);
    return (0, _assert.default)(alpha("S") === "Sabc");
  }), (0, _amen.test)("async waits for antecedants", async function () {
    var a, alpha, b, c;

    a = function (x) {
      return Promise.resolve(x + "a");
    };

    b = function (x) {
      return Promise.resolve(x + "b");
    };

    c = function (x) {
      return Promise.resolve(x + "c");
    };

    alpha = (0, _index.flow)(a, b, c);
    return (0, _assert.default)((await alpha("S")) === "Sabc");
  }), (0, _amen.test)("spreads array input", async function () {
    var a, alpha, b, c;

    a = function (x) {
      return Promise.resolve(x + "a");
    };

    b = function (x) {
      return Promise.resolve(x + "b");
    };

    c = function (x) {
      return Promise.resolve(x + "c");
    };

    alpha = (0, _index.flow)([a, b, c]);
    return (0, _assert.default)((await alpha("S")) === "Sabc");
  })]), (0, _amen.test)("apply", function () {
    return (0, _assert.default)((0, _index.apply)(_index.identity, 1) === 1);
  }), (0, _amen.test)("spread", function () {
    return (0, _assert.default)((0, _index.spread)(function (a, b) {
      return a + b;
    })(["a", "b"]) === "ab");
  }), (0, _amen.test)("negate", function () {
    return (0, _assert.default)((0, _index.negate)(function () {
      return false;
    })());
  }), (0, _amen.test)("once", function () {
    var f;
    (f = function (i) {
      return (0, _index.once)(function () {
        return i++;
      });
    }(0))();
    return (0, _assert.default)(f() === 0);
  }), (0, _amen.test)("memoize", function () {
    var count, f;
    count = 0;
    f = (0, _index.memoize)(function (x, y) {
      count++;
      return x;
    });
    return [(0, _amen.test)("runs the function", function () {
      return (0, _assert.default)(f(1, 2) === 1 && count === 1);
    }), (0, _amen.test)("but only once for a given argument", function () {
      return (0, _assert.default)(f(1, 2) === 1 && count === 1);
    }), (0, _amen.test)("without affecting any other arguments", function () {
      return (0, _assert.default)(f(2, 1) === 2 && count === 2);
    })];
  }())])));
  return process.exit(_amen.success ? 0 : 1);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9keS9yZXBvcy9wYW5kYXN0cmlrZS9nYXJkZW4vdGVzdC9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFFQTs7OztBQU1HLENBQUEsa0JBQUE7QUFFRCxvQkFBTSxNQUFNLGdCQUFBLGdCQUFBLEVBQXVCLENBRWpDLGdCQUFBLE1BQUEsRUFBYSxZQUFBO1dBQUcscUJBQVEsaUJBQUQsQ0FBQyxDQUFELEtBQVksS0FBbkIsQ0FBQSxDO0FBRmlCLEdBRWpDLENBRmlDLEVBR2pDLGdCQUFBLFVBQUEsRUFBaUIsWUFBQTtXQUFHLHFCQUFRLHFCQUFELENBQUMsQ0FBRCxLQUFQLENBQUEsQztBQUhhLEdBR2pDLENBSGlDLEVBSWpDLGdCQUFBLE1BQUEsRUFBYSxZQUFBO1dBQUcscUJBQVEsaUJBQUQsQ0FBQyxDQUFELE9BQVAsQ0FBQSxDO0FBSmlCLEdBSWpDLENBSmlDLEVBTWpDLGdCQUFBLE9BQUEsRUFBYyxZQUFBO1dBQUcscUJBQVEsa0JBQU0sWUFBQSxDQUFQLENBQUMsQ0FBRCxDQUFBLE1BQUEsS0FBUCxDQUFBLEM7QUFOZ0IsR0FNakMsQ0FOaUMsRUFPakMsZ0JBQUEsUUFBQSxFQUFlLFlBQUE7V0FBRyxxQkFBUSxtQkFBTyxZQUFBLENBQVIsQ0FBQyxDQUFELENBQUEsTUFBQSxLQUFQLENBQUEsQztBQVBlLEdBT2pDLENBUGlDLEVBUWpDLGdCQUFBLFNBQUEsRUFBZ0IsWUFBQTtXQUFHLHFCQUFRLG9CQUFRLFlBQUEsQ0FBVCxDQUFDLENBQUQsQ0FBQSxNQUFBLEtBQVAsQ0FBQSxDO0FBUmMsR0FRakMsQ0FSaUMsRUFVakMsZ0JBQUEsT0FBQSxFQUFjLFlBQUE7QUFDWixRQUFBLENBQUEsRUFBQSxDQUFBOztBQUFBLElBQUEsQ0FBQSxHQUFJLFVBQUMsQ0FBQSxHQUFELENBQUEsRUFBTSxDQUFBLEdBQU4sQ0FBQSxFQUFXLENBQUEsR0FBWCxDQUFBLEVBQUE7YUFBbUIsQ0FBQSxHQUFBLENB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QUFBLEtBQUEsQ0FBQSxJQUFnQixLQUFBLEtBQXZCLENBQUEsQztBQUpKLEtBR0UsQ0FIRixFQUtFLGdCQUFBLHVDQUFBLEVBQThDLFlBQUE7YUFDNUMscUJBQU8sQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsS0FBQSxDQUFBLElBQWdCLEtBQUEsS0FBdkIsQ0FBQSxDO0FBTkosS0FLRSxDQUxGLEM7QUF6TStCLEdBc01kLEVBQW5CLENBdE1pQyxDQUF2QixDQUFaO1NBbU5BLE9BQU8sQ0FBUCxJQUFBLENBQWEsZ0JBQUEsQ0FBQSxHQUFiLENBQUEsQztBQXJORixDQUFHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tIFwiYXNzZXJ0XCJcbmltcG9ydCB7cHJpbnQsIHRlc3QsIHN1Y2Nlc3N9IGZyb20gXCJhbWVuXCJcblxuaW1wb3J0IHtub09wLCBpZGVudGl0eSwgd3JhcCxcbiAgYXJpdHksIHVuYXJ5LCBiaW5hcnksIHRlcm5hcnksXG4gIGN1cnJ5LCBfLCBzdWJzdGl0dXRlLCBwYXJ0aWFsLFxuICBmbGlwLCBjb21wb3NlLCBwaXBlLCBhcHBseSwgc3ByZWFkLCB3YWl0LCBmbG93LFxuICBuZWdhdGUsIG9uY2UsIGdpdmVuLCBtZW1vaXplLCB0ZWUsIHJ0ZWV9IGZyb20gXCIuLi9zcmMvaW5kZXhcIlxuXG5kbyAtPlxuXG4gIHByaW50IGF3YWl0IHRlc3QgXCJDb3JlIGZ1bmN0aW9uc1wiLCBbXG5cbiAgICB0ZXN0IFwibm9PcFwiLCAtPiBhc3NlcnQgKG5vT3AgNykgPT0gdW5kZWZpbmVkXG4gICAgdGVzdCBcImlkZW50aXR5XCIsIC0+IGFzc2VydCAoaWRlbnRpdHkgNykgPT0gN1xuICAgIHRlc3QgXCJ3cmFwXCIsIC0+IGFzc2VydCAod3JhcCA3KSgpID09IDdcblxuICAgIHRlc3QgXCJ1bmFyeVwiLCAtPiBhc3NlcnQgKHVuYXJ5IC0+KS5sZW5ndGggPT0gMVxuICAgIHRlc3QgXCJiaW5hcnlcIiwgLT4gYXNzZXJ0IChiaW5hcnkgLT4pLmxlbmd0aCA9PSAyXG4gICAgdGVzdCBcInRlcm5hcnlcIiwgLT4gYXNzZXJ0ICh0ZXJuYXJ5IC0+KS5sZW5ndGggPT0gM1xuXG4gICAgdGVzdCBcImFyaXR5XCIsIC0+XG4gICAgICBmID0gKHg9MCwgeT0wLCB6PTApIC0+IHggKyB5ICsgelxuICAgICAgZyA9IGFyaXR5IDIsIGZcbiAgICAgIGFzc2VydCBnLmxlbmd0aCA9PSAyXG4gICAgICBhc3NlcnQgKGcgMSwgMikgPT0gM1xuICAgICAgYXNzZXJ0IChnIDEsIDIsIDMpID09IDZcblxuICAgIHRlc3QgXCJjdXJyeVwiLCBbXG4gICAgICAgIHRlc3QgXCJudWxsYXJ5IGZ1bmN0aW9uXCIsIC0+XG4gICAgICAgICAgZyA9IGN1cnJ5IC0+IDBcbiAgICAgICAgICBhc3NlcnQgZy5sZW5ndGggPT0gMFxuICAgICAgICAgIGFzc2VydCBnKCkgPT0gMFxuICAgICAgICB0ZXN0IFwidW5hcnkgZnVuY3Rpb25cIiwgLT5cbiAgICAgICAgICBnID0gY3VycnkgKHgpIC0+IHhcbiAgICAgICAgICBhc3NlcnQgZy5sZW5ndGggPT0gMVxuICAgICAgICAgIGFzc2VydCAoZyAxKSA9PSAxXG4gICAgICAgIHRlc3QgXCJiaW5hcnkgZnVuY3Rpb25cIiwgLT5cbiAgICAgICAgICBnID0gY3VycnkgKHgseSkgLT4geCArIHlcbiAgICAgICAgICBhc3NlcnQgZy5sZW5ndGggPT0gMlxuICAgICAgICAgIGFzc2VydCAoZyAxLCAyKSA9PSAzXG4gICAgICAgIHRlc3QgXCJ0ZXJuYXJ5IGZ1bmN0aW9uXCIsIC0+XG4gICAgICAgICAgZyA9IGN1cnJ5ICh4LHkseikgLT4geCArIHkgKyB6XG4gICAgICAgICAgYXNzZXJ0IGcubGVuZ3RoID09IDNcbiAgICAgICAgICBhc3NlcnQgKGcgMSwgMiwgMykgPT0gNlxuICAgICAgICB0ZXN0IFwicmV0dXJucyBjdXJyaWVkIGZ1bmN0aW9uXCIsIC0+XG4gICAgICAgICAgZyA9IGN1cnJ5ICh3LHgseSx6KSAtPiB3ICsgeCArIHkgKyB6XG4gICAgICAgICAgYXNzZXJ0IGcubGVuZ3RoID09IDRcbiAgICAgICAgICBoID0gZyAxXG4gICAgICAgICAgYXNzZXJ0IGgubGVuZ3RoID09IDNcbiAgICAgICAgICBpID0gaCAyXG4gICAgICAgICAgYXNzZXJ0IGkubGVuZ3RoID09IDJcbiAgICAgICAgICBqID0gaSAzXG4gICAgICAgICAgYXNzZXJ0IGoubGVuZ3RoID09IDFcbiAgICAgICAgICBhc3NlcnQgKGogNCkgPT0gMTBcbiAgICBdXG5cbiAgICB0ZXN0IFwic3Vic3RpdHV0ZVwiLCAtPlxuICAgICAgYXNzZXJ0IChzdWJzdGl0dXRlIFsxLCBfLCAzXSwgWzJdKVsxXSA9PSAyXG5cbiAgICB0ZXN0IFwicGFydGlhbFwiLCAtPlxuICAgICAgc3F1YXJlID0gcGFydGlhbCBNYXRoLnBvdywgXywgMlxuICAgICAgYXNzZXJ0IChzcXVhcmUgMykgPT0gOVxuXG4gICAgdGVzdCBcImZsaXBcIiwgLT5cbiAgICAgIHNxdWFyZSA9ICAoY3VycnkgZmxpcCBNYXRoLnBvdykoMilcbiAgICAgIGFzc2VydCAoc3F1YXJlIDMpID09IDlcblxuICAgIHRlc3QgXCJjb21wb3NlXCIsIC0+XG4gICAgICBpbnZlcnNlID0gKHgpIC0+IDEveFxuICAgICAgc3F1YXJlID0gKHgpIC0+IHggKiB4XG4gICAgICBpbnZlcnNlU3F1YXJlID0gY29tcG9zZSBpbnZlcnNlLCBzcXVhcmVcbiAgICAgIGFzc2VydCBpbnZlcnNlU3F1YXJlIDUgPT0gMS8yNVxuXG4gICAgdGVzdCBcImNvbXBvc2UgKHByb21pc2UpXCIsIC0+XG4gICAgICBpbnZlcnNlID0gKHgpIC0+IFByb21pc2UucmVzb2x2ZSAxL3hcbiAgICAgIHNxdWFyZSA9ICh4KSAtPiB4ICogeFxuICAgICAgaW52ZXJzZVNxdWFyZSA9IGNvbXBvc2UgaW52ZXJzZSwgc3F1YXJlXG4gICAgICBhc3NlcnQgKGludmVyc2VTcXVhcmUgNSkudGhlbj9cbiAgICAgIGFzc2VydCAoeWllbGQgaW52ZXJzZVNxdWFyZSA1KSA9PSAxLzI1XG5cbiAgICB0ZXN0IFwidGVlXCIsIFtcbiAgICAgIHRlc3QgXCJudWxsYXJ5IGZ1bmN0aW9uXCIsIC0+XG4gICAgICAgIGYgPSAtPiAxXG4gICAgICAgIGcgPSB0ZWUgZlxuICAgICAgICBhc3NlcnQgZy5sZW5ndGggPT0gMVxuICAgICAgICBhc3NlcnQgKGcgNSkgPT0gNVxuICAgICAgdGVzdCBcInVuYXJ5IGZ1bmN0aW9uXCIsIC0+XG4gICAgICAgIGYgPSB0ZWUgKHgpIC0+IDEveFxuICAgICAgICBhc3NlcnQgZi5sZW5ndGggPT0gMVxuICAgICAgICBhc3NlcnQgKGYgNSkgPT0gNVxuICAgICAgdGVzdCBcImJpbmFyeSBmdW5jdGlvblwiLCAtPlxuICAgICAgICBmID0gdGVlICh4LCB5KSAtPiB4ICsgeVxuICAgICAgICBhc3NlcnQgZi5sZW5ndGggPT0gMlxuICAgICAgICBhc3NlcnQgKGYgNSwgMTApID09IDVcbiAgICAgIHRlc3QgXCJ0ZXJuYXJ5IGZ1bmN0aW9uXCIsIC0+XG4gICAgICAgIGYgPSB0ZWUgKHgsIHksIHopIC0+IHggKyB5ICsgelxuICAgICAgICBhc3NlcnQgZi5sZW5ndGggPT0gM1xuICAgICAgICBhc3NlcnQgKGYgNSwgMTAsIDE1KSA9PSA1XG4gICAgXVxuXG4gICAgdGVzdCBcInRlZSAocHJvbWlzZSlcIiwgW1xuICAgICAgdGVzdCBcIm51bGxhcnkgZnVuY3Rpb25cIiwgLT5cbiAgICAgICAgZiA9IHRlZSAtPiBQcm9taXNlLnJlc29sdmUgMVxuICAgICAgICBhc3NlcnQgZi5sZW5ndGggPT0gMVxuICAgICAgICBhc3NlcnQgKGF3YWl0IGYgNSkgPT0gNVxuICAgICAgdGVzdCBcInVuYXJ5IGZ1bmN0aW9uXCIsIC0+XG4gICAgICAgIGYgPSB0ZWUgKHgpIC0+IFByb21pc2UucmVzb2x2ZSAxL3hcbiAgICAgICAgYXNzZXJ0IGYubGVuZ3RoID09IDFcbiAgICAgICAgYXNzZXJ0IChhd2FpdCBmIDUpID09IDVcbiAgICAgIHRlc3QgXCJiaW5hcnkgZnVuY3Rpb25cIiwgLT5cbiAgICAgICAgZiA9IHRlZSAoeCwgeSkgLT4gUHJvbWlzZS5yZXNvbHZlIHggKyB5XG4gICAgICAgIGFzc2VydCBmLmxlbmd0aCA9PSAyXG4gICAgICAgIGFzc2VydCAoYXdhaXQgZiA1LCAxMCkgPT0gNVxuICAgICAgdGVzdCBcInRlcm5hcnkgZnVuY3Rpb25cIiwgLT5cbiAgICAgICAgZiA9IHRlZSAoeCwgeSwgeikgLT4gUHJvbWlzZS5yZXNvbHZlIHggKyB5ICsgelxuICAgICAgICBhc3NlcnQgZi5sZW5ndGggPT0gM1xuICAgICAgICBhc3NlcnQgKGF3YWl0IGYgNSwgMTAsIDE1KSA9PSA1XG4gICAgXVxuXG4gICAgdGVzdCBcInJ0ZWVcIiwgW1xuICAgICAgdGVzdCBcIm51bGxhcnkgZnVuY3Rpb25cIiwgLT5cbiAgICAgICAgZiA9IHJ0ZWUgLT4gMVxuICAgICAgICBhc3NlcnQgZi5sZW5ndGggPT0gMVxuICAgICAgICBhc3NlcnQgKGYgNSkgPT0gNVxuICAgICAgdGVzdCBcInVuYXJ5IGZ1bmN0aW9uXCIsIC0+XG4gICAgICAgIGYgPSBydGVlICh4KSAtPiAxL3hcbiAgICAgICAgYXNzZXJ0IGYubGVuZ3RoID09IDFcbiAgICAgICAgYXNzZXJ0IChmIDUpID09IDVcbiAgICAgIHRlc3QgXCJiaW5hcnkgZnVuY3Rpb25cIiwgLT5cbiAgICAgICAgZiA9IHJ0ZWUgKHgsIHkpIC0+IHggKyB5XG4gICAgICAgIGFzc2VydCBmLmxlbmd0aCA9PSAyXG4gICAgICAgIGFzc2VydCAoZiA1LCAxMCkgPT0gMTBcbiAgICAgIHRlc3QgXCJ0ZXJuYXJ5IGZ1bmN0aW9uXCIsIC0+XG4gICAgICAgIGYgPSBydGVlICh4LCB5LCB6KSAtPiB4ICsgeSArIHpcbiAgICAgICAgYXNzZXJ0IGYubGVuZ3RoID09IDNcbiAgICAgICAgYXNzZXJ0IChmIDUsIDEwLCAxNSkgPT0gMTVcbiAgICBdXG5cbiAgICB0ZXN0IFwicnRlZSAocHJvbWlzZSlcIiwgW1xuXG4gICAgICB0ZXN0IFwibnVsbGFyeSBmdW5jdGlvblwiLCAtPlxuICAgICAgICBmID0gcnRlZSAtPiBQcm9taXNlLnJlc29sdmUgMVxuICAgICAgICBhc3NlcnQgZi5sZW5ndGggPT0gMVxuICAgICAgICBhc3NlcnQgKGF3YWl0IGYgNSkgPT0gNVxuICAgICAgdGVzdCBcInVuYXJ5IGZ1bmN0aW9uXCIsIC0+XG4gICAgICAgIGYgPSBydGVlICh4KSAtPiBQcm9taXNlLnJlc29sdmUgMS94XG4gICAgICAgIGFzc2VydCBmLmxlbmd0aCA9PSAxXG4gICAgICAgIGFzc2VydCAoYXdhaXQgZiA1KSA9PSA1XG4gICAgICB0ZXN0IFwiYmluYXJ5IGZ1bmN0aW9uXCIsIC0+XG4gICAgICAgIGYgPSBydGVlICh4LCB5KSAtPiBQcm9taXNlLnJlc29sdmUgeCArIHlcbiAgICAgICAgYXNzZXJ0IGYubGVuZ3RoID09IDJcbiAgICAgICAgYXNzZXJ0IChhd2FpdCBmIDUsIDEwKSA9PSAxMFxuICAgICAgdGVzdCBcInRlcm5hcnkgZnVuY3Rpb25cIiwgLT5cbiAgICAgICAgZiA9IHJ0ZWUgKHgsIHksIHopIC0+IFByb21pc2UucmVzb2x2ZSB4ICsgeSArIHpcbiAgICAgICAgYXNzZXJ0IGYubGVuZ3RoID09IDNcbiAgICAgICAgYXNzZXJ0IChhd2FpdCBmIDUsIDEwLCAxNSkgPT0gMTVcbiAgICBdXG5cbiAgICB0ZXN0IFwid2FpdFwiLCAtPlxuICAgICAgc3F1YXJlID0gd2FpdCAoeCkgLT4gTWF0aC5wb3cgeCwgMlxuICAgICAgYXNzZXJ0IChzcXVhcmUgMikgPT0gNFxuICAgICAgYXNzZXJ0IChhd2FpdCBzcXVhcmUgUHJvbWlzZS5yZXNvbHZlIDIpID09IDRcblxuICAgIHRlc3QgXCJwaXBlXCIsIC0+XG4gICAgICBhID0gKHgpIC0+IHggKyBcImFcIlxuICAgICAgYiA9ICh4KSAtPiB4ICsgXCJiXCJcbiAgICAgIGMgPSAoeCkgLT4geCArIFwiY1wiXG4gICAgICBhbHBoYSA9IHBpcGUgYSwgYiwgY1xuICAgICAgYXNzZXJ0IChhbHBoYSBcIlNcIikgPT0gXCJTYWJjXCJcblxuICAgIHRlc3QgXCJmbG93XCIsIFtcblxuICAgICAgdGVzdCBcInN5bmMgd29ya3NcIiwgLT5cbiAgICAgICAgYSA9ICh4KSAtPiB4ICsgXCJhXCJcbiAgICAgICAgYiA9ICh4KSAtPiB4ICsgXCJiXCJcbiAgICAgICAgYyA9ICh4KSAtPiB4ICsgXCJjXCJcbiAgICAgICAgYWxwaGEgPSBwaXBlIGEsIGIsIGNcbiAgICAgICAgYXNzZXJ0IChhbHBoYSBcIlNcIikgPT0gXCJTYWJjXCJcblxuICAgICAgdGVzdCBcImFzeW5jIHdhaXRzIGZvciBhbnRlY2VkYW50c1wiLCAtPlxuICAgICAgICBhID0gKHgpIC0+IFByb21pc2UucmVzb2x2ZSB4ICsgXCJhXCJcbiAgICAgICAgYiA9ICh4KSAtPiBQcm9taXNlLnJlc29sdmUgeCArIFwiYlwiXG4gICAgICAgIGMgPSAoeCkgLT4gUHJvbWlzZS5yZXNvbHZlIHggKyBcImNcIlxuICAgICAgICBhbHBoYSA9IGZsb3cgYSwgYiwgY1xuICAgICAgICBhc3NlcnQgKGF3YWl0IGFscGhhIFwiU1wiKSA9PSBcIlNhYmNcIlxuXG4gICAgICB0ZXN0IFwic3ByZWFkcyBhcnJheSBpbnB1dFwiLCAtPlxuICAgICAgICBhID0gKHgpIC0+IFByb21pc2UucmVzb2x2ZSB4ICsgXCJhXCJcbiAgICAgICAgYiA9ICh4KSAtPiBQcm9taXNlLnJlc29sdmUgeCArIFwiYlwiXG4gICAgICAgIGMgPSAoeCkgLT4gUHJvbWlzZS5yZXNvbHZlIHggKyBcImNcIlxuICAgICAgICBhbHBoYSA9IGZsb3cgW2EsIGIsIGNdXG4gICAgICAgIGFzc2VydCAoYXdhaXQgYWxwaGEgXCJTXCIpID09IFwiU2FiY1wiXG5cbiAgICBdXG5cbiAgICB0ZXN0IFwiYXBwbHlcIiwgLT5cbiAgICAgIGFzc2VydCAoYXBwbHkgaWRlbnRpdHksIDEpID09IDFcblxuICAgIHRlc3QgXCJzcHJlYWRcIiwgLT5cbiAgICAgIGFzc2VydCAoc3ByZWFkIChhLCBiKSAtPiBhICsgYikoW1wiYVwiLCBcImJcIl0pID09IFwiYWJcIlxuXG4gICAgdGVzdCBcIm5lZ2F0ZVwiLCAtPlxuICAgICAgYXNzZXJ0IChuZWdhdGUgLT4gZmFsc2UpKClcblxuICAgIHRlc3QgXCJvbmNlXCIsIC0+XG4gICAgICAoZiA9IGRvIChpPTApIC0+IG9uY2UgLT4gaSsrKSgpXG4gICAgICBhc3NlcnQgZigpID09IDBcblxuICAgIHRlc3QgXCJtZW1vaXplXCIsIGRvIC0+XG4gICAgICBjb3VudCA9IDBcbiAgICAgIGYgPSBtZW1vaXplICh4LCB5KSAtPiBjb3VudCsrOyB4XG4gICAgICBbXG4gICAgICAgIHRlc3QgXCJydW5zIHRoZSBmdW5jdGlvblwiLCAtPlxuICAgICAgICAgIGFzc2VydCBmKDEsIDIpID09IDEgJiYgY291bnQgPT0gMVxuICAgICAgICB0ZXN0IFwiYnV0IG9ubHkgb25jZSBmb3IgYSBnaXZlbiBhcmd1bWVudFwiLCAtPlxuICAgICAgICAgIGFzc2VydCBmKDEsIDIpID09IDEgJiYgY291bnQgPT0gMVxuICAgICAgICB0ZXN0IFwid2l0aG91dCBhZmZlY3RpbmcgYW55IG90aGVyIGFyZ3VtZW50c1wiLCAtPlxuICAgICAgICAgIGFzc2VydCBmKDIsIDEpID09IDIgJiYgY291bnQgPT0gMlxuICAgICAgXVxuICBdXG5cbiAgcHJvY2Vzcy5leGl0IGlmIHN1Y2Nlc3MgdGhlbiAwIGVsc2UgMVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=/Users/dy/repos/pandastrike/garden/test/index.coffee