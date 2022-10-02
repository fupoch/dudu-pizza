import React from 'react';
import style from './Search.module.scss';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

const Search = () => {
  const dispatch = useDispatch()
  const [value, setValue] = React.useState('');
  const refInput = React.useRef();

  const onClickClear = () => {
    setValue('');
    dispatch(setSearchValue(''))
    refInput.current.focus();
  };
  const setSerachDebounce = React.useCallback(
    debounce((value) => {
      dispatch(setSearchValue(value))
    }, 300),
    [],
  );

  const onChageValue = (e) => {
    setValue(e.target.value);
    setSerachDebounce(e.target.value);
  };

  return (
    <div className={style.root}>
      <svg className={style.icon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <defs></defs>
        <title />
        <g data-name="Layer 3" id="Layer_3">
          <path d="M11,22A10,10,0,1,1,21,12,10,10,0,0,1,11,22ZM11,4a8,8,0,1,0,8,8A8,8,0,0,0,11,4Z" />
          <path d="M28,29.74a3,3,0,0,1-1.93-.7L19.94,23.9a3,3,0,0,1,3.86-4.6l6.13,5.14A3,3,0,0,1,28,29.74ZM21.87,20.6h-.09a1,1,0,0,0-.55,1.77l6.13,5.14a1,1,0,0,0,1.41-.12,1,1,0,0,0,.23-.73,1,1,0,0,0-.36-.68l-6.13-5.15A1,1,0,0,0,21.87,20.6Z" />
          <path d="M20,21a1,1,0,0,1-.64-.23L17,18.82a1,1,0,0,1,1.28-1.54l2.34,1.95a1,1,0,0,1,.13,1.41A1,1,0,0,1,20,21Z" />
        </g>
      </svg>
      <input
        ref={refInput}
        value={value}
        onChange={onChageValue}
        className={style.input}
        placeholder="...Поиск пиццы"
      />
      {value ? (
        <svg
          onClick={onClickClear}
          className={style.clearIcon}
          height="512px"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 512 512"
          width="512px"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z" />
        </svg>
      ) : (
        ''
      )}
    </div>
  );
};

export default Search;
