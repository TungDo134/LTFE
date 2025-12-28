function Heading({ as, children }) {
  if (as === "h1") {
    return <h1 className=" mb-3 text-4xl font-semibold">{children}</h1>;
  }

  if (as === "h3") {
    return <h3 className=" mb-3 text-xl font-medium">{children}</h3>;
  }

  // default h2
  return <h2 className=" mb-3 text-3xl font-bold mt-4">{children}</h2>;
}

export default Heading;
