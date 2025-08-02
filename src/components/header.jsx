export default function Header() {  
  return (
    <header>
        <img src="roadApp.svg" alt="Speed Map logo" />
        <div id="user-login">
          <img src="local-guide.png" alt="user-image" />
          <div id="user-details">
            <span>Signed in as</span>
            <p>johndoe@gmail.com</p>
          </div>
        </div>
    </header>
  )
}