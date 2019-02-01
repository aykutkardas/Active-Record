import { isArray, isNumber } from "./type-check";
import { chunk } from "./utils";

type PaginationFunction = (data: any[], itemsPerPage: number) => any;

const pagination: PaginationFunction = (data, itemsPerPage = 10) => {
  if (!isArray(data)) {
    return [];
  }

  if (!isNumber(itemsPerPage)) {
    itemsPerPage = 10;
  }

  const size = data.length;
  const totalPage = Math.ceil(size / itemsPerPage);
  const chunkData = chunk(data, itemsPerPage);

  return new PaginationObject(chunkData, itemsPerPage, totalPage);
};

class PaginationObject {
  data: any[][];
  itemsPerPage: number;
  totalPage: number;
  activePage: number;

  constructor(data: any[][], itemsPerPage: number, totalPage: number) {
    this.data = data;
    this.itemsPerPage = itemsPerPage;
    this.totalPage = totalPage;
    this.activePage = 0;
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
