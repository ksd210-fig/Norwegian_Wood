import style from './globals.css'
import NavbarContainer from './components/Navbar/NavbarContainer';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <NavbarContainer />
        {children}
      </body>
    </html>
  );
}
