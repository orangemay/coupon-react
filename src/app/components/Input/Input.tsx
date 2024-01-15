import style from './Input.module.css'

type Props = {
  type: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: Props): JSX.Element {
  return (
    <input
      className={style.input}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  )
}