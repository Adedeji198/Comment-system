// import Carousel from "./caro/Carousel";
import Comments from "./comment/Comments";
import CommenState from "./comment/Context/Comment/CommentState";

function App() {
  return (
    <CommenState>
      <div className="App bg-veryLightGray min-h-[100vh]">
        <Comments />
        {/* <Carousel /> */}
      </div>
    </CommenState>
  );
}

export default App;
