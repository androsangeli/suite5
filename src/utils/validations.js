export const containsUppercase = (value) =>  /[A-Z]/.test(value)
export const containsLowercase = (value) =>  /[a-z]/.test(value)
export const containsNumber = (value) =>  /[0-9]/.test(value)
export const containsSpecial = (value) =>  /[#?!@$%^&*-]/.test(value)
export const containsNotSpecial = (value) =>  !/[&:?<>]/.test(value)
export const containsAllowed = (value) =>  /^[A-Za-z0-9/#?!@$%^&*-]*$/.test(value)
export const containsSequence = (value) =>  !'123456789'.includes(value) && !'abcdefghijklmnopqrstuvwxyz'.includes(value)

export const isValidSubsequence = (value) => {
    
    if(value) {
       var test = (x) => !isNaN(x);
       var check = (x, y, i) => x + i === y;
    
       for(var i = 0; i < value.length - 2; i++) {
         if(test(value[i])) {
            if(test(value[i + 1]) && test(value[i + 2])) {
              if(check(Number(value[i]),Number(value[i + 1]), 1) &&
                check(Number(value[i]), Number(value[i + 2]), 2)) {
                return false;
              }
            }
         } else if(!test(value[i + 1]) && !test(value[i + 2])) {
            if(check(value.charCodeAt(i), value.charCodeAt(i + 1), 1) &&
                check(value.charCodeAt(i), value.charCodeAt(i + 2), 2)) {
                return false;
              }
         }
       }
      
    }
    
    return true;
}