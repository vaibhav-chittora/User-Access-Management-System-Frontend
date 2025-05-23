// export const redirectUserByRole = (role, navigate) => {
//   switch (role) {
//     case "admin":
//       navigate("/create-software");
//       break;
//     case "employee":
//       navigate("/request-access");
//       break;
//     case "manager":
//       navigate("/pending-requests");
//       break;
//     default:
//       navigate("/unauthorized");
//   }
// };

export const redirectUserByRole = (role, navigate) => {
  navigate("/home"); // Redirect to common dashboard for all roles
};
