create database marketplus;
use marketplus;
create table User(
    Id int primary key auto_increment,
    Name varchar(100) not null,
    Email varchar(100) not null,
    Phone numeric(14),
    Password varchar(100) not null,
    Image text,
    Active boolean default true,
    CreatedAt timestamp default current_timestamp,
    UpdatedAt timestamp default current_timestamp on update current_timestamp
);

create table Product(
    Id int primary key auto_increment,
    Name varchar(100) not null,
    Description text,
    Price decimal(10,2) not null,
    Category varchar(100),
    Image text,
    Stock int not null,
    CreatedAt timestamp default current_timestamp,
    UpdatedAt timestamp default current_timestamp on update current_timestamp
);

create table Kart(
    Id int primary key auto_increment,
    UserId int not null,
    ProductId int not null,
    Quantity int not null
);

create table Purchasse (
    Id int primary key auto_increment,
    UserId int not null,
    KartId int not null,
    Total decimal(10,2) not null,
    Status varchar(100) not null,
    Metode varchar(100) not null,
    CreatedAt timestamp default current_timestamp,
    FinishAt timestamp default current_timestamp on update current_timestamp
);

create table Address (
    Id int primary key auto_increment,
    UserId int not null,
    Street varchar(100) not null,
    Number int not null,
    Complement varchar(100),
    District varchar(100) not null,
    City varchar(100) not null,
    State varchar(100) not null
);

create table Payment(
    Id int primary key auto_increment,
    Metode varchar(100) not null,
    Info varchar(100) not null,
    CreatedAt timestamp default current_timestamp
);  

insert into User 
( Name, Email, Phone, Password, Image, Active )
values
( 'Walter Potma', 'walterpotma@gmail.com', '5541998619825', '@Senha123@', 'https://www.tendaatacado.com.br/dicas/wp-content/webp-express/webp-images/uploads/2022/06/como-fazer-batata-frita-topo.jpg.webp', False),
( 'Gabriel Raatz', 'gabriel.h.raatz@gmail.com', '5541991595425', '@Senha123@', 'https://www.tendaatacado.com.br/dicas/wp-content/webp-express/webp-images/uploads/2022/06/como-fazer-batata-frita-topo.jpg.webp', False),
( 'Matheus Pupia', 'matheuspupiaa@gmail.com', '5541997489580', '@Senha123@', 'https://www.tendaatacado.com.br/dicas/wp-content/webp-express/webp-images/uploads/2022/06/como-fazer-batata-frita-topo.jpg.webp', False);

insert into Product ( Name, Description, Price, Stock, Category, Image )
values
('AMD Ryzen 5 5600X', 'Processador AMD Ryzen 5 5600X, 6 núcleos, 12 threads, até 4.6GHz, Socket AM4, Sem Vídeo Integrado', 987.90, 1, 'cpu', 'img/product/r5600x.png'),
('Intel Core i5 12400F', 'Processador Intel Core i5 12400F, 6 núcleos, 12 threads, até 4.4GHz, Socket 1700, Sem Vídeo Integrado', 799.90, 1, 'cpu', 'img/product/i512400f.png'),
('AMD Ryzen 7 5800X', 'Processador AMD Ryzen 7 5800X, 8 núcleos, 16 threads, até 4.7GHz, Socket AM4, Sem Vídeo Integrado', 1499.90, 1, 'cpu', 'img/product/r75800x.png'),
('Intel Core i7 12700F', 'Processador Intel Core i7 12700F, 12 núcleos, 20 threads, até 4.9GHz, Socket 1700, Sem Vídeo Integrado', 1699.90, 1, 'cpu', 'img/product/i712700f.png'),
('AMD Ryzen 9 5900X', 'Processador AMD Ryzen 9 5900X, 12 núcleos, 24 threads, até 4.8GHz, Socket AM4, Sem Vídeo Integrado', 2199.90, 1, 'cpu', 'img/product/r95900x.png'),
('Intel Core i9 12900K', 'Processador Intel Core i9 12900K, 16 núcleos, 24 threads, até 5.2GHz, Socket 1700, Sem Vídeo Integrado', 2999.90, 1, 'cpu', 'img/product/i912900k.png');

insert into Kart ( UserId, ProductId, Quantity )
values
( 1, 1, 3 ),
( 1, 2, 2 ),
( 1, 3, 1 ),
( 2, 4, 1 ),
( 2, 5, 1 ),
( 2, 6, 1 ),
( 3, 1, 1 );

insert into Purchasse ( UserId, KartId, Total, Status )
values
( 1, 1, 2999.9, 'Aprovado', 'Pix' ),
( 1, 2, 1599.9, 'Aprovado', 'Boleto' ),
( 1, 3, 987.9, 'Pendente', 'Boleto' ),
( 2, 4, 1699.9, 'Aprovado', 'Boleto' ),
( 2, 5, 2199.9, 'Recusado', 'Credito' ),
( 2, 6, 2999.9, 'Aprovado', 'Debito' ),
( 3, 7, 987.9, 'Pendente', 'Pix' );



insert into Address ( UserId, Street, Number, Complement, District, City, State )
values
( 1, 'Rua sete', 241, 'Casa', 'Jardim Roma', 'Almirante Tamandaré', 'PR'),
( 2, 'Rua um', 896, 'Casa', 'Jardim Roma', 'Almirante Tamandaré', 'PR'),
( 3, 'Rodovia da Uva', 123, 'Casa', 'Colombo Velho', 'Colombo', 'PR'); 