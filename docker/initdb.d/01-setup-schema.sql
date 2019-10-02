SET FOREIGN_KEY_CHECKS=0;

create table user (
    id bigint not null auto_increment,
    name varchar(255) not null,
    email varchar(255) not null,
    password char(60) not null,
    self_group_id bigint not null,
    updated_at timestamp not null default current_timestamp,
    created_at timestamp not null default current_timestamp,
    version bigint not null,
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

create table workspace (
    id bigint not null auto_increment,
    name varchar(255) not null,
    description text not null,
    root_folder_id bigint not null,
    workspace_user_group_id bigint not null,
    workspace_admin_group_id bigint not null,
    updated_at timestamp not null default current_timestamp,
    updated_by bigint not null,
    created_at timestamp not null default current_timestamp,
    created_by bigint not null,
    unique (name),
    foreign key (root_folder_id) references folder (id),
    foreign key (workspace_user_group_id) references user_group (id),
    foreign key (workspace_admin_group_id) references user_group (id),
    foreign key (updated_by) references user (id),
    foreign key (created_by) references user (id)
);

create table note (
    id bigint not null auto_increment,
    workspace_id bigint not null,
    folder_id bigint not null,
    title text not null,
    created_at timestamp not null default current_timestamp,
    created_by bigint not null,
    primary key (id),
    unique (workspace_id, folder_id, title),
    foreign key (workspace_id) references workspace (id),
    foreign key (folder_id) references folder (id),
    foreign key (created_by) references user (id)
);

create table note_revision (
    id bigint not null auto_increment,
    note_id bigint not null,
    title text not null,
    content text not null,
    user_group_with_write_authority_id bigint not null,
    user_group_with_admin_authority_id bigint not null,
    created_at timestamp not null default current_timestamp,
    created_by bigint not null,
    primary key (id),
    foreign key (note_id) references note (id),
    foreign key (user_group_with_write_authority_id) references user_group (id),
    foreign key (user_group_with_admin_authority_id) references user_group (id),
    foreign key (created_by) references user (id)
);

create table latest_note_revision_mapping (
    note_id bigint not null,
    note_revision_id bigint not null,
    version bigint not null,
    primary key (note_id),
    foreign key (note_id) references note (id),
    foreign key (note_revision_id) references note_revision (id)
);

create table folder (
    id bigint not null auto_increment,
    workspace_id bigint not null,
    name varchar(255) not null,
    parent_folder_id bigint,
    user_group_with_write_authority_id bigint not null,
    user_group_with_admin_authority_id bigint not null,
    updated_at timestamp not null default current_timestamp,
    updated_by bigint not null,
    created_at timestamp not null default current_timestamp,
    created_by bigint not null,
    version bigint not null,
    primary key (id),
    unique (workspace_id, parent_folder_id, name),
    foreign key (parent_folder_id) references folder (id),
    foreign key (user_group_with_write_authority_id) references user_group (id),
    foreign key (user_group_with_admin_authority_id) references user_group (id),
    foreign key (updated_by) references user (id),
    foreign key (created_by) references user (id)
);

SET FOREIGN_KEY_CHECKS=1;
