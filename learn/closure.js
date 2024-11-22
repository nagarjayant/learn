function func(x) {
  var z = 8;
  return function (y) {
    return x + y + z;
  };
}
var n2 = new Number(16);
var a2 = func(n2);
var n3 = new Number(8);
var a3 = func(n3);
var n4 = new Number(4);
var a4 = func(n4);
var n5 = new Number(2);
var a5 = func(n5);
a1(2);
a2(4);
a3(8);
a4(16);
a5(32);
/*
o/p: 
32+2+8= 42
16+4+8= 28
8+8+8= 24
4+16+8= 28
2+32+8= 42
*/
