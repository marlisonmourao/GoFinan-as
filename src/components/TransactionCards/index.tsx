import React from "react";

import {
  Container,
  Title,
  Amount,
  Footer,
  Icon,
  CategoryName,
  Category,
  Date,
} from "./styles";

interface Category {
  name: string; // Salário Mensal
  icon: String;
}

export interface TransactionCardsProps {
  type: "positive" | "negative";
  title: string;
  amount: string;
  category: Category;
  date: string;
}

interface Props {
  data: TransactionCardsProps;
}

export function TransactionCards({ data }: Props) {
  return (
    <Container>
      <Title>{data.title}</Title>
      <Amount type={data.type}>
        {data.type === "negative" && "- "}
        {data.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>

        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
