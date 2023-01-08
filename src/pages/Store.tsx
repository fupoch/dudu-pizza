import React from 'react';
import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { selectFilter } from '../redux/filter/selectors';
import { fetchPizzas } from '../redux/pizza/slice';
import { selectPizzas } from '../redux/pizza/selectors';
import Categories from '../components/Categories';
import Pizza from '../components/Pizza';
import Skeleton from '../components/Pizza/Skeleton';
import Sort, { sortList } from '../components/Sort';
import Pagination from '@mui/material/Pagination';
import NotFoundBlock from '../components/NotFoundBlock';
import { useAppDispatch } from '../redux/store';

const Store: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzas);
  const sortBy = sort.sortProperty;
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const handleChange = (e: React.ChangeEvent<unknown>, number: number) => {
    dispatch(setCurrentPage(number));
  };

  const onClickCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, [])

  const getPizzas = async () => {
    const search = searchValue ? `&search=${searchValue}` : '';
    const order = sortBy === 'rating' ? 'desc' : 'asc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    dispatch(
      fetchPizzas({
        search,
        order,
        category,
        sortBy,
        currentPage: String(currentPage)
      }))

  };

  //если был первый рендер, проверяем URL параметры и сохраняем в redux
  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams;
  //     const sortObj = sortList.find((obj) => obj.sortProperty === params.sortBy);
  //     if (sort) {
  //       params.sortBy = sort.sortProperty
  //     }
  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sortObj || sortList[0],
  //       }),
  //     );
  //     isSearch.current = false;
  //   }
  // }, []);

  // если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, sortBy, searchValue, currentPage]);

  // если изменили какие-либо параметры и был первый рендер
  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const querytString = qs.stringify({
  //       sortBy,
  //       categoryId,
  //       currentPage,
  //     });
  //     navigate(`?${querytString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sortBy, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div>
          <NotFoundBlock />
        </div>
      ) :
        (
          <div className="content__items">
            {status === 'loading'
              ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
              : items.map((pizza: any) => <Pizza key={pizza.id} {...pizza} />)}
          </div>
        )}
      <Pagination count={2} page={currentPage} size="large" onChange={handleChange} />
    </div>
  );
};

export default Store;
