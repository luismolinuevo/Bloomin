import { Select, Option } from "../../utils/MaterialTailwind";
import PostSearch from "../Search/PostSearch";

export default function Homepage() {
  return (
    <div className="">
      <div
        className="h-full"
        style={{
          backgroundImage: `url(${"/homepage.png"})`,
          backgroundSize: "cover",
        }}
      >
        <PostSearch page={"home"} />
      </div>
    </div>
  );
}
