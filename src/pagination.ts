import { isArray, isNumber } from "./type-check";
import { chunk } from "./utils";

type PaginationFunction = (data: any[], itemsPerPage: number) => any;
type PaginationConstructorObj = {
  data: any[][];
  itemsPerPage: number;
  totalPage: number;
  totalItem: number;
};

const pagination: PaginationFunction = (data, itemsPerPage = 10) => {
  if (!isArray(data)) {
    return [];
  }

  if (!isNumber(itemsPerPage)) {
    itemsPerPage = 10;
  }

  const totalItem = data.length;
  const totalPage = Math.ceil(totalItem / itemsPerPage);
  const chunkData = chunk(data, itemsPerPage);

  return new PaginationObject({
    data: chunkData,
    itemsPerPage,
    totalPage,
    totalItem
  });
};

class PaginationObject {
  data: any[][];
  itemsPerPage: number;
  totalPage: number;
  totalItem: number;
  activePage: number;

  constructor({
    data,
    itemsPerPage,
    totalPage,
    totalItem
  }: PaginationConstructorObj) {
    this.data = data;
    this.itemsPerPage = itemsPerPage;
    this.totalPage = totalPage;
    this.activePage = 0;
    this.totalItem = totalItem;
  }

  hasNextPage = (): boolean => {
    return this.data[this.activePage + 1] ? true : false;
  };
  hasPrevPage = (): boolean => {
    return this.data[this.activePage - 1] ? true : false;
  };

  nextPage = (): any[] => {
    if (this.hasNextPage()) {
      this.activePage = this.activePage + 1;
      return this.data[this.activePage];
    }

    return [];
  };

  prevPage = (): any[] => {
    if (this.hasPrevPage()) {
      this.activePage = this.activePage - 1;
      return this.data[this.activePage];
    }

    return [];
  };

  firstPage = (): any[] => {
    const newActivePage = 0;
    this.activePage = newActivePage;
    return this.data[newActivePage];
  };

  lastPage = (): any[] => {
    const newActivePage = this.data.length - 1;
    this.activePage = newActivePage;
    return this.data[newActivePage];
  };

  getPage = (page: number): any[] => {
    if (this.existPage(page)) {
      this.activePage = page;
      return this.data[page];
    }

    return [];
  };

  existPage = (page: number): boolean => {
    return this.data[page - 1] ? true : false;
  };

  get = () => {
    return this.data[this.activePage];
  };

  getActivePage = () => {
    return this.activePage + 1;
  };
}

export default pagination;
