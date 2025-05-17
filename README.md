🧱 Архитектура
Приложение построено на архитектуре MVP (Model-View-Presenter):

Model - отвечает за данные и бизнес-логику
View - компоненты пользовательского интерфейса
Presenter - связующее звено между Model и View


Структура файлов
project/
│
├── src/
│   ├── framework/
│   │   ├── render.js           # Утилиты для рендеринга компонентов
│   │   └── view/
│   │       └── abstract-component.js  # Базовый класс для всех компонентов
│   │
│   ├── model/
│   │   └── expense-model.js    # Модель данных для расходов
│   │
│   ├── presenter/
│   │   └── expense-board-presenter.js  # Presenter для связи Model и View
│   │
│   ├── view/
│   │   ├── expense-board-component.js  # Компонент общего контейнера
│   │   ├── expense-filter-component.js # Компонент фильтрации
│   │   ├── expense-item-component.js   # Компонент элемента расхода
│   │   ├── expense-list-component.js   # Компонент списка расходов
│   │   └── new-expense-form-component.js  # Компонент формы добавления
│   │
│   ├── mock/
│   │   └── expenses.js         # Тестовые данные
│   │
│   ├── utils.js               # Вспомогательные функции
│   └── main.js                # Точка входа приложения
│
├── styles/
│   └── styles.css             # Стили приложения
│
└── index.html                 # Главная HTML страница



