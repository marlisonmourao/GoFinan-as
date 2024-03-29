import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { useAuth } from "../../hooks/auth";

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
  LogoutButton,
  LoadContainer
} from "./styles";

export interface DataListProps extends TransactionCardsProps {
  id: string;
}

interface HightlightPros {
  amount: string;
  lastTransactions: string;
}

interface HighlightData {
  entries: HightlightPros;
  expensives: HightlightPros;
  total: HightlightPros;
}

export function Dashboard() {
  const [isloading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [hightlightData, setHightlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  const theme = useTheme()

  const { signOut, user } = useAuth()

  function getLastTransactionDate(
    collection:
      DataListProps[],
    type: 'positive' | 'negative'
  ) {

    const collectionFilttered = collection
      .filter(transaction => transaction.type === type)

    if (collectionFilttered.length === 0) {
      return 0
    }

    const lastTransactions = new Date(
      Math.max.apply(Math,
        collectionFilttered
          .map(transactions => new Date(transactions.date).getTime())))

    return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleDateString('pt-BR', { month: 'long' })}`;
  }

  async function loadTransaction() {
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);


    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormated: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "positive") {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-Br", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      }
    );

    setTransactions(transactionsFormated);
    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive')
    const lastTransactiosExpesives = getLastTransactionDate(transactions, 'negative')



    const totalInterval = lastTransactiosExpesives === 0
      ? 'Não há transações'
      : `01 a ${lastTransactiosExpesives}`

    let total = entriesTotal - expensiveTotal;

    setHightlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransactions: lastTransactionEntries === 0
          ? 'Não há transações'
          : `Última entranda dia ${lastTransactionEntries}`,
      },
      expensives: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransactions: lastTransactiosExpesives === 0
          ? 'Não há transações'
          : `Última saída dia ${lastTransactiosExpesives}`,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransactions: totalInterval
      },
    });

    setLoading(false)
  }

  useEffect(() => {
    loadTransaction();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransaction();
    }, [])
  );

  return (
    <Container>

      {
        isloading ? <LoadContainer>
          <ActivityIndicator
            color={theme.colors.primary}
            size="large"
          />
        </LoadContainer> :
          <>
            <Header>
              <UserWrapper>
                <UseInfo>
                  <Photo
                    source={{ uri: user.photo }}
                  />
                  <User>
                    <UseGreeting>Olá,</UseGreeting>
                    <UserName>{user.name}</UserName>
                  </User>
                </UseInfo>

                <LogoutButton onPress={signOut}>
                  <Icon name="power" />
                </LogoutButton>
              </UserWrapper>
            </Header>

            <HightlightCards>
              <HightlightCard
                type="up"
                title="Entradas"
                amount={hightlightData.entries.amount}
                lastTransaction={hightlightData.entries.lastTransactions}
              />
              <HightlightCard
                type="down"
                title="Saídas"
                amount={hightlightData.expensives.amount}
                lastTransaction={hightlightData.expensives.lastTransactions}
              />
              <HightlightCard
                type="total"
                title="Total"
                amount={hightlightData.total.amount}
                lastTransaction={hightlightData.total.lastTransactions}
              />
            </HightlightCards>

            <Transactions>
              <Title>Listagem</Title>
              <TransactionsList
                data={transactions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <TransactionCards data={item} />}
              />
            </Transactions>
          </>
      }
    </Container>
  );
}
