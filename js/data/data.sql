create database marketplus;
use marketplus;
create table Usuario(
    Id int primary key auto_increment,
    Nome varchar(100) not null,
    Email varchar(100) not null,
    Telefone numeric(14),
    Senha varchar(100) not null,
    CreatedAt timestamp default current_timestamp,
    UpdatedAt timestamp default current_timestamp on update current_timestamp
);

create table Produto(
    Id int primary key auto_increment,
    Nome varchar(100) not null,
    Detalhes text,
    Preco decimal(10,2) not null,
    Estoque int not null,
    CreatedAt timestamp default current_timestamp,
    UpdatedAt timestamp default current_timestamp on update current_timestamp
);

insert into Usuario 
( Nome, Email, Telefone, Senha )
values
( 'Walter Potma', 'walterpotma@gmail.com', '5541998619825', '@Senha123@'),
( 'Gabriel Raatz', 'gabriel.h.raatz@gmail.com', '5541991595425', '@Senha123@'),
( 'Matheus Pupia', 'matheuspupiaa@gmail.com', '5541997489580', '@Senha123@');

insert into Produto ( Nome, Detalhes, Preco, Estoque )
values
('AMD Ryzen 5 5600X', 'Processador AMD Ryzen 5 5600X, 6 núcleos, 12 threads, até 4.6GHz, Socket AM4, Sem Vídeo Integrado', 987.90, 1),
('Intel Core i5 12400F', 'Processador Intel Core i5 12400F, 6 núcleos, 12 threads, até 4.4GHz, Socket 1700, Sem Vídeo Integrado', 799.90, 1),
('AMD Ryzen 7 5800X', 'Processador AMD Ryzen 7 5800X, 8 núcleos, 16 threads, até 4.7GHz, Socket AM4, Sem Vídeo Integrado', 1499.90, 1),
('Intel Core i7 12700F', 'Processador Intel Core i7 12700F, 12 núcleos, 20 threads, até 4.9GHz, Socket 1700, Sem Vídeo Integrado', 1699.90, 1),
('AMD Ryzen 9 5900X', 'Processador AMD Ryzen 9 5900X, 12 núcleos, 24 threads, até 4.8GHz, Socket AM4, Sem Vídeo Integrado', 2199.90, 1),
('Intel Core i9 12900K', 'Processador Intel Core i9 12900K, 16 núcleos, 24 threads, até 5.2GHz, Socket 1700, Sem Vídeo Integrado', 2999.90, 1);
