CREATE TABLE users ( 
    id varchar(100) PRIMARY KEY, 
    email varchar(100) NOT NULL UNIQUE, 
    first_name varchar(100) NOT NULL, 
    last_name varchar(100) NOT NULL,
    unit varchar(100) NOT NULL,
    account_type varchar(100) NOT NULL
);

CREATE TABLE properties ( 
    id varchar(100) PRIMARY KEY, 
    name varchar(100) NOT NULL UNIQUE, 
    street_address varchar(100) NOT NULL, 
    city varchar(100) NOT NULL,
    state varchar(100) NOT NULL,
    property_manager varchar(100) REFERENCES users(id) NOT NULL,
    outstanding_task_count int NOT NULL
);

ALTER TABLE users ADD COLUMN property_id varchar(100) REFERENCES properties(id) NOT NULL;

CREATE TABLE tasks ( 
    id varchar(100) PRIMARY KEY, 
    name varchar(100) NOT NULL UNIQUE
);

CREATE TABLE users_tasks (
    id varchar(100) PRIMARY KEY, 
    user_id varchar(100) REFERENCES users(id) NOT NULL,
    property_id varchar(100) REFERENCES properties(id) NOT NULL,
    urgency_level varchar(100) NOT NULL,
    status varchar(100) NOT NULL,
    notes varchar(1000)
)