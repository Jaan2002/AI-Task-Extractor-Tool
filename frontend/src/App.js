import MainApp from "./MainApp";
import { ThemeProvider } from "./context/ThemeContext";
import './styles/global.css';
function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

export default App;