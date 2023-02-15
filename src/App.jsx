import BoardView from "./components/Board";

function App() {
  return (
    <div>
      <h1>2048</h1>

      <BoardView />
      <p>
        Welcome to 2048! You can play the game using the arrow keys on your
        keyboard. The aim of the game is to combine numbers of the same value
        until you reach 2048.
      </p>
    </div>
  );
}

export default App;
