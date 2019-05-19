# Delete all table data
delete from users;
delete from notes;

# Reset auto_increment of all tables
alter table users auto_increment = 1;
alter table notes auto_increment = 1;
