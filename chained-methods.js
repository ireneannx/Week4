//method 1
function a() {
    return {
      b: b
    }
  }
  
  function b() {
    return {
        csw:c
    }
  }

  function c(){
      console.log("hello world")
  }

  a().b().c();


  //method 2 (easier)
  function a(){
    var obj = {
        b: function(){
            var obj2 = {
                c: function(){
                    console.log("Hello World")
                }
            }
            return obj2
        }
    }
    return obj
}
​
a().b().c()

