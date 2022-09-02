const input = document.querySelector("input")

// create an onlcik listener for each number 
document.querySelectorAll(".num__key").forEach(
  el => {
    // if the current input value is not equal to 0 ? then take the current value then add(concatenate) the element's inner text. (which is the number)
    //if the input value is zero then set the input value to element's inner text
    el.onclick = () => (input.value = input.value !== "0" ? input.value + el.innerText : el.innerText);
  }
)

const opCallback = opName => () => {
  let currentVal = parseFloat(input.value)
  //conver value to a percent
  if(opName == 'percent') {
    currentVal *= .01
    input.value = currentVal
  }
  else{
    if(buffer && buffer.length){
      buffer.push({value: currentVal})

      const result = evaluate(buffer);

      buffer.push({value: result})
      buffer.push({value: opName})

      input.value = ''
    } else{
      buffer.push({value: currentVal})
      buffer.push({value: opName})
      input.value = ''
    }
  }
}

const evaluate = buffer => {
  //starting with second operand because we are using pop
  const secondOperand = buffer.pop().value
  const operator = buffer.pop().value
  const firstOperand = buffer.pop().value

  switch(operator){
    case 'add':
      return firstOperand + secondOperand
      break;
    case 'multiply':
      return firstOperand * secondOperand
      break;
    case 'subtract':
      return firstOperand - secondOperand
      break;
    case 'divide':
      return firstOperand / secondOperand
      break;
    default:
      return secondOperand
  }
}

const buffer = []
for(const opName of ['add','subtract','multiply','divide','percent']){
  document.querySelector(`.op__key[op=${opName}]`).onclick = opCallback(opName)
}

document.querySelector('.eq__key').onclick = () => {
  if (buffer && buffer.length){
    buffer.push({ value: parseFloat(input.value)})
    input.value = evaluate(buffer)
  }
}

document.querySelector('.op__key[op=clear]').onclick = () => {
  input.value = 0
  buffer.length = 0
}
document.querySelector('.op__key[op=negate]').onclick = () => {
  input.value = parseFloat(input.value) * -1
}

