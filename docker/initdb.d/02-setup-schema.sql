create table notes (
    id integer not null auto_increment,
    title text not null,
    content text not null,
    updated_at timestamp not null default current_timestamp on update current_timestamp,
    created_at timestamp not null default current_timestamp,
    primary key (id)
);
