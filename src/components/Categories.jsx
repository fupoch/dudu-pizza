import React from 'react';

const Categories = ({ value, onClickCategory }) => {
  const category = [
    { id: 0, title: 'Все' },
    { id: 1, title: 'Мясные' },
    { id: 2, title: 'Вегетарианская' },
    { id: 3, title: 'Гриль' },
    { id: 4, title: 'Острые' },
    { id: 5, title: 'Закрытые' },
  ];

  return (
    <div className="categories">
      <ul>
        {category.map((category) => (
          <li
            key={category.id}
            className={value === category.id ? 'active' : ''}
            onClick={() => onClickCategory(category.id)}>
            {category.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
