export function swapReverser<T>(array: Array<T>) {
    const length = array.length;
    let left = null;
    let right = null;
  
    for (left = 0, right = length - 1; left < right; left += 1, right -= 1) {
      const temporary = array[left];
  
      array[left] = array[right];
      array[right] = temporary;
    }
  
    return array;
  }