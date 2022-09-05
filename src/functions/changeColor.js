// function to determine color of 24h % change number.
// i.e  (if 24% change is a negative number, color will be red.)

export function changeColor(number) {
    console.log('reusable func called')
    if (number > 0) {
        return {color: 'green'}
    } else if (number < 0){
        return {color: 'red'}
    }
}
  