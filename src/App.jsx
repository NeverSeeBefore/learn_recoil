import "./App.css";
// import TodoList from "./feature/TodoList";  // 没有异步逻辑
import TodoList from "./featureAsync/TodoList"; // 有异步逻辑

function App() {
  return (
    <div className="App">
      <header className="App-header">待办事项</header>
      <div className="sub-title">这是一个熟悉 recoil 的基础是用示例</div>
      <TodoList />
    </div>
  );
}

export default App;
