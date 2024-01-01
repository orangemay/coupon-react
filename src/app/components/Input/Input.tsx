type Props = {
  className?: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>)=>void
}

export default function Input(props: Props): JSX.Element {
  return (
    <input
      className={props.className}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  )
}