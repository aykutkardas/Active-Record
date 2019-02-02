import { pagination } from "../src";
import { expect } from "chai";
import "mocha";

const data = [1, 2, 3, 4];

describe("Pagination Function", () => {
  const result = pagination(data, 2);
  console.log(result.existPage(4));
  it("Method test getActivePage()", () => {
    expect(result.getActivePage()).to.equal(1);
  });

  it("Method test get()", () => {
    expect(result.get()).to.deep.equal([1, 2]);
    expect(result.getActivePage()).to.equal(1);
  });
  it("Method test nextPage()", () => {
    expect(result.nextPage()).to.deep.equal([3, 4]);
    expect(result.getActivePage()).to.equal(2);
  });
  it("Method test prevPage()", () => {
    expect(result.prevPage()).to.deep.equal([1, 2]);
    expect(result.getActivePage()).to.equal(1);
  });
  it("Method test hasNextPage()", () => {
    expect(result.hasNextPage()).to.equal(true);
  });
  it("Method test hasPrevPage()", () => {
    expect(result.hasPrevPage()).to.equal(false);
  });
  it("Method test existPage()", () => {
    expect(result.existPage(1)).to.equal(true);
    expect(result.existPage(2)).to.equal(true);
    expect(result.existPage(4)).to.equal(false);
  });
  it("Method test firstPage()", () => {
    expect(result.firstPage()).to.deep.equal([1, 2]);
    expect(result.getActivePage()).to.equal(1);
  });
  it("Method test lastPage()", () => {
    expect(result.lastPage()).to.deep.equal([3, 4]);
    expect(result.getActivePage()).to.equal(2);
  });

  it("Propery test totalPage", () => {
    expect(result.totalPage).to.equal(2);
  });
  it("Propery test totalItem", () => {
    expect(result.totalItem).to.equal(4);
  });
  it("Propery test itemsPerPage", () => {
    expect(result.itemsPerPage).to.equal(2);
  });
});
