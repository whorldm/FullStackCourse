### 1.面向对象
#### 1.1
```
function Person() {    
  this.name = 1;    
  return {};
}
var person = new Person();
console.log('name:', person.name); // 'name: undefined'
```
#### 1.2
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
person.show();  // 'name is: 1'
```
#### 1.3
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
person.show();  // 'new show'
```
#### 1.4
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
person2.show();  // 'name is: 1'
person.show();  // 'new show'
```
### 2.综合题
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
Person.prototype.show();  // 'name is: 2'
(new Person()).show();   // 'name is: 1'
```

