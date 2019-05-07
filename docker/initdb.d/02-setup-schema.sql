create table notes (
    id integer not null auto_increment,
    title text not null,
    content text not null,
    updated_at timestamp not null default current_timestamp on update current_timestamp,
    created_at timestamp not null default current_timestamp,
    primary key (id)
);

create table accounts (
    id integer not null auto_increment,
    username varchar(255) not null,
    password varchar(255) not null,
    account_role varchar(2) not null,
    updated_at timestamp not null default current_timestamp on update current_timestamp,
    created_at timestamp not null default current_timestamp,
    primary key (id)
);
