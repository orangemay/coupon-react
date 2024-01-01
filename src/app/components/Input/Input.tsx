type Props = {
  className?: string;
  type: string;
  placeholder?: string
  onChange: ()=>void
}

export default function Input(props: Props): JSX.Element {
  return (
    <input
      className={props.className}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  )
}