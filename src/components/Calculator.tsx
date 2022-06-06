import React, { useState } from 'react'
import { Article } from './Articles'
import Button from '@mui/material/Button'

type Props = {
  closeModal: any
  article: Article | undefined
}

function Calculator(props: Props) {

  const [value, setValue] = useState<number>(0)

  const btnValues = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    ['C', 0, 'ok']
  ];

  const numClickHandler = (e: any) => {
    e.preventDefault();
    const btnValue = e.currentTarget.value
    if (value === 0) {
      setValue(btnValue)
    } else {
      setValue(value + btnValue)
    }
  }

  const clearClickHandler = (e: any) => {
    e.preventDefault();
    setValue(0)
  }

  const okClickHandler = (e: any) => {
    e.preventDefault();
    props.closeModal(value)
  }

  return <div className='calculator-modal-content'>
    <div className='articles'>
      <div className='screen'>
        {value}
      </div>
      <div className="numberpad flex-grid-3">
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              variant={btn === "ok" || btn === 'C' ? 'contained' : 'outlined'}
              key={i}
              className={btn === "ok" ? "ok" : btn === 'C' ? 'clear' : ""}
              value={btn}
              onClick={btn === "ok" ? okClickHandler : btn === 'C' ? clearClickHandler : numClickHandler}>
              {btn}
            </Button>
          )
        })}
      </div>
    </div>
  </div>
}
export default Calculator
