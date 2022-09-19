import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "../../components/Forms/Button";
import { CategorySelectedButton } from "../../components/Forms/CategorySelectButton";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { InputForm } from "../../components/InputForm";

import { CategorySelected } from "../CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsType,
} from "./styles";

export type FormData = {
  [name: string]: any;
};

const schema = Yup.object().shape({
  name: Yup.
  string()
  .required("Nome é obrigatório."),
  amount: Yup.number()
    .typeError("Informe um valor númerico.")
    .positive("O valor não pode ser negativo.")
});

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const { control, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema),
  });

  function handleTransactionsTypeSelected(type: "up" | "down") {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleClosenSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleRegister(form: FormData) {
    if (!transactionType) {
      return Alert.alert("Atenção!", "Selecione o tipo da transação.");
    }

    if (category.key === "category") {
      return Alert.alert("Atenção!", "Selecione a categoria.");
    }

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };

    console.log(data);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />

            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}

            />

            <TransactionsType>
              <TransactionTypeButton
                type="up"
                title="income"
                onPress={() => handleTransactionsTypeSelected("up")}
                isActive={transactionType === "up"}
              />

              <TransactionTypeButton
                type="down"
                title="Outcome"
                onPress={() => handleTransactionsTypeSelected("down")}
                isActive={transactionType === "down"}
              />
            </TransactionsType>

            <CategorySelectedButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelected
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleClosenSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
