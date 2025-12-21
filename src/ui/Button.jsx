function Button({ color = "primary", children }) {
  const styles = {
    primary: "bg-blue-500 text-white",
    danger: "bg-red-500 text-white",
  };

  return (
    <button
      className={`p-1 w-20  border border-solid rounded-sm ${styles[color]} flex items-center justify-around cursor-pointer`}
    >
      {children}
    </button>
  );
}
export default Button;
