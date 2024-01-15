import {Select, Option} from "../../utils/MaterialTailwind"

export default function Homepage() {
  return (
    <div>
      <div>
        <h1>Find Sustainable Solutions for Your Home</h1>
        <div>
          <h3></h3>
          <input type="text" />
          <div className="flex">
            <div>
              <h3>Living Situation</h3>
              {/* <select name="" id=""></select> */}
              <Select>
                <Option>TEst</Option>
              </Select>
            </div>
          </div>
          <div className="flex">
            <div>
              <h3>Living Situation</h3>
              <select name="" id=""></select>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
