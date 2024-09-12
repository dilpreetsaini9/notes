const postSchema = `create table posts (
    id int auto_increment primary key,
    title text not null
);`;

const postsDetailSchema = `create table postdetails (
    id int auto_increment primary key,
    post_id int,
    sno int,
    data text default null,
    code text default null,
    foreign key (post_id) references posts(id) on delete cascade
);`;

const filesSchema = `create table files (
    id int auto_increment primary key,
    title text not null,
    location text not null,
    size varchar(255) not null,
    deleted enum('true', 'false') default 'false'
);`;

const createTable = {
  postSchema,
  postsDetailSchema,
  filesSchema,
};

export default createTable;
