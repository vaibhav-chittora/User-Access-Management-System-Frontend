export const redirectUserByRole = (role, navigate) => {
  switch (role) {
    case "Admin":
      navigate("/create-software");
      break;
    case "Employee":
      navigate("/request-access");
      break;
    case "Manager":
      navigate("/pending-requests");
      break;
    default:
      navigate("/home");
  }
};
