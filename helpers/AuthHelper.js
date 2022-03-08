import NavBar from "../components/NavBar";

export const basicAuth = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    if (typeof window !== "undefined") {
      return (
        <>
          <NavBar />
          <WrappedComponent {...props} />
        </>
      );
    }

    return null;
  };
};
