import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

// TODO test storage api calls in each test case
jest.mock("./src/state/storage", () => ({
  getLoginUser: jest.fn(),
  setLoginUser: jest.fn(),
  deleteLoginUser: jest.fn()
}));
