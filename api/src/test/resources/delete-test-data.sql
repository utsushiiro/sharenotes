SET FOREIGN_KEY_CHECKS=0;

-- Delete all table data
delete from user;
delete from user_group;
delete from user_group_mapping;
delete from note;
delete from note_revision;
delete from latest_note_revision_mapping;

-- Reset auto_increment of all tables
alter table user auto_increment = 1;
alter table user_group auto_increment = 1;
alter table note auto_increment = 1;
alter table note_revision auto_increment = 1;

SET FOREIGN_KEY_CHECKS=1;
