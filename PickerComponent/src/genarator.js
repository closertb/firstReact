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

let i = 0;
const $btn = document.querySelector('.btn');
$btn.addEventListener('click', () => {
  console.log('dfg');
  const action = `action data${i += 1}`;
  chan.put(action);
}, false);
function runTakeEffect(effect, cb) {
  chan.take((input) => {
    cb(input);
  });
}

function take() {
  return {
    type: 'take'
  };
}

function task(iterator) {
  const iter = iterator();
  console.log(iter);
  function next(args) {
    const result = iter.next(args); // { value: { type: 'take' }, done: false }
    console.log(result);
    if (!result.done) {
      const effect = result.value;
      if (effect.type === 'take') {
        console.log('go on');
        runTakeEffect(result.value, next);
      }
    }
  }
  next({ type: 'taker' });
}
function* mainSaga() {
  const action = yield take(); // { type: take }
  console.log(action);
}
task(mainSaga);

/* function* itera() {
  const fir = yield 1;
  console.log('in', fir);
  const sec = yield fir + 2;
  yield sec + 3;
}
const iter = itera();
console.log('fir', iter.next());
console.log('sec', iter.next(3));
console.log('thr', iter.next(4)); */

/* render((
    <Treat />
), document.getElementById('app')); */

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
});
