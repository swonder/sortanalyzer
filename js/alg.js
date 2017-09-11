/*****************************************************************
* Shawn Wonder                                                   *
* 04/08/2016                                                     *
* Contains run code for all the algorithms used in the app       *
******************************************************************/

"use strict"

var i = 0; //Generic increment variable

//Gernerate a list with 'size' elements, all elements between range minval to maxval
function createRandomList(size, minval, maxval) {
  var numList = [];
  var randNum = 0;
  for(i=0;i<size; i++) {
      randNum = Math.floor(Math.random() * maxval) + minval;
      numList.push(randNum);
  }
  return numList;
}
/* Sort functions below are what get called when the tests are run */
function bubbleSort(list, counts, liststate) {
  while(true) {
      var swapped = false;
      for(i = 1; i < list.length; i++) {
        counts[0] += 1;
        if(list[i-1] > list[i]) {
          counts[1] += 1;
          var temp = list[i-1];
          list[i-1] = list[i];
          list[i] = temp;
          swapped = true;
          //Only want to have list sizes up to 64 to display in list box
          if(list.length <= 64) {
            liststate.push(list.slice());
          }
        }
      }
      if(!swapped) {
        return list;
      }
    }
  }

function shakerSort(list, counts, liststate) {
  while(true) {
    var swapped = false;
    //Left->right pass
    for(i = 1; i < list.length; i++) {
      counts[0] += 0;
      if(list[i-1] > list[i]) {
        counts[1] += 1;
        var temp = list[i-1];
        list[i-1] = list[i];
        list[i] = temp;
        swapped = true;
        if(list.length <= 64) {
          liststate.push(list.slice());
        }
      }
    }
    //No adjacent elements were swapped - list is sorted
    if(!swapped) {
      break;
    }
    swapped = false;
    //Right->left pass
    for(var j = list.length-1; j >= 0; j--) {
      counts[0]+=1;
      if(list[j] < list[j-1]) {
        counts[1]+=1;
        var temp = list[j-1];
        list[j-1] = list[j];
        list[j] = temp;
        swapped = true;
        if(list.length <= 64) {
          liststate.push(list.slice());
        }
      }
    }
    //No adjacent elements were swapped - list is sorted
    if(!swapped) {
      break;
    }
  }
  return list;
}

function selectionSort(list, counts, liststate) {
  var listChanged = false;
  var minIndex = 0;
  //Advance the index of the first comparison number by 1
  for(var i = 0; i < list.length; i++) {
    minIndex = i;
    //Find smallest element after the first element
    for(var j = i+1; j < list.length; j++) {
        counts[0]++;
        if(list[j] < list[minIndex]) {
          minIndex = j;
          listChanged = true;
        }
    }
    //Swap first element with the lowest subsequent element found
    counts[1]++;
    var temp = list[minIndex];
    list[minIndex] = list[i];
    list[i] = temp;
    if(listChanged && list.length <= 64) {
      liststate.push(list.slice());
    }
    listChanged = false;
  }
  return list;
}

function quickSort(list, counts, liststate) {
    quickSortRecursive(list, 0, list.length-1, false, counts, liststate);
    return list;
}

function modQuickSort(list, counts, liststate) {
    quickSortRecursive(list, 0, list.length-1, true, counts, liststate);
    return list;
}

function quickSortRecursive(list, low, high, modified, counts, liststate) {
  var temp = 0;
  var leftmost = 0;
  var pivot = 0;
  if(low < high) {
      if(modified) {
          var mid = Math.floor((low+high) / 2);
          counts[1]++;
          temp = list[low];
          list[low] = list[mid];
          list[mid] = temp;
      }
      leftmost = low+1;
      pivot = list[low];
      for(var i = low+1; i < high+1; i++) {
          counts[0]++;
          if(list[i] < pivot) {
              counts[1]++;
              temp = list[leftmost];
              list[leftmost] = list[i];
              list[i] = temp;
              if(list.length <= 64) {
                  liststate.push(list.slice());
              }
              leftmost++;
          }
      }
      pivot = leftmost-1;
      counts[1]++;
      temp = list[low];
      list[low] = list[pivot];
      list[pivot] = temp;
      quickSortRecursive(list, low, pivot-1, modified, counts, liststate);
      quickSortRecursive(list, pivot+1, high, modified, counts, liststate);
  }
}

function mergeSort(list, counts, liststate) {
  var localCopy = 0
  var aLen = list.length;
  var mid = 0;
  var left = 0;
  var right = 0;
  //Make sure the recursive function stops at element size of 1
  if(aLen <= 1) {
    return [];
  }
  //Cut list A into two pieces
  mid = aLen/2;
  left = list.slice(0, mid);
  localCopy += list.length/3; //Copy is only 1/3 as much work as a swap
  right = list.slice(mid, list.length);
  localCopy += list.length/3;
  //Keep sorting both halves recursively until each list contains just one element
  mergeSort(left, counts, liststate);
  mergeSort(right, counts, liststate);

  //Merge left and right back into list
  merge(list, left, right, counts, liststate);
  counts[1] += localCopy;
  return list;
}

function merge(list, left, right, counts, liststate) {
  var leftLen = left.length;
  var rightLen = right.length;
  var i = 0; //Left list index value
  var j = 0; //Right list index value
  var k = 0; //Merged list index

  while(i < leftLen && j < rightLen) {
    //Left list had the smallest value place left value in merged list
    counts[0]++;
    if(left[i] <= right[j]) {
      list[k] = left[i];
      i++;
    }
    //Right list had the smallest value place right value in merged list
    else {
      list[k] = right[j];
      j++;
    }
    k++;
  }
  //If left list was longer than the other, place any remaining left values in merge list
  while(i < leftLen) {
    counts[0]++;
    list[k] = left[i];
    i++;
    k++;
  }
  //If right list was longer than the other, place any remaining right values in merge list
  while(j < rightLen) {
    counts[0]++;
    list[k] = right[j];
    j++;
    k++;
  }
}

function hashSort(list, counts, liststate) {
  var tempState = []
  var size = list.length;
  //Frequency Array
  var f = [];
  for(var m = 0; m < size; m++) {
    f[m] = 0;
  }
  for(var m = 0; m < size; m++) {
    f[list[m]]+=1;
  }
  var z = 0;
  var v = 0;
  for(var m = 0; m < f.length; m++) {
    v = f[m];
    for (var n=0; n < v; n++) {
      list[z] = m;
      z++;
    }
  }
  if(list.length <= 64) {
      liststate.push(list);
  }
  counts[0] = size;
  counts[1] = size;
  return list;
}
