function Button(props) {
  const { label, variant = 'default', children, ...rest } = props;
  return (
    <button
      {...rest}
      className="block bg-white px-4 py-2 hover:bg-slate-100 text-sm rounded-lg text-slate-600"
    >
      {children}
    </button>
  );
}

export default Button;
