### 1 考察this
#### 1.1
```
function show() {
  console.log('this:', this);
}
var obj = {
  show: show
};
obj.show();   // this指向obj

var obj2 = {
  show: function() {
    show();
  }
}
obj2.show();  // this指向window
```
#### 1.2
```
var obj = {
  show: function() {
    console.log('this:', this);
  }
};
(0, obj.show)();  // this指向window
```
#### 1.3
```
var obj = {
  sub: {
    show: function () {
      console.log('this:', this);
    }
  }
}
obj.sub.show();  // this指向sub
```
#### 1.4
```
var obj = {
  show: function() {
    console.log('this:', this);
  }
};
var newObj = new obj.show();  // this指向newObj
```
#### 1.5
```
var obj = {    
  show: function () {        
    console.log('this:', this);    
  }
};
var newobj = new (obj.show.bind(obj))(); // this指向newObj
```
#### 1.6
```

```
#### 1.7
```
var obj = {    
  show: function () {        
    console.log('this:', this);    
  }
};
var elem = document.getElementById('book-search-results');
elem.addEventListener('click', obj.show);  // this指向elem
elem.addEventListener('click', obj.show.bind(obj));  // this指向obj
elem.addEventListener('click', function () {    
  obj.show(); // this指向obj
})
```
### 2. 作用域
#### 2.1
```
var person = 1;
function showPerson() {    
  var person = 2;    
  console.log(person);   // 2
}
showPerson(); 
```
#### 2.2
```
var person = 1;
function showPerson() {    
  console.log(person);  // undefined 
  var person = 2;
}
showPerson();  
```
#### 2.3
```
var person = 1;
function showPerson() {    
  console.log(person);  // 函数person
  var person = 2;    
  function person() {}
}
showPerson();
```
#### 2.4
```
var person = 1;
function showPerson() {
  console.log(person);  // 函数person  
  function person() {}    
  var person = 2;
}
showPerson();
```
#### 2.5
```
for(var i = 0; i < 10; i++) {    
  console.log(i);    // 0,1,2,3,4,5,6,7,8,9
}
for(var i = 0; i < 10; i++) {    
  setTimeout(function(){        
    console.log(i);    // 10,10,10,10,10,10,10,10,10,10  
  }, 0);               // 解析：setTimeout会让所有的打印语句都放在浏览器的任务队列，待for循环执行完成后才开始执行，此时变量i的值为10
}
for(var i = 0; i < 10; i++) {    
  (function(i){        
    setTimeout(function(){            
      console.log(i);   // 0,1,2,3,4,5,6,7,8,9       
    }, 0)               // 解析：立即执行函数，会创建局部作用域，将变量i每次循环的值传入，执行会打印出i每次循环的值
  })(i); 
}
for(let i = 0; i < 10; i++) {    
  console.log(i);   // 0,1,2,3,4,5,6,7,8,9 
}
```
### 3. 面向对象
#### 3.1
```
function Person() {
  this.name = 1;
  return {};
}
var person = new Person();
console.log('name:', person.name);  // 'name:undefined' 解析：构造函数模式会优先返回return值，即返回空对象
```
#### 3.2
```
function Person() {    
  this.name = 1;
}
Person.prototype = {    
  show: function () {        
    console.log('name is:', this.name);    
  }
};
var person = new Person();
person.show();   // 'name is: 1' 
```
#### 3.3
```
function Person() {    
  this.name = 1;
}
Person.prototype = {    
  name: 2,    
  show: function () {        
    console.log('name is:', this.name);    
  }
};
var person = new Person();
Person.prototype.show = function () {    
  console.log('new show');
};
person.show(); // 'new show' 解析：更改原型上的show方法，实例上的方法也会相应更改
```
#### 3.4
```
function Person() {    
  this.name = 1;
}
Person.prototype = {    
  name: 2,    
  show: function () {        
    console.log('name is:', this.name);    
  }
};
var person = new Person();
var person2 = new Person();
person.show = function () {    
  console.log('new show');
};
person2.show();  // 'name is: 1' 解析：person2实例上没有show方法，则会往上找，然后执行原型的show方法
person.show();  // 'new show' 解析：person实例添加show方法，则执行时会优先执行自身的show方法
```
### 4. 综合题
```
function Person() {    
  this.name = 1;
}
Person.prototype = {    
  name: 2,    
  show: function () {        
    console.log('name is:', this.name);    
  }
};
Person.prototype.show();  // 'name is: 2'  解析：show为原型对象上的方法，直接调用原型对象.show，此时this指向原型对象
(new Person()).show();  // 'name is: 1' 解析：this指向Person的实例
```
