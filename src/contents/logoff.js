//Log out
export default function Logoff() {
  sessionStorage.removeItem("auth")
  console.log("Removing Authentication")
  return (
    <>
      <div >
        <h1>Logged off now!</h1>
      </div>
    </>
  );
}