import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default class PaginationShop extends Component {
    state = {
        paginateNumbers: 0
    }

  render() {
    const calculatePaginateNumbers = Math.floor(this.props.totals / this.props.perPage);
    let num = []
    const paginate = () => {
        for (let i = 1; i < calculatePaginateNumbers +1 ; i++) num.push(i)
    }
    paginate()
    return (
      <Pagination aria-label="Page navigation example" className="table-responsive mb-2">
        <PaginationItem disabled>
            <PaginationLink first href="#" />
          </PaginationItem>
          <PaginationItem disabled>
            <PaginationLink previous href="#" />
          </PaginationItem>
          {
              num.map(v => (
                  <PaginationItem key={v} active={v === this.props.currentPage} onClick={() => this.props.paginate(this.props.perPage,v)}>
                      <PaginationLink>
                      {v}
                      </PaginationLink>
                  </PaginationItem>
              ))
          }
          <PaginationItem>
            <PaginationLink next href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink last href="#" />
          </PaginationItem>
      </Pagination>
    );
  }
}