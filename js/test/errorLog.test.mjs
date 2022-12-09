import chai from "chai";
import createErrorLog from "../errorLog.mjs";

describe("Error Log Test", () => {
  const expect = chai.expect;

  it("should pass a copy of the initialList to logListener", () => {
    let list;
    
    function logListener(errorList) {
      list = errorList;
    }
    
    const initialList = [
      {
        fieldName: "First Name",
        message: "First Name cannot be empty",
      },
    ];
    const errorLog = createErrorLog({ initialList });
    errorLog.subscribe(logListener);
    
    expect(list).to.deep.equal([
      {
        fieldName: "First Name",
        message: "First Name cannot be empty",
      },
    ]);
    expect(list).not.equal(initialList);
  });
  it("should call each registered listener with the current list", () => {
    let list;
    let stringErrors = "";

    function listenerOne(errorList) {
      const error = errorList[0];
      if (error.fieldName === "second") {
        stringErrors += error.fieldName + error.message;
      }
    }

    function listener(errorList) {
      const error = errorList[0];
      if (error.fieldName === "second") {
        stringErrors += error.fieldName + error.message;
      }
    }

    function listenerTwo(errorList) {
      list = errorList;
    }

    const initialList = [{ fieldName: "first", message: "error" }];
    const errorLog = createErrorLog({ initialList });
    errorLog.subscribe(listenerOne);
    errorLog.subscribe(listener);

    const secondList = [{ fieldName: "second", message: "error" }];
    errorLog.setErrorList(secondList);
    errorLog.subscribe(listenerTwo);

    expect(stringErrors).to.equal("seconderrorseconderror");
    expect(list).to.deep.equal(secondList);
  });
});
