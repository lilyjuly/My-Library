// isEqual using function declaration
function isEqual(x, y) {
    if (x === y) {
      console.log('They are equal in type and value');
    } else if (x == y) {
      console.log('They are equal in value');
    } else {
      console.log('They are not equal');
    }
    return;
  }
  isEqual(10, 10);
  isEqual('10', 10);
  isEqual(10, true);   
  
  // Logs "They are equal in type and value"
  // Logs "They are equal in value"

  
  // Using function expression
  // var isEqualTakeTwo = function(x, y) {
  //   if (x === y) {
  //     console.log('They are equal in type and value');
  //   } else if (x == y) {
  //     console.log('They are equal in value');
  //   } else {
  //     console.log('They are not equal');
  //   }
  //   return;
  // };
  
  // Logs "They are not equal"                
  