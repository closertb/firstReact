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
  const action = `action data${i++}`;
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
    const result = iter.next(args);
    if (!result.done) {
      const effect = result.value;
      if (effect.type === 'take') {
        console.log('go on');
        runTakeEffect(result.value, next);
      }
    }
  }
  next();
}
function* mainSaga() {
  const action = yield take();
  console.log(action);
}
task(mainSaga);
/* render((
    <Treat />
), document.getElementById('app')); */
