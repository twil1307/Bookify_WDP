const GetAccessibility = async () => {
  return await fetch(
    `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/accessibility/type`
  ).then((resp) => resp.json());
};
export default GetAccessibility;
