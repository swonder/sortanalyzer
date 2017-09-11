/*****************************************************************
* Shawn Wonder                                                   *
* 04/08/2016                                                     *
* Contains code that gets printed in code box for all algorithms *
******************************************************************/

/* Following functions get called when the 'Sorting function code box is loaded' */
function bubbleSortPrint() {
  var bsStr = 'function bubbleSort(list) {<br/>\
  while(true) { <br />\
    var swapped = false; <br />\
    /* Loop through list and swap adjacent elements that are out of order */ <br />\
    for(i = 1; i < list.length; i++) { <br />\
      if(list[i-1] > list[i]) { <br />\
        var temp = list[i-1]; <br />\
        list[i-1] = list[i]; <br />\
        list[i] = temp; <br />\
        swapped = true; <br />\
      } <br />\
    } <br />\
    /* No adjacent elements were swapped in the pass - list is sorted */ <br />\
    if(!swapped) { <br />\
      return list; <br />\
    } <br />\
  }<br />\
}';
  return bsStr;
}

function shakerSortPrint() {
  var shsStr = 'function shakerSort(list) { <br />\
  while(true) {<br />\
    var swapped = false;<br />\
    /* Left->right pass */<br />\
    for(i = 1; i < list.length; i++) {<br />\
      if(list[i-1] > list[i]) {<br />\
        var temp = list[i-1];<br />\
        list[i-1] = list[i];<br />\
        list[i] = temp;<br />\
        swapped = true;<br />\
      }<br />\
    }<br />\
    /* No adjacent elements were swapped - list is sorted */<br />\
    if(!swapped) {<br />\
      break;<br />\
    }<br />\
    swapped = false;<br />\
    /* Right->left pass */<br />\
    for(var j = list.length-1; j >= 0; j--) {<br />\
      if(list[j] < list[j-1]) {<br />\
        var temp = list[j-1];<br />\
        list[j-1] = list[j];<br />\
        list[j] = temp;<br />\
        swapped = true;<br />\
      }<br />\
    }<br />\
    /* No adjacent elements were swapped - list is sorted */<br />\
    if(!swapped) {<br />\
      break;<br />\
    }<br />\
  }<br />\
  return list;<br />\
}<br />';
  return shsStr;
}

function selectionSortPrint() {
  var ssStr = 'function selectionSort(list) { <br/>\
  var minIndex = 0; <br/>\
  /* Advance the index of the first comparison number by 1 */<br/>\
  for(var i = 0; i < list.length; i++) {<br/>\
    minIndex = i; <br/>\
    /* Find smallest element after the first element */<br/>\
    for(var j = i+1; j < list.length; j++) { <br/>\
      if(list[j] < list[minIndex]) { <br/>\
        minIndex = j; <br/>\
      } <br/>\
    } <br/>\
    /* Swap first element with the lowest subsequent element found */<br/>\
    var temp = list[minIndex]; <br/>\
    list[minIndex] = list[i]; <br/>\
    list[i] = temp; <br/>\
  } <br/>\
  return list; <br/>\
}';
  return ssStr;
}

function quickSortPrint() {
  var qsStr = 'function quickSort(list) {<br />\
  quickSortRecursive(list, 0, list.length-1, false);<br />\
  return list;<br />\
}';
  return qsStr + '<br /><br />' + quickSortRecursivePrint();
}

function modQuickSortPrint() {
  var mqsStr = 'function modQuickSort(list) {<br />\
  quickSortRecursive(list, 0, list.length-1, true);<br />\
  return list;<br />\
}';
  return mqsStr + '<br /><br />' + quickSortRecursivePrint();
}

function quickSortRecursivePrint() {
  var qsrStr = 'function quickSortRecursive(A, low, high, modified) { <br/>\
  var temp = 0; <br/>\
  var leftmost = 0; <br/>\
  var pivot = 0; <br/>\
  if(low < high) { <br/>\
    if(modified) { <br/>\
      var mid = Math.floor((low+high) / 2); <br/>\
      temp = A[low]; <br/>\
      A[low] = A[mid]; <br/>\
      A[mid] = temp; <br/>\
    } <br/>\
    leftmost = low+1; <br/>\
    pivot = A[low]; <br/>\
    for(var i = low+1; i < high+1; i++) { <br/>\
      if(A[i] < pivot) { <br/>\
        temp = A[leftmost]; <br/>\
        A[leftmost] = A[i]; <br/>\
        A[i] = temp; <br/>\
        leftmost++; <br/>\
      } <br/>\
    } <br/>\
    pivot = leftmost-1; <br/>\
    temp = A[low]; <br/>\
    A[low] = A[pivot]; <br/>\
    A[pivot] = temp; <br/>\
    quickSortRecursive(A, low, pivot-1, modified); <br/>\
    quickSortRecursive(A, pivot+1, high, modified); <br/>\
  } <br/>\
}';
  return qsrStr;
}

function mergeSortPrint() {
  var msStr = 'function mergeSort(list) { <br/>\
  var localCopy = 0; <br/>\
  var aLen = list.length; <br/>\
  var mid = 0; <br/>\
  var left = 0; <br/>\
  var right = 0; <br/>\
  /* Make sure the recursive function stops at element size of 1 */<br/>\
  if(aLen <= 1) { <br/>\
    return []; <br/>\
  } <br/>\
  /* Cut list into two pieces */ <br/>\
  mid = aLen/2; <br/>\
  left = list.slice(0, mid); <br/>\
  localCopy += list.length/3; <br/>\
  right = list.slice(mid, list.length); <br/>\
  localCopy += list.length/3; <br/>\
  /* Keep sorting both halves recursively until each list contains just one element */<br/>\
  mergeSort(left); <br/>\
  mergeSort(right); <br/>\
  /* Merge left and right back into A */<br/>\
  merge(list, left, right); <br/>\
  <br/>\
  return list; <br/>\
}';
  return msStr + '<br /><br />' + mergeSortRecursivePrint();
}

function mergeSortRecursivePrint() {
  var msrStr = 'function merge(list, left, right) { <br/>\
  var leftLen = left.length; <br/>\
  var rightLen = right.length; <br/>\
  var i = 0; /* Left list index value */<br/>\
  var j = 0; /* Right list index value */<br/>\
  var k = 0; /* Merged list index */<br/>\
  <br/>\
  while(i < leftLen && j < rightLen) { <br/>\
    /* Left list had the smallest value, place left value in merged list */<br/>\
    if(left[i] <= right[j]) { <br/>\
      list[k] = left[i]; <br/>\
      i++; <br/>\
    } <br/>\
    /* Right list had the smallest value, place right value in merged list */<br/>\
    else { <br/>\
      list[k] = right[j]; <br/>\
      j++; <br/>\
    } <br/>\
    k++; <br/>\
  } <br/>\
  /* If left list was longer, place any remaining left values in merge list */<br/>\
  while(i < leftLen) { <br/>\
    list[k] = left[i]; <br/>\
    i++; <br/>\
    k++; <br/>\
  } <br/>\
  /* If right list was longer, place any remaining right values in merge list */<br/>\
  while(j < rightLen) { <br/>\
    list[k] = right[j]; <br/>\
    j++; <br/>\
    k++; <br/>\
  } <br/>\
}';
  return msrStr;
}

function hashSortPrint() {
  var hsStr = 'function hashSort() { <br/>\
  var size = list.length; <br/>\
  var f = []; <br/>\
  for(var m = 0; m < size; m++) { <br/>\
    f[m] = 0; <br/>\
  } <br/>\
  for(var m = 0; m < size; m++) { <br/>\
    f[list[m]]+=1; <br/>\
  } <br/>\
  var z = 0; <br/>\
  var v = 0; <br/>\
  for(var m = 0; m < size; m++) { <br/>\
    v = f[m]; <br/>\
    for (var n=0; n < v; n++) { <br/>\
      list[z] = m; <br/>\
      z++; <br/>\
    } <br/>\
  } <br/>\
  return list; <br/>\
}';
  return hsStr;
}
