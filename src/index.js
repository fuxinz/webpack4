import fun from "./component/module";
var a = fun;
console.log(a);

if (module.hot) {
  // 实现热更新
  module.hot.accept();
}
