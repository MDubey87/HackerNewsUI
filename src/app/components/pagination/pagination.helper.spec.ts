import { PaginationHelper } from './pagination.helper';

describe('paginate', () => {
  it('should set current page value 1 when current page value passed 0', () => {
    const pager = PaginationHelper.paginate(10, 0, 10, 10);
    expect(pager.currentPage).toBe(1);
  });
  it('should set current page value 1 when current page value passed is negative', () => {
    const pager = PaginationHelper.paginate(200, -1, 10, 10);
    expect(pager.currentPage).toBe(1);
  });
  it('should set page size default 10 when page size value passed 0', () => {
    const pager = PaginationHelper.paginate(200, 19, 0, 0);
    expect(pager.pageSize).toBe(10);
  });
  it('should set start page in between in pagination', () => {
    const pager = PaginationHelper.paginate(200, 15, 10, 10);
    expect(pager.startPage).toBeLessThan(pager.currentPage);
    expect(pager.endPage).toBeGreaterThan(pager.currentPage);
  });
});
