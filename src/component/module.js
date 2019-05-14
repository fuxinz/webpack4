import './module.css'
export const fun = function() {
  var a = 1;
  for (var i = 0; i < 10; i++) {
    a = a++;
  }
  return a
};
