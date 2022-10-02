import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzas } from '../redux/slices/pizzasSlice';
import Categories from '../components/Categories';
import Pizza from '../components/Pizza';
import Skeleton from '../components/Pizza/Skeleton';
import Sort, { sortList } from '../components/Sort';
import Pagination from '@mui/material/Pagination';
import { SearchContext } from '../App';
import NotFoundBlock from '../components/NotFoundBlock';

const Store = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzas);
  const sortProperty = sort.sortProperty;
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const handleChange = (e, number) => {
    dispatch(setCurrentPage(number));
  };

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const getPizzas = async () => {
    const search = searchValue ? `&search=${searchValue}` : '';
    const order = sortProperty === 'rating' ? 'desc' : 'asc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    dispatch(fetchPizzas({
      search,
      order,
      category,
      sortProperty,
      currentPage
    }))

  };

  //если был первый рендер, проверяем URL параметры и сохраняем в redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = false;
    }
  }, []);

  // если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, sortProperty, searchValue, currentPage]);

  // если изменили какие-либо параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const querytString = qs.stringify({
        sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${querytString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortProperty, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
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
              : items.map((pizza) => <Pizza key={pizza.id} {...pizza} />)}
          </div>
        )}
      <Pagination count={2} page={currentPage} size="large" onChange={handleChange} />
    </div>
  );
};

export default Store;
