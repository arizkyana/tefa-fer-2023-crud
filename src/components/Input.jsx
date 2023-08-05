function Input(props) {
  const { label, name, onChange, type = 'text', ...rest } = props;
  return (
    <label htmlFor={name} className="block mb-5">
      <span className="block mb-3">{label}</span>
      <input
        {...rest}
        type={type}
        className="bg-white p-3 w-full outline-none rounded-lg text-slate-700"
        name={name}
        id={name}
        onChange={onChange}
      />
    </label>
  );
}

export default Input;
