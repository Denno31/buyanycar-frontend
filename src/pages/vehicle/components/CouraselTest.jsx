import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
export default function App() {
  return (
    <div style={{ height: "600px" }}>
      <Carousel>
        <div style={{ backgroundSize: "cover" }}>
          <img
            style={{ width: "100%", objectFit: "cover" }}
            src="https://images.unsplash.com/photo-1562141960-c9a127257324?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          />
        </div>
        <div>
          <img
            style={{ width: "100%", objectFit: "cover" }}
            src="https://images.unsplash.com/photo-1578564782364-599a721f70b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
          />
        </div>
        <div>
          <img
            style={{ width: "100%", objectFit: "cover" }}
            src="https://images.unsplash.com/photo-1600712242805-5f78671b24da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnVnYXR0aXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          />
        </div>
      </Carousel>
    </div>
  );
}
