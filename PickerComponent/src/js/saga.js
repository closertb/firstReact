/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-02-03 21:47
 * @version 1.0
 * Description:
 */
function channel() {
  let taker;

  function take(cb) {
    taker = cb;
  }

  function put(input) {
    if (taker) {
      const tempTaker = taker;
      taker = null;
      tempTaker(input);
    }
  }

  return {
    put,
    take,
  };
}

const chan = channel();

function take() {
  return {
    type: 'take'
  };
}
function fork(cb) {
  console.log('fork', cb);
  return {
    type: 'fork',
    fn: cb,
  };
}

function runForkEffect(effect, cb) {
  /* eslint-disable  no-use-before-define */
  task(effect.fn || effect);
  cb();
}

function runTakeEffect(effect, cb) {
  // 注册下一个触发执行的函数
  chan.take((input) => {
    cb(input); // 下一个触发执行的起点
  });
}
function task(iterator) {
  const iter = typeof iterator === 'function' ? iterator() : iterator;
  console.log('log in', iter);
  function next(args) {
    const result = iter.next(args); // { value: { type: 'take' }, done: false }
    console.log('now iter', result);
    if (!result.done) {
      const effect = result.value;

      if (typeof effect[Symbol.iterator] === 'function') {
        runForkEffect(effect, next);
      } else if (effect.type) {
        switch (effect.type) {
          case 'take':
            runTakeEffect(effect, next);
            break;
          case 'fork':
            runForkEffect(effect, next);
            break;
          default:
        }
      }
    }
  }
  next();
}


function* takeEvery(worker) {
  /* eslint-disable  func-names */
  yield fork(function* smart() {
    while (true) {
      const action = yield take();
      // 这里的巧妙之处就在于一个take执行结束之后，函数在此暂停，直到下一次调用next()方法，又会触发注册一个执行函数
      worker(action);
    }
  });
}

function* mainSaga() {
  yield takeEvery((action) => {
    console.log('main', action);
  });
}
task(mainSaga);

let i = 0;
const $btn = document.querySelector('.btn');
$btn.addEventListener('click', () => {
  console.log('dfg');
  const action = `action data${i += 1}`;
  chan.put(action);
}, false);

/* const myiter = mainSaga();
console.log(myiter.next());
console.log(myiter.next()); */
/* function* itera() {
  const fir = yield 1;
  console.log('in', fir);
  const sec = yield fir + 2;
  yield sec + 3;
}
const iter = itera();
console.log('fir', iter.next());
console.log('sec', iter.next(3));
console.log('thr', iter.next(4));

function fetchData() {
  return (callback) => {
    setTimeout(() => {
      callback(null, 'HI');
    }, 500);
  };
}

function run(taskDef) {
  const task = taskDef();
  let result = task.next();
  function step() {
    if (!result.done) {
      if (typeof result.value === 'function') {
        result.value((err, data) => {
          if (err) {
            result = task.throw(err);
            return;
          }
          result = task.next(data);
          step();
        });
      } else {
        result = task.next(result.value);
        step();
      }
    }
  }
  step();
}

run(function* unname() {
  const contents = yield fetchData();
  console.log(contents);
  const op = yield 3;
  console.log(op);
}); */
