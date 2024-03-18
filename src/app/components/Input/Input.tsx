import style from './Input.module.css'

type Props = {
  type: string;
  placeholder?: string;
  value: string;
  errorMessage: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: Props): JSX.Element {
  
  const errorMessage = () => {
    return props.errorMessage
      ? <p className={style.p}>{props.errorMessage}</p> : ''
  }

  return (
    <div>
      <input
        className={style.input}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange} />
      {errorMessage()}
    </div>
  )
}