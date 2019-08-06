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
elem.addEventListener('click', obj.show);
elem.addEventListener('click', obj.show.bind(obj));
elem.addEventListener('click', function () {    
  obj.show();
})
```
### 2. 作用域
#### 2.1
```
var person = 1;
function showPerson() {    
  var person = 2;    
  console.log(person);
}
showPerson();
```
#### 2.2
```
var person = 1;
function showPerson() {    
  console.log(person);    
  var person = 2;
}
showPerson();
```
#### 2.3
```
var person = 1;
function showPerson() {    
  console.log(person);
  var person = 2;    
  function person() {}
}
showPerson();
```
#### 2.4
```
var person = 1;
function showPerson() {
  console.log(person);    
  function person() {}    
  var person = 2;
}
showPerson();
```
#### 2.5
```
for(var i = 0; i < 10; i++) {    
  console.log(i);  
}
for(var i = 0; i < 10; i++) {    
  setTimeout(function(){        
    console.log(i);      
  }, 0); 
}
for(var i = 0; i < 10; i++) {    
  (function(i){        
    setTimeout(function(){            
      console.log(i);          
    }, 0)    
  })(i); 
}
for(let i = 0; i < 10; i++) {    
  console.log(i);  
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
console.log('name:', person.name);  // 'name:undefined'
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
person.show();
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
  }};
  var person = new Person();
  Person.prototype.show = function () {    
    console.log('new show');
  };
person.show()
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
person2.show();
person.show();
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
Person.prototype.show();
(new Person()).show();
```


