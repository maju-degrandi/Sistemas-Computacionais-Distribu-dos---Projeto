
create table Laboratorio(
    CNPJ char(14) NOT NULL,
    Nome varchar(50) NOT NULL,
    PRIMARY KEY (CNPJ)
);

create table Produto(
    Nome_Substancia varchar(50) NOT NULL,
    CNPJ_Laboratorio char(14) NOT NULL,
    Tipo varchar(50),
    PRIMARY KEY (Nome_Substancia),
    FOREIGN KEY (Nome_Substancia) REFERENCES Substancia(Nome),
    FOREIGN KEY (CNPJ_Laboratorio) REFERENCES Laboratorio(CNPJ)
);

create table Substancia(
    Nome varchar(50) NOT null,
    PRIMARY KEY (Nome)
);


create table Estado(
    Nome varchar(50) NOT NULL,
    ICMS decimal NOT NULL,
    ICMS_generico decimal NOT NULL,
    PRIMARY KEY (Nome)
);

create table Estoque_Regional_Apresentacao(
    Nome_Estoque_Regional varchar(50) NOT NULL,
    CEP_Estoque_Regional char(8) NOT NULL,
    GGREM char(15) NOT NULL,
    PRIMARY KEY (Nome_Estoque_Regional),
    FOREIGN KEY (Nome_Estoque_Regional,CEP_Estoque_Regional) REFERENCES Estoque_Regional(Nome, CEP),
    FOREIGN KEY (GGREM) REFERENCES Apresentacao(GGREM)
);

create table Estoque_Regional(
    Nome varchar(50) NOT NULL,
    CEP char(8) NOT NULL,
    Bairro varchar(50) NOT NULL,
    Rua varchar(50) NOT NULL,
    Numero integer NOT NULL,
    PRIMARY KEY (Nome, CEP)
);

create table Estoque_Local(
    Nome varchar(50) NOT NULL,
    CEP char(8) NOT NULL,
    Bairro varchar(50) NOT NULL,
    Rua varchar(50) NOT NULL,
    Numero integer NOT NULL,
    CEP_Estoque_Regional char(8) NOT NULL,
    Nome_Estoque_Regional varchar(50) NOT NULL,
    Nome_Regiao_Contemplada varchar(50) NOT NULL,
    PRIMARY KEY (Nome, CEP),
    FOREIGN KEY (Nome_Estoque_Regional, CEP_Estoque_Regional) REFERENCES Estoque_Regional(Nome, CEP),
    FOREIGN KEY (Nome_Regiao_Contemplada) REFERENCES Regiao(Nome)
);

create table Estoque_Local_Apresentacao(
    Nome_Estoque_Local char(50) NOT NULL,
    CEP_Estoque_Local char(8) NOT NULL,
    GGREM char(15) NOT NULL,
    PRIMARY KEY (Nome_Estoque_Local),
    FOREIGN KEY (Nome_Estoque_Local,CEP_Estoque_Local) REFERENCES Estoque_Local(Nome,CEP),
    FOREIGN KEY (GGREM) REFERENCES Apresentacao(GGREM)
);

create table Regiao(
    Nome varchar(50) NOT NULL,
    PRIMARY KEY (Nome)
);

create table Apresentacao(
    GGREM char(15) NOT NULL,
    Detalhes varchar(50) NOT NULL,
    Tarja varchar(50),
    PF decimal NOT NULL,
    PMC decimal,
    Regime_Preco boolean NOT NULL,
    Classe_Terapeutica varchar(50) NOT NULL,
    Hospitalar boolean NOT NULL,
    CAP boolean NOT NULL,
    Confaz_B7 boolean NOT NULL,
    Isento boolean NOT NULL,
    Analise_Recursal varchar(4) NOT NULL,
    Concessao_Tributaria boolean NOT NULL,
    Comercializacao_2022 boolean NOT NULL,
    Registro varchar(20) NOT NULL,
    EAN1 varchar(20) NOT NULL,
    EAN2 varchar(20) NOT NULL,
    CNPJ_Laboratorio char(14) NOT null,
    Nome_Substancia varchar(50) NOT null,
    PRIMARY KEY (GGREM),
    FOREIGN KEY (CNPJ_Laboratorio) REFERENCES Laboratorio(CNPJ),
    FOREIGN KEY (Nome_Substancia) REFERENCES Substancia(Nome)
);
