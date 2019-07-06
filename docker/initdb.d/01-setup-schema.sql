create table user (
    id bigint not null auto_increment,
    name varchar(255) not null,
    email varchar(255) not null,
    password char(60) not null,
    role varchar(20) not null,
    updated_at timestamp not null default current_timestamp,
    created_at timestamp not null default current_timestamp,
    primary key (id),
    unique (name),
    unique (email)
);

create table `group` (
    id bigint not null auto_increment,
    name varchar(255) not null,
    updated_at timestamp not null default current_timestamp,
    created_at timestamp not null default current_timestamp,
    primary key (id),
    unique (name)
);

create table user_group_relation (
    user_id bigint not null,
    group_id bigint not null,
    unique (user_id, group_id),
    foreign key (user_id) references user (id),
    foreign key (group_id) references `group` (id)
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
