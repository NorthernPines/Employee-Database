INSERT INTO departments (department_name)
VALUES  ("Sales"),
        ("Marketing"),
        ("HR");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Salesman", "60000", 1),
        ("Sales Lead", "80000", 1),
        ("Data Analyst", "85000", 2),
        ("Head of Marketing", "95000", 2),
        ("HR rep", "55000", 3);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES  ("John", "Lemorr", 2, NULL),
        ("Stacey", "Corin", 1, NULL),
        ("Bobby", "Dawny", 1, NULL),
        ("Lester", "Thompson", 3, NULL),
        ("Paul", "Smith", 4, NULL),
        ("Kris", "Pliner", 5, NULL);