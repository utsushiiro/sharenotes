-- Delete all table data
delete from user;
delete from note;

-- Reset auto_increment of all tables
alter table user auto_increment = 1;
alter table note auto_increment = 1;
