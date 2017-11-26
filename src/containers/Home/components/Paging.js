import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import PropTypes from 'prop-types';

export default class Paging extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pager: {},
      initialPage: 1
    };
  }

  static propTypes = {
    onChangePage: PropTypes.func,
    items: PropTypes.array
  }

  componentWillMount() {
    // set page if items array isn't empty
    if (this.props.items && this.props.items.length) {
      this.setPage(this.state.initialPage);
    }
  }

  componentDidUpdate(prevProps) {
    // reset page if items array has changed
    // console.log(this.props.items);
    // console.log(this.props.items.length);
    if (this.props.items !== prevProps.items) {
      this.setPage(this.state.initialPage);
    }
  }

  setPage = (page) => {
    const items = this.props.items;
    let pager = this.state.pager;
    // console.log(`initialPage: ${this.state.initialPage}`);
    // console.log(page);
    if (page < 1 || page > pager.totalPages) {
      return;
    }

    pager = this.getPager(items.length, page);

    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    this.setState({
      pager
    });
    this.props.onChangePage(pageOfItems);
  }

  getPager = (totalItems, currentPage, pageSize) => {
    currentPage = currentPage || 1;
    pageSize = pageSize || 10;

    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage = 0;
    let endPage = 0;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= 6) {
      startPage = 1;
      endPage = 10;
    } else if (currentPage + 4 >= totalPages) {
      startPage = totalPages - 9;
      endPage = totalPages;
    } else {
      startPage = currentPage - 5;
      endPage = currentPage + 4;
    }

    // console.log(`start: ${startPage}`);
    // console.log(`end: ${endPage}`);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min((startIndex + pageSize) - 1, totalItems - 1);
    const range = (start, end) => (
      Array.from(Array(end - start).keys()).map(i => i + start)
    );
    const pages = range(startPage, endPage + 1);
    // console.log(`pages: ${pages}`);
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages
    };
  }

  render() {
    const pager = this.state.pager;
    if (!pager.pages || pager.pages.length <= 1) {
      return null;
    }

    return (
      <Pagination className="pointer">
        <PaginationItem disabled={pager.currentPage === 1 ? true : null}>
          <PaginationLink onClick={() => this.setPage(1)}>
            First
          </PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={pager.currentPage === 1 ? true : null}>
          <PaginationLink onClick={() => this.setPage(pager.currentPage - 1)}>
            &laquo;
          </PaginationLink>
        </PaginationItem>
        {pager.pages.map((page, index) =>
          <PaginationItem key={index} active={pager.currentPage === page ? true : null}>
            <PaginationLink onClick={() => this.setPage(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem disabled={pager.currentPage === pager.totalPages ? true : null}>
          <PaginationLink onClick={() => this.setPage(pager.currentPage + 1)}>
            &raquo;
          </PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={pager.currentPage === pager.totalPages ? true : null}>
          <PaginationLink onClick={() => this.setPage(pager.totalPages)}>
            Last
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    );
  }

}
