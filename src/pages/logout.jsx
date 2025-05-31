/*export default function logout() {
  return <></>;
}
  */

//log out will not return anything only function run
import { redirect } from "react-router-dom";
export function action() {
  localStorage.removeItem("token");

  navigate("/");
  //return redirect("/");
}
