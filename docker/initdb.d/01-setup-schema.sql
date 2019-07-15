SET FOREIGN_KEY_CHECKS=0;

create table user (
    id bigint not null auto_increment,
    name varchar(255) not null,
    email varchar(255) not null,
    password char(60) not null,
    self_group_id bigint not null,
    updated_at timestamp not null default current_timestamp,
    created_at timestamp not null default current_timestamp,
    primary key (id),
    unique (name),
    unique (email),
    foreign key (self_group_id) references user_group (id)
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
    updated_at timestamp not null default current_timestamp,
    created_at timestamp not null default current_timestamp,
    unique (user_id, user_group_id),
    foreign key (user_id) references user (id),
    foreign key (user_group_id) references user_group (id)
);

create table note (
    id bigint not null auto_increment,
    created_at timestamp not null default current_timestamp,
    created_by bigint not null,
    primary key (id),
    foreign key (created_by) references user (id)
);

create table note_revision (
    id bigint not null auto_increment,
    note_id bigint not null,
    title text not null,
    content text not null,
    user_group_with_read_authority_id bigint not null,
    user_group_with_read_write_authority_id bigint not null,
    user_group_with_admin_authority_id bigint not null,
    created_at timestamp not null default current_timestamp,
    created_by bigint not null,
    primary key (id),
    foreign key (note_id) references note (id)
);

create table latest_note_revision_mapping (
    note_id bigint not null,
    note_revision_id bigint not null,
    primary key (note_id),
    foreign key (note_id) references note (id),
    foreign key (note_revision_id) references note_revision (id)
);

SET FOREIGN_KEY_CHECKS=1;
