create table user (
    id bigint not null auto_increment,
    name varchar(255) not null,
    email varchar(255) not null,
    password char(60) not null,
    updated_at timestamp not null default current_timestamp,
    created_at timestamp not null default current_timestamp,
    primary key (id),
    unique (name),
    unique (email)
);

create table user_group (
    id bigint not null auto_increment,
    name varchar(255) not null,
    updated_at timestamp not null default current_timestamp,
    created_at timestamp not null default current_timestamp,
    primary key (id),
    unique (name)
);

create table user_group_mapping (
    user_id bigint not null,
    user_group_id bigint not null,
    is_admin boolean not null default false,
    unique (user_id, user_group_id),
    foreign key (user_id) references user (id),
    foreign key (user_group_id) references user_group (id)
);

create table note (
    id bigint not null auto_increment,
    title text not null,
    content text not null,
    user_id bigint not null,
    updated_at timestamp not null default current_timestamp,
    created_at timestamp not null default current_timestamp,
    primary key (id),
    foreign key (user_id) references user (id)
);
