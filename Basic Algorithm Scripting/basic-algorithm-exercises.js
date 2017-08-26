// reverse the given string
function reverseString(str) {
  var arr = str.split("");
  arr.reverse();
  return arr.join().replace(/,/g, "");
}

reverseString("hello"); 

// return the factorial of the given integer
function factorialize(num) {
  var product = 1;

  for(var i = num; i > 0; i--) {
    product *= i;
  }
    return product;
}

factorialize(5); 


// Return true if the given string is a palindrome
// Otherwise, return false.
function palindrome(str) {
  var newStr;
  
  newStr = str.replace(/\s|\.|\,|\_|\:|\-|\/|\(/g, "").toLowerCase();
  
  return reverseStr(newStr) === newStr;
}

function reverseStr(str) {
  return str.split("").reverse().join().replace(/,/g, "");
}

palindrome("eye"); // true

// return the length of the longest word in the given sentence
function findLongestWord(str) {
  var arr = str.split(" ");
  var max = 0;
  
  for(var i=0; i < arr.length; i++) {
   
    if (arr[i].length > max) {
      max = arr[i].length;
    }
  }
  return max;
}

findLongestWord("The quick brown fox jumped over the lazy dog");

// return the given string with the first letter of each word capitalized
function titleCase(str) {
  var arr = str.toLowerCase().split(" ");

  for (var i=0; i < arr.length; i++) {
    var firstLetter = arr[i].charAt(0);
//     arr[i] = firstLetter.toUpperCase() + arr[i].replace(firstLetter, "");
    arr[i] = firstLetter.toUpperCase() + arr[i].slice(1);
  }
    return arr.join(" ").replace(",", "");
}

titleCase("I'm a little tea pot"); // "I'm A Little Tea Pot"

// return an array consisting of the largest number from each provided sub-array
function largestOfFour(arr) {
  var maxNums = [];
  for(var i=0; i < arr.length; i++) {
    maxNums.push(arr[i].sort(sortNum)[0]);
  }
  return maxNums;
}

// sort comparator for descending order
function sortNum(a, b) {
  return b - a;
}

largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);


// check if string ends with the given target string
function confirmEnding(str, target) {
  var startIndex = str.length - target.length;
  return str.substr(startIndex, str.length - 1) === target;
}

confirmEnding("Bastian", "n");

// repeat given string num times
// return empty string is num is not positive
function repeatStringNumTimes(str, num) {
  var res = "";
  while(num > 0) {
      res += str;
      num--;
  }
  return res;
}

repeatStringNumTimes("abc", 3);

// truncate a string if it is longer 
// than the max string length
function truncateString(str, num) {
  if (str.length > num) {
    if (num <= 3) {
        return str.substr(0, num) + "...";
      } else {
        return str.substr(0, num-3) + "...";
      }
  } else {
    return str;
  }
}

    
truncateString("A-tisket a-tasket A green and yellow basket", 11); // "A-tisket..."
truncateString("Peter Piper picked a peck of pickled peppers", 14); // "Peter Piper..."
truncateString("Absolutely Longer", 2); // "Ab..."
truncateString("A-", 1); // "A..." 
truncateString("A-tisket a-tasket A green and yellow basket", "A-tisket a-tasket A green and yellow basket".length); // "A-tisket a-tasket A green and yellow basket".

// splits an array into groups of length of size
function chunkArrayInGroups(arr, size) {
  var result = [];
  var count = 0;
    for (var i = 0; result.length < (arr.length / size); i++) {
        result.push(arr.slice(count, count + size));
        count += size;
    }
  return result;
}
    

chunkArrayInGroups(["a", "b", "c", "d"], 2); // [["a", "b"], ["c", "d"]];
chunkArrayInGroups([0, 1, 2, 3, 4, 5], 3); // ([0, 1, 2], [3, 4, 5]);
chunkArrayInGroups([0, 1, 2, 3, 4, 5], 2); // [[0, 1], [2, 3], [4, 5]];
chunkArrayInGroups([0, 1, 2, 3, 4, 5], 4); // [[0, 1, 2, 3], [4, 5]]
chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6], 3); // [[0, 1, 2], [3, 4, 5], [6]]
chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6, 7, 8], 4); // [[0, 1, 2, 3], [4, 5, 6, 7], [8]]

// returns the remaining elements of array
// after chopping off n elements from the head
function slasher(arr, howMany) {
  if (howMany >= arr.length) {
    return [];
  } else {
    return arr.slice(howMany, arr.length);
  }
}

slasher([1, 2, 3], 2); // [3]
slasher([1, 2, 3], 4); // []
slasher(["burgers", "fries", "shake"], 1); // ["fries", "shake"]

// Does first string in the array contain all of 
// the letters of the second string in the array?
function mutation(arr) {
  var arr1 = arr[0].toLowerCase().split('');
  var arr2 = arr[1].toLowerCase().split('');
  
  for(var i=0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) === -1) {
      return false;
    }
  }
   return true; 
}
mutation(["hello", "hey"]); // false
mutation(["Alien", "line"]); // true

// remove all falsy values from the array
function bouncer(arr) {
  return arr.filter(Boolean);
}

bouncer([7, "ate", "", false, 9]); // [7, "ate", 9]
bouncer([false, null, 0, NaN, undefined, ""]); // []
bouncer([1, null, NaN, 2, undefined]); // [1, 2]


/* SOLUTION 2 */
// function bouncer(arr) {
//   var res = [];
//   for (var i = 0; i < arr.length; i++) {
//     if (arr[i]) {
//       res.push(arr[i]);
//     }
//   }
//   return res;
// }


/* SOLUTION 3 */
// function bouncer(arr) {
//   var a = [];
//   arr.forEach(function(el){
//     if(el){
//     a.push(el); 
//     }});
//   return a;
// }

function destroyer(arr) {
//   var l = arguments.length;
  var args = Array.prototype.slice.call(arguments);
  return arr.filter(function(val) {
//       return !args.includes(val);
        return args.indexOf(val) === -1;
  });

}

destroyer([1, 2, 3, 1, 2, 3], 2, 3); // [1, 1]

// return lowest index at which num should be 
// inserted into an array once it has been sorted
function getIndexToIns(arr, num) {
  arr.push(num);
  arr.sort(function(a, b) { return a - b; });
  return arr.indexOf(num);
}

getIndexToIns([40, 60], 50); // 1



