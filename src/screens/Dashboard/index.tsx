import React from "react";

import { HightlightCard } from "../../components/HightlightCard";
import {
  TransactionCards,
  TransactionCardsProps,
} from "../../components/TransactionCards";

import {
  Container,
  Header,
  UseInfo,
  Photo,
  User,
  UseGreeting,
  UserName,
  UserWrapper,
  Icon,
  HightlightCards,
  Transactions,
  Title,
  TransactionsList,
} from "./styles";

export interface DataListProps extends TransactionCardsProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign",
      },
      date: "14/04/2020",
    },
    {
      id: "2",
      type: "negative",
      title: "Hamburgueria Pizza",
      amount: "R$ 59,00",
      category: {
        name: "Alimentação",
        icon: "coffee",
      },
      date: "10/04/2020",
    },
    {
      id: "3",
      type: "negative",
      title: "Aluguei do Apartamento",
      amount: "R$ 1.200,00",
      category: {
        name: "Casa",
        icon: "shopping-bag",
      },
      date: "10/04/2020",
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UseInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/88122605?v=4",
              }}
            />
            <User>
              <UseGreeting>Olá,</UseGreeting>
              <UserName>Marlison</UserName>
            </User>
          </UseInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HightlightCards>
        <HightlightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HightlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última entrada dia 03 de abril"
        />
        <HightlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 á 06 de abril"
        />
      </HightlightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionsList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCards data={item} />}
        />
      </Transactions>
    </Container>
  );
}
